"use client"
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

type Props = {
    children: React.ReactNode;
}
export default function Provider({children}: Props) {
    return <ThemeProvider attribute="class">{children}</ThemeProvider>
}