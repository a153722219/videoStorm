/**
 * Created by Administrator on 2019/10/17.
 */
import {applyMiddleware, createStore,compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import {middleware} from '../navigator/AppNavigator'

//redux持久化
import {persistStore, persistCombineReducers,persistReducer} from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel1  from 'redux-persist/lib/stateReconciler/autoMergeLevel1'
//autoMergeLevel2

const config = {
    key: 'root',
    storage:AsyncStorage,
    stateReconciler:autoMergeLevel1,
    blacklist:['nav']
};


//自定义中间件
const logger = store=>next=>action=>{
    if(typeof  action==='funtion'){
        console.log("dispatching a funtion");
    }else {
        console.log("dispatching ",action);
    }
    const result = next(action);
    console.log('nextState ',store.getState())
};


const middlewares = [
    middleware,
    logger,
    thunk
];


function configureStore(){
    let reducer = persistReducer(config, reducers);
    // 如果createStore有需要加载多个参数，需要用compose将其拼装起来。
    // let store = createStore(reducer, compose(applyMiddleware(thunk),devToolsEnhancer({ realtime: true, port: 8000 })));
    let store = createStore(reducer, applyMiddleware(...middlewares));
    let persistor = persistStore(store);
    return { persistor, store }
}

/**
 * 创建store
 */
const { persistor, store } = configureStore();

export default {
    persistor:persistor, store:store
}
