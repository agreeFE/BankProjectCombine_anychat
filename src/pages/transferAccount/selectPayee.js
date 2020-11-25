import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, TextInput, Button, BVLinearGradient } from 'react-native';
import Header from '$/components/header'
import { RIGHTARROW, ADDBOOK } from './imageSource'
import SVG from "$/components/Svg";
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
import LinearGradient from 'react-native-linear-gradient'
const { mobilePhoneTest } = require("$/util/regexutil");

module.exports = class transferInfoAdrBook extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      username: '',//户名
      phone: '',//手机号
      phoneCheck: false, //手机号校验布尔值
    };
    this.usernameChange = this.usernameChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
  }
  usernameChange(text) {
    this.setState({ username: text })
  }
  phoneChange(text) {
    const newText = text.replace(/[^\d]+/, '');
    
    this.setState({ phone: newText })
  }
  next() {
    const { username, phone } = this.state
    window.transferType = 3
    if (username == '') {
      $Toast.info('请输入收款人姓名')
      return
    }
    if (phone == '') {
      $Toast.info('请输入收款人手机号')
      return
    }
    if (!mobilePhoneTest(phone)) {
      $Toast.info('请输入正确的手机号')
      return
    }
    window.friInfo = { 'payeeName': username, 'smsPhone': phone }
    router.load('transferInfo')
  }
  back = () => {
    router.back()
  }

  render() {
    let noOpacity = !!this.state.username && !!this.state.phone && this.state.phoneCheck
    return (
      <>
        <Header
          title={'选择收款人'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <View style={{ backgroundColor: '#FFFFFF' }}>
            <View style={[styles.inputInfoView, { height: 80 }]}>
              <View style={{ width: '15%', paddingLeft: 20 }}>
                <SVG style={{ width: 30, height: 32, }} source={ADDBOOK} />
              </View>
              <View style={{ paddingLeft: 20, width: '75%' }}>
                <Text style={{ fontSize: 15, color: '#3A3A3A', fontFamily: 'PingFangSC-Regular' }}>从通讯录中选择收款人</Text>
              </View>
              <Image style={{ width: 16, height: 16, }} source={RIGHTARROW} />
            </View>
            <View style={styles.inputInfoView}>
              <Text style={[styles.inputTitle, { width: '25%' }]}>姓名</Text>
              <TextInput placeholder='请输入收款人真实姓名' style={[styles.inputText]} value={this.state.username} onChangeText={this.usernameChange}></TextInput>
            </View>
            <View style={styles.inputInfoView}>
              <Text style={[styles.inputTitle, { width: '25%' }]}>手机号</Text>
              <TextInput placeholder='请输入收款人手机号码' style={[styles.inputText]} keyboardType='numeric' value={this.state.phone} onChangeText={this.phoneChange} maxLength={11}></TextInput>
            </View>
          </View>
          <Text style={{ paddingLeft: 20, color: $globalStyle.transfer.textColor, fontSize: 12, paddingTop: 10 }}>请确保收款人姓名为真实姓名</Text>
          <TouchableWithoutFeedback onPress={() => { this.next() }}>
            <LinearGradient colors={window.$globalStyle.buttonLinerBackground} style={[styles.butView, noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
              <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 17, fontFamily: 'PingFangSC-Medium' }}>下一步</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
          <View style={styles.instructionsView}>
            <Text style={styles.instructionsText}>说明：</Text>
            <Text style={styles.instructionsText}>1、通过手机银行进行通讯录转账，单笔/每日限额5000元。</Text>
            <Text style={styles.instructionsText}>2、如收款人手机号码已绑定收款账户（绑定账户需收款人另行开通），款项将实时入账，否则款项将在付款人账户中冻结直至收款人收款，或次日21:30前未收款自动解除交易。</Text>
            <Text style={styles.instructionsText}>3、收款人手机号可绑定银行卡收款，未绑定也可通过短信回复卡号收款。</Text>
          </View>
        </View>
      </>
    )
  }

}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
  },
  leftTitleText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingTop: 12,
    height: 45,
    paddingLeft: 20
  },
  inputInfoView: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    fontSize: 15,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  inputTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    letterSpacing: 0,
    width: '15%',
    paddingLeft: 20
  },
  inputText: {
    fontSize: 15,
    textAlign: 'right',
    width: '70%',
    fontFamily: 'PingFangSC-Regular'
  },
  inputImg: {
    width: 16,
    height: 16,
    marginLeft: 20
  },
  butView: {
    height: 45,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 50
  },
  accbodyView: {
    width: '100%',
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  instructionsView: {
    marginTop: 50
  },
  instructionsText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    paddingLeft: 20,
    paddingTop: 4,
    paddingRight: 12
  }
})
