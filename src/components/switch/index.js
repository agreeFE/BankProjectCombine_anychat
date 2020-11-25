import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import _ from "lodash"
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, Animated, Easing } from 'react-native'

export default class Switch extends Component {
  static propTypes = {
    onValueChange: PropTypes.func,
    value: PropTypes.bool,
    trackColor: PropTypes.object
  }

  static defaultProps = {
    onValueChange: () => {},
    value: false,
    trackColor: {
      true: $globalStyle.backgroundColor,
      false: '#ccc'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      animatedLeft: new Animated.Value(1),
      stateValue: this.props.value
    }
  }

  render() {
    const { trackColor, value} = this.props
    let { animatedLeft, stateValue } = this.state
    if(!trackColor[false]) {
      trackColor[false] = '#ccc'
    }
    let conColor = trackColor[stateValue]
    if(stateValue) {
      animatedLeft.setValue(19)
    } else {
      animatedLeft.setValue(1)
    }
    return (
      <TouchableWithoutFeedback onPress={_.throttle(this.startAnimate, 3000)}>
        <View style={[styles.container, {backgroundColor: conColor}]}>
          <Animated.View style={[styles.scroll, {left: animatedLeft}]}></Animated.View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  startAnimate = () => {
    const { onValueChange } = this.props
    const { animatedLeft, stateValue } = this.state
    let toValue 
    
    if(stateValue) {
      animatedLeft.setValue(19)
      toValue = 1
    } else {
      animatedLeft.setValue(1)
      toValue = 19
    }
    Animated.timing(animatedLeft, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.linear)
    }).start(() => {
      this.setState({
        stateValue: !stateValue
      })
      onValueChange()
    })
  }

  static getDerivedStateFromProps(props, state) {
    if(props.value !== state.stateValue) {
      return {
        stateValue: props.value
      }
    } else {
      return null
    }
  }

}
const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#ccc',
    padding: 1,
    
    margin: 10,
  },
  scroll: {
    width: 28,
    height: 28, 
    borderRadius: 38,
    backgroundColor: '#fff',
    position: "absolute",
    top: 1,
    left: 1
  }
})