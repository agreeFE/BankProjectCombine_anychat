import React, { Component,  } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import router from '$/router-control'
import "$/window"

class repaymentTable extends Component {
  state = {
  }
  componentDidMount() {
    this.setState(
      { ...this.props.item }
    )
  }
  toWebViewMore = () => {
    router.load('webview', {
      url: `http://${window.financialURL}/licaiProduct/dayDayGood.html?rate=${this.state.rate}&limit=${this.state.limit || ""}&theme=${window.$globalStyle.themeType}&fund=true&day=${this.state.day}&name=${this.state.kind}`,
      title: this.state.kind
    })
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.toWebViewMore}>
        <View style={styles.wrapper}>
          {/* 利率，年化收益 */}
          <View style={styles.headerArea}>
            <Text style={styles.formatOne}>{this.state.rate}
              <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 12, letterSpacing: 0.14, }}>%</Text>
            </Text>
            <Text style={styles.formatTwo}>{this.state.day}</Text>
          </View>
          {/* 资金数据明细 */}
          <View style={styles.financialDetailArea}>
            <Text style={styles.formatThree}>{this.state.intro}</Text>
            <Text style={styles.formatFour}>{this.state.kind}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  formatOne: {
    fontSize: 22,
    color: '#DA8C2A',
    fontFamily: 'PingFangSC-Medium',
    letterSpacing: 0.24,
    lineHeight: 28
  },
  formatTwo: {
    fontSize: 12,
    color: '#DA8C2A'
  },
  formatThree: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  formatFour: {
    fontSize: 13,
    color: '#666'
  },
  financialDetailArea: {
    marginLeft: 27.5,
    height: 44,
    paddingTop: 3,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerArea: {
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 4,
    minWidth: 80
  },
  wrapper: {
    backgroundColor: '#fff',
    minWidth: '93%',
    padding: 16,
    paddingLeft: 0,
    borderRadius: 10,
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'flex-start'
  }
})
export default repaymentTable;