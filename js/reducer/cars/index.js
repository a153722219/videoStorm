import  Types from '../../action/types'

const defaultState = {
    PageIndex:1,
    isLoading:false,
    hideLoadingMore:true,
    showItems:[],//页面显示的数据
    details:{}//详情
};

export  default function onAction(state=defaultState,action) {
    const key = "items_"+action.Phone;
    switch (action.type){
        case Types.REDUX_INIT:
            const other = action.payload?action.payload.cars:defaultState
            return{
                ...other,
                PageIndex:1,     
                isLoading:false,
                hideLoadingMore:true,
                showItems:[]
            }
        case Types.CAR_REFRESH:
            return{
                ...state, 
                isLoading:true,
                PageIndex:1,
                hideLoadingMore:true
        }
        case Types.CAR_REFRESH_SUCCESS:
            return{
                ...state,
                [key]:action.items,
                showItems:action.showItems,
                PageIndex:1,
                isLoading:false,
                hideLoadingMore:true
            }
       case Types.CAR_REFRESH_FAIL:
            return{
                ...state,
                isLoading:false,
                hideLoadingMore:true
            }
        case Types.CAR_LOAD_MORE:
            return{
                ...state,
                hideLoadingMore:false
            }
        case Types.CAR_LOAD_MORE_SUCCESS:
            return{
                ...state,
                [key]:action.items,
                showItems:action.showItems,
                PageIndex:action.PageIndex,
                hideLoadingMore:true
            }
        case Types.CAR_LOAD_MORE_FAIL:
            return{
                ...state,
                hideLoadingMore:true
            }
        case Types.CAR_LOAD_DETAIL:
            return{
                ...state,
                details:action.details
            }
        default:return state;
    }

}
