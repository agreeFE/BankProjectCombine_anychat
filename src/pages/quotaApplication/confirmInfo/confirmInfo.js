import React, { Component,  } from 'react';
import { StyleSheet, Image, View, ScrollView,ActivityIndicator, KeyboardAvoidingView, Keyboard, TextInput, Easing, Button, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import { OPEN } from '../imageSource';
import Pickers from '$/components/picker/pickerPro'
import CardPick from '$/components/cardPick'
import scope from '@/scope'
import SVG from "$/components/Svg";
const NetworkUtil = require('$/util/networkutil');
const { getBankCard } = require('$/util/bankCardutil');
const { formatCardNum } = require('$/util/cardNumutil');
const { formatMoney, checkValidity } = require('$/util/moneyutil')
const router = require('$/router-control')
const LOANTIME = ['12个月']
const USELOAN = ['买房', '买车', '旅游', '教育', '投资']
let timeout
class ServiceAgreement extends Component {
  constructor(props) {
    super(props)
    scope(this)
    const moneyTextArr = ['百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '万亿', '十万亿']
    this.state = {
      inputType:true,
      isLoading: true,
      dealTextLength: 0,
      moneyTextArr,
      cardList: [], //银行卡列表
      cardListIndex: 0, // 放还款卡号
      showListData: LOANTIME,
      loanTime: [LOANTIME[0]],
      LoanUse: [USELOAN[0]],
      pickerType: 1,
      firstPickTime: true,
      firstPickUse: true,
      // showMessage: false, //是否显示信息验证码弹框
      text: '',
      //贷款额度信息
      loanQuotaInfo: {
        tatalQuota: '', //总额度
        restQuota: '', //剩余额度
        usedQuota: '', //已用额度
        interestRate: '', //利率
        beginDate: '', //开始日期
        endDate: '', //结束日期
        quotaNo: '', //额度编号
        loopFlag: '' //循环标志
      },
      calcInterestResult: {
        accrintm: '', //日利息
        amountInTotal: '', //合计金额
        dateDue: '', //到期日期
        dayRate: '', //日利率
        interestReceivable: '', //应收利息
        modeOfRepayment: '' //还款方式
      }
    }
    this.keyboardDidHideListener = null;
    
    this.queryLoanLimit()
  }
  componentDidMount() {
    getBankCard(this.queryBindCards)
  }


  // 下一步
  nextStep = () => {
    Keyboard.dismiss()
    const { cardList, calcInterestResult, cardListIndex, loanTime,
      LoanUse, text, loanQuotaInfo, firstPickTime, firstPickUse } = this.state
    const { dayRate, dateDue } = calcInterestResult
    if (!text) {
      $Toast.info('请输入贷款金额')
      return
    }
    if (Number(text) > Number(loanQuotaInfo.restQuota)) {
      $Toast.info('贷款额度不足')
      return
    }
    if (firstPickTime) {
      $Toast.info('请选择贷款时长')
      return
    }
    if (firstPickUse) {
      $Toast.info('请选择贷款用途')
      return
    }
    let info = {
      loanAmount: text,
      accountNo: cardList[cardListIndex].label,
      dayRate,
      dateDue,
      LoanPurpose: LoanUse[0],
      modeOfRepayment: '利随本清'
    }
    
    router.load('emergenCon', { info })
      // Keyboard.removeAllListeners('keyboardDidHide')
    
  }

  //查询我绑定的本行借记卡
  queryBindCards = (cardArr) => {
    //获取绑定银行卡数
    const { cardList } = this.state
    let CardList = cardArr.filter(item => {
      return item.classify === 0
    })
    CardList.forEach(item => {
      let card = new Object();
      card.value = `账户${formatCardNum(item.cardNo, 0)}`,
      card.label = item.cardNo
      cardList.push(card)
    })
    this.setState({ cardList, isLoading:false })
  }

  // 查询可贷款的额度
  queryLoanLimit() {
    NetworkUtil.networkService('/account/loans/loanQuotaQuery', {}, response => {
      this.setState({
        loanQuotaInfo: response
      })
    })
  }
  //贷款利息试算
  calcInterest() {
    // console.warn('tag', 333)
    const { text, cardList, cardListIndex, loanQuotaInfo } = this.state
    if (!text) return
    if(Number(text) == 0) {
      $Toast.info('请输入正确的数字')
      return
    }
    if (Number(text) > Number(loanQuotaInfo.restQuota)) {
      $Toast.info('贷款额度不足')
      return
    }
    let reqData = {}
    reqData.transactionAmount = text
    reqData.operationIdentification = '1';
    reqData.loanAccount = cardList[cardListIndex].label
    NetworkUtil.networkService('/account/loans/loanInterestCal', reqData, response => {
      this.setState({
        calcInterestResult: response
      })
    }
    )
  }

  // blurInput = () => {
    
  //   // this.refs.textInput1.blur()
  //   this.calcInterest()
  // }

  showPicker = (num) => {
    Keyboard.dismiss()
    this.setState({
      pickerType: num,
      showListData: num === 1 ? LOANTIME : USELOAN
    }, () => {
      this.picker.init()
    })

  }

  pickerConfirm = (item) => {
    const { pickerType } = this.state
    if (pickerType === 1) {
      this.setState({
        loanTime: item,
        firstPickTime: false
      })
      return
    }
    this.setState({
      LoanUse: item,
      firstPickUse: false
    })
  }
  cardPickerConfrim = ({ index, item }) => {
    this.setState({
      cardListIndex: index
    })
  }

  showCardpicker = () => {
    Keyboard.dismiss()
    this.cardPicker.toggleModal()
  }
  debounce = (fnc, time) => {
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      // timeout = null
      fnc()
    }, time);
  }

  render() {
    let {
      isLoading,
      cardList,
      text,
      showListData,
      loanTime,
      LoanUse,
      cardListIndex,
      pickerType,
      firstPickTime,
      firstPickUse,
      loanQuotaInfo,
      calcInterestResult,
      moneyTextArr,
      dealTextLength
    } = this.state

    let noOpacity = !!text && !!loanTime[0] && !!LoanUse[0]
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <Header
          title={'赞E贷'}
          leftClick={() => { router.back() }}
        ></Header>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1, backgroundColor: "#F4F4F4", }} ref={component => this._scrollView = component} keyboardShouldPersistTaps='always'>
            <View style={[styles.container]}>
              <View style={styles.middlePart}>
                <View style={[styles.loanAmount, styles.gap]}>
                  <Text style={styles.loanTitle}>
                    贷款金额
                  </Text>
                  <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 14, position: 'relative' }}>
                    {
                      dealTextLength > 2 ?
                        <View style={{ position: 'absolute', top: -8, left: 27, borderLeftColor: '#ddd', borderLeftWidth: 1 }}>
                          <Text style={{ color: '#666', fontSize: 12, marginLeft: 5 }}>
                            {moneyTextArr[dealTextLength - 3]}
                          </Text>
                        </View>
                        :
                        <></>
                    }
                    <Text style={styles.loanContent}>¥</Text>
                    <TextInput
                      ref='textInput1'
                      blurOnSubmit={true}
                      underlineColorAndroid='transparent'
                      // maxLength={loanQuotaInfo.restQuota.length}
                      placeholder={'剩余额度:' + formatMoney(loanQuotaInfo.restQuota || 0) + '元'}
                      placeholderTextColor='#ddd'
                      selectionColor='#ff4f39'
                      keyboardType='numeric'
                      value={text}
                      style={{ fontSize: 24, alignContent: 'center', flex: 1, color: Number(text) > Number(loanQuotaInfo.restQuota) ? 'red' : '#000' }}
                      onChangeText={(text) => {
                        // 金额有小数点情况
                        let dealText = '';
                        let pointIndex = text.indexOf('.');
                        dealText = pointIndex > -1 ? text.slice(0, pointIndex) : text;
                        this.setState({
                          dealTextLength: dealText.length,
                          text: checkValidity(text),
                          loanTimeIndex: -1
                        })
                        this.debounce(() => this.calcInterest(), 500)
                        // if(this.state.inputType){
                        //   this.setState({inputType: false})
                        //   setTimeout(() => {
                        //     this.blurInput()
                        //     this.setState({inputType: true})
                        //   }, 1000);
                        // }  
                      }}
                    // onBlur={()=>this.calcInterest()}
                    />
                  </View>
                </View>
                {/* 贷款区域 */}
                <View style={[styles.loanChoose, styles.gap]}>
                  {/* 贷款时长 */}
                  <View style={styles.loanItem}>
                    <Text>贷款时长</Text>
                    <TouchableWithoutFeedback onPress={() => { this.showPicker(1) }}>
                      <View style={styles.loanItemRight}>
                        <Text style={[firstPickTime ? styles.useLoan : '', styles.loanItemRightText]}>{firstPickTime ? `请选择` : loanTime[0]}</Text>
                        <SVG source={OPEN} style={{ width: 6, height: 12, marginLeft: 15 }}></SVG>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  {/* 放款/还款卡号 */}
                  <View style={styles.loanItem}>
                    <Text>放款/还款卡号</Text>
                    <TouchableWithoutFeedback onPress={this.showCardpicker}>
                      <View style={styles.loanItemRight}>
                        {
                          isLoading ?
                          <ActivityIndicator color="#777" />
                          :
                          <Text style={[!!!cardList[cardListIndex] ? styles.useLoan : '', styles.loanItemRightText]}>{!!cardList[cardListIndex] ? cardList[cardListIndex].value : '正在加载'}</Text>
                        }
                        <SVG source={OPEN} style={{ width: 6, height: 12, marginLeft: 15 }}></SVG>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  {/* 贷款用途 */}
                  <View style={styles.loanItem}>
                    <Text>贷款用途</Text>
                    <TouchableWithoutFeedback onPress={() => { this.showPicker(2) }}>
                      <View style={styles.loanItemRight}>
                        <Text style={[firstPickUse ? styles.useLoan : '', styles.loanItemRightText]}>{firstPickUse ? `请选择` : LoanUse[0]}</Text>
                        <SVG source={OPEN} style={{ width: 6, height: 12, marginLeft: 15 }}></SVG>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                {/* 年利率 */}
                <View style={[styles.interestRate, styles.gap]}>
                  <Text style={styles.interestRateTitle}>日利率</Text>
                  <View style={styles.interestRateContent}>
                    <View style={styles.rateContent}>
                      <Text style={styles.rateAmount}>{loanQuotaInfo.interestRate / 100}</Text>
                      <Text style={styles.percent}>%</Text>
                    </View>
                    <Text style={styles.describe}>随借随还</Text>
                    <Text style={styles.warning}>提前还款不收取违约金</Text>
                  </View>
                </View>
                {/* 还款方式 */}
                <View style={[styles.loanChoose, styles.gap]}>
                  <View style={styles.loanItem}>
                    <Text>日利息</Text>
                    <Text style={[styles.loanItemRightText]}>{calcInterestResult.accrintm + '元'}</Text>
                  </View>
                  <View style={styles.loanItem}>
                    <Text>还款方式</Text>
                    <Text style={[styles.loanItemRightText]}>{calcInterestResult.modeOfRepayment == 5 ? '利随本清' : '利随本清'}</Text>
                  </View>
                  <View style={styles.loanItem}>
                    <Text>到期日期</Text>
                    <Text style={[styles.loanItemRightText]}>{calcInterestResult.dateDue.substr(0, 4) + '-' + calcInterestResult.dateDue.substr(4, 2) + '-' + calcInterestResult.dateDue.substr(6, 2)}</Text>
                  </View>
                </View>
                {/* 小提示 */}
                <View>
                  <Text style={styles.tips}>利息按日计算，可提前还款</Text>
                </View>
              </View>
              <View style={styles.bottomPart}>
                <TouchableWithoutFeedback onPress={this.nextStep}>
                  <LinearGradient style={[styles.agreeButton, noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]} colors={$globalStyle.buttonLinerBackground}>
                    <Text style={styles.buttonText}>下一步</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
          {/* 模态窗 */}
          <Pickers
            ref={ref => this.picker = ref}
            pickerData={showListData}
            selectedValue={pickerType === 1 ? loanTime : LoanUse}
            onPickerConfirm={this.pickerConfirm}
          ></Pickers>
          {/* 银行卡选择 */}
          <CardPick
            ref={ref => this.cardPicker = ref}
            cardList={cardList}
            selectIndex={cardListIndex}
            onConfirm={this.cardPickerConfrim}
          ></CardPick>
        </View>
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

  // componentWillMount() {
  //   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
  //     this.keyboardDidHideHandler.bind(this));
  // }

  // componentWillUnmount() {
  //   if (this.keyboardDidHideListener != null) {
  //     this.keyboardDidHideListener.remove();
  //   }
  // }

  // keyboardDidHideHandler() {
  //   this.blurInput()
  // }



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
    borderRadius: 5,
    marginBottom: 30,
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
    // marginRight: 16,
    textAlign: 'right'
  },
  loanItemRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    height: 35,
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
  },
  close: {
    position: 'absolute',
    right: 16,
    top: 22
  }
})

module.exports = ServiceAgreement;