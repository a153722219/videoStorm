
import  Types from '../../action/types'
const defaultState = {
    PageIndex:1,
    isLoading:false,
    hideLoadingMore:true,
    showItems:[],//页面显示的数据
    details:{},//详情
    fullDetails:{},//完整的详情
    previews:{}//预览
};

export  default function onAction(state=defaultState,action) {
    var key = "items_"+action.Phone+"_"+action.statusFlag;
    switch (action.type){
        case Types.REDUX_INIT:
            const other = action.payload?action.payload.kahang:defaultState
            return{
                ...other,
                PageIndex:1,     
                isLoading:false,
                hideLoadingMore:true,
                showItems:[]
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
        case Types.KAHANG_LOAD_MORE:
            return{
                ...state,
                hideLoadingMore:false
            }
        case Types.KAHANG_LOAD_MORE_SUCCESS:
            return{
                ...state,
                [key]:action.items,
                showItems:action.showItems,
                PageIndex:action.PageIndex,
                hideLoadingMore:true
            }
        case Types.KAHANG_LOAD_MORE_FAIL:
            return{
                ...state,
                hideLoadingMore:true
            }
        case Types.KAHANG_LOAD_PREVIEW:
            return{
                ...state,
                previews:action.contents
            }
        case Types.KAHANG_LOAD_DETAIL:
                return{
                    ...state,
                    details:action.contents
            }
        case Types.KAHANG_LOAD_FULL_DETAIL:
                return{
                    ...state,
                    fullDetails:action.contents
            }

        case Types.KAHANG_START_TRAN:
            const sourceItemsKey = "items_"+action.Phone+"_0";
            const targetItemsKey = "items_"+action.Phone+"_1";
            return {
                ...state,
                [sourceItemsKey]:action.sourceItems,
                [targetItemsKey]:action.targetItems,
                showItems:action.showItems
            }
        case Types.KAHANG_LINE_ARRIVED:
            const sokey = "items_"+action.Phone+"_1";
            return {
                ...state,
                details:action.details,
                [sokey]:action.items,
                showItems:action.showItems
            }
        default:return state;
    }
}