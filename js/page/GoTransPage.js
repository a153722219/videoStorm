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
import LoadingManager from '../common/LoadingManager';
import actions from '../action'
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
       
        const Phone = props.user.currentUserKey.split("_")[1];
        this.storeKey = "items_"+Phone+"_";
        const {model} = this.props.navigation.state.params;
        // this.model = model;
        this.state={
            statusFlag:0,
            currentLine:0,
            model:model
        }
    
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        const {statusFlag} = this.props.navigation.state.params;
        this.setState({
            statusFlag:statusFlag
        });
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

    goTrans(){
        // console.log(this.props.statusFlag)model
            if(this.state.statusFlag==0){
                if(this.props.geo.Lat && this.props.geo.Lon){
                    LoadingManager.show();
                    const {Lat,Lon,Address} = this.props.geo;
                    const sourceItems = this.props.kahang[this.storeKey+"0"];
                    const targetItems = this.props.kahang[this.storeKey+"1"];
                    this.props.onStartTranPort(this.state.model.PlanNo,Lat,Lon,Address,sourceItems,this.props.kahang.showItems,targetItems,res=>{
                        LoadingManager.close();
                        console.log(res);
                        if(res.code==600){
                            this.setState({
                                statusFlag:1
                            })
                        }else{
                            alert(res.data || "加载失败")
                        }
                        
                    })

                }else{
                    alert("地址获取失败,请打开网络定位")
                }

                return
            }
    }

    _genBottomButton(index){
        console.log(index)
        const item = this.state.model.LineList[index];
        console.log(item)
        //已完成
         //  1到达，2离开，3已离开，4去装货，5去交货(卸货)

            //装货
        if(item.OpBtnCode==3){
            if(item.NeedReceiptOrdCount>0){//交货
                return this._genButton(i18n.t("uploadPOD"),false,()=>{})
            }
            //完成
            return this._genButton(i18n.t("Finished"),true,()=>{})    
        }

        if(item.OpBtnCode==2){ //确认离开
            return this._genButton(i18n.t("ConfirmtoLeave"),true,()=>{})    
        }

        if(item.OpBtnCode==1){ //确认到达
            return this._genOddButton(i18n.t("ConfirmtoArrive"),()=>{})    
        }

        if(item.OpBtnCode==4){//4去装货
            return this._genOddButton(i18n.t("goLoad"),()=>{})    
        }

        if(item.OpBtnCode==5){//5去交货
            return this._genOddButton(i18n.t("goOffLoad"),()=>{})    
        }



        return null
    }
    _genButton(text,disable,callback){
        return <TouchableOpacity activeOpacity={0.7} onPress={callback}>
            <Text style={[styles.comfirmbtn,styles.comfirmFullbtn,{backgroundColor:disable?'#D2D2D2':this.props.theme}]}>
                {text}
            </Text>
        </TouchableOpacity>
    }

    _genOddButton(text,callback){
        return <View style={styles.fixContainer}>
                <TouchableOpacity activeOpacity={0.7}  onPress={()=>{}}>
                            <View style={styles._finished}>
                                <Image style={styles._finishedIcon} source={require('../assets/zh/_haveFinished.png')}/>
                                <Text  style={styles._finishedText}>异常结束</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={callback}>
                        <Text style={[styles.comfirmbtn,{backgroundColor:this.props.theme}]}>
                            {i18n.t('goLoad')}
                        </Text>
                    </TouchableOpacity>

        </View>

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
                <TaskBaseInfo showDetail={true} model={this.state.model}/>

                <TaskLinesInfo 
                    LineList={this.state.model.LineList}
                    currentLine={this.state.currentLine}
                    onCurrentSelectedChange={(index)=>{
                        this.setState({
                            currentLine:index
                        })
                    }}
                 />


            </ScrollView>

            {this.state.statusFlag!=2 && <View style={styles.fixContainer}>
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

                {/* <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                    NavigationUtil.goPage({},'UploadPodPage')
                }}>
                    <Text style={[styles.comfirmbtn,styles.comfirmFullbtn,{backgroundColor:this.props.theme}]}>
                        上传回单
                    </Text>
                </TouchableOpacity> */}

                {
                    this.state.statusFlag==0 &&
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                        this.goTrans();
                    }}>
                        <Text style={[styles.comfirmbtn,styles.comfirmFullbtn,{backgroundColor:this.props.theme}]}>
                            {i18n.t('goTran')}
                        </Text>
                    </TouchableOpacity>
                }

                {
                    this.state.statusFlag==1 && this._genBottomButton(this.state.currentLine)
                }

            </View>}
        </View>;
    }

}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme,
    geo:state.geo.location,
    kahang:state.kahang
});

const mapDispatchToProps = dispatch => ({
    onStartTranPort:(PlanNo,Lat,Lon,Address,sourceItems,showItems,targetItem,callback)=>dispatch(actions.onStartTranPort(PlanNo,Lat,Lon,Address,sourceItems,showItems,targetItem,callback)),
});

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
