import 'dotenv/config'

// data objects, kv stores

const crsfStore = new Map()
const jwtStore = new Map()
const sessionStore = new Map()
const authSessionStore = new Map()

const userStore = {
	"user@email.com": {
		uuid: 1,
		data: {
			role: "admin",
			preferences: {
				theme: "dark"
			}
		}
	}
}

const connectToStorePlaceHolder = () => { }

// stage params are undefined for local memory store, prod for remote stores, and A/B testing
export const getCRSFStore = (stage = process.env.CRSF_DEV) => {
	const envStage = stage.toLowerCase()

	const endpoint = process.env.CRSF_STORE_ENDPOINT

	if (envStage === "prod") {
		if (!endpoint) throw new Error('no crsf endpoint defined in environmental variables')
		// run adapter to connect to endpoint
		return connectToStorePlaceHolder(endpoint)
	}

	// return default in-memory store
	return crsfStore
}

export const getJWTStore = (stage = process.env.JWT_DEV) => {
	const envStage = stage.toLowerCase()

	const endpoint = process.env.JWT_STORE_ENDPOINT

	if (envStage === "prod") {
		if (!endpoint) throw new Error('no jwt endpoint defined in environmental variables')
		// run adapter to connect to endpoint
		return connectToStorePlaceHolder(endpoint)
	}

	// return default in-memory store
	return jwtStore
}


export const getAuthSessionStore = (stage = process.env.AUTH_SESSION_DEV) => {
	const envStage = stage.toLowerCase()

	const endpoint = process.env.AUTH_SESSION_STORE_ENDPOINT

	if (envStage === "prod") {
		if (!endpoint) throw new Error('no auth session endpoint defined in environmental variables')
		// run adapter to connect to endpoint
		return connectToStorePlaceHolder(endpoint)
	}

	// return default in-memory store
	return sessionStore
}

export const getSessionStore = (stage = process.env.SESSION_DEV) => {
	const envStage = stage.toLowerCase()

	const endpoint = process.env.SESSION_STORE_ENDPOINT

	if (envStage === "prod") {
		if (!endpoint) throw new Error('no session endpoint defined in environmental variables')
		// run adapter to connect to endpoint
		return connectToStorePlaceHolder(endpoint)
	}

	// return default in-memory store
	return sessionStore
}

export const getUserStore = (stage = process.env.DB_DEV) => {
	const envStage = stage.toLowerCase()

	const endpoint = process.env.SESSION_STORE_ENDPOINT

	if (envStage === "prod") {
		if (!endpoint) throw new Error('no user store endpoint defined in environmental variables')
		// run adapter to connect to endpoint
		return connectToStorePlaceHolder(endpoint)
	}

	// return default in-memory store
	return userStore
}
