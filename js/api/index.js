import {httpPost} from '../util/request'

const api = {};
//查询信息
api.login = (Phone)=>httpPost('Api/TmsAppWebApi/SelPersonalInformation',{Phone})
//查询车辆列表
api.selVehicleList = (Phone,PageIndex=1,PageSize=10)=>httpPost('Api/TmsAppWebApi/SelVehicleList',{Phone,PageIndex,PageSize})
//查询车辆详情
api.selVehicleDetails = (Phone,VehicleID)=>httpPost('Api/TmsAppWebApi/SelVehicleDetails',{Phone,VehicleID})
export default api;