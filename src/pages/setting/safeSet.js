import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, Switch, Picker } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, RIGHTARROW } from './setImageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
import TouchID from 'react-native-touch-id';

module.exports = class safeSet extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      gestureData: '未启用',
      fingerData: '未启用',
      faceData: '未启用',
      timeout: 5,
      fingerType:false,
      faceType:false,
    };
  }
  componentDidMount() {
    this.getSetting()
    this.getDeviceBioInfo()
  }
  //获取安全设置是否开启
  getSetting() {
    var data = {}
    let _this = this
    NetworkUtil.networkService('/user/setting/list', data, (response) => {
      // 指纹 
      $Storage.load({
        key: 'fingerToken'
      }).then(result => {
        this.setState({
          fingerData: response.fingerUnlock == '1' ? '已启用' : '未启用'
        })
      }).catch(err => {
        this.setState({
          fingerData: '未启用'
        })
      }) 
      // 手势
      $Storage.load({
        key: 'gestureToken'
      }).then(result => {
        this.setState({
          gestureData: response.gestureUnlock == '1' ? '已启用' : '未启用'
        })
      }).catch(err => {
        this.setState({
          gestureData: '未启用'
        })
      }) 
      //人脸
      if (response.faceUnlock == '1') {
        _this.setState({
          faceData: '已启用'
        })
      } else {
        _this.setState({
          faceData: '未启用'
        })
      }
      _this.setState({
        timeout: response.timeout
      })
      $Storage.save({
        key: 'loginWay',
        data: JSON.stringify(response)
      });
      window.loginTimeOut = (response.timeout) * 60000
      console.warn(response)
    })
  }
  getDeviceBioInfo() {
    console.warn('检查设备是否支持指纹/人脸登录')
    const _this = this
    TouchID.isSupported().then(result => {
      if (result === true || result === "TouchID") {
        // 指纹登录
        _this.setState({
          fingerType: true
        })
      } else if (result === "FaceID") {
        // FaceID登录
        _this.setState({
          faceType: true
        })
      }
    }).catch(err => {
      console.warn('设备不支持touchID', err)
    })
  }
  back = () => {
    router.back()
  }
  goJumpOrClick = (index) => {
    switch (index) {
      case 1:
        //修改登录密码
        router.load('moLoginPas');
        break
      case 2: //指纹登录
        router.load('fingerSet');
        break
      case 3: //手势登录
        router.load('gestureSet');
        break
      case 4: //面部登录
        router.load('faceSet');
        break
      case 5: //后台在线时长
        router.load('timeoutSet')
        break
      case 6: //日志查询
        router.load('operationLog');
        break
    }
  }

  willFocus = () => {
    this.getSetting()
    this.getDeviceBioInfo()
  }

  render() {
    return (
      <>
        <NavigationEvents onWillFocus={payload => { this.willFocus() }} /> 
        <Header
          title={'安全设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(1) }} >
            <View style={[styles.bodyView, { marginTop: 20 }]}>
              <Text style={[styles.bodyViewText, { width: '90%' }]}>修改登录密码</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>

          {this.state.fingerType ?  
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(2) }} >
            <View style={[styles.bodyView, { marginTop: 8 }]}>
              <Text style={[styles.bodyViewText, { width: '30%' }]}>指纹登录</Text>
              <Text style={[styles.bodyViewText, { textAlign: 'right', width: '60%', color: this.state.fingerData === '未启用' ? '#9D9D9D' : '#3A3A3A' }]}>{this.state.fingerData}</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>: <></>}


          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(3) }} >
            <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText, { width: '30%' }]}>手势登录</Text>
              <Text style={[styles.bodyViewText, { textAlign: 'right', width: '60%', color: this.state.gestureData === '未启用' ? '#9D9D9D' : '#3A3A3A' }]}>{this.state.gestureData}</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
            {this.state.faceType ?  
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(4) }} >
            <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText, { width: '30%' }]}>面部登录</Text>
              <Text style={[styles.bodyViewText, { textAlign: 'right', width: '60%', color: '#9D9D9D' }]}>{this.state.faceData}</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>: <></>}
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(5) }} >
            <View style={[styles.bodyView, { marginTop: 8 }]}>
              <Text style={[styles.bodyViewText, { width: '40%' }]}>后台在线时长</Text>
              <Text style={[styles.bodyViewText, { textAlign: 'right', width: '50%', color: '#3A3A3A' }]}>{this.state.timeout}分钟</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(6) }} >
            <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText, { width: '30%' }]}>日志查询</Text>
              <Text style={[styles.bodyViewText, { textAlign: 'right', width: '60%', color: '#9D9D9D' }]}>最近30天登录时间</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.bodyView]}>
            <Text style={[styles.bodyViewText, { width: '90%' }]}>安全小贴士</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
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
  textTitle: {
    width: '100%',
    height: 48,
    fontFamily: 'PingFangSC-Medium',
    fontSize: 13,
    color: '#999999',
    letterSpacing: 0,
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 34
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
    width: '60%'
  },
})
