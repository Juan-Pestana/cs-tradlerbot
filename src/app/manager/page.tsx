import Image from 'next/image'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { Chat } from '@/components/chat'
import Link from 'next/link'

export default function ManagerPage() {
  return (
    <main className="relative flex min-h-screen flex-col px-1 md:container md:px-4">
      <div className="flex flex-1 py-4">
        <div className="w-full">
          <Chat />
        </div>
      </div>
    </main>
  )
}
