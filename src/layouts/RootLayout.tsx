import { Form, NavLink, NavLinkProps, Outlet, useLocation } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Button } from '../components/Button';
import { useLocalization } from '../hooks/useLocalization';
import { ModalContextProvider } from '../components/modal/ModalContext';
import { GrLanguage } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { Locale, supportedLocales } from '../i18n/config';

export function RootLayout() {
  const { pathname } = useLocation();
  const atLoginPage = pathname.indexOf('/login') !== -1;
  return (
    <ModalContextProvider>
      <div className="w-11/12 lg:w-3/4 m-auto font-nunito transition-[width] duration-500 min-h-svh max-h-lvh flex flex-col gap-5 pt-5 md:py-5">
        {!atLoginPage && <MainHeader />}
        <main className="grow flex flex-col overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ModalContextProvider>
  );
}

function MainHeader() {
  const { isLoading: localizationChangePending } = useLocalization();

  const showLoader = localizationChangePending;

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold align-bottom">wilt</h1>
        {showLoader && <LoadingIndicator />}
      </div>
      <MainMenuNavigation />
    </header>
  );
}

function MainMenuNavigation() {
  const { t } = useLocalization();
  return (
    <nav className="flex items-center justify-center gap-5 md:gap-10">
      <ul className="font-bold">
        <li>
          <MainHeaderNavLink to={'/learnings'}>{t('nav.learnings')}</MainHeaderNavLink>
        </li>
      </ul>
      <Form method="post" action="/logout">
        <Button type="submit" variant="secondary">
          {t('nav.logout')}
        </Button>
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

function Footer() {
  return (
    <footer className="p-3 rounded-t-md md:rounded-md md:p-5 bg-slate-100">
      <LocaleSelector />
    </footer>
  );
}

// TODO: Extract dropdown menu stuff to its own component.
function LocaleSelector() {
  const { currentLocale, setLocale, t } = useLocalization();
  const [open, setOpen] = useState(false);

  const selectLocale = (locale: Locale) => {
    setLocale(locale);
    setOpen(false);
  };

  const openSelector = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  useEffect(() => {
    const closeMenuClick = () => {
      setOpen(false);
    };

    if (open) {
      document.addEventListener('click', closeMenuClick);
    }
    return () => document.removeEventListener('click', closeMenuClick);
  }, [open]);

  return (
    <div className="relative" onKeyDown={(e) => e.code.toLowerCase() === 'escape' && setOpen(false)}>
      <Button variant="tertiary" onClick={openSelector}>
        <span className="flex items-center gap-2 align-bottom">
          <GrLanguage size={20} />
          {t(`locales.${currentLocale}`)}
        </span>
      </Button>
      {open && (
        <ul className="border-2 border-slate-300 absolute bottom-full left-0 bg-slate-100 rounded-md">
          {supportedLocales.map((locale) => (
            <li
              tabIndex={0}
              className="px-5 py-3 hover:bg-emerald-300 cursor-pointer font-semibold"
              key={locale}
              onClick={() => selectLocale(locale)}
              onKeyDown={(e) => ['enter', 'space'].includes(e.code.toLowerCase()) && selectLocale(locale)}
            >
              {t(`locales.${locale}`)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
