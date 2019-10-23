/**
 * Created by Administrator on 2019/10/23.
 */
const KEY_PREFIX = 'favorite_';
import {AsyncStorage} from 'react-native'
export default  class FavoriteDao{
    constructor(flag){
        this.favoriteKey = KEY_PREFIX+flag

    }

    saveFavoriteItem(key,vaule,callback) {
        console.log(key,vaule)
        AsyncStorage.setItem(key.toString(),vaule,(error,result)=>{
            if (!error) {//更新Favorite的key
                this.updateFavoriteKeys(key.toString(),true);
            }
        }).catch(e=>{
            console.log(e)
        });
    }

    /**
     * 更新Favorite key集合
     * @param isAdd true 添加,false 删除
     * **/
    updateFavoriteKeys(key,isAdd){
        AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
            if (!error) {
                var favoriteKeys=[];
                if (result) {
                    favoriteKeys=JSON.parse(result);
                }
                var index=favoriteKeys.indexOf(key.toString());
                if(isAdd){
                    if (index===-1)favoriteKeys.push(key.toString());
                }else {
                    if (index!==-1)favoriteKeys.splice(index, 1);
                }
                AsyncStorage.setItem(this.favoriteKey,JSON.stringify(favoriteKeys));
            }
        });
    }

    getFavoriteKeys(){//获取收藏的Respository对应的key
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }else {
                    reject(error);
                }
            });
        });
    }

    /*
    * 取消收藏
    * */

    removeFavoriteItem(key){
        AsyncStorage.removeItem(key.toString(),(err,result)=>{
            if(!err){
                this.updateFavoriteKeys(key.toString(),false)
            }
        })
    }

    /**
     * 获取所有已收藏的项目
     */
    getAllItems(){
        return new Promise((resolve,reject)=>{
            this.getFavoriteKeys().then((keys)=>{
                let items = [];
                if(keys){
                    AsyncStorage.multiGet(keys, (err, stores) => {
                        try {
                            stores.map((result, i, store) => {
                                // get at each store's key/value so you can work with it
                                let key = store[i][0];
                                let value = store[i][1];
                                if (value)items.push(JSON.parse(value));
                            });
                            console.log(items)
                            resolve(items);
                        } catch (e) {
                            reject(e);
                        }
                    });
                }else{
                    resolve(items)
                }

            }).catch(e=>{
                reject(e)
            })
        })
    }



}
