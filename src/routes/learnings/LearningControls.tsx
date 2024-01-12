import { useContext, useEffect } from 'react';
import Button from '../../components/Button';
import { ModalContext } from '../../Modal';
import Input from '../../components/forms/Input';
import { useFetcher } from 'react-router-dom';
import { FetcherData } from '../../types';

export default function LearningControls() {
  const { setModalContent } = useContext(ModalContext);

  return (
    <div className="flex justify-end bg-slate-100 p-5 rounded-md">
      <Button
        variant="primary"
        onClick={() =>
          setModalContent(
            <LearningCreationForm onCancel={() => setModalContent(null)} onSubmitted={() => setModalContent(null)} />,
          )
        }
      >
        Add learning
      </Button>
    </div>
  );
}

type LearningCreationFormProps = {
  onSubmitted: () => void;
  onCancel: () => void;
};

function LearningCreationForm(props: LearningCreationFormProps) {
  const fetcher = useFetcher<FetcherData>();

  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data?.status === 'success') {
      props.onSubmitted();
    }
  }, [fetcher.data, props]);

  return (
    <div className="flex flex-col gap-10">
      <fetcher.Form className="flex flex-col gap-5" method="post" action="/learnings/new">
        <Input name="title" label="Title" disabled={isSubmitting} />
        <Input name="description" label="Description" disabled={isSubmitting} />
        <div className="flex gap-5 justify-between">
          <p className="text-red-500">{fetcher.data?.status === 'error' ? fetcher.data.message : ''}</p>
          <div className="flex gap-5">
            <Button variant="secondary" type="button" onClick={props.onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
}
