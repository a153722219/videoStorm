/**
 * Created by Administrator on 2019/10/17.
 */
import Types from "../types";
import DataStorage from "../../expand/dao/DataStorage"
import {handleData,_projectModels} from '../ActionUtil'
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
//获取最热数据action
export function onRefreshTrending(storeName,url,pageSize,favoriteDao) {

    return dispatch=>{
        dispatch({type:Types.TRENDING_REFRESH,storeName});
        let dataStore = new DataStorage();
        dataStore.fetchData(url,FLAG_STORAGE.flag_trending).then(data=>{
            handleData(Types.TRENDING_REFRESH_SUCCESS,dispatch,storeName,data,pageSize,favoriteDao);
        }).catch(err=>{
            console.log(err);
            dispatch({type:Types.TRENDING_REFRESH_FAIL,storeName,error:err});
        })
    }
}
export function onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray=[],favoriteDao,callBack) {
    console.log(pageIndex)
    return dispatch=>{
        setTimeout(()=>{//模拟网络请求
            if((pageIndex-1)*pageSize>=dataArray.length){ //已经加载完全部数据
                if(typeof callBack === 'function'){
                    callBack("no More")
                }

                dispatch({
                    type:Types.TRENDING_LOAD_MORE_FAIL,
                    error:"no More",
                    storeName,
                    pageIndex:--pageIndex,
                    // projectModel:dataArray
                });

            }else{
                //本次可载入的最大数据量
                let max = pageSize * pageIndex > dataArray.length?dataArray.length:pageSize * pageIndex;
                 // console.log(storeName,pageIndex,pageSize,dataArray,callBack)
                _projectModels(dataArray.slice(0,max),favoriteDao,projectModel=>{

                    dispatch({
                        type:Types.TRENDING_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModel
                    });
                })
            }

        },500)
    }
}

export function onFlushTrendingFavorite(storeName,pageIndex,pageSize,dataArray=[],favoriteDao) {
    return dispatch=>{

        let max = pageSize * pageIndex > dataArray.length?dataArray.length:pageSize * pageIndex;
        // console.log(storeName,pageIndex,pageSize,dataArray,callBack)
        _projectModels(dataArray.slice(0,max),favoriteDao,projectModel=>{

            dispatch({
                type:Types.FLUSH_TRENDING_FAVORITE,
                storeName,
                pageIndex,
                projectModel
            });
        });
    }

}


