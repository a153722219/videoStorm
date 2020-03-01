/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,DeviceInfo, StyleSheet, Text, View,ImageBackground,Image,TouchableOpacity,TextInput,Button} from 'react-native';
import {StatusBar} from 'react-native';
//redux
import {connect} from "react-redux";
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";

class WelcomePage extends Component{
    componentDidMount(){
      
      // NavigationUtil.resetToHomePage({
      //     navigation:this.props.navigation
      // })
      //APP欢迎页 不需要可以注释掉timer
    // this.timer=setTimeout(()=>{
    //     // const {navigation} = this.props;
    //     NavigationUtil.resetToHomePage({
    //       navigation:this.props.navigation
    //     })
    // },1000)
  }

  constructor(props){
    super(props);
    this.state = {
      active:0
    }
  }

  componentWillUnmount(){
    // this.timer && clearTimeout(this.timer);
  }
  
  static language = ['中文','English']


  render() {

    return (
      <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}}>
        <StatusBar hidden={true}/>
        <ImageBackground source={require('../assets/zh/signIn-bg.png')} style={styles.bg}>
          <View style={styles.logoBox}>
            <Image
              style={styles.logoImg}
              source={require('../assets/zh/logo.png')}
            />
          </View>
        </ImageBackground>

        <View style={styles.main}>
          <Text style={styles.title}>欢迎,</Text>
          <Text style={styles.subtitle}>来到星云移动</Text>
          <View style={styles.language}>
            {WelcomePage.language.map((item,index)=>{
              return <TouchableOpacity  key={index}    onPress={()=>{    
                this.setState({active:index})    
              }}>
                <Text style={[index==this.state.active?styles.activeItem:'',styles.item]}>{item}</Text>
              </TouchableOpacity>
            })}
          </View>
        </View>

        <View style={styles.main}>
          <TextInput
            placeholder={'请输入账号'}
            placeholderTextColor="#CFCFCF"
            underlineColorAndroid = "#E2E2E2"
          />
          <TextInput
            style={{marginTop:50 * uW}}
            placeholder={'请输入密码'}
            secureTextEntry={true}
            placeholderTextColor="#CFCFCF"
            underlineColorAndroid = "#E2E2E2"
          />
         <TouchableOpacity style={{marginTop:240 * uW}}>
           <Text style={[styles.myBtn,{backgroundColor:this.props.theme}]}>登录</Text>
         </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}


const mapStateToProps = state => ({
  nav: state.nav,
  theme: state.theme.theme
});

const mapDispatchToProps = dispatch=>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);

const styles = StyleSheet.create({
  bg:{
    width:100+'%',
    height:365 * uW
  },
  logoBox:{
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop:235 * uW
  },
  logoImg:{
    width:280 * uW,
    height:74 * uW,
  },
  main:{
    marginTop:56 * uW,
    marginLeft:78 *uW,
    marginRight:78 *uW,
    position:'relative'
  },
  title:{
    fontSize:60 * uW,
    fontWeight:('bold', '700'),
  },
  subtitle:{
    fontSize:40 * uW,
    marginTop:12 * uW,
    color:'#6D6D6D'
  },
  language:{
    position:'absolute',
    right:0,
    bottom:0,
    width:190 * uW,
    height:50 * uW,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    fontSize:20* uW,
    backgroundColor:'#F2F2F2',
    paddingLeft:6 * uW,
    paddingRight: 6 * uW,
    borderRadius:10* uW,
    color:'#333'
  },
  item:{
    width:86 * uW,
    height:40 * uW,
    borderRadius:8* uW,
    textAlign:'center',
    lineHeight:40 * uW
  },
  activeItem:{
    backgroundColor:'#fff'
  },
  myBtn:{
    height:90 *uW,
    width:100+'%',
    borderRadius:90 * uW,
    color:'#fff',
    textAlign:'center',
    lineHeight:90 * uW,
    fontSize:34 *uW,
   

  }
 
});
