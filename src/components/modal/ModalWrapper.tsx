import { useRef, useContext, useEffect } from 'react';
import { hasAncestorWithId } from '../../util/dom';
import { ModalContext } from './ModalContext';

type ModalWrapperProps = {
  content: React.ReactNode;
};

export function ModalWrapper(props: ModalWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { setModalContent } = useContext(ModalContext);
  const MODAL_WRAPPER_ID = 'modal_wrapper';

  useEffect(() => {
    // Poor man's focus trap preventing focusing elements "below" the modal.
    const handleFocusChange = (e: FocusEvent) => {
      const isFocusTryingToEscape = !hasAncestorWithId(e.relatedTarget as HTMLElement, MODAL_WRAPPER_ID);
      if (isFocusTryingToEscape) {
        wrapperRef.current?.focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setModalContent(null);
      }
    };

    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  wrapperRef.current?.focus();

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center md:justify-center">
      <div
        id={MODAL_WRAPPER_ID}
        aria-label="Modaali"
        className="bg-white z-10 rounded-md p-5 w-9/12 md:w-1/2 grow-in mt-3 md:mt-0"
        role="dialog"
        aria-modal="true"
        tabIndex={0}
        ref={wrapperRef}
      >
        {props.content}
      </div>
      <Overlay />
    </div>
  );
}

function Overlay() {
  return <div className="w-full h-full opacity-75 bg-slate-900 absolute"></div>;
}
