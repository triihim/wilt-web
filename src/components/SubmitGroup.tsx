import Button from './Button';

type SubmitGroupProps = {
  submitText?: string;
  onCancel?(): void;
  onSubmit?(): void;
  disabled?: boolean;
  errors?: string[];
};

export default function SubmitGroup(props: SubmitGroupProps) {
  return (
    <div className="flex justify-between gap-5">
      <div>
        {props.errors?.map((error) => (
          <p className="text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
      <div className="flex gap-5 justify-end">
        <Button variant="secondary" type="button" disabled={props.disabled} onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={props.disabled} onClick={props.onSubmit}>
          {props.submitText || 'Submit'}
        </Button>
      </div>
    </div>
  );
}
