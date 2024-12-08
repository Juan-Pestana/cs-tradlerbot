import Image from 'next/image'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { Chat } from '@/components/chat'
import { headers } from 'next/headers'

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({ params, searchParams }: PageProps) {
  return (
    <main className="relative flex min-h-screen flex-col px-1 md:container md:px-4">
      <div className="flex flex-1 py-4">
        <div className="w-full">
          <Chat userRole="user" />
        </div>
      </div>
    </main>
  )
}
