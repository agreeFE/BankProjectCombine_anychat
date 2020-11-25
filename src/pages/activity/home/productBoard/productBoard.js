import React, { Component,  } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import router from '$/router-control'
import { BoxShadow } from 'react-native-shadow'
import "$/window"
import { ITEMBG } from '../../imageSource'

const shadowOpt = {
  width: 108,
  height: 127,
  color: "#eee",
  border: 3,
  radius: 0,
  opacity: 1,
  x: 0,
  y: 0,
  style: { backgroundColor: '#fff' }
}

class productBoard extends Component {
  state = {}
  componentDidMount() {
    this.setState(
      { ...this.props.item }
    )
  }
  toWebViewMore = () => {
    router.load('webview', {
      url: `http://${window.financialURL}/licaiProduct/dayDayGood.html?rate=${this.state.rate}&limit=${this.state.limit}&theme=${window.$globalStyle.themeType}&day=${this.state.day}&name=${this.state.kind}`,
      title: this.state.kind
    })
  }
  render() {
    let { rate, day, intro, kind } = this.state
    return (
      <ImageBackground style={{ width: 120, height: 136 }} source={ITEMBG}>
        <TouchableWithoutFeedback onPress={this.toWebViewMore}>
          <View style={styles.wrapper}>
            <View style={styles.topText}>
              <Text style={styles.formatOne}>{intro}</Text>
              <Text style={styles.formatTwo}>{kind}</Text>
            </View>
            <View style={styles.bottomText}>
              <Text style={styles.formatThree}>{rate}
                <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 12, letterSpacing: 0.14, }}>%</Text>
              </Text>
              <Text style={styles.formatFour}>{day}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  formatOne: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold'
  },
  formatTwo: {
    fontSize: 13,
    color: '#666',
    marginTop: 4
  },
  formatThree: {
    fontSize: 20,
    color: '#DA8C2A'
  },
  formatFour: {
    fontSize: 12,
    color: '#DA8C2A',
    marginTop: 3
  },
  bottomText: {
    marginTop: 10
  },
  wrapper: {
    // width: 108,
    // height: 127,
    // backgroundColor: '#fff',
    flex: 1,
    paddingTop: 16,
    paddingLeft: 14,
  }
})
export default productBoard;