/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {PureComponent} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,Image} from 'react-native';
//redux
import {connect} from "react-redux";
import {PropTypes} from 'prop-types'
//国际化和适配
import {i18n} from '../i18n/index';
import {uW} from "../util/screenUtil";
import Utils from '../util/Utils'
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'

class KaHangItem extends PureComponent {
    //类型检查
    static propTypes = {
        onClickRemainBtn:PropTypes.func
    }

    static defaultProps ={
        onClickRemainBtn:()=>{
            //VirtualizedList: You have a large list that is slow to update
        }
    }
    constructor(props) {
        super(props);

        this.btnTextMap = {
            "-1":"", 
            "0":i18n.t('goTran'),    
            "1":i18n.t('arrived'),    
            "2":i18n.t('waitLeave'),       
            "3":i18n.t('Leaved'),    
            "4":i18n.t('goLoad'),    
            "5":i18n.t('goOffLoad'),
        }
        

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    };



    render() {

        return <TouchableOpacity activeOpacity={0.8} onPress={this.props.onItemClick.bind(this,this.props.model.PlanNO)}>
        <View style={styles.container}>
                <View style={styles.titleBox}>
                    <View style={styles.titleBox}>
                        <View style={[styles.indent,{backgroundColor:this.props.theme}]}>


                        </View>
                        <Text style={styles.title}>{i18n.t('PlanNumber')}:{this.props.model.ViewPlanNO}</Text>
                    </View>

                    <View style={styles.titleBox}>
                        <Image style={[styles.timeIcon]} source={require('../assets/zh/waitExecTime.png')}/>
                        <Text style={styles.time}>{Utils.parseTime('mm-dd HH:MM',new Date(this.props.model.ModifiedTime))}</Text>
                    </View>

                </View>

                <View style={styles.centerBox}>
                    {/*开始站点*/}
                    <View style={[styles.fxContaner,styles.addressItem]}>
                        <View>
                            <Text style={[styles.dot,{backgroundColor:this.props.theme}]}>{this.props.model.StartSeqNO}</Text>
                        </View>

                        <View style={styles.right}>
                            <Text numberOfLines={1} style={styles.title}>{this.props.model.StartName}</Text>
                            <Text numberOfLines={1} style={[styles.title,{fontSize:24*uW,color:"#999"}]}>{this.props.model.StartAddress}</Text>
                        </View>

                    </View>

                    <Image source={require('../assets/zh/1-8.png')} style={styles.centerDot}/>
                    {/*结束站点*/}
                    <View style={[styles.fxContaner,{marginTop:15*uW}]}>
                        <View style={[styles.fxContaner,styles.addressItem]}>
                            <View>
                                <Text style={[styles.dot,{backgroundColor:"#9f9f9f"}]}>{this.props.model.EndSeqNO}</Text>
                            </View>

                            <View style={styles.right}>
                                <Text numberOfLines={1} style={styles.title}>{this.props.model.EndName}</Text>
                                <Text numberOfLines={1} style={[styles.title,{fontSize:24*uW,color:"#999"}]}>{this.props.model.EndAddress}</Text>
                            </View>

                        </View>


                        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickRemainBtn.bind(this,this.props.model.PlanNO)}>
                            <View style={[styles.remainBox,{borderColor:this.props.theme}]}>
                                <Text style={[styles.remain,{color:this.props.theme}]}>{i18n.t('remain')}{this.props.model.StationCount}{i18n.t('sites')}</Text>
                                <Image
                                    style={styles.remainIcon}
                                    source={i18n.locale==='zh'?require('../assets/zh/remainSite.png'):require('../assets/en/remainSite.png')}
                                />
                            </View>
                        </TouchableOpacity>

                    </View>


                    <View style={styles.line}></View>


