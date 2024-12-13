'use client'
import { useEffect, useRef, useState } from 'react'
import { scrollToBottom } from '@/lib/utils'
import { initialMessages } from '@/lib/utils'
import { ChatLine } from './Chat-bubble'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useChat } from 'ai/react'
import { Spinner } from './ui/spinner'
import { useSearchParams } from 'next/navigation'
import { createSession, createMessage } from '@/actions/sessionActions'

interface IchatProps {
  userRole: string
}

export function Chat({ userRole }: IchatProps) {
  const [sessionId, setSessionId] = useState<string>(crypto.randomUUID())
  const [sessionCreated, setSessionCreated] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const searchParams = useSearchParams()

  const client = searchParams.get('c')!
  const userId = searchParams.get('u') || 'unknown'

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      fetch: async (url, options) => {
        if (!sessionCreated) {
          const createdSession = await createSession({
            client,
            userId,
            userRole,
            id: sessionId,
          })
          if (createdSession) {
            setSessionCreated(true)
          }
        }
        const response = await fetch(url, options)

        return response
      },
      body: {
        sessionId,
        userRole,
      },
      initialMessages,
      onFinish: async (message, options) => {
        if (sessionId) {
          await createMessage(message, sessionId)
        }
      },
    })

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100)
  }, [messages])

  return (
    <div className="rounded-2xl border h-[80dvh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.map((message, index) => (
          <ChatLine
            key={message.id}
            role={message.role}
            content={message.content}
            sources={[]}
            // Start from the third message of the assistant
            //sources={message.role !== 'assistant' ? [] : sources}
          />
        ))}
        {isLoading && (
          <div className="w-full flex items-center justify-center">
            <Spinner size="medium" show={isLoading} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={'Type to chat with AI...'}
          className="mr-2"
        />

        <Button type="submit" className="w-24" disabled={isLoading}>
          {isLoading ? '...' : 'Ask'}
        </Button>
      </form>
    </div>
  )
}
