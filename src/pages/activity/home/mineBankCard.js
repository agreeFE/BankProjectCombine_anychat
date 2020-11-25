import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { BoxShadow } from 'react-native-shadow'
const router = require('$/router-control');
const { formatMoney } = require('$/util/moneyutil')
import Header from '$/components/header'
import { ADD, AGREELOGO, NOCARD, BUILDLOGO } from '../imageSource'
import scope from '@/scope'
import "$/window"

const shadowOpt1 = {
  width: 335,
  height: 153,
  color: "#E3E3E3",
  border: 4,
  radius: 2,
  opacity: 0.7,
  x: 0,
  y: 0,
  style: { backgroundColor: '#fff' }
}

const shadowOpt2 = {
  width: 335,
  height: 71,
  color: "#E3E3E3",
  border: 4,
  radius: 2,
  opacity: 0.7,
  x: 0,
  y: 0,
  style: { backgroundColor: '#fff' }
}


class MineBankCard extends Component {
  constructor(props) {
    super(props)
    scope(this);
    let { cardArr } = props.navigation.state.params
    this.state = {
      productData: cardArr,
    }
    console.warn(this.state.productData, "mineBankCard的state")
  }
  render() {
    let { productData } = this.state
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <Header
          title={'我的银行卡'}
          leftClick={() => { router.back() }}
        ></Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <View>

            {
              // productData.length != 0 ?
              true ?
                <View>
                  {/* 本行卡 */}
                  <View style={{ marginTop: 16, marginLeft: 20 }}>
                    <Text style={{ fontSize: 13, color: '#666666' }}>本行卡</Text>
                  </View>
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={productData}
                    style={{ marginTop: 10 }}
                    contentContainerStyle={[{ alignItems: 'center' }]}
                    renderItem={this.ownBankBox}
                    showsVerticalScrollIndicator={false}
                  >
                  </FlatList>
                  {/* 他行卡 */}
                  <View style={{ marginTop: 16, marginLeft: 20 }}>
                    <Text style={{ fontSize: 13, color: '#666666' }}>他行卡</Text>
                  </View>
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={[1]}
                    style={{ marginTop: 10 }}
                    contentContainerStyle={[{ alignItems: 'center' }]}
                    renderItem={this.himBankBox}
                    showsVerticalScrollIndicator={false}
                  >
                  </FlatList>
                </View>
                :
                <View style={{ alignItems: 'center' }}>
                  <Image style={{ marginTop:50, width:170,height:150}} source={NOCARD}></Image>
                  <Text style={{ marginTop:15,marginBottom:30, fontSize: 16,color:'#3a3a3a'}}>没有银行卡片</Text>
                </View>
            }
            {/* 添加银行卡 */}
            <View style={{ alignItems: 'center' }}>
              <TouchableWithoutFeedback onPress={() => {router.load('bankCardManager')}}>
              <View style={styles.addBankCard}>
                <View style={styles.addBankHeader}>
                  <Image style={{ width: 15, height: 15 }} source={ADD}></Image>
                  <Text style={{ fontSize: 15, color: '#2694FF' }}>添加银行卡</Text>
                </View>
                <Text style={{ fontSize: 13, color: '#999', marginTop: 8 }}>支持多家银行</Text>
              </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

  click = (num, cardNum) => {
    switch(num) {
      case 1: 
        window.transferType = '1'
        router.load('transferInfo',{cardNum})
        break;
      case 2: 
        router.load('balance', {cardNum})
        break;
      case 3: 
        router.load('webview', {
          url: `http://${window.financialURL}/licaiProduct/financialProduct.html`
        })
        break;
    }
  }

  himBankBox = ({item, index}) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <BoxShadow setting={shadowOpt2}>
          <View style={[styles.wrapper,{height: 71,}]}>
            <View style={styles.topArea}>
              <Image style={{ width: 50, height: 50 }} source={BUILDLOGO}></Image>
              <View style={styles.textInfoStyle}>
                <Text style={{ fontSize: 16, color: '#333',fontWeight: 'bold' }}>6225********7895</Text>
                <Text style={{ fontSize: 13, color: '#999', marginTop: 4 }}>中国建设银行股份有限公司总行</Text>
              </View>
            </View>
          </View>
        </BoxShadow>
      </View>
    )
  }

  ownBankBox = ({item, index}) => {
    // console.warn('tag', item.accBal)
    item.accBal = item.accBal + ''
    let money = item.accBal.split('E')[0] * Math.pow(10,item.accBal.split('E')[1] || 0)
    // let money = item.accBal
    return (
      <View style={{ marginVertical: 10 }}>
        <BoxShadow setting={shadowOpt1}>
          <View style={styles.wrapper}>
            <View style={styles.topArea}>
              <Image style={{ width: 50, height: 35 }} source={AGREELOGO}></Image>
              <View style={styles.textInfoStyle}>
                <Text style={{ fontSize: 16, color: '#333',fontWeight: 'bold' }}>{`${item.cardNo.substr(0,4)}****${item.cardNo.substr(-4)}`}</Text>
                <Text style={{ fontSize: 13, color: '#999', marginTop: 4 }}>{item.alias}</Text>
              </View>
            </View>
            <View style={styles.middleArea}>
              <Text style={{ fontSize: 14, color: '#666', fontFamily: 'PingFangSC-Regular' }}>账面余额</Text>
              <Text style={{ fontSize: 14, color: '#666', fontFamily: 'PingFangSC-Medium' }}>人民币 <Text>{formatMoney(money)}元</Text></Text>
            </View>
            <View style={styles.bottomArea}>
              <Text style={{ fontSize: 15, color: '#333',fontWeight: 'bold' }} onPress={() => {this.click(2, item.cardNo)}}>交易明细</Text>
              <View style={styles.lineBetween}></View>
              <Text style={{ fontSize: 15, color: '#333',fontWeight: 'bold' }} onPress={() => {this.click(1, item.cardNo)}}>转账</Text>
              <View style={styles.lineBetween}></View>
              <Text style={{ fontSize: 15, color: '#333',fontWeight: 'bold' }} onPress={() => {this.click(3, item.cardNo)}}>买理财</Text>
            </View>
          </View>
        </BoxShadow>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addBankHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  },
  addBankCard: {
    width: 335,
    height: 69,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  bottomArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1
  },
  textInfoStyle: {
    marginLeft: 20
  },
  lineBetween: {
    width: 1,
    height: 20,
    backgroundColor: '#DBDBDB'
  },
  middleArea: {
    backgroundColor: '#FEF8F1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topArea: {
    flexDirection: 'row',
    height: 69,
    paddingTop: 16,
    padding: 16,
    alignItems: 'center'
  },
  wrapper: {
    width: 335,
    height: 153,
    backgroundColor: '#fff'
  }
})
module.exports = MineBankCard;