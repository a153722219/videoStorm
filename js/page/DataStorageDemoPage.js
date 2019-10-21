/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,Button, AsyncStorage} from 'react-native';
import DataStorage from "../expand/dao/DataStorage"

const KEY =  "saveKey"
export default class DataStorageDemoPage extends Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
            showText:""
        };
        this.datastore = new DataStorage();
    }

    loadData(){
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.datastore.fetchData(url).then(data=>{
            let showData = `初次加载数据时间: ${new Date(data.timestamp)} \n ${JSON.stringify(data.data)}`
            this.setState({
                showText:showData
            })
        }).catch(err=>{
            err && console.log(err.toString());
        })
    }


    render() {
        const {navigation}  = this.props;
        return (
            <View>
                <Text style={styles.welcome}>
                    DataStorage 离线缓存框架使用
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text=>{
                            this.value = text;
                        }}
                    />

                </View>

                <View style={styles.inputContainer}>
                    <Text onPress={()=>{
                        this.loadData();
                    }}>读取</Text>

                </View>


                <Text>{this.state.showText}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    inputContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
    },

    input:{
        height:30,
        flex:1,
        borderColor:"black",
        borderWidth:1,
        marginRight:10
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
