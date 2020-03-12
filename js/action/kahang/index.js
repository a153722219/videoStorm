import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'
//加载车辆详情
export function onRefreshKaHang(statusFlag,items=[]){
    const store = Globals.store;
    return dispatch=>{
        dispatch({
            type:Types.KAHANG_REFRESH
        })
        const userName =  store.getState().user.currentUserKey.split('_')[1];
        api.selTaskList(userName,1,5,statusFlag).then(res=>{
           
            if(res.code<0){
                //net error
            }else if(res.code==600){
                //更新原始数据
                Utils.updateArr(0,5,items,res.data.Records);
                dispatch({
                    type:Types.KAHANG_REFRESH_SUCCESS,
                    items:items,
                    showItems:res.data.Records,
                    Phone:userName,
                    statusFlag
                });
            }else{
                dispatch({type:Types.KAHANG_REFRESH_FAIL});
                console.log(res);
            }
        })
    }

}