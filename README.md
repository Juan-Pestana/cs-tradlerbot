# IraBot

## AI-Driven Customer Support Chatbot for Tradler

## Overview

This project is an AI-powered chatbot designed to serve as a customer support agent for the Tradler platform. The chatbot is built using modern technologies and tools to ensure an efficient and user-friendly experience for both users and managers. This is my first project deployed at work, and I aim to make it accessible for the team to understand its features, installation process, and usage.

---

## Features

### Chatbots for Different Roles

- **User Chatbot**: Designed for end-users, providing support based on a knowledge base specific to user needs.
- **Manager Chatbot**: Tailored for managers, accessing a separate knowledge base with manager-specific information.

### Knowledge Base

- The knowledge bases are stored in **Pinecone** as two distinct namespaces within an index.

### Session Management

- Conversations are saved in a **Turso database**, using **Drizzle ORM** for structured querying.

### Admin Page

- Allows filtering and searching through chatbot sessions.
- Enables customer support teams to analyze user issues and chatbot responses.
- Keeps the state of the filtering and session in the URL for easy sharing with the operations team.

### Real-Time Features

- **Vercel’s AI SDK** is utilized for streaming responses and maintaining conversation states.

### Modular Architecture

- Built with **LangChain** to handle chatbot logic.
- Uses **ChatGPT** as the core LLM (Large Language Model).

### Framework and Deployment

- Developed using **Next.js** for a seamless web application framework.
- Hosted on **Vercel** for efficient deployment and scalability.

---

## Installation

### Prerequisites

Ensure the following tools and accounts are set up:

- Node.js (v16+)
- NPM or Yarn
- Pinecone account for vector database
- Turso database for session storage
- Vercel account for deployment

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
    OPENAI_API_KEY=
    PINECONE_API_KEY=
    PINECONE_INDEX_NAME="irabot"
    PINECONE_NAME_SPACE=
    PDF_PATH=
    INDEX_INIT_TIMEOUT=240000
    #Uncoment to push changes to prod DB
    #DATABASE_URL='libsql://irabotdb-tradler.aws-eu-west-3.turso.io'
    #DATABASE_AUTH_TOKEN=
   ```

4. **Set Up Development Database**
   Spin up a local Turso development database:

   ```bash
   turso dev --db-file dev.db
   ```

5. **Push Database Schema**
   Use Drizzle Kit to push schema changes to the database:

   ```bash
   npx drizzle-kit push
   ```

6. **Preview Database Records**
   Open the Drizzle Studio to preview the database:

   ```bash
   npx drizzle-kit studio
   ```

7. **Run Locally**
   Start the development server:

   ```bash
   npm run dev
   ```

8. **Build and Deploy**
   Build the application:
   ```bash
   npm run build
   ```
   Deploy to Vercel:
   ```bash
   vercel deploy
   ```

---

## Usage

### Accessing the Chatbot

- Users and managers can interact with their respective chatbots via the web interface.

### Admin Page

- Navigate to the admin route (`/admin`) to filter and analyze chatbot sessions.
- Use the search and filter features to pinpoint specific sessions for review.
- Share session details with the operations team using the URL.

---

## Update Knowledge Base

- Go to pinecone dashboard and delete the namespace you want to update
- Replace the pdf files in the docs folder.
- Idicate the path to the doc to be updated in the `.env` file
- go to `lib\vectore-store.ts` to update the embedAndStoreDocs method indicating the namespace to be updated

```typescript
await PineconeStore.fromDocuments(docs, embeddings, {
  pineconeIndex: index,
  //indicate the namespace you want to create or update,
  //leave blank for users knowledge base as this is the default.
  namespace: 'managers',
  textKey: 'text',
})
```

- run the command to proceed with the upload.

```bash
npm run prepare:data
```

---

## Contributing

Feel free to contribute to by:

- Reporting issues.
- Suggesting new features.
- Submitting pull requests.
