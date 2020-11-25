//  呼吸灯
// 传参： style    object   父容器的样式
//       showText  boolean  是否显示文字
//       fnc       function 点击事件
// 


import React, { PureComponent,  } from 'react'
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native'
import { INNER, OUTER } from './imageSource'
 
export default class BreathLamp extends PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      rotateValue: new Animated.Value(0),
      opacityValue: new Animated.Value(1),
      bounceValue: new Animated.Value(1),  
    }
    this.startAnimated = this.startAnimated.bind(this)
  }

  render() {
    let { style = {}, fnc = () => {} } = this.props
    let { rotateValue, opacityValue, bounceValue } = this.state
    return (
      <View style={[styles.container,style]}>
        <TouchableWithoutFeedback onPress={() => {fnc()}}>
          <View style={styles.container}>
            {
              this.props.showText ? 
              <Text style={[styles.nomalFont,{fontSize: 15,lineHeight: 21}]}>点击说话</Text>
              :
              <></>
            }
            <View style={styles.image}>
              <Animated.Image source={OUTER}
                style={{position: 'absolute',
                  width: 95,
                  height: 95,
                  opacity: opacityValue.interpolate({
                    inputRange: [0,0.25,0.5,0.75,1],
                    outputRange: [0.3,1,0.3,1,0.3],
                  })
                }}
              >
              </Animated.Image>
              
              <Animated.Image source={INNER} 
                style={{
                  width: 61,
                  height: 62,
                  transform: [
                    {rotateZ: rotateValue.interpolate({
                      inputRange: [0,1],
                      outputRange: ['0deg','360deg'],
                    })},
                    {scale: bounceValue.interpolate({
                      inputRange: [0,0.25,0.5,0.75,1],
                      outputRange: [1,0.7,1,0.7,1],
                    })}
                  ],
                  opacity: opacityValue.interpolate({
                    inputRange: [0,0.25,0.5,0.75,1],
                    outputRange: [1,0.3,1,0.3,1],
                  })
                }}
              ></Animated.Image>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  
  componentDidMount() {
    this.startAnimated()
  }

  startAnimated() {
    this.state.rotateValue.setValue(0)
    this.state.opacityValue.setValue(1)
    this.state.bounceValue.setValue(1)
    Animated.parallel([
      Animated.timing(this.state.rotateValue, {
        toValue: 1,  //角度从0变1
        duration: 8000,  //从0到1的时间
        easing: Easing.out(Easing.linear),//线性变化，匀速旋转
      }),
      Animated.timing(this.state.opacityValue, {
        toValue: 0,  //角度从0变1
        duration: 8000,  //从0到1的时间
        easing: Easing.out(Easing.linear),//线性变化，匀速旋转
      }),
      Animated.timing(this.state.bounceValue, {
        toValue: 0,      //变化目标值，也没有变化
        friction: 20,    //friction 摩擦系数，默认40
        duration: 8000,  //从0到1的时间
        easing: Easing.out(Easing.linear),//线性变化，匀速旋转
      })
    ])
    .start(() => this.startAnimated())
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  image: {
    width: 95, 
    height: 95,
    justifyContent: "center", 
    alignItems: "center", 
    position: "relative"
  },
  nomalFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 20,
    color: '#E1E1E1',
    textAlign: 'justify',
    lineHeight: 28
  },
})
