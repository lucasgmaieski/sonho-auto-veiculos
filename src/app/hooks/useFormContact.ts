import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useState } from "react";

const phoneRegex = new RegExp(
    /^\d{10,11}$/
  );

const schema = z.object({
    name: z.string().min(3, "Digite pelo menos 3 caracteres"),
    email: z.string().email({message: 'Endereço de email inválido'}),
    phone: z.string().regex(phoneRegex, 'O telefone deve ter entre 10 e 11 dígitos'),
    state: z.string().min(1, 'Selecione o Estado'),
    city: z.string().min(1, 'Selecione a Cidade'),
    message: z.string().min(5, 'Mensagem muito curta'),
})
type FormProps = z.infer<typeof schema>;

export const useFormContact = () => {
    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, formState: { errors} } = useForm<FormProps>({mode: 'all', reValidateMode: 'onChange', resolver: zodResolver(schema)});
    const handleForm = async (data: FormProps) => {
        console.log(data);
    }
    const handleInputChange = () => {
        setLoading(false);
    };

     return {
        handleForm,
        handleSubmit,
        register, 
        errors,
        loading,
        handleInputChange,
     }
}