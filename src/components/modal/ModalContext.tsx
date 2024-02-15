import { PropsWithChildren, createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalWrapper } from './ModalWrapper';

type ModalContext = {
  setModalContent(content: React.ReactNode | null): void;
};

export const ModalContext = createContext<ModalContext>({ setModalContent: () => {} });

export function ModalContextProvider(props: PropsWithChildren) {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  return (
    <ModalContext.Provider value={{ setModalContent }}>
      {modalContent && createPortal(<ModalWrapper content={modalContent} />, document.body)}
      {props.children}
    </ModalContext.Provider>
  );
}
