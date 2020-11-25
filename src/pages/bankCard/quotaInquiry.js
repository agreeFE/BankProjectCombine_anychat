import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback } from 'react-native'
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
import {formatMoney, reverseMoney} from '$/util/moneyutil'

module.exports = class QuotaInquiry extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      singleTradeAmount: 0,
      totalTradeAmount: 0
    }
  }

  render() {
    let {  singleTradeAmount, totalTradeAmount, } = this.state
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Header
          title={'限额查询'}
          leftClick={() => { router.back() }}
        ></Header>
        <View style={{flex: 1}}>
          {
            true ?
            <>
              <View style={styles.itemCon}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <Text>年度支出剩余额度</Text>
                  <Text>总限额： 5万</Text>
                </View>
                <Text style={{marginTop: 10}}>￥<Text style={{fontSize: 30}}>{formatMoney(totalTradeAmount)}</Text></Text>
              </View>
              <View style={styles.itemCon}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <Text>日支出剩余额度</Text>
                  <Text>总限额： 2千</Text>
                </View>
                <Text style={{marginTop: 10}}>￥<Text style={{fontSize: 30}}>{formatMoney(singleTradeAmount)}</Text></Text>
              </View>
            </>
            :
            <></>
          }
        </View>
       
      </View>
    )
  }

  componentDidMount() {
    let item = this.props.navigation.state.params
    NetworkUtil.networkService('/account/setting/getLimit', {cardNo: item.cardNo}, response => {
      let numberLimit = response.listInfo.filter((item) => (
        item.limitCtrlType === '1'
      ))
      let { defaultSingleTradeAmount, singleTradeAmount, totalTradeAmount, defaultTotalTradeAmount } = numberLimit[0]
      this.setState({
        singleTradeAmount,
        defaultSingleTradeAmount,
        totalTradeAmount,
        defaultTotalTradeAmount
      })
    })
  }

}
const styles = StyleSheet.create({
  itemCon: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginTop: 10
  },
  
})