//<ButtonB ref='button' onPress={this.fetchData}/>
import React, {Component} from "react";
import {Text, StyleSheet, TouchableHighlight, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient"

export default class Button extends Component {
    state = {
        status: 1,
        disabled:false,
    };

    // customPressHandler = () => {
    //     //自定义的方法，请使用属性来定义,这里自定的把this绑定到这个方法上
    //     alert('你按下了按钮' + this.state.status);
    // };
    onPress = ()=>{
        const {onPress } =this.props;
        onPress ? onPress():"";
    };
    enable=()=>{
        this.setState({
          disabled:false,
      })
    };
    disabled =()=>{
        this.setState({
            disabled:true,
        })
    };
    render(){
        const {name, backgroundColor} = this.props;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginBottom:50}}>
            <LinearGradient style={{ borderRadius: 14, width: '100%',minWidth:100,height: 40, alignItems: 'center', justifyContent: 'center',   marginTop: 15}} colors={window.$globalStyle.backgroundColor}>
               <TouchableOpacity
                    disabled={this.state.disabled}
                    style={[styles.button,
                        this.state.disabled && styles.disabled]}
                    onPress={this.onPress}>
                    <Text style={[styles.buttonText,{color:window.$globalStyle.textColor}]}>{this.props.text}</Text>
                </TouchableOpacity>
            </LinearGradient>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        borderRadius: 14,
        // backgroundColor: 'green',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    buttonText: {
        textAlign: 'center'
    },
    disabled:{
        backgroundColor:'gray',
    },
});