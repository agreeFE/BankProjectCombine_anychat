import React, { Component,  } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground
} from 'react-native'
import { QUOTA_DELETE, SUCC } from './imageSource'
import Header from '$/components/header'
import scope from '$/scope'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const NUMBER = [
  {
    num: 1,
    exta: ''
  },
  {
    num: 2,
    exta: 'ABC'
  },
  {
    num: 3,
    exta: 'DEF'
  },
  {
    num: 4,
    exta: 'GHI'
  },
  {
    num: 5,
    exta: 'JKL'
  },
  {
    num: 6,
    exta: 'MNO'
  },
  {
    num: 7,
    exta: 'PQRS'
  },
  {
    num: 8,
    exta: 'TUV'
  },
  {
    num: 9,
    exta: 'WXYZ'
  },
]
module.exports = class componentName extends Component {
  constructor(props) {
    super(props)
    scope(this)
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap); 
    this.state = {
      value: [],
      focusIndex: 0,
      time: 61,
    }
  }
  
  interval = () => {
    let _this = this
    setInterval(() => {
      var timer = _this.state.time - 1
      if (timer === -1) {
        _this.interval && clearInterval(_this.interval)
      } else {
        _this.setState({ time: timer })
      }
    }, 1000)
  }

  render() {
    const { focusIndex, value, time } = this.state
    return (
      <View style={styles.container}>
        <Header
          title={'开通转账功能'}
          leftClick={() => {router.back()}}
        ></Header>
        <View style={styles.white}>
          <View>
            <View style={{flexDirection: 'row', paddingLeft: 24, marginTop: 24}}>
              <ImageBackground source={SUCC} style={{width: 18, height: 18}}></ImageBackground>
              <Text style={[styles.textFont1, {color: '#333', marginTop: 0, paddingLeft: 10}]}>刷脸成功，请继续办理业务。</Text>
            </View>
            <Text style={styles.titleFont}>请输入短信验证码</Text>
            <Text style={styles.textFont1}>已发送验证码至138****8190</Text>
            <View style={styles.input}>
              {
                (new Array(6).fill('')).map((item, index) => (
                  <View style={styles.item}>
                    {
                      index === focusIndex ?
                        <View style={styles.itemLine}></View>
                        :
                        <></>
                    }
                    <Text style={{ fontSize: 20 }}>{value[index]}</Text>
                  </View>
                ))
              }
            </View>
            <View style={{ paddingRight: 24, marginTop: 30, alignItems: 'flex-end' }}>
              {/* time=== 60 ? '获取 ： time===0 ？ '冲刺你' ： time秒后重新获取*/}
              <Text style={styles.textFont2} onPress={this.getCode}>{time == 61 ? `获取验证码` : time == 0 ? '重新获取' : `${time}秒后获取`}</Text>
              {/* <Text style={styles.textFont2} onPress={this.getCode}>{isGetAuthCode ? `重新获取（${time}）` : '获取验证码'}</Text> */}
            </View>
          </View>
          <View style={styles.keyboard}>
            <View style={styles.keyboard1}>
              {
                NUMBER.map((item, index) => (
                  <TouchableWithoutFeedback onPress={() => { this.clickNum(index + 1) }}>
                    <View style={styles.keyItem}>
                      <Text style={{ fontSize: 18 }}>{item.num}</Text>
                      <Text style={{ fontSize: 10 }}>{item.exta}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
            </View>
            <View style={styles.keyboard2}>
              <View style={[styles.keyItem, { backgroundColor: 'transparent' }]}></View>
              <TouchableWithoutFeedback onPress={() => { this.clickNum(0) }}>
                <View style={styles.keyItem}>
                  <Text style={{ fontSize: 18 }}>0</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { this.clickNum(-1) }}>
                <View style={[styles.keyItem, { backgroundColor: 'transparent' }]}>
                  <ImageBackground source={QUOTA_DELETE} style={{ width: 30, height: 20 }}></ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    )
  }

  clickNum = (number) => {
    const { focusIndex, value } = this.state
    if (number > -1 && value.length < 7) {
      value.push(number)
      this.setState({
        focusIndex: focusIndex + 1,
        value
      }, () => {
        if (this.state.value.length === 6) {
          router.replace('operatSuccess')
          // console.warn('tag', '')
        }
      })
    } else {
      value.pop()
      this.setState({
        focusIndex: focusIndex - 1 < 0 ? 0 : focusIndex - 1,
        value
      })
    }
  }

  getCode = () => {
    const {time} = this.state;
    if (time == 61) {
      this.interval()
    } else if(time == 0 ) {
      this.setState({
        value: [],
        focusIndex: 0,
        time: 59
      })
      // this.interval()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  white: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'space-between'
  },
  titleFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: '#333333',
    letterSpacing: 0.22,
    lineHeight: 25,
    paddingLeft: 24,
    marginTop: 40
  },
  textFont1: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999999',
    lineHeight: 21,
    paddingLeft: 24,
    marginTop: 8
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 28,
    paddingRight: 28,
    height: 40,
    marginTop: 48,
  },
  item: {
    position: 'relative',
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: '#CBD0E6',
    borderBottomWidth: 1,
    opacity: 0.8
  },
  itemLine: {
    position: 'absolute',
    width: 1,
    height: 20,
    backgroundColor: '#DCDCDC',
    top: 10,
    left: 20
  },
  textFont2: {
    letterSpacing: 0.18,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#E89020',
    lineHeight: 21,
    textDecorationLine: "underline",
    textDecorationColor: '#E89020',
    textDecorationStyle: 'solid'
  },
  keyboard: {
    height: 218,
    backgroundColor: '#D2D5DB',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6
  },
  keyboard1: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-between"
  },
  keyItem: {
    width: 113,
    height: 47,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 7
  },
  keyboard2: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
