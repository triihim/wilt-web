import { useLocalization } from '../hooks/useLocalization';

export function LoadingIndicator() {
  const { t } = useLocalization();
  return (
    <>
      <span className="w-7 h-7 bg-emerald-400 rounded-md motion-safe:animate-spin"></span>
      <span className="motion-safe:hidden pl-2 font-semibold">{t('common.loading')}</span>
    </>
  );
}

export function CenteredLoadingIndicator() {
  return (
    <div className="flex justify-center items-center grow">
      <LoadingIndicator />
    </div>
  );
}
