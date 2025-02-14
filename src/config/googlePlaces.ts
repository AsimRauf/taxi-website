import { NavTranslations } from '@/types/translations'

interface OptionType {
  mainAddress?: string
  label?: string
  secondaryAddress?: string
}

import { OptionLabel } from '@/components/booking/GooglePlacesOptionLabel'

export const createGooglePlacesConfig = (translations: NavTranslations) => ({
  apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=${translations.locale}`,
  autocompletionRequest: {
    componentRestrictions: { country: 'nl' },
  },
  selectProps: {
    styles: {
      control: (provided: any) => ({
        ...provided,
        height: '60px',
        borderRadius: '0.5rem',
        borderColor: '#E5E7EB',
        paddingLeft: '0'
      }),
      container: (provided: any) => ({
        ...provided,
        width: '100%',
      }),
    },
    formatOptionLabel: OptionLabel,
    isSearchable: true,
    isClearable: true,
  }
})
