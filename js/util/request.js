import axios from 'axios';
import Utils from '../util/Utils';
import {NetStatusMap,APPKEY,baseURL} from './constant';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000
});

//请求拦截处理
instance.interceptors.request.use(function (config) {
    
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    // return Promise.reject(error);
    return Promise.resolve(error);
});


export const httpPost = async (api, params,needReSet=false) => {
   
    params.AppKey = APPKEY;
    params.TimeStamp = Utils.parseTime('YYYY-mm-dd HH:MM:SS',new Date());

    api = api+"?data="+JSON.stringify(params);

    console.log("请求地址:",api,"参数:",params)
    
    return new Promise((resolve, reject) => {
        instance.post(api, {})
            .then(res => {
                let ret = {};
                if(res=="Error: Network Error"){
                    ret = {
                        code:-1,
                        data:{},
                        msg:"Network Error"
                    }
                }else if(res.toString().indexOf('timeout')!=-1){
                    // Error: timeout of 5000ms exceeded
                    ret = {
                        code:-2,
                        data:{},
                        msg:"timeout"
                    }
                }else if(res.data && res.data.ReturnCode==600){
                    ret = {
                        code:600,
                        data:res.data.ReturnData,
                        msg:"success"
                    }
                }else{
                    ret = {
                        code:res.data.ReturnCode,
                        data:{},
                        msg:NetStatusMap[res.data.ReturnCode]
                    }
                }
                console.log("请求地址:",api,"结果:",ret)
                resolve(ret)
            })

    })
}