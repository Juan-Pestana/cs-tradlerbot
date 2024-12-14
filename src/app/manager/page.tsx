import { Chat } from '@/components/chat'
import Header from '@/components/Header'
import { Suspense } from 'react'

export default function ManagerPage() {
  return (
    <>
      <Header />
      <main className="relative flex h-auto flex-col px-1 lg:container md:px-4">
        <div className="flex flex-1 py-4">
          <div className="w-full">
            <Suspense fallback={<>Loading...</>}>
              <Chat userRole="manager" />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}
