import i18n from "i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const getBackendLoadPath = () => {
  // import.meta.env.BASE_URL can be either '/' or '/retro'
  const baseUrl = import.meta.env.BASE_URL;
  return `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}locales/{{lng}}/{{ns}}.json`;
};

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    fallbackLng: "zh-TW",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: getBackendLoadPath(),
    },
  })
  .then();

export default i18n;
