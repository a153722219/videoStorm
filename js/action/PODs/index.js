import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'
import {_handleRefreshData,_handleLoadMoreData} from '../ActionUtil'

// 请求回单列表
const PageSize = 10;
export function onRefreshPods(items=[],WaybillNO) {
    const store = Globals.store;
    return dispatch=>{
        dispatch({type:Types.POD_REFRESH});
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.PODList(userName,WaybillNO,1).then(res=>{
                 _handleRefreshData(
                     dispatch,
                     PageSize,
                     res,
                     Types.POD_REFRESH_SUCCESS,
                     Types.POD_REFRESH_FAIL,
                     items,
                     userName
                );

        })
    }
}

export function onLoadMorePods(newPageIndex,items=[],showItems=[],WaybillNO){
    const store = Globals.store;
    return dispatch=>{
        dispatch({type:Types.POD_LOAD_MORE});
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.PODList(userName,WaybillNO,newPageIndex).then(res=>{
            _handleLoadMoreData(
                dispatch,
                PageSize,
                newPageIndex,
                res,
                Types.POD_LOAD_MORE_SUCCESS,
                Types.POD_LOAD_MORE_FAIL,
                items,
                showItems,
                userName
            );

        })
    }
}