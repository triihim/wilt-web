import { useContext, useEffect } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';
import { CenteredLoadingIndicator } from '../../../../components/LoadingIndicator';
import ConfirmModal from '../../../../components/modal/ConfirmModal';
import { ModalContext } from '../../../../components/modal/ModalContext';
import { ILearning, FetcherData } from '../../../../types';
import Controls from './LearningDetailsControlPanel';
import LearningDetails from './LearningDetails';

type LearningDetailsPageContentProps = {
  learning: ILearning;
};

export default function LearningDetailsPageContent(props: LearningDetailsPageContentProps) {
  const navigate = useNavigate();
  const { setModalContent } = useContext(ModalContext);
  const fetcher = useFetcher<FetcherData>();

  const initiateLearningDeletion = () => {
    fetcher.submit(null, {
      action: `/learnings/${props.learning.id}/delete`,
      method: 'DELETE',
      navigate: false,
    });
    setModalContent(null);
  };

  useEffect(() => {
    if (fetcher.data?.status === 'success') {
      navigate('/learnings', { replace: true });
    }
  }, [fetcher.data, navigate]);

  if (fetcher.state === 'submitting') return <CenteredLoadingIndicator />;

  return (
    <>
      <Controls
        onDelete={() => setModalContent(<ConfirmModal prompt="Confirm delete" onConfirm={initiateLearningDeletion} />)}
        onReturn={() => navigate(-1)}
      />
      <LearningDetails learning={props.learning} />
    </>
  );
}
