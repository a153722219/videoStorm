/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Alert, View,FlatList,Image,DeviceInfo} from 'react-native';
import {connect} from "react-redux"
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import actions from '../action/index'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import ViewUtil from "../util/ViewUtil";
import ArrayUtil from "../util/ArrayUtil";
const THEME_COLOR　=　"#678";
import FavoriteDao from '../expand/dao/FavoriteDao';
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import CheckBox from 'react-native-check-box'       //复选框
import BackPressComponent from "../common/BackPressComponent";
class CustomKeyPage extends Component{
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
        this.changeValues = [];         //将改变的数据保存到这个数组中
        this.isRemoveKey = !!this.params.isRemoveKey;   //是否是点击 标签移除 进来的(将标签从数据库中删除)
        this.languageDao = new LanguageDao(this.params.flag);
        this.state = {
            keys: []    //当前页面的的数据(最热或趋势topNavbar的数据)
        }
        
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        
        if (CustomKeyPage._keys(this.props).length === 0) {
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }
        this.setState({
            keys: CustomKeyPage._keys(this.props)  //把数据赋给keys
           
        })
    }
    //reducer已经返回数据了,但是本页面state没有改变,重写下面这个方法
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.keys !== CustomKeyPage._keys(nextProps, null, prevState)) {   //当之前的keys和现在的keys不同时
            return {
                keys: CustomKeyPage._keys(nextProps, null, prevState),  //把新的数据赋给keys
            }
        }
        return null;
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    /**
     * 获取标签
     * @param props
     * @param original 移除标签时使用，是否从props获取原始的标签
     * @param state 移除标签时使用
     * @returns {*}
     * @private
     */
    static _keys(props, original, state) {
        const {flag, isRemoveKey} = props.navigation.state.params;
        let key = flag === FLAG_LANGUAGE.flag_key ? "keys" : "languages";
        if (isRemoveKey && !original) {
            //如果state中的keys为空则从props中取
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(val => {
                    return {//注意：不直接修改props，copy一份
                        ...val,
                        checked: false  //将checked属性设为false
                    };
                });
        } else {
            return props.language[key];
        }
    }

    onBackPress(e) {
        this.onBack();
        return true;
    }

    onBack(){
        if(this.changeValues.length>0){
            Alert.alert('提示','要保存修改吗',[
                {
                    text:'否',
                    onPress:()=>{
                        NavigationUtil.goBack(this.props.navigation)
                    }
                },
                {
                    text:'是',
                    onPress:()=>{
                        this.onSave()
                    }
                }
            ])
        }else  NavigationUtil.goBack(this.props.navigation)


    }

    //复选框图片
    _checkedImage(checked) {

        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: THEME_COLOR,
            }}/>
    }

    renderCheckBox(data, index) {
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(data, index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this._checkedImage(true)}
            unCheckedImage={this._checkedImage(false)}
        />
    }
    onClick(data, index){
        data.checked=!data.checked
        ArrayUtil.updateArray(this.changeValues,data);
        console.log(this.changeValues)
        this.state.keys[index]=data;
        this.setState({
            keys:this.state.keys
        })
    }

    renderView(){
        let dataArray = this.state.keys;
        if (!dataArray || dataArray.length === 0) return;
        let len = dataArray.length;
        let views = [];
        for (let i = 0, l = len; i < l; i += 2) {   //每行显示两个复选框
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i], i)}
                        {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
    }

    onSave(){
        if(this.changeValues.length===0){
            NavigationUtil.goBack(this.props.navigation);
            return
        }
        let keys;
        if(this.isRemoveKey){//移除标签特殊处理
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtil.remove(keys = CustomKeyPage._keys(this.props, true), this.changeValues[i], "name");
            }
        }
        //更新本地数据
        
        this.languageDao.save(keys || this.state.keys);
        //更新store
        const {onLoadLanguage} = this.props;
        onLoadLanguage(this.params.flag)
        NavigationUtil.goBack(this.props.navigation);
        
    }

    render() {
        let title = this.isRemoveKey ? '标签移除' : '自定义标签';
        title = this.params.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : title;
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let navigationBar = <NavigationBar
            title={title}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}

            rightButton={ViewUtil.getRightButton(rightButtonTitle, () => this.onSave())}
        />

        return <View style={styles.container}>
            {navigationBar}
            <ScrollView>
                {this.renderView()}

            </ScrollView>
        </View>
    }
}

const mapPopularStateToProps = state => ({
    language: state.language  //topNavBar数据
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(CustomKeyPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    }
});
