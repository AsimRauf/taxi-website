import { formatDate } from 'date-fns'

export const handleDateChange = (date: any, type: 'pickup' | 'return', setFormData: any) => {
    if (date) {
        const selectedDate = new Date(
            date.year,
            date.month - 1,
            date.day,
            date.hour,
            date.minute,
            date.second
        )
        
        setFormData((prev: { pickupDate?: Date; returnDate?: Date }) => ({
            ...prev,
            [type === 'pickup' ? 'pickupDate' : 'returnDate']: selectedDate
        }))
    }
}
