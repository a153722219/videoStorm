import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text,Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {uW, width} from "../util/screenUtil";
import {i18n} from '../i18n/index';
import Globals from '../util/Globals'
const zhIcon = {
    selected:require('../assets/zh/执行中.png'),
    finished:require('../assets/zh/去运输-执行完毕.png'),
    _finished:require('../assets/zh/去运输-异常完成.png'),
};

const enIcon = {
    selected:require('../assets/en/执行中.png'),
    finished:require('../assets/en/已完成.png'),
    _finished:require('../assets/en/异常完成.png'),
};


export default class ViewUtil{

    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param text 显示的文本
     * @param color 图标着色
     * @param Icons react-native-vector-icons组件
     * @param icon 左侧图标
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getSettingItem(callBack, text, color,  icon, expandableIco) {
        return (
            <TouchableOpacity
                onPress={callBack}
                style={styles.setting_item_container}
            >
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    {icon ?    //如果有图标显示图标,没有图标不显示
                        <Image
                            source={icon}
                            style={{width: 32*uW, height: 16, marginRight: 10 }}
                        /> :
                        <View style={{ opacity: 1, width: 16, height: 16, marginRight: 10, }} />
                    }
                    <Text>{text}</Text>
                </View>
                <Ionicons       //如果传图标显示图标,没有显示右箭头➡️
                    name={expandableIco ? expandableIco : 'ios-arrow-forward'}
                    size={16}
                    style={{
                        marginRight: 10,
                        alignSelf: 'center',
                        color: color || 'black',
                    }} />
            </TouchableOpacity>
        )
    }

    /**
     * 获取我的页面和设置页的Item
     * @param callBack 单击item的回调
     * @param menu @MORE_MENU
     * @param color 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getMenuItem(callBack, menu, color, expandableIco) {
        return ViewUtil.getSettingItem(callBack, menu.name, color, menu.icon, expandableIco)
    }

    static getLeftBackButton(callback,color="white"){
        return (<TouchableOpacity
          style={{padding:8,marginLeft:12}}
          onPress={callback}
        >
              <Ionicons
                 name={'ios-arrow-back'}
                 size={22}
                 style={{color:color}}
              />

        </TouchableOpacity>)
      }

      static getIconButton(callback,icon,style={},w=41,h=41){
        return (<TouchableOpacity
            underlayColor={'transparent'}
            onPress={callback}
          >
            <Image
                source={icon}
                style={[{width: w*uW, height: h*uW},style]}
            />

        </TouchableOpacity>)
      }



    static _genItem(index,noline=false,callback){
        //普通状态的点

        return <TouchableOpacity activeOpacity={0.7} onPress={callback}>
            <View style={[styles.dotItem,{width:noline?48*uW:163*uW}]}>
                <View style={styles.dotItemTop}>
                    {!noline && <View style={styles.dotItemLine}/>}
                    <View style={[styles.dotItemIconBox,styles.dotItemFinshed]}>
                        <View style={[styles.dotItemIcon,{marginTop:9*uW}]}>

                        </View>
                        <Text style={[styles.dotItemNoIndex,{color:"#999",marginTop:14*uW}]}>
                            {index}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    }

    static _genFinishedItem(index,noline=false,callback){
        //完成状态的点
        return <TouchableOpacity activeOpacity={0.7} onPress={callback}>
            <View style={[styles.dotItem,{width:noline?48*uW:163*uW}]}>
                <View style={styles.dotItemTop}>
                    {!noline && <View style={styles.dotItemLine}/>}
                    <View style={[styles.dotItemIconBox,styles.dotItemFinshed]}>
                        <Image style={[styles.dotItemIcon,styles.dotItemFinshed]} source={i18n.locale==='zh'?zhIcon.finished:enIcon.finished}/>


                        <Text style={[styles.dotItemNoIndex,{color:Globals.store.getState().theme.theme}]}>
                            {index}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    }


    static _genSelectedItem(index,noline=false,callback){
        //选中状态的点
        return <TouchableOpacity activeOpacity={0.7} onPress={callback}>
            <View style={[styles.dotItem,{width:noline?48*uW:163*uW}]}>
                <View style={styles.dotItemTop}>
                    {!noline && <View style={styles.dotItemLine}/>}
                    <View style={[styles.dotItemIconBox,styles.dotItemFinshed]}>
                        <Image style={[styles.dotItemIcon,styles.dotItemFinshed]} source={i18n.locale==='zh'?zhIcon.selected:enIcon.selected}/>
                        <Text style={[styles.dotItemNoIndex,{color:Globals.store.getState().theme.theme}]}>
                            {index}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    }
    static _genOddFinishedItem(index,noline=false,callback){
        //完成状态的点
        return <TouchableOpacity activeOpacity={0.7} onPress={callback}>
            <View style={[styles.dotItem,{width:noline?61*uW:163*uW}]}>
                <View style={styles.dotItemTop}>
                    {!noline && <View style={styles.dotItemLine}/>}
                    <View style={[styles.dotItemIconBox,styles.dotItemFinshed,{width:61*uW,borderRadius:0}]}>
                        <Image style={[styles.dotItemIcon,styles.dotItemFinshed,{width:61*uW,borderRadius:0,backgroundColor:"rgba(0,0,0,0)"}]} source={i18n.locale==='zh'?zhIcon._finished:enIcon._finished}/>
                        <Text style={[styles.dotItemNoIndex,{color:Globals.store.getState().theme.theme}]}>
                            {index}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    }







}

const styles = StyleSheet.create({
    setting_item_container: {
        // backgroundColor: 'white',
        // padding: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    dotItem:{
        width:163*uW,
        marginTop:73*uW
    },
    dotItemTop:{
        flexDirection:"row",
        alignItems:"center"
    },
    dotItemIconBox:{
        width:30*uW,
        height:30*uW,
        alignItems:'center'
    },

    dotItemFinshed:{
        width:48*uW,
        height:48*uW,
        borderRadius:24*uW
    },

    dotItemNoIndex:{
        fontSize:30*uW,
        fontWeight:"400",
        marginTop:5*uW
    },

    dotItemIcon:{
        width:30*uW,
        height:30*uW,
        backgroundColor:"#E4EEEC",
        borderRadius:15*uW
    },
    dotItemLine:{
        width:"100%",
        height:6*uW,
        backgroundColor:"#F5F6F7",
        position:'absolute',
        left:0
    },
});