//身份验证
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView,ImageBackground } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
import GetPhpto from "$/components/getPhpto/index"

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');
var idPhoto1 = require('$image/cloudTeller/idcardF.png');
var idPhoto2 = require('$image/cloudTeller/idcardZ.png');
var camera = require('$image/cloudTeller/cameraIco.png');

module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    
    
  }

  render() {
    let index =2;
    return (
        <View style={styles.allBox}>
            <View style={styles.contentBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleIco}>|</Text>
                    <Text style={styles.title}>身份验证</Text>
                </View>
                <ScrollView>
                    <View style={styles.contentItemBox}>

                        <GetPhpto title={"点击拍摄身份证头像页"} photo={idPhoto1}></GetPhpto>

                        <GetPhpto title={"点击拍摄身份证国徽页"} photo={idPhoto2}></GetPhpto>

                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomBox}>
                <LinearGradient style={[styles.ensure,{marginTop:14,borderRadius:5}]} colors={['#E9962F', '#FFC67E']}  >
                    <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                            this.props.closeHome()
                    }}>确定</Text>
                </LinearGradient>
            </View>
        </View>
    );
  }
  
};

const styles = StyleSheet.create({
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
    allBox:{
        width:"100%",
        height:"100%",
        backgroundColor:"#F4F4F4"
    },
    titleBox:{
        flexDirection: 'row',
        width:"100%",
        height:"10%",
    },
    contentItemBox:{
        // flexDirection: 'row',
        width:"100%",
        height:"97%",
        marginTop:"1%"
    },
    contentBox:{
        // flex: 1,
        
        width:"100%",
        height:"73%",
        padding:18
        // backgroundColor:"#000"
    },
    titleIco:{
        fontSize:36,
        lineHeight:24,
        fontWeight:"bold",
        color:"#E39634"
    },
    title:{
        fontSize:17,
        lineHeight:21,
        marginLeft:5,
        color:"#313131",
        fontWeight:"bold"
    },
    bottomBox:{
        paddingLeft:20,
        paddingRight:20
    }
});