import React, { Component,  } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import WaveLoading from '../../waveLoading'

export default class Third extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <WaveLoading></WaveLoading>
      </>
    )
  }

  componentDidMount() {
    const { fnc } = this.props
    setTimeout(() => {
      fnc()
    }, 7000)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 89
  },
  font: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: '#EFA345',
    lineHeight: 25,
    marginTop: 32
  }
})
