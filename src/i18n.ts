import i18n from "i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const langs = [
  {
    label: "繁體中文",
    value: "zh-TW",
  },
  {
    label: "简体中文",
    value: "zh-CN",
  },
]

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    fallbackLng: "zh-TW",
    supportedLngs: langs.map(lang => lang.value),
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
      requestOptions: {
        cache: 'force-cache', // 启用浏览器缓存
      },
    },
    // 预加载所有语言资源
    preload: langs.map(lang => lang.value),
    // 使用 Suspense 模式避免切换时的闪烁
    react: {
      useSuspense: true,
    },
  })
  .then();

export default i18n;
