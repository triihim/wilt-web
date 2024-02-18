import { useContext, useEffect, useRef } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { ControlPanel } from '../../../../components/ControlPanel';
import { SubmitGroup } from '../../../../components/SubmitGroup';
import { Input } from '../../../../components/forms/Input';
import { TextArea } from '../../../../components/forms/TextArea';
import { ModalContext } from '../../../../components/modal/ModalContext';
import { ILearning, FetcherData } from '../../../../types';
import { useLocalization } from '../../../../hooks/useLocalization';
import { NotificationContext } from '../../../../components/notification/NotificationContext';

type LearningControlsProps = {
  titleFilter: string;
  onTitleFilterChange(title: string): void;
  highlightAddLearningButton?: boolean;
};

export function LearningListControlPanel(props: LearningControlsProps) {
  const { setModalContent } = useContext(ModalContext);
  const navigate = useNavigate();
  const { t } = useLocalization();

  const openLearningCreationModal = () => {
    setModalContent(
      <LearningCreationForm
        onCancel={() => setModalContent(null)}
        onSubmitted={() => {
          setModalContent(null);
          navigate(`/learnings?page=0`);
        }}
      />,
    );
  };

  return (
    <ControlPanel>
      <ControlPanel.ControlGroup>
        <Button
          variant="primary"
          className={`w-full md:w-fit ${props.highlightAddLearningButton ? 'md:motion-safe:animate-bounce' : ''}`}
          onClick={openLearningCreationModal}
        >
          {t('learningListPage.addLearning')}
        </Button>
      </ControlPanel.ControlGroup>
      <ControlPanel.ControlGroup>
        <Input
          inlineLabel
          label={t('learningListPage.searchByTitle')}
          id="title-search"
          data-testid="title-search"
          value={props.titleFilter}
          onChange={(e) => props.onTitleFilterChange(e.target.value)}
        />
      </ControlPanel.ControlGroup>
    </ControlPanel>
  );
}

type LearningCreationFormProps = {
  onSubmitted: (createdLearning: ILearning) => void;
  onCancel: () => void;
};

function LearningCreationForm(props: LearningCreationFormProps) {
  const fetcher = useFetcher<FetcherData>();
  const { t } = useLocalization();
  const { setNotification } = useContext(NotificationContext);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data?.status === 'success') {
      setNotification({ type: 'success', message: t('learningForm.successMessage') });
      // TODO: Validate response type
      props.onSubmitted(fetcher.data.response as ILearning);
    }
  }, [fetcher.data, props]);

  return (
    <section aria-description={t('learningForm.a11y.description')}>
      <fetcher.Form className="flex flex-col gap-5" method="post" action="/learnings/new">
        <div>
          <Input id="title" name="title" label={t('learningForm.title')} disabled={isSubmitting} ref={titleInputRef} />
        </div>
        <div>
          <TextArea
            id="description"
            name="description"
            label={t('learningForm.description')}
            disabled={isSubmitting}
            rows={5}
            maxLength={2000}
            className="resize-none"
          />
        </div>
        <SubmitGroup
          errors={fetcher.data?.status === 'error' ? fetcher.data.messages : []}
          submitting={isSubmitting}
          onCancel={props.onCancel}
        />
      </fetcher.Form>
    </section>
  );
}
