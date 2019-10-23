/**
 * Created by Administrator on 2019/10/23.
 */
export default class Utils{
    /**
     * 检查item是否被收藏
     */

    static checkFavorite(item,items=[]){
        if(!items) return false;
        for(let i=0,len=items.length;i<len;i++){
            let id = item.id?item.id : item.fullName;
            if(id.toString()===items[i]){
                return true
            }
        }
        return false
    }

}