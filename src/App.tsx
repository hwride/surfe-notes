import "./App.css";
import { Note } from "./components/Note.tsx";

function App() {
  return (
    <main className="max-w-100 m-auto">
      <h1 className="text-3xl font-bold m-auto text-center mb-2">
        Surfe Notes
      </h1>
      <Note />
    </main>
  );
}

export default App;
