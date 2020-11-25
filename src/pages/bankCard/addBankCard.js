import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, TextInput } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
let timeout
module.exports = class AddBankCard extends Component {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      cardNo: '', 
    }
  }

  render() {
    const { cardNo } = this.state
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Header
          title={'添加本人银行卡'}
          leftClick={() => { router.back() }}
        ></Header>
        <View style={{flex: 1}}>
          <Text style={{paddingHorizontal: 20, paddingVertical: 10 }}>支持多家银行</Text>
          <View style={styles.itemCon}>
            <Text style={{fontSize: 18}}>{`${userName.substr(0,1)}**`}</Text>
          </View>
          <View style={styles.itemCon}>
            <TextInput
              style={{flex: 1, fontSize: 18}}
              placeholder='本人银行卡号'
              value={cardNo}
              onChange={(e) => {this._onChange(e)}}
              keyboardType='numeric'
              maxLength={24}
              underlineColorAndroid='transparent'
            ></TextInput>
          </View>
          <TouchableWithoutFeedback onPress={() => { this.nextStep() }} >
              <LinearGradient colors={$globalStyle.buttonLinerBackground}  style={{ marginTop: 40, height: 45, width: '86%', marginLeft: '7%', backgroundColor:$globalStyle.backgroundColor , alignItems: 'center', justifyContent: 'center',borderRadius: 5}}>
                <Text style={{ color: $globalStyle.textColor , fontFamily: 'PingFangSC-Medium', fontSize: 17, letterSpacing: 0, }}>下一步</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  _onChange = (e) => {
    let { text } = e.nativeEvent
    this.setState({
      cardNo: text.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
    })
  }

  nextStep = () => {
    let cardNo = this.state.cardNo.replace(/[^\d]+/g, '')
    let info = {
      cardNo,
      certName: userName,
      phone: "13911092139",
      cardBank: "中国银行",
      certNo: '424542185611235602'
      // "alias": "别名"
    }
    NetworkUtil.networkService('/account/bankcard/add', info, response => {
      console.warn('tag', response)
    })
  }

}
const styles = StyleSheet.create({
  itemCon: {
    marginHorizontal: 20,
    height: 58,
    // backgroundColor: 'red',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  }
})