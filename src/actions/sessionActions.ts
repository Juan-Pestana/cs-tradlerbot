'use server'

import { db } from '@/db'
import { asc, eq, gte, lte, SQL, and } from 'drizzle-orm'
import { messages, sessions } from '@/db/schema/session'

import { IfilterValues } from '@/types'

interface IcreateMessage {
  content: string
  role: string
}

interface IcreateSession {
  client: string
  userRole: string
  userId: string
  id: string
}

export async function createSession({
  client,
  userId,
  userRole,
  id,
}: IcreateSession) {
  const res = await db
    .insert(sessions)
    .values({ client, userRole, userId, id })
    .returning()

  return res[0].id
}

export const createMessage = (message: IcreateMessage, session: string) => {
  const res = db
    .insert(messages)
    .values({
      content: message.content,
      role: message.role,
      session_id: session,
    })
    .returning()

  return res
}

const NUM_OF_SESSIONS = 3

export async function getSessionsBy({
  client,
  userId,
  role,
  startDate,
  endDate,
  pageParam,
}: IfilterValues) {
  const filters: SQL[] = []
  if (client) filters.push(eq(sessions.client, client))
  if (userId) filters.push(eq(sessions.userId, userId))
  if (role) filters.push(eq(sessions.userRole, role))
  if (startDate) filters.push(gte(sessions.createdAt, startDate))
  if (endDate) filters.push(lte(sessions.createdAt, endDate))

  const results = await db
    .select()
    .from(sessions)
    .where(and(...filters))
    .orderBy(asc(sessions.createdAt))
    .limit(NUM_OF_SESSIONS)
    //@ts-ignore
    .offset((pageParam - 1) * NUM_OF_SESSIONS)

  const hasNextPage = results.length === NUM_OF_SESSIONS
  return {
    data: results,
    hasNextPage,
  }
}

export const getPaginatedSessions = () => {}
