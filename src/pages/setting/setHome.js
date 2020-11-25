import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, Modal } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, HEADPORTRAIT, RIGHTARROW } from './setImageSource'
const router = require('$/router-control');
import scope from '$/scope'

const { setLoginToken } = require('$/util/tokenutil')

module.exports = class setHome extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      userInfoData: {},//用户信息
      animationType: 'fade',//none slide fade
      modalVisible: false,//模态场景是否可见
      transparent: true,//是否透明显示
    };
  }
  componentDidMount() {

    let _this = this;
    _this.getUserInfo()
  }
  //获取用户信息
  getUserInfo() {
    let _this = this
    $Storage.load({
      key: 'userInfo'
    }).then(result => {
      var userInfo = JSON.parse(result);
      if (userInfo.verifyStatus == 1) {
        userInfo.verifyStatusType = '已实名认证'
      } else {
        userInfo.verifyStatusType = '未实名认证'
      }
      _this.setState((previousState) => {
        return ({
          userInfoData: userInfo,
        })
      });
    });
  }
  back = () => {
    router.back()
  }
  goJumpOrClick = (index) => {
    switch (index) {
      case 1:
        //用户信息
        router.load('basicInfo');
        break
      case 2: //安全设置
        router.load('safeSet');
        break
      case 3: //支付设置
        router.load('paySet');
        break
      case 4: //通知设置
        router.load('msgSet');
        break
      case 5: //清理缓存
        // router.load('comingSoon');
        break
      case 6: //意见反馈
        router.load('feedback');
        break
      case 7: //关于
        router.load('aboutInfo');
        break
      case 8: //展示退出弹窗
        this.setState({ modalVisible: true });
        break
      case 9: //关闭退出弹窗
        this.setState({ modalVisible: false });
        break
      case 10: //安全退出
        this.setState({ modalVisible: false });
        setLoginToken(undefined)
        router.back()
        break
    }
  }
  render() {
    let phone = this.state.userInfoData.phone || ''
    return (
      <>
        <Header
          title={'设置'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(1) }} >
            <View style={styles.headerView}>
              <View style={{ width: '75%', flexDirection: 'row', }}>
                <View style={{ justifyContent: 'center', paddingLeft: 24 }}><Image style={{ width: 58, height: 58, borderRadius: 30 }} source={HEADPORTRAIT} /></View>
                <View style={{ justifyContent: 'space-around', paddingLeft: 15, paddingVertical: 12 }}>
                  <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#3A3A3A', letterSpacing: 0, fontWeight: 'bold' }}>{this.state.userInfoData.cnName}</Text>
                  {/* <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#3A3A3A', letterSpacing: 0, fontWeight: 'bold' }}>{'马德政'}</Text> */}
                  <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 12, color: '#3A3A3A', letterSpacing: 0 }}>{`${phone.substr(0, 3)}****${phone.substr(-4)}`}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 14, color: '#999999', letterSpacing: 0 }}>修改信息</Text></View>
              <View style={{ justifyContent: 'center', paddingRight: 24 }}>
                <Image style={{ width: 14, height: 14 }} source={RIGHTARROW} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(2) }} >
            <View style={[styles.bodyView, { marginTop: 8 }]}>
              <Text style={styles.bodyViewText}>安全设置</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(3) }} >
            <View style={[styles.bodyView]}>
              <Text style={styles.bodyViewText}>支付设置</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(4) }} >
            <View style={[styles.bodyView]}>
              <Text style={styles.bodyViewText}>通知设置</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(5) }} >
            <View style={[styles.bodyView]}>
              <Text style={styles.bodyViewText}>清理缓存</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(6) }} >
            <View style={[styles.bodyView]}>
              <Text style={styles.bodyViewText}>意见反馈</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(7) }} >
            <View style={[styles.bodyView]}>
              <Text style={styles.bodyViewText}>关于</Text>
              <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(8) }} >
            <LinearGradient colors={$globalStyle.buttonLinerBackground} style={{ marginTop: 60, height: 45, width: '86%', marginLeft: '7%', backgroundColor: $globalStyle.backgroundColor, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
              <Text style={{ color: $globalStyle.textColor, fontFamily: 'PingFangSC-Medium', fontSize: 17, letterSpacing: 0, }}>安全退出</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.delHis(2)
          }}
        >
          <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ height: 178, width: '90%', marginLeft: '5%', alignItems: 'center', backgroundColor: 'white', borderRadius: 5 }}>
              <View style={{ height: 48, borderBottomColor: '#EBEBEB', borderBottomWidth: 1, width: '100%', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, color: '#333333', textAlign: 'center' }}>温馨提示</Text>
              </View>
              <View style={{ height: 80, width: '100%', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, color: '#333333', textAlign: 'center', }}>确定安全退出吗？</Text>
              </View>
              <View style={{ height: 80, width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(9) }} >
                  <View style={{ height: 35, width: '40%', borderColor: $globalStyle.backgroundColor, borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: $globalStyle.backgroundColor, }}>取消</Text></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(10) }} >
                  <LinearGradient colors={$globalStyle.buttonLinerBackground} style={{ marginLeft: '5%', height: 35, width: '40%', backgroundColor: $globalStyle.backgroundColor, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: '#FFFFFF', }}>确定</Text></LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
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
  headerView: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 80,
    flexDirection: 'row',
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
