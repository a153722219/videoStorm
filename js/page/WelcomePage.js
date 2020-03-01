/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,DeviceInfo, StyleSheet, Text, View,ImageBackground,Image,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import {StatusBar} from 'react-native';
//redux
import {connect} from "react-redux";
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";
import actions from '../action/index'
class WelcomePage extends Component{
  componentDidMount(){
        // i18n.locale = 'zh'
  }

  constructor(props){
    super(props);

      if(this.props.theme=="#EF7622"){
          i18n.locale = 'en'
      }else{
          i18n.locale = 'zh'
      }
      console.log(i18n.locale)
      EventBus.getInstance().fireEvent(EventTypes.LANGUAGE_REFRESH)

      this.state = {
        active:i18n.locale=="zh"?0:1
      }
  }

  componentWillUnmount(){
   
    // this.timer && clearTimeout(this.timer);
  }
  
  static language = ['中文','English']


  render() {

    return (
      <ScrollView>
        <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}}>
          <StatusBar hidden={true}/>
          <ImageBackground source={i18n.locale=='zh'?require('../assets/zh/signIn-bg.png'):require('../assets/en/signIn-bg.png')} style={styles.bg}>
            <View style={styles.logoBox}>
              <Image
                style={i18n.locale=='zh'?styles.logoImgZh:styles.logoImgEn}
                source={i18n.locale=='zh'?require('../assets/zh/logo.png'):require('../assets/en/YunFreight.png')}
              />
            </View>
          </ImageBackground>

          <View style={styles.main}>
            <Text style={styles.title}>{i18n.t('welCome')}</Text>
            <Text style={styles.subtitle}>{i18n.t('welComeToXY')}</Text>
            <View style={styles.language}>
              {WelcomePage.language.map((item,index)=>{
                return <TouchableOpacity  key={index}    onPress={()=>{    
                  this.setState({active:index})   
              
                  if(index==0){
                    i18n.locale = 'zh'; 
                    this.props.onThemeChange("#008385");
                    EventBus.getInstance().fireEvent(EventTypes.LANGUAGE_REFRESH)
                  } else {
                    i18n.locale = 'en'
                    this.props.onThemeChange("#EF7622");
                    EventBus.getInstance().fireEvent(EventTypes.LANGUAGE_REFRESH)
                  } 
                }}>
                  <Text style={[index==this.state.active?styles.activeItem:'',styles.item]}>{item}</Text>
                </TouchableOpacity>
              })}
            </View>
          </View>

          <View style={styles.main}>
            <TextInput
              placeholder={i18n.t('userIpt')}
              placeholderTextColor="#CFCFCF"
              underlineColorAndroid = "#E2E2E2"
            />
            <TextInput
              style={{marginTop:50 * uW}}
              placeholder={i18n.t('passwordIpt')}
              secureTextEntry={true}
              placeholderTextColor="#CFCFCF"
              underlineColorAndroid = "#E2E2E2"
            />
            <TouchableOpacity style={{marginTop:240 * uW}} onPress={()=>{
                NavigationUtil.resetToHomePage({
                    navigation:this.props.navigation
                })
               }}>
              <Text style={[styles.myBtn,{backgroundColor:this.props.theme}]}>{i18n.t('login')}</Text>
              <Text style={styles.forget}>{i18n.t('forget')}</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text  style={[styles.forget,{ marginTop:287 * uW } ]}>{i18n.t('copyright')}</Text>
          </View>
          
        </View>
      </ScrollView>
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
  logoImgZh:{
    width:320 * uW,
    height:80 * uW
  },
  logoImgEn:{
    width:320 * uW,
    height:68 * uW
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
    lineHeight:40 * uW,
    fontSize:22*uW
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
  },
  forget:{
    fontSize:26 * uW,
    color:'#BFBFBF',
    textAlign:'center',
    marginTop:33 * uW,
  }
 
});
