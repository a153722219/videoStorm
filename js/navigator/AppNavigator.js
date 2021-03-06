import {
    createMaterialTopTabNavigator,
    createSwitchNavigator
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import WebViewPage from '../page/WebViewPage'
import FetchDemoPage from '../page/FetchDemoPage'
import  AsyncStorageDemoPage from '../page/AsyncStorageDemoPage'
import  DataStorageDemoPage from '../page/DataStorageDemoPage'
import  AboutPage from '../page/about/AboutPage'
import  AboutMePage from '../page/about/AboutMePage'
import  CustomKeyPage from '../page/CustomKeyPage'
import {connect} from 'react-redux'
import {Text} from 'react-native'
import {createReactNavigationReduxMiddleware,createReduxContainer} from 'react-navigation-redux-helpers'
export const rootCom = 'Init';//设置根路由
const InitNavigator = createStackNavigator({
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:{
            header:null,//禁用标题栏
        }
    }
});

const MainNavigator = createStackNavigator({
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            header:null,//禁用标题栏
        }
    },
    DetailPage:{
        screen:DetailPage,
        navigationOptions:{
             header:null
        }
    },
    FetchDemoPage:{
        screen:FetchDemoPage,
        navigationOptions:{
            // header:null
        }
    },

    AsyncStorageDemoPage:{
    screen:AsyncStorageDemoPage,
        navigationOptions:{
        // header:null
            },
    },
    DataStorageDemoPage:{
        screen:DataStorageDemoPage,
        navigationOptions:{
            // header:null
        },
    },
    WebViewPage:{
        screen:WebViewPage,
        navigationOptions:{
            header:null
        },
    },
    AboutPage:{
        screen:AboutPage,
        navigationOptions:{
            header:null
        },
    },
    AboutMePage:{
        screen:AboutMePage,
        navigationOptions:{
            header:null
        },
    },
    CustomKeyPage:{
        screen:CustomKeyPage,
        navigationOptions:{
            header:null
        },
    }
});


export const RootNavigator =  createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator
},{
    navigationOptions:{
        header:null,//禁用标题栏
    }

});
/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */

export const middleware = createReactNavigationReduxMiddleware(state=>state.nav,"root");

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWiteNavigationState = createReduxContainer(RootNavigator,'root');

const mapStateToProps = state=>({state:state.nav})

export default connect(mapStateToProps)(AppWiteNavigationState);
