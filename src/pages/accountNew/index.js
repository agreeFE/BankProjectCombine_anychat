import React, { Component,  } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Image,
  Easing,
  RefreshControl,
  ImageBackground,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import scope from '@/scope'
import '@/window'
import Header from '$/components/header'
import SVG from "$/components/Svg";
import ChangeText from './changeText'
import Modal from './modal'
import Info from './info'
import Range from './range'
import { BG, ELLIPSIS_L, RIGHT_ARROW, EYE_SHOW_W, EYE_CLOSE_W, WDDK } from './imageSource'
const NetworkUtil = require('$/util/networkutil')
const router = require('$/router-control')
const COLOR = ['#1278EF', '#EC9628', '#DA5512']

module.exports = class Account extends Component {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      startAnimated: true,
      isLoading: true,
      showMoney: true,
      animatedHeight: new Animated.Value(72),
      fund: 0,
      financial: 0,
      hasQuota: true
    }
  }
  render() {
    const { showMoney, animatedHeight, fixedIndex = -1, financial, fund,isLoading,
      showIndex = -1, scrollPercent = [0, 0, 0], accountValue, startAnimated } = this.state
    let totalMoney = (accountValue && (accountValue.assetsSum + accountValue.assetsDebts)) || 0,
      current = (accountValue && accountValue.assetsSum) || 0,
      debts = (accountValue && accountValue.assetsDebts) || 0,
      cardList = (accountValue && accountValue.result) || [];
    const { hasQuota, loanQuotaInfo } = this.state
    let [restQuota, usedQuota, restPerent, usedPerent] =
      [(loanQuotaInfo && loanQuotaInfo.restQuota) || '0', (loanQuotaInfo && loanQuotaInfo.usedQuota) || '0',
      (loanQuotaInfo && loanQuotaInfo.restQuota) / (loanQuotaInfo && loanQuotaInfo.tatalQuota) || 0,
      (loanQuotaInfo && loanQuotaInfo.usedQuota) / (loanQuotaInfo && loanQuotaInfo.tatalQuota) || 0,
      ]
    let totalMoney2 = Number(totalMoney) + fund + financial
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={payload => {
          setTimeout(() => {
            this.getData()
          }, 1);
        }}></NavigationEvents>
        <Header
          title={`账户总览`}
          imageBackground={0}
          leftClick={() => { router.back() }}
          rightClick={() => { }}
          headerStyle={{ backgroundColor: $globalStyle.account.bgColor }}
        ></Header>
        <ScrollView
          style={{ position: 'relative', flex: 1 }}
          scrollEventThrottle={1}
          stickyHeaderIndices={[fixedIndex]}
          onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          overScrollMode={'always'}
          bounces={true}//回弹ios
          ref={ref => this.myScrollView = ref}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.getData}
            />
          }
        >
          {/* 背景图 */}
          {/* <View style={[styles.imageBg,{zIndex: 1, }]}  ref={view => {this.changeColor = (view)}}></View>
          <ImageBackground source={ACCOUNT_BG} style={styles.imageBg}></ImageBackground> */}
          {/* 总金额  backgroundColor: $globalStyle.account.bgColor,*/}
          <View style={[styles.moneyCon, { zIndex: 1 }]} onLayout={(e) => { this._onLayout(e, 0) }}>
            <View style={{ position: 'absolute', paddingLeft: 32, width: "100%", height: '100%', zIndex: 9999 }}>
              <View style={[styles.totalMoney]}>
                <Text style={styles.totalMoneyFont}>总金额（元）</Text>
                <TouchableWithoutFeedback onPress={() => { this.setState({ showMoney: !showMoney, }) }}>
                  <View style={{ justifyContent: "center", alignItems: "center", width: 20, height: 20 }}>
                    <SVG source={showMoney ? EYE_SHOW_W : EYE_CLOSE_W} style={{ width: 18, height: 11, marginLeft: 4, zIndex: 11 }}></SVG>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              {
                // isLoading ? 
                // <ActivityIndicator color="#777" />
                // :
                showMoney ?
                <ChangeText styles={styles.moneyFont} fnc={this.formatMoney} money={totalMoney2} showMoney={showMoney}></ChangeText>
                :
                <Text style={[styles.moneyFont]}>****</Text>
              }
            </View>
            {/* <Text style={[styles.moneyFont]}>{this.formatMoney(totalMoney)}</Text> */}
          </View>
          {/* 三分类 */}
          <View style={[styles.moneyItemCon, { backgroundColor: !startAnimated ? $globalStyle.account.bgColor : 'transparent' }]} onLayout={(e) => { this._onLayout(e, 1) }}>
            <Animated.View style={{ height: animatedHeight, flexDirection: "row" }}>
              <TouchableWithoutFeedback onPress={() => { this.scrollTo(1) }}>
                <View style={styles.moneyItem}>
                  {
                    isLoading ? 
                    <ActivityIndicator color="#777" />
                    :
                    <Text style={[styles.moneyItemFont, { color: '#fff' }]}>{showMoney ? this.formatMoney(current) : '****'}</Text>
                  }
                  <Text style={[styles.moneyItemTitleFont, { color: '#fff' }]}>活期</Text>
                  <View style={{
                    height: 4, backgroundColor: COLOR[0], borderRadius: 3, marginTop: 4,
                    backgroundColor: showIndex === -1 || showIndex === 0 ? COLOR[0] : 'transparent',
                    width: 16 + scrollPercent[0] * 48
                  }}></View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { this.scrollTo(2) }}>
                <View style={styles.moneyItem}>
                  {
                    isLoading ? 
                    <ActivityIndicator color="#777" />
                    :
                    <Text style={[styles.moneyItemFont, { color: '#fff' }]}>{showMoney ? this.formatMoney(financial + fund) : '****'}</Text>
                  }
                  <Text style={[styles.moneyItemTitleFont, { color: '#fff' }]}>投资</Text>
                  <View style={{
                    height: 4, backgroundColor: COLOR[0], borderRadius: 3, marginTop: 4,
                    backgroundColor: showIndex === -1 || showIndex === 1 ? COLOR[1] : 'transparent',
                    width: 16 + scrollPercent[1] * 48
                  }}></View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { this.scrollTo(3) }}>
                <View style={styles.moneyItem}>
                  {
                    isLoading ? 
                    <ActivityIndicator color="#777" />
                    :
                    <Text style={[styles.moneyItemFont, { color: '#fff' }]}>{showMoney ? this.formatMoney(debts) : '****'}</Text>
                  }
                  <Text style={[styles.moneyItemTitleFont, { color: '#fff' }]}>本月剩余应还</Text>
                  <View style={{
                    height: 4, backgroundColor: COLOR[0], borderRadius: 3, marginTop: 4,
                    backgroundColor: showIndex === -1 || showIndex === 2 ? COLOR[2] : 'transparent',
                    width: 16 + scrollPercent[2] * 48
                  }}></View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>

            {/* <SVG source={BG} style={[styles.imageBg,{opacity: fixedIndex > 0 ? 0 : 1}]}></SVG> */}
          </View>
          {/* 背景图 */}
          <View style={{ width: 320, height: 173, backgroundColor: $globalStyle.account.bgColor, position: 'absolute', width: '100%', top: 0, zIndex: -1, elevation: -1 }}>
            <SVG source={BG} style={[styles.imageBg, { opacity: fixedIndex > 0 ? 0 : 1 }]}></SVG>
          </View>
          {/* 广告 */}
          <View style={styles.adCon}>
            <View style={styles.adCricle}></View>
            <Text style={styles.adFont}>新用户必购买的基金！3000点买指数正当时</Text>
          </View>
          {/* 活期 */}
          <View onLayout={(e) => { this._onLayout(e, 2) }}>
            <View style={styles.itemTitle}>
              <Text style={[styles.itemFont, { color: COLOR[0] }]}>活期</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => { router.load('balance') }}>
              <View style={styles.currentTotal}>
                <Text style={styles.currentLineFont}>人民币</Text>
                <View style={styles.currentMoney}>
                  {
                    isLoading ? 
                    <ActivityIndicator color="#777" />
                    :
                    <Text style={styles.currentMoneyFont}>{showMoney ? this.formatMoney(totalMoney) : '****'}</Text>
                  }
                  <SVG source={RIGHT_ARROW} style={{ width: 6, height: 12, marginLeft: 15 }}></SVG>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {
              cardList.map((item, index) => (
                <TouchableWithoutFeedback onPress={() => { this.showModal(item.accNo) }} key={index}>
                  <View style={[styles.currentTotal, { marginBottom: index === cardList.length - 1 ? 0 : 1 }]}>
                    <Text style={styles.currentLineFont}>尾号{(item.accNo).substr(-4)}</Text>
                    <View style={styles.currentMoney}>
                      <Text style={styles.currentMoneyFont}>{showMoney ? this.formatMoney(item.balance) : '****'}</Text>
                      <SVG source={ELLIPSIS_L} style={{ width: 3, height: 15, marginLeft: 18 }}></SVG>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))
            }
          </View>
          {/* 投资 */}
          <View onLayout={(e) => { this._onLayout(e, 3) }}>
            <View style={styles.itemTitle}>
              <Text style={[styles.itemFont, { color: COLOR[1] }]}>投资</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => { router.load('myFinancial') }}>
              <View style={styles.currentTotal}>
                <Text style={styles.currentLineFont}>理财</Text>
                <View style={styles.currentMoney}>
                  {
                    isLoading ? 
                    <ActivityIndicator color="#777" />
                    :
                    <Text style={styles.currentMoneyFont}>{showMoney ? this.formatMoney(financial) : '****'}</Text>
                  }
                  <SVG source={RIGHT_ARROW} style={{ width: 6, height: 12, marginLeft: 15 }}></SVG>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { router.load('myFund') }}>
              <View style={styles.currentTotal}>
                <Text style={styles.currentLineFont}>基金</Text>
                <View style={styles.currentMoney}>
                  {
                    isLoading ? 
                    <ActivityIndicator color="#777" />
                    :
                    <Text style={styles.currentMoneyFont}>{showMoney ? this.formatMoney(fund) : '****'}</Text>
                  }
                  <SVG source={RIGHT_ARROW} style={{ width: 6, height: 12, marginLeft: 15 }}></SVG>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* 负债 */}
          <View onLayout={(e) => { this._onLayout(e, 4) }}>
            <View style={styles.itemTitle} onLayout={(e) => { this._onLayout(e, 5) }}>
              <Text style={[styles.itemFont, { color: COLOR[2] }]}>负债</Text>
            </View>
            {
              hasQuota ?
                <View style={styles.liabilityCon}>
                  <View style={styles.liabilityTitle}>
                    <Text style={styles.liabilityTitleFont}>赞E贷</Text>
                    {/* <View style={styles.liabilityRight}>
                    <Text style={styles.liabilityRightFont}>详情</Text>
                    <SVG source={RIGHT_ARROW} style={{width: 12, height: 12, marginLeft: 8}}></SVG>
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
                        <Text style={styles.liabilityItemMoney}>¥ {this.formatMoney(restQuota)}</Text>
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
                        <Text style={styles.liabilityItemMoney}>¥ {this.formatMoney(usedQuota)}</Text>
                        <Text
                          style={styles.liabilityItemClick}
                        >我要还款</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                :
                <View style={{ width: '100%', height: 120, flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 10 }}>
                  <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingTop: 13, display: 'flex' }}>
                    <View style={{ width: '88%', flexDirection: 'row', alignItems: 'center', }}>
                      <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#333333' }}>赞E贷</Text>
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
            }
          </View>

          {/* 介绍info */}
          <Info></Info>

        </ScrollView>
      </View>
    )
  }

  onScroll = (event) => {
    const { headHeight, fixedHeight, currentToTop, investmentToTop, liabilityToTop, titleHeight } = this.state
    const eventY = event.nativeEvent.contentOffset.y
    //动画
    this.setState({ scroll: eventY == 0 })
    if (eventY > headHeight && this.state.startAnimated) {
      this.state.animatedHeight.setValue(0)
      Animated.timing(this.state.animatedHeight, {
        toValue: 72,
        duration: 800,
        easing: Easing.out(Easing.linear)
      }).start()
      this.setState({ fixedIndex: 1, startAnimated: false })
    }
    if (eventY < headHeight) {
      this.setState({ fixedIndex: -1, startAnimated: true })
    }
    let showIndex = -1
    const scrollPercent = new Array(3).fill(0)
    if (eventY > 0 && eventY < currentToTop + titleHeight - fixedHeight) {
      showIndex = 0
      scrollPercent.splice(0, 1, eventY / 20 > 1 ? 1 : eventY / 20)
    } else if (eventY >= currentToTop + titleHeight - fixedHeight && eventY < investmentToTop + titleHeight - fixedHeight) {
      showIndex = 1
      scrollPercent.splice(1, 1, (eventY - currentToTop - titleHeight + fixedHeight) / 20 > 1 ? 1 : (eventY - currentToTop - titleHeight + fixedHeight) / 20)
    } else if (eventY >= investmentToTop + titleHeight - fixedHeight) {
      showIndex = 2
      scrollPercent.splice(2, 1, (eventY - investmentToTop - titleHeight + fixedHeight) / 20 > 1 ? 1 : (eventY - investmentToTop - titleHeight + fixedHeight) / 20)
    }
    this.setState({ showIndex, scrollPercent })
  }

  scrollTo = (num) => {
    const { fixedHeight, currentToTop, investmentToTop, liabilityToTop } = this.state
    let scrollY
    switch (num) {
      case 1:
        scrollY = currentToTop - fixedHeight
        break;
      case 2:
        scrollY = investmentToTop - fixedHeight
        break;
      case 3:
        scrollY = liabilityToTop - fixedHeight
        break;

    }
    this.myScrollView.scrollTo({ x: 0, y: scrollY, animated: true })
  }

  _onLayout = (e, num) => {
    switch (num) {
      case 0:
        this.setState({ headHeight: e.nativeEvent.layout.height })
        break;
      case 1:
        this.setState({ fixedHeight: e.nativeEvent.layout.height })
        break;
      case 2:
        this.setState({ currentToTop: e.nativeEvent.layout.y })
        break;
      case 3:
        this.setState({ investmentToTop: e.nativeEvent.layout.y })
        break;
      case 4:
        this.setState({ liabilityToTop: e.nativeEvent.layout.y })
        break;
      case 5:
        this.setState({ titleHeight: e.nativeEvent.layout.height })
        break;
    }
  }

  getData = () => {
    let _this = this
    NetworkUtil.networkService('/account/assets', {}, response => {
      _this.setState({
        isLoading: false,
        accountValue: response,
        financial: financialFund.financial,
        fund: financialFund.fund
      })

      // 获取贷款信息
      NetworkUtil.networkService('/account/loans/loanQuotaQuery', {}, response => {
        _this.setState({
          hasQuota: true,
          loanQuotaInfo: response
        })
      }, err => {
        _this.setState({
          hasQuota: false
        })
      })
    })
  }


  formatMoney = (s) => {
    // n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }

  showModal = (item) => {
    $ActionSheet.showActionSheetWithOptions({
      // title: '选择登录方式',
      options: ['转账汇款', '收支明细', '购买理财', '取消'],
      cancelButtonIndex: 3,
      //destructiveButtonIndex: 0,
      tintColor: '#1567E5',
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            window.transferType = '1'
            router.load('transferInfo', { cardNum: item })
            break;
          case 1:
            router.load('balance', { cardNum: item })
            break;
          case 2:
            router.load('webview', {
              url: `http://${window.financialURL}/licaiProduct/financialProduct.html`
            })
            break;
        }
      }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: '#eee'
  },
  imageBg: {
    width: 220,
    height: 170,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  moneyCon: {
    alignItems: "flex-start",
    height: 101,
    paddingLeft: 32,
    justifyContent: "center"
  },
  totalMoney: {
    paddingTop: 13,
    flexDirection: "row",
    alignItems: "center",

  },
  totalMoneyFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#fff',
    letterSpacing: -0.36,
    lineHeight: 21
  },
  moneyFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 30,
    color: '#fff',
    letterSpacing: -0.72,
    lineHeight: 42,
    marginTop: 8,
    zIndex: 10,
    elevation: 10
  },
  moneyItemCon: {
    height: 72,
    elevation: 2,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  moneyItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 11,
  },
  moneyItemFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#333333',
    lineHeight: 22
  },
  moneyItemTitleFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#333333',
    lineHeight: 20
  },
  adCon: {
    height: 45,
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11
  },
  adCricle: {
    width: 5,
    height: 5,
    backgroundColor: '#F88D7B',
    borderRadius: 3,
    marginRight: 8
  },
  adFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#666666',
    lineHeight: 21
  },
  itemTitle: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  itemFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    lineHeight: 22
  },
  currentTotal: {
    flexDirection: "row",
    height: 59,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 1
  },
  currentLineFont: {
    fontFamily: 'PingFangSC-Regular',
    color: '#3A3A3A',
    fontSize: 16,
    lineHeight: 22
  },
  currentMoney: {
    flexDirection: 'row',
    alignItems: "center",
    height: '100%'
  },
  currentMoneyFont: {
    fontFamily: 'PingFangSC-Medium',
    color: '#333',
    fontSize: 16,
    lineHeight: 22
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
    lineHeight: 22
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
  }

})
