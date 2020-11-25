//摸板页
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);


import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');


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
                    <Text style={styles.title}>模板页面</Text>
                </View>
                <ScrollView>
                    <View style={styles.contentItemBox}>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                        <Text style={styles.title}>模板页面</Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomBox}>
                <LinearGradient style={[styles.ensure,{marginTop:14,borderRadius:5}]} colors={['#E9962F', '#FFC67E']}  >
                    <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                            this.props.closeHome()
                    }}>返回</Text>
                </LinearGradient>
            </View>
        </View>
    );
  }
  
};

const styles = StyleSheet.create({
    allBox:{
        width:"100%",
        height:"100%",
        backgroundColor:"#F4F4F4"
    },
    titleBox:{
        flexDirection: 'row',
        width:"100%",
        height:"10%",
        paddingLeft:20,
        paddingTop:20,
    },
    contentItemBox:{
        // flexDirection: 'row',
        width:"100%",
        height:"97%",
        marginTop:"1%",
        // backgroundColor:"red"
    },
    contentBox:{
        // flex: 1,
        
        width:"100%",
        height:"73%",
        // padding:18
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