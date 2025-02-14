import { useEffect, useState } from 'react'
import { NavTranslations } from '@/types/translations'


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

interface CalculateBookingProps {
  translations: NavTranslations
}

export default function CalculateBooking({ translations }: CalculateBookingProps) {
    const [savedBooking, setSavedBooking] = useState<BookingData | null>(null)

    useEffect(() => {
        const bookingDataStr = localStorage.getItem('bookingData')
        if (bookingDataStr) {
            setSavedBooking(JSON.parse(bookingDataStr))
        }
    }, [])

    if (!savedBooking) {
        return <div className="text-center p-8">{translations.hero.formTitle}</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark pt-24 pb-16">
            <div className="w-[90%] md:max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6">{translations.hero.title}</h2>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold">Route</h3>
                        <p>From: {savedBooking.sourceAddress}</p>
                        <p>To: {savedBooking.destinationAddress}</p>
                        {savedBooking.stopovers.length > 0 && (
                            <div>
                                <p className="font-medium mt-2">Stopovers:</p>
                                <ul className="list-disc pl-5">
                                    {savedBooking.stopovers.map((stop, index) => (
                                        <li key={index}>{stop}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold">Distance</h3>
                        <p>Direct: {savedBooking.directDistance}</p>
                        {savedBooking.extraDistance !== '0 km' && (
                            <p>Additional: {savedBooking.extraDistance}</p>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold">Schedule</h3>
                        <p>Pickup: {savedBooking.pickupDateTime}</p>
                        {savedBooking.returnDateTime && (
                            <p>Return: {savedBooking.returnDateTime}</p>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold">Additional Details</h3>
                        <p>Passengers: {savedBooking.passengers}</p>
                        <p>Luggage: {savedBooking.hasLuggage ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}