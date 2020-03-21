import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'

// 请求回单列表
export function onLoadPOD(WaybillNo,details,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName = store.getState().user.currentUserKey.split('_')[1];
        api.PODList(userName,WaybillNo).then(res=>{

            let searchList =  [];

            res = {code:600,data:[
                {
                    "WaybillNO":"W20191230QVGR0003",
                    "ReceiptTime":"2019-12-30 16:28:13",
                    "PictureCount":"5",
                    "ImgURL":"http://testoss.e6gpshk.com/EtmsFileService/20180420/other/f89a5afe-45d1-43b9-95ff-136f45fab87c.jpg;"
                },
                {
                    "WaybillNO":"W20191230QVGR0005",
                    "ReceiptTime":"2019-12-30 16:28:13",
                    "PictureCount":"5",
                    "ImgURL":"http://testoss.e6gpshk.com/EtmsFileService/20180420/other/f89a5afe-45d1-43b9-95ff-136f45fab87c.jpg;"
                }
            ]}
            setTimeout(()=>{
                if(res.code<0){
                    console.log(-1)
                    //无网络 返回本地数据
                    if(details){
                        // 判断是否有搜索字样
                        if(WaybillNo){

                            searchList = details.filter(x=>{
                                return x.WaybillNO.indexOf(WaybillNo) != -1
                            });
                            dispatch({
                                type:Types.POD_SEARCH_LIST,
                                searchList
                            });
                            callback({
                                code:600,
                                data:searchList
                            })
                        }else{
        
                            searchList = details
                            dispatch({
                                type:Types.POD_LOAD,
                                contents:details
                            });
                            callback({
                                code:600,
                                data:details
                            })
                        }
                        
                    }else{
                        callback({
                            code:-1,
                            data:"网络错误"
                        })
                    }
                }else if(res.code==600){
                    console.log(600)
                    //更新本地数据
                        dispatch({
                            type:!WaybillNo?Types.POD_LOAD:Types.POD_SEARCH_LIST,
                            contents:res.data,
                            searchList:res.data,
                        });
            
                        callback({
                            code:600,
                            data:res
                        })
                   
                }else{
                    console.log(null)
                    callback({
                        code:res.code,
                        data:res.msg
                    })
                }
            },500)
           



        })
    }
}
