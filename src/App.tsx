import "./App.css";
import { Note } from "./components/Note.tsx";
import { fetchNote, saveNote } from "./utils/note-service.ts";
import { useEffect, useState } from "react";
import { NoteType } from "./types/NoteType.ts";

function App() {
  // Extract session and note ID from query params.
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("sessionId");
  const noteId = params.get("noteId");

  const [state, setState] = useState<
    { state: "loading" } | { state: "loaded"; note: NoteType }
  >({
    state: "loading",
  });

  // Fetch initial note state.
  useEffect(() => {
    (async () => {
      const note = await fetchNote(sessionId, noteId);
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
        <>
          <Note
            note={state.note}
            onNoteChange={async (newNote) => {
              setState({ state: "loaded", note: newNote });
              console.log("onNoteChange", newNote);
              try {
                await saveNote(sessionId, noteId, newNote);
              } catch (e) {
                console.error("Failed to save note", e);
              }
            }}
          />
        </>
      ) : null}
    </main>
  );
}

export default App;
