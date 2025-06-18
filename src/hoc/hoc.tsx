import { isAuthed } from '@/src/lib/lib'
import { useState, useEffect, ComponentType } from 'react'
import { useSessionCtx } from '@/src/ctx/sessionCtx'

export const withAuth = <P extends object>(
	Component: ComponentType<P>
): ComponentType<P> => {
	const WrappedComponent: React.FC<P> = (props: P): React.ReactNode | null => {
		//const [auth, setAuth] = useState<boolean>(false)
		//
		//useEffect(() => {
		//	const okAuth = isAuthed() as boolean
		//	setAuth((prev) => (okAuth ? true : prev))
		//}, [])
		//
		//return auth ? (<Component {...props} />) : null

		const { sessionOK } = useSessionCtx()
		return sessionOK ? (<Component {...props} />) : null
	}

	return WrappedComponent
}
