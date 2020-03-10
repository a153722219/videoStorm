
import  Types from '../../action/types'
const defaultState = {
    currentUserKey:""
};
export  default function onAction(state=defaultState,action) {
    switch (action.type){
        case Types.USER_LOGIN:
            const key = "user_"+action.user.Phone
            return {
                ...state,
                [key]:action.user,
                currentUserKey:key
            };
        case Types.USER_LOGOUT:
            return {
                ...state,
                currentUserKey:null
            };
        default: return state;
    }
}