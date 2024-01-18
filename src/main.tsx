import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import Login from './routes/login/Login';
import loginLoader from './routes/login/Login.loader';
import loginAction from './routes/login/Login.action';
import { RequireAuth } from './auth/RequireAuth';
import Learnings from './routes/learnings/listPage/LearningListPage';
import LearningDetailsPage from './routes/learnings/detailsPage/LearningDetailsPage';
import learningsLoader from './routes/learnings/listPage/loaders';
import learningLoader from './routes/learnings/detailsPage/loaders';
import logoutAction from './routes/logout/Logout.action';
import { createLearningAction, deleteLearningAction } from './routes/learnings/detailsPage/actions';
import ErrorView from './routes/ErrorView';

// TODO: Move to its own file
// TODO: Consider switching to createRoutesFromElements for readability
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorView />,
    children: [
      { index: true, element: <Navigate to={'/learnings'} replace /> },
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
            path: '/learnings',
            element: <Learnings />,
            loader: learningsLoader,
          },
          {
            path: '/learnings/new',
            action: createLearningAction,
          },
          {
            path: '/learnings/:learningId',
            element: <LearningDetailsPage />,
            loader: learningLoader,
            shouldRevalidate: (args) => args.formMethod !== 'delete',
            children: [
              {
                path: '/learnings/:learningId/delete',
                action: deleteLearningAction,
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
