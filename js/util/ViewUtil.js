import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text,Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {uW, width} from "../util/screenUtil";
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
});