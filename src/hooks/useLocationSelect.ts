import { Location, BookingFormData } from '@/types/booking'

export const handleLocationSelect = async (
    selected: any,
    type: 'pickup' | 'destination' | 'stopover',
    formData: BookingFormData,
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>,
    translations: any,
    index?: number
) => {
    if (!selected) {
        if (type === 'stopover' && typeof index === 'number') {
            const newStopovers = [...formData.stopovers]
            newStopovers[index] = null as unknown as Location
            setFormData({ ...formData, stopovers: newStopovers })
        } else {
            setFormData({ ...formData, [type]: null })
        }
        return
    }

    const geocoder = new google.maps.Geocoder()
    const mainLocale = translations.locale
    const secondaryLocale = mainLocale === 'nl' ? 'en' : 'nl'

    try {
        const [mainResult, secondaryResult] = await Promise.all([
            geocoder.geocode({
                placeId: selected.value.place_id,
                language: mainLocale
            }),
            geocoder.geocode({
                placeId: selected.value.place_id,
                language: secondaryLocale
            })
        ])

        const enrichedLocation = {
            ...selected,
            mainAddress: mainResult.results[0]?.formatted_address,
            secondaryAddress: secondaryResult.results[0]?.formatted_address
        }

        if (type === 'stopover' && typeof index === 'number') {
            const newStopovers = [...formData.stopovers]
            newStopovers[index] = enrichedLocation
            setFormData({ ...formData, stopovers: newStopovers })
        } else {
            setFormData({ ...formData, [type]: enrichedLocation })
        }
    } catch (error) {
        console.error('Error fetching address details:', error)
    }
}
