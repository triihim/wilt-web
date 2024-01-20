import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocaleContextProvider } from './i18n/LocaleContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Initializer } from './util/components';
import { initI18n, initDayjs } from './i18n/config';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Initializer initFunctions={[initI18n, initDayjs]}>
      <LocaleContextProvider>
        <RouterProvider router={router} />
      </LocaleContextProvider>
    </Initializer>
  </React.StrictMode>,
);
