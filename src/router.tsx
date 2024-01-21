import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { RootLayout } from './layouts/RootLayout';
import {
  createLearningAction,
  deleteLearningAction,
  updateLearningAction,
} from './routes/learnings/detailsPage/actions';
import { ErrorView } from './routes/ErrorView';
import { LearningDetailsPage } from './routes/learnings/detailsPage/LearningDetailsPage';
import { LoginPage } from './routes/login/LoginPage';
import { loginAction } from './routes/login/actions';
import { loginLoader } from './routes/login/loaders';
import { logoutAction } from './routes/logout/actions';
import { listPageLoader } from './routes/learnings/listPage/loaders';
import { LearningListPage } from './routes/learnings/listPage/LearningListPage';
import { learningLoader } from './routes/learnings/detailsPage/loaders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorView />,
    children: [
      { index: true, element: <Navigate to={'/learnings'} replace /> },
      {
        path: '/login',
        element: <LoginPage />,
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
            element: <LearningListPage />,
            loader: listPageLoader,
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
              {
                path: '/learnings/:learningId/update',
                action: updateLearningAction,
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
