import React, { Suspense } from 'react'
import { ChatFilter } from '@/components/admin/ChatFilters'
import { ChatSessionList } from '@/components/admin/ChatSessionList'
import { ChatConversation } from '@/components/admin/ChatConversation'
import { getSessionsBy } from '@/actions/sessionActions'
import { Session } from '@/types'
import { headers } from 'next/headers'
import { getQueryClient } from '@/lib/getQueryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

interface PageProps {
  searchParams: { [key: string]: string | undefined }
}

async function AdminPage({ searchParams }: PageProps) {
  //little hack to prevent nextjs.14 weird caching behavior TODO upgrade to nextjs.15
  const header = headers()

  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['sessions', searchParams], // Include params in the query key for caching
    queryFn: ({ pageParam = 1 }) =>
      getSessionsBy({ pageParam, ...searchParams }), // Pass params to `getPosts`
    initialPageParam: 1,
  })

  // let sessionList: Session[] | undefined = []
  // if (searchParams) {
  //   //@ts-ignore
  //   sessionList = await getSessionsBy(searchParams)
  // }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="max-h-screen bg-gray-100">
        <div className="container mx-auto py-6 px-4 min-h-screen">
          <div className="space-y-6 flex flex-col">
            <ChatFilter />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Suspense>
                <ChatSessionList
                  params={searchParams}
                  currentSession={searchParams.session}
                />
              </Suspense>
              <Suspense>
                <ChatConversation
                  //@ts-ignore
                  sessionId={searchParams.session}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </HydrationBoundary>
  )
}

export default AdminPage
