import { getVectorStore } from './vector-store'
import { getPineconeClient } from './pinecone-client'
import { nonStreamingModel, streamingModel } from '@/lib/llm-models'
import {
  RunnableSequence,
  RunnablePassthrough,
} from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { LangChainAdapter, StreamingTextResponse } from 'ai'
import { contextualizeQPrompt, qaPrompt } from '@/lib/prompt-templates'
//import {nonStreamingModel} from '@/lib/llm-models'
import { formatDocumentsAsString } from 'langchain/util/document'
import { AIMessage, HumanMessage } from '@langchain/core/messages'

type callChainArgs = {
  pathname: string | undefined
  question: string
  chat_history: (HumanMessage | AIMessage)[]
}

export async function callChain({
  question,
  chat_history,
  pathname,
}: callChainArgs) {
  const pineconeClient = await getPineconeClient()
  const vectorStore = await getVectorStore(pineconeClient, pathname)
  const retriever = vectorStore.asRetriever()
  try {
    //CHAIN LOGIC GOES HERE

    const contextualizeQChain = contextualizeQPrompt
      .pipe(nonStreamingModel)
      .pipe(new StringOutputParser())

    const contextualizedQuestion = (input: Record<string, unknown>) => {
      if ('chat_history' in input) {
        return contextualizeQChain
      }
      return input.question
    }

    const ragChain = RunnableSequence.from([
      RunnablePassthrough.assign({
        context: async (input: Record<string, unknown>) => {
          //console.log('innput en el runnable', input)
          if ('chat_history' in input) {
            const chain = contextualizedQuestion(input)

            //@ts-ignore
            return chain.pipe(retriever).pipe(formatDocumentsAsString)
          }
          return ''
        },
      }),
      qaPrompt,
      streamingModel,
    ])

    const stream = await ragChain.stream({ question, chat_history })

    return LangChainAdapter.toAIStream(stream)
  } catch (error) {
    console.error(error)
    return new ReadableStream()
  }
}
