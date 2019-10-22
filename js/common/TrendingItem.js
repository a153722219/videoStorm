/**
 * Created by Administrator on 2019/10/21.
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,RefreshControl,Image} from 'react-native';
import FontAwesome  from "react-native-vector-icons/FontAwesome"
import HTMLView from 'react-native-htmlview';
export default class TrendingItem extends Component{
    render(){
        const {item} = this.props;
        if(!item) return null

        let favoriteButton =
            <TouchableOpacity
                style={{padding:6}}
                onPress={()=>{
                    }
                }
                underlayColor={'transparent'}
            >

            <FontAwesome name={'star'} size={26} style={{color:'red'}}/>
        </TouchableOpacity>

        let description = '<p>'+item.description+"</p>";
        return(
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.cellContainer}>
                    <Text style={styles.title}>{item.fullName}</Text>
                    {/* 富文本 */}
                    <HTMLView 
                        value = {description}
                        onLinkPress={(url)=>{

                        }}
                        stylesheet={
                                {
                                    p:styles.description,
                                    a:styles.description
                                }
                        }
                    />
                    <Text style={styles.description}>{item.meta}</Text>

                    <View style={styles.row}>
                        <View  style={styles.row}>
                            <Text>Built by:</Text>
                            {item.contributors.map((result,i,arr)=>{
                                return  <Image 
                                key={i}
                                style={{width:22,height:22,margin:2}}  
                                source={{uri:arr[i]}}/>
                            })}
                           

                        </View>

                        <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                            <Text>Star:</Text>
                            <Text>{item.starCount}</Text>
                        </View>
                        {favoriteButton}
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
