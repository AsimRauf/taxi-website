import { NavTranslations } from '@/types/translations'
import nlTranslations from '@/locales/nl.json'
import enTranslations from '@/locales/en.json'

// Add type assertion to match NavTranslations interface
const nlTranslationsTyped = nlTranslations as unknown as NavTranslations
const enTranslationsTyped = enTranslations as unknown as NavTranslations

export const getTranslations = (locale: string): NavTranslations => {
  const selectedTranslations = locale === 'en' ? enTranslationsTyped : nlTranslationsTyped
  return {
    locale,
    nav: selectedTranslations.nav,
    auth: selectedTranslations.auth,
    hero: {
      ...selectedTranslations.hero,
      formTitle: selectedTranslations.hero.formTitle || '',
      pickup: selectedTranslations.hero.pickup || '',
      destination: selectedTranslations.hero.destination || '',
      person: selectedTranslations.hero.person || '',
      people: selectedTranslations.hero.people || ''
    },
    booking: selectedTranslations.booking
  }
}
