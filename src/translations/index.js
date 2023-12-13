/* eslint-disable camelcase */
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import languagePackageEng from './en.json'
import languagePackageVi from './vi.json'

i18next
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
      en: {
        translation: languagePackageEng
      },
      vi: {
        translation: languagePackageVi
      }
    },
    debug: true,
    fallbackLng: "en"
  });

export default i18next;
