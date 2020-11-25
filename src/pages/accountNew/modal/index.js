import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  
  TouchableWithoutFeedback
} from 'react-native'
const router = require('$/router-control')
const Modal = (props) => {
  const { fnc = () => {}, cardNum } = props
  return (
    <View style={styles.container}>
      <Text style={[styles.item,styles.text1]} onPress={() => {click(1, cardNum)}}>转账汇款</Text>
      <Text style={[styles.item,styles.text2]} onPress={() => {click(2, cardNum)}}>收支明细</Text>
      <Text style={[styles.item,styles.text3]} onPress={() => {click(3)}}>购买理财</Text>
      <Text style={[styles.item,styles.cancel]} onPress={() => {fnc()}}>取消</Text>
    </View>
  )
}

class Modals extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { fnc } = this.props
    return (
      <View style={styles.container}>
        <Text style={[styles.item,styles.text1]} onPress={() => {click(1)}}>转账汇款</Text>
        <Text style={[styles.item,styles.text1]} onPress={() => {click(2)}}>收支明细</Text>
        <Text style={[styles.item,styles.text1]} onPress={() => {click(3)}}>购买理财</Text>
        <Text style={[styles.item,styles.cancel]} onPress={() => {fnc()}}>取消</Text>
      </View>
    )
  }
}
 
const click = (num, cardNum) => {
  switch(num) {
    case 1: 
      window.transferType = '1'
      router.load('transferInfo',{cardNum})
      break;
    case 2:
      router.load('balance', {cardNum})
      break;
    case 3: 
      router.load('webview', {
        url: `http://${window.financialURL}/licaiProduct/financialProduct.html`
      })
      break;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.30)',
    justifyContent: 'flex-end',
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 12,
    zIndex: 10
  },
  item: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    textAlign: "center",
    lineHeight: 50,
    fontSize: 18,
    color: '#293478',
    fontFamily: 'PingFangSC-Regular',
  },
  cancel: {
    borderRadius: 12,
    marginTop: 8,
    fontFamily: 'PingFangSC-Medium',
  },
  text1: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 1
  },
  text2: {
    marginBottom: 1
  },
  text3: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },

})


export default Modal