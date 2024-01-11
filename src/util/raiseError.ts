export default function raiseError(message: string): never {
  throw new Error(message);
}
