import React, { Component } from 'react'

import {
  View,
  Animated,
  Easing,
  StyleSheet
} from 'react-native'

import { BG } from './imgSource'

export default class CloudBg extends Component {
  static defaultProps = {
    style: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      opacityValue: new Animated.Value(1)
    }
    this.startAnimated = this.startAnimated.bind(this)
  }

  render() {
    let { style } = this.props
    let { opacityValue } = this.state
    return (
      <View style={[styles.container,style]}>
        <View style={styles.imageCon}>
        <Animated.Image
          source={BG}
          style={[
            styles.image,
            {
              opacity: opacityValue.interpolate({
                inputRange: [0,0.25,0.5,0.75,1],
                outputRange: [1,0.3,1,0.3,1],
              })
            }
          ]}

        ></Animated.Image>
        </View>
        {this.props.children}
      </View>
    )
  }

  componentDidMount() {
    this.startAnimated()
  }

  startAnimated() {
    this.state.opacityValue.setValue(1)
    Animated.timing(this.state.opacityValue,{
      toValue: 0,  //角度从0变1
      duration: 3000,  //从0到1的时间
      easing: Easing.out(Easing.linear),//线性变化，匀速旋转
    }).start(() => this.startAnimated())
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#131417',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageCon: {
    position: "absolute",
    top: 0, 
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1
  }
})
