import React, { Component,  } from 'react';
import { StyleSheet, Image, View, ScrollView, KeyboardAvoidingView, Easing, Button, Text, Animated, TouchableWithoutFeedback } from 'react-native';

import { Close, OPEN } from './imageSource/imageSource';
import TotalPayments from './TotalPayments'
import Pickers from '$/components/picker'
const LOANTIME = [
  {
    key: '-1',
    value: "请选择",
    label: "c++"
  },
  {
    key: '0',
    value: "1个月",
    label: "c++"
  },
  {
    key: '1',
    value: '2个月',
    label: 'java'
  },
  {
    key: '2',
    value: '3个月',
    label: 'android'
  },
  {
    key: '3',
    value: '6个月',
    label: 'iOS'
  },
  {
    key: '4',
    value: '12个月',
    label: 'iOS'
  },
  {
    key: '5',
    value: '24个月',
    label: 'iOS'
  },
  {
    key: '6',
    value: '36个月',
    label: 'iOS'
  },
]
const CARDLIST = [
  {
    key: '-1',
    value: '请选择',
    label: 'iOS'
  },
  {
    key: '1',
    value: '6245********7650',
    label: 'iOS'
  },
  {
    key: '2',
    value: '6365********1265',
    label: 'iOS'
  },
  {
    key: '3',
    value: '6238********9873',
    label: 'iOS'
  },
  {
    key: '4',
    value: '6248********1586',
    label: 'iOS'
  },
  {
    key: '5',
    value: '6215********0853',
    label: 'iOS'
  },
]
const USELOAN = [
  {
    key: '-1',
    value: '请选择',
    label: 'iOS'
  },
  {
    key: '1',
    value: '买房',
    label: 'iOS'
  },
  {
    key: '2',
    value: '买车',
    label: 'iOS'
  },
  {
    key: '3',
    value: '旅游',
    label: 'iOS'
  },
  {
    key: '4',
    value: '教育',
    label: 'iOS'
  },
  {
    key: '5',
    value: '投资',
    label: 'iOS'
  },
]
const REAPYMENTMODE = [
  {
    key: '-1',
    value: '请选择',
    label: 'iOS'
  },
  {
    key: '1',
    value: '等额本金',
    label: 'iOS'
  },
  {
    key: '2',
    value: '等额本息',
    label: 'iOS'
  },
  {
    key: '3',
    value: '等本等息',
    label: 'iOS'
  },
  {
    key: '4',
    value: '一次贷款不定期还款',
    label: 'iOS'
  },
  {
    key: '5',
    value: '前期按月付息，后期等额本金',
    label: 'iOS'
  },
]
const REAPYMENTDATE = [
  {
    key: '-1',
    value: '请选择',
    label: 'iOS'
  },
  {
    key: '1',
    value: '1日',
  },
  {
    key: '2',
    value: '2日',
  },
  {
    key: '3',
    value: '3日',
  },
  {
    key: '4',
    value: '4日',
  },
  {
    key: '5',
    value: '5日',
  },
  {
    key: '6',
    value: '6日',
  },
  {
    key: '7',
    value: '7日',
  },
  {
    key: '8',
    value: '8日',
  },
  {
    key: '9',
    value: '9日',
  },
  {
    key: '10',
    value: '10日',
  },
  {
    key: '11',
    value: '11日',
  },
  {
    key: '12',
    value: '12日',
  },
]
class ServiceAgreement extends Component {
  closePage() {
    // alert('关闭页面')
    this.props.callBackHome('子组件点击了一下')
  }
  state = {
    getDateValue: '', //传入picker选择器的confirm函数
    pageSwitch: true, //页面组件选择器
    showModal: false,
    clickLeft: false,
    clickRight: false,
    opacity: new Animated.Value(0),
    showData: 'date',
    pickIndex: 0, //模态框被选择的索引值
    loanTimeIndex: 0, // 贷款时长
    cardListIndex: 0, // 放还款卡号
    useLoanIndex: 0, // 贷款用途
    repaymentModeIndex: 0, //还款方式索引
    repaymentDayIndex: 0, //还款日索引
    loanAreaConfig: [
      LOANTIME, CARDLIST, USELOAN
    ], //贷款选项卡中的三个选择列表
    repaymentAreaConfig: [
      REAPYMENTMODE, REAPYMENTDATE
    ], //还款选项卡中的两个选择列表
    loanAreaData: [
      { title: "贷款时长" },
      { title: "放款/还款卡号" },
      { title: "贷款用途" },
    ],
    repaymentMode: [
      { title: "还款方式" },
      { title: "还款日" },
      { title: "还款计划" },
    ]
  }
  // 分配贷款区域的点击事件
  loanChooseClick = (index) => {
    let { clickLeft, showModal } = this.state
    if (clickLeft) return
    if (!showModal) {
      this.showModal()
    }
    if (index == 0) {
      // 选择贷款时长
      this.setState((state, props) => ({
        clickLeft: !clickLeft,
        clickRight: false,
        showData: LOANTIME,
        pickIndex: state.loanTimeIndex,
        getDateValue: this.setloanTimeIndex
      }))
    }
    if (index == 1) {
      // 选择收放款账号
      this.setState((state, props) => ({
        clickLeft: !clickLeft,
        clickRight: false,
        showData: CARDLIST,
        pickIndex: state.cardListIndex,
        getDateValue: this.setcardListIndex
      }))
    }
    if (index == 2) {
      // 选择贷款用途
      this.setState((state, props) => ({
        clickLeft: !clickLeft,
        clickRight: false,
        showData: USELOAN,
        pickIndex: state.useLoanIndex,
        getDateValue: this.setuseLoanIndex
      }))
    }
  }
  // 分配还款模式的点击事件
  repaymentModeClick = (index) => {
    let { clickLeft, showModal } = this.state
    if (clickLeft) return
    // 这里index不能等于2，否则查看还款计划详情时会打开模态框
    if (!showModal && index != 2) {
      this.showModal()
    }
    if (index == 0) {
      this._scrollView.scrollTo({ x: 0, y: 1000, animated: true })
      // 选择还款方式
      this.setState((state, props) => ({
        clickLeft: !clickLeft,
        clickRight: false,
        showData: REAPYMENTMODE,
        pickIndex: state.repaymentModeIndex,
        getDateValue: this.setrepaymentModeIndex
      }))
    }
    if (index == 1) {
      this._scrollView.scrollTo({ x: 0, y: 1000, animated: true })
      // 选择还款日
      this.setState((state, props) => ({
        clickLeft: !clickLeft,
        clickRight: false,
        showData: REAPYMENTDATE,
        pickIndex: state.repaymentDayIndex,
        getDateValue: this.setrepaymentDayIndex
      }))
    }
    if (index == 2) {
      // 选择贷款用途
      this.viewDetails()
    }
  }
  viewDetails = () => {
    this.setState({
      pageSwitch: !this.state.pageSwitch
    })
  }
  // 设置贷款时间索引
  setloanTimeIndex = (value) => {
    this.setState({
      loanTimeIndex: value.index
    })
  }
  // 设置放款还款账号索引
  setcardListIndex = (value) => {
    this.setState({
      cardListIndex: value.index
    })
  }
  // 设置贷款用途索引
  setuseLoanIndex = (value) => {
    this.setState({
      useLoanIndex: value.index
    })
  }
  // 设置还款方式索引
  setrepaymentModeIndex = (value) => {
    this.setState({
      repaymentModeIndex: value.index
    })
  }
  // 设置还款日索引
  setrepaymentDayIndex = (value) => {
    this.setState({
      repaymentDayIndex: value.index
    })
  }
  // 显示模态框
  showModal = () => {
    this.setState({
      showModal: true
    }, () => {
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 1,
        }
      ).start()
    })
  }

  // 关闭模态框
  closeModal = () => {
    this.setState({
      showModal: false,
      clickLeft: false,
      clickRight: false
    }, () => {
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0,
        }
      ).start()
    })
  }
  render() {
    let { pageSwitch } = this.state;
    let { showModal, loanAreaConfig, repaymentAreaConfig, repaymentModeIndex, repaymentDayIndex, loanTimeIndex, cardListIndex, useLoanIndex, clickLeft, clickRight, opacity } = this.state
    return (
      pageSwitch ?
        <View style={{ flex: 1, position: 'relative' }}>
          <ScrollView style={{ flex: 1 }} ref={component => this._scrollView = component} keyboardShouldPersistTaps='always'>
            <View style={[styles.container, { marginBottom: 50 }]}>
              <TouchableWithoutFeedback onPress={() => { this.props.closeHome('子组件点击了一下') }}>
                <View style={styles.close}>
                  <Image source={Close}></Image>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.topPart}>
                <View style={styles.stripe}></View>
                <Text style={styles.loanInfo}>确认贷款信息</Text>
              </View>
              <View style={styles.middlePart}>
                <View style={[styles.loanAmount, styles.gap]}>
                  <Text style={styles.loanTitle}>
                    贷款金额
                </Text>
                  <Text style={styles.loanContent}>
                    ¥ 100,000.00
                </Text>
                </View>
                {/* 贷款区域 */}
                <View style={[styles.loanChoose, styles.gap]}>
                  {
                    this.state.loanAreaData.map((ele, index) => {
                      // 因为此dom为循环渲染，所以需以index值来决定不同传参，
                      let datePickIndex = [loanTimeIndex, cardListIndex, useLoanIndex][index]
                      // 获取picker选择的值
                      let value = loanAreaConfig[index][datePickIndex].value
                      return (
                        <View style={styles.loanItem}>
                          <Text>{ele.title}</Text>
                          <TouchableWithoutFeedback onPress={() => { this.loanChooseClick(index) }}>
                            <View style={styles.loanItemRight}>
                              <Text style={[index == 2 ? styles.useLoan : '', styles.loanItemRightText]}>{value}</Text>
                              <Image source={OPEN}></Image>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      )
                    })
                  }
                </View>
                {/* 年利率 */}
                <View style={[styles.interestRate, styles.gap]}>
                  <Text style={styles.interestRateTitle}>年利率</Text>
                  <View style={styles.interestRateContent}>
                    <View style={styles.rateContent}>
                      <Text style={styles.rateAmount}>9.04</Text>
                      <Text style={styles.percent}>%</Text>
                    </View>
                    <Text style={styles.describe}>随借随还</Text>
                    <Text style={styles.warning}>提前还款不收取违约金</Text>
                  </View>
                </View>

                {/* 还款方式 */}
                <View style={[styles.loanChoose, styles.gap]}>
                  {
                    this.state.repaymentMode.map((ele, index) => {
                      let value,datePickIndex
                      // 因为此dom为循环渲染，所以需以index值来决定不同传参，
                      if (index <= 1) {
                        datePickIndex = [repaymentModeIndex, repaymentDayIndex][index]
                        // 获取picker选择的值
                        value = repaymentAreaConfig[index][datePickIndex].value
                      }
                      return (
                        <View style={styles.loanItem}>
                          <Text>{ele.title}</Text>
                          <TouchableWithoutFeedback onPress={() => { this.repaymentModeClick(index) }}>
                            <View style={styles.loanItemRight}>
                              {
                                index == 2 ? <Text style={[styles.detailsText, styles.loanItemRightText]}>查看详情</Text> :
                                  <Text style={[styles.loanItemRightText]}>{value}</Text>
                              }
                              <Image source={OPEN}></Image>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      )
                    })
                  }
                </View>
                {/* 小提示 */}
                <View>
                  <Text style={styles.tips}>利息按日计算，可提前还款</Text>
                </View>
              </View>
              <View style={styles.bottomPart}>
                < TouchableWithoutFeedback onPress = {
                  () => {
                    this.props.callBackHome('TotalPayments')
                  }
                } >
                  <View style={styles.agreeButton}>
                    <Text style={styles.buttonText}>
                      确定
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>

          </ScrollView>
          {/* 模态窗 */}
          {
            showModal ?
              (<Animated.View style={[styles.modal, { opacity }]}>
                <View style={{ position: "relative", flex: 1 }}>
                  <View style={{ flex: 1, backgroundColor: '#000000', opacity: 0.3, }}></View>
                  <Pickers ref='picker' {...{ pickIndex: this.state.pickIndex, pickData: this.state.showData }} closeModal={this.closeModal} getChoseValue={this.state.getDateValue} ></Pickers>
                </View>
              </Animated.View>)
              :
              (<></>)
          }</View>
        : <TotalPayments onPress={() => this.viewDetails()}></TotalPayments>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  warning: {
    fontSize: 15,
    color: '#999999'
  },
  describe: {
    fontSize: 15,
    color: '#3A3A3A'
  },
  rateContent: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  percent: {
    fontSize: 16,
    color: '#E69228'
  },
  rateAmount: {
    fontSize: 22,
    color: '#E69228'
  },
  interestRateContent: {
    paddingHorizontal: 20,
    marginTop: 22,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tips: {
    fontSize: 13,
    color: '#999999',
    paddingLeft: 20
  },
  interestRateTitle: {
    fontSize: 16,
    color: '#3A3A3A',
    top: 12,
    left: 20
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF'
  },
  agreeButton: {
    width: 335,
    height: 45,
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomPart: {
    height: '20%',
    marginTop: 40
  },
  interestRate: {
    height: 87,
    backgroundColor: '#fff',
    marginTop: -2,
  },
  detailsText: {
    fontSize: 15,
    color: '#4BA8F9'
  },
  useLoan: {
    fontSize: 15,
    color: '#999999'
  },
  loanItemRightText: {
    marginRight: 16
  },
  loanItemRight: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loanItem: {
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  loanChoose: {
    height: 137
  },
  gap: {
    marginBottom: 12
  },
  loanTitle: {
    fontSize: 16,
    color: '#3A3A3A',
    marginTop: 12

  },
  loanContent: {
    fontSize: 24,
    color: '#333333',
    marginTop: 18
  },
  loanAmount: {
    backgroundColor: '#FFFFFF',
    height: 101,
    paddingLeft: 20
  },
  middlePart: {
    width: '100%',
    marginTop: 16
  },
  loanInfo: {
    fontSize: 17,
    color: '#333333',
    letterSpacing: 0.2,
    marginLeft: 8
  },
  topPart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    marginTop: 35,
    left: 10
  },
  stripe: {
    backgroundColor: '#E39634',
    width: 4,
    height: 16,
    justifyContent: 'space-between'
  },
  container: {
    backgroundColor: "#F4F4F4",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    right: 16,
    top: 22
  }
})

module.exports = ServiceAgreement;