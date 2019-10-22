
import React,{Component} from 'react'
import {ViewPropTypes,Text,StatusBar,View,StyleSheet,Platform} from 'react-native'
import {PropTypes} from 'prop-types'
const BAR_HEIGHT = 20;
const IOS_STATUSBAR_HEIGHT = 44;
const ANDROID_STATUSBAR_HEIGHT = 50;
const StatusBarShape = {//状态栏所接受的属性
    barStyle:PropTypes.oneOf(['light-content','default']),
    hidden:PropTypes.bool,
    backgroundColor:PropTypes.string
}
export default class NavigationBar extends Component{
    //类型检查
    static propTypes = {
        style:ViewPropTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        titleLayoutStyle:ViewPropTypes.style,
        hide:PropTypes.bool,
        rightButton:PropTypes.element,
        statusBar:PropTypes.shape(StatusBarShape),
        leftButton:PropTypes.element
    }
    static defaultProps ={
        statusBar:{
            barStyle:'light-content',
            hidden:false
        }
    }

    render(){
        let statusBar = !this.props.statusBar.hidden?
        <View style={styles.statusBar}>
            <StatusBar {...this.props.statusBar}/>
        </View>:null

        let titleView = this.props.titleView?this.props.titleView :
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>;

        let content = this.props.hide?null:
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>;
        return <View style={[styles.container,this.props.style]}>
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
    },
    statusBar:{
        height:Platform.OS==="ios"?BAR_HEIGHT:0
    }
})