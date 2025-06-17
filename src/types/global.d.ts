// declaration file

import type * as Types from './index'

// merge declarations into global namespace
declare global {
	type IUser = Types.User
	type IApiResponse<T> = Types.IApiResponse<T>
}
