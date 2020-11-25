import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from "react-native-linear-gradient"

import { FAIL_FACE } from '../../imageSource'

export default class Fail extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { back, again } = this.props
    return (
      <View style={styles.container}>
        <ImageBackground source={FAIL_FACE} style={{width: 60, height: 60}}></ImageBackground>
        <Text style={styles.textFont}>对不起，人脸识别不通过</Text>
        <View style={styles.chosen}>
          <TouchableWithoutFeedback onPress={back}>
            <View style={styles.chosenItem}>
              <Text style={styles.itemFont}>放弃识别</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={again}>
            <LinearGradient style={styles.chosenItem} colors={['#E9962F', '#FFC67E']}>
              <Text style={[styles.itemFont,{color: '#fff'}]}>重新识别</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 89
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#DCDCDC',
    lineHeight: 22,
    marginTop: 27
  },
  chosen: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 35,
    paddingRight:35,
    width: '100%',
    height: 35,
    marginTop: 60
  },
  chosenItem: {
    width: 142,
    height: 35,
    borderWidth: 1,
    borderColor: '#EFA243',
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  itemFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#E79A3B',
    lineHeight: 21
   }
})
