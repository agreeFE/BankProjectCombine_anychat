import React, { Component } from 'react'

import {
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  Image
} from 'react-native'
import SVG from "$/components/Svg";
import scope from '@/scope'
const router = require('$/router-control')
import Header from '$/components/header'
import { EYE_CLOSE, FUND_BG, JIAOYIJILU, SHOUYIMINGXI, EYE_SHOW } from './imageSource'
const { formatMoney } = require('$/util/moneyutil')
module.exports = class Fund extends Component {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      showMoney: true,
      money: financialFund.fund,
      earn: financialFund.fundEarn
    }
  }
  render() {
    const { showMoney,money,earn } = this.state
    return (
      <View style={styles.container}>
        <Header
          title={`我的基金`}
          leftClick={() => { router.back() }}
        // rightClick={()=> {}}
        ></Header>
        <ImageBackground source={FUND_BG} style={styles.bgImage}>
          <View style={styles.totalMoney}>
            <Text style={styles.totalMoneyFont}>总金额（元）</Text>
            <TouchableWithoutFeedback onPress={() => { this.setState({ showMoney: !showMoney }) }}>
              <View>
                <SVG source={showMoney ? EYE_SHOW : EYE_CLOSE} style={{ width: 18, height: 11, marginLeft: 4, zIndex: 11 }}></SVG>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.moneyFont}>{showMoney ? formatMoney(money) : '****'}</Text>
          <View style={styles.itemCon}>
            <View style={styles.item}>
              <Text style={styles.itemFont1}>昨日收益（元）</Text>
              <Text style={styles.itemFont2}>+{formatMoney(earn)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemFont1}>持有收益（元）</Text>
              <Text style={styles.itemFont2}>+724.10</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemFont1}>累计收益（元）</Text>
              <Text style={styles.itemFont2}>+954.34</Text>
            </View>
          </View>
        </ImageBackground>
        {/* grid */}
        <View style={styles.gridCon}>
          {
            ICONDATA.map((value, index) => (
              <TouchableWithoutFeedback onPress={() => { }} key={index}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                  {
                    index === 0 ?
                      <></>
                      :
                      <View style={{ height: 20, width: 1, backgroundColor: '#EAEBEF' }}></View>
                  }
                  <View style={[styles.gridItem]} >
                    <View style={{ width: 44, height: 44 }}>
                      <Image source={value.img} style={{ width: '100%', height: '100%' }}></Image>
                    </View>
                    <Text style={[styles.gridFont]}>{value.title}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          {/* 日月鑫货币A */}
          <View style={styles.styleItem}>
            <Text style={styles.itemTitleFont}>华安策略优选混合</Text>
            <View style={{ marginTop: 24, flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={styles.itemsTitle}>金额</Text>
                <Text style={styles.itemsFont}>{formatMoney(money/2)}</Text>
              </View>
              <View>
                <Text style={styles.itemsTitle}>昨日收益</Text>
                <Text style={[styles.itemsFont, { color: '#E93636' }]}>+{formatMoney(earn/2*3)}</Text>
              </View>
              <View>
                <Text style={styles.itemsTitle}>持有收益</Text>
                <Text style={[styles.itemsFont, { color: '#E93636' }]}>+475.56</Text>
              </View>
            </View>
          </View>
          {/* 中银黄金指数分级 */}
          <View style={styles.styleItem}>
            <Text style={styles.itemTitleFont}>天弘上证50指数A</Text>
            <View style={{ marginTop: 24, flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={styles.itemsTitle}>金额</Text>
                <Text style={styles.itemsFont}>{formatMoney(money/2)}</Text>
              </View>
              <View>
                <Text style={styles.itemsTitle}>昨日收益</Text>
                <Text style={[styles.itemsFont, { color: '#23BEAA' }]}>-{formatMoney(earn/2)}</Text>
              </View>
              <View>
                <Text style={styles.itemsTitle}>持有收益</Text>
                <Text style={[styles.itemsFont, { color: '#E93636' }]}>+248.54</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const ICONDATA = [
  {
    img: SHOUYIMINGXI,
    title: '收益明细'
  },
  {
    img: JIAOYIJILU,
    title: '交易记录'
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bgImage: {
    width: '100%',
    height: 175,
    alignItems: 'center'
  },
  totalMoney: {
    paddingTop: 30,
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
  },
  totalMoneyFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#333333',
    letterSpacing: -0.36,
    lineHeight: 21
  },
  moneyFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 30,
    color: $globalStyle.mine.textColor,
    letterSpacing: -0.72,
    lineHeight: 42,
    marginTop: 8
  },
  itemCon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemFont1: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#666666',
    letterSpacing: -0.34,
    lineHeight: 20
  },
  itemFont2: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#333',
    letterSpacing: -0.39,
    lineHeight: 22,
    marginTop: 4
  },
  gridCon: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: "row",
    backgroundColor: '#fff',
    height: 66
  },
  gridItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  gridFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    letterSpacing: 0,
    textAlign: 'right',
    lineHeight: 21,
    marginLeft: 10
  },
  styleItem: {
    width: '100%',
    height: 118,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 20,
    borderColor: 'rgba(223,223,223,0.50)',
    borderWidth: 1,
    paddingVertical: 12,
    justifyContent: "space-between"
  },
  itemTitleFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#3A3A3A',
    lineHeight: 21,
  },
  itemsTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#999999',
    lineHeight: 20
  },
  itemsFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#333',
    lineHeight: 21,
  }
})