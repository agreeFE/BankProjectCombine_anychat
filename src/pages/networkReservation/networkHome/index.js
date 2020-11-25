import React, { Component,  } from 'react'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  ImageBackground
} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import SVG from "$/components/Svg"; 
import { GETMORE, TIME2,ADDRESS, ZHUANZHANG, DAIKUANG, MAMAJIESUO, MIMACHONGZHI, GERENZILIAO, LIANXIFANGSHI, LICAI,KAGUASHI, CLOUDPERSON} from '../imageSource/index'
import scope from '@/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const { getLoginToken } = require('$/util/tokenutil')

module.exports = class NetworkReservation extends Component {
  constructor(props) {
    super(props)
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
    const defaultValue = {
      name: '深南中路支行',
      dis: 1,
      address: '广东省深圳市福田区金田路3038号',
      near: true,
      workTime: '9:00-17:30（周一至周日）',
    }
    this.getPosition()
    window.bankInfo =  defaultValue
    this.state = {
      hasNum: window.hasNum,
      bankInfo: window.bankInfo
    }
  }
  render() {
    const { hasNum, bankInfo } = this.state
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={payload => { this.setState({bankInfo: window.bankInfo, hasNum: window.hasNum})}}></NavigationEvents>
        <Header 
          title={`网点预约`} 
          leftClick={()=> {router.load('homeScrollable')}}
        ></Header>
        <View style={styles.scroll}>
          <ScrollView 
            style={{backgroundColor: '#eee'}}
            showsVerticalScrollIndicator={false}
          >
            {/* 头部广告 */}
            {/* <TouchableWithoutFeedback onPress={() => {this.toggleModal()}}>
              <ImageBackground source={''} style={{width: '100%', height: 100, backgroundColor: 'red'}}></ImageBackground>
            </TouchableWithoutFeedback> */}
            {/* 网点信息 */}
            {/* <DotInfo hasNum={hasNum} routerName={this.props.navigation.state.routeName}></DotInfo> */}

            <View style={styles.container1}>
              {
                hasNum ? 
                (<View style={styles.main1}>
                  <View style={styles.cont1}>
                    <Text style={styles.cont1Font1}>排队号</Text>
                    <Text style={styles.cont1Font2}>1233</Text>
                  </View>
                  <View style={styles.cont2}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <ImageBackground source={ADDRESS} style={{width: 13,height: 22}}></ImageBackground>
                      <Text  style={[styles.cont1Font1, {marginLeft: 8}]}>{bankInfo.name}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 12}}>
                    <ImageBackground source={TIME2} style={{width: 15,height: 15}}></ImageBackground>
                      <Text  style={[styles.cont1Font1,{marginLeft: 8, color: $globalStyle.transfer.textColor,}]}>前面还有2人排队</Text>
                    </View>
                  </View>
                </View>)
                :
                (<>
                  <TouchableWithoutFeedback onPress={() => {this.seeDot(1)}}>
                    <View style={styles.main}>
                      <Text style={styles.titleFont}>{bankInfo.name}</Text>
                        <View style={{flexDirection:'row', alignItems: "center", marginTop: 8, height: 21}}>
                          {
                            bankInfo.near ? 
                            <Text style={styles.orangeFont}>最近</Text>
                            : 
                            <></>
                          }
                          {/* color: $globalStyle.transfer.textColor, */}
                          <Text style={styles.orangeFont1}>{bankInfo.dis}km</Text>
                          <Text style={styles.eleFont} numberOfLines={1} ellipsizeMode={'tail'}>{bankInfo.address}</Text>
                        </View>
                      
                      <Text style={styles.extraFont}>支持取现预约</Text>
                      <TouchableWithoutFeedback onPress={this.takeNumber}>
                        <LinearGradient 
                          style={styles.ensure}
                          colors={$globalStyle.buttonLinerBackground}
                        >
                          <Text style={styles.ensureFont}>取号</Text>
                        </LinearGradient>
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                </>)
              }
            
              {/*  全部网点 */}
              <TouchableWithoutFeedback onPress={() => {this.seeDot(2)}}>
                <View style={styles.allDot}>
                  <Text style={styles.allDotFont}>全部网点</Text>
                  <SVG source={GETMORE} style={{width: 6, height: 12}}></SVG>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* 业务信息 */}
            <View>
              <View style={styles.title}>
                <ImageBackground source={CLOUDPERSON} style={{height: 60,width: 60}}></ImageBackground>
                <View style={styles.textView}>
                  <View style={{backgroundColor: '#fff', width: 10, height: 10, position: 'absolute', top: 10, left: -4,transform: [{rotateZ:'45deg'}], zIndex: -1}}></View>
                  <Text style={styles.textFont}>以下业务可通过云柜员
                    <Text style={{color: $globalStyle.transfer.textColor}} onPress={this.click}>直接办理，无需取号</Text>
                  </Text>
                </View>
              </View>
              
              <View style={styles.itemCon}>
              {
                BUSINFO.map((item,index) => (
                  <TouchableWithoutFeedback  key={index} onPress={() => {this.clickItem(index)}}>
                    <View style={styles.item}>
                      <Image resizeMode={'contain'} source={item.img} style={{width: 35, height: 35,}}></Image>
                      <Text style={styles.itemFont1}>{item.title}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
              </View>
            </View>
            {/* 取号填单 */}
            <TouchableWithoutFeedback onPress={() => {this.checkRecond(1)}}>
              <View style={styles.record}>
                <Text style={styles.recordFont}>取号记录</Text>
                <SVG source={GETMORE} style={{width:6, height: 12}}></SVG>
              </View>
            </TouchableWithoutFeedback>
            {/* 填单记录 */}
            {/* <TouchableWithoutFeedback onPress={() => {this.checkRecond(2)}}>
              <View style={[styles.record,{marginBottom: 20}]}>
                <Text style={styles.recordFont}>填单记录</Text>
                <ImageBackground source={''} style={{width:6, height: 16}}></ImageBackground>
              </View>
            </TouchableWithoutFeedback> */}

          </ScrollView>
        </View>
      </View>
    )
  }

  takeNumber = () => {
    router.load('takeNum')
  }

  getPosition = () => {
    console.warn('tag', navigator.geolocation)
    // navigator.geolocation.getCurrentPosition(
    //   res => {
    //     console.warn('position',res)
    //     // this.setState({
    //     //   location: res.coords
    //     // })
    //   }, err => {
    //   }, {})
  }

  seeDot = (num) => {
    if(num === 1) {
      return
    }
    if(this.state.hasNum) {
      $Toast.info('当前正在排队')
      return
    }
    router.load('selectDots')
  }

  checkRecond = (num) => {
    if(num === 1) {
      router.load("numRecord")
      return
    }
  }

  clickItem = (index) => {
    switch(index) {
      case 0: 
        if(window.$globalThemeType == 'green'){
          router.load('cloudDotsGreen',0)
        }
        if(window.$globalThemeType == 'blue'){
            router.load('cloudDots',0)
        }
        break;
        
      case 1: 
        if(window.$globalThemeType == 'green'){
          router.load('cloudDotsGreen',1)
        }
        if(window.$globalThemeType == 'blue'){
            router.load('cloudDots',1)
        }
        break;
      
      case 2: 
        if(window.$globalThemeType == 'green'){
          router.load('cloudDotsGreen',2)
        }
        if(window.$globalThemeType == 'blue'){
            router.load('cloudDots',2)
        }
        break;
      case 3: 
        // router.load('comingSoon')
        break;
      case 4: 
        break;
      case 5: 
        // router.load('comingSoon')
        break;
      case 6: 
        // router.load('comingSoon')
        break;
      case 7: 
        // router.load('comingSoon')
        break;
      
    }
  }

  click = () => {
    if(window.$globalThemeType == 'green'){
      router.load('cloudDotsGreen')
    }
    if(window.$globalThemeType == 'blue'){
        router.load('cloudDots')
    }
  } 

  componentWillUnmount() {
    // window.bankInfo = null,
    window.hasNum = false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1,
    position: 'relative'
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    alignItems: "center",
    justifyContent: 'flex-end',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    
  },
  modalItem: {
    width: '100%',
    height: 50,
    borderRadius:5,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center"
  },
  itemFont: {
    fontSize: 18,
    color: "deepskyblue"
  },
  record: {
    height: 45,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  recordFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#333333',
    lineHeight: 21
  },
  container1: {
    width: '100%',
    backgroundColor: '#fff',
  },
  main: {
    alignItems: "center",
    height: 203,
    paddingTop: 39,
    paddingBottom: 16,
  },
  main1: {
    height: 193,
    backgroundColor: '#fff',
  },
  allDot: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
  },
  allDotFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    lineHeight: 21,
    color: '#333333',
  },
  titleFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 24,
    color: '#333333',
    letterSpacing: 0.29,
    lineHeight: 33
  },
  orangeFont: {
    // color: '#E09332',
    color: $globalStyle.transfer.textColor,
    fontSize: 12,
    borderWidth: 1,
    // borderColor: '#E09332',
    borderColor: $globalStyle.transfer.textColor,
    textAlign: "center",
    paddingHorizontal: 5,
    borderRadius: 4
  },
  orangeFont1: {
    fontFamily: 'PingFangSC-Regular',
    lineHeight: 21,
    fontSize: 15,
    // color: '#E68A16',
    color: $globalStyle.transfer.textColor,
    letterSpacing: 0.18,
    paddingHorizontal: 8
  },
  eleFont: {
    width: '50%',
    fontFamily: 'PingFangSC-Regular',
    lineHeight: 21,
    fontSize: 15,
    color: '#999',
    letterSpacing: 0.18,
  },
  ensure: {
    width: 142,
    height: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8
  },
  ensureFont: {
    color: '#fff',
    fontFamily: 'PingFangSC-Medium',
    lineHeight: 21,
    fontSize: 15,
  },
  extraFont: {
    marginTop: 24,
    lineHeight: 18,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#666666',
    letterSpacing: 0.16
  },
  cont1: {
    height: 108,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 16
  },
  cont1Font1: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#666666',
    letterSpacing: 0.18,
    lineHeight: 21
  },
  cont1Font2: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 24,
    color: '#333333',
    letterSpacing: 0.29,
    lineHeight: 33,
    fontWeight: 'bold'
  },
  cont2: {
    paddingVertical: 16,
    paddingLeft: 20
  },
  title: {
    height: 77,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-start'
  },
  textView: {
    height: 40,
    paddingHorizontal: 9,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 9,
    borderRadius: 8,
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 21,
  },
  item: {
    height: 92,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
    paddingTop: 14
  },
  itemFont1: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginTop: 4,
    paddingTop: 6,
    fontWeight: 'bold'
  },  
  itemCon: {
    flexDirection: "row",
    flexWrap: 'wrap',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  }
})

const BUSINFO = [
  {
    img: LICAI,
    title: '理财'
  },
  {
    img: MIMACHONGZHI,
    title: '密码重置'
  },
  {
    img: KAGUASHI,
    title: '卡挂失'
  },
  {
    img: GERENZILIAO,
    title: '修改个人资料'
  },
  {
    img: ZHUANZHANG,
    title: '转账'
  },
  {
    img: DAIKUANG,
    title: '赞E贷'
  },
  {
    img: MAMAJIESUO,
    title: '密码解锁'
  },
  {
    img: LIANXIFANGSHI,
    title: '修改联系方式'
  },
  
]