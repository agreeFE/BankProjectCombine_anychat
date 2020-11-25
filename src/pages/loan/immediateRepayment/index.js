import React, { Component,  } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
  Keyboard
} from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import { DELETE, CLOSE } from '../imageSource/index'
import scope from '@/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const {formatMoney} = require('$/util/moneyutil')
import SVG from "$/components/Svg";
const moneyTextArr = ['百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '万亿', '十万亿']
let timeout
module.exports = class RepayNow extends Component {
  constructor(props) {
    super(props);
    scope(this);
    this.state = {
      value: '',
      // defaultValue: 1000,
      showModal: false,
      tradePassword: '',
      interest: '0',
      totalAmount: '0',
      inputType:true,
      repayMoney: '0',
      repayInterest: '0'
    }
  }
  render() {
    const { value, interest, totalAmount, repayMoney, repayInterest } = this.state
    const { loanInfo } = this.props.navigation.state.params
    let date = `${loanInfo.openDate.substr(0,4)}-${loanInfo.openDate.substr(4,2)}-${loanInfo.openDate.substr(-2)}`
    return (
      <>
        <Header 
          // shoeRightIco={false}
          title={'立即还款'}
          leftClick={()=> {router.back()}}
        ></Header>
        <KeyboardAvoidingView  style={styles.container} behavior="absolute" enabled>
          <ScrollView keyboardShouldPersistTaps={'always'}>
          <TouchableWithoutFeedback onPress={()=> {}}>
            <View>
            {/* 简要信息 */}
            <View style={styles.infoCon}>
              <View style={{ paddingLeft: 16,paddingRight: 16,}}>
                <View style={styles.title}>
                  <Text style={styles.titleFont}>合约号：{loanInfo.contractNumber}</Text>                  
                  <Text style={styles.titleFont}>贷款流水：{loanInfo.loanAccount}</Text>

                  {/* <TouchableWithoutFeedback onPress={() =>{}}>
                    <View style={styles.detial}>
                      <Text style={styles.detialFont}>详情</Text>
                    </View>
                  </TouchableWithoutFeedback> */}
                </View>
                <Text style={styles.textFont}>借款金额：
                  <Text style={styles.inlineFont}>{formatMoney(loanInfo.amountPaid)}</Text>
                </Text>
                <Text style={styles.textFont}>待还本金：
                  <Text style={styles.inlineFont}>{formatMoney(repayMoney)}</Text>
                </Text>
                <Text style={styles.textFont}>待还利息：
                  <Text style={styles.inlineFont}>{formatMoney(repayInterest)}</Text>
                </Text>
                {/* <Text style={styles.textFont}>剩余应还：
                  <Text style={styles.inlineFont}>{formatMoney(repayMoney)}</Text>
                </Text> */}
                {/* <Text style={styles.textFont}>本期最低还款：
                  <Text style={styles.inlineFont}>{formatMoney(defaultValue)}</Text>
                </Text> */}
              </View>
              <View style={styles.date}>
                <Text style={styles.dateFont}>借款日期：{date}</Text>
              </View>
            </View>
            {/* 金额输入 */}
            <View style={styles.Con}>
              
              <View style={styles.inputCon}>
                <Text>还款本金</Text>
                {
                  value.length > 2 ?
                    <View style={{ position: 'absolute', top: 4, left: 100, borderLeftColor: '#ddd', borderLeftWidth: 1 }}>
                      <Text style={{ color: '#666', fontSize: 12, marginLeft: 5 }}>
                        {moneyTextArr[value.length - 3]}
                      </Text>
                    </View>
                    :
                    <></>
                }
                <Text style={styles.inputFont}>￥</Text>
                <TextInput 
                  style={[styles.inputFont,{flex: 1,color: Number(value) > Number(repayMoney)? 'red': '#000'}]}
                  ref='textInput1'
                  autoFocus={true}
                  value={value}
                  keyboardType='numeric'
                  onChange={this.changeText}
                  // onChange={}
                ></TextInput>
                {
                  !value ?
                  <></>
                  :
                  <TouchableWithoutFeedback onPress= {() => {this.setState({value: '', interest: '0', totalAmount: '0'})}}>
                    <View style={{justifyContent: "center", alignItems: 'center', width: 50, height: 50}}>
                      <ImageBackground source={DELETE} style={{width: 18, height: 18}}></ImageBackground>
                    </View>
                  </TouchableWithoutFeedback> 
                }
                <Text 
                  style={{color: '#1278EF', height: '100%', width: 50, textAlign: "center",lineHeight: 70}} 
                  onPress={() => {this.setState({value: repayMoney + '' },() => {this.blurInput()})}}>全部</Text>
              </View>
              {/* <TouchableWithoutFeedback onPress={}></TouchableWithoutFeedback> */}
              <View style={{flexDirection: 'row', paddingHorizontal: 18, height: 40, alignItems: "center"}}> 
                <Text>利息   ￥</Text>
                <Text style={{fontSize: 16}}>{formatMoney(interest)}</Text>
              </View>
              <View style={{flexDirection: 'row', paddingHorizontal: 18, height: 40, alignItems: "center", marginBottom: 40}}>
                <Text>总计   ￥</Text>
                <Text style={{fontSize: 16}}>{formatMoney(totalAmount)}</Text>
              </View>
              <TouchableWithoutFeedback onPress={this.click}>
                <LinearGradient style={[styles.ensure,!!value ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]} colors={window.$globalStyle.buttonLinerBackground}>
                  <Text style={styles.ensureFont}>确定</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
            </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          
        </KeyboardAvoidingView>
        {
          this.state.showModal ? 
          <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{height: 322,  width: 343, paddingBottom: 20, alignItems: 'center', backgroundColor: 'white', borderRadius: 5 }}>
              <View style={{ height: 48, borderBottomColor: '#EBEBEB', borderBottomWidth: 1, width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, color: '#333333', textAlign: 'center', width: '80%', marginLeft: '10%' }}>请输入交易密码</Text>
                <TouchableWithoutFeedback onPress={this.toggleModal} >
                  <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: "center", paddingRight: 10 }}>
                    <SVG style={{ width: 12, height: 12 }} source={CLOSE} />
                  </View> 
                </TouchableWithoutFeedback>
              </View>
              <View style={{ height: 130, width: '100%', alignItems: 'center',justifyContent: "center" }}>
                {/* <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#333333' , marginTop: 16 }}>{this.state.payee_name}  <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#666666' }}>({this.state.payee_card_bank})</Text></Text>
                <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#333333', marginTop: 10 }}>{this.state.payee_card_no}</Text> */}
                {/* <Text style={{ fontFamily: 'Arial-BoldMT', fontSize: 28, color: '#333333', marginTop: 16, fontWeight: 'bold' }}>¥ {value}</Text> */}
                {/* <Text style={{ fontFamily: 'Arial-BoldMT', fontSize: 20, color: '#333333', marginTop: 16, }}>¥ 
                  <Text style={{fontWeight: 'bold', fontSize: 26}}>{value}</Text>
                </Text> */}
                {/* <Text style={{ fontFamily: 'Arial-BoldMT', fontSize: 16, color: '#333333', marginTop: 13, }}>本金 ￥
                  <Text style={{ fontSize: 20}}>{formatMoney(value)}</Text>
                </Text>
                <Text style={{ fontFamily: 'Arial-BoldMT', fontSize: 16, color: '#333333', marginTop: 4, }}>利息 ￥
                  <Text style={{ fontSize: 20}}>{formatMoney(interest)}</Text>
                </Text> */}
                <Text style={{ fontFamily: 'Arial-BoldMT', fontSize: 16, color: '#333333', marginTop: 34, }}>总计 ￥
                  <Text style={{ fontSize: 20}}>{formatMoney(totalAmount)}</Text>
                </Text>
                <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 13, color: '#999999', marginTop: 34 }}>请输入一卡通
                  <Text style={{ color: '#E9962F' }}>{`${loanInfo.debitAccount.substr(0,4)}****${loanInfo.debitAccount.substr(-4)}`}</Text>取款密码</Text>
              </View>
              <View style={{ height: 52, width: 317,marginTop: 5}}>
                <View style={{position: 'absolute',width: '100%', height: "100%", justifyContent: 'center',borderColor: '#E2E2E2', borderWidth: 1, flexDirection: "row", }}>
                {
                  new Array(6).fill('').map((item,index) => (
                    <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center',  borderLeftWidth: index ===0 ? 0 : 1, borderLeftColor: '#E2E2E2' }}>
                      <Text>{this.state.tradePassword.substr(index,1) && '*'}</Text>
                    </View>
                  ))
                }
                </View>
                <TextInput keyboardType='numeric' autoFocus={true} caretHidden={true} maxLength={6} secureTextEntry={true} style={{ fontSize: 20, color: 'transparent' }} value={this.state.tradePassword} onChangeText={this.trade_passwordChange}></TextInput>
              </View>
              <TouchableWithoutFeedback onPress={this.payClick} > 
                <LinearGradient colors={window.$globalStyle.buttonLinerBackground} style={[{height: 48,width: '90%',justifyContent: 'center', borderRadius: 5,marginTop: 30,},this.state.tradePassword.length == 6 ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
                  <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 15, fontFamily: 'PingFangSC-Medium', }}>确认还款</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
          </View>
          :
          <></>
        }
      </>
    )
  }

  blurInput = () => {
    this.calcInterest()
    // console.warn('tag', 1111)
  }

  calcInterest = () => {
    const { value, repayMoney } = this.state
    const { loanInfo, paymentInfo } = this.props.navigation.state.params
    if(value == '') {
      this.setState({
        totalAmount: 0,
        interest: 0
      })
      return
    }
    if(value.split('.').length > 2 || Number(value) === 0) {
      $Toast.info('请输入正确数字')
      return
    } 
    if(Number(value) > Number(repayMoney)) {
      // $Toast.info('还款金额超出限额')
      return
    }
    let info = { 
      loanAccount: loanInfo.loanAccount,
      transactionAmount: value+'',
      operationIdentification: '2'
    }
    NetworkUtil.networkService('/account/loans/loanInterestCal', info, response => {
      if(value) {
        this.setState({
          interest: response.interestReceivable,
          totalAmount: response.amountInTotal
        })
      }
    })
  }
  click = () => {
    const { value, repayMoney } = this.state
    const { loanInfo } = this.props.navigation.state.params
    // let info = {
    //   loanAccount: loanInfo.loanAccount,
    //   transactionAmount: value+'',
    //   operationIdentification: '2'
    // }
    if(!value) {
      $Toast.info('请输入还款金额')
      return
    }
    if(Number(value) > Number(repayMoney)) {
      $Toast.info('还款金额超出限额')
      return
    }
    // NetworkUtil.networkService('/account/loans/loanInterestCal', info, response => {
    //   this.setState({
    //     interest: response.interest_receivable,
    //     totalAmount: response.amount_in_total
    //   })
      Keyboard.dismiss()
      setTimeout(() => {
        this.toggleModal()
      }, 500);
    // })
    
  }

  componentDidMount() {
    const { loanInfo } = this.props.navigation.state.params
    const { loanAccount } = loanInfo
    NetworkUtil.networkService('/account/loans/loanDebtQuery', {accountNo: loanAccount}, response => {
      this.setState({
        repayMoney: response.principal,
        repayInterest: response.interestSum
      })

    })
  }
  changeText = (event) => {
    const {text} = event.nativeEvent
    this.setState({value: text.replace(/[^0-9.]/g,'')})
    this.debounce(() => this.calcInterest(), 500)
    // if(this.state.inputType){
    //   this.setState({inputType: false})
    //   setTimeout(() => {
    //     this.blurInput()
    //     this.setState({inputType: true})
    //   }, 1000);
    // }  
  }  
  debounce = (fnc, time) => {
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      // timeout = null
      fnc()
    }, time);
  }   

  trade_passwordChange = (event) => {
    this.setState({tradePassword: event})
  }

  toggleModal = () => {
    const { value } = this.state
    if(value.split('.').length > 2 || Number(value) === 0) {
      $Toast.info('请输入正确数字')
      return
    }
    this.setState({
      showModal: !this.state.showModal,
      tradePassword: ''
    })
  }

  payClick = () => {
    Keyboard.dismiss()
    const { tradePassword, value, interest, totalAmount } = this.state
    const { loanInfo } = this.props.navigation.state.params
    if(!tradePassword) {
      $Toast.info('请输入交易密码')
      return
    }
    // let info = {
    //   loanAccount: loanInfo.loanAccount,
    //   transactionAmount: value+'',
    //   operationIdentification: '2'
    // }
    let info2 = {
      loanAccount: loanInfo.loanAccount,
      amountOf: value+'',
      transPassword: tradePassword,
      debitAccount: loanInfo.debitAccount
    }
    // NetworkUtil.networkService('/account/loans/loanInterestCal', info, response => {
      info2.interest = interest
      info2.totalAmount = totalAmount
      this.setState({tradePassword: ''})
      this.toggleModal()
      NetworkUtil.networkService('/account/loans/loanRepayment', info2, response => {
        $Toast.info('还款成功')
        setTimeout(() =>{
          router.back()
        },1000)
      })
    // })
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  Con: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  ensure: {
    borderRadius: 5,
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },
  ensureFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  inputCon: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 60,
    backgroundColor: '#fff',
    paddingRight: 16,
    paddingLeft: 16
  },
  inputFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 32,
    color: '#333333',
    letterSpacing: 0.38,
    lineHeight:45 
  },
  infoCon: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: "hidden"
  },
  title: {
    height: 72,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 1
  },
  titleFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#333333',
    letterSpacing: 0.19,
    textAlign: 'center',
    lineHeight: 22
  },
  detial: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4494F2',
    borderRadius: 16,
    width: 60,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  detialFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#1278EF',
    lineHeight: 18
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#666666',
    letterSpacing: 0.18,
    lineHeight: 21,
    marginTop: 16
  },
  inlineFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#151515',
    letterSpacing: 0.18,
    lineHeight: 21
  },
  date: {
    height: 32,
    marginTop: 12,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16
  },
  dateFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#999999',
    letterSpacing: 0.17,
    lineHeight: 20
  }
})
