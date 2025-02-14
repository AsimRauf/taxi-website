import { DatePicker } from "@heroui/react"
import { now, getLocalTimeZone } from '@internationalized/date'

interface DateSelectorProps {
    label: string
    onChange: (date: any) => void
}

export function DateSelector({ label, onChange }: DateSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <DatePicker
                granularity="minute"
                hideTimeZone
                showMonthAndYearPickers
                defaultValue={now(getLocalTimeZone())}
                label={label}
                variant="bordered"
                onChange={onChange}
                className="w-full"
            />
        </div>
    )
}
