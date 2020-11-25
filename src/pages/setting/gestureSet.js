import React, { Component,  } from 'react'
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Header from '$/components/header'
import Switch from '$/components/switch'
import { BACK, ELLIPSIS, BACK_BG_HEAD } from './setImageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
const tokenutil = require('$/util/tokenutil');


module.exports = class gestureSet extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      gestureUnlock: false,
      gestureTrack: true
    };
  }

  back = () => {
    router.back()
  }
  setSwitch = () => {
    let _this = this
    var data = {}
    if (_this.state.gestureUnlock) {
      _this.setState({
        gestureUnlock: false
      })
      data.gestureUnlock = 0
      NetworkUtil.networkService('/user/setting/gesture', data, function (response) {
        console.warn(response)
        //删除登录token
        var resp = ''
        $Storage.save({
          key: 'gestureToken',
          data: JSON.stringify(resp)
        });
        $Storage.save({
          key: 'gestureTrack',
          data: true
        });
      })
    } else {
      router.load('setGesture')
    }
  }
  //获取人脸设置是否开启
  getSetting() {
    var data = {}
    let _this = this
    NetworkUtil.networkService('/user/setting/list', data, function (response) {
      if (response.gestureUnlock == '1') {
        $Storage.load({
          key: 'gestureToken'
        }).then(result => {
          console.warn('gestureID开通Token: ', result)
          if (result && tokenutil.verifyToken(result)) {
            console.warn('设置为true')
            _this.setState({
              gestureUnlock: true
            })
          }
        }).catch(err => {
          // 没有FingerToken，验证手势登录
        })
      }
      console.warn(response)
    })
    $Storage.load({
      key: 'gestureTrack'
    }).then(response => {
      this.setState({
        gestureTrack: response
      })
    }).catch(err => {
      this.setState({
        gestureTrack: true
      })
    })
  }

  setTrack = () => {
    $Storage.save({
      key: `gestureTrack`,
      data: !this.state.gestureTrack
    })
    this.setState({
      gestureTrack: !this.state.gestureTrack
    })
  }
  render() {
    return (
      <>
        <NavigationEvents onWillFocus={() => {this.getSetting()}}></NavigationEvents>
        <Header
          title={'手势设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <View style={styles.bodyView}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>使用手势密码登录</Text>
            <Switch value={this.state.gestureUnlock} onValueChange={this.setSwitch} trackColor={{ true: $globalStyle.backgroundColor }}>

            </Switch>
          </View>
          {
            this.state.gestureUnlock ? 
            <>
              <View style={styles.bodyView}>
                <Text style={[styles.bodyViewText, { width: '80%' }]}>显示手势轨迹</Text>
                <Switch value={this.state.gestureTrack} onValueChange={this.setTrack} trackColor={{ true: $globalStyle.backgroundColor }}>

                </Switch>
              </View>
              <TouchableWithoutFeedback onPress={() => {router.load('setGesture')}}>
                <View style={styles.bodyView}>
                  <Text style={[styles.bodyViewText, { width: '80%' }]}>修改手势密码</Text>
                </View>
              </TouchableWithoutFeedback>
            </>
            :
            <></>
          }

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
    marginTop: 10,
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
