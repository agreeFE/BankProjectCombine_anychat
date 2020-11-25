import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image
} from 'react-native';
import { CIRCLE_BG } from '../imageSource'
import { HcdWaveView } from './HcdWaveView'

module.exports = class App extends Component {
  state = {
    powerPercent: 0
  }
  componentDidMount() {
    var timer = setInterval(() => {
      var percent = this.state.powerPercent;
      if (percent < 107) {
        percent += 1
      } else {
        clearInterval(timer)
      }
      this.setState({
        powerPercent: percent
      })
    }, 50)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent:"center",alignItems: 'center',marginTop:89}}>
          <Image source={CIRCLE_BG} style={styles.waveWrapper}></Image>
          <HcdWaveView
            surfaceWidth={180}
            surfaceHeigth={180}
            powerPercent={this.state.powerPercent}
            type="dc"
          ></HcdWaveView>
        </View>
        <View>
          <Text style={styles.formatTip}>正在识别</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  waveWrapper: {
    width: 120,
    height: 120,
    zIndex: 999999,
    position:'absolute'
  },
  formatTip: {
    fontSize: 18,
    color: '#EFA345',
    marginTop: 10
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
    alignContent: 'center'
  }
});
