import React, { PureComponent } from 'react'

import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ImageBackground
} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import Header from '$/components/header'
import scope from '@/scope'
import { GETMORE } from '../imageSource' 
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const {formatMoney} = require('$/util/moneyutil')
import SVG from "$/components/Svg";

module.exports = class LoanRecond extends PureComponent {
  constructor(props) {
    super(props);
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
    this.state = {
      isLoading: true,
      loan: true,
      borrowRecord: []
    }
  }
  render() {
    const { loan, borrowRecord, isLoading } = this.state
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={payload => {this.checkLoanInfo()}}></NavigationEvents>
        <Header 
          title={`${loan ? '借款' : '还款'}记录`}
          leftClick={()=> {router.back()}}
          rightClick={()=> {}}
        ></Header>
        {/* <View style={styles.chosen}>
          <TouchableWithoutFeedback onPress={() => {this.click(1)}}>
            <View style={[styles.choseIcon,{backgroundColor: loan ? '#3D488C' : '#fff'}]}>
              <Text style={[styles.iconFont,{color: loan ? '#fff' : '#3D488C'}]}>借款记录</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {this.click(2)}}>
            <View style={[styles.choseIcon,{backgroundColor: !loan ? '#3D488C' : '#fff'}]}>
              <Text style={[styles.iconFont,{color: !loan ? '#fff' : '#3D488C'}]}>还款记录</Text>
            </View>
          </TouchableWithoutFeedback>
        </View> */}

        {
          isLoading ? 
          <View style={{ flex: 1, paddingTop: 180, alignItems: "center" }}>
            <ActivityIndicator color="#777" />
            <Text style={{ color: '#666', fontSize: 16, marginTop: 5 }}>一大波数据正在赶来，请稍后~</Text>
          </View>
          :
          borrowRecord.length > 0 ? 
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            style={{flex: 1, backgroundColor: '#eee'}}
            data={borrowRecord}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem}
          ></FlatList> 
          :
          <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
            <SVG source={require('$image/transferAccount/noHave.svg')} style={styles.noHave}></SVG>
            <Text style={{textAlign: 'center', fontSize: 16, lineHeight: 28, marginTop: 10, color: '#999',}}>暂无借款记录</Text>
          </View>
          
        }
      </View>
    )
  }

  _renderItem = ({item, index}) => {
    const date = `${item.openDate.substr(0,4)}年${item.openDate.substr(4,2)}月${item.openDate.substr(-2)}日`
    return (
      <TouchableWithoutFeedback onPress={() => {this.clickItem(item)}}>
        <View style={[styles.container, {borderTopColor: index ===0 ? '#fff' : '#F0F0F0'}]}>
          <View>
            <Text style={styles.moneyFont}>{formatMoney(item.generationAlsoAmount)}</Text>
            <Text style={styles.dateFont}>{date}</Text>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            {
              item.generationAlsoAmount == 0 ? 
              <Text style={styles.normalFont}>已结清</Text>
              :
              <View style={styles.forBack}>
                <Text style={styles.forBackFont}>立即还款</Text>
              </View>
              
            }
            <SVG source={GETMORE} style={{width: 8, height: 16}}></SVG>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  click = (data) => {
    // this.setState({
    //   loan: data === 1
    // })
  }

  clickItem = (item) => {
    router.load('borrowDetails',{info: item})
  }
  // /account/loans/checkLoanRepayInfo
  checkLoanInfo = () => {
    NetworkUtil.networkService('/account/loans/checkLoanRepayInfo', {}, response => {
      //list_info  还款信息
      let { listInfo = [] } = response
      this.setState({
        borrowRecord: listInfo,
        isLoading: false
      })
    })

    // /account/loans/loanDebtQuery  欠款查询

  }
}

const styles = StyleSheet.create({
  chosen: {
    borderTopColor: '#3D488C',
    borderBottomColor: '#3D488C',
    borderLeftColor: "#3D488C",
    borderRightColor: '#3D488C',
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 17,
    marginBottom: 15,
    flexDirection: "row",
    height: 45,
    overflow: 'hidden'
  },
  choseIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  iconFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    letterSpacing: 0.19,
    textAlign: 'center'
  },
  container: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
  },
  moneyFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: $globalStyle.mine.textColor,
    letterSpacing: 0.18,
    textAlign: 'left',
    lineHeight: 21
  },
  dateFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    letterSpacing: 0.16,
    textAlign: 'left',
    lineHeight: 18
  },
  forBack: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4494F2',
    borderRadius: 16,
    width: 75,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18
  },
  normalFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999999',
    letterSpacing: 0.18,
    textAlign: 'center',
    lineHeight: 21,
    marginRight: 15
  },
  forBackFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#1278EF',
    lineHeight: 20,
  },
  noHave: {
    width: 80,
    height: 80
  },
})
