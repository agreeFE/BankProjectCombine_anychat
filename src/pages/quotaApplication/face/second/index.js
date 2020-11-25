import React, { Component } from 'react'
import {
  ImageBackground,
  Text,
  View,
  StyleSheet
} from 'react-native'
import { FACE } from '../../imageSource'

export default class Second extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={FACE} style={{width: 240, height: 240}}></ImageBackground>
        <Text style={styles.font}>眨眨眼</Text>
      </View>
    )
  }

  componentDidMount() {
    const { fnc } = this.props
    setTimeout(()=> {
      fnc()
    },3000)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 44
  },
  font: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: '#EFA345',
    lineHeight: 25,
    marginTop: 40
  }
})
