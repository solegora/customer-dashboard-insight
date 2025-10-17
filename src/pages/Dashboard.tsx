import { useEffect } from 'react'
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

    useEffect(() => {
        dispatch(fetchProfile(customerId))
        dispatch(fetchSummary({ customerId, period: '30d' }))
        dispatch(fetchCategories({ customerId, query: { period: '30d' } }))
        dispatch(fetchTrends({ customerId, months: 6 }))
        dispatch(fetchTransactions({ customerId, params: { limit: 10, offset: 0 } }))
        dispatch(fetchGoals(customerId))
    }, [dispatch])

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>Customer Insights</h1>
                </div>
            </header>

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
                    <TrendsChart data={state.trends} />
                    <TransactionTable transactions={state.transactions.transactions} />
                </main>
            </div>
        </div>
    )
}
