import  Types from '../../action/types'

const defaultState = {
    isLoading:false,
    hideLoadingMore:true,
    details:[],//详情
    searchList:[]
};

export  default function onAction(state=defaultState,action) {
    const key = "items_"+action.Phone;
    switch (action.type){
        case Types.REDUX_INIT:
            const other = action.payload?action.payload.pods:defaultState
            return{
                ...other,
                isLoading:false,
                hideLoadingMore:true,
            }
        case Types.POD_LOAD:
            return {
                ...state,
                details:action.contents,
            }
        case Types.POD_SEARCH_LIST:
            return {
                ...state,
                searchList:action.searchList
            }
        default: return state;
       
    }

}