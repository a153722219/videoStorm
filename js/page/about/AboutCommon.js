import React, {Component} from 'react';
import config from '../../res/data/config.json'
import { DeviceInfo, View, Text, Image, Dimensions, StyleSheet, Platform } from "react-native";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import NavigationUtil from "../../navigator/NavigationUtil";
import GlobalStyles from '../../res/styles/GlobalStyles'    //下拉放大头部view
import ViewUtil from "../../util/ViewUtil";
import BackPressComponent from "../../common/BackPressComponent";
/**
 * 安卓物理返回键处理
 */
const THEME_COLOR = '#678';
//关于页面还是关于我的页面
export const FLAG_ABOUT = { flag_about: 'about', flag_about_me: 'about_me' };
export default class AboutCommon{
    constructor(props,updateState){
        this.props=props;
        this.updateState = updateState;
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });
        //本地加载配置
        // this.updateState({
        //     data:config
        // })
    }


    //物理返回键
    onBackPress(){
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    componentDidMount() {
       this.backPress.componentDidMount();
       //http://www.devio.org/io/GitHubPopular/json/github_app_config.json
        fetch('http://www.devio.org/io/GitHubPopular/json/github_app_config.json').then(res=>{
            if(res.ok){
                return res.json();
            }
            throw new Error('NewWork error')
        }).then(config=>{
            if(config){
                this.updateState({
                    data:config
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    componentWillUnmount() {
       this.backPress.componentWillUnmount();
    }

    onShare(){

    }

    getParallaxRenderConfig(params){
        let avatar = typeof (params.avatar) === 'string' ? { uri: params.avatar } : params.avatar;

        let config = {};
        config.renderBackground = ()=>(
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }} />
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }} />
            </View>
        );
        //前景
        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar}
                       source={avatar} />
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>
        );

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
                {ViewUtil.getShareButton(() => this.onShare())}
            </View>
        );

        return config
    }


    render(contentView,params){
        const renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                backgroundColor={THEME_COLOR}                           //背景色
                contentBackgroundColor={GlobalStyles.backgroundColor}   //内容背景色
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}           //内容高度
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}               //能上拉到的最小高度
                backgroundScrollSpeed={10}                              //背景相对于前景移动的速度
                {...renderConfig}>
                {contentView}
            </ParallaxScrollView>
        )
    }
}
const window = Dimensions.get('window');
const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 0;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        alignItems: 'center',
        paddingTop: TOP
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: TOP
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50
    },
    avatar: {
        width:AVATAR_SIZE,
        height:AVATAR_SIZE,
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5,
        marginBottom: 10
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
});