/**
 * Created by Administrator on 2019/10/17.
 */
import Types from "../types";
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import LanguageDao from '../../expand/dao/LanguageDao'


//加载标签
export function onLoadLanguage(flagKey) {

    return async dispatch=>{

        try {
            let languages = await new LanguageDao(flagKey).fetch()
            dispatch({
                type:Types.LANGUAGE_LOAD_SUCCESS,
                languages,
                flag:flagKey
            })
        }catch(e){
            console.log(e)
        }

    }
}

