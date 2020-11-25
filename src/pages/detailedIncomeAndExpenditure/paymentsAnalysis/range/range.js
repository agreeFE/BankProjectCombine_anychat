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

import Wedge from './wedge/wedgeRange'

const {
  Surface,
  Shape, Path//  一个矩形可渲染的区域，是其他元素的容器
} = ART;

const width = 48, height = 48;
const radius = 24, rangeWidth = 2
const innerRadius = 22, innerRangeWidth = 2

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
    let { curIndex, curClickIndex } = this.props
    return (
      <View style={styles.body}>
        <Surface width={width} height={height}>
          <Wedge outerRadius={radius}
            innerRadius={radius - rangeWidth}
            startAngle={0}
            endAngle={360}
            originX={originX}
            originY={originY}
            fill="#E4E6F3"></Wedge>
          {
            curIndex == curClickIndex
              ?
                <Wedges
                  outerRadius={radius}
                  innerRadius={radius - rangeWidth}
                  startAngle={0}
                  endAngle={circleAnim}
                  originX={originX}
                  originY={originY}
                  fill={window.$globalStyle.circleColorConfig} />
              :
              <></>
          }
          {
            curIndex == curClickIndex
              ?
                <Wedges
                  outerRadius={innerRadius}
                  innerRadius={innerRadius - 2.5}
                  startAngle={0}
                  endAngle={circleAnim}
                  originX={2}
                  originY={2}
                  fill={window.$globalStyle.innerCircleColorConfig} />
              :
              <></>
          }

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

  circleAnimate = (index) => {
    let { curIndex, curClickIndex } = this.props
    this.state.circleAnim.setValue(0)
    Animated.timing(
      this.state.circleAnim,
      {
        toValue: 360,
        duration: 600
      }).start()
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