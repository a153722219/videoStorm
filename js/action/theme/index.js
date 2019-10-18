/**
 * Created by Administrator on 2019/10/17.
 */
import Types from "../types"
export function onThemeChange(theme) {
    return {type:Types.THEME_CHANGE,theme:theme}
}
