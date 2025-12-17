import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // 1. Await the locale (it might be undefined)
  let locale = await requestLocale;

  // 2. Validate it. If undefined or invalid, force default.
  // The 'as any' casting helps TypeScript accept the check.
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    // 3. We are now sure 'locale' is a string
    locale, 
    messages: (await import(`../messages/${locale}.json`)).default
  };
});