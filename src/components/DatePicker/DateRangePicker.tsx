import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css";

interface DatePreset {
    label: string;
    value: string;
}

interface DateRangePickerProps {
    startDate: Date;
    endDate: Date;
    onChange: (start: Date, end: Date) => void;
    presets?: DatePreset[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    onChange,
    presets = [
        { label: 'Last 7 days', value: '7d' },
        { label: 'Last 30 days', value: '30d' },
        { label: 'Last 90 days', value: '90d' },
        { label: 'Last year', value: '1y' },
    ]
}) => {

    const handlePresetChange = (preset: string) => {
        const end = new Date();
        const start = new Date();

        switch (preset) {
            case '7d':
                start.setDate(end.getDate() - 7);
                break;
            case '30d':
                start.setDate(end.getDate() - 30);
                break;
            case '90d':
                start.setDate(end.getDate() - 90);
                break;
            case '1y':
                start.setFullYear(end.getFullYear() - 1);
                break;
        }

        onChange(start, end);
    };
    useEffect(() => {
        handlePresetChange('7d');
    }, []);

    return (
        <div className="date-range-picker">
            <select
                className="date-preset-select"
                onChange={(e) => handlePresetChange(e.target.value)}
            >
                <option value="">Select range</option>
                {presets.map((preset) => (
                    <option key={preset.value} value={preset.value}>
                        {preset.label}
                    </option>
                ))}
            </select>


        </div>
    );
};

export default DateRangePicker;