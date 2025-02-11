import Image from 'next/image'
import { NavTranslations } from '@/types/translations'

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

export function BookingDetails({
    pickup,
    destination,
    distance,
    duration,
    hasLuggage,
    travelers,
    pickupDate,
    isReturn,
    returnDate,
    translations,
    onClose
}: BookingDetailsProps) {
    const distanceNum = parseFloat(distance.replace(/[^0-9.]/g, ''))
    const basePrice = distanceNum * 2.5
    const totalPrice = basePrice * travelers * (isReturn ? 2 : 1)

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 z-50">
            <div className="bg-white rounded-xl p-4 max-w-md w-full">
                <div className="relative h-24 mb-2">
                    <Image
                        src="/car-illustration.svg"
                        alt="Taxi"
                        fill
                        className="object-contain"
                    />
                </div>

                <h2 className="text-lg font-heading font-bold mb-3 text-center">
                    {translations.booking.title}
                </h2>

                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <h3 className="font-medium text-gray-600 text-xs">{translations.booking.from}</h3>
                            <p className="text-sm">{pickup}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-600 text-xs">{translations.booking.to}</h3>
                            <p className="text-sm">{destination}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <h3 className="font-medium text-gray-600 text-xs">{translations.booking.distance}</h3>
                            <p className="text-sm">{distance}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-600 text-xs">{translations.booking.duration}</h3>
                            <p className="text-sm">{duration}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <h3 className="font-medium text-gray-600 text-xs">{translations.booking.passengers}</h3>
                            <p className="text-sm">{travelers}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-600 text-xs">{translations.booking.luggage}</h3>
                            <p className="text-sm">{hasLuggage ? translations.booking.yes : translations.booking.no}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-600 text-xs">{translations.booking.pickupTime}</h3>
                        <p className="text-sm">{pickupDate}</p>
                    </div>

                    {isReturn && returnDate && (
                        <div>
                            <h3 className="font-medium text-gray-600 text-xs">{translations.booking.returnTime}</h3>
                            <p className="text-sm">{returnDate}</p>
                        </div>
                    )}

                    <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center text-base font-bold">
                            <span>{translations.booking.totalPrice}</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        {isReturn && (
                            <p className="text-xs text-gray-600 mt-1">
                                {translations.booking.returnIncluded}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={onClose}
                            className="w-full py-1.5 px-3 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            {translations.booking.back}
                        </button>
                        <button
                            className="w-full py-1.5 px-3 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            {translations.booking.bookNow}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
