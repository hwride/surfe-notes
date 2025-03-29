import { NoteType } from "../types/NoteType.ts";
import { useEffect, useState } from "react";
import { getNote } from "../services/note-service.ts";

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
    <main className="max-w-100 m-auto">
      <h1 className="text-3xl font-bold m-auto text-center mb-2">
        Surfe Notes
      </h1>
      {state.state === "loading" ? "Loading..." : null}
      {state.state === "loaded" ? (
        <textarea
          className="w-full border"
          value={state.note.body}
          onChange={(e) => {
            const newBody = e.target.value;
            setState((state) => {
              if (state.state === "loaded") {
                return {
                  ...state,
                  note: {
                    ...state.note,
                    body: newBody,
                  },
                };
              } else {
                return state;
              }
            });
          }}
        />
      ) : null}
    </main>
  );
}
