import React, { Component,  } from 'react';
import LinearGradient from "react-native-linear-gradient"
import { NavigationEvents } from 'react-navigation';
import { StyleSheet, Image, View, ScrollView, KeyboardAvoidingView, DatePickerAndroid, Keyboard, TextInput, Easing, Button, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import Header from '$/components/header'
import {  OPEN, RIGHTARROW } from './imageSource';
import scope from '@/scope'
import Pickers from '$/components/picker/pickerPro.js'
import { getYearMouthDayLine } from '$/util/dateutil'
import SVG from "$/components/Svg";
const NetworkUtil = require('$/util/networkutil');
const DateUtil = require('$/util/dateutil');
const { getBankCard } = require('$/util/bankCardutil');
const { formatCardNum } = require('$/util/cardNumutil');
const router = require('$/router-control')
import "$/window"

class ServiceAgreement extends Component {
  constructor(props) {
    super(props)
    scope(this)

    this.state = {
      payeeBankCard: '', // 房东银行卡
      transferName: '', // 转账名称
      payAmount: '', //转账的金额
      repaymentCircleData: ['单次', '每月'],
      repaymentCircle: '', //转出周期
      onceRepayData: DateUtil.getYearMonthDayArray(2019, 2039), //用于pickers的年月日数据
      onceRepay: '', //转出的具体日期
      expirationDateData: DateUtil.getYearMonthDayArray(2019, 2039), //截止日期，用于pickers的年月日数据
      expirationDate: '', //截止的具体日期
      everyMonthData: DateUtil.getDayArray(), //每月转出具体日期，用于pickers的日数据
      everyMonth: '', //每月转出的具体日期
      transferWayData: ['仅提醒,不自动转账', '自动转账'], //交租方式数据
      transferWays: '', //每月的交租方式
      traInfo: [],//预约转账客户信息
      // firstTime: this.props.firstTime, //是否第一次贷款
      showKeyboard: false,
      getDateValue: '', //传入picker选择器的confirm函数
      pageSwitch: true, //页面组件选择器
      showModal: false,
      clickLeft: false,
      clickRight: false,
      opacity: new Animated.Value(0),
      cardList: [], //银行卡列表
      pickIndex: 1, //模态框被选择的索引值
      loanTimeIndex: -1, // 贷款时长
      cardListIndex: 0, // 放还款卡号
      useLoanIndex: -1, // 贷款用途
      repaymentModeIndex: -1, //还款方式索引
      repaymentDayIndex: -1, //还款日索引
      // showMessage: false, //是否显示信息验证码弹框
      text: '',

    }
  }
  // 下一步
  nextStep = () => {
    let { utId, transferAlias, transferType, transferCycle, transferWay,jobId, transferDate, transferEnddate, payeeName, payeeCardNo, payeeCardBank, transferAmount, transferRemark } = this.state.traInfo
    let { transferName, repaymentCircle, repaymentCircleData,expirationDate, onceRepay, everyMonth, transferWayData, transferWays, payeeBankCard, payAmount } = this.state
    // 计算转账周期,repaymentCircle属性有时是字符串有时是数组，需要辨别
    payeeBankCard = payeeBankCard.replace(/[^\d]+/g, '')
    let pattern = /^([1-9]{1})(\d{14}|\d{18})$/
    if (!pattern.test(payeeBankCard)) {
      $Toast.info('银行卡号输入有误！')
      return
    }
    let checkCircleElement = typeof repaymentCircle == 'string' ? repaymentCircle : repaymentCircle[0]
    let circle = repaymentCircleData.indexOf(checkCircleElement) + 1
    // 处理转账日期格式
    let dateResult;
    if (circle == 1 || circle == 3) {
      let dealOnceRepay = onceRepay.map(ele => {
        if (parseInt(ele) < 10) {
          return '0' + parseInt(ele)
        } else {
          return parseInt(ele)
        }
      })
      dateResult = dealOnceRepay.join('-')
    } else {
      let checkEveryMonth = typeof everyMonth == 'string' ? everyMonth : everyMonth[0]
      dateResult = checkEveryMonth.substr(0, 2)
    }
    // 处理交租方式数据
    let checkTransferWayElement = typeof transferWays == 'string' ? transferWays : transferWays[0]
    let transferWayResult = transferWayData.indexOf(checkTransferWayElement) + 1
    // 处理转账截止日期
    let dealExpirationDate = expirationDate && expirationDate.join('').replace(/[\u4e00-\u9fa5]/g,'-').slice(0,-1)
    let data = {
      utId,
      jobId,
      transferAlias: transferName, //转账备注信息
      transferType,
      transferCycle: circle, //转账周期
      transferWay: transferWayResult, //交租方式
      transferDate: dateResult, // 转账日期
      transferEnddate: dealExpirationDate, //转账截止日期
      payeeName,
      payeeCardNo: payeeBankCard, //收款人银行卡号
      payeeCardBank,
      transferAmount: payAmount || 0, //转账金额。进行判断
      transferRemark
    }
    NetworkUtil.networkService('/account/transferplan/edit', data, response => {
      $Toast.info('修改成功')
      router.load('editBookTransfer')
    })

  }

  // 关闭模态框
  toggleChose = () => {
    const { showChose } = this.state
    this.setState({
      showChose: !showChose
    })
  }
  // 删除预约转账计划
  deleteBook = () => {
    let { traInfo } = this.state
    console.log('traInfo', traInfo)
    data = {
      utId: traInfo.utId,
      jobId: traInfo.jobId
    }
    window.$Modal.confirm('删除预约','请确认是否删除该预约',[
      {
        text: '取消',
        onPress: () => {
          console.log('触发了取消')
        },
        style: 'default',
      },
      {
        text: '确定', onPress: () => {
          NetworkUtil.networkService('/account/transferplan/delete', data, response => {
            router.load('deleteBooktransfer')
          })
        },
      }
    ])
    

  }
  // 控制转出周期模态框显隐
  showRepaymentPeriod = () => {
    Keyboard.dismiss()
    this.repayCirclePickers.init()
  }
  // 控制转出日期模态框显隐
  showPickerDay = (index) => {
    let { repaymentCircle } = this.state
    switch (index) {
      case 1:
        if (repaymentCircle == "单次") {
          Keyboard.dismiss()
          this.oncePickers.init()
        } else if (repaymentCircle == "每月") {
          Keyboard.dismiss()
          this.everyMonthPickers.init()
        }
        break;
      case 2:
          Keyboard.dismiss()
        this.expirationDatePickers.init()
        break;

    }
  }
  // 控制交租方式模态框显隐
  showTransferWay = (index) => {
    Keyboard.dismiss()
    this.transferWayPickers.init()
  }
  // 转出周期确认函数
  repaymentCircleOnPickerConfirm = (data) => {
    this.setState({
      repaymentCircle: data
    })
  }
  // 仅一次转出日期确认函数
  onceRepayOnPickerConfirm = (data) => {
    this.setState({
      onceRepay: data
    })
  }
  // 每月转出日期确认函数
  everyMonthOnPickerConfirm = (data) => {
    this.setState({
      everyMonth: data
    })
  }
  // 截止日期确认函数
  expirationDateDataOnPickerConfirm = (data) => {
    this.setState({
      expirationDate: data
    })
  }
  // 转账方式确认函数
  transferWayOnPickerConfirm = (data) => {
    this.setState({
      transferWays: data
    })
  }
  transferNameChange = (text) => {
    this.setState({
      transferName: text
    })
  }
  // payeeBankCardChange = (text) => {
  //   this.setState({
  //     payeeBankCard: text.replace(/\D/g,'').replace(/....(?!$)/g,'$& ')
  //   })
  // }
  payAmountChange = (text) => {
    this.setState({
      payAmount: text
    })
  }
  // 获取router传值
  static getDerivedStateFromProps(props, state) {
    let prop = props.navigation.state.params
    let { transferDate, transferCycle, transferWay, payeeCardNo, transferAmount,transferEnddate } = prop.info
    // 处理日期的反显值
    let date = new Date()
    let yearResult = getYearMouthDayLine().split('-'),
      dayResult = date.getDate() + '日'
    // 根据不同转账周期做不同数据处理
    if (transferCycle == 1 || transferCycle == 3) {
      let DealOnceRepay = transferDate.split('-')
      yearResult = DealOnceRepay.map((ele, index) => {
        if (index == 0) {
          return ele + '年'
        } else if (index == 1) {
          return ele + '月'
        } else if (index == 2) {
          return ele + '日'
        }
      });
    } else if (transferCycle == 2) {
      if (parseInt(transferDate) < 10) {
        dayResult = '0' + parseInt(transferDate) + '日'
      } else {
        dayResult = transferDate + '日'
      }
    }
    // 处理截止日期
    let dealExpirationDate = transferEnddate ? transferEnddate.split('-').map((ele, index) => {
      if (index == 0) {
        return ele + '年'
      } else if (index == 1) {
        return ele + '月'
      } else if (index == 2) {
        return ele + '日'
      }
    })
    :
    '';
    // 处理交租方式的反显值
    let resultWay = state.transferWayData[transferWay - 1]
    if (state.traInfo !== prop.info) {
      return {
        traInfo: prop.info,
        transferName: prop.info.transferAlias,
        repaymentCircle: state.repaymentCircleData[prop.info.transferCycle - 1],
        onceRepay: yearResult,
        everyMonth: dayResult,
        transferWays: resultWay,
        payeeBankCard: payeeCardNo.replace(/\D/g,'').replace(/....(?!$)/g,'$& '),
        payAmount: transferAmount,
        expirationDate: dealExpirationDate
      }
    }
    return null
  }

  payeeAuto = () => {
    let info = window.chosenCardInfo
    if (!info) return
    this.state.traInfo.payeeCardNo = info.payeeCardNo.replace(/\D/g,'').replace(/....(?!$)/g,'$& ')//账号
    this.state.traInfo.payeeName = info.payeeName//账号
    this.state.traInfo.payeeCardBank = info.payeeCardBank//账号
    this.setState({
      traInfo: this.state.traInfo,
      payeeBankCard: info.payeeCardNo.replace(/\D/g,'').replace(/....(?!$)/g,'$& ')
    })
  }
  render() {
    let {
      cardList,
      opacity,
      traInfo,
      repaymentPeriod,
      repaymentCircleData,
      repaymentCircle,
      onceRepayData,
      onceRepay,
      expirationDateData,
      expirationDate,
      everyMonthData,
      everyMonth,
      transferWayData,
      transferWays
    } = this.state
    let { payerCardNo } = traInfo
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <NavigationEvents onWillFocus={payload => { this.payeeAuto() }}></NavigationEvents>
        <Header
          title={'设置预约转账'}
          leftClick={() => { router.back() }}
        ></Header>
        <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1, backgroundColor: "#F4F4F4", }} ref={component => this._scrollView = component} keyboardShouldPersistTaps='always'>
          <View style={[styles.container]}>
            <View style={styles.middlePart}>
              {/* 贷款区域 */}
              <View style={[styles.loanChoose, styles.gap]}>
                <View style={styles.loanItem}>
                  <Text>名称</Text>
                  <TextInput
                    style={{ fontSize: 16, flex: 1, textAlign: 'right' }}
                    placeholder={'请输入此次预约转账名称'}
                    value={this.state.transferName}
                    onChangeText={this.transferNameChange}></TextInput>
                </View>
                <TouchableWithoutFeedback onPress={this.showRepaymentPeriod}>
                  <View style={styles.loanItem}>
                    <Text>转出周期</Text>
                    <View style={styles.loanItemRight}>
                      <Text style={[styles.loanItemRightText]} >{repaymentCircle}</Text>
                      {/* <Image source={OPEN}></Image> */}
                      <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.showPickerDay(1) }}>
                  <View style={styles.loanItem}>
                    <Text>转出日期</Text>
                    <View style={styles.loanItemRight}>
                      {
                        repaymentCircle == '单次' ?
                          <Text style={[styles.loanItemRightText]}>{onceRepay ? onceRepay : '未设置'}</Text>
                          :
                          <Text style={[styles.loanItemRightText]}>{everyMonth ? everyMonth : '未设置'}</Text>

                      }
                      {/* <Image source={OPEN}></Image> */}
                      <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.showPickerDay(2) }}>
                  <View style={styles.loanItem}>
                    <Text>房租截止日期</Text>
                    <View style={styles.loanItemRight}>
                      <Text style={[styles.loanItemRightText]}>{expirationDate ? expirationDate : '未设置'}</Text>
                      {/* <Image source={OPEN}></Image> */}
                      <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              {/* 还款方式 */}
              <View style={[styles.loanChoose, styles.gap]}>
                <TouchableWithoutFeedback onPress={this.showTransferWay}>
                  <View style={styles.loanItem}>
                    <Text>交租方式</Text> 
                    <View style={styles.loanItemRight}>
                      <Text style={[styles.loanItemRightText]}>{transferWays}</Text>
                      {/* <Image source={OPEN}></Image> */}
                      <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={() => { router.load('transferMyFriend', { goback: 1 }) }}>
                  <View style={styles.loanItem}>
                    <Text>房东银行卡</Text> 
                    <View style={[styles.loanItemRight, {flex: 1}]}>
                    {/* <TextInput 
                      style={{ textAlign: 'right',flex: 1 }}
                      keyboardType='numeric'
                      placeholder="请输入银行卡号"
                      value={this.state.payeeBankCard}
                      onChangeText={this.payeeBankCardChange}></TextInput> */}
                      <Text style={{ textAlign: 'right',flex: 1 }}>{this.state.payeeBankCard}</Text>
                      <View>
                        <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              {/* 转出金额信息 */}
              <View style={[styles.loanChoose, styles.gap]}>
                <View style={styles.loanItem}>
                  <Text>转出银行卡</Text>
                  <View style={styles.loanItemRight}>
                    <Text>{`${payerCardNo.substr(0,4)} **** ${payerCardNo.substr(-4)}`}</Text>
                  </View>
                </View>
                <View style={styles.loanItem}>
                  <Text>交租金额</Text>
                  <TextInput
                    placeholder='请输入金额'
                    style={{ textAlign: 'right' }}
                    keyboardType='numeric'
                    value={this.state.payAmount}
                    onChangeText={this.payAmountChange}></TextInput>
                </View>
              </View>
              {/* 短信通知 */}
              {/* <View style={[styles.loanChoose, styles.gap]}>
                <View style={styles.loanItem}>
                  <Text>短信通知</Text>
                  <View style={styles.loanItemRight}>
                    <Text style={[styles.loanItemRightText]}>13875465587</Text>
                    <View style={styles.readStyle}>
                      <Image style={{ width: 15, height: 15 }} source={READ}></Image>
                    </View>
                  </View>
                </View>
                <View style={styles.loanItem}>
                  <Text>转账附言</Text>
                  <View style={styles.loanItemRight}>
                    <Text style={[styles.loanItemRightText]}>转账</Text>
                  </View>
                </View>
              </View> */}
            </View>
            <View style={styles.bottomPart}>
              <TouchableWithoutFeedback onPress={this.nextStep}>
                {/* colors={$globalStyle.buttonLinerBackground}*/}
                <LinearGradient 
                  style={styles.agreeButton}
                  colors={$globalStyle.buttonLinerBackground}
                >
                  <Text style={styles.buttonText}>确定</Text>
                </LinearGradient> 
              </TouchableWithoutFeedback>
              <Text style={{ color: '#3b90f6', marginTop: 5, height: 30 }} onPress={this.deleteBook}>
                删除预约
              </Text>
            </View>
            {/* 转出周期模态窗 */}
            <Pickers
              ref={(view) => { this.repayCirclePickers = view }}
              pickerData={repaymentCircleData}
              selectedValue={[repaymentCircle]}
              onPickerConfirm={this.repaymentCircleOnPickerConfirm}
            ></Pickers>
            {/* 仅一次模态窗 */}
            <Pickers
              ref={(view) => { this.oncePickers = view }}
              pickerData={onceRepayData}
              selectedValue={onceRepay}
              onPickerConfirm={this.onceRepayOnPickerConfirm}
            ></Pickers>
            {/* 每月模态窗 */}
            <Pickers
              ref={(view) => { this.everyMonthPickers = view }}
              pickerData={everyMonthData}
              selectedValue={[everyMonth]}
              onPickerConfirm={this.everyMonthOnPickerConfirm}
            ></Pickers>
            {/* 截止日期模态窗 */}
            <Pickers
              ref={(view) => { this.expirationDatePickers = view }}
              pickerData={expirationDateData}
              selectedValue={[expirationDate]}
              onPickerConfirm={this.expirationDateDataOnPickerConfirm}
            ></Pickers>
            {/* 交租方式 */}
            <Pickers
              ref={(view) => { this.transferWayPickers = view }}
              pickerData={transferWayData}
              selectedValue={[transferWays]}
              onPickerConfirm={this.transferWayOnPickerConfirm}
            ></Pickers>
          </View>
        </ScrollView>

        {/* 短信验证码输入弹框 */}
        {/* {
            showMessage ?
              <ShortMessage></ShortMessage>
              :
              (<></>)
          } */}
      </View>
    )
  }

  componentWillUnmount() {
    window.chosenCardInfo = null
  }


  keyboardDidShowHandler() {
    this.setState({
      showKeyboard: true
    })
  }

}

const styles = StyleSheet.create({
  readStyle: {
    width: 25,
    height: 25,
    backgroundColor: '#eee',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
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
    marginBottom: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomPart: {
    marginTop: 10,
    alignItems: 'center'
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
    // marginRight: 10,
    textAlign: 'right'
  },
  loanItemRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    // height: 35,
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
  },
  loanAmount: {
    backgroundColor: '#FFF',
    height: 105,
    paddingLeft: 20
  },
  middlePart: {
    width: '100%',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  close: {
    position: 'absolute',
    right: 16,
    top: 22
  }
})

module.exports = ServiceAgreement;