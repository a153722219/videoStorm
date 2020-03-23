import  Types from '../../action/types'

const defaultState = {
    isLoading:false,
    hideLoadingMore:true,
    details:[],
    searchLists:[]
};

export  default function onAction(state=defaultState,action) {
    const key = "details_"+ action.phone;
    const key2 = "searchList_" + action.phone
    switch (action.type){
        case Types.REDUX_INIT:
            const other = action.payload?action.payload.pods:defaultState
            return{
                ...other,
                isLoading:false,
                hideLoadingMore:true
            }
        case Types.POD_LOAD:
            return {
                ...state,
                [key]:action.contents
            }
        case Types.POD_SEARCH_LIST:
            return {
                ...state,
                [key2]:action.searchList
            }
        default: return state;
       
    }

}