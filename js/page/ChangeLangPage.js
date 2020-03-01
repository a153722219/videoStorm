/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,Switch} from 'react-native';
//redux
import {connect} from "react-redux";
//导航栏
import NavigationBar from '../common/NavigationBar';
//国际化和适配
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";
//可选导入
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
import actions from '../action/index'
class ChangeLangPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });

        this.state={
            zh:i18n.locale=='zh'
        }
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

        let statusBar = {
            backgroundColor: this.props.theme,
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                title={i18n.t('ChangeLang')}
                statusBar={statusBar}
                style={{backgroundColor:this.props.theme}}
                // rightButton={this.getRightButton()}
                 leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
            />

        return <View >
            {navigationBar}
            <View style={styles.container}>

                <View style={styles.row}>
                    <Text style={{fontSize:32*uW}}>
                        { i18n.t('zh')}
                    </Text>

                    <Switch
                        thumbTintColor={this.props.theme}
                        onTintColor={this.props.theme}
                        onValueChange={(value) =>{
                            if(value==true){
                                i18n.locale="zh"
                                this.props.onThemeChange("#008385");
                                EventBus.getInstance().fireEvent(EventTypes.LANGUAGE_REFRESH)
                            }else{
                                i18n.locale="en"
                                this.props.onThemeChange("#EF7622");
                                EventBus.getInstance().fireEvent(EventTypes.LANGUAGE_REFRESH)
                            }
                            this.setState({zh: value})
                        }}
                        value={this.state.zh} />
                </View>

                <View style={[styles.row,{marginTop:76*uW}]}>
                    <Text style={{fontSize:32*uW}}>
                        { i18n.t('en')}
                    </Text>

                    <Switch
                        thumbTintColor={this.props.theme}
                        onTintColor={this.props.theme}
                        onValueChange={(value) =>{
                            if(value==false){
                                i18n.locale="zh"
                                this.props.onThemeChange("#008385");
                                EventBus.getInstance().fireEvent(EventTypes.LANGUAGE_REFRESH)
                            }else{
                                i18n.locale="en"
                                this.props.onThemeChange("#EF7622");
                                EventBus.getInstance().fireEvent(EventTypes.LANGUAGE_REFRESH)
                            }
                            this.setState({zh: !value})
                        }}
                        value={!this.state.zh} />
                </View>


            </View>
        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch=>({
    onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(ChangeLangPage);
//样式
const styles = StyleSheet.create({
    container:{
        marginTop:57*uW,
        paddingLeft:47*uW,
        paddingRight:47*uW,
        width:(750)*uW
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between"
    }

});
