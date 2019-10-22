import React,{Component} from 'react'
import {Modal,Text,View,StyleSheet,TouchableOpacity,DeviceInfo} from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import TimeSpan from '../mo/TimeSpan'
export const TimeSpans = [
    new TimeSpan("今天",'since=daily'),
    new TimeSpan("本周",'since=weekly'),
    new TimeSpan("本月",'since=monthly')
];
export default class TrendingDialog extends Component{
    //初始化state
        state = {
            visible:false
        }

        show(){
            this.setState({
                visible:true
            })
        }

        dismiss(){
            this.setState({
                visible:false
            })
        }
        render(){
            const {onClose,onSelect} = this.props;
            return (
                <Modal
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={()=>onClose}
                >
                    <TouchableOpacity
                        style={styles.container}
                        onPress={()=>this.dismiss()}
                    >
                        <MaterialIcons
                            name={'arrow-drop-up'}
                            size={36}
                            style={styles.arrow}
                        />
                        <View style={styles.content}>
                            {TimeSpans.map((result,i,arr)=>{
                                return <TouchableOpacity
                                    onPress={()=>onSelect(arr[i])}
                                    underlayColor='transparent'
                                >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{arr[i].showText}</Text>
                                    </View>
                                     {/* 下划线 */}
                                     {i!==TimeSpans.length-1?
                                            <View style={styles.line}></View>
                                             :null}
                                </TouchableOpacity>
                            })}
                        </View>

                    </TouchableOpacity>

                </Modal>
            )
        }
}

const styles = StyleSheet.create({
    line:{
        height:0.5,
        backgroundColor:'darkgray'
    },

    text:{
        color:"black",
        fontSize:16,
        fontWeight:"400",
        padding:8,
        paddingLeft:26,
        paddingRight:26
    },

    textContainer:{
        alignItems:"center",
        flexDirection:"row"
    },
    arrow:{
        marginTop:40,
        color:'white',
        padding:0,
        margin:-15
    },
    container:{
        backgroundColor:"rgba(0,0,0,0.6)",
        flex:1,
        alignItems:'center',
        paddingTop:DeviceInfo.isIPhoneX_deprecated?30:0
    },
    content:{
        backgroundColor:"white",
        borderRadius:3,
        paddingTop:3,
        paddingBottom:3,
        marginRight:3
    }
})