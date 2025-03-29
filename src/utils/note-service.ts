import { NoteType } from "../types/NoteType.ts";

export async function fetchNote(
  sessionId: string,
  noteId: string,
): Promise<NoteType> {
  const url = `https://challenge.surfe.com/${sessionId}/notes/${noteId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch note ${noteId}, response status: ${response.status}`,
    );
  }

  const data = (await response.json()) as NoteType;
  return data;
}

export async function saveNote(
  sessionId: string,
  noteId: string,
  note: NoteType,
): Promise<void> {
  const url = `https://challenge.surfe.com/${sessionId}/notes/${noteId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: note.body }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to save note ${noteId}, response status: ${response.status}`,
    );
  }
}
