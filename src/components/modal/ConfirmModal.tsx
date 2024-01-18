import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import SubmitGroup from '../SubmitGroup';

type ConfirmModalProps = {
  prompt: string;
  onConfirm(): void;
  onCancel?(): void;
};

export default function ConfirmModal(props: ConfirmModalProps) {
  const { setModalContent } = useContext(ModalContext);
  return (
    <div className="flex flex-col gap-5">
      <p autoFocus>{props.prompt}</p>
      <SubmitGroup
        onCancel={() => (props.onCancel ? props.onCancel() : setModalContent(null))}
        onSubmit={props.onConfirm}
        submitText={'Confirm'}
      />
    </div>
  );
}
