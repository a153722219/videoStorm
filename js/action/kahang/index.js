import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'
import {_handleRefreshData,_handleLoadMoreData,_handleLoadDetails,_handleLineAction,_handlePlanAction } from '../ActionUtil'
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
            _handlePlanAction(
                dispatch,
                httpResult,
                PlanNo,
                sourceItems,
                targetItems,
                showItems,
                Types.KAHANG_START_TRAN,
                userName,
                "",
                callback
            )
        })
    }
}
//确认到达
export function onArrived(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.arrive(userName,PlanNo,LineID,Lat,Lon,Address)
        .then(httpResult=>{
            _handleLineAction(
                dispatch,
                httpResult,
                details,
                PlanNo,
                LineID,
                showItems,
                items,
                Types.KAHANG_LINE_ARRIVED,
                userName,
                4,
                5,
                callback
            )
        })

    }
}

//去装货
export function onGoLoad(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.arrive(userName,PlanNo,LineID,Lat,Lon,Address)
        .then(httpResult=>{
            _handleLineAction(
                dispatch,
                httpResult,
                details,
                PlanNo,
                LineID,
                showItems,
                items,
                Types.KAHANG_LINE_GOLOAD,
                userName,
                2,
                2,
                callback
            )
        })
    }

}

//确认离开
export function onLeave(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback){

    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.confirmLeave(userName,PlanNo,LineID,Lat,Lon,Address)
        .then(httpResult=>{
            _handleLineAction(
                dispatch,
                httpResult,
                details,
                PlanNo,
                LineID,
                showItems,
                items,
                Types.KAHANG_LINE_LEAVE,
                userName,
                3,
                3,
                callback
            )
        })
    }

}
//去交货
export function onOffLoad(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback){

    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.goDelivery(userName,PlanNo,LineID,Lat,Lon,Address)
        .then(httpResult=>{
            _handleLineAction(
                dispatch,
                httpResult,
                details,
                PlanNo,
                LineID,
                showItems,
                items,
                Types.KAHANG_LINE_LEAVE,
                userName,
                2,
                2,
                callback
            )
        })
    }

}

//异常结束
export function onManualEnd(PlanNo,sourceItems,showItems,targetItems,callback){
    const store = Globals.store;
    return dispatch=>{
        const ukey =store.getState().user.currentUserKey;
        const userName =  ukey.split('_')[1];
        const Msg = Utils.parseTime('YYYY-mm-dd HH:MM',new Date()) + " 司机" + store.getState().user[ukey].DriverName +"手动结束运输任务"
        api.manualEnd(userName,PlanNo,Msg).then(httpResult=>{
            _handlePlanAction(
                dispatch,
                httpResult,
                PlanNo,
                sourceItems,
                targetItems,
                showItems,
                Types.KAHANG_MANUAL_END,
                userName,
                Msg,
                callback,
            )

        })

    }
}

//上传回单
export function onUploadPOD(PlanNo,WaybillNO,fd,index,details,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.uploadReceipt(userName,WaybillNO,fd).then(httpResult=>{
            if(httpResult.code<0){

            }else if(httpResult.code==600){
                const item = details[PlanNo];
                const lineItem = item.LineList[index];
                lineItem.NeedReceiptOrdCount = 0;
                dispatch({
                    type:Types.KAHANG_UPLOAD_POD,
                    details
                })
                callback({
                    code:httpResult.code,
                    data:httpResult.data
                })
            }else{
                callback({
                    code:httpResult.code,
                    data:httpResult.data
                })
            }
        })

    }
}

//路线正常完成

export function onPlanFinish(PlanNo,sourceItems,showItems,targetItems,callback){
    const store = Globals.store;
    return dispatch=>{
        const ukey =store.getState().user.currentUserKey;
        const userName =  ukey.split('_')[1];
        _handlePlanAction(
            dispatch,
            {code:600,data:true},
            PlanNo,
            sourceItems,
            targetItems,
            showItems,
            Types.KAHANG_FINISHED,
            userName,
            "",
            callback,
        )
    }
}

//TODO 
//transportstatus 联动 路线预览联动  操作离线化 
//离线网络请求缓存发送 上传回单回调