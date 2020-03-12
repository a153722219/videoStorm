/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,Button, AsyncStorage} from 'react-native';


const KEY =  "saveKey"
export default class AsyncStorageDemoPage extends Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
            showText:""
        }
        
    }

    doSave(){
        AsyncStorage.setItem(KEY,this.value,err=>{
            err && console.log(err.toString())
        })
    }
    doRemove(){
        AsyncStorage.removeItem(KEY,err=>{
            err && console.log(err.toString())
        })
    }

    doGet(){
        AsyncStorage.getItem(KEY,(err,value)=>{
            this.setState({
                showText:value
            });
            console.log(value)
            err && console.log(err.toString())
        })
    }

    render() {
        const {navigation}  = this.props;
        return (
            <View>
                <Text style={styles.welcome}>
                    AsyncStorage使用
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
                        this.doSave();
                    }}>存储</Text>
                    <Text onPress={()=>{
                        this.doRemove();
                    }}>删除</Text>
                    <Text onPress={()=>{
                        this.doGet();
                    }}>获取</Text>
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
