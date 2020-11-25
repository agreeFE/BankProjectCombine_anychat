import React, { PureComponent,  } from 'react'

import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
 } from 'react-native'
 import { SHOPICON } from '../../imageSource'
import SVG from "$/components/Svg";
const { formatMoney } = require('$/util/moneyutil')

export default class List extends PureComponent {
	constructor(props) {
		super(props)
	}
  render() {
    const { listData = [] } = this.props 
    let comeIn = listData.filter(item => item.cdflg === 'C').reduce((total,item) => total + Number(item.cramt) ,0)
    let comeOut = listData.filter(item => item.cdflg == 'D').reduce((total,item) => total + Number(item.dbamt) ,0)
    comeIn = formatMoney(comeIn)
    comeOut = formatMoney(comeOut)
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.font}>{listData.length}笔交易</Text>
          <Text style={styles.font}>支出 ¥ {comeOut}   收入 ¥ {comeIn}</Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={listData}
            // showsVerticalScrollIndicator = {false}
            renderItem={this._renderItem}
          >
          </FlatList>
        </View>
      </View>
    )
  }

  _renderItem = ({item,index}) => {
    return (
      <View style={[styles.itemCon]}>
        <View style={{ opacity: false ? 0.6 : 1, flex: 1, flexDirection: "row"}}>
          <View style={[styles.center,{ height: '100%', width: 30}]}>
            <SVG source={SHOPICON} style={{width: 30, height: 30}}></SVG>
          </View>
          <View style={styles.info}>
            <View style={{ flexDirection: "row", height: 21, justifyContent: 'space-between', width: '100%'}}>
              <Text style={[styles.itemFont,styles.titleFont,{ flex: 162}]}>{!item.opacnm ? '' : `${item.opacnm}${item.opacct.substr(-4)}`}{item.rmk}</Text>
              <View style={{height: '100%', flexDirection: "row", justifyContent: false? "space-between" : 'flex-end', width: 125}}>
                {
                  false ? 
                  (<View style={[styles.extra,styles.center]}>
                    <Text style={[styles.itemFont,styles.extraFont]}>未入账</Text>
                  </View>)
                  : 
                  (<></>)
                }
                <Text style={[styles.font,styles.titleFont,{color: item.cdflg === 'C' ? '#528FEE' : '#DE3131', }]}>{item.cdflg === 'C'? '+' : '-'} ¥{item.cdflg === 'C' ? formatMoney(item.cramt) : formatMoney(item.dbamt)}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 4, justifyContent: "space-between"}}>
              <Text style={styles.itemFont}>银行卡{item.acctno.substr(-4)}</Text>
              <Text style={styles.itemFont}>{`${item.trsdt.substr(0,4)}-${item.trsdt.substring(4,6)}-${item.trsdt.substr(-2)}`} {item.trstm.substr(0,2) + ':' + item.trstm.substr(2,2) + ':' + item.trstm.substr(-2)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    height: 44,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  font: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#666666',
    textAlign: 'justify',
    lineHeight: 20
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
})
