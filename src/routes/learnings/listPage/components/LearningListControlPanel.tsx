import { useContext, useEffect } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { ControlPanel } from '../../../../components/ControlPanel';
import { SubmitGroup } from '../../../../components/SubmitGroup';
import { Input } from '../../../../components/forms/Input';
import { TextArea } from '../../../../components/forms/TextArea';
import { ModalContext } from '../../../../components/modal/ModalContext';
import { ILearning, FetcherData } from '../../../../types';
import { useLocalization } from '../../../../hooks/useLocalization';

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
          className={`w-full md:w-fit ${props.highlightAddLearningButton ? 'md:animate-bounce' : ''}`}
          onClick={openLearningCreationModal}
        >
          {t('learningListPage.addLearning')}
        </Button>
      </ControlPanel.ControlGroup>
      <ControlPanel.ControlGroup>
        <Input
          placeholder={t('learningListPage.searchByTitle')}
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

  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data?.status === 'success') {
      // TODO: Validate response type
      props.onSubmitted(fetcher.data.response as ILearning);
    }
  }, [fetcher.data, props]);

  return (
    <div className="flex flex-col gap-10">
      <fetcher.Form className="flex flex-col gap-5" method="post" action="/learnings/new">
        <div>
          <Input autoFocus name="title" label={t('learningForm.title')} disabled={isSubmitting} />
        </div>
        <div>
          <TextArea
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
          disabled={isSubmitting}
          onCancel={props.onCancel}
        />
      </fetcher.Form>
    </div>
  );
}
