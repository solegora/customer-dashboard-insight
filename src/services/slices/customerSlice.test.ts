import reducer, {
    fetchProfile,
    fetchSummary,
    fetchCategories,
    fetchTrends,
    fetchTransactions,
    fetchGoals,
    fetchSpendingByCategory,
} from './customerSlice'
import { api } from '../api/mockdata'

jest.mock('../api/mockdata', () => ({
    api: {
        getProfile: jest.fn(),
        getSpendingSummary: jest.fn(),
        getSpendingByCategory: jest.fn(),
        getTrends: jest.fn(),
        getTransactions: jest.fn(),
        getGoals: jest.fn(),
    },
}))

describe('customerSlice', () => {
    const initialState = {
        loading: false,
        profile: null,
        summary: null,
        categories: [],
        trends: [],
        transactions: { transactions: [], pagination: null },
        goals: [],
        error: null,
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    // ---------- fetchProfile ----------
    it('should handle fetchProfile.fulfilled', async () => {
        const mockData = { id: '123', name: 'John Doe' }
            ; (api.getProfile as jest.Mock).mockResolvedValue({ data: mockData })

        const action = await fetchProfile('123')(jest.fn(), () => ({}), undefined)
        const newState = reducer(initialState, {
            type: fetchProfile.fulfilled.type,
            payload: mockData,
        })

        expect(api.getProfile).toHaveBeenCalledWith('123')
        expect(newState.profile).toEqual(mockData)
        expect(newState.loading).toBe(false)
    })

    it('should handle fetchProfile.rejected', async () => {
        const action = { type: fetchProfile.rejected.type, error: 'Network error' }
        const newState = reducer(initialState, action)
        expect(newState.error).toContain('Network error')
        expect(newState.loading).toBe(false)
    })

    // ---------- fetchSummary ----------
    it('should handle fetchSummary.fulfilled', () => {
        const payload = { totalSpent: 500 }
        const newState = reducer(initialState, {
            type: fetchSummary.fulfilled.type,
            payload,
        })
        expect(newState.summary).toEqual(payload)
    })

    // ---------- fetchCategories ----------
    it('should handle fetchCategories.fulfilled', () => {
        const payload = { categories: [{ name: 'Food', amount: 300 }] }
        const newState = reducer(initialState, {
            type: fetchCategories.fulfilled.type,
            payload,
        })
        expect(newState.categories).toEqual(payload.categories)
    })

    // ---------- fetchTrends ----------
    it('should handle fetchTrends.fulfilled', () => {
        const payload = { trends: [{ month: 'Jan', spent: 100 }] }
        const newState = reducer(initialState, {
            type: fetchTrends.fulfilled.type,
            payload,
        })
        expect(newState.trends).toEqual(payload.trends)
    })

    // ---------- fetchTransactions ----------
    it('should handle fetchTransactions.fulfilled', () => {
        const payload = { transactions: [{ id: 1, amount: 50 }], pagination: { page: 1 } }
        const newState = reducer(initialState, {
            type: fetchTransactions.fulfilled.type,
            payload,
        })
        expect(newState.transactions).toEqual(payload)
    })

    // ---------- fetchGoals ----------
    it('should handle fetchGoals.fulfilled', () => {
        const payload = { goals: [{ id: 'g1', name: 'Save More' }] }
        const newState = reducer(initialState, {
            type: fetchGoals.fulfilled.type,
            payload,
        })
        expect(newState.goals).toEqual(payload.goals)
    })

    // ---------- fetchSpendingByCategory ----------
    it('should handle fetchSpendingByCategory.fulfilled', () => {
        const payload = { categories: [{ name: 'Transport', amount: 120 }] }
        const newState = reducer(initialState, {
            type: fetchSpendingByCategory.fulfilled.type,
            payload,
        })
        expect(newState.categories).toEqual(payload.categories)
    })
})
