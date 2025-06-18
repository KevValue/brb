'use client'

import { useSessionCtx } from '@/src/ctx/useCtx'
import Link from 'next/link'

export const Nav: React.FC = () => {
	const { sessionOK } = useSessionCtx()

	return (
		<div className="px-5 flex justify-center items-center gap-12 text-xl bg-zinc-900">
			<Link href="/" className="p-2 hover:text-blue-500">/</Link>
			<Link href="/ping" className="p-2 hover:text-blue-500">Ping</Link>
			{!sessionOK && (<Link href="login" className="p-2 hover:text-blue-500" prefetch={true}>Login</Link>)}
		</div >
	)
}

export default Nav
