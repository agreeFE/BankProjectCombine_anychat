import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import SVG from "$/components/Svg";
import scope from '$/scope' 
import {formatMoney, reverseMoney} from '$/util/moneyutil'
import {getYearMouthDay} from '$/util/dateutil'
import { RIGHTARROW, } from './imageSource'
import CardPick from '$/components/cardPick'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
const {getBankCard} = require('$/util/bankCardutil');

module.exports = class TransferLimit extends Component {
  constructor(props) {
    super(props)
    scope(this)
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap); 
    this.state = {
      isLoading: true,
      firstTime: false,
      showModal: false,
      selectCardIndex: 0,
      singleDayLimit: '0',
      annualQuota: '0',
      singleDayNumber: '0',
      accountPaper: '',
      cardList: [],
      defaultSingleDayLimit: 0,
      defaultAnnualQuota: 0,
      defaultSingleDayNumber: 0,
      opera_type: '',
      showMoney: [0, 0, 0]
    }
    
    // 
  }
  componentDidMount() {
    getBankCard(this.getCardList)
  }
  render() {
    const { firstTime, isLoading, showModal,selectCardIndex, cardList, singleDayLimit, annualQuota, showMoney,
       singleDayNumber,  accountPaper, defaultSingleDayLimit, defaultAnnualQuota, defaultSingleDayNumber, } = this.state
    let cardNo = (cardList[selectCardIndex] && cardList[selectCardIndex].cardNo) || ''
    let cardInfo = cardNo.substr(0,4) + '****' + cardNo.substr(-4)
    let noOpacity = !!singleDayLimit &&  !!annualQuota && !!singleDayNumber 
    const Item = [
      {
      title: '单日限额',
      placeholder: `最高限额${formatMoney(defaultSingleDayLimit)}`
      },
      {
      title: '年度限额',
      placeholder: `最高限额${formatMoney(defaultAnnualQuota)}`
      },
      {
      title: '单日笔数',
      placeholder:  `最高次数${defaultSingleDayNumber}`
      },
    ]
    
    return (
      <View style={styles.container}>
        <Header 
          leftClick={this.back}
          title={firstTime ? '开通转账功能' : '转账限额'}
        ></Header>
        <View style={{flex: 1}}>
          <ScrollView  keyboardShouldPersistTaps={'always'}>
            <TouchableWithoutFeedback onPress={() => {this.reverse(4)}}>
              <View> 
                <View style={[styles.itemCon, {marginBottom: 10}]}>
                  <Text style={styles.itemTitle}>一卡通</Text>
                  <TouchableWithoutFeedback onPress={this.toggleCard}>
                    <View style={styles.cardChose}>
                      {
                        isLoading ? 
                        <ActivityIndicator color="#777" />
                        :
                        <Text style={[styles.itemTitle,{color: '#333'}]}>{cardInfo}</Text>
                      }
                      
                      {
                        firstTime ? 
                        <></>
                        :
                        <SVG source={ RIGHTARROW} style={{width: 12, height: 12, marginLeft: 10}}></SVG>
                      }
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                {
                  Item.map((item, index) => (
                    <View style={[styles.itemCon, {marginTop: index ===0 ? 0: 1}]} key={index}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <View style={{alignItems: 'flex-end', flex: 1,height: '100%', justifyContent: 'center',}}>
                        {
                          showMoney[index] === 1 ?
                          <TextInput
                            // onFocus={(event) => {this.reverse(event,index)}}
                            autoFocus={showMoney[index] === 1}
                            maxLength={index ===0 ? defaultSingleDayLimit.length : index ===1 ? defaultAnnualQuota.length : defaultSingleDayNumber.length}
                            underlineColorAndroid='transparent'
                            style={{ textAlign: 'right', flex: 1,paddingRight: 10}}
                            keyboardType='numeric'
                            value={index ===0 ?singleDayLimit : index ===1 ? annualQuota : singleDayNumber}
                            placeholder={item.placeholder}
                            placeholderTextColor={'#999999'}
                            onChangeText={(event) => {this.changeText(event, index)}}
                          />
                          :
                          <Text style={{ width: '100%', textAlign: 'right', paddingRight: 10}} onPress={() =>{this.reverse(index)}}>{index ===0 ? formatMoney(singleDayLimit || 0) : index ===1 ? formatMoney(annualQuota || 0) : Number(singleDayNumber || 0)}</Text>
                        }
                        
                        {/* <Text></Text> */}
                      </View>
                    </View>
                  ))
                }
                
                {/* 开户证件 */}
                {/* <View style={[styles.itemCon, {marginTop: 10}]}>
                  <Text style={styles.itemTitle}>开户证件</Text>
                  <TextInput
                    underlineColorAndroid='transparent'
                    style={{ height: '100%', textAlign: 'right', flex: 1}}
                    value={accountPaper}
                    keyboardType={'numeric'}
                    placeholder={'请输入开户证件号'}
                    placeholderTextColor={'#999999'}
                    onChangeText={(event) => {this.changeText(event, 3)}}
                  ></TextInput>
                </View> */}
                <View style={{flex: 1, alignItems: "center", paddingHorizontal:20}}>
                  {/* <Text style={styles.extraFont}>开通电子银行转账协议，需要“刷脸”核验户主身份。</Text> */}
                  <TouchableWithoutFeedback onPress={()=> {this.ensure()}}>
                    <LinearGradient style={[styles.ensure,noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]} colors={$globalStyle.buttonLinerBackground}>
                        <Text style={styles.ensureFont}>{firstTime ? '同意协议并开通' : '修改额度'}</Text>
                    </LinearGradient>
                  </TouchableWithoutFeedback>
                
                  {/* {
                    firstTime ?
                    <></>
                    :
                    <Text style={styles.shotDown} onPress={this.togglemodal}>关闭额度</Text>
                  } */}
                  {/* 说明 */}
                  <View style={styles.explain}>
                    <Text style={[styles.explainFont, {marginBottom: 8}]}>说明：</Text>
                    {
                      firstTime ?
                      <Text style={styles.explainFont}>使用一卡通向非绑定卡转账时，同时受账户本身支出限额限制。</Text>
                      :
                      <>
                        <Text style={styles.explainFont}>1、日限额最高可调至200万。</Text>
                        <Text style={styles.explainFont}>2、调高电子银行转账限额，需要“刷脸”验证户主身份。</Text>
                        <Text style={styles.explainFont}>3、使用一卡通向非绑定卡转账时，同时受账户本身支出限额限制。</Text>
                      </>
                    }
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          {/* 银行卡选择 */}
          <CardPick
            ref={ref => {this.cardPick = ref}}
            cardList={cardList}
            selectIndex={selectCardIndex}
            onConfirm={this.chosenCard}
          ></CardPick>
        </View>
        {/* 关闭额度弹窗 */}
        {
          showModal ? 
          <View style={styles.modal}>
            <View style={styles.modalCon}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalTitleFont}>关闭功能提示</Text>
              </View>
              <Text style={styles.modalFont}>您即将关闭电子银行转账功能。关闭后，可以在转账设置中再次开通。确定现在关闭此功能吗？</Text>
              <View style={styles.btnCon}>
                <TouchableWithoutFeedback onPress={() => {this.btnClick(1)}}>
                  <View style={styles.btnItem}>
                    <Text style={[styles.bthItemFont, {color: '#E79A3B'}]}>取消</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {this.btnClick(2)}}>
                  <LinearGradient style={[styles.btnItem, {borderWidth: 0}]}  colors={$globalStyle.buttonLinerBackground}>
                    <Text style={styles.bthItemFont}>确定</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          :
          <></>
        }
        
      </View>
    )
  }

  reverse = (num) => {
    switch(num) {
      case 0: 
        this.setState({
          showMoney: [1,0,0]
        })
        break;
      case 1:
        this.setState({
          showMoney: [0,1,0]
        })
        break;
      case 2: 
        this.setState({
          showMoney: [0,0,1]
        })
        break;
      default: 
        this.setState({
          showMoney: [0,0,0]
        })
        break;
    }
  }

  back = () => {
    router.back()
  }
  changeText = (event, num) => {
    switch(num) {
      case 0: 
        let singleDayLimit = (event.split(',').join()).replace(/[^\d]+/g,'')
        this.setState({
          singleDayLimit
        })
        break;
      case 1: 
        let annualQuota = (event.split(',').join()).replace(/[^\d]+/g,'')
        this.setState({
          annualQuota
        })
        break;
      case 2: 
        let singleDayNumber = (event.split(',').join()).replace(/[^\d]+/g,'')
        this.setState({
          singleDayNumber
        })
        break;
      case 3: 
        let str = event.split(' ').join('')
        let accountPaper
        if(str.length <= 6) {
          accountPaper = str
        } else if (str.length >6 && str.length <= 14) {
          accountPaper = str.substr(0,6) + ' ' + str.substring(6,14)
        } else if (str.length > 14 && str.length < 19) {
          accountPaper = str.substr(0,6) + ' ' + str.substring(6,14) + ' ' + str.substring(14,18) 
        } else {
          return
        }
        this.setState({
          accountPaper
        })
        break;
    }
  }

  ensure = () => {
    const { firstTime, opera_type, cardList,selectCardIndex, singleDayLimit, annualQuota, singleDayNumber,  accountPaper, defaultSingleDayLimit, defaultAnnualQuota, defaultSingleDayNumber } = this.state
    if(!singleDayLimit || Number(singleDayLimit) == 0) {
      $Toast.info('请输入单日限额')
      return
    }
    if(!annualQuota || Number(annualQuota) == 0) {
      $Toast.info('请输入年度限额')
      return
    }
    if(!singleDayNumber || Number(singleDayNumber) == 0) {
      $Toast.info('请输入单日笔数')
      return
    }
    // if(!accountPaper) {
    //   $Toast.info('请输入开户证件号')
    //   return
    // }
    // if(accountPaper.length !== 20) {
    //   $Toast.info('请输入正确的开户证件号(18位)')
    //   return
    // }
    if(Number(singleDayLimit) > Number(defaultSingleDayLimit)){
      $Toast.info(`单日额度超出,最高额度为${formatMoney(defaultSingleDayLimit)}`)
      return
    }
    if(Number(annualQuota) > Number(defaultAnnualQuota)){
      $Toast.info(`年度额度超出,最高额度为${formatMoney(defaultAnnualQuota)}`)
      return
    }
    if(Number(singleDayNumber) > Number(defaultSingleDayNumber)){
      $Toast.info(`单日笔数超出,最高次数为${defaultSingleDayNumber}`)
      return
    }
    // if(Number(singleDayLimit) === Number(defaultSingleDayLimit) && Number(annualQuota) === Number(defaultAnnualQuota) && Number(singleDayNumber) === Number(defaultSingleDayNumber)){
    //   $Toast.info('转账额度未修改')
    //   return
    // }
    // if(Number(annualQuota) === Number(defaultAnnualQuota)){
    //   $Toast.info('年度额度未修改')
    //   return
    // }
    // if(Number(singleDayNumber) === Number(defaultSingleDayNumber)){
    //   $Toast.info('单日笔数未修改')
    //   return
    // }
    let info = {
      accountNo: cardList[selectCardIndex].cardNo,
      // opera_type: '2',
      operaType: opera_type,
      listInfo: [
        {
          limitNo: this.numberLimit[0].limitNo,
          limitCtrlType: "0",
          tradeCount: Number(singleDayNumber),
          singleTradeAmount: "",
          totalTradeAmount: "",
          effectiveDate: this.numberLimit[0].effectiveDate
        },
        {
          limitNo: this.dayLimit[0].limitNo,
          limitCtrlType: "1",
          tradeCount: '',
          singleTradeAmount: singleDayLimit,
          totalTradeAmount: annualQuota,
          effectiveDate: this.dayLimit[0].effectiveDate
        },
      ]
    }
    this.setLimitInfo(info)
    
  }

  togglemodal = () => {
    const { showModal } = this.state
    this.setState({
      showModal: !showModal
    })
  }

  toggleCard = () => {
    Keyboard.dismiss()
    setTimeout(() => {
      this.cardPick.toggleModal()
    },20)
  }

  btnClick = (num) => {
    num ===2 ? this.setState({firstTime: true}) : ''
    this.togglemodal()
  }

  chosenCard = ({index,item}) => {
    let info = {cardNo: this.state.cardList[index].cardNo}
    this.setState({
      selectCardIndex: index,
      accountPaper: ''
    })
    this.getLimitInfo(info)
    this.toggleCard()
  }

  getCardList = (cardArr) => {
    const { cardList, selectCardIndex } = this.state
    cardArr.map((item) => {
      cardList.push({value: `${item.cardBank}(${item.cardNo.substr(-4)})`, cardNo: item.cardNo})
    })
    console.warn('tag', this.setState)
    this.setState({cardList, isLoading: false})
    this.getLimitInfo({cardNo: cardList[selectCardIndex].cardNo})
  }

  getLimitInfo = (info) => {
    NetworkUtil.networkService('/account/setting/getLimit', info, response => {
      console.warn('账户限额查询', response)
      let opera_type
      if(response.exsitFlag === '1') {
        opera_type = '2'
      } else {
        opera_type = '5'
      }
        this.numberLimit = response.listInfo.filter((item) => (
          item.limitCtrlType === '0'
        ))
        this.dayLimit = response.listInfo.filter((item) => (item.limitCtrlType === '1'))
        this.setState({
          singleDayLimit: (this.dayLimit[0].singleTradeAmount),
          defaultSingleDayLimit: this.dayLimit[0].defaultSingleTradeAmount,
          defaultAnnualQuota: this.dayLimit[0].defaultTotalTradeAmount,
          defaultSingleDayNumber: this.numberLimit[0].defaultTradeCount,
          annualQuota: (this.dayLimit[0].totalTradeAmount),
          singleDayNumber: this.numberLimit[0].tradeCount,
          opera_type
        })
      // } 
 
    })
  }

  setLimitInfo = (info) => {
    const {singleDayLimit, annualQuota, singleDayNumber} = this.state
    console.warn('账户限额设置', info)
    NetworkUtil.networkService('/account/setting/setLimit', info, response => {
      // console.warn('succ', '')
      router.replace('operatSuccess',{singleDayLimit, annualQuota, singleDayNumber:Number(singleDayNumber)})
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#eee'
  },
  itemCon: {
    height: 45,
    paddingHorizontal:24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  itemTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    lineHeight: 21
  },
  cardChose: {
    alignItems: "center",
    flexDirection: "row",
  },
  ensure: {
    width: "100%",
    height: 45,
    marginTop: 60,
    justifyContent:"center",
    alignItems: "center",
    borderRadius: 5
  },
  ensureFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 24
  },
  shotDown: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#F0921D',
    letterSpacing: 0.18,
    lineHeight: 21,
    marginTop: 16
  },
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: "center",
    alignItems: "center"
  },
  modalCon: {
    height: 199,
    width: 343,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  modalTitle: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1
  },
  modalTitleFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 17,
    color: '#333',
    lineHeight: 24
  },
  modalFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#333',
    lineHeight: 21,
    marginTop: 12,
    paddingLeft: 24,
    paddingRight: 19
  },
  btnCon: {
    flexDirection: "row",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    marginTop: 24,
  },
  btnItem: {
    width: 142,
    height: 35,
    justifyContent: "center",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFA243',
    borderRadius: 4
  },
  bthItemFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 21
  },
  extraFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
    marginTop: 16
  },
  explain: {
    marginTop: 48,
    paddingBottom: 46
  },
  explainFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    textAlign: 'justify',
    lineHeight: 18,
    marginBottom: 4
  },
  // cardChose
  cardModalCon: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
    justifyContent: 'flex-end'
  },
  cardCon: {
    height: 260,
    backgroundColor: "#fff"
  },
  cardTitle: {
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  cardTitleFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    lineHeight: 22
  },
  cardItemFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#3A3A3A',
    lineHeight: 21,
    marginLeft: 12,
    flex: 1
  },
  cardItem: {
    height: 61,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 32
  }
})
