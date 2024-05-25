//import { LangChainAdapter, StreamingTextResponse } from 'ai'

import { ChatOpenAI } from '@langchain/openai'

export const nonStreamingModel = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  streaming: false,
  verbose: true,
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
})
