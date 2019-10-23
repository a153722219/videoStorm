/**
 * Created by Administrator on 2019/10/21.
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,RefreshControl,Image} from 'react-native';
import FontAwesome  from "react-native-vector-icons/FontAwesome"
import BaseItem from './BaseItem'
export default class PopularItem extends BaseItem{
    render(){
        const {projectModal} = this.props;
        const {item} = projectModal;
        if(!item || !item.owner) return null

        return(
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.cellContainer}>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.description}>{item.description}</Text>


                    <View style={styles.row}>
                        <View  style={styles.row}>
                            <Text>Author:</Text>
                            <Image style={{width:22,height:22}}  source={{uri:item.owner.avatar_url}}/>

                        </View>

                        <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                            <Text>Star:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {this._favoriteIcon()}
                    </View>


                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    },

    cellContainer:{
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2 //阴影 安卓端用 上面的阴影只对ios有效
    },
    row:{
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center"
    }
});
