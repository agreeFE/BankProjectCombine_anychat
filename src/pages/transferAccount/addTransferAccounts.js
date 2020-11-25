import React, { Component,  } from 'react';
import { NavigationEvents } from 'react-navigation';
import _ from 'lodash'
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Image, TextInput } from 'react-native';
import Header from '$/components/header'
import Picker from '$/components/picker/pickerPro.js'
import CardPick from '$/components/cardPick'
import { OPEN, LIUYAN2, TONGXUNLU3, CLOSE, RIGHTARROW } from './imageSource'
import LinearGradient from "react-native-linear-gradient"
import { getYearMouthDayLine } from '$/util/dateutil'
import scope from '$/scope'
import SVG from "$/components/Svg";

const DateUtil = require('$/util/dateutil');

const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
const { getBankCard } = require('$/util/bankCardutil');
const { mobilePhoneTest } = require("$/util/regexutil");
const { checkValidity } = require('$/util/moneyutil')

const PICKDATA = []

class addTransferAccounts extends Component {

  constructor(props) {
    super(props)
    scope(this)
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const today = `${year}年${month}月${day}日`
    const transferMethod = ['仅提醒，不自动转账','自动转账']
    const onceDate = DateUtil.getYearMonthDayArray(2019, 2039) //仅一次
    const onceMonth = [] // 每月一次
    for (var i = 1; i < 29; i++) {
      onceMonth.push(`${i}日`)
    }
    const onceYear = []
    for(let i = 1; i< 13; i ++) {
      let month = {}
      let day = []
      for(let j = 1; j< 29; j ++) {
        
        day.push(`${j}日`)
      }
      month[(i + '月')] = day
      onceYear.push(month)
    }
    const moneyTextArr = ['百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '万亿', '十万亿']
    let params = this.props.navigation.state.params
    this.state = {
      isLoading: true,
      moneyTextArr,
      transferAlias: params == 1 ? '还贷款' : params == 2 ? '还信用卡' : params == 3 ? '交房租': '', // 当前转账的名称
      curCircleItem: 2, //当前的转账周期选择值
      pickerType: 1, //1--转账日期， 2-- 转账方式
      transferCycle: 2, // 1--仅一次 2--每月一次  3--每年一次,
      pickerData: onceMonth, // picker 选择内容
      selectedValue: ['1日'], //默认选择的picker值
      transferMethod, //转账方式的选择值
      onceDate,  //仅一次的选择值
      onceMonth,  //每月一次的选择值
      onceYear, //每年一次的选择值
      transferDate: '每月1日',
      transferWay: 1, // 1:仅提醒,不自动转账;2:自动转账
      selectTransferWay: ['仅提醒，不自动转账'],  //默认当前转账方式
      selectMonth: ['1日'], //默认仅一次的选择值
      selectOnceDate: [`${year}年`, `${month}月`, `${day}日`], //默认每月一次的选择值
      selectedYear: ['1月', '1日'], //默认每年一次的选择值
      dealModalVisible: false,//交易密码模态框显隐
      defaultDate: today, //默认日期
      onceRepayData: DateUtil.getYearMonthDayArray(2019, 2039), //用于pickers的年月日数据
      amountColor: false, //超限变色
      selectCardIndex: 0,
      cardList: [],
      payeeCardNo: '', // 银行卡账号
      payeeName: '', //账户名
      payeeCardBank: '', //转账银行
      transferAmount: '',
      payeePhone: '',
      transferRemark: '',
      tradePassword: '',//支付密码
    }
    // this.setState({
    //   selectedValue: this.state.selectTransferWay
    // })
  }
  componentDidMount() {
    getBankCard(this.getCardList)
  }
  // 返回上一步
  back = () => {
    router.back()
  }
  // 显示模态框
  toggleModal = (index) => {
    const {transferMethod, selectTransferWay, transferCycle, onceDate, onceMonth,onceYear, selectOnceDate, selectMonth, selectedYear  } = this.state
    Keyboard.dismiss()
    if (index == 2) {
      this.setState({
        pickerData: transferMethod,
        selectedValue: selectTransferWay,
        pickerType: index
      },()=> {
        this.picker.init()
      })
    } else {
      this.setState({
        pickerType: index,
        pickerData: transferCycle === 1 ? onceDate : transferCycle === 2 ? onceMonth : onceYear,
        selectedValue: transferCycle === 1 ? selectOnceDate : transferCycle === 2 ? selectMonth : selectedYear,
      },()=> {
        this.picker.init()
      })
    }
  }

  toggleCardModal = () => {
    Keyboard.dismiss()
    let timer = setTimeout(() => {
      this.cardPick.toggleModal()
      clearTimeout(timer)
    }, 20)
  }

  getCard = ({ index, item }) => {
    this.setState({
      selectCardIndex: index
    })
  }
  // 供每月选择框使用
  getData = (item) => {
    const { pickerType, transferCycle, transferMethod } = this.state
    if(pickerType == 2) {
      this.setState({
        selectTransferWay: item,
        transferWay: transferMethod.indexOf(item[0]) + 1 
      })
    } else {
      let obj = {}
      let key = transferCycle === 1 ? 'selectOnceDate' : transferCycle === 2 ? 'selectMonth' : 'selectedYear'
      obj[key] = item
      obj.transferDate = transferCycle === 1 ? item.toString() : transferCycle === 2 ? `每月 ${item[0]}` : `每年 ${item}`
      obj.transferDate = obj.transferDate.replace(/\,/g,'')
      this.setState(obj)
    }
  }
  //确定添加计划 
  addTransferplan = () => {
    let { payeeCardNo, transferAmount, transferCycle, transferWay, defaultDate, transferDate, 
      payeePhone, cardList,selectCardIndex } = this.state
    let params = this.props.navigation.state.params
    let cardTitle = params == 1 ? '你的贷款卡' : params == 2 ? '待还信用卡' : params == 3 ? '房东银行卡': '转入银行卡'
    let moneyTitle = params == 1 ? '还款金额' : params == 2 ? '还款金额' : params == 3 ? '交租金额': '转账金额'
    let dayTitle = params == 1 ? '还款日期' : params == 2 ? '还款日期' : params == 3 ? '转出日期': '转账日期'
    
    if (!transferDate) {
      $Toast.info('请输入' + dayTitle)
      return
    }
    if (!payeeCardNo) {
      $Toast.info('请选择' + cardTitle)
      return
    }
    payeeCardNo = payeeCardNo.replace(/[^\d]+/g, '')
    let pattern = /^([1-9]{1})(\d{14}|\d{18})$/
    if (!pattern.test(payeeCardNo)) {
      $Toast.info('银行卡号输入有误！')
      return
    }
    if(payeeCardNo === cardList[selectCardIndex].cardNo) {
      $Toast.info('付款卡和收款卡不能为同一张卡')
      return
    }
    let compareSelectedOnceDateValue = transferDate.replace(/[\u4e00-\u9fa5]/g, ''),
      compareDefaultDate = defaultDate.replace(/[\u4e00-\u9fa5]/g, '')
    if (transferCycle == 1 && compareSelectedOnceDateValue <= compareDefaultDate) {
      $Toast.info('预约转账日期不能小于或等于今天日期')
      return
    }
    if (transferWay == 2 && !transferAmount) {
      $Toast.info('请输入' + moneyTitle)
      return
    }
    if (transferWay == 2 && Number(transferAmount) > cardList[selectCardIndex].accBal) {
      $Toast.info('银行卡余额不足')
      return
    }
    
   
    if (payeePhone && !mobilePhoneTest(payeePhone)) {
      $Toast.info('请输入正确的手机号')
      return
    }
    if(transferWay == 2 ) {
      this.setState({
        dealModalVisible: true
      })
    } else {
      this.addBookTransfer()
    }
    // this.setState({
    //   dealModalVisible: true
    // })
  }
  // 添加预约转账计划接口
  addBookTransfer = () => {
    let { transferCycle, transferAlias, transferWay, payeeCardNo,tradePassword, payeeName, payeeCardBank, transferDate, transferAmount, cardList, selectCardIndex, transferRemark, } = this.state
    // 处理转账日期
    let params = this.props.navigation.state.params
    if(transferCycle == 1) {
      transferDate = transferDate.replace(/[\u4e00-\u9fa5]/g, '-').slice(0, -1)
    } else if(transferCycle == 2) {
      transferDate = transferDate.replace(/[\u4e00-\u9fa5]/g, '')
    } else {
      $Toast.info('暂不支持每年一次')
      return
    }
    let info = {
      transferAlias: transferAlias || (params == 1 ? '还贷款' : params == 2 ? '还信用卡' : params == 3 ? '交房租': '自定义'),
      transferCycle,
      transferWay,
      transferDate,
      payeeName,
      payeeCardNo: payeeCardNo.replace(/[^\d]+/g, ''),
      payeeCardBank,
      payerCardNo: cardList[selectCardIndex].cardNo,
      payerCardBank: cardList[selectCardIndex].cardBank,
      transferAmount,
      transferRemark,
      transferType: params.toString(),
      tradePassword
    }
    
    this.setState({tradePassword: ''})
    
    NetworkUtil.networkService('/account/transferplan/add', info, response => {
      $Toast.info('添加成功')
      setTimeout(() => {
        router.back()
      }, 1000)
    })
  }
  // 获取用户银行卡列表
  getCardList = (cardArr) => {
    const { cardList } = this.state
    // account/bankcard/list
    cardArr.map((item) => {
      cardList.push({ value: `${item.cardBank}(${item.cardNo.substr(-4)})`, cardNo: item.cardNo, accBal: item.accBal, cardBank: item.cardBank })
    })
    this.setState({ cardList, isLoading: false })
  }
  //支付弹窗按钮
  payClick = (index) => {
    const { tradePassword, } = this.state
    if (index == 1) {
      this.setState({ dealModalVisible: false, tradePassword: '' });
    } else if (index == 2) {

      if (tradePassword.length < 6) {
        $Toast.info('请输入交易密码')
        return
      }
      this.addBookTransfer()
      this.setState({ dealModalVisible: false });
    } else {
      // if (Number(transferAmount) > Number(payCard.accBal)) {
      //   $Toast.info('转账金额超限')
      //   return
      // }
      this.setState({ dealModalVisible: true });
    }
  }
  changeText = (event, num) => {
    switch (num) {
      case 0:
        // this.setState({
        //   payeeCardNo: event,
        // })
        break;
      case 1:
        // 金额有小数点情况
        let dealText = '';
        let pointIndex = event.indexOf('.');
        dealText = pointIndex > -1 ? event.slice(0, pointIndex) : event;
        this.setState({
          dealTextLength: dealText.length,
          transferAmount: checkValidity(event),
          amountColor: event > 50000
        })
        break;
      case 2:
        const newText = event.replace(/[^\d]+/, '');
        this.setState({
          payeePhone: newText,
        })
        break;
      case 3:
        this.setState({
          transferRemark: event,
        })
        break;
    }
  }
  trade_passwordChange = (text) => {
    this.setState({ tradePassword: text })
  }
  payeeAuto = () => {
    let info = window.chosenCardInfo
    if (!info) return
    this.setState({
      payeeName: info.payeeName,//户名
      payeeCardNo: info.payeeCardNo.replace(/\D/g,''),//账号
      payeeCardBank: info.payeeCardBank
    })
  }
  componentWillUnmount() {
    window.chosenCardInfo = null
  }

  _onChange = (e) => {
    const { text } = e.nativeEvent
    this.setState({
      transferAlias: text
    })
  }

  changeTransferCycle = (index) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.setState({
      transferCycle: index,
      transferDate: "",
      selectMonth: ['1日'], //默认仅一次的选择值
      selectOnceDate: [`${year}年`, `${month}月`, `${day}日`], //默认每月一次的选择值
      selectedYear: ['1月', '1日'], //默认每年一次的选择值
    })
  }

