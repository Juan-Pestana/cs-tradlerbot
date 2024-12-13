'use client'

import React from 'react'
import { MessageSquare, User, Clock } from 'lucide-react'
import { Session } from '@/db/schema/session'
import { useRouter, useSearchParams } from 'next/navigation'

export interface ChatSession {
  id: string
  clientName: string
  userId: string
  createdAt: string
  messageCount: number
}

interface ChatSessionListProps {
  sessions: Session[]
  selectedSession?: string
}

export function ChatSessionList({
  sessions,
  selectedSession,
}: ChatSessionListProps) {
  const router = useRouter()
  const params = useSearchParams()

  const searchParams = new URLSearchParams(params)

  return (
    <div className="bg-white rounded-lg shadow-sm ">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat Sessions</h2>
      </div>
      <div className="divide-y divide-gray-200 max-h-[calc(100vh-14rem)] overflow-y-auto">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => {
              searchParams.set('session', session.id)
              router.push(`?${searchParams.toString()}`)
            }}
            className={`w-full p-4 text-left hover:bg-gray-200 transition-colors ${
              params.get('session') == session.id && 'bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {session.client}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MessageSquare className="h-4 w-4" />
                  <span> messages</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{new Date(session.createdAt!).toLocaleDateString()}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
