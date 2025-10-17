import React from 'react'
import './TransactionTable.css'

export default function TransactionsTable({ transactions }: { transactions: any[] }) {
    if (!transactions) return null
    return (
        <div className="card">
            <h3>Recent transactions</h3>
            <table className="transactions-table">
                <thead><tr><th>Date</th><th>Merchant</th><th >Amount</th></tr></thead>
                <tbody>
                    {transactions.map((t: any) => (
                        <tr key={t.id}>
                            <td>{new Date(t.date).toLocaleString()}</td>
                            <td>{t.merchant}</td>
                            <td >R {t.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
