import { NextRequest } from 'next/server'
import { wrapJSON } from '@/src/utils/utils'
import { insertCookie, generateSessionID, payloadSessionID } from '@/src/lib/cookie'
import { getSessionStore, getAuthSessionStore, getCRSFStore, getJWTStore, getUserStore } from '@/data/dataStores.js'

const guestStore = getSessionStore()
const authStore = getAuthSessionStore()
const userStore = getUserStore()
const crsfStore = getCRSFStore()

const userStoreLookUp = (email: string, userStore: any) => {
	return userStore[email]
}

export async function POST(req: NextRequest) {

	const user = userStoreLookUp("user@email.com", userStore)
	if (!user) {
		wrapJSON('', "invalid credentials")
	}

	wrapJSON(user.data, "matching user")
}

export async function GET(req: NextRequest) {
	const cookieStore = req.cookies

	const sessionID = cookieStore.get('sessionID')?.value

	if (!sessionID) {
		const newSessionID = generateSessionID()
		insertCookie(guestStore, newSessionID)

		const payload = payloadSessionID(newSessionID)
		return wrapJSON(payload, "GET request @ api/session - No Session ID recieved, SessionID set")
	}

	return wrapJSON('', 'session found')
}
