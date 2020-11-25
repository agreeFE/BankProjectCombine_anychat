//风险评估完成
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
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
    this.state = {
      ViewHeight:'100%'
    }
  }
  componentDidMount() {
    this.setState({
      ViewHeight:parseInt( Dimensions.get('window').height ) - 360,
    })
    this.props.editManageMoneyIndex(0)
  }

  render() {
    let index =2;
    let _this = this
    return (
        <View style={[styles.allBox,{height:'100%', backgroundColor:"#f4f4f4", borderTopLeftRadius:15, borderTopRightRadius:15, }]}>
            <View style={styles.contentBox}>
                <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
                  <Text style={styles.Stance}></Text>
                  <Text style={styles.title}>理财产品</Text>
                </View>
                <ScrollView style={{position:'relative',height:this.state.ViewHeight}}>
                {
                  _this.props.data[0]['FIELDVALUE'].map( ( item, index )=>{
                    let CPJG =  item[5]
                    switch (CPJG) {
                      case '1001':
                        CPJG = '结构性存款'
                        break;
                      case '1002':
                        CPJG = '开放式理财'
                        break;
                      case '1003':
                        CPJG = '封闭式理财'
                        break;
                      default:
                        break;
                    }
                    return(
                      <TouchableWithoutFeedback  onPress={()=>{
                        _this.props.editManageMoneyIndex(1)
                        _this.props.callBackHome('productIntroduction',2 ,item)
                      }}>
                        <View style={{paddingLeft:24,paddingRight:24,}} >
                          <View style={{ flexDirection:'row',paddingBottom:10,paddingTop:10 }}>
                            <View style={{flex:3}} >
                              <Text style={{color:'#DA8C2A',fontSize:20,fontWeight:'bold'}}> {item[11]} </Text>
                              <Text style={{color:'#DA8C2A',fontSize:12,}}>业绩比较基准</Text>
                            </View>
                            <View style={{flex:7}} >
                              <Text style={{ color:'#333333',fontSize:15 }}>{item[3]}</Text>
                              <Text style={{color:'#666',fontSize:13,}}> {CPJG} </Text>
                            </View>
                          </View>
                        </View>

                      </TouchableWithoutFeedback>
                    )
                  })
                }
                </ScrollView>
            </View>
              <LinearGradient style={[styles.ensure,{marginTop:14,borderRadius:5}]} colors={$globalStyle.buttonLinerBackground}  >
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                          this.props.editManageMoneyIndex('')
                          this.props.closeHome()
                  }}>返回</Text>
              </LinearGradient>
        </View>
    );
  }
  
};

const styles = StyleSheet.create({
  Stance:{
    width:4,
    height:16,
    backgroundColor:$globalStyle.tellerOperation.listColor,
    marginRight:8,
    color:'#333333',
    fontSize:17,
    fontWeight:'bold'
  },
  title:{
    color:'#000',
    fontSize:17,
    fontWeight:"bold"
  },
  ensure:{
    width:'90%',
    height:45,
    // marginLeft:'5%',
    borderRadius:5,
    backgroundColor:'#E39634',
    // marginTop:20,
    // marginBottom:10,
    position:'absolute',
    bottom:20,
    left:'5%'                        
  }
});