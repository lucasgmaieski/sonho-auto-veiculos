import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useState } from "react";
import { formContactSchema } from "@/lib/schemas/formContactSchema";

type FormProps = z.infer<typeof formContactSchema>;

export const useFormContact = () => {
    const [loading, setLoading] = useState(false);
    const [privacyCheck, setPrivacyCheck] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const { handleSubmit, register, formState: { errors}, reset } = useForm<FormProps>({mode: 'all', reValidateMode: 'onBlur', resolver: zodResolver(formContactSchema)});
    const handleForm = async (formData : FormProps) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
                method: 'POST',
                body: JSON.stringify({formData}),
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });
            if(!response.ok) {
                setMessage("Falha ao enviar sua mensagem, tente novamente!");
                setSuccess(false);
                throw new Error('Failed to fetch data');
            } else if(response.ok) {
                setMessage("Mensagem enviada com sucesso. Retornaremos o mais breve possível, Obrigado!");
                setSuccess(true);
                reset()
            }
        } catch (error) {
            setMessage("Falha ao enviar sua mensagem, tente novamente!");
            console.error(error)
        }
        finally { setLoading(false); }
    }
    const handleInputChange = () => {
        setLoading(false);
        setMessage('');
    };

    return {
        handleForm,
        handleSubmit,
        register, 
        errors,
        loading,
        message,
        success,
        handleInputChange,
        privacyCheck, 
        setPrivacyCheck
    }
}