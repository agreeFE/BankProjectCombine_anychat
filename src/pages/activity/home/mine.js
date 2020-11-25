// 我的
import React, { Component,  } from 'react';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet, View, Text, ActivityIndicator, ART, Animated, Platform, StatusBar, RefreshControl, PixelRatio, Dimensions, Keyboard, ScrollView, Image, ImageBackground, TextInput, Button, TouchableWithoutFeedback, Modal } from 'react-native';
import EventBus from "$/components/eventBus/eventBus"
import Range from '$/pages/accountNew/range'
import SVG from "$/components/Svg";
import LinearGradient from "react-native-linear-gradient"
import { SEARCH, SEARCHBLACK, YUYIN_W, YUYIN_B, XIAOXI, XIAOXIBLACK, IMAGEBG, WDDK } from '../imageSource'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const { getYearMouth } = require('$/util/dateutil')
const { setLoginToken } = require('$/util/tokenutil')
const { formatMoney } = require('$/util/moneyutil')
const { getBankCard } = require('$/util/bankCardutil');
const { getLoginToken } = require('$/util/tokenutil');


const [EYEOPEN, EYECLOSE] = [require('$image/accountNew/eyeShow.svg'), require('$image/accountNew/eyeClose.svg')]

module.exports = class mine extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      getAccount: true,
      getBalance: true,
      cardArr: [], //记录卡片信息数组
      showMoney: true,
      hasQuota: true,
      changeColor: false,
      userInfoData: {},//用户信息
      accAss: {}, //账户总览
      billMouth: {},//本月收支
      bankNum: 0,//银行卡数
      animationType: 'fade',//none slide fade
      modalVisible: false,//模态场景是否可见
      transparent: true,//是否透明显示
      isRefresh: false, //下拉刷新
    };
    this.getUserInfo()
  }

  render() {
    const { getAccount, getBalance, showMoney, hasQuota, accAss, loanQuotaInfo, changeColor } = this.state
    let [restQuota, usedQuota, restPerent, usedPerent] =
      [(loanQuotaInfo && loanQuotaInfo.restQuota) || '0', (loanQuotaInfo && loanQuotaInfo.usedQuota) || '0',
      (loanQuotaInfo && loanQuotaInfo.restQuota) / (loanQuotaInfo && loanQuotaInfo.tatalQuota) || 0,
      (loanQuotaInfo && loanQuotaInfo.usedQuota) / (loanQuotaInfo && loanQuotaInfo.tatalQuota) || 0,
      ]
    {/* 账户总览 */ }
    let accInfo =
      <TouchableWithoutFeedback onPress={() => { this.goJump(4) }} >
        <View style={{ width: '100%', paddingBottom: 10, backgroundColor: '#FFFFFF', borderRadius: 4, width: '96%', marginLeft: '2%', marginTop: 16, justifyContent: 'flex-start', paddingLeft: 24 }}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingTop: 13, display: 'flex' }}>
            <View style={{ width: '88%', flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#333333', fontWeight: 'bold' }}>账户总览</Text>
              <TouchableWithoutFeedback onPress={this.toggleShowMoney} >
                <View style={{ width: 30, height: 16, }}>
                  <SVG style={{ width: 16, height: 16, marginLeft: 10 }} source={showMoney ? EYEOPEN : EYECLOSE} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Image style={{ width: 12, height: 12, alignItems: 'flex-end', alignContent: 'flex-end' }} source={require('$image/home/my/right_arrow.png')} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#333333' }}>总资产</Text>
          </View>
          <View style={{ marginTop: 5, alignItems: 'flex-start' }}>
            {
              getAccount ?
                <ActivityIndicator color='#777' />
                :
                <Text style={{ fontFamily: 'PingFangSC-Semibold', fontSize: 18, color: '#333333', fontWeight: 'bold' }}>{showMoney ? accAss.assets_sum : '******'}</Text>
            }
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#666666' }}>昨日收益</Text>
            {
              getAccount ?
                <ActivityIndicator color='#777' />
                :
                <Text style={{ fontFamily: 'PingFangSC-Semibold', fontSize: 14, color: '#EF714D', paddingLeft: 10 }}>{showMoney ? accAss.eraYesterday : '******'}</Text>
            }
          </View>
        </View>
      </TouchableWithoutFeedback>

    {/* 赞E贷 */ }
    let loan = hasQuota ?
      <View style={[styles.liabilityCon, { borderRadius: 4, width: '96%', marginLeft: '2%', marginTop: 16, }]}>
        <View style={styles.liabilityTitle}>
          <Text style={styles.liabilityTitleFont}>赞E贷</Text>
          {/* <View style={styles.liabilityRight}>
            <Text style={styles.liabilityRightFont}>详情</Text>
            <ImageBackground source={require('$image/home/my/right_arrow.png')} style={{ width: 12, height: 12, marginLeft: 2,marginRight:2 }}></ImageBackground>
          </View> */}
        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
          {/* 可用额度 */}
          <TouchableWithoutFeedback onPress={() => { router.load('confirmInfo') }}>
            <View style={styles.liabilityItem}>
              <View style={{ position: 'relative', width: 110, height: 60 }}>
                <Range perent={restPerent}></Range>
                <Text style={styles.liabilityItemTitle}>可用额度</Text>
              </View>
              <Text style={styles.liabilityItemMoney}>¥ {formatMoney(restQuota)}</Text>
              <Text
                style={styles.liabilityItemClick}
              >我要借钱</Text>
            </View>
          </TouchableWithoutFeedback>
          {/* 已用额度 */}
          <TouchableWithoutFeedback onPress={() => { router.load('loanRecord') }}>
            <View style={[styles.liabilityItem]}>
              <View style={{ position: 'relative', width: 110, height: 60 }}>
                <Range perent={usedPerent}></Range>
                <Text style={styles.liabilityItemTitle}>已用额度</Text>
              </View>
              <Text style={styles.liabilityItemMoney}>¥ {formatMoney(usedQuota)}</Text>
              <Text
                style={styles.liabilityItemClick}
              >我要还款</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* <Text style={styles.liabilityItemExtra}>最近还款日：2019-8-15</Text> */}
      </View>
      :
      <View style={{ width: '100%', height: 120, flex: 1, backgroundColor: '#FFFFFF', borderRadius: 4, width: '96%', marginLeft: '2%', marginTop: 16, justifyContent: 'flex-start', paddingLeft: 24 }}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingTop: 13, display: 'flex' }}>
          <View style={{ width: '88%', flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#333333', fontWeight: 'bold' }}>赞E贷</Text>
          </View>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row', display: 'flex' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 14, color: '#666666' }}>您最高可获得30万赞E贷额度哦</Text>
            <View style={{ height: 32, width: 75, textAlign: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, marginTop: 5, borderColor: $globalStyle.backgroundColor }}>
              <Text
                style={{ fontFamily: 'PingFangSC-Regular', fontSize: 14, color: $globalStyle.backgroundColor, textAlign: 'center', }}
                onPress={() => { router.load('quotaApplyHome') }}
              >获得额度</Text>
            </View>
          </View>
          <View style={{ width: '30%', alignItems: 'flex-end', paddingRight: 10, marginTop: -20 }}>
            <SVG style={{ width: 120, height: 76, alignItems: 'flex-end', alignContent: 'flex-end' }} source={WDDK} />
          </View>
        </View>
      </View>

    {/* 安全退出view */ }
    let quit =
      <TouchableWithoutFeedback onPress={() => { this.goJump(6) }} >
        <View style={{ width: '13%', height: 50, marginTop: 23, marginLeft: 10, alignItems: 'center' }}>
          <Text style={{ color: changeColor ? '#333333' : '#FFFFFF', fontSize: 11, marginTop: 11 }}>安全</Text>
          <Text style={{ color: changeColor ? '#333333' : '#FFFFFF', fontSize: 11 }}>退出</Text>
        </View>
      </TouchableWithoutFeedback>
    return (
      <>
        <NavigationEvents onWillFocus={payload => { this.getUserInfo() }}></NavigationEvents>
        <StatusBar
          barStyle={this.state.color}
        />
        <ScrollView
          style={styles.content}
          stickyHeaderIndices={[0]}
          onScroll={this._onScroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              // title={'Loading'}
              // colors={['red']}
              refreshing={false}
              // refreshing={this.state.isRefresh}
              onRefresh={this.onRefresh}
            // enabled={false}

            />
          }
        >
          {/* 搜索框主干 */}
          <View ref={ref => this.searchBar = ref} style={{ width: '100%', height: 88, elevation: 3, opacity: 1, backgroundColor: 'transparent' }}>
            <View style={[styles.allTopBox, { flex: 1, flexDirection: 'row' }]}>
              {/* 安全退出 */}
              {quit}
              {/* 搜索框 */}
              <View style={[styles.topSearchBox, { width: '72%', height: 50, marginTop: 25 }]}>
                {/* 搜索框 */}
                <View style={[styles.inputStyle, { borderColor: changeColor ? '#9298BE' : '#fff' }]}>
                  <Image style={styles.topSearchIco} source={changeColor ? SEARCHBLACK : SEARCH} />
                  <Text onPress={() => { this.goJump(3) }}
                    style={[styles.topSearchInput, { color: changeColor ? '#000' : "#fff", opacity: 0.6 }]}
                    placeholderTextColor={'#A3A8C5'}
                  >您有899红包待收</Text>
                  <SVG style={styles.topSearchIcoRight} source={changeColor ? YUYIN_B : YUYIN_W} />
                  {/* <Image style={styles.topSearchIcoRight} source={changeColor ? YUYINBLACK : YUYIN} /> */}
                </View>
              </View>
              {/* 消息 */}
              <TouchableWithoutFeedback onPress={() => { router.load('messageCenter') }}>
                <View style={{ width: '15%', height: 50, marginTop: 25, paddingRight: 20, justifyContent: "space-around", alignItems: 'center' }}>
                  <Image style={styles.earphone} source={changeColor ? XIAOXIBLACK : XIAOXI} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {/* 搜索框下方,到账户总览 */}
          <View style={{ marginTop: -88 }}>
            <ImageBackground source={IMAGEBG} style={{ width: '100%', height: 147 + 88, paddingTop: 108, zIndex: -1, }}>
              {/* 头像，姓名，登录，设置 */}
              <View style={{ width: '100%', height: 60, flex: 1, flexDirection: 'row' }}>
                <View style={{ width: '26%', alignItems: 'center', height: 60 }}>
                  <Image style={{ width: 58, height: 58, borderRadius: 30 }} source={require('$image/home/my/headPortrait.png')} />
                </View>
                <View style={{ width: '56%', justifyContent: 'space-around', height: 60, paddingVertical: 2 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'PingFangSC-Medium', fontWeight: 'bold' }}>{this.state.userInfoData.cnName}</Text>
                  {/* <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'PingFangSC-Medium', fontWeight: 'bold' }}>马德政</Text> */}
                  <Text style={{ color: '#FFFFFF', fontSize: 13, }}>上次登录  {this.state.userInfoData.lastLoginTime} </Text>
                </View>
                <TouchableWithoutFeedback onPress={() => { this.goJump(1) }}>
                  <View style={{ width: '18%', alignItems: 'center', height: 60, justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 13, }} >设置</Text>
                  </View>
                </TouchableWithoutFeedback>

              </View>
            </ImageBackground>

            <View style={{ width: '100%', height: 61, backgroundColor: '#FFFFFF', borderRadius: 4, width: '96%', marginLeft: '2%', marginTop: -55, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', fontFamily: 'PingFangSC-Medium' }}>
                {/* 银行卡，优惠，代办，积分情况 */}
                <TouchableWithoutFeedback onPress={() => { this.goJump(9) }}>
                  <View style={{ width: '25%', alignItems: 'center', height: 50 }}>
                    <Text style={{ color: '#333333', fontSize: 14 }} >银行卡</Text>
                    <Text style={{ color: $globalStyle.mine.textColor, fontSize: 20, }} >{this.state.bankNum}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJump(10) }}>
                  <View style={{ width: '25%', alignItems: 'center', height: 50 }}>
                    <Text onPress={() => { this.goJump(2) }} style={{ color: '#333333', fontSize: 14 }}>待办</Text>
                    <Text style={{ color: $globalStyle.mine.textColor, fontSize: 20, }}>0</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJump(11) }}>
                  <View style={{ width: '25%', alignItems: 'center', height: 50 }}>
                    <Text style={{ color: '#333333', fontSize: 14 }} >优惠</Text>
                    <Text style={{ color: $globalStyle.mine.textColor, fontSize: 20, }} >0</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJump(11) }}>
                  <View style={{ width: '25%', alignItems: 'center', height: 50 }}>
                    <Text style={{ color: '#333333', fontSize: 14 }} >积分</Text>
                    <Text style={{ color: $globalStyle.mine.textColor, fontSize: 20, }} >888</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          {/* 账户总览 */}
          {accInfo}
          {/* 本月收支 */}
          <TouchableWithoutFeedback onPress={() => { this.goJump(5) }} >
            <View style={{ width: '100%', height: 116, flex: 1, backgroundColor: '#FFFFFF', borderRadius: 4, width: '96%', marginLeft: '2%', marginTop: 16, justifyContent: 'flex-start', paddingLeft: 24 }}>
              <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingTop: 13, display: 'flex' }}>
                <View style={{ width: '88%', flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#333333', fontWeight: 'bold' }}>本月收支</Text>
                </View>
                <Image style={{ width: 12, height: 12, alignItems: 'flex-end', alignContent: 'flex-end' }} source={require('$image/home/my/right_arrow.png')} />
              </View>
              {
                getBalance ?
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator color='#777' />
                  </View>
                  :
                  (this.state.billMouth.exp == 0 && this.state.billMouth.inc == 0) ?
                  <>
                    <Text style={{marginTop: 10,paddingRight: 24, color: '#bbb' }}>本月暂无收支记录</Text>
                    <Text style={{marginTop: 10,paddingRight: 24, color: '#49A5FF', }}>快去记一笔吧</Text>
                  </>
                  :
                  <>
                    <View style={{ marginTop: 10, flexDirection: 'row', paddingRight: 24 }}>
                      <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#666666' }}>支出</Text>
                        <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 14, color: '#666666', marginTop: 5 }}>{showMoney ? formatMoney(this.state.billMouth.exp) : '******'}</Text>
                      </View>
                      <View style={{ width: '50%', alignItems: 'flex-end', }}>
                        <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#666666' }}>收入</Text>
                        <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 14, color: '#666666', marginTop: 5 }}>{showMoney ? formatMoney(this.state.billMouth.inc) : '******'}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', paddingRight: 24 }}>
                      <View style={{ height: 4, backgroundColor: '#DA8C2A', width: this.state.billMouth.expPer }}></View>
                      <View style={{ height: 4, backgroundColor: '#FFFFFF', width: '1%' }}></View>
                      <View style={{ height: 4, backgroundColor: $globalStyle.percentageLine, width: this.state.billMouth.incPer }}></View>
                    </View>
                  </>
              }

            </View>
          </TouchableWithoutFeedback>
          {/* 赞E贷*/}
          {loan}
          {/* 我的网点 */}
          {/* <View style={{ width: '100%', height: 45, flex: 1, backgroundColor: '#FFFFFF', borderRadius: 4, width: '96%', marginLeft: '2%', marginTop: 16, justifyContent: 'flex-start', paddingLeft: 24 }}>
              <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingTop: 13, display: 'flex' }}>
                <View style={{ width: '88%', flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#333333' }}>我的网点</Text>
                </View>
                <Image style={{ width: 12, height: 12, alignItems: 'flex-end', alignContent: 'flex-end' }} source={require('$image/home/my/right_arrow.png')} />
              </View>
            </View> */}
          {/* 我的推荐 */}
          {/* <View style={{ width: '100%', height: 45, flex: 1, backgroundColor: '#FFFFFF', borderRadius: 4, width: '96%', marginLeft: '2%', marginTop: 16, justifyContent: 'flex-start', paddingLeft: 24 }}>
              <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingTop: 13, display: 'flex' }}>
                <View style={{ width: '88%', flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#333333' }}>我的推荐</Text>
                </View>
                <Image style={{ width: 12, height: 12, alignItems: 'flex-end', alignContent: 'flex-end' }} source={require('$image/home/my/right_arrow.png')} />
              </View>
            </View> */}
          {/* 底部logo */}
          {/* 底部图片区域 */}
          <View style={styles.bottomImgBox}>
            <Image resizeMode="contain" style={styles.bottomImg} source={require('$image/agree_LOGO.png')} />
          </View>

        </ScrollView>
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
                <Text style={{ fontSize: 15, color: '#333333', textAlign: 'center' }}>确定安全退出吗？</Text>
              </View>
              <View style={{ height: 80, width: '100%', justifyContent: 'space-around', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => { this.goJump(7) }} >
                  <View style={{ height: 35, width: '40%', borderColor: $globalStyle.backgroundColor, borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: $globalStyle.backgroundColor }}>取消</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJump(8) }} >
                  <LinearGradient colors={$globalStyle.buttonLinerBackground} style={{ height: 35, width: '40%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: $globalStyle.textColor }}>确定</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }

  toggleShowMoney = () => {
    const { showMoney } = this.state
    this.setState({
      showMoney: !showMoney
    })
  }

  onRefresh = async () => {
    this.setState({
      isRefresh: true
    })
    await (this.getUserInfo())
    this.setState({
      isRefresh: false
    })
  }

  _onScroll = (event) => {
    let y = event.nativeEvent.contentOffset.y
    let opacityPercent = y / 88
    this.searchBar.setNativeProps({
      style: { opacity: (y < 88 && y > 5) ? opacityPercent : 1, backgroundColor: y > 88 / 2 ? '#fff' : 'transparent' }
    })
    StatusBar.setBarStyle(y > 88 / 2 ? 'dark-content' : 'light-content');
    this.setState({
      changeColor: (y > 88 / 2),
      color: (y > 88 / 2) ? 'dark-content' : 'light-content'
    })
  }
  //页面跳转
  goJump(index) {
    switch (index) {
      case 1:
        //设置
        router.load('setHome');
        break;
      case 2:
        //待办
        router.load('myToDo');
        break;
      case 3:
        //搜索
        router.load('search');
        break;
      case 4:
        //账户总览
        router.load('account');
        break;
      case 5:
        //收支明细
        router.load('balance');
        break;
      case 6:
        //展示退出弹窗
        this.setState({ modalVisible: true });
        break
      case 7:
        //关闭退出弹窗
        this.setState({ modalVisible: false });
        break
      case 8:
        //安全退出
        this.setState({ modalVisible: false });
        // router.popToTop();
        setLoginToken(undefined)
        window.bankCard = undefined
        window.bankInfo = undefined
        this.props.goToPage()
        break
      case 9:
        //我的银行卡
        router.load('mineBankCard', {
          cardArr: this.state.cardArr
        })
        break
      case 10:
        //我的待办
        router.load('mineToDo');
        break
      case 11:
        //敬请期待
        // router.load('comingSoon');
        break
    }
  };

  //获取用户数据
  getUserInfo() {
    let _this = this;
    if (!getLoginToken().data) {
      this.goJump(8)
      return
    }
    //获取用户上次登录状态
    var data = {}
    NetworkUtil.networkService('/user/op/lastlog', data, function (response) {
      var lastLoginTime = response.loginTime
      // console.warn('登录状态', lastLoginTime)
      //获取用户偏好数据
      _this.getOtherUserInfo()
      $Storage.load({
        key: 'userInfo'
      }).then(result => {
        var userInfo = JSON.parse(result);
        // console.warn('用户信息', userInfo)
        userInfo.lastLoginTime = lastLoginTime
        // console.warn('用户信息result', userInfo.lastLoginTime)
        _this.setState((previousState) => {
          return ({
            userInfoData: userInfo,
          })
        });
      });
    })
  }
  getOtherUserInfo() {
    let _this = this;
    var data = {}
    //获取账户总览数据
    NetworkUtil.networkService('/account/assets', data, function (response) {
      var accAss = {}
      accAss.assets_sum = formatMoney(Number(response.assetsSum) + financialFund.financial + financialFund.fund)
      // accAss.eraYesterday = formatMoney((response.assets_sum) / 10000)
      accAss.eraYesterday = formatMoney(financialFund.financialEarn + financialFund.fundEarn)
      _this.setState((previousState) => {
        return ({
          accAss: accAss,
          getAccount: false
        })
      });
    })

    //获取本月收支数据
    billMouthData = {}
    billMouthData.month = getYearMouth()
    NetworkUtil.networkService('/account/bill/list', billMouthData, function (response) {
      var billMouth = {}
      billMouth.exp = response.exp  //支出
      billMouth.inc = response.inc //收入
      if (billMouth.exp == billMouth.inc) {
        billMouth.expPer = '49.5%' //支出百分比
        billMouth.incPer = '49.5%'  //收入百分比
      } else if (billMouth.exp == 0) {
        billMouth.expPer = '0%' //支出百分比
        billMouth.incPer = '99%'  //收入百分比
      } else if (billMouth.inc == 0) {
        billMouth.expPer = '99%' //支出百分比
        billMouth.incPer = '0%'  //收入百分比
      } else {
        let expPer = ((Number(billMouth.exp) / (Number(billMouth.exp) + Number(billMouth.inc))) * 100)
        let incPer = ((Number(billMouth.inc) / (Number(billMouth.exp) + Number(billMouth.inc))) * 100)
        expPer = expPer > 90 ? 90 : expPer < 10 ? 10 : expPer
        incPer = incPer > 90 ? 90 : incPer < 10 ? 10 : incPer
        billMouth.expPer = (expPer - 0.05) + '%'//支出百分比
        billMouth.incPer = (incPer - 0.05) + '%' //收入百分比
      }
      // billMouth.exp = formatMoney(billMouth.exp)  //支出
      // billMouth.inc = formatMoney(billMouth.inc) //收入

      _this.setState((previousState) => {
        return ({
          billMouth: billMouth,
          getBalance: false
        })
      });
    })

    //获取绑定银行卡数
    // getBankCard(this.getCard)
    let info = { classify: 2 }
    NetworkUtil.networkService('/account/bankcard/list', info, response => {
      this.setState({
        bankNum: response.appBankCards.length,
        cardArr: response.appBankCards
      })
    })
    // 获取贷款信息
    NetworkUtil.networkService('/account/loans/loanQuotaQuery', {}, response => {
      // setTimeout(()=> {
      this.setState({
        hasQuota: true,
        loanQuotaInfo: response
      })
      // },5000)
      // console.warn('可贷款额度信息:' + JSON.stringify(response))
    }, err => {
      // setTimeout(()=> {
      this.setState({
        hasQuota: false
      })
      // },5000)
    })
  }
  getCard = (cardArr) => {
    console.warn('tag', this.state)
    this.setState({
      bankNum: cardArr.length,
      cardArr
    })
  }

  changeColor(data) {
    this.setState({
      color: data ? 'dark-content' : 'light-content'
    })
  }
}
const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: "#F6F7FF"
  },
  allTopBox: {
    paddingRight: 5,
    paddingTop: 13,
  },
  // 顶部查询
  topSearchBox: {
    // backgroundColor: 'powderblue',
    paddingTop: 8,
    paddingLeft: 15,
    paddingRight: 15
  },
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height: 32,
    lineHeight: 32,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#9298BE"
  },
  topSearchIco: {
    marginLeft: 10,
    width: 14,
    height: 14
  },
  topSearchIcoRight: {
    width: 16,
    height: 16,
    marginRight: 16
  },
  earphone: {
    // textAlign: "center",
    width: 20,
    height: 20,
  },
  topSearchInput: {
    flex: 1,
    lineHeight: 26,
    paddingLeft: 5,
    fontSize: 14,
    color: "#A3A8C5",

  },
  allTopBoxBottomIco: {
    width: 22,
    height: 22,
    marginBottom: 5
  },
  allTopBoxBottomNameSe: {
    color: "#333333",
    fontSize: 12,
    fontFamily: 'PingFangSC-Regular'
  },
  liabilityCon: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    height: 210
  },
  liabilityTitle: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  liabilityTitleFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
    fontWeight: 'bold'
  },
  liabilityRight: {
    flexDirection: "row",
    alignItems: 'center',
    height: '100%'
  },
  liabilityRightFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    lineHeight: 18
  },
  liabilityItem: {
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  liabilityItemTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    position: 'absolute',
    top: '50%',
    left: '25%'
  },
  liabilityItemMoney: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#49A5FF',
    lineHeight: 21
  },
  liabilityItemClick: {
    marginTop: 12,
    width: 75,
    height: 32,
    textAlign: "center",
    lineHeight: 32,
    borderColor: '#4494F2',
    borderWidth: 1,
    borderRadius: 16,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#1278EF'
  },
  liabilityItemExtra: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'right',
    color: '#EE8511',
    paddingRight: 10,
    top: -8
  },
  bottomImg: {
    width: '60%',
    marginLeft: "20%",
    height: 44,
    // marginTop: 38
  },
  bottomImgBox: {
    width: '100%',
    margin: 10
  },
});
