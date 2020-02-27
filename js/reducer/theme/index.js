/**
 * Created by Administrator on 2019/10/17.
 */
import  Types from '../../action/types'

const defaultState = {
    theme:"#008385"
};
export  default function onAction(state=defaultState,action) {
    switch (action.type){
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme:action.theme
            };
        default: return state;
    }
}