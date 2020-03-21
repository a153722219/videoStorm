/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,Image,ScrollView
} from 'react-native';
//redux
import {connect} from "react-redux";
//导航栏
import NavigationBar from '../common/NavigationBar';
//国际化和适配
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";
import Modal from 'react-native-translucent-modal';
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'
import LoadingManager from '../common/LoadingManager';
import actions from '../action'
import  setStatusBar from '../common/setStatusBar'
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
import KaHangPageItem from '../common/KaHangPageItem'
import ViewPager from '@react-native-community/viewpager';
import LinearGradient from 'react-native-linear-gradient';
@setStatusBar({
    barStyle: 'dark-content',
    translucent: true
})
class KaHangPage extends Component {


    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });

        this.state = {
            navActive:0,
            modalVisible: false,
            modalData:{
                LineList:[]
            }
        }
        this.viewPager = React.createRef();
      
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


    getLeftBackButton(){


        const Keys = [
            {
                name:i18n.t('noFinished')
            },
            {
                name:i18n.t('Pending')
            },
            {
                name:i18n.t('Finished')
            }
        
        ];

        const leftButton =  ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')
        const RightButton =  ViewUtil.getIconButton(() => {
            NavigationUtil.goPage({},"SearchPage")
        },require('../assets/zh/waitExecSearch.png'),{marginLeft:i18n.locale=='zh'?100*uW:38*uW})
        return  <View style={styles.navBox}>
                {leftButton}
                <View  style={[styles.navBox,{marginLeft:i18n.locale=='zh'?100*uW:57*uW}]}>
                    {
                        Keys.map((item,index)=>{
                            return <TouchableOpacity key={index} activeOpacity={0.6} onPress={()=>{
                                this.setState({
                                    navActive:index
                                });
                                this.goPage(index)
                            }}>
                                <Text style={this.state.navActive==index?[styles.navItem,styles.active,index===0?{marginLeft:0}:{}]:[styles.navItem,index===0?{marginLeft:0}:{}]}>
                                    {item.name}
                                 </Text>
                            </TouchableOpacity>
                        })

                    }
                </View>
                {RightButton}
            </View>


    }

    goPage(index){
        this.viewPager.current.setPage(index);
        
    }

    loadPreview(PlanNO){
        LoadingManager.show()
        this.props.onLoadKaHangPreView(PlanNO,this.props.previews,(res)=>{
            LoadingManager.close();
        
            if(res.code==600){

                this.setState({ 
                    modalData:res.data,
                    modalVisible: true
                 });
            }else{
                alert(res.msg || "加载失败")
            }
            
        })
       
    }
    getPriviewColor(status){
        if(status==1){
            return "#9F9F9F"
        }else if(status==2){
            return "#F8B422"
        }else{
            return this.props.theme
        }
    }

    getPriviewText(status){
        if(status==1){
            return ""
        }else if(status==2){
            return i18n.t('Pending2')
        }else{
            return i18n.t('Finished')
        }
    }


    render() {
        const modelTopColor = i18n.locale=="zh"?['#18C1BD', '#008680']:['#F7B322', '#EE7622']

        let navigationBar =
            <NavigationBar
                title={''}
                statusBar={{}}
                style={{backgroundColor: "white"}}
                leftButton={this.getLeftBackButton()}

            />

        return <View style={styles.rootContainer}>
            {navigationBar}
            <View style={{
                flex:1
            }}>
                    <ViewPager style={{flex:1}} ref={this.viewPager} initialPage={0} 
                        onPageSelected={e=>{
                            // console.log(e.nativeEvent.position)
                            this.setState({
                                navActive:e.nativeEvent.position
                            });
                        
                            
                        }}
                        
                        >
                        <View key="1">
                                {   this.state.navActive == 0 &&
                                    <KaHangPageItem   statusFlag="0" onClickRemainBtn={(PlanNO)=>this.loadPreview(PlanNO)}/>
                                }
                        </View>
                        <View key="2">
                        {   this.state.navActive == 1 &&
                                    <KaHangPageItem   statusFlag="1" onClickRemainBtn={(PlanNO)=>this.loadPreview(PlanNO)}/>
                                }
                        </View>
                        <View key="3">
                        {   this.state.navActive == 2 &&
                                    <KaHangPageItem  statusFlag="2"  onClickRemainBtn={(PlanNO)=>this.loadPreview(PlanNO)}/>
                                }
                        </View>
                    </ViewPager>
               
            </View>


            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                     this.setState({ modalVisible: false });
                }}
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.6)",flex:1,justifyContent:"space-around",alignItems:"center"}}>
                    <View>
                        <View style={styles.modalBox}>

                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={modelTopColor} style={styles.headBox}>
                                 <Image style={styles.smallogo} source={i18n.locale=="zh"?require('../assets/zh/Routelogo.png'):require('../assets/en/Routelogo.png')}/>
                                <Text style={styles.PlanNO}>{i18n.t('PlanNumber')}:{this.state.modalData.PlanNO}</Text>
                                <Text style={styles.Info}>{i18n.t('total')} {this.state.modalData.LineCount}{i18n.t('sites')}，{i18n.t('Finished')} {this.state.modalData.FinishedCount}{i18n.t('sites')}，{i18n.t('remain')}{this.state.modalData.SurplusCount}{i18n.t('sites')}</Text>
                          </LinearGradient>

                    

                            <View style={styles.bottomContainer}>
                                <ScrollView style={{maxHeight:600*uW}} showsVerticalScrollIndicator={false}>

                                {this.state.modalData.LineList.map((item,index)=>(
                                        <View style={styles.lineItemBox} key={index}>
                                            <Text style={[styles.ItemText,{color:this.getPriviewColor(item.Status)}]}>{this.getPriviewText(item.Status)}</Text>
                                            <View  style={[styles.ItemDot,{backgroundColor:this.getPriviewColor(item.Status)}]}>
                                                <Text style={styles.ItemDotText}>{index+1}</Text>
                                                {index<this.state.modalData.LineList.length-1 && <View style={styles.ItemLine}/>}
                                            </View>
                                            <View>
                                                <Text numberOfLines={1} style={styles.lineTitle}>{item.AreaName}</Text>
                                                <Text numberOfLines={3} style={styles.lineSubTitle}>{item.Address}</Text>
                                            </View>

                                        </View>
                                    ))
                                    }

                                </ScrollView>

                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{  this.setState({ modalVisible: false }); }}>
                            <Image style={styles.Close} source={require('../assets/zh/RouteClose.png')}/>
                        </TouchableOpacity>
                    </View>

                </View>


            </Modal>


        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme,
    previews:state.kahang.previews
});

