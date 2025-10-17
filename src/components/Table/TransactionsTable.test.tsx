import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionTable from "./TransactionTable";

describe("TransactionsTable", () => {
    it("renders nothing when transactions is null", () => {
        const { container } = render(<TransactionTable transactions={null as any} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders table headers correctly", () => {
        render(<TransactionTable transactions={[]} />);

        expect(screen.getByText("Recent transactions")).toBeInTheDocument();
        expect(screen.getByText("Date")).toBeInTheDocument();
        expect(screen.getByText("Merchant")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();
    });

    it("renders transactions correctly", () => {
        const transactions = [
            { id: 1, date: "2025-01-01T10:00:00Z", merchant: "Netflix", amount: 199.99 },
            { id: 2, date: "2025-02-01T12:00:00Z", merchant: "Amazon", amount: 499.5 },
        ];

        render(<TransactionTable transactions={transactions} />);

        // Verify rows
        expect(screen.getByText("Netflix")).toBeInTheDocument();
        expect(screen.getByText("Amazon")).toBeInTheDocument();

        // Verify formatted amounts
        expect(screen.getByText("R 199.99")).toBeInTheDocument();
        expect(screen.getByText("R 499.50")).toBeInTheDocument();

        // Verify date is rendered (partial match since toLocaleString varies)
        expect(screen.getAllByText(/2025/).length).toBeGreaterThan(0);
    });

    it("renders correct number of rows", () => {
        const transactions = [
            { id: 1, date: "2025-01-01", merchant: "Spotify", amount: 59.99 },
            { id: 2, date: "2025-02-01", merchant: "Uber", amount: 120.5 },
            { id: 3, date: "2025-03-01", merchant: "Takealot", amount: 999.99 },
        ];

        render(<TransactionTable transactions={transactions} />);

        const rows = screen.getAllByRole("row");
        // 1 header row + 3 data rows
        expect(rows).toHaveLength(4);
    });
});
