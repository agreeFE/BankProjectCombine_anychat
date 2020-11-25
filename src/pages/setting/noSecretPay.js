import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback } from 'react-native'
import Header from '$/components/header'
import SVG from '$/components/Svg'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')

module.exports = class NoSecretPay extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {}
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={'免密支付设置'}
          leftClick={() => {router.back()}}
        ></Header>
        <View style={{flex: 1, alignItems: "center"}}>
          <View style={{ flex: 1, marginTop: 30, alignItems: "center" }}>
            <SVG source={require('$image/transferAccount/noHave.svg')} style={{ width: 80, height: 80 }}></SVG>
            <Text style={{ fontSize: 14, color: '#999', marginTop: 20 }}>暂无已签约用户</Text>
          </View>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({

})