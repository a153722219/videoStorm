/**
 * Created by Administrator on 2019/10/17.
 */
import Types from "../types";
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import DataStorage from "../../expand/dao/DataStorage"
import {handleData,_projectModels} from '../ActionUtil'

//获取最热数据action
export function onRefreshPopular(storeName,url,pageSize,favoriteDao) {

    return dispatch=>{
        dispatch({type:Types.POPULAR_REFRESH,storeName});
        let dataStore = new DataStorage();
        dataStore.fetchData(url,FLAG_STORAGE.flag_popular).then(data=>{
            handleData(Types.POPULAR_REFRESH_SUCCESS,dispatch,storeName,data,pageSize,favoriteDao);
        }).catch(err=>{
            console.log(err);
            dispatch({type:Types.POPULAR_REFRESH_FAIL,storeName,error:err});
        })
    }
}
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray=[],favoriteDao,callBack) {

    return dispatch=>{
        setTimeout(()=>{//模拟网络请求
            if((pageIndex-1)*pageSize>=dataArray.length){ //已经加载完全部数据
                if(typeof callBack === 'function'){
                    callBack("no More")
                }

                dispatch({
                    type:Types.POPULAR_LOAD_MORE_FAIL,
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
                        type:Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModel
                    });
                })


            }

        },500)
    }
}

export function onFlushPopularFavorite(storeName,pageIndex,pageSize,dataArray=[],favoriteDao) {
    return dispatch=>{

        let max = pageSize * pageIndex > dataArray.length?dataArray.length:pageSize * pageIndex;
        // console.log(storeName,pageIndex,pageSize,dataArray,callBack)
        _projectModels(dataArray.slice(0,max),favoriteDao,projectModel=>{

            dispatch({
                type:Types.FLUSH_POPULAR_FAVORITE,
                storeName,
                pageIndex,
                projectModel
            });
        });
    }

}


