import { NoteType } from "../types/NoteType.ts";
import { useEffect, useRef, useState } from "react";
import { getNote, getUsers, saveNote } from "../services/note-service.ts";
import { noteSaveTimeoutMs } from "../config/config.ts";
import { Page } from "../components/Page.tsx";
import { User } from "../types/User.ts";
import { UserSuggestions } from "../components/UserSuggestions.tsx";

export function Note({
  sessionId,
  noteId,
}: {
  sessionId: string;
  noteId: string;
}) {
  const [state, setState] = useState<
    { state: "loading" } | { state: "loaded"; note: NoteType; users: User[] }
  >({
    state: "loading",
  });
  const [useSuggestionsState, setUseSuggestionsState] = useState<{
    visible: boolean;
    searchString?: string;
  }>({ visible: false });
  const saveTimeout = useRef<number | null>(null);

  // Fetch initial note state.
  useEffect(() => {
    (async () => {
      const [note, users] = await Promise.all([
        getNote(sessionId, noteId),
        getUsers(),
      ]);
      setState({
        state: "loaded",
        note,
        users,
      });
    })();
  }, []);

  return (
    <Page
      heading={`Note ${noteId}`}
      headerLinks={[{ label: "All notes", href: `?sessionId=${sessionId}` }]}
    >
      {state.state === "loading" ? "Loading..." : null}
      {state.state === "loaded" ? (
        <>
          <textarea
            className="w-full h-full shadow-xl resize-none bg-white p-2 outline-0"
            value={state.note.body}
            onChange={async (e) => {
              // When text changes update state with the new note body value.
              const newBody = e.target.value;
              const newNote = {
                id: noteId,
                body: newBody,
              };
              setState({ state: "loaded", note: newNote, users: state.users });

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
            onSelect={(e) => {
              // Detect when we are in a word which has an @ in it and show user suggestions.
              const newBody = e.currentTarget.value;
              const caretPos = e.currentTarget.selectionStart;
              const beforeCaret = newBody.slice(0, caretPos);
              const afterCaret = newBody.slice(caretPos);

              // Match partial word before caret, e.g. @ or @bi
              const matchBefore = beforeCaret.match(/@[\w]*$/);
              const wordStart = matchBefore?.[0] || "";

              // Match word continuation after caret, e.g. g
              const matchAfter = afterCaret.match(/^\w*/); // don't include @ here
              const wordEnd = matchAfter?.[0] || "";

              // Add together to get the full word, e.g. @big
              const lastWord = wordStart + wordEnd;

              // If the last word we selected had an @ in it then display matching user names.
              if (lastWord.startsWith("@")) {
                const searchString = lastWord.slice(1);
                setUseSuggestionsState({ visible: true, searchString });
              } else {
                setUseSuggestionsState({ visible: false });
              }
            }}
          />
          {useSuggestionsState.visible ? (
            <UserSuggestions
              users={state.users}
              searchString={useSuggestionsState.searchString}
            />
          ) : null}
        </>
      ) : null}
    </Page>
  );
}
