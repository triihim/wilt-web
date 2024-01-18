import { Await, useNavigate, useFetcher } from 'react-router-dom';
import { Suspense, useContext, useEffect } from 'react';
import { ValidatorFunction } from '../../util/validators';
import useAssertedLoaderData from '../../hooks/useAssertedLoaderData';
import { FetcherData, ILearning } from '../../types';
import { LoaderResponse } from './Learning.loader';
import Button from '../../components/Button';
import ErrorView from '../ErrorView';
import { CenteredLoadingIndicator } from '../../components/LoadingIndicator';
import ControlPanel from '../../components/ControlPanel';
import { ModalContext } from '../../components/modal/ModalContext';
import ConfirmModal from '../../components/modal/ConfirmModal';
import raiseError from '../../util/raiseError';
import { isLearning } from './Learning.action';

const loaderDataValidator: ValidatorFunction = (data) =>
  !!data && typeof data === 'object' && 'learningPromise' in data;

export default function Learning() {
  const data = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);
  return (
    <Suspense fallback={<CenteredLoadingIndicator />}>
      <Await resolve={data.learningPromise} errorElement={<ErrorView />}>
        {(learning) =>
          isLearning(learning) ? (
            <LearningView learning={learning} />
          ) : (
            raiseError('invalid-loader-response', 'Received invalid object to render as a learning')
          )
        }
      </Await>
    </Suspense>
  );
}

type LearningViewProps = {
  learning: ILearning;
};

function LearningView(props: LearningViewProps) {
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
      <LearningControls
        learning={props.learning}
        onDelete={() => setModalContent(<ConfirmModal prompt="Confirm delete" onConfirm={initiateLearningDeletion} />)}
        onReturn={() => navigate(-1)}
      />
      <LearningDetails learning={props.learning} />
    </>
  );
}

function LearningDetails({ learning }: LearningViewProps) {
  return (
    <article>
      <h2 className="font-bold text-2xl mt-4">{learning.title}</h2>
      <p className="text-sm">
        Created: <time>{learning.createdAt}</time>
      </p>
      <p className="text-sm">
        Updated: <time>{learning.updatedAt}</time>
      </p>
      <p className="mt-4">{learning.description}</p>
    </article>
  );
}

type LearningControlsProps = LearningViewProps & {
  onReturn(): void;
  onDelete(): void;
};

function LearningControls(props: LearningControlsProps) {
  return (
    <ControlPanel alwaysSingleRow>
      <ControlPanel.ControlGroup>
        <Button variant="secondary" onClick={props.onReturn}>
          Return
        </Button>
      </ControlPanel.ControlGroup>
      <ControlPanel.ControlGroup alignItems="right">
        <Button variant="danger" onClick={props.onDelete}>
          Delete
        </Button>
      </ControlPanel.ControlGroup>
    </ControlPanel>
  );
}
