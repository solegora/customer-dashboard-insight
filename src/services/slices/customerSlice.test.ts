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

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    // ---------- fetchProfile ----------
    it('should handle fetchProfile.pending', () => {
        const newState = reducer(initialState, { type: fetchProfile.pending.type })
        expect(newState.loading).toBe(true)
    })

    it('should handle fetchProfile.fulfilled', async () => {
        const mockData = { id: '123', name: 'John Doe' }
            ; (api.getProfile as jest.Mock).mockResolvedValue({ data: mockData })

        await fetchProfile('123')(jest.fn(), () => ({}), undefined)
        const newState = reducer(initialState, {
            type: fetchProfile.fulfilled.type,
            payload: mockData,
        })

        expect(api.getProfile).toHaveBeenCalledWith('123')
        expect(newState.profile).toEqual(mockData)
        expect(newState.loading).toBe(false)
    })

    it('should return payload for fetchProfile thunk', async () => {
        const mockData = { id: '123', name: 'John Doe' }
        ;(api.getProfile as jest.Mock).mockResolvedValue({ data: mockData })

        const action = await fetchProfile('123')(jest.fn(), () => ({}), undefined)

        expect(action.type).toBe(fetchProfile.fulfilled.type)
        expect(action.payload).toEqual(mockData)
    })

    it('should handle fetchProfile.rejected', async () => {
        const action = { type: fetchProfile.rejected.type, error: 'Network error' }
        const newState = reducer(initialState, action)
        expect(newState.error).toContain('Network error')
        expect(newState.loading).toBe(false)
    })

    // ---------- fetchSummary ----------
    it('should call api in fetchSummary thunk and return payload', async () => {
        const payload = { totalSpent: 500 }
        ;(api.getSpendingSummary as jest.Mock).mockResolvedValue({ data: payload })

        const action = await fetchSummary({ customerId: '12345', period: '30d' })(jest.fn(), () => ({}), undefined)

        expect(api.getSpendingSummary).toHaveBeenCalledWith('12345', '30d')
        expect(action.type).toBe(fetchSummary.fulfilled.type)
        expect(action.payload).toEqual(payload)
    })

    it('should handle fetchSummary.fulfilled', () => {
        const payload = { totalSpent: 500 }
        const newState = reducer(initialState, {
            type: fetchSummary.fulfilled.type,
            payload,
        })
        expect(newState.summary).toEqual(payload)
    })

    // ---------- fetchCategories ----------
    it('should call api in fetchCategories thunk and return payload', async () => {
        const payload = { categories: [{ name: 'Food', amount: 300 }] }
        const query = { startDate: '2024-09-01', endDate: '2024-09-30' }
        ;(api.getSpendingByCategory as jest.Mock).mockResolvedValue({ data: payload })

        const action = await fetchCategories({ customerId: '12345', query })(jest.fn(), () => ({}), undefined)

        expect(api.getSpendingByCategory).toHaveBeenCalledWith('12345', query)
        expect(action.type).toBe(fetchCategories.fulfilled.type)
        expect(action.payload).toEqual(payload)
    })

    it('should handle fetchCategories.fulfilled', () => {
        const payload = { categories: [{ name: 'Food', amount: 300 }] }
        const newState = reducer(initialState, {
            type: fetchCategories.fulfilled.type,
            payload,
        })
        expect(newState.categories).toEqual(payload.categories)
    })

    // ---------- fetchTrends ----------
    it('should call api in fetchTrends thunk and return payload', async () => {
        const payload = { trends: [{ month: 'Jan', spent: 100 }] }
        ;(api.getTrends as jest.Mock).mockResolvedValue({ data: payload })

        const action = await fetchTrends({ customerId: '12345', months: 6 })(jest.fn(), () => ({}), undefined)

        expect(api.getTrends).toHaveBeenCalledWith('12345', 6)
        expect(action.type).toBe(fetchTrends.fulfilled.type)
        expect(action.payload).toEqual(payload)
    })

    it('should handle fetchTrends.fulfilled', () => {
        const payload = { trends: [{ month: 'Jan', spent: 100 }] }
        const newState = reducer(initialState, {
            type: fetchTrends.fulfilled.type,
            payload,
        })
        expect(newState.trends).toEqual(payload.trends)
    })

    // ---------- fetchTransactions ----------
    it('should call api in fetchTransactions thunk and return payload', async () => {
        const payload = { transactions: [{ id: 1, amount: 50 }], pagination: { page: 1 } }
        const params = { limit: 20, offset: 0 }
        ;(api.getTransactions as jest.Mock).mockResolvedValue({ data: payload })

        const action = await fetchTransactions({ customerId: '12345', params })(jest.fn(), () => ({}), undefined)

        expect(api.getTransactions).toHaveBeenCalledWith('12345', params)
        expect(action.type).toBe(fetchTransactions.fulfilled.type)
        expect(action.payload).toEqual(payload)
    })

    it('should handle fetchTransactions.fulfilled', () => {
        const payload = { transactions: [{ id: 1, amount: 50 }], pagination: { page: 1 } }
        const newState = reducer(initialState, {
            type: fetchTransactions.fulfilled.type,
            payload,
        })
        expect(newState.transactions).toEqual(payload)
    })

    // ---------- fetchGoals ----------
    it('should call api in fetchGoals thunk and return payload', async () => {
        const payload = { goals: [{ id: 'g1', name: 'Save More' }] }
        ;(api.getGoals as jest.Mock).mockResolvedValue({ data: payload })

        const action = await fetchGoals('12345')(jest.fn(), () => ({}), undefined)

        expect(api.getGoals).toHaveBeenCalledWith('12345')
        expect(action.type).toBe(fetchGoals.fulfilled.type)
        expect(action.payload).toEqual(payload)
    })

    it('should handle fetchGoals.fulfilled', () => {
        const payload = { goals: [{ id: 'g1', name: 'Save More' }] }
        const newState = reducer(initialState, {
            type: fetchGoals.fulfilled.type,
            payload,
        })
        expect(newState.goals).toEqual(payload.goals)
    })

    // ---------- fetchSpendingByCategory ----------
    it('should call api in fetchSpendingByCategory thunk with formatted dates', async () => {
        const payload = { categories: [{ name: 'Transport', amount: 120 }] }
        ;(api.getSpendingByCategory as jest.Mock).mockResolvedValue({ data: payload })

        const startDate = new Date('2024-09-01T12:00:00.000Z')
        const endDate = new Date('2024-09-30T12:00:00.000Z')

        const action = await fetchSpendingByCategory({ startDate, endDate })(jest.fn(), () => ({}), undefined)

        expect(api.getSpendingByCategory).toHaveBeenCalledWith('12345', {
            startDate: '2024-09-01',
            endDate: '2024-09-30',
        })
        expect(action.type).toBe(fetchSpendingByCategory.fulfilled.type)
        expect(action.payload).toEqual(payload)
    })

    it('should handle fetchSpendingByCategory.fulfilled', () => {
        const payload = { categories: [{ name: 'Transport', amount: 120 }] }
        const newState = reducer(initialState, {
            type: fetchSpendingByCategory.fulfilled.type,
            payload,
        })
        expect(newState.categories).toEqual(payload.categories)
    })
})
