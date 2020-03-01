import {
    createMaterialTopTabNavigator,
    createSwitchNavigator
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createBottomTabNavigator
} from 'react-navigation-tabs';
import WelcomePage from '../page/WelcomePage'
import RootPage from '../page/RootPage'
import DetailPage from '../page/DetailPage'
import WebViewPage from '../page/WebViewPage'
import FetchDemoPage from '../page/FetchDemoPage'
import  AsyncStorageDemoPage from '../page/AsyncStorageDemoPage'
import  DataStorageDemoPage from '../page/DataStorageDemoPage'
import  AboutPage from '../page/about/AboutPage'
import  ChangeLangPage from '../page/ChangeLangPage'
import  CarListPage from '../page/CarListPage'
import  CarDetailsPage from '../page/CarDetailsPage'
import {connect} from 'react-redux'
import {Text} from 'react-native'
import {createReactNavigationReduxMiddleware,createReduxContainer} from 'react-navigation-redux-helpers'
export const rootCom = 'Init';//设置根路由
const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null, //禁用标题栏
        }
    }
});

const MainNavigator = createStackNavigator({
    RootPage: {
        screen: RootPage,
        navigationOptions: {
            header: null, //禁用标题栏
        }
    },
    ChangeLangPage:{
        screen:ChangeLangPage,
        navigationOptions:{
            header:null,//禁用标题栏
        }
    },
    CarListPage:{
        screen:CarListPage,
        navigationOptions:{
            header:null,//禁用标题栏
        }
    },
    CarDetailsPage:{
        screen:CarDetailsPage,
        navigationOptions:{
            header:null,//禁用标题栏
        }
    }

});


export const RootNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator
}, {
    navigationOptions: {
        header: null, //禁用标题栏
    }

});
/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */

export const middleware = createReactNavigationReduxMiddleware(state => state.nav, "root");

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWiteNavigationState = createReduxContainer(RootNavigator, 'root');

const mapStateToProps = state => ({
    state: state.nav
})

export default connect(mapStateToProps)(AppWiteNavigationState);