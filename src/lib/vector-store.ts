//import { env } from './config'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { Pinecone } from '@pinecone-database/pinecone'
// Replace 'your-document-package' with the appropriate package name

export async function embedAndStoreDocs(
  client: Pinecone,
  //@ts-ignore
  docs: Document<Record<string, any>>[]
) {
  try {
    const embeddings = new OpenAIEmbeddings()
    const index = client.index(process.env.PINECONE_INDEX_NAME as string)

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      //aquí indicamos el Namespace que queremos crear o actualizar.
      //namespace: 'managers',
      textKey: 'text',
    })
  } catch (error) {
    console.error(error)
    throw new Error('error when uploading the data')
  }
}

export async function getVectorStore(client: Pinecone) {
  try {
    const embeddings = new OpenAIEmbeddings()
    const index = client.index(process.env.PINECONE_INDEX_NAME as string)

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      //OJO AQUÍ ES DONDE DEFINES EL NAMESPACE AL QUE ATACARÁ LA PREGUNTA.
      //namespace: 'managers',
      textKey: 'text',
    })
    return vectorStore
  } catch (error) {
    console.error(error)
    throw new Error(
      'Something went wrong when trying to instantiate the vectorstore'
    )
  }
}
