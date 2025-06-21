'use client'

import { useState } from 'react'

export default function ClientSide() {
  // dashboard look
  // first feature is a client unique UUID - that pings next api route - UUID is connected to a bucket that rate limits requests

  let endpoint: string

  const Message = () => {
    return (
      <div className="flex flex-row">
        <div className="">[TimeStamp]:</div>
        <div className="ml-2 flex-grow rounded-2xl bg-zinc-500 animate-pulse"></div>
      </div>
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

          <div className="h-1/2 m-3 flex rounded-md bg-zinc-900 border-box">
            <div className="flex-grow flex flex-col">
              <div className="text-xl font-bold p-3">Log</div>
              <div className="flex-grow bg-zinc-800 p-3 overflow-y-auto flex flex-col gap-2">
                <Message />
                <Message />
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

      <div className="w-full h-[500px] m-3 rounded-md bg-zinc-900">
        prompts - action - talk (PAT)
      </div>
    </div>
  )
}
