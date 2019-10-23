/**
 * Created by Administrator on 2019/10/21.
 */

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default class BaseItem extends Component{
   static proTypes = {
       projectModel:PropTypes.object,
       onSelect:PropTypes.func,
       onFavorite:PropTypes.func
   }

   constructor(props){
       super(props)
       this.state = {
           isFavorite:this.props.projectModel.isFavorite,
       }
   }

   static getDerivedStateFromProps(nextProps,prevState){
       const isFavorite = nextProps.projectModel.isFavorite;
       if(prevState.isFavorite!==isFavorite){
           return {
               isFavorite:isFavorite
           }
       }
       return null
   }

   _favoriteIcon(){
       return (<TouchableOpacity
           style={{padding:6}}
           onPress={()=>{
                this.onPressFavorite()
           }
           }
           underlayColor={'transparent'}
       >

           <FontAwesome name={this.state.isFavorite?'star':'star-o'} size={26} style={{color:'#678'}}/>
       </TouchableOpacity>)
   }
    setFavoriteState(isFavorite){
       this.props.projectModel.isFavorite = isFavorite;
       this.setState({
           isFavorite
       })
    }

    onPressFavorite(){
       this.setFavoriteState(!this.state.isFavorite);
       this.props.onFavorite(this.props.projectModel.item,!this.state,isFavorite);
    }

}

