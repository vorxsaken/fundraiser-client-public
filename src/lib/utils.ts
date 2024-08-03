import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Storage } from "@ionic/storage";
import { API_URL } from "./variables";
import { jwtVerify } from "jose";
import { secret } from "./variables";
import { Preferences } from "@capacitor/preferences";

// types interfaces
interface checkAuthReturnType { isAuthenticated: boolean, status: string, error?: any, id?: string };
interface successLoginRes { message: string, JWT: string, id: string };
interface fetchWithTokenReturnType<T> { status: number, json: T }

export type draftPembayaranType = {
    id_tagihan: number,
    metode_pembayaran: string,
    nominal: number,
    principal: string,
    virtual_number: string
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export async function fetchWithToken<T = { message?: string }>(url: string, body?: any): Promise<fetchWithTokenReturnType<T>> {
    return new Promise(async (resolve, reject) => {
        const token = await Preferences.get({key: "token"});
        const bodyWithToken = {
            token: token.value?.toString(),
            ...body
        }

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(bodyWithToken)
            }).catch(err => { throw err })

            const jsonData = await res.json();
            resolve({ status: res.status, json: jsonData })
        } catch (error) {
            reject(error)
        }
    })
}

export const checkAuth = async (): Promise<checkAuthReturnType> => {
    let status, id: any = null;
    let isAuthenticated = false;
    let token = await Preferences.get({ key: "token" });
    console.log('token : ', token.value)
    let secretKey = new TextEncoder().encode(secret);

    return new Promise((resolve, reject) => {
        fetchWithToken(`${API_URL}/api/user/read/siswa`).then(async (res) => {
            status = 'fullfilled'
            if (res.status === 200) {
                isAuthenticated = true;
                let { payload } = await jwtVerify(token.value?.toString() as string, secretKey);
                id = payload.id;
            }
            resolve({ isAuthenticated, status, error: res.json.message, id });
        }).catch((error) => {
            reject({ isAuthenticated, status: 'fullfilled with error', error });
        })
    })
}

export async function signIn(username: string, password: string) {
    const sess = await fetch(API_URL + '/api/user/read/signIn', {
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'password': password,
        })
    });

    const result = await sess.json() as successLoginRes;
    return { result, status: sess.status }
}

export async function signOut() {
    await Preferences.remove({key: "token"});
}

export const parseCurrency = (number: number) => new Intl.NumberFormat('de-DE').format(number);
export const parseDate = (text: string) => {
    const date = new Date(text);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const getMonthString = (month: number) => {
    const monthStrings = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'Mei',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'Oktober',
        11: 'November',
        12: 'December'
    }
    const monthKey = month as keyof typeof monthStrings
    return monthStrings[monthKey];
}

export const standartDate = (date: string) => {
    const dateString = parseDate(date);
    const dateArray = dateString.split('/');
    dateArray[1] = getMonthString(parseInt(dateArray[1]));
    return dateArray.join(' ');
}