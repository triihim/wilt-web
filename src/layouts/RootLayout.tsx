import { Outlet } from 'react-router-dom';
import { ModalContextProvider } from '../components/modal/ModalContext';

export function RootLayout() {
  return (
    <main className="w-11/12 lg:w-3/4 m-auto font-nunito transition-[width] duration-500">
      <ModalContextProvider>
        <Outlet />
      </ModalContextProvider>
    </main>
  );
}
