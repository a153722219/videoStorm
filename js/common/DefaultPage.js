/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,Image} from 'react-native';
//导航栏
//国际化和适配
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";

class DefaultPage extends Component {

    constructor(props) {
        super(props);
       
    }



    render() {
        return <View style={{flex:1,alignItems:"center",justifyContent:"space-around",marginTop:250*uW}}>
            <View>
                {this.props.mode=="noNet" && <Image style={styles.img} source={require('../assets/zh/Nonetwork.png')}/>}
                {this.props.mode=="noRec" && <Image style={styles.img} source={require('../assets/zh/norecord.png')}/>}
                {this.props.mode=="noOdr" && <Image style={styles.img} source={require('../assets/zh/Noorder.png')}/>}

                {this.props.mode=="noNet" && <Text style={styles.text}>{i18n.t('NoNetwor')}</Text>}
                {this.props.mode=="noRec" && <Text style={styles.text}>{i18n.t('NoRecord')}</Text>}
                {this.props.mode=="noOdr" && <Text style={styles.text}>{i18n.t('NoOrder')}~</Text>}
                
            </View>
           
        </View>;
    }

}


export default DefaultPage
//样式
const styles = StyleSheet.create({
    img:{
        width:550*uW,
        height:290*uW
    },
    text:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#7e7e7e",
        marginTop:40*uW,
        textAlign:"center"
    }
});
