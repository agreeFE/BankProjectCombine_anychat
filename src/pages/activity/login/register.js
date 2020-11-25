import React, { Component, } from 'react'
import { View, StyleSheet,Image, TextInput, Text,TouchableWithoutFeedback } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')

module.exports = class Register extends Component {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      register_type: '1',
      phone: '',
      pwd: '',
      verify_code: ''
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image source={require('$image/login/zhanghaoguanli.png')} style={styles.backgroundImage} />
        <Text style={styles.welcome}>{`Hello,`}</Text>
        <Text style={[styles.welcome, {marginTop: 2}]}>{`欢迎来到手机银行`}</Text>
        <View style={{flex: 1, paddingTop: 20}}>
        <>
             <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="请输入手机号"
                  placeholderTextColor="#C9C9C9"
                  keyboardType="numeric"
                  value={this.state.phone}
                  onChangeText={(e) => {this._onChange(e,0)}}></TextInput>
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="请输入密码"
                  placeholderTextColor="#C9C9C9"
                  secureTextEntry
                  value={this.state.pwd}
                  onChangeText={(e) => {this._onChange(e,1)}}></TextInput>
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="请输入验证码"
                  placeholderTextColor="#C9C9C9"
                  value={this.state.verify_code}
                  onChangeText={(e) => {this._onChange(e,2)}}></TextInput>
              </View>

              <View style={{ width: '100%', textAlign: 'center' }}>
                <TouchableWithoutFeedback onPress={this.register}>
                  <LinearGradient style={{ width: '84%', marginHorizontal: '8%', height: 50, borderRadius: 25, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} colors={window.$globalStyle.buttonLinerBackground}>
                    <Text style={styles.loginBtn}>注册</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </>
        </View>
      </View>
    )
  }

  _onChange = (e, index) => {
    let key = index ==0 ? 'phone' : index == 1 ? 'pwd' : 'verify_code'
    let obj = {}
    obj[key] = e
    this.setState(obj)
  }

  register = () => {
    const { phone, pwd, verify_code } = this.state
    if(!phone) {
      $Toast.info('请输入手机号')
      return
    }
    if(!pwd) {
      $Toast.info('请输入密码')
      return
    }
    if(!verify_code) {
      $Toast.info('请输入验证码')
      return
    }
    let data = {phone, pwd, verifyCode: verify_code}
    NetworkUtil.networkService("/user/register", data, result => {
      $Toast.info('注册成功')
      window.userPhone = phone
      let timer = setTimeout(() => {
        router.back()
        clearTimeout(timer)
      }, 500);
    })
  }

}
const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    marginTop: '6.6%',
    marginLeft: '-12.5%'
  },
  welcome: {
    color: $globalStyle.mine.textColor,
    fontFamily: 'PingFangSC-Medium',
    fontSize: 22,
    marginLeft: '10.7%',
    marginTop: '40%',
    lineHeight: 30
  },
  textInput: {
    marginLeft: '10.7%',
    width: '78.7%',
    marginTop: '5%',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    lineHeight: 22,
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1
  },
  loginBtn: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    lineHeight: 25,
    color: '#FFFFFF',
  }
})