import React, { Component,  } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Platform,
  NativeModules,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native'
import First from './first'
import Second from './second'
import Third from './third'
import Fail from './fail'
import Success from './success'
import { QUOTA_CLOSE } from '../imageSource'
import scope from '@/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const { StatusBarManager } = NativeModules

const HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT

module.exports = class Face extends Component {
  constructor(props) {
    super(props)
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
    this.state = {
      success: false,
      fail: false,
      distinguish: false,
      photo: false
    }
  }
  render() {
    const { success, fail, distinguish, photo } = this.state
    return (
      <View style={sty.container}>
        <Text style={sty.headerFont}>人脸识别</Text>
        {
          (success || fail || distinguish || photo) ?
          <></>
          :
          <TouchableWithoutFeedback onPress={this.back}>
            <ImageBackground source={QUOTA_CLOSE} style={sty.image}></ImageBackground>
          </TouchableWithoutFeedback>
        }
        {
          success ? 
          <Success fnc={this.next}></Success>
          :
          (
            fail ? 
            <Fail back={this.quit} again={this.again}></Fail>
            :
            (
              distinguish ?
              <Third fnc={this.sucOrFail}></Third>
              :
              (
                photo ?
                <Second fnc={this.startDistinguish}></Second>
                :
                <First fnc={this.startPhoto}></First>
              )
            )
          )
        }
      </View>
    )
  }
  startPhoto = () => {
    this.setState({
      success: false,
      fail: false,
      distinguish: false,
      photo: true
    })
  }
  startDistinguish = () => {
    this.setState({
      success: false,
      fail: false,
      distinguish: true,
      photo: false
    })
  }

  sucOrFail = () => {
    NetworkUtil.networkService('/account/loans/loanQuotaApply',{}, response => {
      this.success()
    },
    err => {
      console.warn('err', err)
      this.fail()
    })
  }
  fail = () => {
    this.setState({
      success: false,
      fail: true,
      distinguish: false,
      photo: false
    })
  }
  success = () => {
    this.setState({
      success: true,
      fail: false,
      distinguish: false,
      photo: false
    })
  }

  quit = () => {
    this.setState({
      success: false,
      fail: false,
      distinguish: false,
      photo: false
    })
  }

  again = () => {
    this.setState({
      success: false,
      fail: false,
      distinguish: false,
      photo: true
    })
  }

  next = () => {
    router.replace('confirmInfo')
    this.setState({
      success: false,
      fail: false,
      distinguish: false,
      photo: false
    })
  }

  back = () => {
    router.replace('quotaApplyHome')
  }
  
}

const sty = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: "center",
    paddingTop: HEIGHT,
    position: "relative"
  },
  headerFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0.2,
    lineHeight: 24,
    marginTop: 39
  },
  image: {
    position: "absolute",
    right: 24,
    width: 15,
    height: 15,
    top: 20 + HEIGHT
  }
})
