//风险评估完成
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

var successIco = require('$image/transferAccount/greenCheck.png');

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
                    {/* <Text style={styles.titleIco}>|</Text>
                    <Text style={styles.title}>模板页面</Text> */}
                </View>
                <ScrollView>
                    <View style={styles.contentItemBox}>
                        <Image resizeMode="contain" style={styles.topSearchIco} source={successIco} />
                        <Text style={{textAlign:"center",marginTop:20,fontSize:18,fontWeight:"bold",color:"#4D4D4D"}}>风险评估完毕!</Text>
                        <View style={{borderBottomColor:"#D8D8D8",borderBottomWidth:1,borderTopColor:"#D8D8D8",borderTopWidth:1,width:"100%",marginTop:25}}>
                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"45%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:25}}>购买时间</Text>
                                </View>
                                <View style={{width:"55%",textAlign:"right"}}>
                                    <Text style={{textAlign:"right",lineHeight:40,paddingRight:25}}>2019年9月10日</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"45%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:25}}>购买类型</Text>
                                </View>
                                <View style={{width:"55%",textAlign:"right"}}>
                                    <Text style={{textAlign:"right",lineHeight:40,paddingRight:25}}>稳健性</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"45%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:25}}>产品风险</Text>
                                </View>
                                <View style={{width:"55%",textAlign:"right"}}>
                                    <Text style={{textAlign:"right",lineHeight:40,paddingRight:25}}>中风险</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"45%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:25}}>赎回有效期</Text>
                                </View>
                                <View style={{width:"55%",textAlign:"right"}}>
                                    <Text style={{textAlign:"right",lineHeight:40,paddingRight:25}}>有效期1年</Text>
                                </View>
                            </View>
                            
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomBox}>
                <LinearGradient style={[styles.ensure,{marginTop:14,borderRadius:5}]} colors={['#E9962F', '#FFC67E']}  >
                    <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                            this.props.closeHome()
                    }}>确认</Text>
                </LinearGradient>
            </View>
        </View>
    );
  }
  
};

const styles = StyleSheet.create({
    topSearchIco:{
        width:"100%",
        height:70
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