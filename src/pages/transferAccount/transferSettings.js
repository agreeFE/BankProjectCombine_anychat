import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, } from 'react-native';
import Header from '$/components/header'
import { RIGHTARROW } from './imageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
import SVG from "$/components/Svg";

module.exports = class transferInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
  }
  back = () => {
    router.back()
  }
  goJumpOrClick(index) {
    switch (index) {
      case 1:
          router.load('transferMyFriend');
        break
      case 2:
          // router.load('thelimitFirstStep');
          router.load('transferLimit');
        break
      case 3:
          
        break
      case 4:
        break
    }
  }
  render() {
    return (
      <>
        <Header
          title={'转账设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(1) }} >
            <View style={[styles.bodyView]}>
              <Text style={styles.bodyViewText}>我的转账伙伴</Text>
              <SVG style={{ width: 6, height: 12, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(2) }} >
            <View style={[styles.bodyView]}>
              <Text style={styles.bodyViewText}>转账限额</Text>
              <SVG style={{ width: 6, height: 12, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(3) }} >
            <View style={[styles.bodyView]}>
              <Text style={styles.bodyViewText}>手机号收款卡设置</Text>
              <SVG style={{ width: 6, height: 12, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(4) }} >
            <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText,{width:'45%'}]}>银行预留手机</Text>
              <Text style={[styles.bodyViewText,{width:'45%',textAlign:'right',paddingRight:15}]}>{window.userPhone}</Text>
              <SVG style={{ width: 6, height: 12, }} source={RIGHTARROW} />
            </View>
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
    alignItems: 'center'
  },
  bodyViewText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingLeft: 24,
    justifyContent: 'center',
    width: '90%'
  }
})
