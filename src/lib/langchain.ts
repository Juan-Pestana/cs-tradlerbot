import { getVectorStore } from './vector-store'
import { getPineconeClient } from './pinecone-client'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import {
  RunnableSequence,
  RunnablePassthrough,
} from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'

import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'

type callChainArgs = {
  question: string
  chatHistory: string
}

export async function callChain({ question, chatHistory }: callChainArgs) {
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ')
  const pineconeClient = await getPineconeClient()
  const vectorStore = await getVectorStore(pineconeClient)
  try {
    //CHAIN LOGIC GOES HERE
  } catch (error) {
    console.error(error)
  }
}
