import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { StatusBar } from 'react-native'
import NavigationUtil from '../navigator/NavigationUtil'
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes';

//高阶组件
 const setStatusBar = (statusbarProps = {}) => WrappedComponent => {
    class Component extends React.PureComponent {


        constructor(props) {
            super(props)
            this._navListener = props.navigation.addListener('willFocus', this._setStatusBar);
        }


        componentWillUnmount() {
            this._navListener.remove();
        }

        _setStatusBar = () => {

            const {
                barStyle = "dark-content",
                translucent = false
            } = statusbarProps
            StatusBar.setTranslucent(statusbarProps.translucent)
            StatusBar.setBackgroundColor("transparent")
            StatusBar.setBarStyle(barStyle)
        }

        render() {

            return <WrappedComponent {...this.props} />
        }
    }

    return hoistNonReactStatics(Component, WrappedComponent);
}

export default setStatusBar