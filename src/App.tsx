import "./App.css";
import { Note } from "./pages/Note.tsx";
import { AllNotes } from "./pages/AllNotes.tsx";

function App() {
  // Extract session and note ID from query params.
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("sessionId");
  const noteId = params.get("noteId");

  if (!sessionId) {
    return <div>Please provide a session ID</div>;
  } else if (!noteId) {
    return <AllNotes sessionId={sessionId} />;
  } else {
    return <Note sessionId={sessionId} noteId={noteId} />;
  }
}

export default App;
