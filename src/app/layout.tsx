import type { Metadata } from 'next'

import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from 'next-themes'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Tradler Customer Support',
  description: 'Tradler Platform Customer Support Bot',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(`max-h-dvh bg-background font-sans antialiased`)}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
