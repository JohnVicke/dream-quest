export function exhaustive(_x: never): never {
  throw new Error("exhaustive check failed");
}
