import { Outlet } from 'react-router-dom';

export function RootLayout() {
  return (
    <main className="w-11/12 md:w-3/4 m-auto font-nunito">
      <Outlet />
    </main>
  );
}
