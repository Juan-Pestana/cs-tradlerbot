import type { Metadata } from 'next'

import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Tradler Customer Support',
  description: 'Tradler Platform Customer Support Bot',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(`min-h-screen bg-background font-sans antialiased`)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  )
}
