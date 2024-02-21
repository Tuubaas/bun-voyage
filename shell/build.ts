import { $ } from "bun";

await $`cd ../websocket-client && bun run build`;
await $`cd ../websocket-client && bun run preview`;
