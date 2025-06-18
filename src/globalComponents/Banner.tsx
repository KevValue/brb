'use client'

import { useSessionCtx } from '@/src/ctx/sessionCtx'

export const Banner = () => {
	const { sessionOK, sessionID } = useSessionCtx()
	console.log(sessionID, sessionOK)

	if (sessionOK) {
		return (
			<div className="w-full text-center py-5">logged in with authed cookie {sessionID}</div>
		)
	}

	if (sessionID) {
		return (
			<div className="w-full text-center py-5">supplied with guest cookie {sessionID}</div>
		)
	}

	return (
		<div className="w-full text-center py-5">not logged in</div>
	)
}

export default Banner
