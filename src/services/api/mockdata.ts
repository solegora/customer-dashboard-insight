const baseCustomerId = '12345'

const profile = {
    customerId: baseCustomerId,
    name: 'John Doe',
    email: 'john.doe@email.com',
    joinDate: '2023-01-15',
    accountType: 'premium',
    totalSpent: 15420.5,
    currency: 'ZAR',
}

const spendingSummaryByPeriod: Record<string, any> = {
    '30d': {
        period: '30d',
        totalSpent: 4250.75,
        transactionCount: 47,
        averageTransaction: 90.44,
        topCategory: 'Groceries',
        comparedToPrevious: { spentChange: 12.5, transactionChange: -3.2 },
    },
    '7d': { ...{ period: '7d', totalSpent: 900.2, transactionCount: 12, averageTransaction: 75.02, topCategory: 'Dining', comparedToPrevious: { spentChange: -5, transactionChange: 2 } } }
}

const spendingByCategory = {
    dateRange: { startDate: '2024-08-16', endDate: '2024-09-16' },
    totalAmount: 4250.75,
    categories: [
        { name: 'Groceries', amount: 1250.3, percentage: 29.4, transactionCount: 15, color: '#FF6B6B', icon: 'shopping-cart' },
        { name: 'Entertainment', amount: 890.2, percentage: 20.9, transactionCount: 8, color: '#4ECDC4', icon: 'film' },
        { name: 'Transportation', amount: 680.45, percentage: 16.0, transactionCount: 12, color: '#45B7D1', icon: 'car' },
        { name: 'Dining', amount: 520.3, percentage: 12.2, transactionCount: 9, color: '#F7DC6F', icon: 'utensils' },
        { name: 'Shopping', amount: 450.8, percentage: 10.6, transactionCount: 6, color: '#BB8FCE', icon: 'shopping-bag' },
        { name: 'Utilities', amount: 458.7, percentage: 10.8, transactionCount: 3, color: '#85C1E9', icon: 'zap' },
    ]
}

const trends = {
    trends: [
        { month: '2024-01', totalSpent: 3890.25, transactionCount: 42, averageTransaction: 92.62 },
        { month: '2024-02', totalSpent: 4150.8, transactionCount: 38, averageTransaction: 109.23 },
        { month: '2024-03', totalSpent: 3750.6, transactionCount: 45, averageTransaction: 83.35 },
        { month: '2024-04', totalSpent: 4200.45, transactionCount: 39, averageTransaction: 107.7 },
        { month: '2024-05', totalSpent: 3980.3, transactionCount: 44, averageTransaction: 90.46 },
        { month: '2024-06', totalSpent: 4250.75, transactionCount: 47, averageTransaction: 90.44 },
    ]
}

const transactions = {
    transactions: [
        { id: 'txn_123456', date: '2024-09-16T14:30:00Z', merchant: 'Pick n Pay', category: 'Groceries', amount: 245.8, description: 'Weekly groceries', paymentMethod: 'Credit Card', icon: 'shopping-cart', categoryColor: '#FF6B6B' },
        { id: 'txn_123457', date: '2024-09-15T10:15:00Z', merchant: 'Netflix', category: 'Entertainment', amount: 199.0, description: 'Monthly subscription', paymentMethod: 'Debit Order', icon: 'film', categoryColor: '#4ECDC4' },
    ],
    pagination: { total: 1250, limit: 20, offset: 0, hasMore: true }
}

const goals = {
    goals: [
        { id: 'goal_001', category: 'Entertainment', monthlyBudget: 1000, currentSpent: 650.3, percentageUsed: 65.03, daysRemaining: 12, status: 'on_track' },
        { id: 'goal_002', category: 'Groceries', monthlyBudget: 1500, currentSpent: 1450.8, percentageUsed: 96.72, daysRemaining: 12, status: 'warning' },
    ]
}

const filters = {
    categories: spendingByCategory.categories.map(c => ({ name: c.name, color: c.color, icon: c.icon })),
    dateRangePresets: [
        { label: 'Last 7 days', value: '7d' },
        { label: 'Last 30 days', value: '30d' },
        { label: 'Last 90 days', value: '90d' },
        { label: 'Last year', value: '1y' },
    ]
}

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms))

const getDaysDifference = (start: Date, end: Date): number => {
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const api = {
    // GET /api/customers/{customerId}/profile
    getProfile: async (customerId: string) => {
        await delay()
        if (customerId !== baseCustomerId) throw new Error('Customer not found')
        return { status: 200, data: profile }
    },

    // GET /api/customers/{customerId}/spending/summary?period={period}
    getSpendingSummary: async (customerId: string, period = '30d') => {
        await delay()
        return { status: 200, data: (spendingSummaryByPeriod[period] ?? spendingSummaryByPeriod['30d']) }
    },

    // GET /api/customers/{customerId}/spending/categories?period=&startDate=&endDate=
    getSpendingByCategory: async (customerId: string, q: { period?: string, startDate?: string, endDate?: string } = {}) => {
        await delay()

        if (q.startDate && q.endDate) {
            const start = new Date(q.startDate)
            const end = new Date(q.endDate)

            // Filter categories based on date range
            const filteredCategories = spendingByCategory.categories.map(category => ({
                ...category,
                // Simulate different amounts based on date range
                amount: category.amount * (getDaysDifference(start, end) / 30), // Adjust amount proportionally
                transactionCount: Math.floor(category.transactionCount * (getDaysDifference(start, end) / 30))
            }))

            const totalAmount = filteredCategories.reduce((sum, cat) => sum + cat.amount, 0)

            // Update percentages based on new total
            filteredCategories.forEach(cat => {
                cat.percentage = (cat.amount / totalAmount) * 100
            })

            return {
                status: 200,
                data: {
                    dateRange: { startDate: q.startDate, endDate: q.endDate },
                    totalAmount,
                    categories: filteredCategories
                }
            }
        }

        return { status: 200, data: spendingByCategory }
    },

    // GET /api/customers/{customerId}/spending/trends?months={months}
    getTrends: async (customerId: string, months = 12) => {
        await delay()
        return { status: 200, data: { trends: trends.trends.slice(0, Math.min(months, trends.trends.length)) } }
    },

    // GET /api/customers/{customerId}/transactions?...params
    getTransactions: async (customerId: string, params: any = {}) => {
        await delay()
        const limit = params.limit ?? 20
        const offset = params.offset ?? 0
        const items = transactions.transactions.slice(offset, offset + limit)
        return { status: 200, data: { transactions: items, pagination: { ...transactions.pagination, limit, offset } } }
    },

    // GET /api/customers/{customerId}/goals
    getGoals: async (customerId: string) => {
        await delay()
        return { status: 200, data: goals }
    },

    // GET /api/customers/{customerId}/filters
    getFilters: async (customerId: string) => {
        await delay()
        return { status: 200, data: filters }
    }
}
