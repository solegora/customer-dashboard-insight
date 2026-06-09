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
    onChange: (start: Date, end: Date, preset?: string) => void;
    presets?: DatePreset[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    startDate,
    endDate,
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

        onChange(start, end, preset);
    };
    useEffect(() => {
        handlePresetChange('30d');
    }, []);

    const formatDate = (date: Date) =>
        date.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <div className="date-range-picker">
            <label htmlFor="range-select" className="date-range-label">Date range</label>
            <select
                id="range-select"
                className="date-preset-select"
                onChange={(e) => handlePresetChange(e.target.value)}
                defaultValue="30d"
                aria-label="Select date range"
            >
                {presets.map((preset) => (
                    <option key={preset.value} value={preset.value}>
                        {preset.label}
                    </option>
                ))}
            </select>
            <span className="date-range-value">
                {formatDate(startDate)} - {formatDate(endDate)}
            </span>
        </div>
    );
};

export default DateRangePicker;