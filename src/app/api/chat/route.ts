import { NextRequest, NextResponse } from 'next/server'
import { callChain } from '@/lib/langchain'
import { LangChainAdapter } from 'ai'
import { Message } from 'ai'
import { headers } from 'next/headers'
import { messages } from '@/db/schema/session'
import { AIMessage, HumanMessage } from '@langchain/core/messages'
import { db } from '@/db'

//OJO ya no se si podemos utilizar edge
export const runtime = 'edge'

const formatMessage = (message: Message) =>
  message.role === 'user'
    ? new HumanMessage(message.content)
    : new AIMessage(message.content)

export async function POST(req: NextRequest) {
  const body = await req.json()

  const pathname = body.userRole

  let session = body.sessionId

  const allMessages: Message[] = body.messages ?? []

  const formattedPreviousMessages = allMessages.slice(0, -1).map(formatMessage)
  const question = allMessages[allMessages.length - 1].content

  if (!question || !session) {
    return NextResponse.json('Error: No question or session in the request', {
      status: 400,
    })
  }

  try {
    await db.insert(messages).values({
      content: allMessages[allMessages.length - 1].content,
      session_id: session,
      role: allMessages[allMessages.length - 1].role,
    })

    const aiStream = await callChain({
      pathname,
      question,
      chat_history: formattedPreviousMessages,
    })

    //return new StreamingTextResponse(aiStream)

    return LangChainAdapter.toDataStreamResponse(aiStream)
  } catch (error) {
    //console.error('Internal Server Error', error)
    return NextResponse.json('Error: Something went wrong, try again!', {
      status: 500,
    })
  }
}
