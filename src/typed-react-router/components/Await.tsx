/**
 * Circumvents the issue of undetected implicit any in Await's render function.
 */
import { Await as RRDAwait, AwaitProps as RRDAwaitProps } from 'react-router-dom';

interface TypedAwaitProps<T> extends RRDAwaitProps {
  resolve: Promise<T>;
  children: React.ReactNode | ((data: Awaited<T>) => React.ReactNode);
}

export default function Await<T = unknown>(props: TypedAwaitProps<T>) {
  return <RRDAwait {...props}></RRDAwait>;
}
