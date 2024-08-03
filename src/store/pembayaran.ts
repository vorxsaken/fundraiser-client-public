import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";
import { stateType } from ".";

export interface pembayaranType {
    id: number,
    userId: number,
    tagihanId: number,
    nominal: number,
    tanggal_bayar: string,
    metode_bayar: string,
    status_code: string,
    status_message: string,
    transaction_id: string,
    order_id: string,
    merchant_id: string,
    gross_amount: string,
    currency: string,
    payment_type: string,
    transaction_time: string,
    transaction_status: string,
    va_number: string,
    fraud_status: string,
    Tagihan: {
        judul_tagihan: string
    }
}

const pembayaranAdapter = createEntityAdapter({
    sortComparer: (a: pembayaranType, b: pembayaranType) => b.tanggal_bayar.localeCompare(a.tanggal_bayar)
})

const initialState = pembayaranAdapter.getInitialState({
    loading: true,
    error: null
})

export const fetchPembayaran = createAsyncThunk('/fetchPembayaran', async (id: string) => {
    const pembayaran = await fetchWithToken(`${API_URL}/api/pembayaran/read/${id}`);
    console.log(pembayaran.json)
    return pembayaran.json;
})

const pembayaranSlice = createSlice({
    name: 'pembayaran',
    initialState,
    reducers: {
        resetPembayaranState(state) {
            pembayaranAdapter.removeAll(state)
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPembayaran.pending, (state, actions) => {
                state.loading = true
            })
            .addCase(fetchPembayaran.fulfilled, (state, actions) => {
                pembayaranAdapter.upsertMany(state, actions.payload)
                state.loading = false;
            })
            .addCase(fetchPembayaran.rejected, (state, actions) => {
                state.error = actions.error as any;
                state.loading = false
            })
    }
})

export default pembayaranSlice.reducer;
export const { resetPembayaranState } = pembayaranSlice.actions
export const {
    selectAll: selectAllPembayaran,
    selectById: selectPembayaranById
} = pembayaranAdapter.getSelectors((state: stateType) => state.pembayaran);