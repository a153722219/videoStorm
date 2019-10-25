/**
 * Created by Administrator on 2019/10/17.
 */
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import {middleware} from '../navigator/AppNavigator'

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
/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
