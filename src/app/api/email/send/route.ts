import EmailTemplate from "@/Components/EmailTemplate/EmailTemplate";
import { formContactSchema } from "@/lib/schemas/formContactSchema";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
import { z } from "zod";

type ParamsType = {
    name: string;
    email: string;
}
type CloseProjectProps = z.infer<typeof formContactSchema>;

export async function POST(req: Request) {
    try {
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

        const { formData } = await req.json();
        const { name, state, city, email, phone, message } = formData;
        const parse = formContactSchema.safeParse({ name, state, city, email, phone, message });

        if (!parse.success) {
            return NextResponse.json({ ok: false, message: 'Preencha todos os campos corretamente e tente novamente!', status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['lucasgrigol@gmail.com'],
            subject: 'Contato - Sonho Auto Veículos',
            react: EmailTemplate({ name, email, phone, state, city, message }),
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({error});
    }
}