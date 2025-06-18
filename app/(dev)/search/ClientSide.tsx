'use client'

import { useState, useRef } from 'react'

const mockData = [
  "chicago",
  "chinatown",
  "cheerios",
  "cheese",
  "cheddar",
  "chopper"
]

const debounce = () => { }

export const ClientSide = () => {
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showDropDown, setShowDropDown] = useState<boolean>(false)

  // wide type FormEvent, narrow type ChangeEvent
  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const renderSuggestions = (suggestions: string[]) => {
    return suggestions.map((item, idx) => <div key={idx}>{item}</div>)
  }

  return (<div>
    <input name="input" value={input} onChange={onInputChange} placeholder="Type to search items..." />
    {showDropDown
      && suggestions.length > 0
      && (<div>{renderSuggestions(suggestions)}</div>)
    }
  </div>)
}

export default ClientSide
