import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'
import {_handleRefreshData,_handleLoadMoreData,_handleLoadDetails} from '../ActionUtil'
const PageSize = 5;
//刷新卡航
export function onRefreshKaHang(statusFlag,items=[]){
    const store = Globals.store;
    return dispatch=>{
        dispatch({
            type:Types.KAHANG_REFRESH
        })
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.selTaskList(userName,1,PageSize,statusFlag).then(res=>{
            _handleRefreshData(
                dispatch,
                PageSize,
                res,
                Types.KAHANG_REFRESH_SUCCESS,
                Types.KAHANG_REFRESH_FAIL,
                items,
                userName,
                statusFlag
           );
        })
    }

}

//加载更多卡航
export function onLoadMoreKaHang(statusFlag,newPageIndex,items=[],showItems=[]){
    const store = Globals.store;
    return dispatch=>{
        dispatch({type:Types.KAHANG_LOAD_MORE});
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.selTaskList(userName,newPageIndex,PageSize,statusFlag).then(res=>{
            _handleLoadMoreData(
                dispatch,
                PageSize,
                newPageIndex,
                res,
                Types.KAHANG_LOAD_MORE_SUCCESS,
                Types.KAHANG_LOAD_MORE_FAIL,
                items,
                showItems,
                userName,
                statusFlag
            );
            
        });

    }

}
//加载路线预览
export function onLoadKaHangPreView(PlanNO,previews,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        // const item = showItems[index];
        // const sourceItem = items[index];
        api.selTransportScheduleLine(userName,PlanNO).then(res=>{
            _handleLoadDetails(
                dispatch,
                PlanNO,
                previews,
                Types.KAHANG_LOAD_PREVIEW,
                res,
                callback
            );
        })
    }
}
//加载卡航运输中详情 或者运输详情

export function onLoadKaHangDetail(PlanNO,details,callback,type=0){
    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        const dptype = type==0?Types.KAHANG_LOAD_DETAIL:Types.KAHANG_LOAD_FULL_DETAIL
        // const item = showItems[index];
        // const sourceItem = items[index];
        const action = type==0?api.selRunningTask:api.selTransportDetails;
        action(userName,PlanNO).then(res=>{
            _handleLoadDetails(
                dispatch,
                PlanNO,
                details,
                dptype,
                res,
                callback
            );
        });
    }
}

export function onStartTranPort(PlanNo,Lat,Lon,Address,sourceItems,showItems,targetItems,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.startTransportPlan(userName,PlanNo,Lat,Lon,Address)
        .then(httpResult=>{
            httpResult.code=600;
            if(httpResult.code<0){
                //net error

            }else if(httpResult.code==600){
                const index = sourceItems.findIndex(i=>i.PlanNO==PlanNo)
                const showIndex = showItems.findIndex(i=>i.PlanNO==PlanNo)
                console.log(index)
                if(index!=-1 && showIndex!=-1){
                    const item = sourceItems.splice(index,1);
                    showItems.splice(showIndex,1);
                    // item.
                    targetItems.unshift(item[0]);
                    dispatch({
                        type:Types.KAHANG_START_TRAN,
                        sourceItems,
                        targetItems,
                        showItems,
                        Phone:userName
                    });

                    callback({
                        code:httpResult.code,
                        data:httpResult.data
                    })
                }

               
                
            }else{
                callback({
                    code:httpResult.code,
                    data:httpResult.msg
                })
            }
        })
    }
}