                    {/*底部运输车辆 发车时间*/}
                    <View style={styles.fxContaner}>
                        <View>
                            <View style={{flexDirection:"row"}}>
                                <Text style={[styles.blTitleCommom,styles.blTitle]}>{i18n.t('Vehicles')}:</Text>
                                <Text style={[styles.blTitleCommom,styles.blContext]}>{this.props.model.VehicleNo}</Text>
                            </View>
                            <View  style={{flexDirection:"row",marginTop:5*uW}}>
                                <Text style={[styles.blTitleCommom,styles.blTitle]}>{i18n.t('DepartureTime')}:</Text>
                                <Text style={[styles.blTitleCommom,styles.blContext]}>{Utils.parseTime('YY-mm-dd HH:MM',new Date(this.props.model.ExpectSendCarTime))}</Text>
                            </View>
                            {/*异常原因*/}
                            {
                                this.props.model.TransportStatus==2200 &&
                                <View  style={{flexDirection:"row",marginTop:5*uW}}>
                                    <Text style={[styles.blTitleCommom,styles.blTitle,{color:'#E45151'}]}>{i18n.t('AbnormalCauses')}:</Text>
                                    <Text style={[styles.blTitleCommom,styles.blContext]}>{this.props.model.ExceptionInfo}</Text>
                                </View>
                            }

                            

                        </View>
                        {/*装货按钮*/}
                        {
                            this.props.model.OpBtnCode!=-1 &&
                            <TouchableOpacity activeOpacity={0.8}  onPress={this.props.onItemClick.bind(this,this.props.model.PlanNO)}>
                                <Text style={[styles.goLoadBox,{backgroundColor:this.props.theme}]}>
                                    {this.btnTextMap[this.props.model.OpBtnCode]}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>

                    {/*完成，未完成图标*/}
                    {
                        this.props.model.TransportStatus==2100 && <Image style={styles.finishIcon} source={i18n.locale==='zh'?require('../assets/zh/haveFinished.png'):require('../assets/en/Finished.png')}/>
                    }
                    {
                        this.props.model.TransportStatus==2200 && <Image style={styles.finishIcon} source={i18n.locale==='zh'?require('../assets/zh/_FinishedStatus.png'):require('../assets/en/_FinishedStatus.png')}/>
                    }
                       

                </View>



            </View>
       </TouchableOpacity>
    }

}

const mapStateToProps = state => ({
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(KaHangItem);
//样式
const styles = StyleSheet.create({
    finishIcon:{
        position:"absolute",
        width:220*uW,
        height:172*uW,
        right:24*uW,
        bottom:20*uW

    },


    goLoadBox:{
        height:70*uW,
        borderRadius:35*uW,
        fontSize:30*uW,
        color:"white",
        textAlign:"center",
        fontWeight:"400",
        lineHeight:70*uW,
        paddingLeft:37*uW,
        paddingRight:37*uW,
    },

    fxContaner:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    line:{
        height:1,
        backgroundColor:"#E5E5E5",
        marginTop:60*uW,
        marginBottom:27*uW
    },

    blTitleCommom:{
        fontSize:26*uW,
        fontWeight:"400",
        lineHeight:37*uW
    },

    blTitle:{
        color:"#999"
    },
    blContext:{
        color:"#333",
        marginLeft:15*uW,

    },

    remainBox:{
        height:48*uW,
        borderRadius:26*uW,
        borderWidth:1,
        borderStyle:"solid",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        paddingLeft:18*uW,
        paddingRight:18*uW,
    },

    remain:{
        fontWeight:"400",
        fontSize:24*uW,
        paddingRight:5*uW
    },
    remainIcon:{
        width:9*uW,
        height:16*uW,
    },
    addressItem:{
        width:462*uW
    },

    centerBox:{
        paddingTop:52*uW,
        paddingLeft:40*uW,
        paddingRight:40*uW,
        paddingBottom:35*uW
    },

    centerDot:{
        width:10*uW,
        height:25*uW,
        margin:10*uW,
        marginLeft:23*uW
    },

    dot:{
        color:"white",
        width:56*uW,
        height:56*uW,
        borderRadius:28*uW,
        fontWeight:"600",
        fontSize:28*uW,
        textAlign:"center",
        lineHeight:56*uW
    },

    right:{
        width:384*uW
    },

    container:{
        backgroundColor:"white",
        // height:552*uW,
        paddingTop:50*uW,
        marginTop:30*uW,

    },
    titleBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingLeft:16*uW,
        paddingRight:16*uW
    },
    indent:{
        width:8*uW,
        height:24*uW
    },
    title:{
        color:"#333",
        fontWeight:"500",
        fontSize:28*uW,
        marginLeft:16*uW
    },
    timeIcon:{
        width:24*uW,
        height:24*uW
    },
    time:{
        color:"#999",
        fontWeight:"400",
        fontSize:28*uW,
        marginLeft:16*uW
    }

});
