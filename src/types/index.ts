import { messages, sessions } from '@/db/schema/session'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type ChatGPTAgent = 'user' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
  sources?: string[]
}

export interface IfilterValues {
  client?: string
  userId?: string
  role?: string
  startDate?: string
  endDate?: string
  pageParam: unknown
}

export type Session = InferSelectModel<typeof sessions>
export type NewSession = InferInsertModel<typeof sessions>

// Infer types for `messages`
export type Message = InferSelectModel<typeof messages>
export type NewMessage = InferInsertModel<typeof messages>

export type IPage = {
  data: Session[]
  first: number
  items: number
  last: number
  next: number
  pages: number
  prev: number | null
}

export interface ICache {
  pages: IPage[]
  pageParams: number[]
}
