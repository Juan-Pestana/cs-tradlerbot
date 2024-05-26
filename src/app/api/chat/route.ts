import { NextRequest, NextResponse } from 'next/server'
import { callChain } from '@/lib/langchain'
import { LangChainAdapter, StreamingTextResponse } from 'ai'
import { Message } from 'ai'

import { AIMessage, HumanMessage } from '@langchain/core/messages'

//OJO ya no se si podemos utilizar edge
export const runtime = 'edge'

const formatMessage = (message: Message) =>
  message.role === 'user'
    ? new HumanMessage(message.content)
    : new AIMessage(message.content)

export async function POST(req: NextRequest) {
  const body = await req.json()

  const messages: Message[] = body.messages ?? []

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
  const question = messages[messages.length - 1].content

  if (!question) {
    return NextResponse.json('Error: No question in the request', {
      status: 400,
    })
  }

  try {
    const aiStream = await callChain({
      question,
      chat_history: formattedPreviousMessages,
    })

    //const stream = new ReadableStream()

    //const aiStream = LangChainAdapter.toAIStream(stream)

    return new StreamingTextResponse(aiStream)
  } catch (error) {
    console.error('Internal Server Error', error)
    return NextResponse.json('Error: Something went wrong, try again!', {
      status: 500,
    })
  }
}
