import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, ActivityIndicator, FlatList } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import Header from '$/components/header'
import { LOGO, HUANDAIKUAN,NORMAL, HUANXINYONGKA, JIAOFANGZU, ZIDINGYI, SMALLRIGHT } from './imageSource'
import scope from '$/scope'
import { formatMoney } from '$/util/moneyutil'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import SVG from "$/components/Svg";


module.exports = class transferInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
    this.state = {
      isLoading: true,
      haveAcc: true, //是否有预约转账
      accList: [],//推荐搜索
      showOptions: false
    };
  }
  getData = () => {
    // account/transferplan/list
    this.setState({showOptions: false})
    let info = {}
    NetworkUtil.networkService('/account/transferplan/list', info, response => {
      setTimeout(() => {
        this.setState({
          isLoading: false,
          accList: response.transferPlanList,
          haveAcc: response.transferPlanList.length > 0
        })
      }, 300);
    })
  }

  back = () => {
    router.back()
  }
  onItemClick(item) {
    router.load('reservationTransferDetails', { info: item });
  }
  goJumpOrClick(index) {
    switch (index) {
      case 1:
        router.load('addTransferAccounts',1); //还贷款
        break
      case 2:
        router.load('addTransferAccounts',2); //还信用卡
        break
      case 3:
        router.load('addTransferAccounts',3); //交房租
        break
      case 4:
        router.load('addTransferAccounts',4);  //自定义
        break
    }
  }
  _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.onItemClick(item)}>
        <View key={index} style={styles.accbodyView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 22, color: '#333333', paddingTop: 12, paddingLeft: 16, width: '65%' }}>¥ <Text style={{ fontWeight: 'bold' }}>{formatMoney(item.transferAmount)}</Text></Text>
            <View style={{ paddingTop: 12, width: '35%',flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
              <SVG style={{width:16,height:14,marginRight:8}} source={NORMAL} />
              <Text style={{ textAlign: 'right', fontSize: 13, color: '#666666',lineHeight:15 }}>{item.transferAlias}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: '40%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333333', paddingLeft: 16, fontFamily: 'PingFangSC-Medium', width: '40%' }}>
              {`${item.payerCardBank}(${item.payerCardNo.substr(-4)})`}</Text>
            <SVG style={{ width: 14, height: 6, }} source={SMALLRIGHT} />
            <View style={{ width: '55%', paddingLeft: '5%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333333' }}>{item.payeeName}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#999999', paddingTop: 3 }}>{`${item.payeeCardBank}(${item.payeeCardNo.substr(-4)})`}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: '25%', paddingLeft: 16 }}>
            <Text style={{ fontSize: 14, color: '#666666' }}>付款方式：</Text>
            <Text style={{ fontSize: 14, color: $globalStyle.reservation.textColor }}>
              {item.transferCycle === 2 ? `每月${item.transferDate.substr(-2)}日 ` : item.transferDate}
            </Text>
            <Text style={{ fontSize: 14, color: $globalStyle.reservation.textColor, paddingLeft: 10 }}>{item.transferWay === 1 ? '仅提醒,不自动转账' : '自动转账'}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  render() {
    const { showOptions } = this.state
    return (
      <>
        <NavigationEvents
          onWillFocus={payload => { this.getData() }}
        />
        <Header
          title={'预约转账'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <View style={styles.bodyBox}>
            {
              this.state.isLoading ?
              <View style={{ flex: 1, marginTop: 20, alignItems: "center",  }}>
                <ActivityIndicator color="#777" />
                <Text style={{ color: '#666', fontSize: 16, marginTop: 5 }}>一大波数据正在赶来，请稍后~</Text>
              </View>
              :
              this.state.haveAcc ? 
              <View style={{flex: 1}}>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.accList}
                  renderItem={this._renderItem}
                />
              </View> 
              : 
              <View style={{flex: 1}}>
                <Text style={{ fontSize: 20, color: '#3A3A3A', paddingTop: 32, paddingLeft: 24 }}>你目前还没有预约转账</Text>
                <Text style={{ fontSize: 16, color: '#999999', paddingTop: 12, paddingLeft: 24 }}>设置后将以多种方式提醒你转账</Text>
                <Text style={{ fontSize: 16, color: '#999999', paddingTop: 6, paddingLeft: 24 }}>或帮你自动转账</Text>
                <Image style={styles.bodyImg} source={LOGO} />
              </View>
            }
         
          {
            showOptions ?
            <View style={{position: "absolute", height: '100%', justifyContent: 'flex-end', backgroundColor:'rgba(255,255,255,0.9)',paddingBottom: 20}}>
              {/* <Text style={styles.leftTitleText}>可添加预约</Text> */}
              <View style={styles.botView}>
              <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(1) }} >
                <View style={styles.footBox}>
                  <SVG style={styles.footImg} source={HUANDAIKUAN} />
                  <Text style={styles.imgText}>还贷款</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(2) }} >
                <View style={styles.footBox}>
                  <SVG style={styles.footImg} source={HUANXINYONGKA} />
                  <Text style={styles.imgText}>还信用卡</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(3) }} >
                  <View style={styles.footBox}>
                    <SVG style={styles.footImg} source={JIAOFANGZU} />
                    <Text style={styles.imgText}>交房租</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(4) }} >
                <View style={styles.footBox}>
                  <SVG style={styles.footImg} source={ZIDINGYI} />
                  <Text style={styles.imgText}>自定义</Text>
                </View>
                </TouchableWithoutFeedback>
              </View>
          </View>
            :
            <></>
          }
         
          </View>
          <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <TouchableWithoutFeedback onPress={()=> {this.setState({showOptions: !showOptions})}}>
              <View style={{width: 50, height: 50, borderRadius: 25, transform: [{rotateZ: showOptions? '45deg' : '0deg'}], backgroundColor: $globalStyle.backgroundColor}}>
                <Text style={{fontSize: 40, color: '#fff', lineHeight: 50, textAlign: "center"}}>+</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          
        

        </View>
      </>
    )
  }
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    flex: 1,
    alignItems: "center"
  },
  bodyBox: {
    width: '100%',
    height: '86%',
  },
  bodyFoot: {
    width: '100%',
    height: '28%'
  },
  leftTitleText: {
    fontWeight: 'bold',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingTop: 12,
    height: 40,
    paddingLeft: 20
  },
  botView: {
    marginTop: '2%',
    flexDirection: 'row',
    width: '100%'
  },
  footBox: {
    width: '25%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footImg: {
    width: 44,
    height: 44
  },
  imgText: {
    marginTop: 8
  },
  bodyImg: {
    height: 82,
    width: 120,
    marginLeft: '30%',
    marginTop: '30%'
  },
  accbodyView: {
    width: '90%',
    height: 126,
    marginLeft: '5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginTop: 16
  }
})
