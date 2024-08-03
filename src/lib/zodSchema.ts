import { z } from 'zod';

const PASSWORD_PATTERN =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
const PASSWORD_ERROR_MSG = 'Password harus memiliki minimal 1 karakter besar, kecil dan angka';

export const loginSchema = z.object({
    username: z.string()
    .refine((string) => string !== '', 'Username tidak boleh kosong')
    .refine((string) => string.length >= 3, 'Panjang karakter username minimal 3'),
    password: z.string().refine(str => str !== '', 'Password tidak boleh kosong').refine(str => PASSWORD_PATTERN.test(str), PASSWORD_ERROR_MSG)
})

export type loginSchemaType = z.infer<typeof loginSchema>

