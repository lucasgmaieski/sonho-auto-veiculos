import { z } from "zod";

const phoneRegex = new RegExp(
    /^\d{10,11}$/
);
  
export const formContactSchema = z.object({
    name: z.string().min(3, "Digite pelo menos 3 caracteres"),
    email: z.string().email({message: 'Endereço de email inválido'}),
    phone: z.string().regex(phoneRegex, 'O telefone deve ter entre 10 e 11 dígitos'),
    state: z.string().min(1, 'Selecione o Estado'),
    city: z.string().min(1, 'Selecione a Cidade'),
    message: z.string().min(5, 'Mensagem muito curta'),
})