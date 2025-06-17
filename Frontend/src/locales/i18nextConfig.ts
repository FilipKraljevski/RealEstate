import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from "./en/translation.json";
import mkTranslation from "./mk/translation.json";

const resources = {
    en: { translation: enTranslation},
    mk: { translation: mkTranslation}
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false,
    } 
})

export default i18n;