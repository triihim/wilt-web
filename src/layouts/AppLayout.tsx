import { Form, NavLink, NavLinkProps, Outlet, useNavigation } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button';
import { LoadingIndicator } from '../components/LoadingIndicator';

export default function AppLayout() {
  return (
    <div>
      <MainHeader />
      <Outlet />
    </div>
  );
}

function MainHeader() {
  const navigation = useNavigation();
  return (
    <header className="flex items-center justify-between py-5 md:py-8 relative">
      <div className="flex items-center gap-5">
        <h1 className="text-4xl font-bold align-bottom">wilt</h1>
        {navigation.state === 'loading' && <LoadingIndicator />}
      </div>
      <MainMenuNavigation />
    </header>
  );
}

// TODO: Refactor & style better
function MainMenuNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <Button variant="secondary" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? 'Close' : 'Menu'}
        </Button>
        <nav
          className={[
            menuOpen ? '' : 'hidden',
            'absolute right-1 mt-2 border-2 border-current rounded-md font-bold text-center bg-white',
          ].join(' ')}
        >
          <ul>
            <li className="py-3 px-4">
              <NavLink to={'/learnings'}>Learnings</NavLink>
            </li>
            <li className="py-3 px-4">
              <Form method="post" action="/logout">
                <Button variant="secondary">Logout</Button>
              </Form>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden md:flex md:items-center md:gap-10">
        <nav>
          <ul className="flex font-bold gap-5 md:text-lg md:gap-10">
            <li>
              <MainHeaderNavLink to={'/learnings'}>Learnings</MainHeaderNavLink>
            </li>
          </ul>
        </nav>
        <Form method="post" action="/logout">
          <Button variant="secondary">Logout</Button>
        </Form>
      </div>
    </>
  );
}

function MainHeaderNavLink(props: NavLinkProps) {
  const activeStyles = 'border-b-4 border-current border-emerald-500';
  const defaultStyles = 'px-2 hover:text-emerald-500';
  return (
    <NavLink {...props} className={({ isActive }) => (isActive ? activeStyles : '') + ' ' + defaultStyles}>
      {props.children}
    </NavLink>
  );
}
