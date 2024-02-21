import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const [msgs, setMsgs] = useState<string[]>([]);
  const ws = useMemo(() => new WebSocket("ws://localhost:3000"), []);

  ws.onmessage = (e) => {
    console.log(`Received ${e.data}`);
    let newMsg: string | string[];
    if ((e.data as string).includes("[")) {
      newMsg = JSON.parse(e.data);
    } else {
      newMsg = e.data;
    }
    if (typeof newMsg === "string") {
      setMsgs((currentMsgs) => [...currentMsgs, newMsg as string]);
      return;
    } else if (Array.isArray(newMsg)) {
      setMsgs(newMsg);
      return;
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log(formData.get("message"));

    const message = formData.get("message") as string;
    ws.send(message);
  }
  return (
    <div className="card">
      <h1>Websocket client</h1>
      <h2>Messages</h2>

      <div>
        {msgs.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          paddingTop: "4rem",
        }}
      >
        <input type="text" id="message" name="message" autoComplete="off" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
