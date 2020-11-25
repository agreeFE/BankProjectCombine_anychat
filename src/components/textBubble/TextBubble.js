import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  
} from 'react-native'
import PropTypes from 'prop-types';
import BouncingBall from './BouncingBalls'
class TextBubble extends Component {
  constructor(props) {
    super(props)
    // 处理泡泡的随机图片
    // 泡泡图片路径
    let bubble = [
      { path: require('$image/speechRecognition/pink.png'), color: '#FD98CA' },
      { path: require('$image/speechRecognition/green.png'), color: '#5DE5B7' },
      { path: require('$image/speechRecognition/blue.png'), color: '#40ADF4' },
      { path: require('$image/speechRecognition/blue.png'), color: '#40ADF4' },
      { path: require('$image/speechRecognition/yellow.png'), color: '#F1EE7E' }
    ];
    // 处理业务字段
    let businessText = props.businessText,
        businessTextArr = [];
    businessTextArr = [businessText.substring(0, 2), businessText.substring(2)]
    this.state = {
      bubbleSize: props.bubbleSize,
      businessText: businessTextArr,
      curIndex: props.curIndex,
      bubble: bubble
    }
  }
  static PropTypes = {
    bubbleSize: PropTypes.number,
    businessText: PropTypes.string,
  }
  render() {
    let index = this.state.curIndex;
    let size = this.state.bubbleSize;
    return (
      <View style={styles.container} >
        <BouncingBall
          amount={1}
          animationDuration={2000}
          minSpeed={5}
          maxSpeed={20}
          minSize={size}
          maxSize={size}
          imageBall={this.state.bubble[index].path}
          style={{
            position: 'absolute', justifyContent: 'center', alignItems: 'center'
          }}
        >
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
              <Text style={[styles.businessText, { color: this.state.bubble[index].color }]}>{this.state.businessText[0]}</Text>
              <Text style={[styles.businessText, { color: this.state.bubble[index].color }]}>{this.state.businessText[1]}</Text>
            </View>
          </TouchableWithoutFeedback>
        </BouncingBall>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "28%",
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessText: {
    textAlign: "center",
    fontSize: 16,
  },
})

export default TextBubble;