/*
 * 
 * 扇形组件
 * 
 */


import React, { Component,  } from 'react'
// import LinearGradient from 'react-native-linear-gradient'

import {
  View,
  ART,
  StyleSheet,
  Animated,
  Easing,
  Text,
  BVLinearGradient,
  TouchableWithoutFeedback
} from 'react-native'

import PieChat from './pieChat'
const { Surface, Group, LinearGradient } = ART;

export default class MoneyInfo extends Component {
  constructor(props) {
    super(props)
    const { expendPercentArr } = this.props;
    this.state = {
      expendPercentArr: expendPercentArr,
    };
  }
  state = {
    expendType: "旅行",
    expendMoney: "1200.23",

  }
  static defaultProps = {
    expendPercentArr: []
  }
  static shouldComponentUpdate(nextProps, nextState) {
    this.forceUpdate()
  }
  componentWillUpdate() {

  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      expendPercentArr: nextProps.expendPercentArr
    })
  }
  render() {
    let Perimeter = Math.PI * 245 / 2;
    let linearGradient = new LinearGradient(window.$globalStyle.sectorColorConfig,
      // "0", "0", String(Perimeter) - 80, String(this.props.annularHeight)
      "0", "0", String(Perimeter) - 80, String(56)
    );
    return (
      <>
          <PieChat
            percentArray={this.state.expendPercentArr}
            colorArray={[linearGradient]}
            outerRadius={245 / 2}
            innerRadius={133 / 2}
            duration={1000}
          >
          </PieChat>
      </>
    )
  }
}

const styles = StyleSheet.create({
  capitalDisplay: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 133,
    height: 133,
    borderRadius: 133 / 2,
  },
  expendMoney: {
    fontSize: 15,
    color: '#3A3A3A',
    fontWeight: '700',
    marginTop: 5

  },
  expendType: {
    fontSize: 15,
    color: '#3A3A3A',
  },
})
