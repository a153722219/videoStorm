import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'
//获取车辆数据action
export function onRefreshCars(items=[]) {
    const store = Globals.store;
    return dispatch=>{
        dispatch({type:Types.CAR_REFRESH});
        const userName =  store.getState().user.currentUserKey.split('_')[1];

        api.selVehicleList(userName,1).then(data=>{
                    //Hook 假数据 data.Records
                let arr = [{
                    VehicleID: 1662663,
                    VehicleNo: "粤BD92729",
                    PlaceName: "广东省深圳市宝安区福围中路(普通路)深圳市下十围小学东北99米",
                    Lon: 113.827561,
                    Lat: 22.657331,
                    Odo: 0,
                }];
                let i = 0;
                while(i<9){
                    arr.push(JSON.parse(JSON.stringify(arr[0])))
                    i++;
                }
            Utils.updateArr(0,10,items,arr);
            dispatch({type:Types.CAR_REFRESH_SUCCESS,items:items,showItems:arr,Phone:userName});
        }).catch(err=>{
            //网络错误的情况
            if(err=="Error: Network Error"){
                //获取老的数据
                const oldArr = items.slice(0,10);
                dispatch({type:Types.CAR_REFRESH_SUCCESS,items:items,showItems:oldArr,Phone:userName});
                return 
            }

            dispatch({type:Types.CAR_REFRESH_FAIL});
            console.log(err);
        })
    }
}
//加载更多车辆信息
export function onLoadMoreCars(newPageIndex,items=[],showItems=[]){
    const store = Globals.store;
    return dispatch=>{
        dispatch({type:Types.CAR_LOAD_MORE});
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.selVehicleList(userName,newPageIndex).then(data=>{
            //Hook 假数据 data.Records
            let arr = [{
                VehicleID: 1662663,
                VehicleNo: "粤BD92729",
                PlaceName: "广东省深圳市宝安区福围中路(普通路)深圳市下十围小学东北99米",
                Lon: 113.827561,
                Lat: 22.657331,
                Odo: 0,
            }];
            let i = 0;
            while(i<9){
                arr.push(JSON.parse(JSON.stringify(arr[0])))
                i++;
            }
            Utils.updateArr((newPageIndex-1)*10,10,items,arr);
            Utils.updateArr((newPageIndex-1)*10,10,showItems,arr);

            setTimeout(()=>{
                dispatch({type:Types.CAR_LOAD_MORE_SUCCESS,items:items,showItems:showItems,PageIndex:newPageIndex,Phone:userName});
            },500);

        }).catch(err=>{ 
            //网络错误的情况
            if(err=="Error: Network Error"){
                //获取老的数据
                const oldArr = items.slice((newPageIndex-1)*10,newPageIndex*10);
                Utils.updateArr((newPageIndex-1)*10,10,showItems,oldArr);
                setTimeout(()=>{
                    dispatch({type:Types.CAR_LOAD_MORE_SUCCESS,items:items,showItems:showItems,PageIndex:newPageIndex,Phone:userName});
                },500);
                return 
            }

            dispatch({type:Types.CAR_LOAD_MORE_FAIL});
            console.log(err);

        })
    }
}