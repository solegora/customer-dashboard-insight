import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrendsChart from "../components/TrendsChart";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { fetchSpendingByCategory } from "../services/slices/customerSlice";

// 🧩 Mock Redux hooks and thunk
jest.mock("../services/hooks/hooks", () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

jest.mock("../services/slices/customerSlice", () => ({
    fetchSpendingByCategory: jest.fn(),
}));

jest.mock("../components/DateRangePicker", () => (props: any) => (
    <div data-testid="date-range-picker">
        <button
            data-testid="change-date"
            onClick={() => props.onChange(new Date("2024-01-01"), new Date("2024-01-31"))}
        >
            Change Date
        </button>
    </div>
));

describe("TrendsChart", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        jest.clearAllMocks();
    });

    it("dispatches fetchSpendingByCategory on mount", () => {
        (useAppSelector as jest.Mock).mockReturnValue({ categories: [] });

        render(<TrendsChart data={[]} />);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(fetchSpendingByCategory).toHaveBeenCalledWith({
            startDate: expect.any(Date),
            endDate: expect.any(Date),
        });
    });

    it("renders 'No data available' when categories is empty", () => {
        (useAppSelector as jest.Mock).mockReturnValue({ categories: [] });

        render(<TrendsChart data={[]} />);

        expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("renders table with category data", () => {
        (useAppSelector as jest.Mock).mockReturnValue({
            categories: [
                { name: "Food", amount: 150.75 },
                { name: "Transport", amount: 85.5 },
            ],
        });

        render(<TrendsChart data={[]} />);

        expect(screen.getByText("Spending by Category")).toBeInTheDocument();
        expect(screen.getByText("Food")).toBeInTheDocument();
        expect(screen.getByText("Transport")).toBeInTheDocument();
        expect(screen.getByText("R 150.75")).toBeInTheDocument();
        expect(screen.getByText("R 85.50")).toBeInTheDocument();
    });

    it("updates date range and dispatches again on change", () => {
        (useAppSelector as jest.Mock).mockReturnValue({ categories: [] });

        render(<TrendsChart data={[]} />);

        fireEvent.click(screen.getByTestId("change-date"));

        expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
});
