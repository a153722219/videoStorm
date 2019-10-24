/**
 * Created by Administrator on 2019/10/17.
 */
import  Types from '../../action/types'

const defaultState = {

};

/**
 * favorite:{
 *      java:{projectModels:[],isLoading:false},
 *      ios:{projectModels:[],isLoading:false}
 * }
 * @param state
 * @param action
 * @returns {*}
 */
export  default function onAction(state=defaultState,action) {

    switch (action.type){
        case Types.FAVORITE_LOAD_DATA:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:action.isLoading,

                }
            };
        case Types.FAVORITE_LOAD_SUCCESS:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:false,
                    projectModels:action.projectModels
                }
            };
        case Types.FAVORITE_LOAD_FAIL:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:false
                }
            };

        default: return state;
    }
}