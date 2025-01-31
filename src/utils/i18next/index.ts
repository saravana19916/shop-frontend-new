import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishLang from "./locales/english/englishLang.json";
import frenchLang from "./locales/french/frenchLang.json";
import chineseLang from "./locales/chinese/chineseLang.json";
import spanishLang from "./locales/spanish/spanishLang.json";
import germanLang from "./locales/german/germanLang.json";
import japaneseLang from "./locales/japanese/japaneseLang.json";
import russianLang from "./locales/russian/russianLang.json";
import arabicLang from "./locales/arabic/arabicLang.json";
import hindiLang from "./locales/india/hindiLang.json";
import portugueseLang from "./locales/portuguese/portugueseLang.json";
import italianLang from "./locales/italian/italianLang.json";
import turkishLang from "./locales/turkish/turkishLang.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  english: {
    translation: englishLang,
  },
  french: {
    translation: englishLang,
  },
  spanish: {
    translation: englishLang,
  },
  german: {
    translation: englishLang,
  },
  chinese: {
    translation: englishLang,
  },
  japanese: {
    translation: englishLang,
  },
  russian: {
    translation: englishLang,
  },
  arabic: {
    translation: englishLang,
  },
  hindi: {
    translation: englishLang,
  },
  portuguese: {
    translation: englishLang,
  },
  italian: {
    translation: englishLang,
  },
  turkish: {
    translation: englishLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "english",
    lng: "english", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
