import AsyncStorage from '@react-native-community/async-storage';
import api from '../api'
export default class Globals {
    static Android_SDK_INT = null;
    static store = null;
    static waitSendApis = [];
    static inited = false;
    static sending = false;
    static getSendApis(){
        return Globals.waitSendApis;
    }
    static saveSendApis(api){
        // const id = Math.random().toString(36).substring(2);
        // api.id = id;
        if(api){
            Globals.waitSendApis.push(api);
        }
        AsyncStorage.setItem("waitSendApis",JSON.stringify(Globals.waitSendApis),(error,result)=>{
            console.log("存入离线操作成功 list:",Globals.waitSendApis);
        }).catch(e=>{
            console.log(e)
        });
    }

    static async sendApis(){
        if(Globals.sending) return
        Globals.sending = true;
        for(let i=0;i<Globals.waitSendApis.length;i++){

            let action = Globals.waitSendApis[i];
            let res = await api[action.name](...action.params);
            await Globals.sleep(200);
            if(res.code>=600){
                // Globals.waitSendApis.splice(i,1);
                Globals.waitSendApis[i].isDelete = true;
            }

        }
        Globals.waitSendApis = Globals.waitSendApis.filter(i=>!i.isDelete);
        Globals.saveSendApis();
        Globals.sending = false;
    }
    static sleep(time){
        return new Promise((res,rej)=>{
            setTimeout(()=>{
                res()
            },time)
        })
    }

}