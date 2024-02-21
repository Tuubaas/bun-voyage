import { $ } from "bun";

await $`echo 1. This is JS and Bash-ish?`;

await $`echo Netlight is awesome! > nl.txt`;

await $`ls`;

const text = await $`cat nl.txt`.text();

console.log("2. JS: " + text);

await $`echo 3. Bash: ${text}`;

await $`rm nl.txt`;

await $`ls`;
