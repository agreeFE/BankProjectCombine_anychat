import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import { CREDITCARD } from '../imageSource/imageSource';
import Close from '../close'
const { formatCardNum } = require('$/util/cardNumutil');

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const { getTimespamp, getDatetimeByFormat } = require('$/util/dateutil');
const tokenutil = require('$/util/tokenutil');


module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state={
      IDNAME:'',
      CreditCardNo:'',
      CreditCardInDate:"",
      CreditCardCVV2:"",
    }
  }

  componentDidMount() {
    let _this = this;
  }

  formatDate( newdate ){
    if(!newdate){return}
    let yyyy = newdate.substr(0,4) 
    let MM = newdate.substr(4,2) 
    let dd = newdate.substr(6,2) 
    return yyyy+'/'+MM+'/'+dd
  }

  render() {
    let index =2;
    return (
      <Close callBackHome = {()=> {this.props.closeHome()}} >
        <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
          <Text style={styles.Stance}></Text>
          <Text style={styles.title}>核对激活信用卡信息</Text>
        </View>
        <ScrollView >
            <Image style={{width:'60%',marginLeft:'20%',marginBottom:10,height:140}} resizeMode={'contain'} source={CREDITCARD}></Image>
            {
              this.props.data.map(( item , index )=>{
                if( item['FIELDCODE'] == 'CreditCardMainDepType' ){
                  if( item['FIELDVALUE'] == 'P' ){
                    return(
                      <View style={styles.loanItem}>
                        <Text style={{color:'#666666'}}> {item['FIELDNAME']} </Text>
                          <View style={styles.loanItemRight}>
                            <Text style={[ styles.useLoan, styles.loanItemRightText]}> 主卡 </Text>
                          </View>
                      </View>
                    )
                  }else{
                    return(
                      <View style={styles.loanItem}>
                        <Text style={{color:'#666666'}}> {item['FIELDNAME']} </Text>
                          <View style={styles.loanItemRight}>
                            <Text style={[ styles.useLoan, styles.loanItemRightText]}> 附卡 </Text>
                          </View>
                      </View>
                    )
                  }
                }else{
                  return(
                    <View style={styles.loanItem}>
                      <Text style={{color:'#666666'}}> {item['FIELDNAME']}  </Text>
                        <View style={styles.loanItemRight}>
                          <Text style={[ styles.useLoan, styles.loanItemRightText]}> {item['FIELDVALUE']}  </Text>
                        </View>
                    </View>
                  )
                }
              })
            }
        </ScrollView>
        <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
        {
          this.props.btnState ? 
          <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                  // this.props.enterReportLoss('enter','','我已确认信用卡信息。')
                  this.props.addTellerList(2,'我已确认信用卡信息。');
                  this.props.closeHome()
              }}>确认</Text>
          : 
          <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                  this.props.closeHome()
              }}>返回</Text>
            }
          </LinearGradient>
      </Close>
    );
  }
  
};

const styles = StyleSheet.create({
  Stance:{
    width:4,
    height:16,
    backgroundColor:$globalStyle.tellerOperation.listColor,
    marginRight:8
  },
  title:{
    color:'#000',
    fontSize:17,
    fontWeight:"bold"
  },
  loanItemRightText: {
    textAlign: 'right',
    fontSize:15,
    color:'#333333'
  },
  loanItemRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    height: 45,
  },
  loanItem: {
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  ensure:{
    width:'90%',
    height:45,
    marginLeft:'5%',
    borderRadius:5,
    marginTop:10,  
    marginBottom:20,                  
  }
});