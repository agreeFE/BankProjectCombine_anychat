/*
 * 
 * 扇形组件
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

import Wedge from './wedge/wedge'

const {
  Surface,
  Shape, Path//  一个矩形可渲染的区域，是其他元素的容器
} = ART;

const width = 245, height = 245;
const radius = 122.5, rangeWidth = 56
const originY = 0
// const originX = (width - radius * Math.cos(20 * Math.PI / 180) * 2) / 2
const originX = 0


const Wedges = Animated.createAnimatedComponent(Wedge)

export default class Range extends Component {

  constructor(props) {
    super(props)
    this.state = {
      circleAnim: new Animated.Value(0)
    }
  }


  render() {
    let { circleAnim } = this.state
    return (
      <View style={styles.body}>
        <Surface width={width} height={height}>
            <Wedges
              outerRadius={radius}
              innerRadius={radius - rangeWidth}
              startAngle={0}
              endAngle={270}
              originX={originX}
              originY={originY}
              fill={'#F5972C'} />
          {/* <Shape d={path} stroke="#000000" strokeWidth={1}/> */}
        </Surface>
        <View style={[styles.contentView, {
          width: (this.props.radius - this.props.annularHeight) * 2,
          height: (this.props.radius - this.props.annularHeight) * 2,
          left: this.props.annularHeight,
          top: this.props.annularHeight
        }]}
        >
          {this.props.children}
        </View>
      </View>
    )
  }

  circleAnimate = () => {
    // alert(`${this.props.curIndex}`)
    // if (index == this.props.curIndex) {
      Animated.timing(
        this.state.circleAnim,
        {
          toValue: 160,
          duration: 600
        }).start()
    // }
  }


  getPosition(angle) {
    let x = originX + radius * Math.cos(20 * Math.PI / 180)
    let y = originY - radius - radius * Math.sin(20 * Math.PI / 180)
    let ox, oy
    let cha = Math.abs(angle)
    if (angle > 0) {
      ox = x + radius * Math.sin(cha * Math.PI / 180)
    } else {
      ox = x - radius * Math.sin(cha * Math.PI / 180)
    }
    oy = y + radius - radius * Math.cos(cha * Math.PI / 180)
    return { ox, oy }
  }

  // setValue(props) {
  //   let arr = props.arr
  //   let data = arr.reduce((prev, value) => {
  //     return prev + value.money
  //   }, 0)
  //   let array = [-110]
  //   for (let i = 0; i < arr.length; i++) {
  //     array.push(array[i] + 220 * arr[i].money / data)
  //   }
  //   let animatedArr = []
  //   for (let i = 0; i < arr.length; i++) {
  //     animatedArr.push(new Animated.Value(array[i]))
  //   }
  //   return {
  //     arr, // 初始化及颜色
  //     array, // 所有的角度
  //     animatedArr // 初始化动画
  //   }
  // }
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  contentView: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
})

Range.defaultProps = {
  radius: 24,
  annularHeight: 1,
  startAngle: 1, // 0 - 1
  currentAngle: 0, // 0 - 1
  bgColor: '#E4E6F3',
  selectColor: '#F5972C'
};