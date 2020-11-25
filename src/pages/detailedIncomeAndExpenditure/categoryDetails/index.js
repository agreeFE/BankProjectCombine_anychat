import React, { PureComponent } from 'react'

import { View, StyleSheet,Text, FlatList  } from 'react-native'

import Header from '$/components/header'
import scope from '@/scope'
import { SHOPICON } from '../imageSource'
import SVG from "$/components/Svg";
import {formatMoney} from '@/util/moneyutil'
const router = require('$/router-control')

module.exports = class CategoryDetails extends PureComponent {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      info: {
        IncomeType: '退款',
        money: '1200'
      },
      arr: []
    }
  }

  render() {
    const {info, arr} = this.state
    return (
      <View style={{flex: 1}}>
        <Header title={'类别明细'}  leftClick={()=>{router.back()}}></Header>
        <View style={{flex: 1}}>
          {/* 头部信息 */}
          <View style={styles.headCon}>
            <View style={styles.mainInfo}>
              <Text style={[styles.font,styles.title]}>{info.IncomeType}</Text>
              <Text style={styles.money}>¥ {formatMoney(info.money)}</Text>
              <View style={styles.exta}>
                <Text style={[styles.font,{textAlign: 'right'}]}>{'2019年11月'}</Text>
                <Text style={[styles.font,{textAlign: 'right', marginLeft: 10}]}>共{arr.length}笔</Text>
              </View>
            </View>
            <View style={styles.explain}>
              <Text style={[styles.font, {width: 338,}]}>仅对月度收入和月度支出进行分析（本人招行卡内互转、信用卡还款、投资理财、未入账交易， 不计入当月收入和当月支出）</Text>
            </View>
          </View>
          {/* 列表 */}
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            style={{flex: 1, backgroundColor: "#eee"}}
            data={arr}
            showsVerticalScrollIndicator = {false}
            renderItem={this._renderItem}
          >
          </FlatList>
        </View>
      </View>
    )
  }

  componentDidMount() {
    let { info } = this.props.navigation.state.params
    console.warn('tag', info)
    let arr 
    switch(info.id) {
      case 1: 
        arr = [{
            title: info.IncomeType,
            card: '银行卡1024',
            time: '11月2日',
            money: info.money,
        }]
        break;
      case 2: 
        arr = [{
            title: '工资',
            card: '银行卡1024',
            time: '11月2日',
            money: 25000,
        },{
            title: '福利',
            card: '银行卡1024',
            time: '11月2日',
            money: 540,
        }]
        break;
      case 3: 
        arr = [{
            title: info.IncomeType,
            card: '银行卡1024',
            time: '11月2日',
            money: info.money,
        }]
        break;
      case 4: 
        arr = [{
            title: info.IncomeType,
            card: '银行卡1024',
            time: '11月2日',
            money: info.money,
        }]
        break;
      case 5: 
        arr = [{
            title: info.IncomeType,
            card: '银行卡1024',
            time: '11月2日',
            money: info.money,
        }]
        break;
      case 6: 
        arr = [{
            title: info.IncomeType,
            card: '银行卡1024',
            time: '11月2日',
            money: info.money,
        }]
        break;
      case 7: 
        arr = [{
            title: info.IncomeType,
            card: '银行卡1024',
            time: '11月2日',
            money: info.money,
        }]
        break;
    }
    this.setState({
      info,
      arr
    })

  }

  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.itemCon]}>
        <View style={{ opacity:  1, flex: 1, flexDirection: "row",}}>
          <View style={[styles.itemCenter,{ height: '100%', width: 30}]}>
            <SVG source={SHOPICON} style={{width: 30, height: 30}}></SVG>
          </View>
          <View style={styles.itemInfo}>
            <View style={{ flexDirection: "row", height: 21, justifyContent: 'space-between', width: '100%'}}>
              <Text style={[styles.ItemFont,styles.itemTitleFont,{ flex: 162}]}>{item.title}</Text>
              <View style={{height: '100%', flexDirection: "row", justifyContent: false ? "space-between" : 'flex-end', width: 125}}>
                {
                  false ? 
                  (<View style={[styles.itemExtra,styles.itemCenter]}>
                    <Text style={[styles.ItemFont,styles.itemExtraFont]}>未入账</Text>
                  </View>)
                  : 
                  (<></>)
                }
                <Text style={[styles.ItemFont,styles.itemTitleFont,{color: true ? '#528FEE' : '#DE3131', }]}>{`+${formatMoney(item.money)}`}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 4, justifyContent: "space-between"}}>
              <Text style={styles.ItemFont}>{item.card}</Text>
              <Text style={styles.ItemFont}>2019-11-02 08:02:05</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headCon: {
    height: 231,
    width: '100%',
    backgroundColor: '#fff'
  },
  explain: {
    height: 71,
    borderBottomColor: '#F0F0F0',
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
	alignItems: "center",
	justifyContent: "center",
  },
  font: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    textAlign: 'justify',
    lineHeight: 18
  },
  mainInfo: {
    height: 160,
    alignItems: "center"
  },
  title: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 21,
    textAlign: 'right',
    marginTop: 24
  },
  money: {
    fontSize: 24,
    color: '#3A3A3A',
    lineHeight: 33,
    textAlign: 'right',
    fontFamily: 'PingFangSC-Semibold',
    marginTop: 20
  },
  exta: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  itemCon: {
    flex: 1,
    height: 59,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 24,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  itemCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  itemInfo: {
    flex: 1, 
    paddingLeft: 14,
    paddingBottom: 8,
    paddingTop: 8,
  },
  ItemFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    letterSpacing: 0,
    textAlign: 'left',
    lineHeight: 18
  },
  itemTitleFont: {
    color: '#3A3A3A',
    fontSize: 15,
    lineHeight: 21,
  },
  itemExtra: {
    width: 48,
    height: 18,
    borderColor: '#EB8D15',
    borderRadius: 10,
    borderWidth: 1,
     marginTop: 2,
    borderStyle: 'solid'
  },
  itemExtraFont: {
    color: '#EB8D15',
    fontSize: 12,
    lineHeight: 17,
  },
})
