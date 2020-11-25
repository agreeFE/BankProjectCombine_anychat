import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, AGREElOGO, RIGHTARROW } from './setImageSource'
const router = require('$/router-control')
import scope from '$/scope'
import SVG from "$/components/Svg";
module.exports = class aboutInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {

    };
  }

  back = () => {
    router.back()
  }

  render() {
    return (
      <>
        <Header
          title={'关于'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <View style={{ height: 187, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <SVG style={{ width: 150, height: 40 }} source={AGREElOGO} />
          </View>
          <View style={styles.bodyView}>
            <Text style={[styles.bodyViewText, { width: '90%' }]}>去评分</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
          </View>
          <View style={styles.bodyView}>
            <Text style={[styles.bodyViewText, { width: '90%' }]}>网络诊断</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 80, width: '100%', height: 70, position: 'absolute' }}>
            <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 12, color: '#999999' }}>我已同意<Text style={{ color: '#1278EF' }}>《赞同科技App服务协议》| 营业执照</Text></Text>
            <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 12, color: '#999999' }}>赞同科技  版权所有</Text>
            <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 12, color: '#999999' }}>@1994-2019 zantong.All Rights Reserved</Text>
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
    marginTop: 1,
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
