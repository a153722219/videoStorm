/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput,Image,FlatList,TouchableOpacity} from 'react-native';
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
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-translucent-modal';
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
import  setStatusBar from '../common/setStatusBar'


const images = [
    {
        props: {
            // headers: ...
            source: require('../assets/Koala.jpg')
        },
    },

    {
        props: {
            // headers: ...
            source: require('../assets/Penguins.jpg')
        },
    },
    // {url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"}

];
@setStatusBar({
    barStyle: 'dark-content',
    translucent: true
})
class PODListPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });
        this.state = {
            index: 0,
            modalVisible: false
        };
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
    _renderItem(){
        return  <TouchableOpacity activeOpacity={0.7} onPress={()=>{
            this.setState({modalVisible: true})}
        }>
            <View style={styles.item}>
                <View style={styles.ImgBox}>
                    <Image style={styles.ImgBox} source={require('../assets/Koala.jpg')}/>
                    <Text style={styles.count}>{i18n.locale=='zh'?`共5张`:"5 Sheets"}</Text>
                </View>

                <View style={{marginLeft:40*uW}}>
                    <Text style={styles.Title}>{i18n.t('orderNo')}：T20191128PKLX002</Text>
                    <Text style={styles.Time}>{i18n.t('uploadPodTime')}：2019-12-08 16:54</Text>

                </View>
            </View>
        </TouchableOpacity>
    }


    render() {

        let navigationBar =
            <NavigationBar
                title={i18n.t('PODRecords')}
                statusBar={{}}
                titleStyle = {{color:"#000",fontSize:20}}
                style={{backgroundColor: "white"}}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),"#000")}
            />

        return <View style={styles.container}>
            {navigationBar}
            <View style={[styles.boxEctra,styles.searchBarBox]}>
                <TextInput  style={[styles.Ipt,styles.searchBarBox]} placeholder={i18n.t('searchByOrder')}/>
            </View>

            <FlatList

                data={[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8}]}
                renderItem={data=>this._renderItem(data)}
                keyExtractor={item=>""+item.id}
            />

            <Modal
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={() => this.setState({modalVisible: false,index:0})}>
                <ImageViewer saveToLocalByLongPress={false} imageUrls={images} index={this.state.index}/>
            </Modal>

        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(PODListPage);
//样式
const styles = StyleSheet.create({
    Title:{
        color:"#333",
        fontSize:28*uW,
        fontWeight:"400",
        marginTop:12*uW
    },

    Time:{
        color:"#a2a2a2",
        fontSize:24*uW,
        fontWeight:"400",
        marginTop:97*uW
    },

    item:{
        marginTop:24*uW,
        height:244*uW,
        backgroundColor:"#fff",
        borderRadius:20*uW,
        paddingLeft:28*uW,
        paddingTop:26*uW,
        paddingBottom:26*uW,
        flexDirection:"row",
        alignItems:"flex-start"
    },

    ImgBox:{
        width:192*uW,
        height:192*uW,
        borderRadius:20*uW,
    },
    count:{
        height:34*uW,
        backgroundColor:"#646464",
        color:"white",
        fontSize:22*uW,
        fontWeight:"400",
        lineHeight:32*uW,
        textAlign:"center",
        paddingLeft:9*uW,
        paddingRight:9*uW,
        paddingTop:2*uW,
        paddingBottom:2*uW,
        position:"absolute",
        borderRadius:17*uW,
        bottom:10*uW,
        right:10*uW
    },

    container:{
        flex:1,
        backgroundColor:"#f5f5f5",

    },
    searchBarBox:{
        width:694*uW,
        height:66*uW,
        borderRadius:40*uW,
        backgroundColor:"#fff",
    },
    boxEctra:{
        marginTop:24*uW,
        marginLeft:28*uW

    },
    Ipt:{
        paddingVertical: 0,
        textAlign:"center"
    }
});
