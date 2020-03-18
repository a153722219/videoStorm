/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,ScrollView,Image,TouchableOpacity} from 'react-native';
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
import TaskBaseInfo from '../common/TaskBaseInfo'
import TaskLinesInfo from '../common/TaskLinesInfo'
import  setStatusBar from '../common/setStatusBar'
@setStatusBar({
    barStyle: 'dark-content',
    translucent: true,
    backgroundColor:"#fff"
})
class GoTransPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });

        const {model} = this.props.navigation.state.params;
        this.model = model;

    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    getRightButton(){
        return <TouchableOpacity activeOpacity={0.7} onPress={()=>{
            NavigationUtil.goPage({},'PODListPage')
        }}>
            <View  style={styles.navBtnBox}>
                    <Image style={styles.navBtnIcon} source={i18n.locale==='zh'?require('../assets/zh/PODs.png'):require('../assets/en/PODs.png')}/>
                    <Text  style={styles.navBtnTitle}>{i18n.t('PODRecords')}</Text>
            </View>
        </TouchableOpacity>
    }




    render() {

        let navigationBar =
            <NavigationBar
                title={i18n.t('goTran')}
                statusBar={{}}
                style={{backgroundColor: "#fff"}}
                titleStyle={{color:"#000",fontSize:20}}
                rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),"#000")}
            />

        return <View style={styles.rootContainer}>
            {navigationBar}

            <ScrollView style={{flex:1}}>
                <TaskBaseInfo showDetail={true} model={this.model}/>

                <TaskLinesInfo 
                    LineList={this.model.LineList}
                    currentLine={0}
                 />


            </ScrollView>

            <View style={styles.fixContainer}>
                 {/* <TouchableOpacity activeOpacity={0.7}>
                        <View style={styles._finished}>
                            <Image style={styles._finishedIcon} source={require('../assets/zh/_haveFinished.png')}/>
                            <Text  style={styles._finishedText}>异常结束</Text>
                     </View>
                 </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={[styles.comfirmbtn,{backgroundColor:this.props.theme}]}>
                        {i18n.t('goLoad')}
                    </Text>
                </TouchableOpacity> */}

                <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                    NavigationUtil.goPage({},'UploadPodPage')
                }}>
                    <Text style={[styles.comfirmbtn,styles.comfirmFullbtn,{backgroundColor:this.props.theme}]}>
                        上传回单
                    </Text>
                </TouchableOpacity>
            </View>
        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(GoTransPage);
//样式
const styles = StyleSheet.create({
    _finished:{

        alignItems:'center'
    },
    _finishedIcon:{
        width:34*uW,
        height:42*uW,
    },
    comfirmFullbtn:{
        width:644*uW,
        marginLeft:0
    },
    comfirmbtn:{
        width:470*uW,
        height:80*uW,
        textAlign:"center",
        lineHeight:80*uW,
        borderRadius:40*uW,
        color:"white",
        marginLeft:49*uW
    },

    _finishedText:{
        fontSize:22*uW,
        color:"#333",
        fontWeight:"400",
        marginTop:4*uW
    },

    navBtnIcon:{
        width:24*uW,
        height:28*uW,
        marginRight:10*uW
    },
    navBtnTitle:{
        fontSize:26*uW,
        color:"#666",
        fontWeight:"400"
    },
    rootContainer:{
        flex:1,
        backgroundColor:"#f5f5f5"
    },
    navBtnBox:{
        flexDirection:"row",
        alignItems:"center",
        marginRight:36*uW
    },
    fixContainer:{
        height:108*uW,
        width:"100%",
        backgroundColor:"white",
        position:'absolute',
        bottom:0,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderStyle:'solid',
        borderColor:"#e5e5e5",
        borderTopWidth:1

    }

});
