import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback,FlatList, ScrollView } from 'react-native'
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
import {ADD, BUILDLOGO} from './imageSource'

module.exports = class AccountBindCard extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {}
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Header
          title={'账户绑卡'}
          leftClick={() => { router.back() }}
        ></Header>
        <ScrollView  contentContainerStyle={{ alignItems: 'center'}}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={[1]}
            renderItem={this.himBankBox}
            showsVerticalScrollIndicator={false}
          ></FlatList>
          <TouchableWithoutFeedback onPress={() => {router.load('addBankCard')}}>
            <View style={styles.addBankCard}>
              <View style={styles.addBankHeader}>
                <Image style={{ width: 15, height: 15 }} source={ADD}></Image>
                <Text style={{ fontSize: 15, color: '#2694FF' }}>添加银行卡</Text>
              </View>
              <Text style={{ fontSize: 13, color: '#999', marginTop: 8 }}>支持多家银行</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView >
      </View>
    )
  }

  himBankBox = ({item,index}) => {
    return (
      <View style={{ marginVertical: 10 }}>
          <View style={[styles.wrapper]}>
              <Image style={{ width: 50, height: 50 }} source={BUILDLOGO}></Image>
              <View style={{marginLeft: 20}}>
                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>中国建设银行</Text>
                <Text style={{ fontSize: 13, marginTop: 4, color: '#999', }}>储蓄卡</Text>
                <Text style={{ fontSize: 16, color: '#333', }}>6225********7895</Text>
              </View>
          </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
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
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  wrapper: {
    width: 335,
    height: 80,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff'
  },
})