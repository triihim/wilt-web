import dayjs from 'dayjs';
import { PropsWithChildren, createContext, useState } from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Locale, loadDayjsLocale, loadTranslationBundle, toSupportedLocale } from './config';
import clientStorage from '../clientStorage';

const changeI18nLanguage = async (locale: Locale) => {
  const translations = await loadTranslationBundle(locale);
  i18n.addResourceBundle(locale, 'translation', translations);
  await i18n.changeLanguage(locale);
};

const changeDayjsLocale = async (locale: Locale) => {
  await loadDayjsLocale(locale);
  dayjs.locale(locale);
};

type LocaleContext = {
  setLocale(locale: Locale): Promise<void>;
  currentLocale: Locale;
  isLoading: boolean;
};

export const LocaleContext = createContext<LocaleContext>({
  setLocale: async () => {},
  currentLocale: toSupportedLocale(navigator.language),
  isLoading: false,
});

export function LocaleContextProvider(props: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(toSupportedLocale(i18n.language));
  const [isLoading, setIsLoading] = useState(false);

  const changeLocale = async (locale: Locale) => {
    setIsLoading(true);
    await changeI18nLanguage(locale);
    await changeDayjsLocale(locale);
    setLocale(locale);
    clientStorage.setLocale(locale);
    setIsLoading(false);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleContext.Provider value={{ setLocale: changeLocale, currentLocale: locale, isLoading }}>
        {props.children}
      </LocaleContext.Provider>
    </I18nextProvider>
  );
}
