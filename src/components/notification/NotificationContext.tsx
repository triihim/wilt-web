import React, { PropsWithChildren, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconType } from 'react-icons';
import { GrStatusWarning, GrStatusGood, GrStatusInfo, GrStatusCritical } from 'react-icons/gr';
import { Button } from '../Button';
import { useLocalization } from '../../hooks/useLocalization';

export type Notification = {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
};

type NotificationContext = {
  setNotification(notification: Notification | null): void;
};

export const NotificationContext = createContext<NotificationContext>({ setNotification: () => {} });

export function NotificationContextProvider(props: PropsWithChildren) {
  const [notification, setNotification] = useState<Notification | null>(null);
  return (
    <NotificationContext.Provider value={{ setNotification }}>
      {notification && createPortal(<Notification {...notification} />, document.body)}
      {props.children}
    </NotificationContext.Provider>
  );
}

const iconMap: { [K in Notification['type']]: IconType } = {
  error: GrStatusCritical,
  warning: GrStatusWarning,
  info: GrStatusInfo,
  success: GrStatusGood,
};

const styleMap: { [K in Notification['type']]: string } = {
  error: 'bg-red-200',
  warning: 'bg-yellow-200',
  info: 'bg-blue-200',
  success: 'bg-green-200',
};

function Notification({ type, message }: Notification) {
  const { setNotification } = useContext(NotificationContext);
  const { t } = useLocalization();

  return (
    <div
      className={`fixed bottom-5 right-5 left-5 xl:left-1/2 px-4 py-2
        slide-in-x transition-all 
        border-current border-2 rounded-md 
        font-semibold gap-2 
        flex justify-between 
        focus:outline
        outline-offset-4
      ${styleMap[type]}`}
    >
      <p className="flex items-center gap-2" tabIndex={0} role="alert" aria-live="polite">
        <span>{React.createElement(iconMap[type], { size: 30 })}</span>
        <span aria-label={t('notification.a11y.label')}>{message}</span>
      </p>
      <Button
        variant={'tertiary'}
        onClick={() => setNotification(null)}
        aria-description={t('notification.a11y.dismissNotification')}
      >
        {t('common.close')}
      </Button>
    </div>
  );
}
