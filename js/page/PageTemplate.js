/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
//redux
import {connect} from "react-redux";
//导航栏
import NavigationBar from '../common/NavigationBar';
//国际化和适配
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
import  setStatusBar from '../common/setStatusBar'
@setStatusBar({
    barStyle: 'light-content',
    translucent: true
})
class ChangeLangPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress(){
        NavigationUtil.goBack(this.props.navigation)
        return true
    }


    render() {

        let navigationBar =
            <NavigationBar
                title={'页面'}
                statusBar={{}}
                style={{backgroundColor:this.props.theme}}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
            />

        return <View >
            {navigationBar}
            <Text>page</Text>
        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(ChangeLangPage);
//样式
const styles = StyleSheet.create({});
