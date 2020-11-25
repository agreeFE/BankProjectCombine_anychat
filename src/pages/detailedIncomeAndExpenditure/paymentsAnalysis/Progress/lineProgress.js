import React, { PureComponent } from 'react';
import {
  View,
  ART,
  StyleSheet,
  Button,
  Text,
  Animated
} from "react-native"
var {
  Surface, //  一个矩形可渲染的区域，是其他元素的容器
  LinearGradient, // 颜色渐变
} = ART;

export default class Progress extends PureComponent {
  // 设置进度 取值范围 0 - 100
  setProgress = (progress) => {
    if (progress >= 100) return
    this.setState({
      progress: progress
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    }
  }

  render() {
    let {progress} = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.grounding}></View>
        <Animated.View style={[styles.progress,{width:progress}]}></Animated.View>
      </View>
    )
  }
  componentDidMount() {
    Animated.timing( // 随时间变化而执行动画
      this.state.progress, // 动画中的变量值
      {
        toValue: this.props.percent*220/100, // 
        duration: 1000, // 让动画持续一段时间
        // useNativeDriver: true
      }
    ).start();      
    return null  
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width: 220,
    height: 6,
    borderRadius: 3
  }, 
  grounding: {
    position: 'absolute',
    backgroundColor: '#E4E6F3',
    height: 6,
    borderRadius: 3,
    width: 220,

  },
  progress: {
    position: 'absolute',
    backgroundColor: $globalStyle.progressColor,
    height: 6,
    borderRadius: 3,
  }
});