import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ViewUtil{
    static getLeftBackButton(callback){
        return (<TouchableOpacity
          style={{padding:8,marginLeft:12}}
          onPress={callback}
        >
              <Ionicons
                 name={'ios-arrow-back'}
                 size={26}
                 style={{color:"white"}}
              />
         
        </TouchableOpacity>)
      }

      static getShareButton(callback){
        return (<TouchableOpacity
            underlayColor={'transparent'}
            onPress={callback}
          >
                <Ionicons
                   name={'md-share'}
                   size={20}
                   style={{color:"white",opacity:0.9,marginRight:10}}
                />
           
          </TouchableOpacity>)
      }
}

