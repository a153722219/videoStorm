import {httpPost} from '../util/request'

const api = {};
//查询信息
api.login = (Phone)=>httpPost('Api/TmsAppWebApi/SelPersonalInformation',{Phone})

export default api;