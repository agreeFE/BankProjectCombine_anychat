import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Switch from '$/components/switch'
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, RIGHTARROW } from './setImageSource'
const router = require('$/router-control');
import scope from '$/scope'


module.exports = class paySet extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {

    };
  }

  back = () => {
    router.back()
  }
  onClick(){
    router.load('maintenanceIDcard');
  }
  render() {
    return (
      <>
        <Header
          title={'预留信息管理'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <Text style={styles.textTitle}>身份证基本信息维护</Text>
          <TouchableWithoutFeedback onPress={() => { this.onClick() }} >
          <View style={[styles.bodyView]}>
            <Text style={[styles.bodyViewText, { width: '50%' }]}>证件号码</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.bodyViewText, { textAlign: 'right', width: '40%', color: '#9D9D9D'}]}>110108198902012213</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
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
  textTitle: {
    width: '100%',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#999999',
    letterSpacing: 0,
    paddingBottom: 15,
    paddingTop: 15,
    justifyContent:'center',
    paddingLeft: 30
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
    paddingLeft: 24,
    justifyContent: 'center',
    width: '60%'
  },
})
