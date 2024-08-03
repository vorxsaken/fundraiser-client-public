import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";

export interface PaymentMethodType {
    metodePembayaran: 'bankTransfer' | 'eWallet' | null,
    principal: 'bni' | 'bri' | 'dana' | null,
    nominal: number,
    va_number: string,
    loading: boolean,
    error: any
}

const initialState: PaymentMethodType = {
    metodePembayaran: null,
    principal: null,
    nominal: 0,
    va_number: "",
    loading: true,
    error: null
}

export const fetchDraftTagihan = createAsyncThunk('/fetchDraftTagihan', async (id_tagihan: number) => {
    const draftTagihan = await fetchWithToken(`${API_URL}/api/draftPembayaran/read`, { id_tagihan })
    // console.log(draftTagihan.json)
    if (!Object.keys(draftTagihan.json).length) {
        console.log('null')
        return null
    } else {
        return draftTagihan.json
    }
})

const paymentMethodSlice = createSlice({
    name: 'paymentMethod',
    initialState,
    reducers: {
        addPaymentMethod(state, actions) {
            state.loading = true;
            state.metodePembayaran = actions.payload.paymentMethod;
            state.principal = actions.payload.principal;
            state.loading = false;
        },
        addNominal(state, actions) {
            state.nominal = actions.payload;
        },
        addVirtualNumber(state, actions) {
            state.va_number = actions.payload
        },
        clearInitialState(state) {
            state.metodePembayaran = null;
            state.principal = null;
            state.nominal = 0;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDraftTagihan.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDraftTagihan.fulfilled, (state, actions) => {
                const payloads = actions.payload as any
                
                if(payloads) {
                    state.metodePembayaran = payloads?.metode_pembayaran
                    state.nominal = payloads?.nominal
                    state.principal = payloads?.principal
                    state.va_number = payloads?.virtual_number
                    state.loading = false
                }
            })
            .addCase(fetchDraftTagihan.rejected, (state, actions) => {
                state.error = actions.error
                console.log(actions.payload)
                state.loading = false
            })
    }
})

export const { addPaymentMethod, clearInitialState, addNominal, addVirtualNumber } = paymentMethodSlice.actions
export default paymentMethodSlice.reducer






