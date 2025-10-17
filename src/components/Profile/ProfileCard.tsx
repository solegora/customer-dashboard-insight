
export default function ProfileCard({ profile }: { profile: any }) {
    if (!profile) return <div className="card">Loading profile...</div>
    return (
        <div className="card">
            <h2>{profile.name}</h2>
            <div className="muted">{profile.email}</div>
            <div style={{ marginTop: 8 }}><strong>Account:</strong> {profile.accountType}</div>
            <div style={{ marginTop: 8 }}><strong>Total spent:</strong> R {profile.totalSpent.toFixed(2)}</div>
        </div>
    )
}
