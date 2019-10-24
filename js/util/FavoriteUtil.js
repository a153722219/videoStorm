/**
 * Created by Administrator on 2019/10/23.
 */
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
export default class FavoriteUtil{
    static onFavorite(favoriteDao,item,isFavorite,flag){
        // debugger
        const key = flag===FLAG_STORAGE.flag_trending?item.fullName:item.id;
        console.log(favoriteDao,key,isFavorite)
        if(isFavorite){
            favoriteDao.saveFavoriteItem(key,JSON.stringify(item))
        }else{
            favoriteDao.removeFavoriteItem(key);
        }
    }
}