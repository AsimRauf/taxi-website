import { useState } from 'react'
import { DateTimePicker } from './DateTimePicker'
import dynamic from 'next/dynamic'
import { NavTranslations } from '@/types/translations'
import { BookingDetails } from './BookingDetails'

const GooglePlacesAutocomplete = dynamic(
  () => import('react-google-places-autocomplete'),
  { ssr: false }
)

interface HeroSectionProps {
  translations: NavTranslations
}

interface BookingFormData {
  pickup: { label: string; value: { place_id: string } } | null
  destination: { label: string; value: { place_id: string } } | null
  hasLuggage: boolean
  travelers: number
  pickupDate: Date | undefined
  isReturn: boolean
  returnDate: Date | undefined
}

interface BookingDetailsProps {
  pickup: string
  destination: string
  distance: string
  duration: string
  hasLuggage: boolean
  travelers: number
  pickupDate: string
  isReturn: boolean
  returnDate?: string
  translations: NavTranslations
  onClose: () => void
}

export default function HeroSection({ translations }: HeroSectionProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    pickup: null,
    destination: null,
    hasLuggage: false,
    travelers: 1,
    pickupDate: undefined,
    isReturn: false,
    returnDate: undefined,
  })
  const [showDetails, setShowDetails] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsProps | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const distanceService = new google.maps.DistanceMatrixService()

    try {
      const response = await distanceService.getDistanceMatrix({
        origins: [formData.pickup?.label || ''],
        destinations: [formData.destination?.label || ''],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      })

      const distance = response.rows[0].elements[0].distance.text
      const duration = response.rows[0].elements[0].duration.text

      const details = {
        pickup: formData.pickup?.label || '',
        destination: formData.destination?.label || '',
        distance,
        duration,
        hasLuggage: formData.hasLuggage,
        travelers: formData.travelers,
        pickupDate: formData.pickupDate?.toLocaleString(translations.locale) || '',
        isReturn: formData.isReturn,
        returnDate: formData.returnDate?.toLocaleString(translations.locale),
        translations,
        onClose: () => setShowDetails(false)
      }

      setBookingDetails(details)
      setShowDetails(true)
    } catch (error) {
      console.error('Error calculating distance:', error)
    }
  }

  const incrementTravelers = () => {
    if (formData.travelers < 8) {
      setFormData(prev => ({ ...prev, travelers: prev.travelers + 1 }))
    }
  }

  const decrementTravelers = () => {
    if (formData.travelers > 1) {
      setFormData(prev => ({ ...prev, travelers: prev.travelers - 1 }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            {translations.hero.title}
          </h1>
          <p className="text-lg md:text-xl">
            {translations.hero.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations.hero.pickup}
                </label>
                {typeof window !== 'undefined' && (
                  <GooglePlacesAutocomplete
                    apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=${translations.locale}`}
                    selectProps={{
                      value: formData.pickup,
                      onChange: (place) => setFormData({ ...formData, pickup: place }),
                      placeholder: translations.hero.pickupPlaceholder,
                      styles: {
                        control: (provided) => ({
                          ...provided,
                          padding: '2px',
                          borderRadius: '0.5rem',
                          borderColor: '#E5E7EB',
                        }),
                      },
                      noOptionsMessage: () => translations.locale === 'nl' ? "Geen opties beschikbaar" : "No options available",
                      loadingMessage: () => translations.locale === 'nl' ? "Laden..." : "Loading...",
                    }}
                    autocompletionRequest={{
                      componentRestrictions: { country: 'nl' },
                    }}
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations.hero.destination}
                </label>
                {typeof window !== 'undefined' && (
                  <GooglePlacesAutocomplete
                    key="destination-location"
                    apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=${translations.locale}`}
                    selectProps={{
                      value: formData.destination,
                      onChange: (place) => setFormData({ ...formData, destination: place }),
                      placeholder: translations.hero.destinationPlaceholder,
                      styles: {
                        control: (provided) => ({
                          ...provided,
                          padding: '2px',
                          borderRadius: '0.5rem',
                          borderColor: '#E5E7EB',
                        }),
                      },
                      noOptionsMessage: () => translations.locale === 'nl' ? "Geen opties beschikbaar" : "No options available",
                      loadingMessage: () => translations.locale === 'nl' ? "Laden..." : "Loading...",
                    }}
                    autocompletionRequest={{
                      componentRestrictions: { country: 'nl' }
                    }}
                  />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="luggage"
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    checked={formData.hasLuggage}
                    onChange={(e) => setFormData({ ...formData, hasLuggage: e.target.checked })}
                  />
                  <label htmlFor="luggage" className="text-sm font-medium text-gray-700">
                    {translations.hero.luggage}
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations.hero.travelers}
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={decrementTravelers}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <span className="text-lg font-semibold">-</span>
                    </button>
                    <span className="text-lg font-semibold w-6 text-center">
                      {formData.travelers}
                    </span>
                    <button
                      type="button"
                      onClick={incrementTravelers}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <span className="text-lg font-semibold">+</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations.hero.pickupDateTime}
                  </label>
                  <DateTimePicker
                    date={formData.pickupDate}
                    setDate={(date) => setFormData({ ...formData, pickupDate: date })}
                    label={translations.hero.pickupDateTime}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="return"
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      checked={formData.isReturn}
                      onChange={(e) => setFormData({ ...formData, isReturn: e.target.checked })}
                    />
                    <label htmlFor="return" className="text-sm font-medium text-gray-700">
                      {translations.hero.returnTrip}
                    </label>
                  </div>

                  {formData.isReturn && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {translations.hero.returnDateTime}
                      </label>
                      <DateTimePicker
                        date={formData.returnDate}
                        setDate={(date) => setFormData({ ...formData, returnDate: date })}
                        label={translations.hero.returnPlaceholder}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-primary font-heading font-semibold py-3 rounded-lg hover:bg-secondary-light transition-colors shadow-md hover:shadow-lg text-base"
            >
              {translations.hero.calculate}
            </button>
          </form>
          {showDetails && bookingDetails && <BookingDetails {...bookingDetails} />}
        </div>
      </div>
    </div>
  )
}