  render() {
    const { pickerData, amountColor,
      payeeName, payeeCardBank, dealTextLength,moneyTextArr, isLoading, transferDate,
      tradePassword, cardList = [], transferAlias, selectedValue, selectTransferWay, transferWay,
      selectCardIndex, payeeCardNo, transferAmount, payeePhone, transferCycle, transferRemark } = this.state
    let cardNo = (cardList[selectCardIndex] && cardList[selectCardIndex].cardNo) || ''
    let cardInfo = cardNo.substr(0, 4) + '****' + cardNo.substr(-4)
    let noOpacity = transferWay == 2 ? (!!payeeCardNo && !!transferAmount && !!transferDate) : (!!payeeCardNo && !!transferDate)
    let params = this.props.navigation.state.params
    let cardTitle = params == 1 ? '你的贷款卡' : params == 2 ? '待还信用卡' : params == 3 ? '房东银行卡': '转入银行卡'
    let moneyTitle = params == 1 ? '还款金额' : params == 2 ? '还款金额' : params == 3 ? '交租金额': '转账金额'
    let dayTitle = params == 1 ? '还款日期' : params == 2 ? '还款日期' : params == 3 ? '转出日期': '转账日期'
    let wayTitle = params == 1 ? '还款方式' : params == 2 ? '还款方式' : params == 3 ? '交租方式': '转账方式'
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <NavigationEvents onWillFocus={payload => { this.payeeAuto() }}></NavigationEvents>
        {/* 标题栏 */}
        <Header
          title={'添加预约转账'}
          leftClick={this.back}
        ></Header>
        {/* 内容区 */}
        <KeyboardAvoidingView behavior="absolute" style={{ flex: 1 }} enabled>
          <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
            <View style={[styles.content]}>
              {/* 转账标题 */}
              <View style={{height: 200, width: '100%', paddingBottom: 20, backgroundColor: 'red', justifyContent: 'flex-end', alignItems: "center"}}>
                <View style={{width: '90%', height: 50, borderBottomColor: '#fff', borderBottomWidth: 2, paddingHorizontal: 5}}>
                  <TextInput
                    style={{flex: 1,fontSize: 20, color: '#fff'}}
                    placeholder='给预约起个名字吧'
                    placeholderTextColor={'#fff'}
                    value={transferAlias}
                    onChange={this._onChange}
                  >
                  </TextInput>
                  
                </View>
              </View>
              {/* 转账周期 */}
              {
                params > 2 ? 
                <View style={styles.chooseItem}>
                  <Text style={[styles.textItem, transferCycle == 1 ? styles.active2 : '']} onPress={() => { this.changeTransferCycle(1) }}>仅一次</Text>
                  <Text style={[styles.textItem, transferCycle == 2 ? styles.active2 : '']} onPress={() => { this.changeTransferCycle(2) }}>每月一次</Text>
                  <Text style={[styles.textItem, transferCycle == 3 ? styles.active2 : '']} onPress={() => { this.changeTransferCycle(3) }}>每年一次</Text>
                </View>
                :
                <></>
              }
              {/* 转出日期 */}
              <TouchableWithoutFeedback onPress={() => { this.toggleModal(1) }}>
                <View style={[styles.chooseBox, {marginTop: 20, width: '100%'}]}>
                  <Text style={{ color: ' #333333' }}>{dayTitle}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: transferDate ? '#000' : '#ccc' }}>{transferDate || '点击填写'}</Text>
                    <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 转账方式 */}
              <TouchableWithoutFeedback onPress={() => { this.toggleModal(2) }}>
                <View style={[styles.chooseBox, {width: '100%'}]}>
                  <Text style={{ color: ' #333333' }}>{wayTitle}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#000' }}>{selectTransferWay}</Text>
                    <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.chooseBoxArea}>
                {/* 转入银行卡 */}
                <TouchableWithoutFeedback onPress={() => { router.load('transferMyFriend', { goback: 1 }) }}>
                  <View style={[styles.chooseBox, { height: payeeCardNo ? 60 : 45 }]}>
                    <Text style={{ color: ' #333333' }}>{cardTitle}</Text>
                    {
                      payeeCardNo ?
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                          <Text>{payeeName}</Text>
                          <Text style={{color: '#ccc'}}>{payeeCardBank} {`尾号${payeeCardNo.substr(-4)}` }</Text>
                        </View>
                        :
                        <Text style={{ flex: 1, textAlign: 'right', padding: 0, color: '#999' }}>{'请选择'}</Text>
                    }

                    {/* <Text style={{ flex: 1, textAlign: 'right', padding: 0,color: payeeCardNo ? '#000' : '#999'}}>{payeeCardNo || '请输入银行卡号'}</Text> */}
                    <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                  </View>
                </TouchableWithoutFeedback>
                {/* 转出银行卡 */}
                <TouchableWithoutFeedback onPress={this.toggleCardModal}>
                  <View style={styles.chooseBox}>
                    <Text style={{ color: ' #333333' }}>转出银行卡</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {
                        isLoading ?
                        <ActivityIndicator color="#777" />
                        :
                        <Text style={{ color: '#000' }}>{cardInfo}</Text>
                      }
                      <SVG style={[{ height: 12, width: 6, marginLeft: 7 }]} source={RIGHTARROW} />
                    </View>
                  </View>
                </TouchableWithoutFeedback> 
              </View>
              {/* 交租金额输入框 */}
              <View style={styles.moneyInput}>
                <Text style={styles.inputTitle}>{moneyTitle}</Text>
                <View style={[styles.inputBox,{position:'relative'}]}>
                  {
                    dealTextLength > 2 ?
                      <View style={{ position: 'absolute', top: -1, left: 40, borderLeftColor: '#ddd', borderLeftWidth: 1 }}>
                        <Text style={{ color: '#666', fontSize: 12, marginLeft: 5 }}>
                          {moneyTextArr[dealTextLength - 3]}
                        </Text>
                      </View>
                      :
                      <></>
                  }
                  <Text style={{ fontSize: 25 }}>￥</Text>
                  <View style={{ position: 'relative', height: 65, width: '100%', justifyContent: 'center' }}>
                    {
                      !transferAmount ?
                        <Text style={{ position: 'absolute', color: '#999', width: 100, fontSize: 15, marginLeft: 8 }}>{ transferWay == 1 ? '非必填' : '不超过50000'}</Text>
                        :
                        <></>
                    }
                    <TextInput
                      underlineColorAndroid='transparent'
                      autoFocus={false}
                      placeholderTextColor='#999'
                      value={transferAmount}
                      keyboardType='numeric'
                      maxLength={14}
                      style={{ fontSize: 24, alignContent: 'center', flex: 1, color: amountColor ? 'red' : '#000' }}
                      onChangeText={(event) => { this.changeText(event, 1) }}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* 自动转账附加按钮 */}
            {transferWay == 2 ?
              <View>
                {/* 选择框 */}
                <View style={styles.additionInputBox}>
                  <View style={[styles.additionInput, { borderBottomColor: '#F0F0F0', borderBottomWidth: 1 }]}>
                    <Text style={{ color: '#3A3A3A', fontWeight: 'bold' }}>短信通知</Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                      <TextInput
                        underlineColorAndroid='transparent'
                        autoFocus={false}
                        placeholder='请输入对方手机号'
                        placeholderTextColor='#999'
                        value={payeePhone}
                        keyboardType='numeric'
                        style={{ fontSize: 15, alignContent: 'center', marginRight: 10, textAlign: 'right', padding: 0, flex: 1 }}
                        onChangeText={(event) => { this.changeText(event, 2) }}
                        maxLength={11}
                      />
                      <SVG source={TONGXUNLU3} style={{ width: 16, height: 16 }}></SVG>
                    </View>
                  </View>
                  <View style={styles.additionInput}>
                    <Text style={{ color: '#3A3A3A', fontWeight: 'bold' }}>转账附言</Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                      <TextInput
                        underlineColorAndroid='transparent'
                        autoFocus={false}
                        placeholder='转账'
                        placeholderTextColor='#999'
                        value={transferRemark}
                        style={{ fontSize: 15, alignContent: 'center', marginRight: 10, textAlign: 'right', padding: 0, flex: 1 }}
                        onChangeText={(event) => { this.changeText(event, 3) }}
                      />
                      <SVG source={LIUYAN2} style={{ width: 16, height: 16 }}></SVG>
                    </View>
                  </View>
                </View>
              </View>
              :
              <></>}

            {/* 确定按钮 */}
            <View style={styles.tapConfirmArea}>
              <TouchableWithoutFeedback onPress={this.addTransferplan}>
                <LinearGradient style={[styles.tapConfirmWrapper, noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]} colors={$globalStyle.buttonLinerBackground}>
                  <Text style={styles.tapConfirm}>确定</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
            <View style={{paddingHorizontal: 20, paddingTop: 40, paddingBottom: 80}}>
              <Text style={{color: '#999', lineHeight: 21, fontSize: 12}}>说明:</Text>
              <Text style={{color: '#999', lineHeight: 21, fontSize: 12}}>1、如果预约转账连续执行失败10次，为避免打扰系统将为您自动关闭预约转账。</Text>
              <Text style={{color: '#999', lineHeight: 21, fontSize: 12}}>2、预约转账执行结果将发送至150****4524。</Text>
            </View>
          </ScrollView>
          {/* 每月转账日期选择 */}
          <Picker
            ref={ref => this.picker = ref}
            pickerData={pickerData}
            selectedValue={selectedValue}
            onPickerConfirm={this.getData}
            onPickerCancel={() => { }}
          ></Picker>
          {/* 银行卡选择 */}
          <CardPick
            ref={ref => this.cardPick = ref}
            cardList={cardList}
            selectIndex={selectCardIndex}
            onConfirm={this.getCard}
            onCancel={() => { }}
          ></CardPick>
        </KeyboardAvoidingView >
        {
          this.state.dealModalVisible ?
            <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ height: 322, width: 343, alignItems: 'center', backgroundColor: 'white', borderRadius: 5 }}>
                <View style={{ height: 48, borderBottomColor: '#EBEBEB', borderBottomWidth: 1, width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 17, color: '#333333', textAlign: 'center', width: '80%', marginLeft: '10%' }}>请输入交易密码</Text>
                  <TouchableWithoutFeedback onPress={() => { this.payClick(1) }} >
                    <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: "center", }}>
                      <SVG style={{ width: 12, height: 12 }} source={CLOSE} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ height: 155, width: '100%', alignItems: 'center' }}>
                  {/* 33333333 */}
                  <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#333333', marginTop: 16 }}>{payeeName}
                    <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#666666' }}>{`(${payeeCardBank})`}</Text>
                  </Text>
                  <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#333333', marginTop: 10 }}>{payeeCardNo}</Text>

                  <Text style={{ fontFamily: 'Arial-BoldMT', fontSize: 20, color: '#333333', marginTop: 16, }}>¥
                    <Text style={{ fontWeight: 'bold', fontSize: 26 }}>{transferAmount}</Text>
                  </Text>
                  <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 13, color: '#999999', marginTop: 16 }}>请输入一卡通<Text style={{ color: '#E9962F' }}>{`${cardList[selectCardIndex].cardNo.substr(0, 4)}********${cardList[selectCardIndex].cardNo.substr(-4)}`}</Text>取款密码</Text>
                </View>
                <View style={{ height: 52, width: 317, }}>
                  <View style={{ position: 'absolute', width: '100%', height: "100%", justifyContent: 'center', borderColor: '#E2E2E2', borderWidth: 1, flexDirection: "row" }}>
                    {
                      new Array(6).fill('').map((item, index) => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderLeftWidth: index === 0 ? 0 : 1, borderLeftColor: '#E2E2E2' }}>
                          <Text>{tradePassword.substr(index, 1) && '*'}</Text>
                        </View>
                      ))
                    }
                  </View>
                  <TextInput keyboardType='numeric' autoFocus={true} caretHidden={true} maxLength={6} secureTextEntry={true} style={{ fontSize: 20, color: 'transparent' }} value={tradePassword} onChangeText={this.trade_passwordChange}></TextInput>
                </View>
                <TouchableWithoutFeedback onPress={() => { this.payClick(2) }} >
                  <LinearGradient colors={$globalStyle.buttonLinerBackground} style={[styles.subbutView, tradePassword.length == 6 ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
                    <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 15, fontFamily: 'PingFangSC-Medium' }}>确认转账</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
            :
            <></>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cicleItem: {
    fontSize: 16,
    textAlign: 'center',
    borderColor: '#7AA2AB',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 10,
    color: '#7AA2AB'
  },
  cicleChoose: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: 327,
    marginTop: 15
  },
  subbutView: {
    height: 38,
    width: '90%',
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 16
  },
  additionInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 20
  },
  additionInputBox: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  tapConfirmArea: {
    paddingHorizontal: 20,
    marginTop: 60
  },
  tapConfirmWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 5
  },
  tapConfirm: {

    fontSize: 17,
    color: '#fff'
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 16
  },
  inputTitle: {
    fontSize: 16,
    color: '#3A3A3A',
    fontWeight: '800',
    left: 20,
    top: 10
  },
  moneyInput: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#fff'
  },
  chooseBoxArea: {
    marginTop: 31,
    width: '100%'
  },
  chooseBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomColor: '#F0F0F0',
    // borderBottomWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 1,
    paddingHorizontal: 20,
    height: 45
  },
  openStyle: {
    marginLeft: 7
  },
  dateChoose: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  tabArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 327,
    height: 60,
    borderWidth: 1,
    borderColor: $globalStyle.reservation.chosenColor,
    borderRadius: 4,
    marginTop: 16
  },
  tabText: {
    color: $globalStyle.reservation.chosenColor
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  active: {
    backgroundColor: $globalStyle.reservation.chosenColor,
    color: '#fff'
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  chooseItem: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    width: "100%",
    alignItems: 'center'
  },
  active2: {
    backgroundColor: $globalStyle.transfer.queryColor,
    borderRadius: 4,
    color: '#fff',
    borderColor: $globalStyle.transfer.queryColor,
    borderWidth: 1,
    borderRadius: 4,
  },
  textItem: {
    width: 74,
    height: 32,
    textAlign: 'center',
    lineHeight: 30,
    borderColor: $globalStyle.transfer.queryBorder,
    borderWidth: 1,
    borderRadius: 4,
    color: '#3a3a3a',
    marginLeft: 20
  },
})
module.exports = addTransferAccounts;
