/**
 * Created by Administrator on 2019/10/21.
 */
import  { AsyncStorage } from "react-native"
import Trending from 'GitHubTrending'
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
export default  class  DataStorage{




    /**保存数据**/
    saveData(url,data,callback){
        if(!data || !url) return;
        AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data),callback))
    }

    _wrapData(data){
        return {data,timestamp:new Date().getTime()}
    }

    //获取本地数据
    fetchLocalData (url){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                        console.error(e)
                    }
                } else {
                    reject(error)
                    console.error(error)
                }
            })
        })
    }

    // 获取网络数据

    fetchNetData(url,flag) {
        return new Promise((resolve, reject) => {
            if(flag!==FLAG_STORAGE.flag_trending){
                fetch(url)
                .then((response) => {
                    if (response.ok) {
                        let res = response.json();
                        console.log("------请求url完成:"+url);
                        console.log("------请求结果:",res);
                        console.log(res)
                        return res
                    }
                    throw new Error('Network response was not ok')
                })
                .then((responseData) => {
                    this.saveData(url, responseData)
                    resolve(responseData)
                })
                .catch((error) => {
                    reject(error)
                })
            }else{
                console.log("------请求url:"+url);
               new Trending().fetchTrending(url).then(items=>{
                   if(!items){
                       throw new Error("responseData is null");
                   }

                   console.log("------请求结果:",items);
                   this.saveData(url,items);
                   resolve(items)
               }).catch(err=>{
                   reject(err);
               })
            }
           
        })
    }

    /*
    实现缓存策略

    按照a策略：优先从本地获取数据，如果数据过时或不存在则从服务器获取数据，

    * 优先获取本地数据
    * 如果数据存在且在有效期内，将数据返回
    * 否则获取网络数据
    * */

    fetchData(url,flag){
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStorage.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData)
                } else {
                    this.fetchNetData(url,flag)
                        .then((data) => {
                            resolve(this._wrapData(data))
                        })
                        .catch((error) => {
                            reject(error)
                        })
                }
            })
                .catch((error) => {
                    this.fetchNetData(url,flag)
                        .then((data) => {
                            resolve(this._wrapData(data))
                        })
                        .catch((error => {
                            reject(error)
                        }))
                })
        })
    }

    /*
     检查timestamp是否在有效期内
     true 不需要更新,false 需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timestamp)
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            return false
        }
        if (currentDate.getDate() !== targetDate.getDate()) {
            return false
        }
        if (currentDate.getHours() - targetDate.getDate() > 4) {
            return false // 有效期4个小时
        }
        return true
    }



}