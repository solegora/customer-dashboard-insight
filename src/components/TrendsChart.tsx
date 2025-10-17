import React, { useState, useEffect } from "react";
import { fetchSpendingByCategory } from "../services/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import DateRangePicker from "./DateRangePicker";
import "../App.css";

interface TrendsChartProps {
    data: any[]
}
const TrendsChart: React.FC<TrendsChartProps> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.customer);


    const [startDate, setStartDate] = useState<Date>(
        new Date(new Date().setDate(new Date().getDate() - 30))
    );
    const [endDate, setEndDate] = useState<Date>(new Date());

    useEffect(() => {
        dispatch(fetchSpendingByCategory({ startDate, endDate }));
    }, [startDate, endDate, dispatch]);

    return (
        <div className="capitec-theme">
            <div className="table-header">
                <h3>Spending by Category</h3>

                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />
            </div>

            <div className="table-container">
                {categories && categories.length > 0 ? (
                    <table className="trends-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>R {item.amount.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div>No data available</div>
                )}
            </div>
        </div>
    );
};

export default TrendsChart;
