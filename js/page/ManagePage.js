/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View,FlatList,ImageBackground,Image,TouchableOpacity,StatusBar} from 'react-native';
import {connect} from "react-redux"
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';

import {i18n} from '../i18n/index';
import {uW} from '../util/screenUtil';
import  setStatusBar from '../common/setStatusBar'

@setStatusBar({
    barStyle: 'dark-content',
    translucent: true,
    backgroundColor: '#fff'
})

class ManagePage extends React.PureComponent{
    static navigationOptions = ({ navigation,navigationOptions}) => {
        const label = i18n.t('Management');
        return {
            tabBarLabel:label,
            statusBarStyle: 'dark-content',
        }
    };


    componentDidMount() {


    }

    componentWillUnmount() {


    }


    constructor(props){
        super(props)

    }

    render() {

        let navigationBar =<NavigationBar
            title={i18n.t('carManage')}
            statusBar={{}} //hidden:true
            style={{backgroundColor: "white"}}
            titleStyle = {{color:"#000",fontSize:20}}
            // rightButton={this.getRightButton()}
            // leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
        />



        return <View style={{flex:1,backgroundColor:'#F9F9F9'}}>
            {navigationBar}
            <TouchableOpacity activeOpacity={0.7} onPress={()=>{
             NavigationUtil.goPage({},'CarListPage')
            }}>
                <ImageBackground style={styles.mCard} source={i18n.locale=='zh'?require('../assets/zh/mCard-bg.png'):require('../assets/en/management.png')}>
                    <View style={styles.iconBox} >
                        <Image style={styles.carIcon} source={require('../assets/zh/mCard-car.png')}>

                        </Image>
                        <View style={styles.dot}></View>
                    </View>
                    <Text style={{fontSize:36*uW,marginTop:45*uW,marginLeft:48*uW,color:'white'}}>
                        {i18n.t("carManage")}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>


        </View>;
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
});
const mapDispatchToProps = dispatch=>({

});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps,mapDispatchToProps)(ManagePage);

const styles = StyleSheet.create({
    mCard:{
        width:702*uW,
        height:212*uW,
        margin:24*uW
    },
    iconBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:51*uW,
        marginLeft:48*uW,
        width:(702-48-48)*uW,
        alignItems:"flex-end"
    },
    carIcon:{
        width:44*uW,
        height:32*uW
    },
    dot:{
        width:24*uW,
        height:8*uW,
        backgroundColor:"white"
    }
});
