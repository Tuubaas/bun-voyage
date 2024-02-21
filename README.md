# bun-voyage

This repo contains the code used in tha talk!
Feel free to fork this repo and PLAY around with it as you want!

## hono-http

The http server example using Hono and Bun's built-in SQLite DB. 

```
cd hono-http
bun install
bun run dev
```

## websocket-server

The websocket server example using Bun's built-in websocket handler.

```
cd websocket-server
bun install
bun run dev
```

To test the server you can use the client in `websocket-client`. 

```
cd websocket-client
bun install
bun run dev --port 3001
```

Start as many instances as you want, just make sure to run the on different ports.

## ffi

The Foreign Function Interface example.
Note: This example uses rust, so the rust compiler is needed if you want to make changes to the `add.rs` file.

```
cd ffi
bun install
bun run index.ts
```

To recomile the `add.rs` file:

```
cd ffi
rustc add.rs
```

## shell

The Bun $-shell example.
Note: Not all bash commands are implemented, see the Bun docs for more info.

```
cd shell
bun install
npm run index.ts
```
or
```
npm run build.ts
```
