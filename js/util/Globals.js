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
            
        }).catch(e=>{
            console.log(e)
        });
    }

    static async sendApis(){
        if(Globals.sending) return
        Globals.sending = true;
        for(let i in Globals.waitSendApis){
            let action = Globals.waitSendApis[i];
            let res = await api[action.name](...action.params);
            if(res.code>=600){
                Globals.waitSendApis.splice(i,1);
            }

        }
  
        Globals.saveSendApis();
        Globals.sending = false;
    }

}