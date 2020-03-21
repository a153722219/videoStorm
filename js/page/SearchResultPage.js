/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,FlatList,Image,RefreshControl,ScrollView,TouchableOpacity} from 'react-native';
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
import actions from '../action'
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
import  setStatusBar from '../common/setStatusBar'
import KaHangItem from '../common/KaHangItem';
import LoadingManager from '../common/LoadingManager';
import api from '../api';
import Globals from '../util/Globals'
import Utils from '../util/Utils'
import DefaultPage from '../common/DefaultPage'
import LinearGradient from 'react-native-linear-gradient';

@setStatusBar({
    barStyle: 'light-content',
    translucent: true
})
class searchResultPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });
        this.state = {
            PlanNO:null,
            isLoad:true,
            list:[],
            modalVisible:false,
            modalData:{
                LineList:[]
            }
        }
    }

    componentDidMount() {
        const {key} = this.props.navigation.state.params
        this.setState({PlanNO:key})
        this.getSearchResultData(key)
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };


    renderListEmptyComponent(){
        if(!this.props.network.haveNet && !this.state.isLoad){
            return <DefaultPage mode="noNet"/>;
        }else if(!this.state.isLoad){
            return <DefaultPage mode="noRec"/>;
        }else{
            return null
        }
    }

    fliState(val){
      if(val==1600 || val == 1700) {
          return 0
      }else if (val==2100 || val==2200){
          return 2
      }else {
          return 1
      }
    }

    getSearchResultData(val){
        const that = this,
        store = Globals.store,
        userName = store.getState().user.currentUserKey.split('_')[1];
        api.search(userName,val).then(res=>{
            const _arr = res.data
            that.setState({list:_arr, isLoad:false})
            
        })
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

    
    renderItem(data){
        // console.log(data)
        return <KaHangItem model={data.item} statusFlag={this.fliState(data.TransportStatus)} 
        onClickRemainBtn={(PlanNO)=>{
            this.loadPreview(PlanNO)     
        }}  
        onItemClick={(PlanNO)=>{
            this.goDetail(PlanNO) 
        }}>
        </KaHangItem>
    }


    goDetail(PlanNO){
        LoadingManager.show();
        this.props.onLoadKaHangDetail(PlanNO,this.props.kahang.details,res=>{
            LoadingManager.close();
            if(res.code==600){
                NavigationUtil.goPage({model:res.data,statusFlag:1},'GoTransPage')
           
            }else{
                alert(res.msg || "加载失败")
            }
        },0)
      
    }
   

    //物理返回键
    onBackPress(){
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    render() {
        const modelTopColor = i18n.locale=="zh"?['#18C1BD', '#008680']:['#F7B322', '#EE7622']

        let navigationBar =  <NavigationBar
                title={i18n.t('searchResult')}
                statusBar={{}}
                style={{backgroundColor: "white"}}
                titleStyle = {{color:"#000",fontSize:20}}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
            />

        return <View style={{flex:1,'backgroundColor':'#F5F6F7'}}>
            {navigationBar}
            <FlatList
                style={{
                    flex:1,
                    minWidth:"100%",
                    marginTop: 12 * uW
                }}
                ListEmptyComponent={()=>this.renderListEmptyComponent()}
                data={this.state.list}
                renderItem={data=>this.renderItem(data)}
                refreshControl={
                    <RefreshControl
                        title="loading"
                        titleColor="red"
                        colors={["red"]}
                        refreshing={this.state.isLoad}
                        onRefresh={()=>{this.getSearchResultData(this.state.PlanNO)}}
                        tintColor="red"
                    />
                }

            > 
            </FlatList>
            
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
    network:state.network,
    kahang:state.kahang,
    previews:state.kahang.previews
});

const mapDispatchToProps = dispatch => ({
    onLoadKaHangPreView:(PlanNO,previews,callback)=>dispatch(actions.onLoadKaHangPreView(PlanNO,previews,callback)),
    onLoadKaHangDetail:(PlanNO,details,callback,type)=>dispatch(actions.onLoadKaHangDetail(PlanNO,details,callback,type))
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(searchResultPage);
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
