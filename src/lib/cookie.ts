// lib related to session

export const insertCookie = (cookieMap: any, sessionID: any) => {
	cookieMap.set(sessionID)
	return cookieMap.get(sessionID)
}

export const generateSessionID = () => {
	return crypto.randomUUID()
}

export const payloadSessionID = (sessionID: any) => {
	return {
		sessionID: sessionID,
		cookieOpts: {
			path: '/',
			sameSite: 'lax',
			httpOnly: true,
			secure: false,
			maxAge: 60
		}
	}
}
