import { relations, sql } from 'drizzle-orm'
import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core'

// Conversations table
export const sessions = sqliteTable('sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
  updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
})

export const sessionRelations = relations(sessions, ({ many }) => ({
  messages: many(messages),
}))

// Messages table
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  session_id: integer('session_id').notNull(),
  role: text('role').notNull(), // 'user' or 'ai'
  content: text('content').notNull(),
  timestamp: text('created_at').default(sql`(CURRENT_DATE)`), //esto está mal hay que meter date y time
})

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(sessions, {
    fields: [messages.session_id],
    references: [sessions.id],
  }),
}))
