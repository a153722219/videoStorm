
import  Types from '../../action/types'
const defaultState = {
    PageIndex:1,
    isLoading:false,
    hideLoadingMore:true,
    showItems:[],//页面显示的数据
    details:{}//详情
};

export  default function onAction(state=defaultState,action) {
    const key = "items_"+action.Phone+"_"+action.statusFlag;
    switch (action.type){
        case Types.REDUX_INIT:
            const other = action.payload?action.payload.kahang:defaultState
            return{
                ...other,
                PageIndex:1,     
                isLoading:false,
                hideLoadingMore:true,
                // showItems:[]
            }
        case Types.KAHANG_REFRESH:
            return{
                ...state, 
                isLoading:true,
                PageIndex:1,
                hideLoadingMore:true,
                showItems:[]
        }
        case Types.KAHANG_REFRESH_SUCCESS:
            return{
                ...state,
                [key]:action.items,
                showItems:action.showItems,
                PageIndex:1,
                isLoading:false,
                hideLoadingMore:true
            }
        case Types.KAHANG_REFRESH_FAIL:
            return{
                ...state,
                isLoading:false,
                hideLoadingMore:true
            }
        default:return state;
    }
}