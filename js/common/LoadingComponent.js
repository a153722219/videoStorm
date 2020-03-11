import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-translucent-modal';
import LoadingManager from '../common/LoadingManager'
export default class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.minShowingTime = 100;
        this.state = {
            isLoading : false,
            setIsLoading : (isLoading) => {
                if (isLoading != this.state.isLoading) {
                    let curTimeLong = new Date().getTime();
                    if (isLoading) {
                        this.startTime = curTimeLong;
                        this.setState({
                            isLoading
                        });
                    } else {
                        let hasShowingTimeLong = curTimeLong - this.startTime;
                        if (hasShowingTimeLong < this.minShowingTime) {
                            setTimeout(() => {
                                this.setState({
                                    isLoading
                                });
                            }, this.minShowingTime - hasShowingTimeLong);

                        } else {
                            this.setState({
                                isLoading
                            });
                        }
                    }

                }
            },
        };
    }


    componentWillUnmount() {
        LoadingManager.loading = null;
    }

    showLoading = () => {
        
        this.state.setIsLoading(true);
    };
    dismissLoading = () => {
        this.state.setIsLoading(false);

    };

    render() {
        

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isLoading}
                onRequestClose={() => {
                 this.setState({ modalVisible: false });
                 
                }}
            >
                <View style={{flex:1,justifyContent:"space-around",alignItems:"center"}}>
                    <View style={styles.loading}>
                        <ActivityIndicator color="white"/>
                        <Text style={styles.loadingTitle}>请稍后...</Text>
                    </View>
                </View>

           </Modal>
                
          
        )
    }
}

const styles = StyleSheet.create({
    loading : {
        backgroundColor : '#10101099',
        height : 80,
        width : 100,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
     
      
    },
 
    loadingTitle : {
        marginTop : 10,
        fontSize : 14,
        color : 'white'
    }
});