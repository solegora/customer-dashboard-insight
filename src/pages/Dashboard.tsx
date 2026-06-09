import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../services/store/store'
import { fetchProfile, fetchSummary, fetchCategories, fetchTrends, fetchTransactions, fetchGoals } from '../services/slices/customerSlice'
import ProfileCard from '../components/Profile/ProfileCard'
import SummaryCard from '../components/Cards/SummaryCard'
import CategoryList from '../components/CategoryGoals/CategoryList'
import TrendsChart from '../components/Trends/TrendsChart'
import TransactionTable from '../components/Table/TransactionTable'
import GoalsList from '../components/CategoryGoals/GoalsList'
import './Dashboard.css'

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((s: RootState) => s.customer)
    const customerId = '12345'
    const currentDate = useMemo(
        () => new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }),
        []
    )

    const loadDashboardData = useCallback(() => {
        dispatch(fetchProfile(customerId))
        dispatch(fetchSummary({ customerId, period: '30d' }))
        dispatch(fetchCategories({ customerId, query: { period: '30d' } }))
        dispatch(fetchTrends({ customerId, months: 6 }))
        dispatch(fetchTransactions({ customerId, params: { limit: 10, offset: 0 } }))
        dispatch(fetchGoals(customerId))
    }, [customerId, dispatch])

    const getSummaryPeriod = useCallback((preset?: string, start?: Date, end?: Date) => {
        if (preset === '7d' || preset === '30d' || preset === '90d' || preset === '1y') {
            return preset
        }

        if (start && end) {
            const diffMs = Math.abs(end.getTime() - start.getTime())
            const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
            return days <= 7 ? '7d' : '30d'
        }

        return '30d'
    }, [])

    const handleDateRangeChange = useCallback((start: Date, end: Date, preset?: string) => {
        dispatch(fetchSummary({ customerId, period: getSummaryPeriod(preset, start, end) }))
    }, [customerId, dispatch, getSummaryPeriod])

    useEffect(() => {
        loadDashboardData()
    }, [loadDashboardData])

    const hasOverviewData = !!state.profile || !!state.summary || state.categories.length > 0

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <div>
                        <h1>Customer Insights</h1>
                        <p className="header-subtitle">Track spending habits, goals, and recent activity in one place.</p>
                    </div>
                    <div className="header-actions">
                        <span className="header-date">Updated {currentDate}</span>
                        <button className="refresh-button" onClick={loadDashboardData}>
                            Refresh data
                        </button>
                    </div>
                </div>
            </header>

            <section className="dashboard-status" aria-live="polite">
                {state.loading && <div className="status-banner">Loading latest customer profile...</div>}
                {state.error && !state.loading && (
                    <div className="status-banner status-banner-error">
                        We had trouble loading some data. Please try again.
                    </div>
                )}
                {!state.loading && !state.error && hasOverviewData && (
                    <div className="status-banner status-banner-success">Everything is up to date and ready to explore.</div>
                )}
            </section>

            <div className="dashboard-grid">
                <aside className="dashboard-sidebar">
                    <ProfileCard profile={state.profile} />
                    <CategoryList categories={state.categories} />
                </aside>

                <main className="dashboard-main">
                    <div className="summary-cards">
                        <SummaryCard summary={state.summary} />
                        <GoalsList goals={state.goals} />
                    </div>
                    <TrendsChart data={state.trends} onDateRangeChange={handleDateRangeChange} />
                    <TransactionTable transactions={state.transactions.transactions} />
                </main>
            </div>
        </div>
    )
}
