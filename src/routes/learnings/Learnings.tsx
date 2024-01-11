import { Link, useOutlet } from 'react-router-dom';
import { ValidatorFunction } from '../../util/validators';
import useAssertedLoaderData from '../../typed-react-router/hooks/useAssertedLoaderData';
import { LoaderResponse } from './Learnings.loader';

// Note: does not currently validate the structure of an individual learning.
const loaderDataValidator: ValidatorFunction = (data) => !!data && typeof data === 'object' && 'learnings' in data;

export default function Learnings() {
  const data = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);
  const outlet = useOutlet();

  const isOutletUsed = outlet !== null;

  return (
    <div className="flex">
      <ul className={isOutletUsed ? 'hidden md:block' : 'flex-grow'}>
        {data.learnings.map((learning) => (
          <li key={learning.id}>
            <Link to={`/learnings/${learning.id}`}>
              <article className="py-2 px-4 my-2 border-2 border-current rounded-md hover:bg-emerald-400">
                <h2 className="font-bold">{learning.title}</h2>
                <time className="text-sm" dateTime={learning.createdAt}>
                  {learning.createdAt}
                </time>
              </article>
            </Link>
          </li>
        ))}
      </ul>
      {outlet}
    </div>
  );
}
