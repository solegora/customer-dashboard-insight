export default function CategoryList({ categories }: { categories: any[] }) {
    if (!categories) return null
    return (
        <div className="card">
            <h3>By Category</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {categories.map(c => (
                    <li key={c.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <div><span style={{ color: c.color, marginRight: 8 }}>●</span>{c.name}</div>
                        <div>R {c.amount.toFixed(2)}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
