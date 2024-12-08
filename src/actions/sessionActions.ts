'use server'

import { db } from '@/db'
import { messages, sessions } from '@/db/schema/session'

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
