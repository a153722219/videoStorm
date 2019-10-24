/**
 * Created by Administrator on 2019/10/17.
 */
import  Types from '../../action/types'

const defaultState = {

};

/**
 * popular:{
 *      java:{items:[],isLoading:false},
 *      ios:{items:[],isLoading:false}
 * }
 * @param state
 * @param action
 * @returns {*}
 */
export  default function onAction(state=defaultState,action) {
   
    switch (action.type){
        case Types.POPULAR_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items:action.items,//原始数据
                    projectModel:action.projectModel,
                    hideLoadingMore:false,
                    isLoading:false,
                    pageIndex:action.pageIndex
                }
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:true,
                    hideLoadingMore:true
                }
            };
        case Types.POPULAR_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:false
                }
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModel:action.projectModel,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex
                }
            };
        case Types.POPULAR_LOAD_MORE_FAIL:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    hideLoadingMore:true,
                    pageIndex:action.pageIndex
                }
            };
        case Types.FLUSH_POPULAR_FAVORITE://刷新收藏状态
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModel:action.projectModel
                }
            };
        default: return state;
    }
}