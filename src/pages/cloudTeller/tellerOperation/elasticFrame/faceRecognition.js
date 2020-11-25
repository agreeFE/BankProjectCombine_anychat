//人脸识别
// 

import React, { Component } from 'react'

import { View, Text,StyleSheet,Image } from 'react-native'
import Close from './close'
import Title from './title'
import { FACE } from './imageSource/imageSource'

module.exports = class FaceRecognition extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Close show={false} callBackHome = {()=> {this.props.callBackHome()}}>
        <Title title={'人脸识别'}></Title>
        <View style={{alignItems: 'center'}}>
          <Image source={FACE} style={{width: 327, height: 327, marginTop: 32}}></Image>
          <Text style={styles.font}>正在进行人脸识别，请您将脸部正面对准摄像头</Text>
        </View>
      </Close>
    )
  }

  componentDidMount() {
    setTimeout(()=>{
      this.props.callBackHome('子组件点击了一下')
    },3000)
  }
}

const styles = StyleSheet.create({
  font: {
    marginTop: 20,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#666666',
    letterSpacing: 0.18,
    lineHeight: 24
  }
})
