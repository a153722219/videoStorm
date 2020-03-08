/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,Image,TouchableOpacity} from 'react-native';
//redux
import {connect} from "react-redux";
//导航栏
import NavigationBar from '../common/NavigationBar';
//国际化和适配
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";
import ImagePicker from 'react-native-image-picker';
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
import  setStatusBar from '../common/setStatusBar'

//图片选择器参数设置
const options = {
    title: '请选择图片来源',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'从相册选取',
    // customButtons: [
    //     {name: 'customButtons', title: '自定义按钮图片'},
    // ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

@setStatusBar({
    barStyle: 'dark-content',
    translucent: true
})
class UploadPodPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });

        this.state={
            ImgList:[]
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }


    //选择照片按钮点击
    choosePic() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('用户取消了选择！');
            }
            else if (response.error) {
                alert("ImagePicker发生错误：" + response.error);
            }
            else if (response.customButton) {
                alert("自定义按钮点击：" + response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                let newArr = this.state.ImgList;
                newArr.push({
                    imgSource:source
                });
                this.setState({
                    ImgList: newArr
                });
            }
        });
    }

    deleteImg(index){
        let newArr = this.state.ImgList;
        newArr.splice(index,1);
        this.setState({
            ImgList: newArr
        });
    }


    render() {

        let navigationBar =
            <NavigationBar
                title={i18n.t('uploadPOD')}
                statusBar={{}}
                titleStyle={{color:"#000",fontSize:20}}
                style={{backgroundColor: '#fff'}}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),"#000")}
            />

        return <View style={{flex:1}}>
            {navigationBar}
            <Text style={styles.orderNoBox}>
                {i18n.t("orderNo")}:T20191128PKLX002
            </Text>
            <Text style={styles.Count}>
                ({this.state.ImgList.length}/5)
            </Text>

            <View style={styles.ImgsContainer}>
                {this.state.ImgList.map((item,index)=>{
                    return <View style={[styles.ImgBox,{marginLeft:index%3===0?0:16*uW,marginTop:index<=2?0:16*uW}]}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Image style={styles.Img} source={item.imgSource}/>
                        </TouchableOpacity>
                        <TouchableOpacity  activeOpacity={0.8} style={styles.removeIcon} onPress={()=>{
                            ViewUtil.showComfirm(this.deleteImg.bind(this,index))
                        }}>
                            <Image style={[styles.removeIcon,styles.IconPosition]} source={i18n.locale=='zh'?require('../assets/zh/删除.png'):require('../assets/en/删除.png')}/>
                        </TouchableOpacity>
                    </View>
                })}


                {
                    this.state.ImgList.length<5 &&
                        <View style={[styles.ImgBox,{marginLeft:this.state.ImgList.length%3===0?0:16*uW,marginTop:this.state.ImgList.length<=2?0:16*uW}]}>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.choosePic.bind(this)}>
                                <Image style={styles.Img} source={require('../assets/zh/上传回单.png')}/>
                            </TouchableOpacity>
                        </View>
                }

            </View>

            <TouchableOpacity style={styles.btnPosition} activeOpacity={0.7}>
                    <Text style={[styles.comfirmBtn,{backgroundColor:this.props.theme}]}>
                        {i18n.t('comfirmUpload')}
                    </Text>
            </TouchableOpacity>



        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(UploadPodPage);
//样式
const styles = StyleSheet.create({
    ImgBox:{
        width:200*uW,
        height:200*uW,
    },
    comfirmBtn:{
        width:670*uW,
        height:80*uW,
        marginLeft:40*uW,
        // position:"absolute",
        // transform:[{translateX:-670*uW*0.5}],
        // bottom:152*uW,
        color:"#fff",
        fontSize:34*uW,
        fontWeight:"400",
        lineHeight:80*uW,
        textAlign:"center",
        borderRadius:40*uW
    },
    btnPosition:{
        position:"absolute",
        bottom:152*uW
    },

    Img:{
        width:200*uW,
        height:200*uW
    },

    removeIcon:{
        width:36*uW,
        height:36*uW,
        position:"absolute",
        top:0,
        left:0
    },

    IconPosition:{
        position:"absolute",
        top:-12*uW,
        left:-8*uW
    },

    Count:{
        paddingTop:22*uW,
        paddingBottom:22*uW,
        paddingRight:46*uW,
        textAlign:'right',
        // height:33*uW,
        color:"#6F6F6F",
        fontSize:24*uW,
        fontWeight:"400",
        lineHeight:33*uW,
    },
    orderNoBox:{
        backgroundColor:"#F5F6F7",
        color:"#6F6F6F",
        fontSize:28*uW,
        fontWeight:"400",
        textAlign:"center",
        lineHeight:74*uW,
        height:74*uW
    },
    ImgsContainer:{
        flexDirection:"row",
        flexWrap:"wrap",
        paddingLeft:56*uW,
        paddingRight:56*uW,
        width:750*uW,
        // justifyContent:"flex-start",
        // alignContent:"flex-start"
    }

});
