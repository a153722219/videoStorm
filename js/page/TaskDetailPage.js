/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,ScrollView,Image,TouchableOpacity,FlatList} from 'react-native';
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
class TaskDetailPage extends Component {

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

    _genLinesInfoItem(data){
        //  console.log(data.item)
        return <View style={styles.LinesInfoBox}>
            {data.index===0 && <View style={styles.titleView}>
                <View style={styles.titleInfo}>
                    <View style={[styles.dot,{backgroundColor:this.props.theme}]}>

                    </View>
                    <Text style={styles.title}>
                        {i18n.t('stationInfo')}
                    </Text>
                </View>
            </View>}
            <View style={styles.addressBox}>
                 {/*#F8B422  另一种颜色*/}
                <View style={[styles.DotBox,{backgroundColor:data.item.LoadingConfirmStr?this.props.theme:"#F8B422"}]}>
                    <Text style={styles.DotIndex}>{data.index+1}</Text>
                </View>

                <View style={styles.addressInlineBox}>
                    <Text style={styles.Bigtitle}>
                        {data.item.PointName}
                    </Text>
                    <Text style={[styles.desc,{width:550*uW}]} numberOfLines={3}>
                        {data.item.PointAddress}
                    </Text>
                </View>
            </View>

            
                
                {
                    data.item.LoadingConfirmStr!="" &&
                    <View style={styles.descBox}>
                        <Image style={styles.Icon} source={require("../assets/zh/Load.png")}/>
                        <Text style={styles.value}>{data.item.LoadingConfirmStr}</Text>
                    </View>
                }

                {
                data.item.LoadingConfirmStr=="" &&
                    <View style={styles.descBox}>
                        <Image style={styles.Icon} source={require("../assets/zh/offLoad.png")}/>
                        <Text style={styles.value}>{data.item.CheckInConfirmStr}</Text>
                    </View>
                }
                    
                
                

               
            

            <View style={{marginTop:14*uW,height:312*uW,justifyContent:"space-between"}}>
                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('orderNo')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        {data.item.WaybillNOs}
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('requireArrTime')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                            {data.item.ExpectArriveTimeStart}
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('requireLeaveTime')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        {data.item.ExpectLeaveTimeStart}
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('realArrTime')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        {data.item.RealArriveTime || "-"}
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('realLeaveTime')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        {data.item.RealLeaveTime || "-"}
                    </Text>
                </View>




            </View>



        </View>
    }



    render() {

        let navigationBar =
            <NavigationBar
                title={i18n.t('TranDetail')}
                statusBar={{}}
                style={{backgroundColor: "#fff"}}
                titleStyle={{color:"#000",fontSize:20}}
                rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),"#000")}
            />

        return <View style={styles.rootContainer}>
            {navigationBar}

            <ScrollView style={{flex:1}}>
                <TaskBaseInfo showDetail={false} model={this.model}/>

                <FlatList

                    data={this.model.LineList}
                    renderItem={data=>this._genLinesInfoItem(data)}
                    keyExtractor={(item,index)=>""+index}
                />


            </ScrollView>

        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailPage);
//样式
const styles = StyleSheet.create({
    value:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#333"
    },

    titleDot:{
        width:10*uW,
        height:10*uW,
        borderRadius:5*uW,
        backgroundColor:"#d8d8d8",
        marginRight:15*uW
    },

    key:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#999"
    },

    Icon:{
        width:38*uW,
        height:38*uW,
        marginRight:20*uW
    },
    descBox:{
        borderStyle:"solid",
        borderTopWidth:2*uW,
        borderBottomWidth:2*uW,
        height:78*uW,
        flexDirection:"row",
        alignItems:"center",
        borderColor:"#e5e5e5",

    },

    addressBox:{
        flexDirection:"row",
        alignItems:"flex-start",
        marginTop:40*uW,
        marginBottom:40*uW
    },

    addressInlineBox:{
        paddingTop:10*uW
    },

    DotBox:{
        width:60*uW,
        height:60*uW,
        borderRadius:30*uW,
        marginRight:24*uW
    },

    Bigtitle:{
        fontSize:32*uW,
        fontWeight:"500",
        color:"#333"
    },

    desc:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#666",
        marginTop:8*uW,
    },

    DotIndex:{
        color:"white",
        lineHeight:60*uW,
        textAlign:"center",
    },

    LinesInfoBox:{
        backgroundColor:"white",
        marginTop:24*uW,
        padding:30*uW,
        paddingLeft:40*uW,
        paddingRight:40*uW

    },
    titleView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    titleInfo:{
        flexDirection:"row",
        alignItems:"center"
    },
    dot:{
        width:8*uW,
        height:26*uW,
        marginRight:14*uW
    },
    title:{
        fontSize:30*uW,
        fontWeight:"400",
        color:"#333"
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
        backgroundColor:"#f5f5f5",
        paddingBottom:25*uW
    },
    navBtnBox:{
        flexDirection:"row",
        alignItems:"center",
        marginRight:36*uW
    },


});
