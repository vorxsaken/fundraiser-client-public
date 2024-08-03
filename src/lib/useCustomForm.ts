import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';

export function useCustomForm(formSchema: any, defaultValue?: any) {
    const form = useForm<z.infer<typeof formSchema>>({
        mode: 'onTouched',
        reValidateMode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue || {}
    })

    const resetForm = () => {
        form.reset();
        form.clearErrors();
    }

    return { form, resetForm }
}