import {httpPost} from '../util/request'

const api = {};
//查询信息
api.login = (Phone)=>httpPost('Api/TmsAppWebApi/SelPersonalInformation',{Phone})
//查询车辆列表
api.selVehicleList = (Phone,PageIndex=1,PageSize=10)=>httpPost('Api/TmsAppWebApi/SelVehicleList',{Phone,PageIndex,PageSize})
//查询车辆详情
api.selVehicleDetails = (Phone,VehicleID)=>httpPost('Api/TmsAppWebApi/SelVehicleDetails',{Phone,VehicleID})
//查询卡航列表
api.selTaskList = (Phone,PageIndex,PageSize=10,Type=0)=>httpPost('Api/TmsAppWebApi/SelTaskList',{Phone,PageIndex,PageSize,Type})
//查询路线预览接口
api.selTransportScheduleLine  = (Phone,PlanNO)=>httpPost('Api/TmsAppWebApi/SelTransportScheduleLine',{Phone,PlanNO})
//查询运输中详情接口
api.selRunningTask  = (Phone,PlanNO)=>httpPost('Api/TmsAppWebApi/SelRunningTask',{Phone,PlanNO})
//查询运输详情接口
api.selTransportDetails  = (Phone,PlanNO)=>httpPost('Api/TmsAppWebApi/SelTransportDetails',{Phone,PlanNO})
//去运输接口
api.startTransportPlan  = (Phone,PlanNO,Lat,Lon,Address)=>httpPost('Api/TmsAppWebApi/StartTransportPlan',{Phone,PlanNO,Lat,Lon,Address})
// 回单记录列表
api.PODList = (Phone,PlanNO,WaybillNO,PageIndex=1,PageSize=10)=>httpPost('Api/TmsAppWebApi/SelReceiptWaybills',{Phone,PlanNO,WaybillNO,PageIndex,PageSize})
// 确认到达
api.arrive = (Phone,PlanNO,LineID,Lat,Lon,Address)=>httpPost('Api/TmsAppWebApi/Arrive',{Phone,PlanNO,LineID,Lat,Lon,Address})
//去装货
api.goLoading = (Phone,PlanNO,LineID,Lat,Lon,Address)=>httpPost('Api/TmsAppWebApi/GoLoading',{Phone,PlanNO,LineID,Lat,Lon,Address})
//去交货
api.goDelivery = (Phone,PlanNO,LineID,Lat,Lon,Address)=>httpPost('Api/TmsAppWebApi/GoDelivery',{Phone,PlanNO,LineID,Lat,Lon,Address})
//确认离开
api.confirmLeave = (Phone,PlanNO,LineID,Lat,Lon,Address)=>httpPost('Api/TmsAppWebApi/ConfirmLeave',{Phone,PlanNO,LineID,Lat,Lon,Address})
//异常结束
api.manualEnd = (Phone,PlanNO,Msg)=>httpPost('Api/TmsAppWebApi/ManualEnd',{Phone,PlanNO,Msg});
//上传回单
api.uploadReceipt = (Phone,WaybillNO,fd)=>httpPost('Api/TmsAppWebApi/UploadReceipt',{Phone,WaybillNO},fd,
{
    headers:{ 'Content-Type': 'multipart/form-data'}
});
// 搜索接口
api.search = (Phone,PlanNO)=>httpPost('Api/TmsAppWebApi/SelOrdersInfo',{Phone,PlanNO})

export default api;