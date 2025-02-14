import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { NavTranslations } from '@/types/translations'
import { FIXED_ROUTE_PRICES, VEHICLES } from '@/constants/fixedPrices'

interface CalculateBookingProps {
  translations: NavTranslations
}

interface BookingData {
    sourceAddress: string
    destinationAddress: string
    directDistance: string
    stopovers: string[]
    extraDistance: string
    pickupDateTime: string
    returnDateTime: string | null
    hasLuggage: boolean
    passengers: number
}

const STEPS = {
    LUGGAGE: 0,
    VEHICLE: 1,
    TRAVEL_INFO: 2,
    CONTACT: 3
}

export default function CalculateBooking({ translations }: CalculateBookingProps) {
    const [currentStep, setCurrentStep] = useState(STEPS.LUGGAGE)
    const [selectedVehicle, setSelectedVehicle] = useState('')
    const [bookingData, setBookingData] = useState<BookingData | null>(null)
    const [contactDetails, setContactDetails] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const renderLuggageStep = () => {
        return (
            <div>
                {/* Luggage selection UI */}
            </div>
        )
    }

    const renderVehicleStep = () => {
        return (
            <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(VEHICLES).map(([key, vehicle]) => (
                    <div 
                        key={key}
                        className={`p-4 border rounded-lg cursor-pointer ${
                            selectedVehicle === key ? 'border-primary' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedVehicle(key)}
                    >
                        <img src={vehicle.image} alt={vehicle.name} />
                        <h3 className="font-bold mt-2">{vehicle.name}</h3>
                        <p className="text-sm text-gray-600">Max {vehicle.capacity} passengers</p>
                        <p className="text-sm">{vehicle.description}</p>
                    </div>
                ))}
            </div>
        )
    }

    const renderTravelInfo = () => {
        return (
            <div>
                {/* Journey details and pricing */}
            </div>
        )
    }

    const renderContactForm = () => {
        return (
            <div>
                {/* Contact form */}
            </div>
        )
    }

    const renderStepContent = () => {
        switch(currentStep) {
            case STEPS.LUGGAGE:
                return renderLuggageStep()
            case STEPS.VEHICLE:
                return renderVehicleStep()
            case STEPS.TRAVEL_INFO:
                return renderTravelInfo()
            case STEPS.CONTACT:
                return renderContactForm()
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark pt-24 pb-16">
            <div className="w-[90%] md:max-w-3xl mx-auto">
                {/* Stepper UI */}
                <div className="flex justify-between mb-8">
                    {Object.values(STEPS).map((step) => (
                        <div 
                            key={step}
                            className={`w-1/4 text-center ${
                                currentStep >= step ? 'text-white' : 'text-gray-400'
                            }`}
                        >
                            {/* Step indicator */}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-xl p-6">
                    {renderStepContent()}
                    
                    <div className="flex justify-between mt-6">
                        <button 
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            disabled={currentStep === 0}
                            className="px-4 py-2 bg-gray-100 rounded-lg"
                        >
                            Back
                        </button>
                        <button 
                            onClick={() => setCurrentStep(prev => prev + 1)}
                            disabled={currentStep === 3}
                            className="px-4 py-2 bg-primary text-white rounded-lg"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}