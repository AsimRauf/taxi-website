interface LuggageCheckboxProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
}

export function LuggageCheckbox({ checked, onChange, label }: LuggageCheckboxProps) {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="luggage"
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor="luggage" className="text-sm font-medium text-gray-700 cursor-pointer">
                {label}
            </label>
        </div>
    )
}
