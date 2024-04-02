import EmailTemplate from "@/Components/EmailTemplate/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

type ParamsType = {
    name: string;
    email: string;
}
export async function POST(params:ParamsType) {
    try {
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['lucasgrigol@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({ name: 'John', email: 'lucas_maieski@hotmail.com' }),
        });
      
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({error});
    }
}