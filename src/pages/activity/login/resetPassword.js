import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, TextInput, } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import Pickers from '$/components/picker/pickerPro'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const RIGHTARROW = require('$image/home/my/right_arrow.png')
module.exports = class ResetPassWord extends Component {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      cert_type: '1001',
      cert_no: '',
      user_name: '',
      selectedValue: ['身份证'],
      showValue: ['身份证', '护照', '其他']
    }
  }

  render() {
    const { selectedValue, showValue } = this.state
    return (
      <View style={{flex: 1,}}>
        <Header
          title={'重置密码'}
          leftClick={this.back}
        ></Header>
        <View style={{flex: 1, backgroundColor: '#eee'}}>
          <View style={styles.container}>
            <Text>证件类型</Text>
            <TouchableWithoutFeedback onPress={this.showPicker}>
              <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                <Text>{selectedValue[0]}</Text>
                <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.container}>
            <Text>姓名</Text>
            <TextInput
              style={styles.input}
              placeholder='请输入您的姓名'
              onChange={(e) => {this._onChange(e,1)}}
            ></TextInput>
          </View>
          <View style={styles.container}>
            <Text>证件号</Text>
            <TextInput
              style={styles.input}
              placeholder='请输入您的证件号码'
              onChange={(e) => {this._onChange(e,2)}}
              maxLength={18}
            ></TextInput>
          </View>

          <TouchableWithoutFeedback onPress={this.nextStep}>
            <LinearGradient style={{ width: '84%', marginHorizontal: '8%', height: 50, borderRadius: 10, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} colors={window.$globalStyle.buttonLinerBackground}>
              <Text style={styles.loginBtn}>下一步</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
          <Pickers
            ref={ref => this.picker = ref}
            pickerData={showValue}
            selectedValue={selectedValue}
            onPickerConfirm={this.getValue}
          ></Pickers>
        </View>
      </View>
    )
  }

  back = () => {
    router.back()
  }

  _onChange = (e, index) => {
    switch(index) {
      case 1: 
        this.setState({
          user_name: e.nativeEvent.text
        })
        break;
      case 2: 
        this.setState({
          cert_no: e.nativeEvent.text
        })
        break;
    }
  }

  nextStep = () => {
    const { cert_no, cert_type, user_name, } = this.state
    let reg
    switch(cert_type) {
      case '1001':
        reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/g
        break;
    }
    if(!user_name) {
      $Toast.info('姓名不能为空，请重新输入')
      return
    }
    if(!cert_no) {
      $Toast.info('证件号码不能为空，请重新输入')
      return
    }
    if(! reg.test(cert_no)) {
      $Toast.info('证件号码格式有误，请重新输入')
      return
    }
    // router.replace('account',{info: this.state})
  }

  showPicker = () => {
    this.picker.init()
  }

  getValue = (item) => {
    this.setState({
      selectedValue: item
    })
  }
  

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 1, 
    backgroundColor: '#fff',
    height :45, 
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 20
  },
  input: {
    flex: 1,
    textAlign: 'right'
  },
  loginBtn: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    lineHeight: 25,
    color: '#FFFFFF',
  }
});