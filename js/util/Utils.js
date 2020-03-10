/**
 * Created by Administrator on 2019/10/23.
 */


import {  Linking, Alert,Clipboard} from 'react-native';
import ToastManager from '../common/ToastManager'
export default class Utils{
    /**
     * 检查item是否被收藏
     */

    static checkFavorite(item,items=[]){
        if(!items) return false;
        for(let i=0,len=items.length;i<len;i++){
            let id = item.id?item.id : item.fullName;
            if(id.toString()===items[i]){
                return true
            }
        }
        return false
    }

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

}