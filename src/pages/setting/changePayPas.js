import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, TextInput } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')

module.exports = class ChangePayPas extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      showOld: true,
      oldPayPas: '',
      newPayPas: '',
      newPayPasTwo: '',
    }
  }

  render() {
    const { showOld, oldPayPas, newPayPas, newPayPasTwo } = this.state
    return (
      <View style={{flex: 1}}>
        <Header
          title={'修改支付密码'}
          leftClick={this.back}
        ></Header>
        <View style={{flex: 1, backgroundColor: '#eee'}}>
          {
            showOld ? 
            <>
              <View style={{flexDirection: 'row', height: 45, backgroundColor: '#fff', paddingHorizontal: 20, alignItems: "center", marginTop: 10}}>
                <Text>原支付密码</Text>
                <TextInput
                  style={{flex: 1, textAlign: 'right'}}
                  placeholder='原支付密码'
                  value={oldPayPas}
                  onChange={(e) => {this._onChange(e,1)}}
                  keyboardType='numeric'
                  maxLength={6}
                  secureTextEntry
                ></TextInput>
              </View>
              <Text style={{textAlign: 'right', marginTop: 10, paddingHorizontal:20, color: '#0000a0'}}>忘记原支付密码</Text>
              <TouchableWithoutFeedback onPress={() => { this.nextStep() }} >
                <LinearGradient colors={$globalStyle.buttonLinerBackground}  style={{ marginTop: 40, height: 45, width: '86%', marginLeft: '7%', backgroundColor:$globalStyle.backgroundColor , alignItems: 'center', justifyContent: 'center',borderRadius: 5}}>
                  <Text style={{ color: $globalStyle.textColor , fontFamily: 'PingFangSC-Medium', fontSize: 17, letterSpacing: 0, }}>下一步</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </>
            :
            <>
              <View style={{flexDirection: 'row', height: 45, backgroundColor: '#fff', paddingHorizontal: 20, alignItems: "center", marginTop: 10}}>
                <Text>新支付密码</Text>
                <TextInput
                  ref={ref => this.textInput = ref}
                  style={{flex: 1, textAlign: 'right'}}
                  placeholder='请输入新支付密码'
                  value={newPayPas}
                  onChange={(e) => {this._onChange(e,2)}}
                  keyboardType='numeric'
                  maxLength={6}
                  secureTextEntry
                ></TextInput>
              </View>
              <View style={{flexDirection: 'row', height: 45, backgroundColor: '#fff', paddingHorizontal: 20, alignItems: "center", marginTop: 1}}>
                <Text>确认新支付密码</Text>
                <TextInput
                  style={{flex: 1, textAlign: 'right'}}
                  placeholder='请确认新支付密码'
                  value={newPayPasTwo}
                  onChange={(e) => {this._onChange(e,3)}}
                  keyboardType='numeric'
                  maxLength={6}
                  secureTextEntry
                ></TextInput>
              </View>
              <TouchableWithoutFeedback onPress={() => { this.ensure() }} >
                <LinearGradient colors={$globalStyle.buttonLinerBackground}  style={{ marginTop: 40, height: 45, width: '86%', marginLeft: '7%', backgroundColor:$globalStyle.backgroundColor , alignItems: 'center', justifyContent: 'center',borderRadius: 5}}>
                  <Text style={{ color: $globalStyle.textColor , fontFamily: 'PingFangSC-Medium', fontSize: 17, letterSpacing: 0, }}>确认修改</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </>
          }
        </View>
      </View>
    )
  }

  back = () => {
    router.back()
  }

  nextStep = () => {
    if(!this.state.oldPayPas) {
      $Toast.info('原支付密码不能为空')
      return
    }
    let data = {u_pay_password:this.state.oldPayPas }
    console.warn('data', data)
    // NetworkUtil.networkService('/account/pay_password/check',data, response => {
    //   console.warn('tag', response)
    // })
    // if(this.state.oldPayPas === '000000') {
      this.setState({
        showOld: false
      })
    // } else {
    //   $Toast.info('支付密码不正确')
    //   this.setState({
    //     oldPayPas: ''
    //   })
    // }
  }

  _onChange = (e,index) => {
    let { text } = e.nativeEvent
    switch(index) {
      case 1: 
        this.setState({
          oldPayPas: text
        })
        break;
      case 2: 
        this.setState({
          newPayPas: text
        })
        break;
      case 3: 
        this.setState({
          newPayPasTwo: text
        })
        break;
    }
  }

  ensure = () => {
    const { newPayPas, newPayPasTwo } = this.state
    if(newPayPas !== newPayPasTwo) {
      $Toast.info('两次密码输入不一致, 请重新输入')
      this.textInput.focus()
      this.setState({
        newPayPas: '',
        newPayPasTwo: ''
      })
      return
    }
    $Toast.info('当前版本暂不支持修改支付密码')
    // setTimeout(() => {
    //   $Toast.info('修改成功')
    //   router.back()
    // }, 500);
    
  }

}
const styles = StyleSheet.create({

})