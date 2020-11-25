import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  title: {
    marginTop: 32,
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 24,
    width: '100%',
    // backgroundColor: 'red'
  },
  left: {
    backgroundColor: '#E39634',
    width: 4,
    height: 16
  },
  font: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 17,
    color: '#333333',
    letterSpacing: 0.2,
    lineHeight: 24,
    marginLeft: 8,
    fontWeight: '900'
  }
})
 
const Title = (props) => {
  const { title } = props
  return (
    <View style={styles.title}>
      <View style={styles.left}></View>
      <Text style={styles.font}>{title}</Text>
    </View>
  )
}

export default Title