import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Note: locale is slightly misleading term here, since there is currently no differentiation between en-us, en-gb etc.
export const supportedLocales = ['en', 'fi', 'sv'] as const;

export type Locale = (typeof supportedLocales)[number];

export const navigatorLanguageToSupportedLocale = (language: string): Locale => {
  // Safari on iOS prior to 10.2, the country code returned is lowercase: "en-us", "fr-fr" etc. (https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)
  const normalizedLanguageCode = language.toLowerCase();
  const match = supportedLocales.find((l) => normalizedLanguageCode.startsWith(l));
  return match || 'en'; // Fallback to en.
};

export const loadTranslationBundle = async (locale: Locale) => {
  return await import(`./translations/${locale}.json`);
};

export const loadDayjsLocale = async (locale: Locale) => {
  switch (locale) {
    case 'fi':
      await import('dayjs/locale/fi');
      break;
    case 'sv':
      await import('dayjs/locale/sv');
      break;
    default:
      break; // 'en' included by default.
  }
};

export const initDayjs = async (initialLocale?: Locale) => {
  const locale = navigatorLanguageToSupportedLocale(initialLocale || navigator.language);
  await loadDayjsLocale(locale);
  dayjs.extend(localizedFormat);
  dayjs.locale(locale);
};

export const initI18n = async (initialLocale?: Locale) => {
  const initialLanguage = navigatorLanguageToSupportedLocale(initialLocale || navigator.language);
  const translation = await import(`./translations/${initialLanguage}.json`);
  i18n.use(initReactI18next).init({
    resources: { [initialLanguage]: { translation } },
    lng: initialLanguage,
  });
};
