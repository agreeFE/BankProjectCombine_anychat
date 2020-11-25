import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Switch from '$/components/switch'
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, RIGHTARROW } from './setImageSource'
const router = require('$/router-control');
import scope from '$/scope'


module.exports = class msgSet extends Component<{}> {
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
          title={'消息中心设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>

          <Text style={styles.textTitle}>动账通知设置</Text>
          <View style={styles.bodyView}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>6225********6666</Text>
            <Switch value={true} trackColor={{ true: $globalStyle.backgroundColor }}>
            </Switch>
          </View>
          <View style={[styles.bodyView]}>
            <Text style={[styles.bodyViewText, { width: '40%' }]}>消息保留期限</Text>
            <Text style={[styles.bodyViewText, { textAlign: 'right', width: '50%' }]}>不限制</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
          </View>
          <Text style={styles.textTitle}>通知提醒设置（客户端打开时）</Text>
          <View style={styles.bodyView}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>声音</Text>
            <Switch value={false} trackColor={{ true: $globalStyle.backgroundColor }}>
            </Switch>
          </View>
          <View style={[styles.bodyView]}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>震动</Text>
            <Switch value={true} trackColor={{ true:$globalStyle.backgroundColor}}>
            </Switch>
          </View>
          <Text style={styles.textTitle}>消息免打扰设置</Text>
          <View style={styles.bodyView}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>社区</Text>
            <Switch value={false} trackColor={{ true: $globalStyle.backgroundColor }}>
            </Switch>
          </View>
          <View style={[styles.bodyView]}>
            <Text style={[styles.bodyViewText, { width: '80%' }]}>代办</Text>
            <Switch value={false} trackColor={{ true: $globalStyle.backgroundColor }}>
            </Switch>
          </View>
          <View style={[styles.bodyView, { marginTop: 20 }]}>
            <Text style={[styles.bodyViewText, { width: '90%' }]}>我关注的服务号</Text>
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
