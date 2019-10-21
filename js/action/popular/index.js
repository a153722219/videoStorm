/**
 * Created by Administrator on 2019/10/17.
 */
import Types from "../types";
import DataStorage from "../../expand/dao/DataStorage"
//获取最热数据action
export function onRefreshPopular(storeName,url,pageSize) {

    return dispatch=>{
        dispatch({type:Types.POPULAR_REFRESH,storeName});
        let dataStore = new DataStorage();
        dataStore.fetchData(url).then(data=>{
            handleData(dispatch,storeName,data,pageSize);
        }).catch(err=>{
            console.log(err);
            dispatch({type:Types.POPULAR_REFRESH_FAIL,storeName,error:err});
        })
    }
}
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray=[],callBack) {
    console.log(pageIndex)
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
                    projectModel:dataArray
                });

            }else{
                //本次可载入的最大数据量
                let max = pageSize * pageIndex > dataArray.length?dataArray.length:pageSize * pageIndex;
                 // console.log(storeName,pageIndex,pageSize,dataArray,callBack)
                dispatch({
                    type:Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModel:dataArray.slice(0,max)
                });
            }

        },500)
    }
}


function handleData(dispatch,storeName,data,pageSize) {
    let fixItems = [];
    if(data && data.data && data.data.items){
        fixItems = data.data.items;
    }
    dispatch({
        type:Types.POPULAR_REFRESH_SUCCESS,
        items:fixItems, //改回items
        storeName,
        projectModel:pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),//第一次加载的数据
        pageIndex:1
    });
}
