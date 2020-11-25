import React, { Component, } from 'react';
import { StyleSheet, Image, View, ScrollView, Button, Text, TouchableWithoutFeedback } from 'react-native';

import { Close, GOBACK } from './imageSource/imageSource';

class ServiceAgreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repaymentSchedule: [
        {
          year: '2019',
          showYear: false,
          month: '09-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2019',
          showYear: false,
          month: '10-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2019',
          showYear: false,
          month: '11-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2019',
          showYear: false,
          month: '12-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: true,
          month: '01-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '02-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '03-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '04-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '05-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '06-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '07-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '08-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '09-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '10-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '11-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2020',
          showYear: false,
          month: '12-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: true,
          month: '01-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: false,
          month: '02-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: false,
          month: '03-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: false,
          month: '04-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: false,
          month: '05-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: false,
          month: '06-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: false,
          month: '07-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: false,
          month: '08-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
        {
          year: '2021',
          showYear: false,
          month: '09-12',
          money: '9831.66',
          capital: '7831.66',
          interest: '2000.00'
        },
      ]
    }
  }
  goback = () => {
    this.props.callBackHome('Authentication')
  }
  render() {
    let end = this.state.repaymentSchedule.length;
    return (
      <View style={styles.container}>
        {/* <TouchableWithoutFeedback onPress={() => {this.props.callBackHome()}}> */}
        < TouchableWithoutFeedback onPress = {
          () => {
            this.props.callBackHome('Authentication')
          }
        } >
          <View style={styles.close}>
            <Image source={GOBACK}></Image>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.topPart}>
          {/* 还款总额 */}
          <View style={styles.paymentRowOne}>
            <Text style={styles.paymentTitle}>还款总额</Text>
            <Text style={styles.paymentMoney}>¥ 439,831.66</Text>
          </View>
          <View style={styles.paymentRowTwo}>
            {/* 年利率 */}
            <View style={styles.paymentLayout}>
              <Text style={styles.rateFormat}>年利率:</Text>
              <Text style={styles.rateFormat}>9.04%</Text>
            </View>
            {/* 利息总额 */}
            <View style={styles.paymentLayout}>
              <Text style={styles.rateFormat}>利息总额:</Text>
              <Text style={styles.rateFormat}>¥ 49831.66</Text>
            </View>

          </View>
          {/* 分割线 */}
          <View style={styles.lineBetween}></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bottomPart}>
            {
              this.state.repaymentSchedule.map((ele, index) => {
                return (
                  <View style={styles.repaymentSchedule}>
                    <View style={styles.repaymentMonth}>
                      {ele.showYear ? <Text style={styles.showYear}>{ele.year}</Text> : <></>}
                      <Text style={styles.repaymentMonthText}>{ele.month}</Text>
                    </View>
                    {
                      index === 0 ?
                        <View style={styles.topTimeAxle}>
                          <View style={styles.topAxleHide}></View>
                          <View style={styles.topCircle}></View>
                          <View style={styles.topAxle}></View>
                        </View> : index === end - 1 ?
                          <View style={styles.bottomTimeAxle}>
                            <View style={styles.bottomAxle}></View>
                            <View style={styles.bottomCircle}></View>
                            <View style={styles.bottomAxleHide}></View>
                          </View> :
                          <View style={styles.timeAxle}>
                            <View style={styles.axle}></View>
                            <View style={styles.circle}></View>
                          </View>
                    }
                    <View style={styles.moneyArea}>
                      <Text style={styles.repaymentMoney}>¥ <Text>{ele.money}</Text></Text>
                      <View style={styles.amountDisplay}>
                        <View style={styles.repaymentBox}>
                          <Text style={styles.repaymentFormat}>本金：</Text>
                          <Text style={styles.repaymentFormat}>{ele.capital}</Text>
                        </View>
                        <View style={styles.repaymentBox}>
                          <Text style={styles.repaymentFormat}>利息：</Text>
                          <Text style={styles.repaymentFormat}>{ele.interest}</Text>
                        </View>
                      </View>
                      <View style={styles.partingLine}></View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomAxleHide: {
    height: 40,
    width: 2,
    backgroundColor: '#F4F4F4',
  },
  bottomAxle: {
    height: 40,
    width: 2,
    backgroundColor: '#DFE2EE',
  },
  bottomTimeAxle: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    height: 80,
    marginLeft:-3
  },
  bottomCircle: {
    width: 8,
    height: 8,
    backgroundColor: '#DFE2EE',
    borderRadius: 4,
  },
  topAxleHide: {
    height: 40,
    width: 2,
    backgroundColor: '#F4F4F4',
  },
  topAxle: {
    height: 40,
    width: 2,
    backgroundColor: '#DFE2EE',
  },
  topTimeAxle: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    height: 80,
    marginLeft:-3
  },
  topCircle: {
    width: 8,
    height: 8,
    backgroundColor: '#DFE2EE',
    borderRadius: 4,
  },
  showYear: {
    fontSize: 13,
    color: '#999999',
    textAlign: 'right'
  },
  partingLine: {
    // borderBottomColor: '#E4E4E4',
    // borderBottomWidth: 1
  },
  amountDisplay: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  repaymentBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  repaymentFormat: {
    fontSize: 15,
    color: '#999999'
  },
  repaymentMoney: {
    fontSize: 17,
    color: '#333333',
    marginBottom: 8,
    marginTop: 16,
  },
  moneyArea: {
    marginLeft: 27,
    justifyContent: 'flex-start',
    height: "100%",
    width: '74%',
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1
  },
  timeAxle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80
  },
  circle: {
    width: 8,
    height: 8,
    backgroundColor: '#DFE2EE',
    borderRadius: 4,
    marginLeft: -5
  },
  axle: {
    height: 80,
    width: 2,
    backgroundColor: '#DFE2EE'
  },
  repaymentMonthText: {
    fontSize: 15,
    color: '#999999'
  },
  repaymentMonth: {
    marginRight: 12
  },
  repaymentSchedule: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lineBetween: {
    backgroundColor: '#E4E4E4',
    height: 1,
    width: 327,
    marginTop: 24
  },
  rateFormat: {
    fontSize: 15,
    color: '#E69228'
  },
  paymentLayout: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 4
  },
  paymentRowTwo: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  paymentRowOne: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  paymentMoney: {
    fontSize: 17,
    color: '#333333',
    marginLeft: 8
  },
  paymentTitle: {
    fontSize: 17,
    color: '#333333'
  },
  bottomPart: {
    marginTop: 0,
    width: '94%'
  },
  topPart: {
    marginTop: 33,
  },
  container: {
    backgroundColor: "#F4F4F4",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    left: 16,
    top: 22,
    zIndex:30
  }
})

module.exports = ServiceAgreement;