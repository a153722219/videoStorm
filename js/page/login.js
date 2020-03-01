/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, View,DeviceInfo,Image,Text,TouchableOpacity} from 'react-native';
import {connect} from "react-redux"
import NetInfo from "@react-native-community/netinfo";
import actions from '../action/index'
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDao from '../expand/dao/FavoriteDao';
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import  FavoriteUtil from '../util/FavoriteUtil';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import {i18n} from '../i18n/index';
import ToastManager from '../common/ToastManager'
import {uW, width} from "../util/screenUtil";
import Ionicons from "react-native-vector-icons/Ionicons"

class LoginPage extends Component{
    
}