import React from 'react'

export const locales = {
    en: { name: 'English', code: 'en', lang: 'English', flag: 'EN'},
    es: { name: 'Spanish', code: 'es', lang: 'Espanol', flag: 'ES'},
    fr: { name: 'French', code: 'fr', lang: 'Francais', flag: 'FR'}
}

export const LanguageContext = React.createContext({
    lang: 'en',
    updateLocale: (lang) => {},
})