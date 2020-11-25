import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import Header from '$/components/header'
import scope from '$/scope'
import GestureArea from '$/components/gesture-password2'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')

module.exports = class  extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      time: 1,
      lessLength: false,
      shake: false,
      firstPassword: '',
      translateValue: new Animated.Value(0),
    }
  }

  render() {
    const { lessLength, time, firstPassword, shake, translateValue } = this.state
    let arr = Array(9).fill(false)
    firstPassword.split('').map(item => {
      arr[item] = true
    })
    return (
      <View style={{flex: 1,}}>
        <Header
          title={'设置手势密码'}
          leftClick={this.back}
        ></Header>
        <View style={{alignItems: "center", marginBottom: 10, marginTop: 40 }}>
          <View style={{width: 60, height: 60, flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-around', alignItems: 'center'}}>
            {
              arr.map((item,index) => (
                <View style={{width: 20, height: 20, justifyContent: "center", alignItems: "center"}}>
                  <View style={{width: 16, height: 16, borderRadius: 8, backgroundColor: item ? 'rgba(0,170,239,1)': '#A9A9A9'}}></View>
                </View>
              ))
            }
          </View>
          <Text style={{marginTop: 10}}>{time === 1 ? '请绘制解锁图案': '请再次绘制解锁图案'}</Text>
          <Animated.Text 
            style={{color:'red', marginTop: 20,
              transform: [{translateX:translateValue.interpolate({
                inputRange: [0,0.2,0.4,0.6,0.8,1],
                outputRange: [0,10,-10,10,-10,0],
              })}]
            }}>
            {lessLength ? '最少连接4个点，请重新输入' : shake ? '两次团绘制不一致，请重新绘制' : ''}
          </Animated.Text>
        </View>
        <GestureArea onFinish={this._onFinish}></GestureArea>
      </View>
    )
  }

  back = () => {
    router.back()
  }

  _onFinish = (password) => {
    let {time, firstPassword} = this.state
    
    if(password.length < 4) {
      this.setState({
        lessLength: true
      })
      return
    } else {
      this.setState({
        lessLength: false,
      })
      if(time === 2 ) {
        if(password !== firstPassword) {
          this.setState({
            time: 1,
            firstPassword: '',
            shake: true
          })
          this.startAnimated()
          let timer = setTimeout(() => {
            this.setState({
              shake: false
            })
            clearTimeout(timer)
          }, 500);
        } else {
          this.setSucc(password)
        }
        return
      }
      this.setState({
        time: time + 1,
        firstPassword: password
      })
    }
  }

  startAnimated = () => {
    this.state.translateValue.setValue(0)
    Animated.timing(this.state.translateValue, {
      toValue: 1,  //角度从0变1
      duration: 500,  //从0到1的时间
      easing: Easing.out(Easing.linear),//线性变化，匀速旋转
    }).start()
  }

  setSucc = (password) => {
    let data = {}
    data.bioId = '123'
    data.gestureUnlock = 1
    NetworkUtil.networkService('/user/setting/gesture', data, (response) => {
      if (!response.token) {

      } 
      else {
        $Toast.success('设置成功')
        //保存人脸登录token
        $Storage.save({
          key: 'gestureToken',
          data: JSON.stringify(response.token)
        });
        $Storage.save({
          key: 'gesturePassword',
          data: password
        })
        let timer = setTimeout(() => {
          router.back()
          clearTimeout(timer)
        }, 500);
      }
    })
  }

}
const styles = StyleSheet.create({

})