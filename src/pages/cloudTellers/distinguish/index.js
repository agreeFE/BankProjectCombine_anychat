import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class Distinguish extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    // if (nextProps.id !== prevState.prevId) {
    //   return {
    //     externalData: null,
    //     prevId: nextProps.id,
    //   };
    // }
    // return null;
    // console.warn( JSON.stringify( nextProps.SpeechRecognitionvolume ) );
    return {
      value:nextProps.value
    }
  }

  render() {
    return (
      <View style={{paddingLeft: 30}}>
        <Text style={styles.font}>你说吧，我在听哦～</Text>
        <Text style={styles.fontText}>{this.state.value}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 26,
    color: '#E1E1E1',
    textAlign: 'justify',
    lineHeight: 37
  },
  fontText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#E1E1E1',
    textAlign: 'justify',
    lineHeight: 37
  }
})
