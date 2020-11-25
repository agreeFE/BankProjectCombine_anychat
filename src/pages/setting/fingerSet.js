import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Header from '$/components/header'
import Switch from '$/components/switch'
import { BACK, ELLIPSIS, BACK_BG_HEAD } from './setImageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
const tokenutil = require('$/util/tokenutil');
import TouchID from 'react-native-touch-id';

module.exports = class fingerSet extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      fingerUnlock: false,
      touchID: false
    };
  }

  back = () => {
    router.back()
  }
  setSwitch = () => {
    let _this = this
    var data = {}
    if (_this.state.fingerUnlock) {
      _this.setState({
        fingerUnlock: false
      })
      data.fingerUnlock = 0
      NetworkUtil.networkService('/user/setting/finger', data, function (response) {
        console.warn(response)
        //删除登录token
        var resp = ''
        $Storage.save({
          key: 'fingerToken',
          data: JSON.stringify(resp)
        });
        $Toast.info('取消指纹登录')
        setTimeout(() => {
          router.back();
        }, 1000)
      })
    } else {
      TouchID.isSupported().then(result => {
        if (result === 'TouchID' || result === true) {
          TouchID.authenticate('', {
            title: '开启指纹登录认证',
            cancelText: '取消',
            sensorDescription: '请按压指纹传感器',
            imageColor: window.$globalStyle.buttonLinerBackground[0]
          }).then(authResult => {
            console.warn(authResult)
            data.bioId = '123321'
            data.fingerUnlock = 1
            NetworkUtil.networkService('/user/setting/finger', data, function (response) {
              console.warn(response)
              if (!response.token) {
              } else {
                _this.setState({
                  fingerUnlock: true
                })
                $Toast.success('开启成功')

                //保存人脸登录token
                $Storage.save({
                  key: 'fingerToken',
                  data: JSON.stringify(response.token)
                });
                $Toast.info('设置指纹登录成功')
                setTimeout(() => {
                  router.back();
                }, 1000)
              }
            })
          })
        } else {
          $Toast.fail('设备不支持')
        }
      })
    }

  }
  componentWillMount() {
    this.getSetting()
    this.getDeviceBioInfo()
  }
  getDeviceBioInfo() {
    console.warn('检查设备是否支持指纹/人脸登录')
    const _this = this
    TouchID.isSupported().then(result => {
      console.warn('result',result)
      if (result === true || result === "TouchID") {
        // 指纹登录
        _this.setState({
          touchID: result
        })
      }
    }).catch(err => {
      console.warn('设备不支持touchID', err)
    })
  }
  //获取指纹设置是否开启
  getSetting() {
    var data = {}
    let _this = this
    NetworkUtil.networkService('/user/setting/list', data, function (response) {
      if (response.fingerUnlock == '1') {
        $Storage.load({
          key: 'fingerToken'
        }).then(result => {
          console.warn('fingerID开通Token: ', result)
          if (result && tokenutil.verifyToken(result)) {
            console.warn('设置为true')
            _this.setState({
              fingerUnlock: true
            })
          }
        }).catch(err => {
          // 没有FingerToken，验证手势登录
        })
      }
      console.warn(response)
    })
  }
  render() {
    return (
      <>
        <Header
          title={'指纹设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <View style={styles.bodyView}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>指纹登录</Text>
            <Switch value={this.state.fingerUnlock} onValueChange={this.setSwitch} trackColor={{ true: $globalStyle.backgroundColor }}>
            </Switch>
          </View>

          {this.state.touchID === "TouchID" ?
            <Text style={{ color: '#9D9D9D', fontFamily: 'PingFangSC-Regular', letterSpacing: 0, fontsize: 13, paddingLeft: 34, paddingRight: 24 }}>
              开启后可以使用Touch ID 验证指纹快速完成登录,设置仅对本机生效，如需修改指纹，请在系统设置里操作。
            </Text> : <Text style={{ color: '#9D9D9D', fontFamily: 'PingFangSC-Regular', letterSpacing: 0, fontsize: 13, paddingLeft: 34, paddingRight: 24 }}>
              开启后可以使用指纹识别 验证指纹快速完成登录,设置仅对本机生效，如需修改指纹，请在系统设置里操作。
            </Text>}
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
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyViewText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingLeft: 34,
    justifyContent: 'center',
    width: '35%'
  }
})
