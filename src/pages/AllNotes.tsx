import { useEffect, useState } from "react";
import { NoteType } from "../types/NoteType.ts";
import { createNote, getNotes } from "../services/note-service.ts";
import { Page } from "../components/Page.tsx";

export function AllNotes({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<
    { state: "loading" } | { state: "loaded"; notes: NoteType[] }
  >({
    state: "loading",
  });

  // Fetch notes.
  useEffect(() => {
    (async () => {
      const notes = await getNotes(sessionId);
      setState({
        state: "loaded",
        notes,
      });
    })();
  }, []);

  return (
    <Page heading="Your notes">
      <div className="flex flex-col gap-6">
        <div className="flex-1">
          {state.state === "loading" ? "Loading..." : null}
          {state.state === "loaded" ? (
            <ol className="rounded-lg overflow-hidden">
              {state.notes.map((note) => (
                <li
                  key={note.id}
                  className="flex border-b-1 last:border-b-0 border-gray-300"
                >
                  <a
                    href={`?sessionId=${sessionId}&noteId=${note.id}`}
                    className="w-full bg-white p-4 font-medium hover:underline "
                  >
                    Note {note.id}
                  </a>
                </li>
              ))}
            </ol>
          ) : null}
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-auto"
          type="button"
          onClick={async () => {
            try {
              const note = await createNote(sessionId, "Write your note...");
              window.location.href = `${window.location.origin}?sessionId=${sessionId}&noteId=${note.id}`;
            } catch (e) {
              console.error("Failed to create note", e);
            }
          }}
        >
          Create a note
        </button>
      </div>
    </Page>
  );
}
