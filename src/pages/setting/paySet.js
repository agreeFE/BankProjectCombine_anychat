import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
import TouchID from 'react-native-touch-id';
import Switch from '$/components/switch'
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, RIGHTARROW } from './setImageSource'
const router = require('$/router-control');
const NetworkUtil = require('$/util/networkutil');
import scope from '$/scope'


module.exports = class paySet extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      fingerPay: false
    };
  }

  back = () => {
    router.back()
  }

  render() {
    const { fingerPay } = this.state
    return (
      <>
        <Header
          title={'支付设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(1)}}>
            <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText, { width: '90%' }]}>修改支付密码</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(2)}}>
            <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText, { width: '90%' }]}>重置支付密码</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.bodyView]}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>指纹转账/支付</Text>
            <Switch value={fingerPay} trackColor={{ true: $globalStyle.backgroundColor }} onValueChange={this.changeFinger}>
            </Switch>
          </View>
          <Text style={styles.textTitle}>开通后，转账或支付时，可验证指纹快速完成付款</Text>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(3)}}>
            <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText, { width: '30%' }]}>刷脸支付</Text>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.bodyViewText, { textAlign: 'right', width: '60%', color: '#9D9D9D'}]}>开通后线下商户可刷脸支付</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.textTitle}>开通后，在商户门店可刷脸支付，无需携带手机</Text>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(4)}}>
            <View style={[styles.bodyView, { marginTop: 10 }]}>
              <Text style={[styles.bodyViewText, { width: '90%' }]}>免密支付</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.textTitle}>在商户开通免密扣款项目</Text>

        </View>
      </>
    )
  }

  itemClick = (index) => {
    switch(index) {
      case 1: 
        router.load('changePayPas')
        break;
      case 2: 
        router.load('resetPayPas')
        break;
      case 3: 
        router.load('facePay')
        break;
      case 4: 
        router.load('noSecretPay')
        break;

    }
  }


  changeFinger = () => {
    let _this = this
    var data = {}
    if (_this.state.fingerPay) {
      _this.setState({
        fingerPay: false
      })
      data.fingerPay = 0
      NetworkUtil.networkService('/account/payset/fingerprint', data, function (response) {
        console.warn(response)
        //删除登录token
        var resp = ''
        $Storage.save({
          key: 'fingerPayToken',
          data: JSON.stringify(resp)
        });
        $Toast.info('取消指纹支付')
        setTimeout(() => {
          router.back();
        }, 1000)
      })
    } else {
      TouchID.isSupported().then(result => {
        if (result === 'TouchID' || result === true) {
          TouchID.authenticate('', {
            title: '开启指纹支付认证',
            cancelText: '取消',
            sensorDescription: '请按压指纹传感器',
            imageColor: window.$globalStyle.buttonLinerBackground[0]
          }).then(authResult => {
            console.warn(authResult)
            data.bioId = '123321'
            data.fingerPay = 1
            NetworkUtil.networkService('/account/payset/fingerprint', data, function (response) {
              if (!response.token) {
              } else {
                _this.setState({
                  fingerPay: true
                })
                $Toast.success('开启成功')

                //保存人脸登录token
                $Storage.save({
                  key: 'fingerPayToken',
                  data: JSON.stringify(response.token)
                });
                $Toast.info('设置指纹支付成功')
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

}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
  },
  textTitle: {
    width: '100%',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 13,
    color: '#999999',
    letterSpacing: 0,
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 5,
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
