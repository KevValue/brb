'use client'
import { useContext } from 'react'
import { SessionCtx } from './sessionCtx'

export const useSessionCtx = () => useContext(SessionCtx)
