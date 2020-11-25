import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
const { setLoginToken } = require('$/util/tokenutil')
import scope from '$/scope'


module.exports = class moLoginPas extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      oldPasswd: '',
      newPasswd: '',
      newPasswdTwo: ''
    };
    this.oldPasswdChange = this.oldPasswdChange.bind(this);
    this.newPasswdChange = this.newPasswdChange.bind(this);
    this.newPasswdTwoChange = this.newPasswdTwoChange.bind(this);
  }

  back = () => {
    router.back()
  }
  updataPas() {
    $Toast.info('当前版本暂不支持修改登录密码')
    return
    var data = {}
    data.oldPasswd = this.state.oldPasswd
    data.newPasswd = this.state.newPasswd
    data.newPasswdTwo = this.state.newPasswdTwo
    if (data.newPasswd == data.newPasswdTwo) {
      NetworkUtil.networkService('/user/pwd/update', data, function (response) {
        console.warn('修改成功')
        $Toast.success('修改成功！')
        console.warn(response)
        setLoginToken(undefined)
        window.bankCard = undefined
        window.bankInfo = undefined
        setTimeout(function () {
            router.back()
        }, 1000);
      })
    } else {
      $Toast.success('两次密码不一致')
    }
  }
  oldPasswdChange(text) {
    this.setState({
      oldPasswd: text
    })
  }
  newPasswdChange(text) {
    this.setState({
      newPasswd: text
    })
  }
  newPasswdTwoChange(text) {
    this.setState({
      newPasswdTwo: text
    })
  }
  render() {
    return (
      <>
        <Header
          title={'修改登录密码'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <View style={styles.bodyView}>
            <Text style={styles.bodyViewText}>输入原密码</Text>
            <TextInput placeholder='请输入密码' secureTextEntry={true} style={styles.textInput} value={this.state.oldPasswd} onChangeText={this.oldPasswdChange}></TextInput>
          </View>
          <View style={styles.bodyView}>
            <Text style={styles.bodyViewText}>设置新密码</Text>
            <TextInput placeholder='请输入设置密码' secureTextEntry={true} style={styles.textInput} value={this.state.newPasswd} onChangeText={this.newPasswdChange}></TextInput>
          </View>
          <View style={styles.bodyView}>
            <Text style={styles.bodyViewText}>确认新密码</Text>
            <TextInput placeholder='请再次填写密码' secureTextEntry={true} style={styles.textInput} value={this.state.newPasswdTwo} onChangeText={this.newPasswdTwoChange}></TextInput>
          </View>

          <TouchableWithoutFeedback onPress={() => { this.updataPas() }} >
            <LinearGradient colors={$globalStyle.buttonLinerBackground}  style={{ marginTop: 60, height: 45, width: '86%', marginLeft: '7%', backgroundColor:$globalStyle.backgroundColor , alignItems: 'center', justifyContent: 'center',borderRadius: 5}}>
              <Text style={{ color: $globalStyle.textColor , fontFamily: 'PingFangSC-Medium', fontSize: 17, letterSpacing: 0, }}>提交</Text>
            </LinearGradient>


            
          </TouchableWithoutFeedback>

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
  bodyView: {
    height: 45,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyViewText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingLeft: 34,
    justifyContent: 'center',
    width: '50%'
  },
  textInput: {
    width: '48%',
    fontSize: 16,
    textAlign: 'right',
    paddingRight:24
  },
})
