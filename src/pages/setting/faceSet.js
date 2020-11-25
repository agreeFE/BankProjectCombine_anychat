import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, Switch } from 'react-native';
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD } from './setImageSource'
import scope from '$/scope'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
const tokenutil = require('$/util/tokenutil');

module.exports = class faceSet extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      faceUnlock: false
    };
  }

  back = () => {
    router.back()
  }
  setSwitch = () => {
    let _this = this
    var data = {}
    if (_this.state.faceUnlock) {
      _this.setState({
        faceUnlock: false
      })
      data.faceUnlock = 0
      NetworkUtil.networkService('/user/setting/face', data, function (response) {
        console.warn(response)
        //删除登录token
        var resp = ''
        $Storage.save({
          key: 'faceToken',
          data: JSON.stringify(resp)
        });
        ;
      })
    } else {
      TouchID.isSupported().then(result => {
        if (result === "FaceID") {
          TouchID.authenticate('', {
            title: '开启FaceID登录认证',
            cancelText: '取消',
            sensorDescription: '请正视摄像头',
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
              }
            })
          })
        } else {
          $Toast.fail('设备不支持')
        }
      })
    }
  }
  componentDidMount() {
    this.getSetting()
  }
  //获取人脸设置是否开启
  getSetting() {
    var data = {}
    let _this = this
    NetworkUtil.networkService('/user/setting/list', data, function (response) {
      if (response.faceUnlock == '1') {
        $Storage.load({
          key: 'faceToken'
        }).then(result => {
          console.warn('FaceID开通Token: ', result)
          if (result && tokenutil.verifyToken(result)) {
            console.warn('设置为true')
            _this.setState({
              faceUnlock: true
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
          title={'人脸设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <View style={styles.bodyView}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>使用面容ID登录</Text>
            <Switch value={this.state.faceUnlock} onValueChange={this.setSwitch} trackColor={{ true: $globalStyle.backgroundColor  }}>

            </Switch>
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
    paddingLeft: 24,
    justifyContent: 'center',
    width: '35%'
  }
})
