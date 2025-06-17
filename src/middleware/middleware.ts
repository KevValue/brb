import { NextResponse, NextRequest } from 'next/server'

export const middleware = async (req: NextRequest) => {
	const res = NextResponse.next()

	return res
}

export default middleware
