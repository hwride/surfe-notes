import { NoteType } from "../types/NoteType.ts";
import { useEffect, useRef, useState } from "react";
import { getNote, saveNote } from "../services/note-service.ts";
import { noteSaveTimeoutMs } from "../config/config.ts";
import { Page } from "../components/Page.tsx";

export function Note({
  sessionId,
  noteId,
}: {
  sessionId: string;
  noteId: string;
}) {
  const [state, setState] = useState<
    { state: "loading" } | { state: "loaded"; note: NoteType }
  >({
    state: "loading",
  });
  const saveTimeout = useRef<number | null>(null);

  // Fetch initial note state.
  useEffect(() => {
    (async () => {
      const note = await getNote(sessionId, noteId);
      setState({
        state: "loaded",
        note,
      });
    })();
  }, []);

  return (
    <Page heading={`Note ${noteId}`}>
      {state.state === "loading" ? "Loading..." : null}
      {state.state === "loaded" ? (
        <textarea
          className="w-full h-full shadow-xl resize-none bg-white p-2 outline-0"
          value={state.note.body}
          onChange={async (e) => {
            const newBody = e.target.value;
            const newNote = {
              id: noteId,
              body: newBody,
            };
            setState({ state: "loaded", note: newNote });

            // Save the note to the sever X ms after the user stops typing.
            // We reset the timer each time the user types something else.
            if (saveTimeout.current) {
              clearTimeout(saveTimeout.current);
            }
            saveTimeout.current = window.setTimeout(async () => {
              try {
                await saveNote(sessionId, noteId, newNote);
              } catch (e) {
                console.error("Failed to save note", e);
              }
            }, noteSaveTimeoutMs);
          }}
        />
      ) : null}
    </Page>
  );
}
