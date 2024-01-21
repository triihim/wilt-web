import { useContext, useEffect, useState } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';
import { CenteredLoadingIndicator } from '../../../../components/LoadingIndicator';
import { ModalContext } from '../../../../components/modal/ModalContext';
import { ILearning, FetcherData } from '../../../../types';
import { ConfirmModal } from '../../../../components/modal/ConfirmModal';
import { LearningDetails } from './LearningDetails';
import { LearningEditControlPanel, LearningViewControlPanel } from './LearningDetailsControlPanel';
import { useLocalization } from '../../../../hooks/useLocalization';
import { Input } from '../../../../components/forms/Input';
import { TextArea } from '../../../../components/forms/TextArea';
import Markdown from 'react-markdown';

type LearningDetailsPageContentProps = {
  learning: ILearning;
};

export function LearningDetailsPageContent(props: LearningDetailsPageContentProps) {
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const returnToTimeline = () => {
    // TODO: Check that navigate(-1) returns to timeline. The user could have arrived to this page through a direct link
    // and navigate(-1) lead to a page outside the app. However, current behavior maintains pagination and search state on return.
    navigate(-1);
  };

  const enterEditingMode = () => setEditing(true);
  const leaveEditingMode = () => setEditing(false);

  return editing ? (
    <LearningEditView
      learning={props.learning}
      onCancel={leaveEditingMode}
      onReturn={returnToTimeline}
      onSaved={leaveEditingMode}
    />
  ) : (
    <LearningReadingView learning={props.learning} onEdit={enterEditingMode} onReturn={returnToTimeline} />
  );
}

type LearningReadingViewProps = {
  learning: ILearning;
  onEdit(): void;
  onReturn(): void;
};
function LearningReadingView(props: LearningReadingViewProps) {
  const { setModalContent } = useContext(ModalContext);
  const navigate = useNavigate();
  const { t } = useLocalization();
  const fetcher = useFetcher<FetcherData>();

  useEffect(() => {
    if (fetcher.data?.status === 'success') {
      navigate('/learnings', { replace: true });
    }
  }, [fetcher.data, navigate]);

  const initiateLearningDeletion = () => {
    fetcher.submit(null, {
      action: `/learnings/${props.learning.id}/delete`,
      method: 'DELETE',
      navigate: false,
    });
    setModalContent(null);
  };

  if (fetcher.state === 'submitting') return <CenteredLoadingIndicator />;

  const confirmDeletePromptText = `${t('learningDetailsPage.confirmDelete')}: ${props.learning.title}`;

  return (
    <>
      <LearningViewControlPanel
        onEdit={props.onEdit}
        onReturn={props.onReturn}
        onDelete={() =>
          setModalContent(<ConfirmModal prompt={confirmDeletePromptText} onConfirm={initiateLearningDeletion} />)
        }
      />
      <div className="grow my-5 pr-5 overflow-y-auto flex flex-col">
        <LearningDetails learning={props.learning} />
      </div>
    </>
  );
}

type LearningEditViewProps = {
  learning: ILearning;
  onCancel(): void;
  onReturn(): void;
  onSaved(): void;
};
function LearningEditView(props: LearningEditViewProps) {
  const { t } = useLocalization();
  const fetcher = useFetcher<FetcherData>();
  const [descriptionForPreview, setDescriptionForPreview] = useState(props.learning.description);

  const isSaving = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data?.status === 'success') {
      props.onSaved();
    }
  }, [fetcher.data, props]);

  // TODO: Prompt on cancel and return if the form is dirty.
  // TODO: Preview option for mobile.
  return (
    <fetcher.Form
      className="grow flex flex-col gap-3 overflow-y-auto"
      action={`/learnings/${props.learning.id}/update`}
      method="post"
    >
      <LearningEditControlPanel onReturn={props.onReturn} onCancel={props.onCancel} isSaving={isSaving} />
      {fetcher.data?.status === 'error' && (
        <ul className="text-red-500">
          {fetcher.data.messages.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-3 grow overflow-y-auto">
        <div>
          <Input
            name="title"
            label={t('learningForm.title')}
            className="font-bold text-3xl"
            defaultValue={props.learning.title}
            disabled={isSaving}
          />
        </div>
        <div className="grow flex gap-5">
          <div className="flex flex-col md:basis-1/2 grow">
            <TextArea
              name="description"
              className="grow resize-none"
              label={t('learningForm.description')}
              value={descriptionForPreview}
              onChange={(e) => setDescriptionForPreview(e.target.value)}
              disabled={isSaving}
            />
          </div>
          <div className="hidden md:flex md:flex-col md:basis-1/2 ">
            <label>{t('learningForm.preview')}</label>
            <div className="border-2 rounded-md p-2 grow">
              <Markdown className="prose max-w-none grow">{descriptionForPreview}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </fetcher.Form>
  );
}
