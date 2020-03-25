import  Types from '../../action/types'

const defaultState = {
    isLoading:false,
    hideLoadingMore:true,
    PageIndex:1,
    showItems:[]
};

export  default function onAction(state=defaultState,action) {
    const key = "items_"+action.Phone;
    const key2 = "searchList_" + action.Phone
    switch (action.type){
        case Types.REDUX_INIT:
            const other = action.payload?action.payload.pods:defaultState
            return{
                ...other,
                PageIndex:1,     
                isLoading:false,
                hideLoadingMore:true,
                showItems:[]
            }
            case Types.POD_REFRESH:
                return{
                    ...state, 
                    isLoading:true,
                    PageIndex:1,
                    hideLoadingMore:true
            }
            case Types.POD_REFRESH_SUCCESS:
                return{
                    ...state,
                    [key]:action.items,
                    showItems:action.showItems,
                    PageIndex:1,
                    isLoading:false,
                    hideLoadingMore:true
                }
           case Types.POD_REFRESH_FAIL:
                return{
                    ...state,
                    isLoading:false,
                    hideLoadingMore:true
                }
            case Types.POD_LOAD_MORE:
                return{
                    ...state,
                    hideLoadingMore:false
                }
            case Types.POD_LOAD_MORE_SUCCESS:
                return{
                    ...state,
                    [key]:action.items,
                    showItems:action.showItems,
                    PageIndex:action.PageIndex,
                    hideLoadingMore:true
                }
            case Types.POD_LOAD_MORE_FAIL:
                return{
                     ...state,
                    hideLoadingMore:true
                }    
        default: return state;
       
    }

}