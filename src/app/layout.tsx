import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s | Sonho Auto Veículos",
        default: "Sonho Auto Veículos",
    },
    description: "Sonho Auto Veículos é uma empresa dedicada a realizar sonhos sobre quatro rodas. Com um compromisso inabalável com a qualidade e a satisfação do cliente, a nossa missão é proporcionar aos nossos clientes uma experiência única na busca do veículo dos seus sonhos.",
    openGraph: {
        title: 'Sonho Auto Veículos',
        description: 'Sonho Auto Veículos é uma empresa dedicada a realizar sonhos sobre quatro rodas. Com um compromisso inabalável com a qualidade e a satisfação do cliente, a nossa missão é proporcionar aos nossos clientes uma experiência única na busca do veículo dos seus sonhos.',
        url: '',
        siteName: 'Sonho Auto Veículos',
        images: [
          {
            url: '/logo.svg',
            width: 800,
            height: 600,
          },
          {
            url: '/logo.svg',
            width: 1800,
            height: 1600,
            alt: 'Logo Sonho Auto Veículos',
          },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
    // icons: {
    //     //ajustar cada caminho
    //     icon: [{ url: '/favicon.png' }, new URL('/favicon.png', 'http://localhost:3000')],
    //     shortcut: ['/shortcut-icon.png'],
    //     apple: [
    //       { url: '/apple-icon.png' },
    //       { url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
    //     ],
    //     other: [
    //       {
    //         rel: 'apple-touch-icon-precomposed',
    //         url: '/apple-touch-icon-precomposed.png',
    //       },
    //     ],
    // },
    robots: {
        follow: true,
        index: true,
    },
    icons: {
        icon: '/favicon.png',
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'lightblue' },
        { media: '(prefers-color-scheme: dark)', color: 'blue' },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br" className="container-fluid">
            <body className={`${inter.className} bg-[#f9f7f9]`}>
                <Header />

                {children}
                

            </body>
        </html>
    );
}
