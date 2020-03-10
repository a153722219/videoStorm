
import Types from "../types"
export function onUserLogin(user) {
    return {type:Types.USER_LOGIN,user:user}
}

export function onUserLogout() {
    return {type:Types.USER_LOGOUT}
}
