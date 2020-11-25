import React, { Component,  } from 'react'

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import SVG from "$/components/Svg";
import Picker from '$/components/picker/pickerPro'
import { TIME1, ADDRESS, GETMORE} from '../imageSource/index'
import scope from '@/scope'
const router = require('$/router-control')

module.exports = class TakeNum extends Component {
  constructor(props) {
    super(props) 
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap); 
    this.state = {
      showChose: false,
      business: 1,
      timeValue: '',
      bankInfo: window.bankInfo
    }
  }
  render() {
    const { business, timeValue, bankInfo } = this.state
    let noOpacity = !!timeValue
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={payload => { this.setState({bankInfo: window.bankInfo}) }}></NavigationEvents>
        <Header 
          title={`网点取号`} 
          leftClick={()=> {router.replace('networkReservation')}}
          rightClick={()=> {}}
        ></Header>
        <View style={{flex: 1, position: 'relative', backgroundColor: '#eee'}}>
          {/* 业务类型 */}
          <View style={[styles.viewCon,styles.viewCon1]}>
            <Text style={styles.busTitle}>请选择业务类型</Text>
            <View style={{flexDirection: "row"}}>
              <TouchableWithoutFeedback onPress={() => {this.changeBusiness(1)}}>
                <View style={[styles.choseItem,{backgroundColor: business === 1 ? $globalStyle.takeNum.itemClickColor : '#fff', borderWidth: business === 1 ? 0 : 1}]}>
                  <Text style={[{color: business === 1 ? '#fff' : $globalStyle.takeNum.itemClickColor}]}>综合业务</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.changeBusiness(2)}}>
                <View style={[styles.choseItem,{backgroundColor: business === 2 ? $globalStyle.takeNum.itemClickColor : '#fff', borderWidth: business === 2 ? 0 : 1}]}>
                  <Text style={[styles.itemFont,{color: business === 2 ? '#fff' : $globalStyle.takeNum.itemClickColor}]}>大额取现</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.extraFont}>
              {
                business === 1 ?
                '支持立即取号和预约取号'
                :
                '仅支持大额人民币现钞提取的预约取号(通常为10万元及以上)'
              }
            </Text>
          </View>
          {/* 银行地址 */}
          <View style={styles.viewCon}>
            <View style={styles.bankName}>
              <Text style={styles.bankNameFont}>{bankInfo.name}</Text>
              <TouchableWithoutFeedback onPress={this.changeDots}>
                <View style={styles.bankChange}>
                  <Text style={styles.bankChangeFont}>切换网点</Text>
                  <SVG source={GETMORE} style={{width: 6, height: 12, marginLeft: 8}}></SVG>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{paddingVertical:16}}>
              <View style={[styles.address,{paddingBottom: 12}]}>
                <ImageBackground source={ADDRESS} style={{width: 12, height: 20}}></ImageBackground>
                <Text style={[styles.addressFont]}>{bankInfo.address}</Text>
              </View>
              <View style={styles.address}>
                <ImageBackground source={TIME1} style={{width: 15, height: 15}}></ImageBackground>
                <Text style={[styles.addressFont]}>{bankInfo.workTime}</Text>
              </View>
            </View>
          </View>
          {/* 取号/下一步 */}
          {
            true ?
            <>
              <TouchableWithoutFeedback onPress={this.toggleChose}>
              <View style={styles.timePick}>
                <Text style={styles.timePickFont}>办理时间</Text>
                
                  <View style={{alignItems: "center",flexDirection: 'row'}}>
                    <Text style={styles.timePickFont2}>{timeValue ? `${timeValue[0]} ${timeValue[1]}` : '请选择'}</Text>
                    <SVG source={GETMORE} style={{width: 6, height: 12}}></SVG>
                  </View>
              </View>
                </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.nextStep}>
                <LinearGradient style={[styles.ensure,noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]} colors={$globalStyle.buttonLinerBackground}>
                  <Text style={styles.ensureFont}>确定取号</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </>
            :
            <>
              <TouchableWithoutFeedback onPress={this.nextStep}>
                <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}>
                  <Text style={styles.ensureFont}>下一步</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
              <Text style={styles.toast}>温馨提示：预约取现的爽约将会影响今后使用自助渠道预约办理业务，如有变更，请及时取消预约。</Text>
            </>
          }
          {/* 办理时间 */}
          <Picker
            ref={ref => this.picker = ref}
            pickerData={this.setDate()}
            selectedValue={timeValue || ['今天', '立即取号']}
            onPickerConfirm={this.getData}
          ></Picker>
        </View>
      </View>
    )
  }

  changeBusiness = (business) => {
    this.setState({
      business
    })
  }

  changeDots = () => {
    router.load('selectDots')
  }

  nextStep = () => {
    const { timeValue } = this.state
    if(!timeValue) {
      $Toast.info('请选择办理时间')
      return
    }
    window.hasNum = true
    router.back()
  }

  toggleChose = () => {
    this.picker.toggle()
  }

  getData = (item) => {
    this.setState({
      timeValue: item
    })
  }


  setDate = () => {
    let tommrow = [ '09:00-10:00','10:00-11:00', '11:00-12:00','12:00-13:00', '13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00',]
    let today = tommrow.filter(item => {
      return item.substr(0,2) > new Date().getHours()
    })
    if(today.length > 0) {
      today[0] = '立即取号'
    }
    return today.length > 0 ? 
    [{
      '今天': today
    },{
      '明天': tommrow
    }]
    : 
    [
      {
        '明天': tommrow
      }
    ]
  }
}


const styles = StyleSheet.create({
  info: {
    height: 40,
    backgroundColor: "yellow",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },
  infoFont: {
    fontSize: 12,
    color: 'orange'
  },
  viewCon: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  viewCon1: {
    paddingHorizontal: 20,
    paddingTop: 19,
    paddingBottom: 16
  },
  choseItem: {
    width: 76,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderColor: $globalStyle.takeNum.itemClickColor,
    borderRadius: 3,
    marginRight: 10
  },
  busTitle: {
    marginBottom: 16,
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
    letterSpacing: 0.19,
    fontWeight: 'bold'
  },
  itemFont: { },
  extraFont: {
    marginTop: 12,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999999',
    letterSpacing: 0.18,
    lineHeight: 21
  },
  bankName: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    borderBottomColor: '#F0F0F0', 
    borderBottomWidth: 1, 
    paddingLeft: 20,
    paddingRight: 20,
    height: 45
  },
  bankNameFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#333333',
    letterSpacing: 0.18,
    lineHeight: 21,
    fontWeight: 'bold'
  },
  bankChange: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between"
  },
  bankChangeFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999999',
    letterSpacing: 0.18,
    lineHeight: 21
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingVertical: 16
  },
  addressFont:{
    marginLeft: 9,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#666666',
    letterSpacing: 0.18,
    lineHeight: 21
  },
  next: {
    marginHorizontal: 10, 
    textAlign: "center", 
    lineHeight: 30, 
    color: '#fff', 
    backgroundColor: 'red', 
    borderRadius:5,
    marginTop: 10
  },
  toast: {
    marginHorizontal: 10,
    marginTop: 20,
    fontSize: 13
  },
  timePick: {
    height: 45, 
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  timePickFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#333333',
    letterSpacing: 0,
    lineHeight: 21
  },
  timePickFont2: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999',
    letterSpacing: 0.18,
    lineHeight: 21,
    marginRight: 8
  },
  ensure: {
    marginHorizontal: 20,
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
})