import './Cards.css'
export default function SummaryCard({ summary }: { summary: any }) {
    if (!summary) return <div className="card">Loading...</div>
    return (
        <div className="card">
            <h3>Summary ({summary.period})</h3>
            <div>Total: R {summary.totalSpent.toFixed(2)}</div>
            <div>Transactions: {summary.transactionCount}</div>
            <div>Avg: R {summary.averageTransaction.toFixed(2)}</div>
            <div>Top: {summary.topCategory}</div>
        </div>
    )
}
