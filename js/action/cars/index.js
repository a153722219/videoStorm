import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'
//加载车辆详情
export function onLoadCarDetails(VehicleID,details,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        // const item = showItems[index];
        // const sourceItem = items[index];
        api.selVehicleDetails(userName,VehicleID).then(res=>{
            if(res.code<0){
                //无网络 返回本地数据
                if(details[VehicleID]){
                    dispatch({
                        type:Types.CAR_LOAD_DETAIL,
                        details
                    });
                    callback({
                        code:600,
                        data:details[VehicleID]
                    })
                }else{
                    callback({
                        code:-1,
                        data:"网络错误"
                    })
                }
            }else if(res.code==600){
                //更新本地数据
                details[VehicleID] = res.data;

                dispatch({
                    type:Types.CAR_LOAD_DETAIL,
                    details
                });

                callback({
                    code:600,
                    data:details[VehicleID]
                })

            }else{
                callback({
                    code:res.code,
                    data:res.msg
                })
            }
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
                    //Hook 假数据 data.Records
                    // let arr = [{
                    //     VehicleID: 1662663,
                    //     VehicleNo: "粤BD92729",
                    //     PlaceName: "广东省深圳市宝安区福围中路(普通路)深圳市下十围小学东北99米",
                    //     Lon: 113.827561,
                    //     Lat: 22.657331,
                    //     Odo: 0,
                    // }];
                    // let i = 0;
                    // while(i<9){
                    //     arr.push(JSON.parse(JSON.stringify(arr[0])))
                    //     i++;
                    // }

                if(res.code<0){
                    //网络错误的情况
                    //获取老的数据
                    const oldArr = items.slice(0,10);
                    dispatch({type:Types.CAR_REFRESH_SUCCESS,items:items,showItems:oldArr,Phone:userName});
                    return 
                }else if(res.code==600){
                    Utils.updateArr(0,10,items,res.data.Records);
                    dispatch({type:Types.CAR_REFRESH_SUCCESS,items:items,showItems:res.data.Records,Phone:userName});

                }else{
                    dispatch({type:Types.CAR_REFRESH_FAIL});
                    console.log(res);
                }
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
           
            if(res.code<0){
                //获取老的数据
                const oldArr = items.slice((newPageIndex-1)*10,newPageIndex*10);
                Utils.updateArr((newPageIndex-1)*10,10,showItems,oldArr);
                setTimeout(()=>{
                    dispatch({type:Types.CAR_LOAD_MORE_SUCCESS,items:items,showItems:showItems,PageIndex:newPageIndex,Phone:userName});
                },500);
                return 
            }else if(res.code==600){
                Utils.updateArr((newPageIndex-1)*10,10,items,res.data.Records);
                Utils.updateArr((newPageIndex-1)*10,10,showItems,res.data.Records);
    
                setTimeout(()=>{
                    dispatch({type:Types.CAR_LOAD_MORE_SUCCESS,items:items,showItems:showItems,PageIndex:newPageIndex,Phone:userName});
                },500);
            }else{
                dispatch({type:Types.CAR_LOAD_MORE_FAIL});
                console.log(res);
            }

        })
    }
}