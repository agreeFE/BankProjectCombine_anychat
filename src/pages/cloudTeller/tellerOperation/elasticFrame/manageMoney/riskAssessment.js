//风险评估
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import SelectList from '$/components/selectList'

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');


module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
        data:[
            {
                title:"1.您现在的年龄:",
                data:[
                    {
                        id:'A.',
                        data:'25岁以下'
                    },
                    {
                        id:'B.',
                        data:'26 - 35岁'
                    },
                    {
                        id:'C.',
                        data:'36 - 45岁'
                    },
                    {
                        id:'D.',
                        data:'46 - 60岁'
                    },
                    {
                        id:'E.',
                        data:'60岁以上'
                    },
                ]
            },
            {
                title:"2.假设您参加一项有奖竞赛活动,并已胜出,您希望获得的奖励方案:",
                data:[
                    {
                        id:'A.',
                        data:'立刻拿到1万元现金'
                    },
                    {
                        id:'B.',
                        data:'有50%机会赢得5万元现金的抽奖'
                    },
                    {
                        id:'C.',
                        data:'有20%机会赢得10万元现金的抽奖'
                    },
                    {
                        id:'D.',
                        data:'有5%机会赢得100万元现金的抽奖'
                    }
                ]
            }
        ]
    }
  }
  componentDidMount() {
    
    
  }
  checked(data){

  }
  render() {
    let index =2;
    return (
        <View style={styles.allBox}>
            <View style={styles.contentBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleIco}>|</Text>
                    <Text style={styles.title}>理财风险评估</Text>
                </View>
                <ScrollView>
                    <View style={styles.contentItemBox}>
                        <View style={{borderBottomColor:"#D8D8D8",borderBottomWidth:1,marginBottom:20,paddingBottom:10}}>
                            <SelectList checked={this.checked} options={this.state.data[0]}></SelectList>    
                        </View>

                        <View style={{borderBottomColor:"#D8D8D8",borderBottomWidth:1,marginBottom:20,paddingBottom:10}}>
                            <SelectList checked={this.checked} options={this.state.data[1]}></SelectList>
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
    allBox:{
        width:"100%",
        height:"100%",
        backgroundColor:"#F4F4F4"
    },
    titleBox:{
        paddingLeft:20,
        paddingTop:20,
        paddingRight:20,
        flexDirection: 'row',
        width:"100%",
        height:"10%",
    },
    contentItemBox:{
        // flexDirection: 'row',
        width:"100%",
        height:"97%",
        marginTop:"1%",
        paddingLeft:20,
        paddingTop:20,
        paddingRight:20,
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