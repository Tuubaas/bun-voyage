import { dlopen, FFIType, suffix } from "bun:ffi";

const path = `libadd.${suffix}`;

const lib = dlopen(path, {
  add: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  sub: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
});

const sum = lib.symbols.add(1, 2);

console.log(`Adding 1 and 2 using add.rs: ${sum}`);

const diff = lib.symbols.sub(10, 5);

console.log(`Subtracting 5 from 10 using add.rs: ${diff}`);
