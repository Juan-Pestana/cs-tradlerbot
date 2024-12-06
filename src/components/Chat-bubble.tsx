'use client'
//import Balancer from 'react-wrap-balancer'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Message } from 'ai/react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { formattedText } from '@/lib/utils'
import { useEffect, useState } from 'react'

const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

interface ChatLineProps extends Partial<Message> {
  sources: string[]
}

export function ChatLine({
  role = 'assistant',
  content,
  sources,
}: ChatLineProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  if (!content) {
    return null
  }
  const formattedMessage = convertNewLines(content)

  return (
    <div className="my-4">
      <Card
        className={`mb-2 w-full md:max-w-[75%] md:w-max ${
          role !== 'assistant' && 'md:ml-auto '
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`text-xl ${
              role != 'assistant'
                ? 'text-amber-500 dark:text-amber-200 ml-auto'
                : 'text-blue-500 dark:text-blue-200'
            }`}
          >
            {role == 'assistant' ? (
              <div className="flex items-center gap-4">
                <Image
                  className="w-14 h-14 rounded-full"
                  src="/irabot.png"
                  width={50}
                  height={50}
                  alt="Rounded avatar"
                />{' '}
                IraBot
              </div>
            ) : (
              'You'
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg">
          <div
            className="prose dark:prose-invert
  prose-h1:font-bold prose-h1:text-xl
  prose-a:text-blue-600 prose-p:text-justify prose-img:rounded-xl
  prose-headings:underline"
          >
            <ReactMarkdown className="">{content}</ReactMarkdown>
          </div>
        </CardContent>
        <CardFooter>
          {/* <CardDescription className="w-full">
            {sources && sources.length ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index}>
                    <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown>{formattedText(source)}</ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : null}
          </CardDescription> */}
        </CardFooter>
      </Card>
    </div>
  )
}
