import { NoteType } from "../types/NoteType.ts";
import { useState } from "react";

export function Note({
  note,
  onNoteChange,
}: {
  note: NoteType;
  onNoteChange: (note: NoteType) => void;
}) {
  const [body, setBody] = useState(note.body);
  return (
    <div>
      <textarea
        className="w-full border"
        value={body}
        onChange={(e) => {
          const newBody = e.target.value;
          setBody(newBody);
          onNoteChange({
            ...note,
            body: newBody,
          });
        }}
      />
    </div>
  );
}
