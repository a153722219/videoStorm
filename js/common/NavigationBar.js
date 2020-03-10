
import React,{Component} from 'react'
import {ViewPropTypes,Text,StatusBar,View,StyleSheet,Platform,DeviceInfo} from 'react-native'
import {PropTypes} from 'prop-types'
const BAR_HEIGHT = 20;

import Globals from '../util/Globals'
const IOS_STATUSBAR_HEIGHT = 44;
const ANDROID_STATUSBAR_HEIGHT = 50;
import {uW} from "../util/screenUtil";

const StatusBarShape = {//状态栏所接受的属性
    barStyle:PropTypes.oneOf(['light-content','default','dark-content']),
    hidden:PropTypes.bool,
    backgroundColor:PropTypes.string
};
 class NavigationBar extends Component{
    //类型检查
    static propTypes = {
        style:ViewPropTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        titleLayoutStyle:ViewPropTypes.style,
        hide:PropTypes.bool,
        rightButton:PropTypes.element,
        statusBar:PropTypes.shape(StatusBarShape),
        leftButton:PropTypes.element,
        titleStyle:PropTypes.object
    }
    static defaultProps ={
        statusBar:{
            barStyle:'light-content',
            hidden:false
        }
    }

    constructor(props){
        super(props)
        //适配安卓低版本
        this.STATUS_BAR_HEIGHT = Globals.Android_SDK_INT && Globals.Android_SDK_INT<19?0:StatusBar.currentHeight;
        this.STATUS_BAR_HEIGHT = Platform.OS==="ios" ? (DeviceInfo.isIPhoneX_deprecated ? 34 : 20) : this.STATUS_BAR_HEIGHT;
    }

    render(){
        let statusBar = !this.props.statusBar.hidden?
        <View style={{height:this.STATUS_BAR_HEIGHT}}>
             <StatusBar {...this.props.statusBar}/>
        </View>:null

        let titleView = this.props.titleView?this.props.titleView :
            <Text ellipsizeMode="head" numberOfLines={1} style={[this.props.titleStyle?this.props.titleStyle:styles.title,{fontSize:36*uW}]}>{this.props.title}</Text>;

        let content = this.props.hide?null:
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>;
        return <View style={[styles.container,this.props.style,{backgroundColor:this.props.style.backgroundColor}]}>
                {statusBar}
                {content}
        </View>
    }

    getButtonElement(button){
        return (<View style={styles.navBarButton}>
            {button?button:null}
        </View>)
    }

}

// const mapStateToProps = state => ({
//     theme: state.theme.theme,
//     nav:state.nav
// });
//
//
// const mapDispatchToProps = (dispatch)=>{
//     return {
//
//     }
// }
//子组件设置了forwardRef:true之后,父组件就可以通过ref获取到子组件的实例,调用子组件的方法或者获取子组件的数据
// export default connect(mapStateToProps,mapDispatchToProps,null,{forwardRef:true})(NavigationBar);
export default NavigationBar


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#2196f3'
    },
    navBarButton:{
        alignItems:"center"
    },
    navBar:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        height:Platform.OS==="ios"?IOS_STATUSBAR_HEIGHT:ANDROID_STATUSBAR_HEIGHT
    },
    navBarTitleContainer:{
        alignItems:"center",
        justifyContent:"center",
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0
    },
    title:{
        fontSize:20,
        color:"white"
    }
})
