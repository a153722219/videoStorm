/**
 * Created by Administrator on 2019/10/23.
 */


import {  Linking, Alert,Clipboard} from 'react-native';
import ToastManager from '../common/ToastManager';
import GoogleGeo from '../util/GoogleGeo';
import {Google_API_KEY,proxyUrl} from './constant'
export default class Utils{

    static callPhone (phone) {
        const url = `tel:${phone}`;
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    return Alert.alert('提示', `您的设备不支持该功能，请手动拨打 ${phone}`, [
                        { text: '确定' }
                    ]);
                }
                return Linking.openURL(url);
            })
            .catch(err => ToastManager.show(`出错了：${err}`, 1.5));
    };

    static copyToClipboard(text){
        Clipboard.setString(text);
        ToastManager.show(`复制成功`, 1.5)
    }

    static parseTime(fmt, date){
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    }
    //更新数组里面指定长度的数据
    static updateArr(offset=0,length=10,arr=[],otherData){
        return arr.splice(offset,length,...otherData)
    }

    static getLocation(callback){
        GoogleGeo.startGetLocation().then(data=>{
            if(!data.msg){
                const url = proxyUrl + 'maps/api/geocode/json?latlng='+data.latitude+","+data.longitude+"&key="+Google_API_KEY;
                console.log(url)
                //&language=en/zh
                fetch(url).then((response) => response.json()).then(res=>{
                    console.log(res)
                    const formatAddress = (res.results && res.results[0])?res.results[0].formatted_address:""

                    const address = {}
                        address.Lat = data.latitude;
                        address.Lon = data.longitude;
                        address.Address = formatAddress;
                        address.multiaccuracy = data.multiaccuracy
                        address.date = data.date
                      
                        callback(
                            {
                                errorCode:"0000",
                                msg:address
                            }
                        );
    
                    }).catch(err=>{
                        console.log(err)
                        callback(
                            {
                                errorCode:"-1",
                                msg:"网络错误,逆地理编码失败"
                            }
                        );
                    });

                  
            }else{
                console.log(data)
                callback(data);
            }
        }).catch(err=>{
            //发生错误 不做任何操作
            callback(err)
            console.log(err);
        })
    }

}