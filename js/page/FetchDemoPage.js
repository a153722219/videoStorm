/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,Button} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index'


export default class FetchDemoPage extends Component{
    constructor(props){
        super(props)
        this.state={
            showText:""
        }
    }

    loadData(){
        //https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url).then(res=>res.text())
            .then(resText=>{
                this.setState({
                    showText:resText
                })
            })
    }

    loadData2(){
        //https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url).then(res=>{
            if(res.ok){
                return res.text();
            }
            throw new Error("NetWork Error");
        }).then(resText=>{
                this.setState({
                    showText:resText
                })
            }).catch(e=>{
            this.setState({
                showText:e.toString()
            })
        })
    }


    render() {
        const {navigation}  = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Fetch 使用
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text=>{
                            this.searchKey = text;
                        }}
                    />

                    <Button title="获取" onPress={()=>{
                        this.loadData2();
                    }}/>
                </View>


                <Text>{this.state.showText}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    inputContainer:{
        flexDirection:"row",
        alignItems:"center"
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
