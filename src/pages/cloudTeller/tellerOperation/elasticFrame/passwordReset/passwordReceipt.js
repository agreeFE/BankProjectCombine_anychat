import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import { OPEN , chapter } from '../imageSource/imageSource';
import Close from '../close'

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');

const { getTimespamp, getDatetimeByFormat } = require('$/util/dateutil');
const { formatCardNum } = require('$/util/cardNumutil');

module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state={
      userInfoData:{},//用户信息
    }
  }
  componentDidMount() {
      //获取用户偏好数据
    $Storage.load({
        key: 'userInfo'
    }).then(result => {
        var userInfo = JSON.parse(result);

        // console.log('用户信息result', userInfo)
        _this.setState((previousState) => {
            return ({
                userInfoData: userInfo,
            })
        });
    });
    
  }

  render() {
    let index =2;
    return (
      <Close callBackHome = {()=> {this.props.closeHome()}} >
        <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
          <Text style={styles.Stance}></Text>
          <Text style={styles.title}>密码重置电子回单</Text>
        </View>
        <ScrollView>

          <View style={styles.loanItem}>
            <Text> 客户姓名 </Text>
              <View style={styles.loanItemRight}>
                <Text style={[ styles.useLoan, styles.loanItemRightText]}>{window.userName}</Text>
              </View>
          </View>
          <View style={styles.loanItem}>
            <Text> 卡号 </Text>
              <View style={styles.loanItemRight}>
                <Text style={[ styles.useLoan, styles.loanItemRightText]}>{ formatCardNum( window.$globalBankCardNum, 4 ) }</Text>
              </View>
          </View>
          <View style={styles.loanItem}>
            <Text> 交易类型 </Text>
              <View style={styles.loanItemRight}>
                <Text style={[ styles.useLoan, styles.loanItemRightText]}>密码重置</Text>
              </View>
          </View>
          <View style={styles.loanItem}>
            <Text> 交易状态 </Text>
              <View style={styles.loanItemRight}>
                <Text style={[ styles.useLoan, styles.loanItemRightText]}>成功</Text>
              </View>
          </View>
          <View style={styles.loanItem}>
            <Text> 交易时间 </Text>
              <View style={styles.loanItemRight}>
                <Text style={[ styles.useLoan, styles.loanItemRightText]}>{
                  getDatetimeByFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                }</Text>
              </View>
          </View>
          <View style={styles.loanItem}>
            <Text> 备注 </Text>
              <View style={styles.loanItemRight}>
                <Text style={[ styles.useLoan, styles.loanItemRightText]}>无</Text>
              </View>
          </View>
          <View style={styles.loanItem}>
            <Text> 回单流水号 </Text>
              <View style={styles.loanItemRight}>
                <Text style={[ styles.useLoan, styles.loanItemRightText]}>ADFE 3231 4345 252A</Text>
              </View>
          </View>
          <Image style={{width:200,height:200,position:'absolute',bottom:10,right:10,transform: [{skewY:'-12.7deg'}]}}  resizeMode='contain' source={chapter}></Image>
        </ScrollView>
        <LinearGradient style={styles.ensure} colors= {$globalStyle.buttonLinerBackground} >
            <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                    this.props.closeHome()
                }}>返回</Text>
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
    textAlign: 'right'
  },
  loanItemRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    height: 35,
  },
  loanItem: {
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    color:'#999'
  },
  ensure:{
    width:'90%',
    height:45,
    marginLeft:'5%',
    borderRadius:5,
    backgroundColor:'#E39634',
    marginTop:10,
    marginBottom:20,
    // position:'absolute',
    // bottom:20,
    // left:'5%'                        
  }
});