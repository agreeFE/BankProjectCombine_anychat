import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import { BANK } from '../imageSource/imageSource';
import Close from '../close'

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
const { formatPhone } = require('$/util/phoneutil');
const tokenutil = require('$/util/tokenutil');


module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state={
      ViewHeight:'100%',
      ScrollViewHeight:'100%',
      ADDRESS:'',
      IDNAME:'',
      PHONE:''
    }
  }

  componentDidMount() {
    let _this = this;
    _this.setState({
      ViewHeight:parseInt( Dimensions.get('window').height ) - 200,
    })
      _this.props.data.map(( item , index )=>{
        switch ( item['FIELDCODE'] ) {
          case 'ADDRESS':
            _this.setState({
              ADDRESS: item['FIELDVALUE']
            })
            break;
          case 'IDNAME':
            _this.setState({
              IDNAME: item['FIELDVALUE']
            })
            break;
          case 'PHONE':
            _this.setState({
              PHONE: item['FIELDVALUE']
            })
            break;
          default:
            break;
        }
      })
  }

  render() {
    let index =2;
    return (
      <Close callBackHome = {()=> {this.props.closeHome()}} >
        <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
          <Text style={styles.Stance}></Text>
          <Text style={styles.title}>确认领卡信息</Text>
        </View>
        <ScrollView >
            <View style={styles.loanItem}>
              <Text style={{color:'#666666'}}> 客户姓名 </Text>
                <View style={styles.loanItemRight}>
                  <Text style={[ styles.useLoan, styles.loanItemRightText]}> {this.state.IDNAME} </Text>
                </View>
            </View>
            <View style={styles.loanItem}>
              <Text style={{color:'#666666'}}> 联系方式 </Text>
                <View style={styles.loanItemRight}>
                  <Text style={[ styles.useLoan, styles.loanItemRightText]}> {formatPhone(this.state.PHONE)} </Text>
                </View>
            </View>
            <View style={styles.loanItem}>
              <Text style={{color:'#666666'}}> 领卡方式 </Text>
                <View style={styles.loanItemRight}>
                  <Text style={[ styles.useLoan, styles.loanItemRightText,{color:'#E69933'}]}> 快递上门 </Text>
                </View>
            </View>
            <View style={styles.loanItem}>
              <Text style={{color:'#666666'}}> 具体地址 </Text>
                <View style={styles.loanItemRight}>
                  <Text style={[ styles.useLoan, styles.loanItemRightText]}> {this.state.ADDRESS} </Text>
                </View>
            </View>
            <Text style={{paddingLeft:20,paddingRight:20,color:'#999999',marginTop:16}}>新的银行卡在业务办理成功后<Text style={{color:'#E69933'}}>3</Text>个工作日寄出</Text>
        </ScrollView>
        <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
        {
          this.props.btnState ? 
          <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                  // this.props.enterReportLoss('enter')
                  this.props.addTellerList(2,'已确认信息');
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
    marginBottom:20                  
  }
});