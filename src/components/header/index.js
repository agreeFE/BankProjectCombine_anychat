// header组件 
// 参数
//titleStyle 头部信息的style  object
// leftClick 头部左边点击事件
// leftIconStyle 左边图形样式
// leftIcon 左边图形
// rightClick 右边点击事件
// rightIconStyle 右边图形样式
// rightIcon 右边图形
// imageBackground 背景图
// title 头部信息 string
// height 头部高度 number


import React, { PureComponent,  } from 'react'
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Text,
  Image,
  StyleSheet,
  NativeModules,
  Platform
} from 'react-native'

import PropTypes from 'prop-types'
import { BACK, ELLIPSIS, BACK_BG_HEAD } from './imageSource'
import SVG from "$/components/Svg";

const { StatusBarManager } = NativeModules
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT

export default class Header extends PureComponent {
  
  static propTypes = {
    // textAlign: PropTypes.string,
    leftClick: PropTypes.func,
    rightClick: PropTypes.func,
    leftIconStyle: PropTypes.object,
    rightIconStyle: PropTypes.object,
    leftIcon: PropTypes.any,
    rightIcon: PropTypes.any,
    imageBackground: PropTypes.any,
    title: PropTypes.string,
    height: PropTypes.number,
    titleStyle: PropTypes.object,
    headerStyle: PropTypes.object,
    showRightIco: PropTypes.bool,
    showBackGround: PropTypes.bool,
    showLeftIco: PropTypes.bool
  }
  static defaultProps = {
    // textAlign: 'center',
    title: '',
    height: 65,
    imageBackground: BACK_BG_HEAD,
    leftIcon: BACK,
    rightIcon: ELLIPSIS,
    leftIconStyle: {
      width: 9, height: 15
    },
    rightIconStyle: {
      width: 22, height: 4
    },
    leftClick: () => { },
    rightClick: () => { },
    titleStyle: {},
    headerStyle: {},
    showLeftIco: true,
    showBackGround: true,
    showRightIco: false
  }
  constructor(props) {
    super(props)
  }
  render() {
    const { leftIcon, rightIcon, leftIconStyle, rightIconStyle, imageBackground,
      title, height, titleStyle, headerStyle, showBackGround, showLeftIco, showRightIco } = this.props
    // console.warn('tag', typeof showLeftIco)
    return (
      !showBackGround ?
        <View style={headerStyle}>
          <TouchableNativeFeedback onPress={this.leftClick}>
            <View style={{ position: 'absolute', width: 100, backgroundColor: 'transparent', top: STATUSBAR_HEIGHT, left: 0, bottom: 0, zIndex: 9999 }}></View>
          </TouchableNativeFeedback>
          {
            showRightIco ?
              <TouchableNativeFeedback onPress={this.rightClick}>
                <View style={{ position: 'absolute', width: 100, backgroundColor: 'transparent', top: STATUSBAR_HEIGHT, right: 0, bottom: 0, zIndex: 9999 }}></View>
              </TouchableNativeFeedback>
              : null
          }
          {/* <ImageBackground source={imageBackground} style={[styles.container,{height}]}> */}
          <View style={[styles.container, { height }]}>
            <View style={[styles.header, { paddingBottom: (height - STATUSBAR_HEIGHT) / 4 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={[styles.icon, { paddingLeft: 24, alignItems: 'center' }]}>
                  {
                    showLeftIco ?
                      !leftIcon ?
                        <></>
                        :
                        <SVG source={leftIcon} style={leftIconStyle}></SVG>
                      : null
                  }
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.font, titleStyle]}>{title}</Text>
                </View>
                <View style={[styles.icon, { paddingRight: 24, alignItems: 'flex-end' }]}>
                  {
                    showRightIco ?
                      !rightIcon ?
                        <></>
                        :
                        <SVG source={rightIcon} style={rightIconStyle}></SVG>
                      : null
                  }
                </View>
              </View>
            </View>
            {this.props.children}
          </View>
          {/* </ImageBackground> */}
        </View>
        :
        <View style={headerStyle}>
          <ImageBackground source={imageBackground} style={[styles.container, { height }]}>
            <TouchableNativeFeedback 
            onPress={this.leftClick}
            >
              <View style={{ position: 'absolute', width: 100, backgroundColor: 'transparent', top: STATUSBAR_HEIGHT, left: 0, bottom: 0, zIndex: 9999 }}></View>
            </TouchableNativeFeedback>
            {
              showRightIco ?
                <TouchableNativeFeedback onPress={this.rightClick}>
                  <View style={{ position: 'absolute', width: 100, backgroundColor: 'transparent', top: STATUSBAR_HEIGHT, right: 0, bottom: 0, zIndex: 9999 }}></View>
                </TouchableNativeFeedback>
                : null
            }
            <View style={[styles.header, { paddingBottom: (height - STATUSBAR_HEIGHT) / 4 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={[styles.icon, { paddingLeft: 24, alignItems: 'center' }]}>
                  {
                    showLeftIco ?
                      !leftIcon ?
                        <></>
                        :
                        <SVG source={leftIcon} style={leftIconStyle}></SVG>
                      : null
                  }
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.font, titleStyle]}>{title}</Text>
                </View>

                <View style={[styles.icon, { paddingRight: 24, alignItems: 'flex-end' }]}>
                  {
                    this.props.showRightIco !== false ?
                      !rightIcon ?
                        <></>
                        :
                        <SVG source={rightIcon} style={rightIconStyle}></SVG>
                      : null
                  }
                </View>
              </View>
            </View>
            {this.props.children}
          </ImageBackground>
        </View>
    )
  }
  leftClick = () => {
    this.props.leftClick();
    // const { leftClick } = this.props
    //   leftClick()
  }
  rightClick = () => {
    const { rightClick } = this.props
    rightClick()
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // paddingTop: STATUSBAR_HEIGHT,    
    alignItems: 'center',
    justifyContent: 'center'

  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  icon: {
    width: 50,
    height: 15,
    justifyContent: "center",
    alignItems: 'flex-end',
  },
  font: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0.2,
    lineHeight: 24,
    textAlign: 'center',
  },

})
