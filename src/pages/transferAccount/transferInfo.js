import React, { Component,  } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, ActivityIndicator, Text, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard, KeyboardAvoidingView, Easing, BVLinearGradient, Animated, Modal } from 'react-native';
import Header from '$/components/header'
import { USERNAME, SAOYISAO, RIGHTARROW, TONGXUNLU, LIUYAN, DEFAULTUSERIMG, PHONEHEAD, CLOSE, CHOOSE } from './imageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
import LinearGradient from 'react-native-linear-gradient'
import CardPick from '$/components/cardPick'
const { formatMoney, checkValidity } = require('$/util/moneyutil')
import SVG from "$/components/Svg";
const { mobilePhoneTest } = require("$/util/regexutil");
const { formatCardNum } = require('$/util/cardNumutil');

module.exports = class transferInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    const moneyTextArr = ['百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '万亿', '十万亿']
    this.state = {
      isLoading: true,
      moneyTextArr,
      isAgreeProtocol: false, //是否同意服务条款协议
      modalVisible: false,//支付模态场景是否可见
      pickIndex: 0, //模态框被选择的索引值
      payeeName: '',//户名
      payeeCardNo: '',//账号
      payeeCardBank: '',//银行名称
      transferAmount: '',//转账金额
      smsPhone: '',//短信通知
      transferRemark: '',//转账附言
      tradePassword: '',//支付密码
      payCard: { 'cardBank': 'XXXX', 'cardNo': '0000', 'accBal': '0.00' },//付款卡信息
      cardInfoList: [],
      phoneCheck: false, //手机号校验布尔值
    }

  }
  componentWillMount(): void {
    this.getCardList()
    //如果是最近转账人转账获取信息
    if (window.transferType == 2) {
      var info = window.friInfo
      this.setState({ payeeName: info.payeeName })
      this.setState({ payeeCardNo: info.payeeCardNo.replace(/\D/g, '').replace(/....(?!$)/g, '$& ') })
      this.setState({ payeeCardBank: info.payeeCardBank })
    } else if (window.transferType == 3) {
      var info = window.friInfo
      this.setState({ payeeName: info.payeeName })
      this.setState({ smsPhone: info.smsPhone })
    }
  }

  //获取银行卡列表
  getCardList = () => {
    var data = {}
    let _this = this
    data.classify = 0
    NetworkUtil.networkService('/account/bankcard/list', data, function (response) {
      var cardInfo = response.appBankCards
      var cardSelect = []
      for (let i = 0; i < cardInfo.length; i++) {
        var info = {}
        info.key = i
        info.value = cardInfo[i].cardBank + (cardInfo[i].cardNo).substr(-4)
        info.label = cardInfo[i]
        cardSelect.push(info)
      }
      const { cardNum = '' } = _this.props.navigation.state.params
      let index = cardSelect.map(item => item.label.cardNo).indexOf(cardNum)
      index = index > 0 ? index : 0
      _this.setState({isLoading:false, cardInfoList: cardSelect, pickIndex: index })
      _this.setState({ payCard: { 'cardBank': cardSelect[index].label.cardBank, 'cardNo': cardSelect[index].label.cardNo, 'accBal': cardSelect[index].label.accBal } })
    })
  }
  payeeAuto = () => {
    let info = window.chosenCardInfo
    if (!info) return
    this.setState({
      payeeName: info.payeeName,//户名
      payeeCardNo: info.payeeCardNo.replace(/\D/g, '').replace(/....(?!$)/g, '$& '),//账号
      payeeCardBank: info.payeeCardBank
    })
  }
  componentWillUnmount() {
    window.chosenCardInfo = null
  }

  payeeNameChange = (text) => {
    this.setState({ payeeName: text })
  }

  payeeCardNoChange = (event) => {
    const { text } = event.nativeEvent
    this.setState({
      payeeCardNo: text.replace(/\D/g, '').replace(/....(?!$)/g, '$& '),
      payeeCardBank: text.length > 6 ? '赞同科技' : ''
    })
  }

  transferAmountChange = (text) => {
    // 金额有小数点情况
    let dealText = '';
    let pointIndex = text.indexOf('.')
    dealText = pointIndex > -1 ? text.slice(0, pointIndex) : text;

    this.setState({
      dealTextLength: dealText.length,
      transferAmount: checkValidity(text)
    })
  }
  smsPhoneChange = (text) => {
    const newText = text.replace(/[^\d]+/, '');
    this.setState({ smsPhone: newText })
  }
  transferRemarkChange = (text) => {
    this.setState({ transferRemark: text })
  }
  trade_passwordChange = (text) => {
    this.setState({ tradePassword: text })
    // this.
  }
  back = () => {
    router.back()
  }
  //pick选中回调
  getDateValue = ({ index, item }) => {
    let _this = this
    var payInfo = { 'cardBank': item.label.cardBank, 'cardNo': item.label.cardNo, 'accBal': item.label.accBal }
    _this.setState({ payCard: payInfo })

    _this.setState({ pickIndex: item.key })
  }
  // 显示模态框
  toggleModal = () => {
    // this.cardPick.toggleModal()
    Keyboard.dismiss()
    setTimeout(() => {
      this.cardPick.toggleModal()
    }, 20)
  }
  //提交转账
  submitData = () => {

    var data = {}
    data.transferAmount = this.state.transferAmount
    data.payeeCardNo = this.state.payeeCardNo.replace(/[^\d]+/g, '');
    data.payeeName = this.state.payeeName
    data.payeeCardBank = this.state.payeeCardBank
    data.transferRemark = this.state.transferRemark
    if (this.state.smsPhone != '') {
      data.smsPhone = this.state.smsPhone
    }
    data.payerCardNo = this.state.payCard.cardNo
    data.payerCardBank = this.state.payCard.cardBank
    data.transferTimeWay = 1
    data.tradePassword = this.state.tradePassword
    if (window.transferType == 3) {
      // router.load('transferSuccess');
      router.replace('transferSuccess');
    } else {
      console.log('转账', data)
      NetworkUtil.networkService('/account/transfer/bctransfer', data, function (response) {
        console.warn('转账结果', response)
        // router.load('transferSuccess')
        router.replace('transferSuccess')
      })
    }

  }
  //支付弹窗按钮
  payClick = (index) => {
    const { transferAmount, isAgreeProtocol, payCard, payeeName, payeeCardNo, smsPhone, tradePassword } = this.state

    if (index == 1) {
      Keyboard.dismiss()

      this.setState({ modalVisible: false, tradePassword: '' });

    } else if (index == 2) {
      if (tradePassword.length < 6) {
        $Toast.info('请输入交易密码')
        return
      }

      Keyboard.dismiss()
      this.setState({ modalVisible: false, tradePassword: '' });
      this.submitData()

    } else {
      //验证
      if (window.transferType != 3) {
        if (payeeName == '') {
          $Toast.info('请输入收款户名')
          return
        }
        if (payeeCardNo == '') {
          $Toast.info('请输入收款账号')
          return
        }
        let checkedCardNum = payeeCardNo.replace(/[^\d]+/g, '')
        let pattern = /^([1-9]{1})(\d{14}|\d{18})$/
        if (!pattern.test(checkedCardNum)) {
          $Toast.info('银行卡号输入有误！')
          return
        }
        if (this.state.payeeCardNo.replace(/[^\d]+/g, '') == this.state.payCard.cardNo) {
          $Toast.info('付款卡和收款卡不能为同一张卡')
          return
        }
      }

      if (transferAmount == '') {
        $Toast.info('请输入转账金额')
        return
      }
      if (Number(transferAmount) > Number(payCard.accBal)) {
        $Toast.info('余额不足')
        return
      }
      if (!isAgreeProtocol) {
        $Toast.info('请同意转账服务条款')
        return
      }
      if (smsPhone && !mobilePhoneTest(smsPhone)) {
        $Toast.info('请输入正确的手机号')
        return
      }
      if (parseInt(transferAmount) <= 0) return
      Keyboard.dismiss()
      this.setState({ modalVisible: true });
    }
  }
  agreeProtocol = () => {
    let { isAgreeProtocol } = this.state;
    this.setState({
      isAgreeProtocol: !isAgreeProtocol
    })
  }
  // 手机号码格式化
  validateMobile = (val) => {
    val = val.replace(/[^\d]/g, '').substr(0, 11)
    if (val.length <= 3) {
      return val
    } else if (val.length <= 7) {
      val = val.replace(/(\d{3})(\d{0,4})/, '$1 $2')
    } else {
      val = val.replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3')
    }
    return val
  }
  render() {
    const { dealTextLength,isLoading, moneyTextArr, isAgreeProtocol, transferAmount, payCard, tradePassword, payeeName, payeeCardNo } = this.state
    let noOpacity = transferAmount > 0 && isAgreeProtocol && (window.transferType == '1' ? (!!payeeName && !!payeeCardNo) : true)
    return (
      <>
        <NavigationEvents onWillFocus={payload => { this.payeeAuto() }}></NavigationEvents>
        <Header
          title={'转账'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        {/* 银行卡转账 */}
        {/* <View style={styles.body}> */}
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior="absolute" style={styles.body} enabled>
            <ScrollView keyboardShouldPersistTaps={'always'}>
              {window.transferType == '1' ?
                <View style={{ backgroundColor: '#FFFFFF' }}>
                  <Text style={styles.leftTitleText}>收款人</Text>
                  <View>
                    <View style={styles.inputInfoView}>
                      <Text style={styles.inputTitle}>户名</Text>
                      {/* onChangeText={this.payeeNameChange} */}
                      <TextInput style={styles.inputText} placeholder='请输入收款人户名' value={payeeName} onChangeText={this.payeeNameChange}></TextInput>
                      {/* <Text style={[styles.inputText,{color: !!this.state.payeeName ? '#000' : '#999'}]}>{this.state.payeeName || ''}</Text> */}
                      <TouchableWithoutFeedback onPress={() => { router.load('transferMyFriend', { goback: 1 }) }}>
                        <View style={[styles.inputImg]}>
                          <SVG style={[{ height: 16, width: 16 }]} source={USERNAME} />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.inputInfoView}>
                      <Text style={styles.inputTitle}>账号</Text>
                      {/* onChangeText={this.payeeCardNoChange} */}
                      <TextInput placeholder='请输入收款人账号' maxLength={23} keyboardType='numeric' style={styles.inputText} value={this.state.payeeCardNo} onChange={this.payeeCardNoChange}></TextInput>
                      {/* <Text style={[styles.inputText,{color: !!this.state.payeeCardNo ? '#000' : '#999'}]}>{this.state.payeeCardNo || '请输入收款人户名'}</Text> */}
                      <View style={[styles.inputImg]}>
                        <SVG style={[{ height: 16, width: 16 }]} source={SAOYISAO} />
                      </View>
                    </View>
                  </View>
                  <View style={styles.inputInfoView}>
                    <Text style={styles.inputTitle}>银行</Text>
                    <TextInput placeholder='选择银行' editable={false} style={[styles.inputText, { color: '#000' }]} value={this.state.payeeCardBank} ></TextInput>
                    <View style={[styles.inputImg, { alignItems: 'center', justifyContent: 'center' }]}>
                      <SVG style={[{ height: 12, width: 6 }]} source={RIGHTARROW} />
                    </View>
                  </View>
                </View> : <></>}
              {/* 历史收款人转账 */}
              {window.transferType == '2' ?
                <View style={{ backgroundColor: '#FFFFFF', height: 111 }}>
                  <Text style={styles.leftTitleText}>收款人</Text>
                  <View style={styles.accbodyView}>
                    {/* <Image style={{ width: 50, height: 45, }} source={BANK} /> */}
                    <SVG source={DEFAULTUSERIMG} style={{ width: 48, height: 48 }}></SVG>
                    <View style={{ paddingLeft: 20 }}>
                      <Text style={{ fontSize: 15, color: '#333333', fontFamily: 'PingFangSC-Medium' }}>{this.state.payeeName}  <Text style={{ fontSize: 14, color: '#999999', fontFamily: 'PingFangSC-Regular' }}>{this.state.payeeCardBank}</Text></Text>
                      {/* <Text style={{ fontSize: 15, color: '#333333', fontFamily: 'PingFangSC-Medium' }}>{ window.transferType == '2' ? '马德政' : this.state.payeeName}  <Text style={{ fontSize: 14, color: '#999999', fontFamily: 'PingFangSC-Regular' }}>{this.state.payeeCardBank}</Text></Text> */}
                      <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'PingFangSC-Medium', paddingTop: 5 }}>{this.state.payeeCardNo}</Text>
                    </View>
                  </View>
                </View> : <></>}
              {/* 手机号转账 */}
              {window.transferType == '3' ?
                <View style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', height: 64 }}>
                  <View style={[styles.accbodyView, { alignItems: 'center' }]}>
                    {/* <Image style={{ width: 32, height: 32, }} source={PHONEHEAD} /> */}
                    <SVG source={DEFAULTUSERIMG} style={{ width: 48, height: 48 }}></SVG>
                    <View style={{ paddingLeft: 20 }}>
                      <Text style={{ fontSize: 15, color: '#333333', fontFamily: 'PingFangSC-Medium' }}>{this.state.payeeName} </Text>
                      <Text style={{ fontSize: 15, color: '#3A3A3A', fontFamily: 'PingFangSC-Regular', paddingTop: 5 }}>{this.validateMobile(this.state.smsPhone)}</Text>
                    </View>
                  </View>
                </View>
                : <></>}
              <View style={{ backgroundColor: '#FFFFFF', marginTop: 8, position: 'relative' }}>
                <Text style={styles.leftTitleText}>转账金额</Text>

                <View style={[styles.inputInfoView, { position: 'relative' }]}>
                  {
                    dealTextLength > 2 ?
                      <View style={{ position: 'absolute', top: -9, left: 60, borderLeftColor: '#ddd', borderLeftWidth: 1 }}>
                        <Text style={{ color: '#666', fontSize: 12, marginLeft: 5 }}>
                          {moneyTextArr[dealTextLength - 3]}
                        </Text>
                      </View>
                      :
                      <></>
                  }
                  <Text style={[styles.inputTitle, { fontSize: 25 }]}>￥</Text>
                  <View style={{ position: 'relative', height: 65, width: '100%', justifyContent: 'center' }}>

                    {
                      !this.state.transferAmount ?
                        <Text style={{ position: 'absolute', color: '#999', width: 100, fontSize: 15, marginLeft: 8 }}>0 手续费</Text>
                        :
                        <></>
                    }
                    <TextInput
                      keyboardType='numeric'
                      maxLength={14}
                      style={[styles.inputText, { textAlign: 'left', fontSize: 25, color: Number(transferAmount) > Number(payCard.accBal) ? 'red' : '#000' }]}
                      value={this.state.transferAmount}
                      onChangeText={this.transferAmountChange}>
                    </TextInput>
                  </View>
                </View>
                <View style={[styles.inputInfoView, { height: 65, }]}>
                  <Text style={[styles.inputTitle]}>付款卡</Text>
                  <TouchableWithoutFeedback onPress={() => { this.toggleModal() }} >
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                      {
                        isLoading ? 
                        <ActivityIndicator color="#777" />
                        :
                        <>
                        <Text style={{ width: '100%', textAlign: 'right', fontSize: 15, color: '#3A3A3A' }}>{this.state.payCard.cardBank}({(this.state.payCard.cardNo).substr(-4)})</Text>
                        <Text style={{ width: '100%', textAlign: 'right', fontSize: 14, color: '#999999' }}>余额  ¥ {formatMoney(this.state.payCard.accBal)}</Text>
                        </>
                      }
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={[styles.inputImg]}>
                    <SVG style={[{ height: 12, width: 6 }]} source={RIGHTARROW} />
                  </View>
                </View>
              </View>
              <View style={{ backgroundColor: '#FFFFFF', marginTop: 8 }}>
                {window.transferType != '3' ? <View style={styles.inputInfoView}>
                  <Text style={[styles.inputTitle]}>短信通知</Text>
                  <TextInput placeholder='可不填' keyboardType='numeric' style={[styles.inputText]} value={this.state.smsPhone} onChangeText={this.smsPhoneChange} maxLength={11}></TextInput>
                  <View style={styles.inputImg}>
                    <SVG style={{ width: 16, height: 16 }} source={TONGXUNLU} />
                  </View>
                </View> : <></>}
                <View style={styles.inputInfoView}>
                  <Text style={[styles.inputTitle]}>转账附言</Text>
                  <TextInput placeholder='转账' style={[styles.inputText]} value={this.state.transferRemark} onChangeText={this.transferRemarkChange}></TextInput>
                  <View style={styles.inputImg}>
                    <SVG style={{ width: 15, height: 15 }} source={LIUYAN} />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', paddingLeft: 15, alignItems: 'center', paddingTop: 10 }}>
                <TouchableWithoutFeedback onPress={this.agreeProtocol}>
                  <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: $globalStyle.chosenColor, backgroundColor: isAgreeProtocol ? $globalStyle.chosenColor : 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                    <SVG source={isAgreeProtocol ? require('$image/transferAccount/check.svg') : ''} style={{ width: 20, height: 10 }}></SVG>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={{ paddingLeft: 5, color: '#999999', fontSize: 13, }}>已阅读并同意
                  <Text style={{ color: '#f4be7a' }}>{`《${window.transferType == '3' ? '手机号' : ''}转账服务条款》`}</Text>
                </Text>
              </View>

              <TouchableWithoutFeedback onPress={() => { this.payClick() }} >
                <LinearGradient colors={window.$globalStyle.buttonLinerBackground} style={[styles.butView, noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
                  <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 17, fontFamily: 'PingFangSC-Medium' }}>下一步</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
          {/* 模态窗 */}
          <CardPick
            ref={ref => { this.cardPick = ref }}
            cardList={this.state.cardInfoList}
            selectIndex={this.state.pickIndex}
            onConfirm={this.getDateValue}
          ></CardPick>
        </View>
        {/* </View> */}

        {/*支付弹窗 */}
        {/* <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalVisible}
        >
        </Modal> */}
        {
          this.state.modalVisible ?
            <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ height: 322, width: 343, alignItems: 'center', backgroundColor: 'white', borderRadius: 5 }}>
                <View style={{ height: 48, borderBottomColor: '#EBEBEB', borderBottomWidth: 1, width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 17, color: '#333333', textAlign: 'center', width: '80%', marginLeft: '10%' }}>请输入交易密码</Text>
                  <TouchableWithoutFeedback onPress={() => { this.payClick(1) }} >
                    <View style={{ width: 20, height: 20, justifyContent: "center", alignItems: 'center' }}>
                      <SVG style={{ width: 12, height: 12 }} source={CLOSE} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ height: 155, width: '100%', alignItems: 'center' }}>
                  <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#333333', marginTop: 16 }}>{this.state.payeeName}
                    <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#666666' }}>{this.state.payeeCardBank ? `(${this.state.payeeCardBank})` : '' }</Text>
                  </Text>
                  {/* <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#333333', marginTop: 16 }}>{window.transferType == '2' ? '马德政' : this.state.payeeName}
                    <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#666666' }}>{`(${this.state.payeeCardBank})`}</Text>
                  </Text> */}
                  <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#333333', marginTop: 10 }}>{this.state.payeeCardNo || this.validateMobile(this.state.smsPhone)}</Text>
                  {/* <Text style={{ fontFamily: 'Arial-BoldMT', fontSize: 24, color: '#333333', marginTop: 16 }}>¥ {this.state.transferAmount}</Text> */}
                  <Text style={{ fontFamily: 'Arial-BoldMT', fontSize: 20, color: '#333333', marginTop: 16, }}>¥
                    <Text style={{ fontWeight: 'bold', fontSize: 26 }}>{this.state.transferAmount}</Text>
                  </Text>
                  <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 13, color: '#999999', marginTop: 16 }}>请输入一卡通<Text style={{ color: '#E9962F' }}>{`${this.state.payCard.cardNo.substr(0, 4)}********${this.state.payCard.cardNo.substr(-4)}`}</Text>取款密码</Text>
                </View>
                <View style={{ height: 52, width: 317, }}>
                  <View style={{ position: 'absolute', width: '100%', height: "100%", justifyContent: 'center', borderColor: '#E2E2E2', borderWidth: 1, flexDirection: "row", }}>
                    {
                      new Array(6).fill('').map((item, index) => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderLeftWidth: index === 0 ? 0 : 1, borderLeftColor: '#E2E2E2' }}>
                          <Text>{this.state.tradePassword.substr(index, 1) && '*'}</Text>
                        </View>
                      ))
                    }
                  </View>
                  <TextInput keyboardType='numeric' autoFocus={true} caretHidden={true} maxLength={6} secureTextEntry={true} style={{ fontSize: 20, color: 'transparent' }} value={this.state.tradePassword} onChangeText={this.trade_passwordChange}></TextInput>
                </View>
                <TouchableWithoutFeedback onPress={() => { this.payClick(2) }} >
                  <LinearGradient colors={window.$globalStyle.buttonLinerBackground} style={[styles.subbutView, tradePassword.length == 6 ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
                    <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 15, fontFamily: 'PingFangSC-Medium' }}>确认转账</Text>
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

}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  accbodyView: {
    width: '100%',
    paddingLeft: 20,
    flexDirection: 'row'
  },
  leftTitleText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingTop: 12,
    height: 45,
    paddingLeft: 20,
    fontWeight: 'bold'
  },
  inputInfoView: {
    flexDirection: 'row',
    height: 45,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    fontSize: 15,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  inputTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    letterSpacing: 0,
    // width: '15%',
    // paddingLeft: 20
  },
  inputText: {
    fontSize: 15,
    textAlign: 'right',
    // width: '70%'
    flex: 1
  },
  inputImg: {
    // backgroundColor: 'blue',
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },
  butView: {
    height: 45,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 50
  },
  subbutView: {
    height: 38,
    width: '90%',
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 16
  },
  payInput: {
    fontSize: 20,
  }
})
