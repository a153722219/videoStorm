import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
const InitNavigator = createStackNavigator({
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:{
            header:null,//禁用标题栏
        }
    }
});

const MainNavigator = createStackNavigator({
    DetailPage:{
        screen:DetailPage,
        navigationOptions:{
            header:null,//禁用标题栏
        }
    },
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            header:null,//禁用标题栏
        }
    }
});

export default createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator
},{
    navigationOptions:{
        header:null,//禁用标题栏
    }

});