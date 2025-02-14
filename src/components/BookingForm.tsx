// Core imports
import { useState } from 'react'
import { useRouter } from 'next/router'
import { formatDate } from 'date-fns'

// Utils and hooks
import { calculateSegmentDistances } from '@/utils/distanceCalculations'
import { validateBookingForm } from '@/utils/bookingValidation'
import { handleLocationSelect } from '@/hooks/useLocationSelect'
import { handleDateChange } from '@/utils/dateHandlers'

// Components
import { LuggageCheckbox } from './booking/LuggageCheckbox'
import { LocationInput } from './booking/LocationInput'
import { DateSelector } from './booking/DateSelector'
import { MapPin, Plus, Minus, ArrowUpDown } from 'lucide-react'

// Types
import { Location, BookingFormData } from '@/types/booking'
import { NavTranslations } from '@/types/translations'

interface SegmentDistance {
    from: string
    to: string
    distance: string
    duration: string
}

interface BookingFormProps {
    translations: NavTranslations
  }

interface BookingDetailsProps {
    segments: SegmentDistance[]
    totalDistance: string
    hasLuggage: boolean
    travelers: number
    pickupDate: string
    isReturn: boolean
    returnDate?: string
    translations: NavTranslations
    onClose: () => void
}

export function BookingForm({ translations }: BookingFormProps) {
    const [formData, setFormData] = useState<BookingFormData>({
        pickup: null,
        stopovers: [],
        destination: null,
        hasLuggage: false,
        travelers: 1,
        pickupDate: undefined,
        isReturn: false,
        returnDate: undefined,
    })
    const router = useRouter()

    // Form Validation
    const validateForm = (): boolean => {
        const { isValid, error } = validateBookingForm(formData)
        if (!isValid && error) {
            alert(error)
        }
        return isValid
    }

    // Location Handlers
    const swapLocations = () => {
        setFormData(prev => ({
            ...prev,
            pickup: prev.destination,
            destination: prev.pickup
        }))
    }

    const addStopover = () => {
        setFormData(prev => ({
            ...prev,
            stopovers: [...prev.stopovers, null] as Location[]
        }))
    }

    const removeStopover = (index: number) => {
        setFormData(prev => ({
            ...prev,
            stopovers: prev.stopovers.filter((_, i) => i !== index)
        }))
    }

    // Traveler Handlers
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

    // Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            const segments = await calculateSegmentDistances(
                formData.pickup,
                formData.destination,
                formData.stopovers
            )
            const bookingData = {
                sourceAddress: formData.pickup?.mainAddress,
                destinationAddress: formData.destination?.mainAddress,
                directDistance: segments[0].distance,
                stopovers: formData.stopovers.map(stop => stop?.mainAddress),
                extraDistance: segments[1]?.distance || '0 km',
                pickupDateTime: formData.pickupDate ? formatDate(formData.pickupDate, 'yyyy-MM-dd HH:mm') : null,
                returnDateTime: formData.isReturn && formData.returnDate ? formatDate(formData.returnDate, 'yyyy-MM-dd HH:mm') : null,
                hasLuggage: formData.hasLuggage,
                passengers: formData.travelers
            }
            localStorage.setItem('bookingData', JSON.stringify(bookingData))
            router.push('/booking/calculate')
        } catch (error) {
            console.error('Error processing booking:', error)
        }
    }

    // Render Functions
    const renderPickupLocation = () => (
        <div className="grid grid-cols-[48px_1fr_48px] items-start gap-2">
            <div className="flex justify-center pt-7">
                <div className="w-6 h-6 m-2 rounded-full bg-primary flex items-center justify-center relative z-10">
                    <MapPin className="text-white" size={16} />
                </div>
            </div>
            <div className="space-y-1">
                <span className="block text-sm font-medium text-gray-600">From</span>
                <LocationInput
                    value={formData.pickup}
                    onChange={(place) => handleLocationSelect(place, 'pickup', formData, setFormData, translations)}
                    placeholder={translations.hero.pickupPlaceholder}
                    translations={translations}
                    onClear={() => setFormData(prev => ({ ...prev, pickup: null }))}
                />
            </div>
            <div className="flex justify-center pt-7">
                <button
                    type="button"
                    onClick={swapLocations}
                    className="p-2 mt-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={translations.hero.swapLocations}
                >
                    <ArrowUpDown size={20} className="text-primary" />
                </button>
            </div>
        </div>
    )

    const renderStopovers = () => (
        <>
            {formData.stopovers.map((stopover, index) => (
                <div key={index} className="grid grid-cols-[48px_1fr_48px] items-start gap-2">
                    <div className="flex justify-center pt-8">
                        <div className="w-4 h-4 rounded-full bg-primary-light mt-4 flex items-center justify-center relative z-10">
                            <MapPin className="text-white" size={12} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="block text-sm font-medium text-gray-600">Via</span>
                        <LocationInput
                            value={stopover}
                            onChange={(place) => handleLocationSelect(place, 'stopover', formData, setFormData, translations, index)}
                            placeholder={`${translations.hero.stopover} ${index + 1}`}
                            translations={translations}
                        />
                    </div>
                    <div className="flex justify-center pt-8">
                        <button
                            type="button"
                            onClick={() => removeStopover(index)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <Minus size={16} className="text-red-500" />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )

    const renderDestination = () => (
        <div className="grid grid-cols-[48px_1fr_48px] items-start gap-2">
            <div className="flex justify-center pt-8">
                <div className="w-6 h-6 rounded-full mt-2 bg-green-500 flex items-center justify-center relative z-10">
                    <MapPin className="text-white" size={16} />
                </div>
            </div>
            <div className="space-y-1">
                <span className="block text-sm font-medium text-gray-600">To</span>
                <LocationInput
                    value={formData.destination}
                    onChange={(place) => handleLocationSelect(place, 'destination', formData, setFormData, translations)}
                    placeholder={translations.hero.destinationPlaceholder}
                    translations={translations}
                />
            </div>
            <div className="flex justify-center pt-7">
                <button
                    type="button"
                    onClick={swapLocations}
                    className="p-2 mt-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={translations.hero.swapLocations}
                >
                    <ArrowUpDown size={20} className="text-primary" />
                </button>
            </div>
        </div>
    )

    const renderAddStopoverButton = () => (
        <div className="grid grid-cols-[48px_1fr_48px] items-center">
            <div className="flex justify-center">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center relative z-10">
                    <Plus size={14} className="text-gray-600" />
                </div>
            </div>
            <button
                type="button"
                onClick={addStopover}
                className="w-full flex items-center gap-2 text-sm text-primary hover:text-primary-dark text-left bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors h-[60px]"
            >
                <Plus size={16} />
                <span className="font-medium">{translations.hero.addStopover}</span>
            </button>
            <div></div>
        </div>
    )

    const renderTravelersSection = () => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations.hero.travelers}
            </label>
            <div className="flex items-center space-x-3">
                <button
                    type="button"
                    onClick={decrementTravelers}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    disabled={formData.travelers <= 1}
                >
                    <Minus size={16} className={formData.travelers <= 1 ? 'text-gray-400' : 'text-gray-600'} />
                </button>
                <span className="text-lg font-semibold w-6 text-center">
                    {formData.travelers}
                </span>
                <button
                    type="button"
                    onClick={incrementTravelers}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    disabled={formData.travelers >= 8}
                >
                    <Plus size={16} className={formData.travelers >= 8 ? 'text-gray-400' : 'text-gray-600'} />
                </button>
            </div>
        </div>
    )

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <div className="space-y-6 relative">
                        <div className="absolute left-6 top-10 bottom-8 w-0.5 bg-gray-200" />
                        {renderPickupLocation()}
                        {renderStopovers()}
                        {renderAddStopoverButton()}
                        {renderDestination()}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="space-y-4">
                        <LuggageCheckbox
                            checked={formData.hasLuggage}
                            onChange={(checked) => setFormData(prev => ({ ...prev, hasLuggage: checked }))}
                            label={translations.hero.luggage}
                        />
                        {renderTravelersSection()}
                    </div>

                    <div className="space-y-4">
                        <DateSelector
                            label={translations.hero.pickupDateTime}
                            onChange={(date) => handleDateChange(date, 'pickup', setFormData)}
                        />

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="return"
                                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                                    checked={formData.isReturn}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        isReturn: e.target.checked
                                    }))}
                                />
                                <label htmlFor="return" className="text-sm font-medium text-gray-700 cursor-pointer">
                                    {translations.hero.returnTrip}
                                </label>
                            </div>

                            {formData.isReturn && (
                                <DateSelector
                                    label={translations.hero.returnDateTime}
                                    onChange={(date) => handleDateChange(date, 'return', setFormData)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-secondary text-primary font-heading font-semibold py-3 rounded-lg hover:bg-secondary-light transition-colors shadow-md hover:shadow-lg text-base mt-6"
                >
                    {translations.hero.calculate}
                </button>
            </form>
        </div>
    )
}
