import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Header from '$/components/header'
import scope from '$/scope'
import SVG from "$/components/Svg";

const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const {formatMoney} = require('$/util/moneyutil');

module.exports = class LoanConfrim extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      agree: true
    }
  }

  render() {
    const { agree } = this.state
    const { loanAmount, accountNo, dayRate, dateDue, LoanPurpose,
      modeOfRepayment, contactName, telephone
    } = this.props.navigation.state.params
    return (
      <View>
         <Header
          title={'确认信息'}
          leftClick={this.back}
        ></Header>
        <ScrollView>
          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.title}>借款信息</Text>
            <View style={styles.showItem}>
              <Text style={styles.showItemTitle}>贷款金额</Text>
              <Text>￥ {formatMoney(loanAmount)}</Text>
            </View>
            <View style={styles.showItem}>
              <Text style={styles.showItemTitle}>到期日</Text>
              <Text>{dateDue.substr(0,4) + '-' + dateDue.substr(4,2) + '-' + dateDue.substr(-2)}</Text>
            </View>
            <View style={styles.showItem}>
              <Text style={styles.showItemTitle}>贷款用途</Text>
              <Text>{LoanPurpose}</Text>
            </View>
            <View style={[styles.showItem,{borderBottomWidth: 1, borderBottomColor: '#eee'}]}>
              <Text style={styles.showItemTitle}>日利率</Text>
              <Text>{`${(dayRate/100)}%`}</Text>
            </View>
            <Text style={styles.title}>还款信息</Text>
            <View style={styles.showItem}>
              <Text style={styles.showItemTitle}>还款方式</Text>
              <Text>{modeOfRepayment}</Text>
            </View>
            <View style={styles.showItem}>
              <Text style={styles.showItemTitle}>还款账号</Text>
              <Text>{`${accountNo.substr(0,4)}****${accountNo.substr(-4)}`}</Text>
            </View>
          </View>
          <Text style={{ paddingHorizontal: 20, color: $globalStyle.reservation.textColor, fontSize: 14, paddingTop: 10 }}>
            根据监管规定,消费贷款只能用于消费或经营用途,不可用于购买理财,股票,房产等风险投资,请合理规划贷款用途,尽享美好生活。
          </Text>
          <View style={{paddingHorizontal: 20, marginTop: 20, flexDirection: "row"}}>
            <TouchableWithoutFeedback onPress={this.ensure}> 
            <View style={{width: 24, height: 24, justifyContent: "center", alignItems: "center", marginRight: 5}}>
              <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: $globalStyle.chosenColor, backgroundColor: agree? $globalStyle.chosenColor : 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                <SVG source={agree ? require('$image/transferAccount/check.svg') : ''} style={{width: 20, height: 10}}></SVG>
              </View>
            </View>
            </TouchableWithoutFeedback>
            <View style={{flex: 1}}>
              <Text style={styles.agreeFont}>
                本人已阅读并同意签署
                <Text style={styles.agreeFont1} onPress={()=>{this.show(1)}}>《额度借款合同》</Text>
                <Text style={styles.agreeFont1} onPress={()=>{this.show(2)}}>《资信数据(含个人征信)查询授权书》</Text>
              </Text>
            </View>
           
          </View>

          <TouchableWithoutFeedback onPress={()=>{this.next()}}>
            <LinearGradient colors={$globalStyle.buttonLinerBackground} style={[styles.butView,agree ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
              <Text style={{color:"#FFFFFF",textAlign:'center',fontSize:17,fontFamily:'PingFangSC-Medium'}}>提交申请</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </ScrollView>
       
      </View>
    )
  }
  // 同意协议
  ensure = () => {
    const { agree } = this.state
    this.setState({
      agree: !agree
    })
  }

  show = (num) => {
    if(num ===1 ){
      return
    }
  }

  //下一步
  next = () => {
    const { agree } = this.state
    if(!agree) {
      $Toast.info('请同意协议')
      return
    }
    let info = this.props.navigation.state.params
    // console.warn('tag', info)
    NetworkUtil.networkService('/account/loans/loanQuotaIssue',info,response => {
    
      router.load('buyResult')
    },
    err => {
      $Toast.info('贷款申请失败')
      router.load('homeScrollable')
      console.warn('err', err)
    }
    )
  }

  back = () => {
    router.back()
  }

}
const styles = StyleSheet.create({
  butView: {
    height: 45,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 100
  },
  showItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    height: 50
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10
  },
  showItemTitle: {
    color: '#999'
  },
  showItemText: {

  },
  agreeFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#333333',
    lineHeight: 18
  },
  agreeFont1: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#f4be7a',
    lineHeight: 18
  },
})