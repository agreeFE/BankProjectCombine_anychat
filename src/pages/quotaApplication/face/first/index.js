import React, { Component } from 'react'

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import { FACE1 } from '../../imageSource'

export default class First extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { fnc } = this.props
    return (
      <View style={sty.container}>
        <View style={{alignItems: "center"}}>
          <ImageBackground source={FACE1} style={{width: 160, height: 160}}></ImageBackground>
          <Text style={sty.headerFont}>为了保障您的资金安全，需识别本人脸部</Text>
        </View>
        <View style={{alignItems: "center"}}>
          <View style={{paddingLeft: 24, paddingRight: 21}}>
            <Text style={sty.font}>温馨提示：不能低头仰拍；不能遮挡脸部；眼镜不能反光</Text>
          </View>
          <TouchableWithoutFeedback onPress={fnc}>
            <LinearGradient style={sty.ensure} colors={$globalStyle.buttonLinerBackground}>
              <Text style={sty.ensureFont}>开始识别</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const sty = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 37,
    paddingBottom: 44,
    alignItems: 'center'
  },
  headerFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#DCDCDC',
    lineHeight: 22,
    marginTop: 24
  },
  font: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999999',
    lineHeight: 21,
    textAlign: 'left'
  },
  ensure: {
    width: 335,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  ensureFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 24
  },
})