const mapDispatchToProps = dispatch => ({
    onLoadKaHangPreView:(PlanNO,previews,callback)=>dispatch(actions.onLoadKaHangPreView(PlanNO,previews,callback))
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(KaHangPage);
//样式
const styles = StyleSheet.create({
    lineItemBox:{
        flexDirection:'row',
        alignItems:"flex-start",
        minHeight:(114+46)*uW,
        width:450*uW
    },

    lineTitle:{
        fontSize:28*uW,
        fontWeight:"500",
        color:"#333"
    },
    lineSubTitle:{
        fontSize:24*uW,
        fontWeight:"400",
        color:"#666"
    },


    ItemText:{
        fontSize:20*uW,
        fontWeight:"500",
        // marginRight:14*uW
        width:75*uW
    },

    ItemDot:{
        marginRight:37*uW,
        width:46*uW,
        height:46*uW,
        borderRadius:23*uW

    },

    ItemLine:{
        height:114*uW,
        width:1,
        borderLeftWidth:1,
        borderLeftColor:"#979797",
        borderStyle:"dashed",
        position:'absolute',
        left:22*uW,
        top:46*uW

    },
    ItemDotText:{
        fontSize:26*uW,
        fontWeight:"400",
        lineHeight:46*uW,
        textAlign:"center",
        color:"white"
    },

    Close:{
        width:80*uW,
        height:80*uW,
        marginTop:44*uW,
        marginLeft:(672-80)/2*uW
    },

    bottomContainer:{
        paddingTop:55*uW,
        paddingBottom:45*uW,
        paddingLeft:30*uW,
        paddingRight:30*uW,
        backgroundColor:"#fff",
        borderBottomLeftRadius:20*uW,
        borderBottomRightRadius:20*uW,
    },


    PlanNO:{
        fontSize:32*uW,
        fontWeight:"500",
        lineHeight:45*uW,
        color:"white",
        marginTop:22*uW
    },

    Info:{
        fontSize:26*uW,
        fontWeight:"400",
        lineHeight:27*uW,
        color:"white",
        marginTop:5*uW
    },

    modalBox:{
        width:672*uW,
        // height:450*uW,
        backgroundColor:"white",
        borderRadius:20*uW
    },
    headBox:{
        height:265*uW,
        borderTopLeftRadius:20*uW,
        borderTopRightRadius:20*uW,
        alignItems:'center'
    },

    smallogo:{
        width:98*uW,
        height:98*uW,
        marginTop:36*uW
    },

    rootContainer:{
        flex:1,
        backgroundColor:"#f5f5f5",

    },
    indicatorContainer:{
        alignItems:"center"
    },

    navBox:{
        flexDirection:"row",
        alignItems:'center'
    },



    navItem:{
        fontSize:30*uW,
        fontWeight:"400",
        color:"#999",
        lineHeight:42*uW,
        marginLeft:54*uW
    },

    active:{
        fontSize:34*uW,
        fontWeight:"600",
        color:"#333",
        lineHeight:48*uW,
    }

});
