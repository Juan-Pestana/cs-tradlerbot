import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { NotionLoader } from 'langchain/document_loaders/fs/notion'

//import { env } from './config'

// also check
//https://js.langchain.com/v0.2/docs/integrations/document_loaders/file_loaders/docx

export async function getChunkedDocsFromPDF() {
  try {
    const loader = new PDFLoader(process.env.PDF_PATH as string)

    const docs = await loader.load()

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const chunkedDocs = await textSplitter.splitDocuments(docs)
    return chunkedDocs
  } catch (error) {
    console.error(error)
    throw new Error('PDF chunking failed')
  }
}
