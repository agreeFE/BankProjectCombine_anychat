import React, { PureComponent } from 'react'
import { View, ActivityIndicator, StyleSheet, Text, TouchableWithoutFeedback, ImageBackground, FlatList, RefreshControl } from 'react-native'
import Header from '$/components/header'
import SVG from "$/components/Svg";
import Pickers from '$/components/picker/pickerPro'
import CardPick from '$/components/cardPick'
import scope from '@/scope'
import { GRAYTRA, BLUETRA, SZFX, CZJY, CARD_BG, SHOPICON } from '../imageSource'
const NetworkUtil = require('$/util/networkutil')
const { getYearMouth } = require('$/util/dateutil')
const { getBankCard } = require('$/util/bankCardutil')
const { formatMoney } = require('$/util/moneyutil')
const router = require('$/router-control')
const ICONDATA = [
  {
    img: SZFX,
    title: '收支分析'
  },
  {
    img: CZJY,
    title: '查找交易'
  },
]

module.exports = class DetailHomePage extends PureComponent {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      isLoading: true, //是否在刷新
      clickLeft: false,
      clickRight: false,
      selectedDateValue: [this.setDate()[0]],
      accountPickIndex: 0,
      cardList: [{
        value: '全部账户',
        label: ''
      }],
      balanceValue: {}
    }
    const { cardNum } = props.navigation.state.params
    let reqMsg = {}
    
    reqMsg.month = getYearMouth()
    reqMsg.acctno = cardNum || '',
    // reqMsg.size = 6
    // reqMsg.current = 1
    this.getData(reqMsg)
  }
  componentDidMount() {
    getBankCard(this.setAccount)
  }

  render() {
    const { accountPickIndex, selectedDateValue, clickLeft, clickRight, balanceValue, cardList, isLoading } = this.state
    let account = cardList[accountPickIndex].value

    let [year, mon] = [new Date().getFullYear(), new Date().getMonth() + 1]
    let { month = `${year}${mon > 9 ? mon : '0' + mon}`, inc = 0, exp = 0, result = [] } = balanceValue
    return (
      <View style={{ flex: 1 }}>
        <Header title={'收支明细'} leftClick={() => { router.back() }}></Header>
        <View style={{ flex: 1, position: "relative" }}>
          {/* 选择器 */}
          <View style={styles.container}>
            {/* 年月选择 */}
            <TouchableWithoutFeedback onPress={this.leftClick}>
              <View style={styles.pick}>
                <Text style={[styles.textFont, { color: clickLeft ? '#528FEE' : '#3A3A3A' }]}>{selectedDateValue[0]}</Text>
                <SVG source={clickLeft ? BLUETRA : GRAYTRA} style={styles.triangle}></SVG>
              </View>
            </TouchableWithoutFeedback>
            {/* 账户选择 */}
            <TouchableWithoutFeedback onPress={this.rightClick}>
              <View style={styles.pick}>
                <Text style={[styles.textFont, { color: clickRight ? '#528FEE' : '#3A3A3A' }]}>{account}</Text>
                <SVG source={clickRight ? BLUETRA : GRAYTRA} style={styles.triangle}></SVG>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* 数据展示 */}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              {/* 头部 */}
              <View style={styles.topCon}>
                <View style={{ width: '100%', height: 109 }}>
                  <ImageBackground source={CARD_BG} style={{ flex: 1 }}>
                    <View style={{ flex: 1, paddingTop: 10, }}>
                      <View style={styles.text1}>
                        <View style={{ height: 21 }}>
                          <Text style={styles.text1LeftFont}>
                            <Text style={{ fontWeight: 'bold' }}>{month.substr(-2)}</Text>
                            <Text style={[styles.text1LeftFont, { color: '#0B1028', fontFamily: 'PingFangSC-Regular' }]}>
                              /
                              <Text style={{ fontSize: 13 }}>{month.substr(0, 4) || new Date().getFullYear()}</Text>
                            </Text>
                          </Text>
                        </View>
                        <View style={{ height: 21, flexDirection: 'row' }}>
                          <Text style={styles.cardFont}>余额</Text>
                          {
                            isLoading ?
                              <ActivityIndicator color="#777" size={15} />
                              :
                              <Text style={[styles.cardFont, { marginLeft: 4 }]}>¥{formatMoney(inc - exp)}</Text>
                          }
                        </View>
                      </View>
                      <View style={styles.text2}>
                        <View style={{ flex: 138, alignItems: 'flex-start' }}>
                          <Text style={[styles.cardFont, { textAlign: 'left' }]}>支出</Text>
                          {
                            isLoading ?
                              <ActivityIndicator color="#777" />
                              :
                              <Text style={[styles.text2Font, { textAlign: 'left' }]}>¥{formatMoney(exp)}</Text>
                          }
                        </View>
                        <View style={{ flex: 157, alignItems: 'flex-start' }}>
                          <Text style={[styles.cardFont, { textAlign: 'left' }]}>收入</Text>
                          {
                            isLoading ?
                              <ActivityIndicator color="#777" />
                              :
                              <Text style={[styles.text2Font, { textAlign: 'left' }]}>¥{formatMoney(inc)}</Text>
                          }
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
                <View style={styles.gridCon}>
                  {
                    ICONDATA.map((value, index) => (
                      <TouchableWithoutFeedback onPress={() => { this.handlerClick(index) }} key={index}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                          {
                            index === 0 ?
                              <></>
                              :
                              <View style={{ height: 20, width: 1, backgroundColor: '#EAEBEF' }}></View>
                          }
                          <View style={[styles.item]} >
                            <View style={{ width: 36, height: 36 }}>
                              <SVG source={value.img} style={{ width: '100%', height: '100%' }}></SVG>
                            </View>
                            <Text style={[styles.gridFont, { fontWeight: 'bold' }]}>{value.title}</Text>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    ))
                  }
                </View>
              </View>
              {/* 列表 */}
              <View style={{ flex: 1, backgroundColor: '#eee' }}>
                {
                  result.length > 0 ?
                    <FlatList
                      // style={{backgroundColor: "red"}}
                      data={result}
                      keyExtractor={(item, index) => index.toString()}
                      // showsVerticalScrollIndicator = {false}
                      renderItem={this._renderItem}
                      refreshControl={
                        <RefreshControl
                          title={'Loading'}
                          refreshing={false}
                          onRefresh={this.onRefresh}
                        />
                      }
                    ></FlatList>
                    :
                    isLoading ?
                      <View style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
                        <ActivityIndicator color="#777" />
                        <Text style={{ color: '#666', fontSize: 16, marginTop: 5 }}>一大波数据正在赶来，请稍后~</Text>
                      </View>
                      :
                      <View style={{ flex: 1, marginTop: 30, alignItems: "center" }}>
                        <SVG source={require('$image/transferAccount/noHave.svg')} style={{ width: 80, height: 80 }}></SVG>
                        <Text style={{ fontSize: 14, color: '#999', marginTop: 20 }}>暂无收支记录</Text>
                      </View>
                }
              </View>
            </View>
            {/* 时间选择 */}
            <Pickers
              ref={ref => this.picker = ref}
              pickerData={this.setDate()}
              selectedValue={selectedDateValue}
              onPickerConfirm={this.getDateValue}
              onPickerCancel={this.toggleLeftColor}
            ></Pickers>
            {/* 银行卡选择 */}
            <CardPick
              ref={ref => this.cardPicker = ref}
              cardList={cardList}
              selectIndex={accountPickIndex}
              onConfirm={this.getAccountValue}
              onCancel={() => {
                this.setState({
                  clickRight: !clickRight
                })
              }}
            ></CardPick>
          </View>
        </View>
      </View>
    )
  }

  static getDerivedStateFromProps(props, state) {
    const { cardNum } = props.navigation.state.params
    const { cardList, accountPickIndex } = state
    let index = cardList.map(item => item.label).indexOf(cardNum);
    if (index > 0 && index !== accountPickIndex) {
      return {
        accountPickIndex: index
      }
    }
    return null
  }

  handlerClick = (index) => {
    const { balanceValue, selectedDateValue, cardList, accountPickIndex } = this.state
    let info = { balanceValue, time: selectedDateValue[0], account: cardList[accountPickIndex] }
    switch (index) {
      case 0:
        router.load('paymentsAnalysis')
        break;
      case 1:
        router.load('searchTransactions', info)
        break;
    }
  }

  onRefresh = () => {
    const { accountPickIndex } = this.state
    this.startGetData(accountPickIndex)
  }

  _renderItem = ({ item, index }) => {
    return (
      <View key={index}>
        <View style={[styles.header, { marginTop: index === 0 ? 12 : 0 }]}>
          {
            false ? (
              <Text style={styles.headerFont}>昨天</Text>
            )
              :
              (
                <Text style={styles.headerFont}>{`${item.trsdt.substring(4, 6)}月${item.trsdt.substr(-2)}日`}</Text>
              )
          }
          {
            index === 0 ? (
              <Text onPress={() => { this.onRefresh() }} style={[styles.headerFont, { color: '#999999' }]}>刷新</Text>
            )
              :
              (<></>)
          }
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.itemCon}>
            <View style={{ opacity: false ? 0.6 : 1, flex: 1, flexDirection: "row" }}>
              <View style={[styles.center, { height: '100%', width: 30 }]}>
                <SVG source={SHOPICON} style={{ width: 30, height: 30 }}></SVG>
              </View>
              <View style={styles.info}>
                <View style={{ flexDirection: "row", height: 21, justifyContent: 'space-between', width: '100%' }}>
                  <Text style={[styles.itemFont, styles.titleFont, { flex: 162 }]}>{!item.opacnm ? '' : `${item.opacnm}${item.opacct.substr(-4)}`}{item.rmk}</Text>
                  {/* || item.cdflg === 'C' ? item.opacct : item.opacnm */}
                  <View style={{ height: '100%', flexDirection: "row", justifyContent: false ? "space-between" : 'flex-end', width: 125 }}>
                    {
                      false ?
                        (<View style={[styles.extra, styles.center]}>
                          <Text style={[styles.itemFont, styles.extraFont]}>未入账</Text>
                        </View>)
                        :
                        (<></>)
                    }
                    <Text style={[styles.itemFont, styles.titleFont, { color: item.cdflg === 'C' ? '#528FEE' : '#DE3131', }]}>{item.cdflg === 'C' ? '+' : '-'} ¥{item.cdflg === 'C' ? formatMoney(item.cramt) : formatMoney(item.dbamt)}</Text>
                  </View>
                </View>
                {/* {item.cdflg === 'C'? '转账给自己' : '转账给他人'}    */}
                <Text style={[styles.itemFont, { marginTop: 4 }]}>银行卡{item.acctno.substr(-4)} {item.trstm.substr(0, 2) + ':' + item.trstm.substr(2, 2) + ':' + item.trstm.substr(-2)}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  getDateValue = (item) => {
    const { accountPickIndex } = this.state
    this.toggleLeftColor()
    this.setState({
      selectedDateValue: item
    })
    this.startGetData(accountPickIndex)
  }
  toggleLeftColor = () => {
    const { clickLeft } = this.state
    this.setState({
      clickLeft: !clickLeft
    })
    if (clickLeft) {
      this.picker.hide()
      return
    }
    this.picker.init()
  }

  toggleRightColor = () => {
    const { clickRight } = this.state
    this.setState({
      clickRight: !clickRight
    })
    this.cardPicker.toggleModal()
  }


  getAccountValue = ({ index, item }) => {
    this.toggleRightColor()
    this.setState({
      accountPickIndex: index
    })
    this.startGetData(index)
  }

  startGetData = (cardIndex) => {
    let month = this.state.selectedDateValue[0]
    let info = {}
    info.month = month.substr(0, 4) + month.substr(5, 2)
    info.acctno = this.state.cardList[cardIndex].label
    // info.size = '6'
    // info.current = '1'
    this.getData(info)
  }

  leftClick = () => {
    const { clickRight } = this.state
    if (clickRight) {
      this.toggleRightColor()
    }
    this.toggleLeftColor()

  }

  rightClick = () => {
    const { clickLeft } = this.state
    if (clickLeft) {
      this.toggleLeftColor()
    }
    this.toggleRightColor()
  }

  // account/bill/list
  getData = (info) => {
    let _this = this
    this.setState({
      isLoading: true
    })
    // console.warn('tag1', info)
    NetworkUtil.networkService('/account/bill/list', info, response => {
      // console.warn('tag', response)
      _this.setState({
        isLoading: false,
        balanceValue: response
      })
    })
  }

  setDate = () => {
    let [year, month] = [new Date().getFullYear(), new Date().getMonth() + 1]
    let date = []
    for (let i = 0; i < 6; i++) {
      if (month < 0) {
        month = 12;
        --year
      }
      date.push(`${year}年${month > 9 ? month : '0' + month}月`)
      // date.push({value: `${year}年${month > 9 ? month : '0' + month}月`, label: `${year}${month > 9 ? month : '0' + month}`})
      month--
    }
    return date
  }

  setAccount = (cardArr) => {
    const { cardList } = this.state
    cardArr.map((item) => {
      cardList.push({ value: `账户${item.cardNo.substr(-4)}`, label: item.cardNo })
    })
    this.setState({
      cardList
    })
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pick: {
    flexDirection: "row",
    alignItems: "center"
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    letterSpacing: 0.2,
    lineHeight: 21,
    textAlign: 'center'
  },
  triangle: {
    marginLeft: 10,
    width: 12,
    height: 7
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 45
  },
  topCon: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 4
  },
  font: {
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 20,
    fontSize: 15,
    color: '#999',
    fontFamily: 'PingFangSC-Regular',
  },
  gridCon: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: "row",
    backgroundColor: '#fff',
    height: 66
  },
  item: {
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
  text1: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 21
  },
  cardFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#3A3A3A',
    letterSpacing: 0,
    textAlign: 'right',
    lineHeight: 18
  },
  text1LeftFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: $globalStyle.mine.textColor,
    letterSpacing: 0,
    textAlign: 'right',
    lineHeight: 21
  },
  text2: {
    width: '100%',
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  text2Font: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    textAlign: 'right',
    lineHeight: 22,
    marginTop: 2,
    fontWeight: 'bold'
  },
  itemCon: {
    width: "100%",
    height: 59,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 24,
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    flex: 1,
    paddingLeft: 14,
    paddingBottom: 8,
    paddingTop: 8,
  },
  itemFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    letterSpacing: 0,
    textAlign: 'left',
    lineHeight: 18
  },
  titleFont: {
    color: '#3A3A3A',
    fontSize: 15,
    lineHeight: 21,
  },
  extra: {
    width: 48,
    height: 18,
    borderColor: '#EB8D15',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 2,
    borderStyle: 'solid'
  },
  extraFont: {
    color: '#EB8D15',
    fontSize: 12,
    lineHeight: 17,
  },
  header: {
    width: '100%',
    height: 28,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  headerFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#3A3A3A',
    letterSpacing: 0,
    textAlign: 'right',
    lineHeight: 20
  }
})