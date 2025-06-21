'use client'

import { useState } from 'react'

type MessageProps = {
  user: string
  message: string
  timestamp: string
}

export default function ClientSide() {
  // dashboard look
  // first feature is a client unique UUID - that pings next api route - UUID is connected to a bucket that rate limits requests

  let endpoint: string

  const Message = ({ user, message, timestamp }: MessageProps) => {
    return (
      <div className="flex items-center"> {/* Align items vertically in the center */}
        {/* Server/User label with fixed width */}
        <div
          className={`text-sm mr-2 flex justify-center items-center w-16 ${user === 'System' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-white'} flex-shrink-0`}
        >
          {user === 'System' ? 'Server' : 'User'}
        </div>

        {/* Timestamp with fixed width */}
        <div className="text-sm text-gray-400 mr-2 w-20 flex-shrink-0">[{timestamp}]</div>

        {/* Message content with word wrap and no shrinking */}
        <div className="text-white break-words flex-grow">{message}</div>
      </div>
    )
  }

  type Message = {
    id: number
    user: string
    message: string
    timestamp: string
  }

  const mockMessages: Message[] = [
    { id: 1, user: 'System', message: 'Starting AWS ping test...', timestamp: '10:00 AM' },
    { id: 2, user: 'System', message: 'Pinging AWS server at ec2-1.compute-1.amazonaws.com...', timestamp: '10:01 AM' },
    { id: 3, user: 'System', message: 'Ping successful! Response from AWS server: 42ms', timestamp: '10:02 AM' },
    { id: 4, user: 'Admin', message: 'Checking AWS server response time for ec2-2.compute-1.amazonaws.com...', timestamp: '10:03 AM' },
    { id: 5, user: 'System', message: 'Ping test: ec2-2.compute-1.amazonaws.com, latency: 38ms', timestamp: '10:04 AM' },
    { id: 6, user: 'System', message: 'Pinging AWS S3 bucket endpoint: s3.amazonaws.com...', timestamp: '10:05 AM' },
    { id: 7, user: 'System', message: 'Ping successful! AWS S3 bucket response: 35ms', timestamp: '10:06 AM' },
    { id: 8, user: 'Admin', message: 'AWS servers are stable. Latency is acceptable.', timestamp: '10:07 AM' },
    { id: 9, user: 'System', message: 'Ping completed for all AWS services. No issues detected.', timestamp: '10:08 AM' }
  ];

  const MessageList = () => {
    const formatMessage = (message: any) => {
      const parts = message.split(' ')

      return parts.map((part, index) => {
        if (part.includes('ec2-') || part.includes('s3.amazonaws.com')) {
          return (
            <span key={index} className="text-orange-500 underline">
              {part}
            </span>
          )
        }
        else if (part.endsWith('ms')) {
          return <span key={index} className="text-blue-500">{part}</span>
        }
        else {
          return <span key={index}>{part} </span>
        }
      })
    }

    return (
      <>
        {mockMessages.map((msg) => (
          <Message
            key={msg.id}
            user={msg.user}
            timestamp={msg.timestamp}
            message={formatMessage(msg.message)}
          />
        ))}
      </>
    )
  }

  return (
    <div>
      <div className="w-full flex flex-row">
        <div className="w-1/2 h-[500px] m-3 flex flex-col rounded-md bg-zinc-900">
          <div className="m-5 text-xl">
            🏓Ping
          </div>

          <div className="flex flex-col h-full w-full text-center bg-zinc-800">
            <p className="inline-block m-auto rounded-xl my-2 px-1 bg-green-700 animate-pulse">New York</p>
            <div className="w-full h-1/2 animate-pulse p-5 bg-zinc-700"></div>
            <p className="inline-block m-auto rounded-xl my-2 px-1 bg-red-800 animate-pulse">Paris</p>
            <div className="w-full h-1/2 rounded-b-md animate-pulse p-5 bg-zinc-700"></div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col">

          <div className="h-1/2 m-3 flex rounded-md bg-zinc-900 box-border">
            <div className="flex-grow flex flex-col h-full">
              <div className="text-xl font-bold p-3">Log</div>
              <div className="log flex-grow bg-zinc-800 p-3 overflow-y-auto flex flex-col gap-2 box-border">
                <MessageList />
              </div>
            </div>
          </div>

          <div className="h-1/2 flex flex-row">
            <div className="w-1/2 m-3 flex flex-col rounded-md bg-zinc-900">
              <div className="mt-auto ml-5">
                <div className="text-5xl">0</div>
                <div className="flex flex-row mb-5 items-end">
                  <div className="text-xl font-bold">Request Count</div>
                  <div className="text-green-300 animate-pulse">&nbsp;&lt;500,000 quota limit</div>
                </div>
              </div>
            </div>

            <div className="w-1/2 m-3 flex flex-col rounded-md bg-zinc-900">
              <div className="mt-auto ml-5">
                <div className="text-5xl">0</div>
                <div className="flex flex-row mb-5 items-end">
                  <div className="text-xl font-bold">Latency</div>
                  <div className="text-green-300 animate-pulse">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/*
      <div className="w-full h-[500px] m-3 rounded-md bg-zinc-900">
        prompts - action - talk (PAT)
      </div>
      */}
    </div>
  )
}
