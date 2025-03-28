import "./App.css";
import { Note } from "./components/Note.tsx";
import { fetchNote } from "./utils/note-service.ts";
import { useEffect, useState } from "react";
import { NoteType } from "./types/NoteType.ts";

function App() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("sessionId");
  const noteId = params.get("noteId");
  const [state, setState] = useState<
    { state: "loading" } | { state: "loaded"; note: NoteType }
  >({
    state: "loading",
  });

  useEffect(() => {
    (async () => {
      const note = await fetchNote(sessionId, noteId);
      setState({
        state: "loaded",
        note,
      });
      console.log("note", note);
    })();
  });

  return (
    <main className="max-w-100 m-auto">
      <h1 className="text-3xl font-bold m-auto text-center mb-2">
        Surfe Notes
      </h1>
      {state.state === "loading" ? "Loading..." : null}
      {state.state === "loaded" ? (
        <>
          <Note note={state.note} />
        </>
      ) : null}
    </main>
  );
}

export default App;
