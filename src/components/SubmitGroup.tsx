import { useLocalization } from '../hooks/useLocalization';
import { Button } from './Button';

type SubmitGroupProps = {
  submitText?: string;
  onCancel?(): void;
  onSubmit?(): void;
  disabled?: boolean;
  errors?: string[];
};

export function SubmitGroup(props: SubmitGroupProps) {
  const { t } = useLocalization();
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
          {t('common.cancel')}
        </Button>
        <Button variant="primary" type="submit" disabled={props.disabled} onClick={props.onSubmit}>
          {props.submitText || t('common.save')}
        </Button>
      </div>
    </div>
  );
}
