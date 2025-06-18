import { NextResponse, NextRequest } from 'next/server'
import { fetchWrapper, unwrapJSON } from '@/src/utils/utils'

interface sessionData {
	sessionID: string,
	cookieOpts: {
		path: string,
		sameSite: string,
		httpOnly: boolean,
		secure: boolean,
		maxAge: number
	}
}

export const middleware = async (req: NextRequest) => {
	const res = NextResponse.next()

	const cookieStore = req.cookies
	const sessionID = cookieStore.get('sessionID')?.value

	if (!sessionID) {
		const data = await fetchWrapper<IApiResponse<sessionData>>('http://localhost:3000/api/session', {
			credentials: 'include'
		})
		const payload = unwrapJSON<sessionData>(data)
		res.cookies.set('sessionID', payload.sessionID, {
			path: payload.cookieOpts.path,
			sameSite: payload.cookieOpts.sameSite,
			httpOnly: payload.cookieOpts.httpOnly,
			secure: payload.cookieOpts.secure,
			maxAge: payload.cookieOpts.maxAge
		})
		console.log('sessionID set - middleware fetched from /api/session')
		return res
	}

	return res
}

export const config = {
	matcher: ['/', '/:path']
}

