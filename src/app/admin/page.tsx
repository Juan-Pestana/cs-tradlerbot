import React, { Suspense } from 'react'
import { ChatFilter } from '@/components/admin/ChatFilters'
import { ChatSessionList } from '@/components/admin/ChatSessionList'
import { ChatConversation, Message } from '@/components/admin/ChatConversation'
import { db } from '@/db'
import { eq, gte, lte, SQL, and } from 'drizzle-orm'
import { sessions } from '@/db/schema/session'
import { Session } from '@/types'
import { IfilterValues } from '@/types'

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    sender: 'assistant',
    timestamp: '2024-03-10T10:00:00',
  },
  {
    id: '2',
    content: 'I need help with my account settings.',
    sender: 'user',
    timestamp: '2024-03-10T10:01:00',
  },
  {
    id: '3',
    content:
      "I'll be happy to help you with your account settings. What specific settings would you like to adjust?",
    sender: 'assistant',
    timestamp: '2024-03-10T10:02:00',
  },
  {
    id: '4',
    content: 'Hello! How can I help you today?',
    sender: 'assistant',
    timestamp: '2024-03-10T10:00:00',
  },
  {
    id: '5',
    content: 'I need help with my account settings.',
    sender: 'user',
    timestamp: '2024-03-10T10:01:00',
  },
  {
    id: '6',
    content:
      "I'll be happy to help you with your account settings. What specific settings would you like to adjust?",
    sender: 'assistant',
    timestamp: '2024-03-10T10:02:00',
  },
  {
    id: '7',
    content: 'Hello! How can I help you today?',
    sender: 'assistant',
    timestamp: '2024-03-10T10:00:00',
  },
  {
    id: '8',
    content: 'I need help with my account settings.',
    sender: 'user',
    timestamp: '2024-03-10T10:01:00',
  },
  {
    id: '9',
    content:
      "I'll be happy to help you with your account settings. What specific settings would you like to adjust?",
    sender: 'assistant',
    timestamp: '2024-03-10T10:02:00',
  },
  {
    id: '10',
    content: 'Hello! How can I help you today?',
    sender: 'assistant',
    timestamp: '2024-03-10T10:00:00',
  },
  {
    id: '11',
    content: 'I need help with my account settings.',
    sender: 'user',
    timestamp: '2024-03-10T10:01:00',
  },
  {
    id: '12',
    content:
      "I'll be happy to help you with your account settings. What specific settings would you like to adjust?",
    sender: 'assistant',
    timestamp: '2024-03-10T10:02:00',
  },
]

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getSessionsBy({
  client,
  userId,
  startDate,
  endDate,
}: IfilterValues) {
  const filters: SQL[] = []
  if (client) filters.push(eq(sessions.client, client))
  if (userId) filters.push(eq(sessions.userId, userId))
  if (startDate) filters.push(gte(sessions.createdAt, startDate))
  if (endDate) filters.push(lte(sessions.createdAt, endDate))
  return db
    .select()
    .from(sessions)
    .where(and(...filters))
}

async function AdminPage({ searchParams }: PageProps) {
  let sessionList: Session[] | undefined = []
  if (searchParams) {
    //@ts-ignore
    sessionList = await getSessionsBy(searchParams)
  }

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6 h-full">
          <ChatFilter />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Suspense>
              <ChatSessionList sessions={sessionList} />
            </Suspense>

            <ChatConversation messages={mockMessages} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminPage
