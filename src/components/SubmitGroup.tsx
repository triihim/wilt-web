import { useLocalization } from '../hooks/useLocalization';
import { Button } from './Button';

type SubmitGroupProps = {
  submitButtonText?: string;
  onCancel?(): void;
  onSubmit?(): void;
  disabled?: boolean;
  submitting?: boolean;
  errors?: string[];
};

export function SubmitGroup(props: SubmitGroupProps) {
  const { t } = useLocalization();
  return (
    <div className="flex justify-between gap-5">
      <SubmitStatus submitting={!!props.submitting} errors={props.errors} />
      <div className="flex gap-5 justify-end">
        <Button
          variant="secondary"
          type="button"
          disabled={props.disabled || props.submitting}
          onClick={props.onCancel}
        >
          {t('common.cancel')}
        </Button>
        <Button variant="primary" type="submit" disabled={props.disabled || props.submitting} onClick={props.onSubmit}>
          {props.submitButtonText || t('common.save')}
        </Button>
      </div>
    </div>
  );
}

type SubmitStatusProps = {
  errors?: Array<string>;
  submitting: boolean;
};

function SubmitStatus(props: SubmitStatusProps) {
  const { t } = useLocalization();
  const focusable = (props.errors && props.errors.length > 0) || props.submitting;
  return (
    <div role="status" aria-live="polite" tabIndex={focusable ? 0 : -1}>
      {props.submitting && <p className="text-green-600 font-semibold">{t('common.submitting')}</p>}
      {!props.submitting && <SubmitErrors errors={props.errors} />}
    </div>
  );
}

function SubmitErrors(props: Pick<SubmitStatusProps, 'errors'>) {
  const { t } = useLocalization();
  if (!props.errors || props.errors.length === 0) return null;
  return (
    <>
      <p className="text-red-500">{t('common.validationError')}</p>
      {props.errors?.map((error) => (
        <p className="text-red-500" key={error}>
          {error}
        </p>
      ))}
    </>
  );
}
