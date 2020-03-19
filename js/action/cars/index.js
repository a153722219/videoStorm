import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'
import {_handleRefreshData,_handleLoadMoreData,_handleLoadDetails} from '../ActionUtil'
//加载车辆详情
const PageSize = 10;
export function onLoadCarDetails(VehicleID,details,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        // const item = showItems[index];
        // const sourceItem = items[index];
        api.selVehicleDetails(userName,VehicleID).then(res=>{
            _handleLoadDetails(
                dispatch,
                VehicleID,
                details,
                Types.CAR_LOAD_DETAIL,
                res,
                callback
            );
           
        })
    }
}




//获取车辆数据action
export function onRefreshCars(items=[]) {
    const store = Globals.store;
    return dispatch=>{
        dispatch({type:Types.CAR_REFRESH});
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.selVehicleList(userName,1).then(res=>{
                 _handleRefreshData(
                     dispatch,
                     PageSize,
                     res,
                     Types.CAR_REFRESH_SUCCESS,
                     Types.CAR_REFRESH_FAIL,
                     items,
                     userName
                );

        })
    }
}
//加载更多车辆信息
export function onLoadMoreCars(newPageIndex,items=[],showItems=[]){
    const store = Globals.store;
    return dispatch=>{
        dispatch({type:Types.CAR_LOAD_MORE});
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.selVehicleList(userName,newPageIndex).then(res=>{
            _handleLoadMoreData(
                dispatch,
                PageSize,
                newPageIndex,
                res,
                Types.CAR_LOAD_MORE_SUCCESS,
                Types.CAR_LOAD_MORE_FAIL,
                items,
                showItems,
                userName
            );

        })
    }
}