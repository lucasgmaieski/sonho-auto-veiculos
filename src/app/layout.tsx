import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './geral.module.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={styles.html}>
      <body className={inter.className +'body'}>{children}</body>
    </html>
  )
}
