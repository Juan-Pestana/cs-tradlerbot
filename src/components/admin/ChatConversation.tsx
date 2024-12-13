import React from 'react'
import { User, Bot } from 'lucide-react'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: string
}

interface ChatConversationProps {
  messages: Message[]
}

export function ChatConversation({ messages }: ChatConversationProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm col-span-2">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Conversation</h2>
      </div>
      <div className="p-4 space-y-4 max-h-[calc(100vh-14rem)] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user'
                ? 'flex-row'
                : 'flex-row-reverse space-x-reverse'
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {message.sender === 'user' ? (
                <User className="h-5 w-5 text-blue-600" />
              ) : (
                <Bot className="h-5 w-5 text-gray-600" />
              )}
            </div>
            <div
              className={`flex-1 rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-blue-50 text-blue-900'
                  : 'bg-gray-50 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs text-gray-500 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
