import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryCard from "../components/SummaryCard";

describe("SummaryCard", () => {
    it("renders loading state when summary is null", () => {
        render(<SummaryCard summary={null as any} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders summary data correctly", () => {
        const summary = {
            period: "October 2025",
            totalSpent: 5432.5,
            transactionCount: 18,
            averageTransaction: 301.81,
            topCategory: "Groceries",
        };

        render(<SummaryCard summary={summary} />);

        // Check title and fields
        expect(screen.getByText(/Summary \(October 2025\)/)).toBeInTheDocument();
        expect(screen.getByText("Total: R 5432.50")).toBeInTheDocument();
        expect(screen.getByText("Transactions: 18")).toBeInTheDocument();
        expect(screen.getByText("Avg: R 301.81")).toBeInTheDocument();
        expect(screen.getByText("Top: Groceries")).toBeInTheDocument();
    });

    it("formats numbers to two decimals", () => {
        const summary = {
            period: "2025-Q1",
            totalSpent: 100,
            transactionCount: 5,
            averageTransaction: 20,
            topCategory: "Entertainment",
        };

        render(<SummaryCard summary={summary} />);

        expect(screen.getByText("Total: R 100.00")).toBeInTheDocument();
        expect(screen.getByText("Avg: R 20.00")).toBeInTheDocument();
    });
});
