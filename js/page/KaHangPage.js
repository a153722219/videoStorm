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
            modalVisible: false
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
        this.viewPager.current.setPage(index)
    }






    goDetail(){
        NavigationUtil.goPage({},'GoTransPage')
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
                    <ViewPager style={{flex:1}} ref={this.viewPager} initialPage={0} onPageSelected={e=>{
                        
                        this.setState({
                            navActive:e.nativeEvent.position
                        })
                    }}>
                        <View key="1">
                            <KaHangPageItem onClickRemainBtn={(id)=>{
                                console.log(id)
                                this.setState({ modalVisible: true });
                            }}/>
                        </View>
                        <View key="2">
                            <KaHangPageItem  onClickRemainBtn={(id)=>{
                                this.setState({ modalVisible: true });
                            }}/>
                        </View>
                        <View key="3">
                            <KaHangPageItem  onClickRemainBtn={(id)=>{
                                this.setState({ modalVisible: true });
                            }}/>
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
                                <Text style={styles.PlanNO}>{i18n.t('PlanNumber')}:T20191128PKLX002</Text>
                                <Text style={styles.Info}>{i18n.t('total')}8{i18n.t('sites')}，{i18n.t('Finished')}2{i18n.t('sites')}，{i18n.t('remain')}6{i18n.t('sites')}</Text>
                          </LinearGradient>

                    

                            <View style={styles.bottomContainer}>
                                <ScrollView style={{maxHeight:600*uW}} showsVerticalScrollIndicator={false}>

                                    {[1,2,3,4,5].map((item,index)=>(
                                        <View style={styles.lineItemBox} key={index}>
                                            <Text style={[styles.ItemText,{color:this.props.theme}]}>{i18n.t('Finished')}</Text>
                                            <View  style={[styles.ItemDot,{backgroundColor:this.props.theme}]}>
                                                <Text style={styles.ItemDotText}>1</Text>
                                                {index<4 && <View style={styles.ItemLine}/>}
                                            </View>
                                            <View>
                                                <Text numberOfLines={1} style={styles.lineTitle}>华盛辉综合楼</Text>
                                                <Text numberOfLines={3} style={styles.lineSubTitle}>广东省深圳市宝安区西乡街道盐田社区盐田街106号</Text>
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
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

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
