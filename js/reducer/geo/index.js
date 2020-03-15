import  Types from '../../action/types'

const defaultState = {
    location:{}
};

export  default function onAction(state=defaultState,action) {
    switch (action.type){
        case Types.LOCATION_CHANGE:
            return {
                ...state,
                location:action.location
            };
        default: return state;
    }
}