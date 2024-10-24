import i18n from "i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

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
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
  })
  .then();

export default i18n;
