import React, { Component,  } from 'react';
import { View, StyleSheet, Image, TextInput, Text, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { BoxShadow } from 'react-native-shadow'
const router = require('$/router-control');
import SVG from "$/components/Svg";
import Header from '$/components/header'
const NetworkUtil = require('$/util/networkutil');
import { CARDIMG, ERCODE } from '../../imageSource'
import scope from '@/scope'
import "$/window"
import CardPick from '$/components/cardPick'

class MineToDo extends Component {
  constructor(props) {
    super(props)
    scope(this);

    this.state = {
      cardInfoList: [],
      modalVisible: false,//支付模态场景是否可见
      pickIndex: 0, //模态框被选择的索引值
      payCard: { 'card_bank': 'XXXX', 'card_no': '0000', 'acc_bal': '0.00' },//付款卡信息
    }

  }
  render() {

    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <Header
          title={'付款码'}
          leftClick={() => { router.back() }}
          rightClick={() => { }}
        ></Header>
        <View style={styles.body}>
          <View style={{ width: "90%", flexDirection: 'column', marginTop: 35, height: 405, borderRadius: 4, marginLeft: '5%', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.8, shadowRadius: 3, elevation: 5 }}>
            <View style={{ width: '100%' }}>
              <View style={{ height: 50, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', justifyContent: 'center', marginTop: 1 }}>
                <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 18, color: '#333333', letterSpacing: 0.19, paddingLeft: 20 }}>我要付款</Text>
              </View>
              <View style={{ marginTop: 25, alignItems: 'center' }}>
                <SVG style={{ width: 180, height: 180 }} source={ERCODE}></SVG>
              </View>
              <View style={{ backgroundColor: '#F3F3F3', height: 45, marginLeft: 3, marginRight: 3, marginTop: 105, flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.cardingWrapper}>
                  <Image source={CARDIMG} style={{ width: 26, height: 18, marginBottom: 4, marginRight: 2 }}></Image>
                </View>
                <Text style={{fontFamily:'PingFangSC-Regular', fontSize: 15, color: '#3A3A3A',marginLeft:'10%' }}>{this.state.payCard.card_bank}({(this.state.payCard.card_no).substr(-4)})</Text>
                <TouchableWithoutFeedback onPress={() => { this.toggleModal() }} >
                  <Text style={{fontFamily:'PingFangSC-Regular', fontSize: 15, color: '#528FEE' ,marginLeft:'10%'}} >更换</Text>
                </TouchableWithoutFeedback>


              </View>
            </View>
          </View>
        </View>
        {/* 模态窗 */}
        <CardPick
          ref={ref => { this.cardPick = ref }}
          cardList={this.state.cardInfoList}
          selectIndex={this.state.pickIndex}
          onConfirm={this.getDateValue}
        ></CardPick>
      </View>
    )
  }

  componentWillMount(): void {
    this.getCardList()
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
        info.value = cardInfo[i].card_bank + (cardInfo[i].card_no).substr(-4)
        info.label = cardInfo[i]
        cardSelect.push(info)
      }
      const { cardNum = '' } = _this.props.navigation.state.params
      let index = cardSelect.map(item => item.label.card_no).indexOf(cardNum)
      index = index > 0 ? index : 0
      _this.setState({ isLoading: false, cardInfoList: cardSelect, pickIndex: index })
      _this.setState({ payCard: { 'card_bank': cardSelect[index].label.card_bank, 'card_no': cardSelect[index].label.card_no, 'acc_bal': cardSelect[index].label.acc_bal } })
    })
  }

  // 显示模态框
  toggleModal = () => {
    // this.cardPick.toggleModal()

    setTimeout(() => {
      this.cardPick.toggleModal()
    }, 20)
  }
  //pick选中回调
  getDateValue = ({ index, item }) => {
    let _this = this
    var payInfo = { 'card_bank': item.label.card_bank, 'card_no': item.label.card_no, 'acc_bal': item.label.acc_bal }
    _this.setState({ payCard: payInfo })

    _this.setState({ pickIndex: item.key })
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  cardingWrapper: {
    backgroundColor: '#00A4AF',
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:44
  },
})
module.exports = MineToDo;