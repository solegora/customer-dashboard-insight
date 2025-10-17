export default function GoalsList({ goals }: { goals: any[] }) {
    if (!goals) return null
    return (
        <div className="card">
            <h3>Goals</h3>
            {goals.map(g => (
                <div key={g.id} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{g.category} — {g.status}</div>
                        <div>{g.percentageUsed}%</div>
                    </div>
                    <div style={{ height: 8, background: '#eee', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(100, g.percentageUsed)}%`, height: '100%', background: g.percentageUsed > 90 ? '#e74c3c' : '#2ecc71' }} />
                    </div>
                </div>
            ))}
        </div>
    )
}
