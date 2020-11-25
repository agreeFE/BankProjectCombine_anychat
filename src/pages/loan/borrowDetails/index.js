import React, { Component,  } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import { NavigationEvents } from 'react-navigation';
import Header from '$/components/header'
import { CLEAR } from '../imageSource'
import scope from '@/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const {formatMoney} = require('$/util/moneyutil')

class BorrowDetails extends Component {
  constructor(props) {
    super(props);
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
    this.state = {
      isLoading: true,
      isViewContract: false,
      loanInfo: this.props.navigation.state.params.info,
      paymentInfo: []
    }
  }
  toggleContract = () => {
    this.setState({
      isViewContract: !this.state.isViewContract
    })
  }
  render() {
    const { loanInfo, paymentInfo, isLoading } = this.state
    let paymentMoney =  paymentInfo.reduce((total,item) => Number(item.repaymentAmount) + total,0)
    let paymentInterest = paymentInfo.reduce((total,item) => Number(item.interest) + total,0)
    // let paymentTotal = paymentInfo.reduce((total,item) => Number(item.total_amount) + total,0)
    let paymentRest = loanInfo.amountPaid - paymentMoney
    return (
      <>
        <NavigationEvents onWillFocus={payload => {this.getPaymentInfo()}}></NavigationEvents>
        <Header
          title={'借款详情'}
          leftClick={() => { router.back() }}
          rightClick={() => { }}
        ></Header>
        {/* 结清本金展示区 */}
        <View style={styles.settleCapital}>
          <ImageBackground source={paymentMoney == loanInfo.amountPaid ? CLEAR : 0} style={{width: 140, height: 140, position: "absolute", top: 0, right: 24, zIndex: -1}}></ImageBackground>
          <Text style={[{ textAlign: 'center' }, styles.textOne]}>剩余应还本金(元)</Text>
          {
            isLoading ? 
            <View style={{height: 55, justifyContent: "center"}}>
              <ActivityIndicator color='#777'/>
            </View>
            :
            <Text style={[{ textAlign: 'center' }, styles.textTwo]}>{formatMoney(paymentRest)}</Text>
          }
          <Text style={[{ textAlign: 'right', paddingRight: 20 }, styles.textThree]}>已结清本金(元) {formatMoney(paymentMoney)}</Text>
        </View>
        {/* 借款明细下拉区 */}

        <ScrollView style={{ flex: 1, backgroundColor: '#f6f6f6' }} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center' }}>
            {/* 借款金额 */}
            <View style={styles.wrapper}>
              {/* 标题头 */}
              <View style={styles.headerArea}>
                <Text style={styles.formaTitle}>借款明细</Text>
              </View>
              {/* 资金数据明细 */}
              <View style={styles.financialDetailArea}>
                <View>
                  <View style={styles.formatItem}>
                    <Text style={styles.formatTableTitle}>借款金额</Text>
                    <Text style={styles.formatTableTitle}>{formatMoney(loanInfo.amountPaid)}</Text>
                  </View>
                  <View style={styles.formatItem}>
                    <Text style={styles.formatTableTitle}>合同期限</Text>
                    <Text style={styles.formatTableTitle}>{this.formatDate(loanInfo.openDate)}至{this.formatDate(loanInfo.contractDeadline)}</Text>
                  </View>
                  <View style={styles.formatItem}>
                    <Text style={styles.formatTableTitle}>还款方式</Text>
                    <Text style={styles.formatTableTitle}>利随本清</Text>
                  </View>
                  <View style={styles.formatItem}>
                    <Text style={styles.formatTableTitle}>借款合同</Text>
                    <Text style={styles.viewButton} onPress={this.toggleContract}>查看</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* 还款明细 */}
            <View style={styles.wrapper}>
              {/* 标题头 */}
              <View style={styles.headerArea}>
                <Text style={styles.formaTitle}>还款明细</Text>
              </View>
              {/* 资金数据明细 */}
              <View style={styles.financialDetailArea}>
                <View>
                  <View style={styles.formatItem}>
                    <Text style={styles.formatTableTitle}>已还本金</Text>
                    <Text style={styles.formatTableTitle}>{formatMoney(paymentMoney)}</Text>
                  </View>
                  <View style={styles.formatItem}>
                    <Text style={styles.formatTableTitle}>已还利息</Text>
                    <Text style={styles.formatTableTitle}>{formatMoney(paymentInterest)}</Text>
                  </View>
                  <View style={styles.formatItem}>
                    <Text style={styles.formatTableTitle}>手续费</Text>
                    <Text style={styles.formatTableTitle}>0.00</Text>
                  </View>
                  <View style={styles.formatItem}>
                    <Text style={styles.formatTableTitle}>还款记录</Text>
                    <Text style={styles.viewButton} onPress={this.toLoanContract}>查看</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

       {
        paymentMoney == loanInfo.amountPaid ?
        <></>
        :
        <TouchableWithoutFeedback onPress={this.nextStep}>
          <LinearGradient style={styles.ensure} colors={window.$globalStyle.buttonLinerBackground}>
            <Text style={styles.ensureFont}>立即还款</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
       }

        {/* 查看贷款合同弹窗 */}
        {this.state.isViewContract ?
          <TouchableWithoutFeedback onPress={this.toggleContract}>
            <View style={styles.popUpPageBackground}>
              <View style={styles.popUpPage}>
                <TouchableWithoutFeedback onPress={() => { }}>
                  <View style={[styles.contractName, { borderBottomColor: '#F0F0F0', borderBottomWidth: 1 }]}>
                    <Text style={styles.contractFormat}>《个人消费贷款合同》</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { }}>
                  <View style={styles.contractName}>
                    <Text style={styles.contractFormat}>《个人信用报告查询授权书》</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
          : <></>}
      </>
    )
  }

  getPaymentInfo = () => {
    const { loanAccount } = this.state.loanInfo
    NetworkUtil.networkService('/account/loans/loanRepayHisInfoQuery', {loanAccount}, response => {
      setTimeout(() => {
        this.setState({
          paymentInfo: response.listInfo,
          isLoading: false
        })
      }, 300);
    }, err =>{
      setTimeout(() => {
        this.setState({
          isLoading: false
        })
      }, 300);
    })
  }

  formatDate = (item) => {
    item = item + ''
    return `${item.substr(0,4)}-${item.substr(4,2)}-${item.substr(-2)}`
  }

  toLoanContract = () => {
    const { paymentInfo } = this.state
    if(paymentInfo.length > 0) {
      router.load('repaymentRecord', { info: paymentInfo})
      return
    }
    $Toast.info('暂无还款记录')
  }

  nextStep = () => {
    const { loanInfo, paymentInfo } = this.state
    router.load('repayNow', {loanInfo, paymentInfo})
  }

}

const styles = StyleSheet.create({
  contractName: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20
  },
  contractFormat: {
    fontSize: 15,
    color: '#333333',
  },
  popUpPage: {
    width: 295,
    height: 101,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  popUpPageBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textThree: {
    fontSize: 12,
    color: '#999999',
    marginTop: 10,
  },
  textTwo: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 36,
    lineHeight: 50,
    color: $globalStyle.themeType ==='blue' ? '#293478' : '#23566E',
    // color: '#23566E',
    marginTop: 5
  },
  textOne: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 31,
  },
  settleCapital: {
    justifyContent: 'flex-start',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: 10
  },
  viewButton: {
    fontSize: 13,
    color: '#1278EF',
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4494F2',
    textAlign: 'center',
    lineHeight: 22
  },
  formatTableTitle: {
    fontSize: 15,
    color: '#666666'
  },
  formatItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10
  },
  formaTitle: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold'
  },
  headerArea: {
    height: 44,
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 1
  },
  wrapper: {
    backgroundColor: '#fff',
    width: 335,
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  ensure: {
    height: 45,
    margin: 20,
    justifyContent:"center",
    alignItems: "center",
    borderRadius: 5
  },
  ensureFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 24,
  },
})
module.exports = BorrowDetails;