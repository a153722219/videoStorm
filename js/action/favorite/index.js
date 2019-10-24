/**
 * Created by Administrator on 2019/10/17.
 */
import Types from "../types";
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import DataStorage from "../../expand/dao/DataStorage"
import {handleData,_projectModels} from '../ActionUtil'
import FavoriteDao from '../../expand/dao/FavoriteDao'
import  ProjectModel from '../../mo/ProjectModel'
//获取收藏数据
export function onLoadFavoriteData(flag,isShowLoading) {

    return dispatch=>{
        dispatch({type:Types.FAVORITE_LOAD_DATA,storeName:flag});
        // let dataStore = new DataStorage();
        new FavoriteDao(flag).getAllItems().then(items=>{
            let resultData=[];
            for(let i=0,len=items.length;i<len;i++){
                resultData.push(new ProjectModel(items[i],true))
            }
            dispatch({
                type:Types.FAVORITE_LOAD_SUCCESS,
                projectModels:resultData,
                storeName:flag,
                isLoading:isShowLoading
            })
        }).catch(e=>{
            console.log(e)
            dispatch({
                type:Types.FAVORITE_LOAD_FAIL,
                error:e,
                storeName:flag
            })
        })
    }
}