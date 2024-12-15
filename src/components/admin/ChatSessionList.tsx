'use client'

import { User, Clock, Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useGetSessions, { IgetSessionsParams } from '@/hooks/useGetSessions'

interface ChatSessionListProps {
  params: IgetSessionsParams
  currentSession?: string
}

export function ChatSessionList({
  params,
  currentSession,
}: ChatSessionListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSessions(params)

  const router = useRouter()

  const searchParams = new URLSearchParams(params)

  return (
    <div className="bg-white rounded-lg shadow-sm h-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat Sessions</h2>
      </div>
      <div className="divide-y divide-gray-200 max-h-[calc(100vh-14rem)] overflow-y-auto">
        {data?.pages.map((page) =>
          page.data.map((session) => (
            <button
              key={session.id}
              onClick={() => {
                searchParams.set('session', session.id)
                router.push(`?${searchParams.toString()}`)
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-200 transition-colors ${
                session.id === currentSession && 'bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 ">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {session.client}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{session.userRole}</span>
                  </div>
                </div>
                <div className="space-y-1 flex flex-col gap-2 w-24 text-ellipsis">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(session.createdAt!).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>{session.userId}</span>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat Sessions</h2>
      </div>
      <div className="divide-y divide-gray-200 max-h-[calc(100vh-14rem)] overflow-y-auto">
        {sessions?.map((session) => (
          <button
            key={session.id}
            onClick={() => {
              searchParams.set('session', session.id)
              router.push(`?${searchParams.toString()}`)
            }}
            className={`w-full px-4 py-3 text-left hover:bg-gray-200 transition-colors ${
              params.get('session') == session.id && 'bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex flex-col gap-2">
                <div className="flex items-center gap-2 ">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {session.client}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>{session.userRole}</span>
                </div>
              </div>
              <div className="space-y-1 flex flex-col gap-2 w-24 text-ellipsis">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(session.createdAt!).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <span>{session.userId}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div> */}
    </div>
  )
}
