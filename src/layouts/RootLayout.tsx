import { Form, NavLink, NavLinkProps, Outlet, useLocation, useNavigation } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Button } from '../components/Button';
import { useLocalization } from '../hooks/useLocalization';

export function RootLayout() {
  const { pathname } = useLocation();
  const atLoginPage = pathname.indexOf('/login') !== -1;
  return (
    <main className="w-11/12 lg:w-3/4 m-auto font-nunito transition-[width] duration-500">
      {!atLoginPage && <MainHeader />}
      <Outlet />
    </main>
  );
}

function MainHeader() {
  const navigation = useNavigation();
  const { isLoading: localizationChangePending } = useLocalization();

  const showLoader = navigation.state === 'loading' || localizationChangePending;

  return (
    <header className="flex items-center justify-between py-5">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold align-bottom">wilt</h1>
        {showLoader && <LoadingIndicator />}
      </div>
      <MainMenuNavigation />
    </header>
  );
}

function MainMenuNavigation() {
  return (
    <nav className="flex items-center justify-center gap-5 md:gap-10">
      <ul className="font-bold">
        <li>
          <MainHeaderNavLink to={'/learnings'}>Learnings</MainHeaderNavLink>
        </li>
      </ul>
      <Form method="post" action="/logout">
        <Button variant="secondary">Logout</Button>
      </Form>
    </nav>
  );
}

function MainHeaderNavLink(props: NavLinkProps) {
  const activeStyles = 'border-b-2 md:border-b-4 border-current border-emerald-500';
  const defaultStyles = 'px-1 md:px-2 hover:text-emerald-500 outline-offset-4';
  return (
    <NavLink {...props} className={({ isActive }) => (isActive ? activeStyles : '') + ' ' + defaultStyles}>
      {props.children}
    </NavLink>
  );
}
