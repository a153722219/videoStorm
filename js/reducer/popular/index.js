/**
 * Created by Administrator on 2019/10/17.
 */
import  Types from '../../action/types'

const defaultState = {
    theme:"blue"
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
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    items:action.items,
                    isLoading:false
                }
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading:true
                }
            };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading:false
                }
            };
        default: return state;
    }
}