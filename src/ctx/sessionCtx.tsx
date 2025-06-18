'use client'

import { useState, useEffect, createContext, useContext } from 'react'

interface SessionContextType {
	sessionID: string | undefined,
	sessionOK: boolean,
	setSessionOK: React.Dispatch<React.SetStateAction<boolean>>
}

interface SessionCtxFCProps {
	children?: React.ReactNode,
	browserCookie: string | undefined
	initSession: boolean
}

export const SessionCtx = createContext<SessionContextType | any>({
	sessionID: undefined,
	sessionOK: false,
	setSessionOK: () => { }
})

export const SessionCtxFC: React.FC<SessionCtxFCProps> = ({ children, browserCookie = false, initSession = false }) => {
	const [sessionOK, setSessionOK] = useState(initSession)
	const [sessionID] = useState(browserCookie)

	useEffect(() => {
	}, [])

	return (
		<SessionCtx.Provider value={{ sessionID, sessionOK, setSessionOK }}>
			{children}
		</SessionCtx.Provider >
	)
}

export const useSessionCtx = (): SessionContextType => {
	const context = useContext(SessionCtx)
	if (!context) throw new Error('context not provided')
	return context
}
