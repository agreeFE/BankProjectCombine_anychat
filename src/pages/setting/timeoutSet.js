import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, Switch } from 'react-native';
import Header from '$/components/header'
import { CHECK } from './setImageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'

module.exports = class faceSet extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      faceUnlock: false,
      timeout: 5,
    };
  }

  back = () => {
    router.back()
  }
  timeClick = (time) => {
    // $Toast.info('当前版本不允许修改后台在线时间')
    // return
    var data = {}
    data.timeout = time;
    NetworkUtil.networkService('/user/setting/timeout', data, (response) => {
      console.log(response)
      this.getSetting()
    }, err => {console.warn('tag', err)})
    
  }
  componentDidMount() {
    this.getSetting()
  }
  //获取后台在线时长
  getSetting() {
    var data = {}
    let _this = this
    NetworkUtil.networkService('/user/setting/list', data, function (response) {
      console.log('时长', response.timeout)
      _this.setState({
        timeout: response.timeout
      })
    })
  }
  render() {
    return (
      <>
        <Header
          title={'后台在线设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <Text style={styles.textTitle}>设置后台在线时间：</Text>
          <TouchableWithoutFeedback onPress={() => { this.timeClick(5) }} >
            <View style={styles.bodyView}>
              <Text style={[styles.bodyViewText, { width: '85%' }]}>5分钟</Text>
              {this.state.timeout == 5 ? <Image style={{ width: 20, height: 20 }} source={CHECK} /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.timeClick(10) }} >
            <View style={styles.bodyView}>
              <Text style={[styles.bodyViewText, { width: '85%' }]}>10分钟</Text>
              {this.state.timeout == 10 ? <Image style={{ width: 20, height: 20 }} source={CHECK} /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.timeClick(15) }} >
            <View style={styles.bodyView}>
              <Text style={[styles.bodyViewText, { width: '85%' }]}>15分钟</Text>
              {this.state.timeout == 15 ? <Image style={{ width: 20, height: 20 }} source={CHECK} /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.textTitle}>如果程序在后台超过指定的时间，
        再次打开会自动注销登录状态</Text>
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
    // height: 48,
    fontFamily: 'PingFangSC-Medium',
    fontSize: 13,
    color: '#999999',
    letterSpacing: 0,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    flexWrap: 'wrap',
    paddingLeft: 34,
    paddingRight: 34
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
