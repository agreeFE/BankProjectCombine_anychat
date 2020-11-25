import React, { Component, } from 'react'
import { View, StyleSheet,Dimensions,Image,Text,TouchableWithoutFeedback } from 'react-native'
import Header from '$/components/header'
import scope from '$/scope'
import SVG from "$/components/Svg";
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const {height,width} =  Dimensions.get('window');
const { getLoginToken } = require('$/util/tokenutil')
module.exports = class Adver extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {}
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={`赞E贷`}
          imageBackground={0}
          leftClick={()=> {router.back()}}
          rightClick={()=> {}}
          // headerStyle={{paddingTop: 15}}
        ></Header>
        <Image source={require('$image/home/adver.png')} style={styles.img}></Image>
        <TouchableWithoutFeedback onPress={this.click}>
          <View style={styles.apply}>
            <Text style={styles.applyText}>立即申请</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.maxText}>最高20万</Text>
        <Text style={[styles.minText, {top: '18.3%', right: '14.87%'}]}>极速申请</Text>
        <Text style={[styles.minText, {top: '37.48%', right: '0.93%'}]}>期限灵活</Text>
        <Text style={[styles.minText, {top: '29.59%', left: '21%', color: '#F1FAFC'}]}>大额尊享</Text>
        <Text style={[styles.minText, {top: '47.86%', left: '2.33%'}]}>额度最优</Text>
      </View>
    )
  }

  click = () => {
    // if(verifyLoginTokenUsage(getLoginToken().data) === 0 || verifyLoginTokenUsage(getLoginToken().data) ===3) {
    if(!getLoginToken().data) {
      router.load('login',{afterGoBack: () =>{
        NetworkUtil.networkService('/account/loans/loanQuotaQuery',{}, response => {
          router.load('confirmInfo')
        },
        err => {
          router.load('quotaApplyHome')
        })
        }})
    } else {
      NetworkUtil.networkService('/account/loans/loanQuotaQuery',{}, response => {
        router.load('confirmInfo')
      },
      err => {
        router.load('quotaApplyHome')
      })
    }
  }
}
const styles = StyleSheet.create({
  img: {
    position: "absolute",
    width: '100%',
    height: '100%',
    zIndex:-1
  },
  apply: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#fff',
    // width: 142,
    width: '37.86%',
    // height: 35,
    height: '5.24%',
    borderRadius: 4,
    position: "absolute",
    // bottom: 45,
    top: '87.87%',
    left: '32%'
  },
  applyText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 0,
    lineHeight: 21
  },
  maxText: {
    // transform: 'rotate(-360deg)',
    fontFamily: 'PingFangSC-Semibold',
    fontSize: 36,
    color: '#B8F2FF',
    textAlign: 'center',
    lineHeight: 46,
    fontWeight: 'bold',
    position: "absolute",
    left: '31.4%',
    top: '31.4%'
  },
  minText: {
    fontFamily: 'PingFangSC-Semibold',
    fontSize: 14,
    color: '#C0EBFF',
    letterSpacing: 0.17,
    textAlign: 'center',
    lineHeight: 20,
    position: "absolute",
  }
})