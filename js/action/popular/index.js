/**
 * Created by Administrator on 2019/10/17.
 */
import Types from "../types";
import DataStorage from "../../expand/dao/DataStorage"
//获取最热数据action
export function onLoadPopularData(storeName,url) {

    return dispatch=>{
        dispatch({type:Types.POPULAR_REFRESH,storeName});
        let dataStore = new DataStorage();
        dataStore.fetchData(url).then(data=>{
            handleData(dispatch,storeName,data);
        }).catch(err=>{
            console.log(err);
            dispatch({type:Types.LOAD_POPULAR_FAIL,storeName,error:err});
        })
    }
}
function handleData(dispatch,storeName,data) {

    dispatch({
        type:Types.LOAD_POPULAR_SUCCESS,
        items:data && data.data && data.data.items, //改回items
        storeName
    });
}
