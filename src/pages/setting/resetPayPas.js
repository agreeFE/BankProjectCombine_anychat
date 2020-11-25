import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, TextInput } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')

module.exports = class ResetPayPas extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      showCard: true,
      cardNum: '',
      newPayPas: '',
      newPayPasTwo: '',
    }
  }

  render() {
    const { showCard, cardNum, newPayPas, newPayPasTwo } = this.state
    return (
      <View style={{flex: 1}}>
        <Header
          title={'重置支付密码'}
          leftClick={this.back}
        ></Header>
        <View style={{flex: 1, backgroundColor: '#eee'}}>
          {
            showCard ? 
            <>
              <View style={{flexDirection: 'row', height: 45, backgroundColor: '#fff', paddingHorizontal: 20, alignItems: "center", marginTop: 10}}>
                <Text>银行卡号</Text>
                <TextInput
                  style={{flex: 1, textAlign: 'right',}}
                  placeholder='请输入完整卡号'
                  value={cardNum}
                  onChange={(e) => {this._onChange(e,1)}}
                  maxLength={23}
                  keyboardType='numeric'
                  underlineColorAndroid='transparent'
                ></TextInput>
              </View>
              {/* <Text style={{textAlign: 'right', marginTop: 10, paddingHorizontal:20, color: '#0000a0'}}>忘记原支付密码</Text> */}
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
                  underlineColorAndroid='transparent'
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
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
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
    if(!this.state.cardNum) {
      $Toast.info('银行卡号不能为空')
      return
    }
    // if(this.state.cardNum.replace(/[^\d]+/g, '') === '000000') {
      this.setState({
        showCard: false,
      })
    // } else {
    //   $Toast.info('银行卡号不正确')
    //   this.setState({
    //     cardNum: ''
    //   })
    // }
  }

  _onChange = (e,index) => {
    let { text } = e.nativeEvent
    switch(index) {
      case 1: 
      // .replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
        this.setState({
          cardNum: text.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
        })
        break;
      case 2: 
        if(text[4] == ' ') {
          return
        }
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
    $Toast.info('当前版本暂不支持重置支付密码')
    // setTimeout(() => {
    //   $Toast.info('修改成功')
    //   router.back()
    // }, 500);
    
  }

}
const styles = StyleSheet.create({

})
