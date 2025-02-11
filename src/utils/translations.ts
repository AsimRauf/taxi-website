import { NavTranslations } from '@/types/translations'
import nlTranslations from '@/locales/nl.json'
import enTranslations from '@/locales/en.json'

export const getTranslations = (locale: string): NavTranslations => {
  return {
    locale,
    ...(locale === 'en' ? enTranslations : nlTranslations)
  }
}
