import { relations, sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

// Conversations table
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  userRole: text('user_role').notNull(),
  client: text('client').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
  updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
})

export const sessionRelations = relations(sessions, ({ many }) => ({
  messages: many(messages),
}))

// Messages table
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  session_id: text('session_id').notNull(),
  role: text('role').notNull(), // 'user' or 'ai'
  content: text('content').notNull(),
  timestamp: text('timestamp').default(sql`(CURRENT_TIME)`), //esto está mal hay que meter date y time
})

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(sessions, {
    fields: [messages.session_id],
    references: [sessions.id],
  }),
}))
