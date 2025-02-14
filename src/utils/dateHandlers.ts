import { BookingFormData } from '@/types/booking'
import { Dispatch, SetStateAction } from 'react'

interface DateValue {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

export const handleDateChange = (
  date: DateValue | null, 
  type: 'pickup' | 'return',
  setFormData: Dispatch<SetStateAction<BookingFormData>>
) => {
    if (date) {
        const selectedDate = new Date(
            date.year,
            date.month - 1,
            date.day,
            date.hour,
            date.minute,
            date.second
        )
        
        setFormData((prev: BookingFormData) => ({
            ...prev,
            [type === 'pickup' ? 'pickupDate' : 'returnDate']: selectedDate
        }))
    }
}
