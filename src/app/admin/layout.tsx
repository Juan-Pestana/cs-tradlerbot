import type { Metadata } from 'next'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'Tradler Customer Support',
  description: 'Tradler Platform Customer Support Bot',
}

export default async function adminLayout(props: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  )
}
