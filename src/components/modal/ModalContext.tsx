import { PropsWithChildren, createContext, useState } from 'react';
import { createPortal } from 'react-dom';

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

type ModalWrapperProps = {
  content: React.ReactNode;
};

function ModalWrapper(props: ModalWrapperProps) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center md:justify-center">
      <div className="bg-white z-10 rounded-md p-5 w-9/12 md:w-1/2 grow-in mt-3 md:mt-0">{props.content}</div>
      <Overlay />
    </div>
  );
}

function Overlay() {
  return <div className="w-full h-full opacity-75 bg-slate-900 absolute"></div>;
}
