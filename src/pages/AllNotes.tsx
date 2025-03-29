import { useEffect, useState } from "react";
import { NoteType } from "../types/NoteType.ts";
import { getNotes } from "../services/note-service.ts";

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
    <div className="bg-[#e6eef6]">
      <main className="max-w-180 h-dvh p-8 m-auto flex flex-col">
        <h1 className="text-3xl font-bold m-auto text-center mb-2">
          Your notes
        </h1>
        <div className="flex-1">
          {state.state === "loading" ? "Loading..." : null}
          {state.state === "loaded" ? (
            <ol>
              {state.notes.map((note) => (
                <li key={note.id}>
                  <a href={`?sessionId=${sessionId}&noteId=${note.id}`}>
                    Note {note.id}
                  </a>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </main>
    </div>
  );
}
