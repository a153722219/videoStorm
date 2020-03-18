import  Types from '../../action/types'

const defaultState = {
    isLoading:false,
    hideLoadingMore:true,
    details:{}//详情
};

export  default function onAction(state=defaultState,action) {
    const key = "items_"+action.Phone;
    switch (action.type){
        case Types.REDUX_INIT:
            const other = action.payload?action.payload.cars:defaultState
            return{
                ...other,
                isLoading:false,
                hideLoadingMore:true,
            }
        case Types.POD_LOAD:
            return {
                ...state,
                details
            }
        default: return state;
    }

}