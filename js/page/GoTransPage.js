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
    
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps,prevState)
        return null
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        const {statusFlag} = this.props.navigation.state.params;
        this.setState({
            statusFlag:statusFlag
        });
         //设置currentLine
         const newCurrentLine = this.state.model.LineList.findIndex((item)=>item.LineID==this.state.model.CurrentLineID)

         if(newCurrentLine!=-1){
            this.setState({
                currentLine:newCurrentLine
            });
         }
         console.log()
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

    manualEnd(){
        const {PlanNo} = this.state.model;
        const index = this.findOddLine();
        if(index==-1){
            ViewUtil.showComfirm(()=>{
                LoadingManager.show();
                const sourceItems = this.props.kahang[this.storeKey+"1"] || [];
                const targetItems = this.props.kahang[this.storeKey+"2"] || [];
                this.props.onManualEnd(PlanNo,sourceItems,this.props.kahang.showItems,targetItems,res=>{
                    LoadingManager.close();
                    if(res.code==600){
                        this.setState({
                            statusFlag:2
                        })
                    }else{
                        alert(res.data || "操作失败")
                    }
                    
                })

            },"异常结束","确定要异常结束该任务?")
        }else{
            this.setState({
                currentLine:index
            })
            alert("请先上传回单")
        }
    }


    findOddLine(){
        //返回
        for(var i=0;i<this.state.model.LineList.length;i++){
            if(this.state.model.LineList[i].OpBtnCode==3 && this.state.model.LineList[i].NeedReceiptOrdCount>0){ 
                return i;
            } 
        }
        return -1
    }

  

    _genBottomButton(index){
        
        const item = this.state.model.LineList[index];
        // console.log(item)
        //已完成
         //  1到达，2离开，3已离开，4去装货，5去交货(卸货)

            //装货
        if(item.OpBtnCode==3){
            if(item.NeedReceiptOrdCount>0){//交货
                return this._genButton(i18n.t("uploadPOD"),false,()=>{
                    NavigationUtil.goPage({
                        index:index,
                        PlanNo:this.state.model.PlanNo,
                        WaybillNOs:item.WaybillNOs,
                        callback:()=>{
                            console.log('cb')
                            this.checkPlanHasFinished(this.state.model.PlanNo);
                        }
                    },"UploadPodPage");
                })
            }
            //完成

            return this._genButton(i18n.t("Finished"),true,()=>{})    
        }

        if(item.OpBtnCode==2){ //确认离开
            return this._genButton(i18n.t("ConfirmtoLeave"),false,()=>{
                this.commonFunc(item.LineID,(Lat,Lon,Address,Items)=>{
                    LoadingManager.show();
                    this.props.onLeave(this.state.model.PlanNo,Lat,Lon,Address,item.LineID,this.props.kahang.details,this.props.kahang.showItems,Items,(res)=>{
                        if(res.code!=600)
                            alert(res.data || "操作失败")
                       
                        LoadingManager.close();
                        //确认后 要自动跳到下一个未执行站点
                        let next = this.findNextLine(index);
                        if(next!=-1){
                            this.setState({
                                currentLine:next
                            })
                        }else{
                            this.checkPlanHasFinished(this.state.model.PlanNo);
                        }
                    });              
                });

            })
        }

        if(item.OpBtnCode==1){ //确认到达
           
            return this._genOddButton(i18n.t("ConfirmtoArrive"),()=>{
                this.commonFunc(item.LineID,(Lat,Lon,Address,Items)=>{
                    LoadingManager.show();
                    this.props.onArrived(this.state.model.PlanNo,Lat,Lon,Address,item.LineID,this.props.kahang.details,this.props.kahang.showItems,Items,(res)=>{
                        if(res.code!=600)
                            alert(res.data || "操作失败")
                       
                        LoadingManager.close();
                    });              
                });
               
            })    
        }

        if(item.OpBtnCode==4){//4去装货
            return this._genOddButton(i18n.t("goLoad"),()=>{
                this.commonFunc(item.LineID,(Lat,Lon,Address,Items)=>{
                    ViewUtil.showComfirm(()=>{
                        this.props.onGoLoad(this.state.model.PlanNo,Lat,Lon,Address,item.LineID,this.props.kahang.details,this.props.kahang.showItems,Items,(res)=>{
                            if(res.code!=600)
                                alert(res.data || "操作失败")
                            
                          
                            LoadingManager.close();
                        });  
                    },"装货确认","确认已经完成装货?")
                   
                });

            })    
        }

        if(item.OpBtnCode==5){//5去交货
            return this._genOddButton(i18n.t("goOffLoad"),()=>{
                this.commonFunc(item.LineID,(Lat,Lon,Address,Items)=>{
                    ViewUtil.showComfirm(()=>{
                        this.props.onOffLoad(this.state.model.PlanNo,Lat,Lon,Address,item.LineID,this.props.kahang.details,this.props.kahang.showItems,Items,(res)=>{
                            if(res.code!=600)
                                alert(res.data || "操作失败")
                            LoadingManager.close();
                        });  
                    },"交货确认","确认已经完成交货?")
                   
                });
            })    
        }

        return null
    }



    _checkHasTask(LineID){ //检查当前是否有其他任务正在进行
        for(let i in this.props.kahang.details){
            let Item = this.props.kahang.details[i]
            for(let k in Item.LineList){
                let Line = Item.LineList[k]
                if(Line.LineID==LineID){
                    continue;
                }else if(Line.OpBtnCode!=1 && Line.OpBtnCode!=3){
                    const oItems = this.props.kahang[this.storeKey+"1"];
                    const index = oItems.findIndex(i=>i.PlanNO==i)
                    console.log(index)
                    if(index!=-1)
                        return true
                }
            }
        }
        return false
    }

    commonFunc(LineID,cb){
        if(this._checkHasTask(LineID)){
            return alert("已有其他任务进行中，无法进行操作")
        }
        if(this.props.geo.Lat && this.props.geo.Lon){
            const {Lat,Lon,Address} = this.props.geo;
            const Items = this.props.kahang[this.storeKey+"1"];
            cb(Lat,Lon,Address,Items);
        }else alert("地址获取失败,请打开WIFI网络定位")
    }
    findNextLine(index){
        //返回下一个未开始任务的index
        for(var i=index+1;i<this.state.model.LineList.length;i++){
            if(this.state.model.LineList[i].OpBtnCode==1){
                return i;
            }
        }

        for(var i=0;i<index;i++){
            if(this.state.model.LineList[i].OpBtnCode==1){
                return i;
            }
        }

        return -1
    }


    checkPlanHasFinished(PlanNo){
        for(let i in this.state.model.LineList){
            let item = this.state.model.LineList[i]
            if(item.OpBtnCode!=3 || (item.OpBtnCode==3 && item.NeedReceiptOrdCount>0)){
                return false;
            }
        }
        const sourceItems = this.props.kahang[this.storeKey+"1"] || [];
        const targetItems = this.props.kahang[this.storeKey+"2"] || [];
        this.props.onPlanFinish(PlanNo,sourceItems,this.props.kahang.showItems,targetItems,res=>{
            if(res.code==600){
                this.setState({
                    statusFlag:2
                })
            }else{
                alert(res.data || "操作失败")
            }
            
        })

        
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
                <TouchableOpacity activeOpacity={0.7}  onPress={this.manualEnd.bind(this)}>
                            <View style={styles._finished}>
                                <Image style={styles._finishedIcon} source={require('../assets/zh/_haveFinished.png')}/>
                                <Text  style={styles._finishedText}>异常结束</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={callback}>
                        <Text style={[styles.comfirmbtn,{backgroundColor:this.props.theme}]}>
                            {text}
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

                {/* {
                    this.state.statusFlag==0 &&
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                        this.goTrans();
                    }}>
                        <Text style={[styles.comfirmbtn,styles.comfirmFullbtn,{backgroundColor:this.props.theme}]}>
                            {i18n.t('goTran')}
                        </Text>
                    </TouchableOpacity>
                } */}
                {/* this.state.statusFlag==1 &&  */}
                {
                    this._genBottomButton(this.state.currentLine)
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
    onPlanFinish:(PlanNo,sourceItems,showItems,targetItems,callback)=>dispatch(actions.onPlanFinish(PlanNo,sourceItems,showItems,targetItems,callback)),
    onManualEnd:(PlanNo,sourceItems,showItems,targetItems,callback)=>dispatch(actions.onManualEnd(PlanNo,sourceItems,showItems,targetItems,callback)),
    onArrived:(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback)=>dispatch(actions.onArrived(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback)),
    onGoLoad:(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback)=>dispatch(actions.onGoLoad(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback)),
    onLeave:(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback)=>dispatch(actions.onLeave(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback)),
    onOffLoad:(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback)=>dispatch(actions.onOffLoad(PlanNo,Lat,Lon,Address,LineID,details,showItems,items,callback)),
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
