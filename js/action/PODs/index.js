import Types from "../types";
import api from '../../api';
import Globals from '../../util/Globals'
import Utils from '../../util/Utils'
import {_handleRefreshData,_handleLoadMoreData,_handleLoadDetails} from '../ActionUtil'

// 请求回单列表
export function onLoadPOD(WaybillNO,details,callback){
    const store = Globals.store;
    return dispatch=>{
        const userName = store.getState().user.currentUserKey.split('_')[1];
        api.PODList(userName,WaybillNO).then(res=>{
            res ={code:600,data:[
                {
                    "WaybillNO":"W20191230QVGR0003",
                    "ReceiptTime":"2019-12-30 16:28:13",
                    "PictureCount":"5",
                    "ImgURL":"http://testoss.e6gpshk.com/EtmsFileService/20180420/other/f89a5afe-45d1-43b9-95ff-136f45fab87c.jpg"
                },
                {
                    "WaybillNO":"W20191230QVGR0005",
                    "ReceiptTime":"2019-12-30 16:28:13",
                    "PictureCount":"5",
                    "ImgURL":"http://testoss.e6gpshk.com/EtmsFileService/20180420/other/f89a5afe-45d1-43b9-95ff-136f45fab87c.jpg"
                }
            ]}
                 
                
            _handleLoadDetails(
                dispatch,
                WaybillNO,
                details,
                Types.POD_LOAD,
                res,
                callback
            );
        })
    }
}
