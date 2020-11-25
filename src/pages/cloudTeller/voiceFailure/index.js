import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import BreathLamp from '$/components/breathingLamp'
import CloudBg from '$/components/cloudBg'

export default class VoiceFail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CloudBg>
        <View style={{height: 60, paddingTop: 20,paddingLeft: 24, alignItems: "flex-start"}}>
          <Text style={{color: '#fff'}}>{'<'}</Text>
        </View>
        <View style={{flex: 1,}}>
          <View style={{paddingLeft: 30}}>
            <Text style={styles.titleFont}>呜呜~小赞没听懂你的意思</Text>
            <Text style={[styles.nomalFont,{marginTop: 60}]}>你可以重新说话</Text>
            <View style={styles.extra}>
              <Text style={styles.nomalFont}>或者</Text>
              <Text 
                style={[styles.titleFont,styles.extraFont]}
                onPress={() => {}}
              >快速呼叫云柜员</Text>
            </View>
          </View>
          <BreathLamp style={{marginTop: 260}}></BreathLamp>
        </View>
      </CloudBg>
    )
  }

}


const styles = StyleSheet.create({
  titleFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 26,
    color: '#E1E1E1',
    textAlign: 'justify',
    lineHeight: 37
  },
  nomalFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 20,
    color: '#E1E1E1',
    textAlign: 'justify',
    lineHeight: 28
  },
  extraFont: {
    color: '#F139F6',
    paddingLeft: 12
  },
  extra: {
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 20
  }
})