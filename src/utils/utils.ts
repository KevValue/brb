// all utils delimited by comments for purpose of development speed.
// Faster navigation, central documentation, uniformity and consistency.

// network
export async function fetchWrapper<T>(
	url: string,
	opts: RequestInit = {}
): Promise<IApiResponse<T>> {
	const res = await fetch(url, opts)

	if (!res.ok) {
		throw new Error(`Http error. Status: ${res.status}`)
	}

	const data: IApiResponse<T> = await res.json()

	console.log(data.message)

	return data
}

// standard

// func<T extends ConstraintType>():T{} generic function
export function buildObject<T extends Record<string, string>>(...params: string[]): T {
	const filteredMatrix = Object.entries(params).filter(([_, value]) => value !== null && value !== undefined && value !== '')
	const res = Object.fromEntries(filteredMatrix) as T // type assertion
	return res
}


