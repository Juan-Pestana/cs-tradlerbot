import { Chat } from '@/components/chat'
import Header from '@/components/Header'
import { Suspense } from 'react'

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen flex-col px-1 md:container md:px-4">
        <div className="flex flex-1 py-4">
          <div className="w-full">
            <Suspense fallback={<>Loading...</>}>
              <Chat userRole="user" />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}
