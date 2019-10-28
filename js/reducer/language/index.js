/**
 * Created by Administrator on 2019/10/17.
 */
import  Types from '../../action/types'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
const defaultState = {
    languages:[],
    keys:[]
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
        case Types.LANGUAGE_LOAD_SUCCESS:
            if(FLAG_LANGUAGE.flag_key===action.flag){
                return {
                    ...state,
                    keys:action.languages
                }
            }else{
                return {
                    ...state,
                    languages:action.languages
                }
            }

        default: return state;
    }
}