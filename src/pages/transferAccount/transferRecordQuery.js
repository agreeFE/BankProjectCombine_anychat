import React, { Component,  } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, FlatList, Text, TextInput, DatePickerAndroid, TouchableWithoutFeedback, Picker, Animated } from 'react-native';
const router = require('$/router-control');
import Header from '$/components/header'
const NetworkUtil = require('$/util/networkutil');
import { DROPDOWN, DROPUP, SEARCH2, NOHAVE, BLUETRA, GRAYTRA } from './imageSource'
import TransferDataList from './transferDataList'
import CardPick from '$/components/cardPick'
import scope from '@/scope'
const { getBankCard } = require('$/util/bankCardutil');
import SVG from "$/components/Svg";


class transferRecordQuery extends Component {
  constructor(props) {
    super(props)
    scope(this);
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    const today = "" + year + month + day
    this.state = {
      isLoading: true,
      userDefineDate: false, //显示自定义日期选择模态框
      showModalMonth: false, //显示月份选择模态框
      dealTime: 1, //交易时间
      curDealTime: "当天",//当前交易时间文本
      dealWrapperHeight: new Animated.Value(0), //动画的高度值
      today, //今日日期
      year,
      month,
      day,
      startDate: today, //起始日期
      endDate: today, //结束日期
      cardNum: '6225880001000220863', //卡号
      transferData: [], //转账记录
      allTransferData: [], //所有未分类的转账记录
      cardList: [], // 卡片列表
      selectCardIndex: 0, // 选择的索引
      leftHigh: false,
    }
    // this.getCardList()

  }
  componentDidMount() {
    getBankCard(this.getCardList)
  }
  // react性能优化函数
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.text !== this.state.text) {
      return false
    }
    return true
  }
  // 模态弹出框的显隐
  showModal = (index) => {
    if (index == 1) {
      this.setState({
        showModalMonth: false,
      })
      this.toggleCard()
      this.cardPick.toggleModal()
    }
    if (index == 2) {
      this.state.dealWrapperHeight.setValue(0)
      this.setState({
        showModalMonth: !this.state.showModalMonth,
      })
      Animated.timing(                  // 随时间变化而执行动画
        this.state.dealWrapperHeight,            // 动画中的变量值
        {
          toValue: 182,                   // 透明度最终变为1，即完全不透明
          duration: 400,              // 让动画持续一段时间
        }
      ).start();
    }
  }
  showModalDate = async (index) => {
    const { year: curYear, month: curMonth, day: curDay, startDate, endDate } = this.state
    let date = index == 1 ? startDate : endDate
    const { action, year, month, day } = await DatePickerAndroid.open({
      // 要设置默认值为今天的话，使用`new Date()`即可。
      // 下面显示的会是2020年5月25日。月份是从0开始算的。
      date: new Date(date.substr(0, 4), date.substr(4, 2) - 1, date.substr(6, 2)),
      mode: 'spinner'
    });
    // 安卓处理日期
    if (action !== DatePickerAndroid.dismissedAction) {
      // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
      if (index == 1) {
        let dealMonth = month + 1 < 10 ? "0" + (month + 1) : month + 1
        let dealDay = day < 10 ? "0" + day : day
        this.setState({
          startDate: "" + year + dealMonth + dealDay
        })
      }
      if (index == 2) {
        let dealMonth = month + 1 < 10 ? "0" + (month + 1) : month + 1
        let dealDay = day < 10 ? "0" + day : day
        this.setState({
          endDate: "" + year + dealMonth + dealDay
        })
      }
    }
    // this.setState({
    //   userDefineDate: true
    // })
  }
  // 选择交易时间
  chooseDealTime = (index) => {
    let { today, year, month, day, startDate, endDate } = this.state;
    let tranStartDate, tranEndDate, curDealTime;
    switch (index) {
      case 1:
        tranStartDate = tranEndDate = today;
        curDealTime = "当天"
        break
      case 2:
        tranStartDate = "" + year + month + "01";
        tranEndDate = today
        curDealTime = "本月"
        break
      case 3:
        tranStartDate = year + "0" + (month - 3) + day;
        tranEndDate = today
        curDealTime = "最近3个月"
        break
      case 4:
        tranStartDate = year + "0" + (month - 6) + day;
        tranEndDate = today
        curDealTime = "最近半年"
        break
      default:
        tranStartDate = tranEndDate = today;
    }
    this.getTransferRecord(tranStartDate, tranEndDate)
    this.setState({
      dealTime: index,
      startDate: tranStartDate,
      endDate: tranEndDate,
      curDealTime
    })
  }
  // 转账记录查询接口
  getTransferRecord = (startDate, endDate) => {
    let { cardNum, cardList, selectCardIndex } = this.state
    const _this = this;
    let data = {
      payerCardNo: cardList[selectCardIndex] && cardList[selectCardIndex].cardNo,
      startTime: parseInt(startDate),
      endTime: parseInt(endDate),
      pageSize: "20",
      startRow: '0'
    }
    NetworkUtil.networkService('/account/transfer/record', data, function (response) {
      // console.warn('response', response.list_info)
      let transferDataArr = []
      let list_info = response.listInfo
      let allTransferData = []
      for (let k in response.listInfo) {
        // console.warn('tag', list_info[k])
        for(let j in list_info[k]) {
          // console.warn('j', list_info[k][j])
          allTransferData.push(...list_info[k][j])
        }
        let obj = {}, obj1 = {}
        Object.keys(response.listInfo[k]).map(item => item + '月').sort().reverse().forEach(item => {
          obj1[item] = response.listInfo[k][item.replace(/[^\d]+/g, '')]
        })
        obj[k] = obj1
        console.warn('keys', Object.keys(response.listInfo[k]), obj1)
        transferDataArr.push(obj)
      }
      // console.warn('transferDataArr',transferDataArr)
      // let obj = {a: 1, c: 2, b: 3}, obj1 = {}
      // Object.keys(obj).sort((a,b)=> b-a).forEach(item => {
      //   obj1[item] = obj[item]
      // })
      _this.setState({
        transferData: transferDataArr,
        allTransferData,
        showModalMonth: false,
      })
    })
  }
  // 打开卡片选择框的方法
  toggleCard = () => {
    const { leftHigh } = this.state
    this.setState({
      leftHigh: !leftHigh
    })
  }
  // 选择卡片函数
  chosenCard = ({ index, item }) => {
    let { startDate, endDate } = this.state
    this.setState({
      selectCardIndex: index,
      cardNum: item.cardNo
    },
      () => {
        this.getTransferRecord(startDate, endDate)
      })
  }
  // 卡片列表查询接口
   getCardList = (cardArr) => {
    let { cardList,today } = this.state
    // account/bankcard/list
    cardArr.map((item) => {
      cardList.push({ value: `${item.cardBank}（${item.cardNo.substr(-4)}）`, cardNo: item.cardNo })
    })
    this.setState({
      cardList,
      isLoading: false
    },()=>{
      this.getTransferRecord(today, today)
    })
  }
  // 返回上一步
  back = () => {
    router.back()
  }

  _onSubmitEditing = (e) => {
    const { text } = e.nativeEvent
    let { transferData, allTransferData } = this.state
    let reg = new RegExp( `${text}`)
    let fliterData = allTransferData.filter(item => reg.test(item.otherAccountName) || reg.test(item.otherAccountNo))
    let arr= [], arr1 = [], arr2 = []
    fliterData.forEach(item => {
      arr1.push(item.tradeDate.substr(0,4))
      arr2.push(item.tradeDate.substr(4,2) + '月')
    })
    arr1 = Array.from(new Set(arr1))
    arr2 = Array.from(new Set(arr2))
    arr1 = arr1.sort().reverse()
    arr2 = arr2.sort().reverse()
    for(let i = 0, year; year = arr1[i++]; ) {
      let obj = {}, obj1 = {}
      obj[year] = {}
      for(let j = 0, month; month = arr2[j++];) {
        let data = fliterData.filter(item => item.tradeDate.substr(0,4) == year && item.tradeDate.substr(4,2) == month.replace(/[^\d]+/g, ''))
        if(data.length > 0) {
          obj[year][month] = data
        }
      }
      arr.push(obj)
    }
    this.setState({
      transferData: arr
    })
  }



  render() {
    let { showModalMonth, isLoading, leftHigh, selectCardIndex, cardList, dealTime, transferData, dealWrapperHeight, today, startDate, endDate, curDealTime } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        {/* 标题栏 */}
        <Header
          title={'转账记录查询'}
          leftClick={this.back}
        ></Header>
        {/* 内容区 */}
        <View style={[styles.content]}>
          {/* 顶部选择栏 */}
          <View style={styles.topChooseBar}>
            <TouchableWithoutFeedback onPress={() => { this.showModal(1) }}>
              <View style={[styles.dropDown]}>
                { 
                  isLoading ? 
                  <ActivityIndicator color="#777" />
                  :
                  <Text style={{ lineHeight: 16, color: leftHigh ? '#528FEE' : '#3A3A3A' }}>{cardList[selectCardIndex] && cardList[selectCardIndex].value}</Text>
                }
                {/* <Image source={leftHigh ? DROPUP : DROPDOWN} style={{ marginLeft: 5 }}></Image> */}
                <SVG source={leftHigh ? BLUETRA : GRAYTRA} style={{ marginLeft: 10,width: 12,height: 7}}></SVG>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { this.showModal(2) }}>
              <View style={[styles.dropDown]}>
                <Text style={{ lineHeight: 16, color: showModalMonth ? '#528FEE' : '#3A3A3A' }}>{curDealTime}</Text>
                {/* <Image source={showModalMonth ? DROPUP : DROPDOWN} style={{ marginLeft: 5 }}></Image> */}
                <SVG source={showModalMonth ? BLUETRA : GRAYTRA} style={{ marginLeft: 10,width: 12,height: 7}}></SVG>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* 中间输入框 */}

          <View style={styles.middleInput}>
            {/* <Image source={SEARCH2}></Image> */}
            <Image source={require('$image/search/searchBlack.png')} style={{width: 15, height: 15}}></Image>
            <TextInput
              underlineColorAndroid='transparent'
              autoFocus={false}
              placeholder='输入姓名/卡号/手机号'
              placeholderTextColor='#999'
              selectionColor='#ff4f39'
              keyboardType='numeric'
              style={{ fontSize: 14, paddingVertical: 3, marginLeft: 3, flex: 1 }}
              onChangeText={(text) => this.setState({ text })}
              onSubmitEditing={this._onSubmitEditing}
            />
          </View>
          {/* 下部说明区  */}
          <View style={styles.bottomIntro}>
            {transferData.length == 0 ?
              <View style={{ alignItems: 'center' }}>
                <SVG source={NOHAVE} style={styles.noHave}></SVG>
                <Text style={{ fontSize: 14, color: '#999', marginTop: 20 }}>没有转账记录，换个条件试试</Text>
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={{ fontSize: 13, color: '#999', marginTop: 48 }}>说明:</Text>
                  <Text style={{ fontSize: 13, color: '#999', marginTop: 8 }}>1、您可以选择一卡通、交易时间、查询该卡在某一时间段内的自助转账记录。</Text>
                  <Text style={{ fontSize: 13, color: '#999', marginTop: 4 }}>2、此功能仅支持查询距今10个月内的转账记录，如需查询10个月之前的转账记录，请本人带一卡通、开户证件到任一网点柜台申请。</Text>
                </View>
              </View>
              :
              <View style={{ alignItems: 'center', width: '100%' }}>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={transferData}
                  style={{ backgroundColor: '#fff', width: '100%' }}
                  // contentContainerStyle={}
                  renderItem={({ item, index }) => <TransferDataList item={item} index={index}></TransferDataList>}
                  showsVerticalScrollIndicator={false}
                >
                </FlatList>
              </View>}
          </View>
          {/* 月份选择弹框 */}
          {
            showModalMonth ?
              <View style={styles.container}>
                <Animated.View style={[styles.dealWrapper, { height: dealWrapperHeight }]}>
                  <View style={{ height: 182 }}>
                    <View style={[styles.chooseBox, { borderBottomColor: '#F0F0F0', borderBottomWidth: 1 }]}>
                      <Text style={styles.toastTitle}>交易时间</Text>
                      <View style={styles.chooseItem}>
                        <Text style={[styles.textItem, dealTime == 1 ? styles.active : '']} onPress={() => { this.chooseDealTime(1) }}>当天</Text>
                        <Text style={[styles.textItem, dealTime == 2 ? styles.active : '']} onPress={() => { this.chooseDealTime(2) }}>本月</Text>
                        <Text style={[styles.textItem, dealTime == 3 ? styles.active : '']} onPress={() => { this.chooseDealTime(3) }}>最近3个月</Text>
                        <Text style={[styles.textItem, dealTime == 4 ? styles.active : '']} onPress={() => { this.chooseDealTime(4) }}>最近半年</Text>
                      </View>
                    </View>
                    <View style={styles.chooseBox}>
                      <Text style={styles.toastTitle}>自定义</Text>
                      <View style={styles.chooseItem}>
                        <TouchableWithoutFeedback onPress={() => { this.showModalDate(1) }}>
                          <View style={styles.chooseDateBox}>
                            <Text>{startDate}</Text>
                            <Image source={DROPDOWN} style={{ marginLeft: 5, width: 8, height: 5 }}></Image>
                          </View>
                        </TouchableWithoutFeedback>
                        <Text style={{ fontSize: 13, color: '#999' }}>至</Text>
                        <TouchableWithoutFeedback onPress={() => { this.showModalDate(2) }}>
                          <View style={styles.chooseDateBox}>
                            <Text>{endDate}</Text>
                            <Image source={DROPDOWN} style={{ marginLeft: 5, width: 8, height: 5 }}></Image>
                          </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.chooseDateConfirm} onPress={() => { this.getTransferRecord(startDate, endDate) }}>确定</Text>
                      </View>
                    </View>
                  </View>

                </Animated.View>
                <View style={styles.monthToast}></View>
              </View>
              :
              <></>
          }
          {/* 卡片选择弹框 */}
          <CardPick
            ref={ref => { this.cardPick = ref }}
            cardList={cardList}
            selectIndex={selectCardIndex}
            onConfirm={this.chosenCard}
            onCancel={this.toggleCard}
          ></CardPick>
          {/* 自定义日期选择框 */}
          {/* {
            userDefineDate ?
              :
              <></>
          } */}
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  transferBoxLeft: {

  },
  chooseDateConfirm: {
    width: 80,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderColor: '#528FEE',
    borderWidth: 1,
    color: '#528FEE',
    backgroundColor: '#fff',
    borderRadius: 4
  },
  chooseDateBox: {
    width: 105,
    height: 30,
    backgroundColor: '#f2f2f2',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  active: {
    backgroundColor: $globalStyle.transfer.queryColor,
    borderRadius: 4,
    color: '#fff',
    borderColor: $globalStyle.transfer.queryColor,
    borderWidth: 1,
    borderRadius: 4,
  },
  textItem: {
    width: 74,
    height: 32,
    textAlign: 'center',
    lineHeight: 30,
    borderColor: $globalStyle.transfer.queryBorder,
    borderWidth: 1,
    borderRadius: 4,
    color: '#3a3a3a',
  },
  chooseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center'
  },
  chooseBox: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    flex: 1,
  },
  toastTitle: {
    fontSize: 16,
    color: '#3a3a3a',
    marginTop: 12,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    marginTop: 45
  },
  dealWrapper: {
    // height: 182,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderTopColor: $globalStyle.transfer.queryColor,
    borderTopWidth: 1
  },
  monthToast: {
    flex: 1,
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  noHave: {
    marginTop: 48,
    width: 55,
    height: 55
  },
  bottomIntro: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  middleInput: {
    position: 'relative',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 335,
    borderRadius: 20,
    paddingHorizontal: 16
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    flex: 1
  },
  topChooseBar: {
    height: 45,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%'
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
module.exports = transferRecordQuery;