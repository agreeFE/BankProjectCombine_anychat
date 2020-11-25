import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')

module.exports = class FacePay extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {}
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          leftClick={this.back}
        ></Header>
        <View style={{height: 300, alignItems: "center", backgroundColor: '#666',paddingVertical: 30}}>
          <Text style={{color: '#fff', fontSize: 25}}>刷脸支付</Text>
          <Text style={{color: '#fff', fontSize: 16, marginTop: 20}}>无需手机即可享受线下店铺刷脸买单</Text>
        </View>
        <Text style={{color: '#999', fontSize: 12,lineHeight: 20, paddingHorizontal: 30}}>点“同意协议并开通”会先设置您的优先扣款卡，仅此一步即可完成开通</Text>
        <TouchableWithoutFeedback onPress={() => { this.nextStep() }} >
          <LinearGradient colors={$globalStyle.buttonLinerBackground}  style={{ marginTop: 10, height: 45, width: '86%', marginLeft: '7%', backgroundColor:$globalStyle.backgroundColor , alignItems: 'center', justifyContent: 'center',borderRadius: 5}}>
            <Text style={{ color: $globalStyle.textColor , fontFamily: 'PingFangSC-Medium', fontSize: 17, letterSpacing: 0, }}>同意协议并开通</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <Text style={{paddingHorizontal: 30,marginTop: 10, color: "#00009f", textAlign: 'right'}}>《刷脸支付协议》</Text>
      </View>
    )
  }
  back = () => {
    router.back()
  }

  nextStep = () => {

  }



}
const styles = StyleSheet.create({

})