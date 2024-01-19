import { useContext } from 'react';
import { LocaleContext } from '../i18n/LocaleContext';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

/**
 * Using dayjs through this hook ensures dependency on LocaleContext which in turn ensures changes are propagated properly on change.
 * Also, provides access to useTranslation's t for translation. Removes the need of extra useTranslation in contexts where this hook is used.
 */
export function useLocalization() {
  const { currentLocale, setLocale, isLoading } = useContext(LocaleContext);
  const { t } = useTranslation();

  return { setLocale, currentLocale, dayjs, isLoading, t };
}
