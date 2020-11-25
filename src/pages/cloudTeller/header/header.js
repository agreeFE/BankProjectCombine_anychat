import React, { Component } from 'react'

import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  StyleSheet,
  NativeModules,
  Platform
} from 'react-native'

import { BACK } from '../imageSource/index'

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default class Header extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      isShow: false
    }
  }

  render() {
    let { title } = this.props
    return (
      <View style={styles.header}>
        <View style={styles.headers}>
          <TouchableWithoutFeedback onPress={this.back}>
            <View style={[styles.leftIcon, {paddingLeft: 24}]}>
              <Image source={BACK}  style={{width: 9, height: 15}}></Image>
            </View>
          </TouchableWithoutFeedback>
          <View style={{flex: 1}}>
            <Text style={styles.font}>{title}</Text>
          </View>
        </View>
      </View>
    )
  }

  back() {
    // $Router.back()
    // alert('back')
  }
  show() {
    // this.setState({isShow: !this.state.isShow})
    // alert('show')
  }
}

const styles = StyleSheet.create({
  headers: {
    height: '100%',
    width: '100%',
    flexDirection: "row",
    alignItems: "center"
  },
  header: {
    height: 79,
    paddingTop: STATUSBAR_HEIGHT,
    position: "relative"
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
   	width: '100%',
   	height: '100%'
  },
  font: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0.2,
    textAlign: 'center',
    lineHeight: 24
  },
  leftIcon: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  rightIcon: {
    alignItems: "flex-end",
    paddingRight: 24,
  }
})
