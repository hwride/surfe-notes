import { NoteType } from "../types/NoteType.ts";

export function Note({ note }: { note: NoteType }) {
  return (
    <div>
      <textarea className="w-full border" value={note.body} />
    </div>
  );
}
