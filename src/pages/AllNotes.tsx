import { useEffect, useState } from "react";
import { NoteType } from "../types/NoteType.ts";
import { getNotes } from "../services/note-service.ts";
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
    </Page>
  );
}
