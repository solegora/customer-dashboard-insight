// src/features/customer/customerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/mockdata'

export const fetchProfile = createAsyncThunk('customer/fetchProfile', async (customerId: string) => {
    const res = await api.getProfile(customerId)
    return res.data
})

export const fetchSummary = createAsyncThunk('customer/fetchSummary', async ({ customerId, period }: any) => {
    const res = await api.getSpendingSummary(customerId, period)
    return res.data
})

export const fetchCategories = createAsyncThunk('customer/fetchCategories', async (args: any) => {
    const res = await api.getSpendingByCategory(args.customerId, args.query)
    return res.data
})

export const fetchTrends = createAsyncThunk('customer/fetchTrends', async ({ customerId, months }: any) => {
    const res = await api.getTrends(customerId, months)
    return res.data
})

export const fetchTransactions = createAsyncThunk('customer/fetchTransactions', async ({ customerId, params }: any) => {
    const res = await api.getTransactions(customerId, params)
    return res.data
})

export const fetchGoals = createAsyncThunk('customer/fetchGoals', async (customerId: string) => {
    const res = await api.getGoals(customerId)
    return res.data
})

export const fetchSpendingByCategory = createAsyncThunk(
    "customer/fetchSpendingByCategory",
    async ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];

        const res = await api.getSpendingByCategory('12345', {
            startDate: start,
            endDate: end
        });
        return res.data;
    }
);


const initialState = {
    loading: false,
    profile: null as any,
    summary: null as any,
    categories: [] as any[],
    trends: [] as any[],
    transactions: { transactions: [], pagination: null } as any,
    goals: [] as any[],
    error: null as string | null,
}

const slice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (s) => { s.loading = true })
            .addCase(fetchProfile.fulfilled, (s, a) => { s.profile = a.payload; s.loading = false })
            .addCase(fetchProfile.rejected, (s, a) => { s.error = String(a.error); s.loading = false })

            .addCase(fetchSummary.fulfilled, (s, a) => { s.summary = a.payload })
            .addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload.categories })
            .addCase(fetchTrends.fulfilled, (s, a) => { s.trends = a.payload.trends })
            .addCase(fetchTransactions.fulfilled, (s, a) => { s.transactions = a.payload })
            .addCase(fetchGoals.fulfilled, (s, a) => { s.goals = a.payload.goals })
            .addCase(fetchSpendingByCategory.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
            });
    }
})

export default slice.reducer
