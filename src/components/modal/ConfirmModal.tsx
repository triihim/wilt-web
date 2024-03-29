import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { SubmitGroup } from '../SubmitGroup';
import { useLocalization } from '../../hooks/useLocalization';

type ConfirmModalProps = {
  prompt: string;
  onConfirm(): void;
  onCancel?(): void;
};

export function ConfirmModal(props: ConfirmModalProps) {
  const { setModalContent } = useContext(ModalContext);
  const { t } = useLocalization();
  return (
    <div className="flex flex-col gap-5 break-words">
      <p autoFocus>{props.prompt}</p>
      <SubmitGroup
        onCancel={() => (props.onCancel ? props.onCancel() : setModalContent(null))}
        onSubmit={props.onConfirm}
        submitButtonText={t('common.confirm')}
      />
    </div>
  );
}
