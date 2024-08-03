import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";

export interface tagihanType {
    id: number,
    judul_tagihan: string,
    total_tagihan: number,
    tenggat_waktu: string,
    userId: number,
    status: 'LUNAS' | 'BELUM_LUNAS',
    sisa_tagihan: number
}

export interface tagihanStoreType {
    tagihan: tagihanType[],
    loading: boolean,
    error: any
}

const initialState: tagihanStoreType = {
    tagihan: [],
    loading: true,
    error: null
}

export const fetchTagihan = createAsyncThunk('/fetchTagihan', async (id: string) => {
    const res = await fetchWithToken(`${API_URL}/api/tagihan/read/${id}`)
    return res.json
})

const tagihanSlice = createSlice({
    name: 'tagihan',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTagihan.pending, (state, actions) => {
                state.loading = true
            })
            .addCase(fetchTagihan.fulfilled, (state, actions) => {
                const tagihan = (actions.payload as any).Tagihan
                const sortTagihan = (tagihan as tagihanType[]).sort((a, b) => a.tenggat_waktu.localeCompare(b.tenggat_waktu));
                state.tagihan = sortTagihan.filter((val: tagihanType) => val.status === "BELUM_LUNAS")
                state.loading = false
            })
            .addCase(fetchTagihan.rejected, (state, actions) => {
                state.error = actions.error.message;
                state.loading = false;
            })
    }
})

export default tagihanSlice.reducer






