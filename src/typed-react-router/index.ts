/**
 * This is wrapper around selected react-router-dom utilities for better TypeScript support and usability.
 *
 * TODO: Add better typed loader and deferred loader.
 */

import Await from './components/Await';
import useAssertedLoaderData from './hooks/useAssertedLoaderData';
import defer from './functions/defer';

export { Await, useAssertedLoaderData, defer };
