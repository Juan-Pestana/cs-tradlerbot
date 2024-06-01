import Image from 'next/image'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { Chat } from '@/components/chat'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col px-1 md:container md:px-4">
      <div className="p-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background">
        <span className="font-bold">TradlerBot </span>
        <DarkModeToggle />
      </div>
      <div className="flex flex-1 py-4">
        <div className="w-full">
          <Chat />
        </div>
      </div>
    </main>
  )
}
