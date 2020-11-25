/*
 * 
 * 进度条组件
 * 
 */


import React, { Component,  } from 'react'

import {
  View,
  ART,
  StyleSheet,
  Animated,
  Easing,
  Text
} from 'react-native'
import Wedge from './shape'

const {
  Surface, //  一个矩形可渲染的区域，是其他元素的容器
  Shape,
  Path
} = ART

const width = 110, height= 60

const Wedges = Animated.createAnimatedComponent(Wedge)

export default class Range extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      position: new Animated.Value(5),
      perent: 0.5
    }
  }
  render() {
    const { position } = this.state
    const path = Path().moveTo(5,55).arcTo(105, 55,50)
    return (
      <View style={styles.body}>
        <Surface width={width} height={height}>
          <Shape d={path} stroke={'#F5F5F5'} strokeWidth={10}></Shape>
          <Wedges position={position}></Wedges>
        </Surface>
      </View>
    )
  }
  
  static getDerivedStateFromProps(props,state) {
    if(props.perent === state.perent) {
      return null
    }
    return {
      perent: props.perent
    }
  }
  

  componentDidUpdate() {
    const { perent } = this.state
    Animated.timing(this.state.position,{
      toValue: 100 * perent + 5,
      duration: 500,
      easing: Easing.linear
    }).start()
  }
  
}




const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  }
})