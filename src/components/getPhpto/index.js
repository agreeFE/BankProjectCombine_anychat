// 拍照组件

import React, { Component,  } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  ImageBackground,
  Image
} from 'react-native'
var camera = require('$image/cloudTeller/cameraIco.png');

export default class Confirm extends Component {
  constructor(props) {
    
    super(props)
    this.state = {
       
    }
    console.log(this.state)
  }
  render() {
    return (
        <View>
            <View style={styles.ImgBox}>
                <ImageBackground  source={this.props.photo} style={{ width: '100%', height: 150 }}>
                    <View style={styles.IcoImgBox}>
                        <View style={styles.IcoImgItem}>
                            <Image resizeMode="contain" style={styles.topSearchIco} source={camera} />
                        </View>
                        <Text style={styles.IcoImgItemTitle}>{this.props.title}</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
    Title:{
        marginBottom:20
    },
    IcoImgBox:{
        flex: 1,
        textAlign:"center"
    },
    IcoImgItem:{
        width:"40%",
        height:"40%",
        marginLeft:"30%",
        marginTop:"10%"
    },
    IcoImgItemTitle:{
        marginTop:"9%",
        textAlign:"center",
        color:"#3D4B8C",
        fontSize:16,
        fontWeight:"bold"
    },
    topSearchIco:{
        width:"100%",
        height:"100%"
    },
    ImgBox:{
        width:"80%",
        height:150,
        flex: 1,
        marginBottom:30,
        marginLeft:"10%"
        // backgroundColor:"red"
    },

})
