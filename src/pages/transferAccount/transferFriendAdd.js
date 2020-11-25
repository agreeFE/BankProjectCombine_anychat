import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback,ScrollView, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, RIGHTARROW, TONGXUNLU } from './imageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
import LinearGradient from 'react-native-linear-gradient'
import SVG from "$/components/Svg";

module.exports = class transferFriendAdd extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    const { type, data } = this.props.navigation.state.params
    let add = type === 'add'
    this.state = {
      payeeName: add ? '' : data.payeeName,//收款人户名
      payeeCardNo: add ? '' : data.payeeCardNo.replace(/....(?!$)/g, '$& '),//收款人银行卡账号
      payeeCardBank: add ? '' : data.payeeCardBank,//卡号归属银行
      openCardPlace: add ? '' : data.openCardPlace,//开户地
      branchBank: add ? '' : data.branchBank,//分支行
      payeePhone: add ? '': data.payeePhone,//收款人手机号
      aliasName: add ? '' : data.aliasName,//别名(5个汉字以内)
    };
    // this.payeeName = this.payee_nameChange.bind(this);
    // this.payeeCardNo = this.payee_card_noChange.bind(this);
    // this.payeeCardBank = this.payee_card_bankChange.bind(this);
    // this.openCardPlace = this.open_card_placeChange.bind(this);
    // this.branchBank = this.branch_bankChange.bind(this);
    // this.payeePhone = this.payee_phoneChange.bind(this);
    // this.aliasName = this.alias_nameChange.bind(this);
  }
  back = () => {
    router.back()
  }
  payee_nameChange= (text) =>  {
    this.setState({ payeeName: text })
  }
  payee_card_noChange= (event) => {
    const { text } = event.nativeEvent
    this.setState({ payeeCardNo: text.replace(/\D/g,'').replace(/....(?!$)/g,'$& '), })
    if(this.state.payeeCardNo.length>= 6){
      this.setState({ payeeCardBank: '赞同科技' })
      this.setState({ openCardPlace: '北京' })
      this.setState({ branchBank: '来广营支行' })
    }else{
      this.setState({ payeeCardBank: '' })
      this.setState({ openCardPlace: '' })
      this.setState({ branchBank: '' })
    }
  }
  payee_card_bankChange= (text) => {
    this.setState({ payeeCardBank: text })
  }
  open_card_placeChange= (text) => {
    this.setState({ openCardPlace: text })
  }
  branch_bankChange= (text) => {
    this.setState({ branchBank: text })
  }
  payee_phoneChange= (text) =>  {
    this.setState({ payeePhone: text }) 
  }
  alias_nameChange= (text) => {
    this.setState({ aliasName: text })
  }
  //提交新增
  submitData() {
    const { type, data } = this.props.navigation.state.params
    let add = type === 'add'
    var info = this.state
    info.payeeCardNo = info.payeeCardNo.replace(/[^\d]+/g, '')
    let _this = this
    let { payeeName, payeeCardNo, payeePhone, openCardPlace, branchBank, aliasName} = this.state
    if(!payeeName) {
      $Toast.info('请输入收款人户名')
      return
    }
    if(!payeeCardNo) {
      $Toast.info('请输入银行卡号')
      return
    }
    payeeCardNo = payeeCardNo.replace(/[^\d]+/g, '')
    let pattern = /^([1-9]{1})(\d{14}|\d{18})$/
    if (!pattern.test(payeeCardNo)) {
      $Toast.info('银行卡号输入有误！')
      return
    }
    if(!payeePhone) {
      $Toast.info('请输入对方手机号')
      return
    }
    if(!aliasName) {
      $Toast.info('请输入别名（5个汉字以内）')
      return
    }
    if(aliasName.length > 5) {
      $Toast.info('别名过长（5个汉字以内）')
      return
    }
    if(add) {
      NetworkUtil.networkService('/account/payee/add', info, function (response) {
        $Toast.success('增加成功！')
        let timer = setTimeout(() => {
          router.back()
          clearTimeout(timer)
        },500)
      })
    } else {
      if(aliasName === data.aliasName && payeePhone === data.payeePhone && data.openCardPlace === openCardPlace && data.branchBank === branchBank) {
        $Toast.info('请编辑相关信息')
        return
      }
      let info2 = {upId: data.upId, aliasName, openCardPlace, branchBank, payeePhone} 
      NetworkUtil.networkService('/account/payee/edit', info2, function (response) {
        $Toast.success('编辑成功！')
        let timer = setTimeout(() => {
          router.back()
          clearTimeout(timer)
        },500)
      })
    }
    

  }
  render() {
    const { payeeName, payeeCardNo, payeePhone, aliasName} = this.state
    const { type, data } = this.props.navigation.state.params
    let add = type === 'add'
    let noOpacity = !!payeeName && !!payeeCardNo && !!payeePhone && !!aliasName
    return (
      <>
        <Header
          title={`${add ? '添加': '编辑'}转账伙伴`}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <KeyboardAvoidingView  style={styles.body} behavior="absolute" enabled>
          <ScrollView keyboardShouldPersistTaps={'always'}>
          <View style={{ backgroundColor: '#FFFFFF', height: 322 }}>
            <View style={styles.inputInfoView}>
              <Text style={styles.inputTitle}>户名</Text>
              <TextInput editable={add} placeholder='请输入收款人户名' maxLength={10} style={styles.inputText} value={this.state.payeeName} onChangeText={this.payee_nameChange}></TextInput>
            </View>
            <View style={styles.inputInfoView}>
              <Text style={styles.inputTitle}>账号</Text>
              <TextInput editable={add} placeholder='请输入银行卡号' maxLength={23} keyboardType="numeric" style={styles.inputText} value={this.state.payeeCardNo} onChange={this.payee_card_noChange}></TextInput>
            </View>
            <View style={styles.inputInfoView}>
              <Text style={styles.inputTitle}>银行</Text>
              <TextInput placeholder='选择银行' editable={false} style={[styles.inputText, { width: '65%', color: add? '#000': '' }]} value={this.state.payeeCardBank} onChangeText={this.payee_card_bankChange}></TextInput>
              <SVG style={styles.inputImg} source={RIGHTARROW} />
            </View>
            <View style={styles.inputInfoView}>
              <Text style={styles.inputTitle}>开户地</Text>
              <TextInput placeholder='可不选' editable={false} style={[styles.inputText, { width: '65%', color: '#000' }]} value={this.state.openCardPlace} onChangeText={this.open_card_placeChange}></TextInput>
              <SVG style={styles.inputImg} source={RIGHTARROW} />
            </View>
            <View style={styles.inputInfoView}>
              <Text style={styles.inputTitle}>分支行</Text>
              <TextInput placeholder='可不选' editable={false} style={[styles.inputText, { width: '65%', color: '#000' }]} value={this.state.branchBank} onChangeText={this.branch_bankChange}></TextInput>
              <SVG style={styles.inputImg} source={RIGHTARROW} />
            </View>
            <View style={styles.inputInfoView}>
              <Text style={styles.inputTitle}>短信通知</Text>
              <TextInput placeholder='请输入对方手机号' maxLength={11} keyboardType="numeric" style={[styles.inputText, { width: '65%' }]} value={this.state.payeePhone} onChangeText={this.payee_phoneChange}></TextInput>
              <SVG style={styles.inputImg} source={TONGXUNLU} />
            </View>
            <View style={styles.inputInfoView}>
              <Text style={styles.inputTitle}>别名</Text>
              <TextInput placeholder='5个汉字以内'  maxLength={5} style={styles.inputText} value={this.state.aliasName} onChangeText={this.alias_nameChange}></TextInput>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => { this.submitData() }} >
            <LinearGradient colors={$globalStyle.buttonLinerBackground} style={[styles.butView, noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
              <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 17, fontFamily: 'PingFangSC-Medium' }}>确定</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </ScrollView>
        </KeyboardAvoidingView>
      </>
    )
  }
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    flex: 1
  },
  inputInfoView: {
    flexDirection: 'row',
    height: 46,
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
    width: '25%',
    paddingLeft: 20
  },
  inputText: {
    fontSize: 15,
    textAlign: 'right',
    width: '70%',
    // color: '#000'
  },
  inputImg: {
    width: '5%',
    height: '40%',

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
})
