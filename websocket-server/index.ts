import type { ServerWebSocket } from "bun";

const messages = ["Hello from the WS server!"];

const websockets: ServerWebSocket<{ authToken: string }>[] = [];

const server = Bun.serve<{ authToken: string }>({
  async fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      // Bun automatically returns a 101 Switching Protocols
      // if the upgrade succeeds
      return undefined;
    }

    // handle HTTP request normally
    return new Response("Hello world!");
  },
  websocket: {
    async open(ws) {
      websockets.push(ws);
      ws.send(JSON.stringify(messages));
    },
    // this is called when a message is received
    async message(ws, message) {
      console.log(`Received message: "${message}"`);
      messages.push(message.toString());

      // send back a message
      websockets.forEach((ws) => ws.send(message));
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
