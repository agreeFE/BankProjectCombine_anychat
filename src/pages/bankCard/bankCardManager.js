import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback,} from 'react-native'
import Header from '$/components/header'
import Pickers from '$/components/picker/pickerPro'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const RIGHTARROW = require('$image/home/my/right_arrow.png')
import {AGREELOGO} from './imageSource'

module.exports = class BankCardManager extends Component {

  constructor(props) {
    super(props)
    scope(this)
    let alias = this.props.navigation.state.params.item.alias || '消费卡'
    this.state = {
      showValue: ['消费卡', '工资卡', '还款卡','公积金卡', '医保联名卡', '公积金联名卡'],
      selectValue: [alias]
    }
  }

  render() {
    const { isOwn, item } = this.props.navigation.state.params
    const { showValue, selectValue } = this.state
    console.warn('item',selectValue, item)
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Header
          title={'银行卡管理'}
          leftClick={() => { router.back() }}
        ></Header>
        <View style={{flex: 1}}>
          {
            isOwn ?
            <>
              <View style={{flexDirection: 'row', marginTop: 10,paddingHorizontal: 20, height: 80, paddingVertical: 10, backgroundColor: '#fff'}}>
                <Image style={{width: 50, height: 35,}} source={AGREELOGO}></Image>
                <View style={{flex: 1, paddingHorizontal: 20}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', lineHeight: 24}}>{`${item.cardNo.substr(0,4)}********${item.cardNo.substr(-4)}`}</Text>
                  <Text style={{fontSize: 10, color: '#999', lineHeight: 18}}>一网通账户</Text>
                  <Text style={{fontSize: 12, color: '#00008f', lineHeight: 20}}>查看完整卡号</Text>
                </View>
              </View>
              {/* 别名  */}
              <TouchableWithoutFeedback onPress={this.showPicker}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 10}}>
                  <Text>别名</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Text style={{color:'#000'}}>{selectValue}</Text>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 转账管理 */}
              <TouchableWithoutFeedback onPress={() => {this.itemClick(1)}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 10}}>
                  <Text>转账管理</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 一网通支付 */}
              <TouchableWithoutFeedback onPress={() => {this.itemClick(2)}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 10}}>
                  <Text>一网通支付</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Text style={{color:'#000'}}>{'已开通'}</Text>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 快捷支付 */}
              <TouchableWithoutFeedback onPress={() => {this.itemClick(3)}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 1}}>
                  <Text>快捷支付</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Text style={{color:'#000'}}>{'已开通'}</Text>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 转账支付锁 */}
              <TouchableWithoutFeedback onPress={() => {this.itemClick(4)}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 1}}>
                  <Text>转账支付锁</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Text style={{color:'#000'}}>{'已开通'}</Text>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 其他支付 */}
              <TouchableWithoutFeedback onPress={() => {this.itemClick(5)}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 10}}>
                  <Text>其他支付</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 绑定银行卡 */}
              <TouchableWithoutFeedback onPress={() => {this.itemClick(6)}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 1}}>
                  <Text>绑定银行卡</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 限额查询 */}
              <TouchableWithoutFeedback onPress={() => {this.itemClick(7)}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 1}}>
                  <Text>限额查询</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              {/* 账户资料 */}
              <TouchableWithoutFeedback onPress={() => {this.itemClick(8)}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 10}}>
                  <Text>账户资料</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              <Text style={{paddingHorizontal: 20,lineHeight: 25, color: "#999"}}>包括个人姓名、身份认证、手机号码等</Text>
            </>
            :
            <>
              <TouchableWithoutFeedback onPress={this.showPicker}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 10}}>
                  <Text>别名</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Text style={{color:'#000'}}>{selectValue}</Text>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 20}}>
                <Text>一网通支付</Text>
                <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                  <Text style={{color:'#000'}}>已开通</Text>
                </View>
              </View>
              <Text style={{paddingHorizontal: 20,lineHeight: 25, color: "#999"}}>银行级的安全支付，简单便捷</Text>
              <TouchableWithoutFeedback onPress={this.showModal}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingHorizontal: 20, justifyContent: 'space-between', alignItems: "center", height: 45, marginTop: 20}}>
                  <Text>解除绑定</Text>
                    <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                      <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              
            </>
          }
          <Pickers
                ref={ref => this.picker = ref}
                pickerData={showValue}
                selectedValue={selectValue}
                onPickerConfirm={this.getValue}
              ></Pickers>
        </View>
      </View>
    )
  }

  showPicker = () => {
    this.picker.init()
  }

  getValue = (item) => {
    this.setState({selectValue: item})
  }

  showModal = () => {
    let defaultAction = [
      {
        text: '取消',
        onPress: () => {
        },
        style: 'default',
      },
      {
        text: '确定', onPress: () => {
          // console.log('解绑卡片', )
          let info = {ubcId: '52'}
          NetworkUtil.networkService('/account/bankcard/delete', info, response => {
            console.warn('tag', response)
          })
        },
      }
    ];

    $Modal.confirm('解绑卡片','您的银行卡解绑后，如果该卡片绑定了一卡通（||类）或者一网通账户， 绑定关系也将解除。',defaultAction)
  }

  itemClick = (index) => {
    const { isOwn, item } = this.props.navigation.state.params
    switch(index) {
      case 1: 
        router.load('transferSettings')
        break;
      case 6: 
        router.load('accountBindCard')
        break;
      case 7: 
        router.load('quotaInquiry', item)
        break;
    }
  }

}
const styles = StyleSheet.create({

})