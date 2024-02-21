import { Hono } from "hono";
import { Database } from "bun:sqlite";

type Message = {
  message: string;
};

const app = new Hono();
const db = new Database("nl.sqlite");

const createQuery = db.query(
  "create table if not exists messages (message text);"
);
createQuery.run();

app.get("/", (c) => {
  const query = db.query("select * from messages;");
  const messages = query.all() as Message[];

  const html = `
  <html>
    <body>
      <h1>Messages</h1>
      <ul>
        ${messages.map((m) => `<li>${m.message}</li>`).join("")}
      </ul>
    </body>
    <form action="/create" method="post">
      <input type="text" name="message" />
      <button type="submit">Create</button>
    </form>
  </html>
  `;

  return c.html(html);
});

app.post("/create", async (c) => {
  const formData = await c.req.formData();
  const message = formData.get("message") as string;

  const insertQuery = db.query(
    `insert into messages (message) values (${JSON.stringify(message)})`
  );
  insertQuery.run();

  return c.redirect("/");
});

export default app;
