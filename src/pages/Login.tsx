import { useState } from "react";
import { Page } from "../components/Page.tsx";

export function Login() {
  const [sessionId, setSessionId] = useState("");
  return (
    <Page heading={`Surfe Notes - login`}>
      <div className="flex-1 flex flex-col gap-2 items-center">
        <div className="flex gap-2 items-center">
          <label htmlFor="sessionId">Session ID</label>
          <input
            id="sessionId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          type="button"
          onClick={() => {
            window.location.href = `${window.location.origin}?sessionId=${sessionId}`;
          }}
        >
          Login
        </button>
      </div>
    </Page>
  );
}
