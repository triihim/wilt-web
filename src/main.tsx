import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import Login from './routes/login/Login';
import loginLoader from './routes/login/Login.loader';
import loginAction from './routes/login/Login.action';
import { RequireAuth } from './auth/RequireAuth';
import Timeline from './routes/Timeline';
import Learnings from './routes/learnings/Learnings';
import Learning from './routes/learnings/Learning';
import learningsLoader from './routes/learnings/Learnings.loader';
import learningLoader from './routes/learnings/Learning.loader';
import AppLayout from './layouts/AppLayout';
import logoutAction from './routes/logout/Logout.action';
import { createLearningAction } from './routes/learnings/Learning.action';
import ErrorView from './routes/ErrorView';

// TODO: Move to its own file
// TODO: Consider switching to createRoutesFromElements for readability
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to={'/timeline'} replace /> },
      {
        path: '/login',
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: '/',
        element: <RequireAuth />,
        errorElement: <ErrorView />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: '/learnings',
                element: <Learnings />,
                loader: learningsLoader,
                children: [
                  {
                    path: '/learnings/:learningId',
                    element: <Learning />,
                    loader: learningLoader,
                  },
                  {
                    path: '/learnings/new',
                    action: createLearningAction,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/logout',
        action: logoutAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
