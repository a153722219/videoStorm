
import  Types from '../../action/types'
const defaultState = {
    haveNet:true
};
export  default function onAction(state=defaultState,action) {
    switch (action.type){
        case Types.NETWORK_CHANGE:
            return {
                ...state,
                haveNet:action.haveNet
            };
        default: return state;
    }
}