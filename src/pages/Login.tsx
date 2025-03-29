import { useState } from "react";

export function Login() {
  const [sessionId, setSessionId] = useState("");
  return (
    <main className="max-w-100 m-auto">
      <h1 className="text-3xl font-bold m-auto text-center mb-2">
        Surfe Notes
      </h1>
      <input
        className="border"
        type="text"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button
        className="border"
        type="button"
        onClick={() => {
          window.location.href = `${window.location.origin}?sessionId=${sessionId}`;
        }}
      >
        Login
      </button>
    </main>
  );
}
