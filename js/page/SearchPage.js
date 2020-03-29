/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,Image,TextInput,Alert} from 'react-native';
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
import ViewUtil from '../util/ViewUtil';
import  setStatusBar from '../common/setStatusBar'
import AsyncStorage from '@react-native-community/async-storage'
@setStatusBar({
    barStyle: 'light-content',
    translucent: true,

})
class SearchPage extends Component {

    constructor(props) {
        super(props);
        const phone = this.props.user.currentUserKey.substr(5)
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });

        this.state = {
            searchTxt:'',
            phone:phone,
            list:[]
        }
    }

    componentDidMount() {
        const that = this;
        AsyncStorage.getItem( `list_${this.state.phone}`,(err,result)=>{
            if(result){
               const storeList = JSON.parse(result)
               that.setState({list:storeList})
            }
        })
        this.backPress.componentDidMount();
        // this.TextInput && this.TextInput.focus()
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    getSearchIpt(){
        return <View style={styles.IptBox}>
            <View style={styles.searchIpt}>
                <Image style={styles.icon} source={require('../assets/zh/searchOrder.png')}></Image>
                <TextInput
                    placeholderTextColor="#CFCFCF"
                    style={styles.Ipt}
                    value={this.state.searchTxt}
                    autoFocus={true}
                    returnKeyType="search"
                    keyboardType = 'phone-pad'
                    placeholder={i18n.t('searchPlaceHolder')}
                    ref={TextInput => this.TextInput = TextInput}
                    onSubmitEditing={()=>{
                        if(!this.props.network.haveNet){
                            Alert. alert(i18n.t('tips'),i18n.t('networkAnomaly'),[{text:i18n.t('Yes')}])
                            return 
                        }
                  
                        const listName = `list_${this.state.phone}` 
                        this.state.list.push(this.state.searchTxt)
                        AsyncStorage.setItem(listName,JSON.stringify(this.state.list),()=>{})
                        NavigationUtil.goPage({key:this.state.searchTxt},'SearchResultPage')
                    }}
                    onChangeText={(val)=>{
                        this.setState({searchTxt:val})
                    }}
                />
            </View>
            {this.state.searchTxt!=='' && 
                <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                    this.setState({searchTxt:''})
                }} style={{position:'absolute',right:'15%',height:'100%'}}> 
                    <Text><Image style={{width:40* uW , height:40* uW}} source={require('../assets/close.png')}></Image> </Text>
                </TouchableOpacity>}
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.onBackPress()}>
                <Text style={[styles.cancel,{marginLeft:i18n.locale=="zh"?28*uW:15*uW}]}>{i18n.t('cancel')}</Text>
            </TouchableOpacity>
        </View>
    }


    render() {
       
        let navigationBar =
            <NavigationBar
                // title={'页面'}
                statusBar={{}}
                style={{backgroundColor: this.props.theme}}
                // rightButton={this.getRightButton()}
                leftButton={this.getSearchIpt()}
            />

        return <View >
            {navigationBar}
            <View style={styles.container}>
                <Text style={styles.searchTitle}>{i18n.t('searchHistory')}</Text>
                <View style={[styles.itemBox,{paddingLeft:-20 * uW}]}>
                  {this.state.list==[]?<Text></Text>:this.state.list.map((item,index)=>{
                      return <TouchableOpacity key={index} activeOpacity={0.5} onPress={()=>{
                        if(!this.props.network.haveNet){
                            Alert. alert(i18n.t('tips'),i18n.t('networkAnomaly'),[{text:i18n.t('Yes')}])
                            return 
                        }
                            this.setState({searchTxt:item.toString()})
                            setTimeout(()=>{
                                NavigationUtil.goPage({key:this.state.searchTxt},'SearchResultPage')
                            },600)
                      }}>
                            <Text style={[styles.item,{marginLeft:20 * uW}]} numberOfLines={1}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    })} 
                </View>
                
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                    const listName = `list_${this.state.phone}`
                    this.setState({list:[]})
                    AsyncStorage.setItem(listName,'')
                }}>
                    <Text style={styles.clearBtn}>
                        {i18n.t('clearBtn')}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>;
    }

}

const mapStateToProps = state => ({
    user: state.user,
    nav: state.nav,
    theme: state.theme.theme,
    network:state.network,
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
//样式
const styles = StyleSheet.create({
    container:{
        padding:36*uW
    },
    clearBtn:{
        width:596*uW,
        height:80*uW,
        borderRadius:40*uW,
        borderWidth:1,
        borderColor:'#D6D6D6',
        borderStyle:'solid',
        textAlign:'center',
        lineHeight:80*uW,
        marginLeft:41*uW,
        marginTop:120*uW
    },

    searchTitle:{
        width:122*uW,
        height:40*uW,
        fontSize:28*uW,
        fontWeight:"500"
    },

    itemBox:{
        flexDirection:'row',
        justifyContent:"flex-start",
        flexWrap:'wrap',

    },
    item:{
        maxWidth:293*uW,
        marginTop:20*uW,
        alignItems:'center',
        // marginLeft:30*uW,
        borderRadius:30*uW,
        paddingTop:14*uW,
        paddingBottom:14*uW,
        paddingLeft:36*uW,
        paddingRight:36*uW,
        backgroundColor:'rgba(245,246,247,1)'
    },

    IptBox:{
        position:'relative',
        flexDirection:'row',
        alignItems:'center'
    },
    icon:{
        width:31*uW,
        height:31*uW,
        marginLeft:29*uW,
    },
    Ipt:{
        width:530*uW,
        height:100+'%',
        paddingVertical: 0
    },
    searchIpt:{
        width:602*uW,
        height:66*uW,
        backgroundColor:'white',
        borderRadius:38*uW,
        marginLeft:36*uW,
        flexDirection:'row',
        alignItems:'center'
    },
    cancel:{
        // marginLeft:28*uW,
        fontSize:28*uW,
        fontWeight:"400",
        color:'#fff',
        
    }

});
