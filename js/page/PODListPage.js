/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput,Image,FlatList,RefreshControl,TouchableOpacity,ActivityIndicator,Alert} from 'react-native';
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
import actions from '../action'
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-translucent-modal';
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
import  setStatusBar from '../common/setStatusBar'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import DefaultPage from '../common/DefaultPage'


// let images = [
//     {
//         props: {
//             // headers: ...
//             source: require('../assets/Koala.jpg')
//         },
//     },

//     {
//         props: {
//             // headers: ...
//             source: require('../assets/Penguins.jpg')
//         },
//     },
//     // {url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"}
// ];
@setStatusBar({
    barStyle: 'dark-content',
    translucent: true,
    planNo:null
})
class PODListPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });
        const Phone = props.user.currentUserKey.split("_")[1];
        let items = props.podList["items_"+Phone];
        this.items = items?items:[];
        this.state = {
            index: 0,
            modalVisible: false,
            order:'',
            imageList:[]
        };
    }

    genIndicator(){
        return this.props.podList.hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={{color:'red',margin:10}}
                />
                <Text>加载更多</Text>
            </View>
    }

    loadData(loadMore){
        const PlanNo = (this.props.navigation.state.params.PlanNO);
        const {PageIndex,showItems,hideLoadingMore} = this.props.podList;
        const order = this.state.order.toUpperCase()
        if(!loadMore){
            this.props.onRefreshPods(this.items,PlanNo,order)

        }else if(hideLoadingMore){
            // console.log(1)
            this.props.onLoadMorePods(PageIndex+1,this.items,showItems,PlanNo,order);
        }
    }


    renderListEmptyComponent(){
        if(!this.props.network.haveNet && !this.props.podList.isLoading){
            return <DefaultPage mode="noNet"/>;
        }else if(!this.props.podList.isLoading){
            return <DefaultPage mode="noRec"/>;
        }else{
            return null
        }
        
    }

    componentDidMount() {
        this.loadData()
        this.backPress.componentDidMount()
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    _renderItem(data,index){
        const item = data.item
        return  <TouchableOpacity activeOpacity={0.7} onPress={(data)=>{
            let imgs =  item.ImgURL 
            let strs = (imgs.split(";")).reduce((arr,item)=>{
                if(item) arr.push({url:item});      
                return arr
            },[])
            this.setState({modalVisible: true,imageList:strs})
        }
        }>
            <View style={styles.item}>
                <View style={styles.ImgBox}>
                    <Image style={styles.ImgBox} source={{uri:(item.ImgURL.split(";"))[0]}}/>
                    <Text style={styles.count}>{i18n.locale=='zh'?`共${item.PictureCount}张`:`${item.PictureCount} Sheets`}</Text>
                </View>

                <View style={{marginLeft:40*uW}}>
                    <Text style={styles.Title}>{i18n.t('orderNo')}：{item.WaybillNO}</Text>
                    <Text style={styles.Time}>{i18n.t('uploadPodTime')}：{item.ReceiptTime}</Text>

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
                <TextInput  
                onChangeText={text => {
                    this.setState({order:text})
                    if(!text){
                        this.loadData(false)
                    }
                }} 
                returnKeyType="search"
                keyboardType = 'phone-pad'
                style={[styles.Ipt,styles.searchBarBox]} 
                placeholder={i18n.t('searchByOrder')}
                onSubmitEditing={()=>{
                    if(!this.state.order){
                        Alert.alert(i18n.t('tips'),i18n.t('None'),[{text:i18n.t('Yes')}])
                        return 
                    }
                    this.loadData(false)}
                }
                />
            </View>

            <FlatList
                data={this.props.podList.showItems}
                ListEmptyComponent={()=>this.renderListEmptyComponent()}
                renderItem={(item,index)=>this._renderItem(item,index)}
                keyExtractor={(item,index)=>""+index}
                refreshControl={
                    <RefreshControl
                        title="loading"
                        titleColor="red"
                        colors={["red"]}
                        refreshing={this.props.podList.isLoading}
                        onRefresh={()=>{this.loadData()}}
                        tintColor="red"
                    />
                }
               
                ListFooterComponent={()=>this.genIndicator()}
                onEndReached={() => {
    
                    setTimeout(() => {
                        if (this.canLoadMore) {
                            this.loadData(true);
                            this.canLoadMore = false;
                        }}, 100)
                }}
                onScrollBeginDrag={() => {
                  
                    this.canLoadMore = true;
                }}
                onMomentumScrollBegin={()=>{
                   
                    this.canLoadMore=true;
                }}
                onEndReachedThreshold={0.5}
            />


            <Modal
                animationType={'fade'}
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={() => this.setState({modalVisible: false,index:0})}>
                <ImageViewer saveToLocalByLongPress={false} imageUrls={this.state.imageList} index={this.state.index}/>
            </Modal>

        </View>;
    }

}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme,
    podList: state.pods,
    network:state.network
});

const mapDispatchToProps = dispatch => ({
    onRefreshPods:(items,PlanNo,WaybillNO)=>dispatch(actions.onRefreshPods(items,PlanNo,WaybillNO)),
    onLoadMorePods:(newPageIndex,items,showItems,PlanNo,WaybillNO)=>dispatch(actions.onLoadMorePods(newPageIndex,items,showItems,PlanNo,WaybillNO))

});

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
    },
    indicatorContainer:{
        alignItems:"center"
    },
});
