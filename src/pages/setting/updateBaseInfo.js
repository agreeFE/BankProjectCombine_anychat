import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, TextInput } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const RIGHTARROW = require('$image/home/my/right_arrow.png')
module.exports = class Feedback extends Component {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      textValue: window.updataBaseInfo.value,
    }
  } 
  componentDidMount() {
    let _this = this;
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Header
          title={'修改个人信息'}
          leftClick={this.back}
        ></Header>
        <View style={{flex: 1}}>
          <View style={styles.container}>
          {
            window.updataBaseInfo.key == 'userName' ? <Text>修改昵称</Text> 
            :<></>}
            {
            window.updataBaseInfo.key == 'selfIntroduction' ? <Text>修改个人简介</Text> 
            :<></>}
            {
            window.updataBaseInfo.key == 'detailAddress' ? <Text>修改收货地址</Text> 
            :<></>}
          </View>
          <View style={{backgroundColor: '#fff', marginTop: 10}}>
            <TextInput
              style={{minHeight: 80, paddingHorizontal: 20, fontSize: 16, textAlignVertical: 'top'}}
              value={this.state.textValue}
              multiline={true}
              placeholder='请输入您要修改的内容'
              placeholderTextColor='#ccc'
              onChange={this._onChange}
            ></TextInput>
          </View>
          <TouchableWithoutFeedback onPress={this.nextStep}>
            <LinearGradient style={{ width: '84%', marginHorizontal: '8%', height: 50, borderRadius: 10, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} colors={window.$globalStyle.buttonLinerBackground}>
              <Text style={styles.loginBtn}>保存</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  back = () => {
    router.back()
  }
  _onChange = (e) => {
    const {text} = e.nativeEvent
    this.setState({
      textValue: text
    })
  }
//提交
  nextStep = () => {
    let _this = this
    var data={
        [window.updataBaseInfo.key]:_this.state.textValue
    }
    console.warn(data)
    NetworkUtil.networkService('/user/selfinfomod', data, function (response) {
      NetworkUtil.networkService('/user/info', {}, (resp) => {
        $Storage.save({
          key: 'userInfo',
          data: JSON.stringify(resp)
        });
        $Toast.success('修改成功！')
        setTimeout(() => {
          router.back();
        }, 1000)
      })
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 1, 
    backgroundColor: '#fff',
    height :45, 
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 20
  },
  loginBtn: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    lineHeight: 25,
    color: '#FFFFFF',
  }
})