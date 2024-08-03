import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import pembayaran from './pembayaran';
import tagihan from "./tagihan";
import paymentMethod from "./paymentMethod";

const store = configureStore({
    reducer: {
        user,
        pembayaran,
        tagihan,
        paymentMethod
    }
})

export default store;
export const state =  store.getState();
export type stateType = typeof state;
export const { dispatch } = store;