import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'

const contextualizeQSystemPrompt = `Given a chat history and the latest user question
  which might reference context in the chat history, formulate a standalone question
  which can be understood without the chat history. Do NOT answer the question,
  just reformulate it if needed and otherwise return it as is.`

export const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
  ['system', contextualizeQSystemPrompt],
  new MessagesPlaceholder('chat_history'),
  ['human', '{question}'],
])

const qaSystemPrompt = `You are IRAbot a friendly and helpfull virtual assistant in charge of helping Tradler users with their questions related use of the Tradler Platform. 
Use the following pieces of retrieved context to answer the question.
If the context doesn't include relevant information to answer the question, just say that you don't know.
Use four sentences maximum and keep the answer concise and use Markdown to answer the question.

{context}`

export const qaPrompt = ChatPromptTemplate.fromMessages([
  ['system', qaSystemPrompt],
  new MessagesPlaceholder('chat_history'),
  ['human', '{question}'],
])
