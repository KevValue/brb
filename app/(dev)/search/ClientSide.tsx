'use client'

import { useState, useEffect, useMemo } from 'react'

const mockData = [
  "chicago",
  "chinatown",
  "cheerios",
  "cheese",
  "cheddar",
  "chopper"
]

type varvoid = (...args: any[]) => void // type alias

const debounce = <T extends varvoid>(fn: T, delay: number) => { // generic type parameter with a constraint
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => { // utility type
    clearTimeout(timeoutId) // on every keystroke - cancel timeoutId and set new timeoutId - deliver final action on pause
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export const ClientSide = () => {
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showDropDown, setShowDropDown] = useState<boolean>(false)

  const sanitizeInput = (input: string) => {
    return input.trim()
  }

  // filterSuggestions only when debounce clears the final timer id or user pauses typing
  const filterSuggestions = (query: string) => {
    const cleanQuery = query.toLowerCase()
    // simple filter, swap with an efficient trie data structure
    const matches = mockData.filter((item) => item.toLowerCase().startsWith(cleanQuery))

    setSuggestions(matches)
    setShowDropDown(true)
    setIsLoading(false)
  }
  const debounceFilter = useMemo(() => debounce(filterSuggestions, 300), [])

  // wide type FormEvent, narrow type ChangeEvent
  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInput(value)

    const cleanValue = value.trim()
    if (cleanValue) {
      debounceFilter(cleanValue)
    } else {
      setSuggestions([])
      setShowDropDown(false)
    }
  }

  // useEffect area
  useEffect(() => {
    const cleanInput = sanitizeInput(input)
    if (!cleanInput) {
      setSuggestions([])
      setShowDropDown(false)
      return
    }

    setIsLoading(true) // turn on loading animation to show reponsiveness to user
    debounceFilter(cleanInput)
  }, [input])

  // render area
  const renderSuggestions = (suggestions: string[]) => {
    return suggestions.map((item, idx) => <div key={idx}>{item}</div>)
  }

  // logging area

  return (<div>
    <input name="input" value={input} onChange={onInputChange} placeholder="Type to search items..." />
    {showDropDown
      && suggestions.length > 0
      && (<div>{renderSuggestions(suggestions)}</div>)
    }
  </div>)
}

export default ClientSide
