import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/Header'
import { use } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tradler Customer Support',
  description: 'Tradler Platform Customer Support Bot',
}

type Params = Promise<{ slug: string }>

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(`min-h-screen bg-background font-sans antialiased`)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  )
}
