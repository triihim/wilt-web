/**
 * Allows typing the data given to defer-function for better typescript support.
 */
import { defer as RRDdefer } from 'react-router-dom';

export default function defer<T extends Record<string, unknown>>(data: T) {
  return RRDdefer(data);
}
