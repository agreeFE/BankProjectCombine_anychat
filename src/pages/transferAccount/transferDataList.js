import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
const router = require('$/router-control');
import Header from '$/components/header'
import { BOY1, BOY2, GIRL1, GIRL2 } from './imageSource'
import scope from '$/scope'
const headArr = [BOY1, BOY2, GIRL1, GIRL2]

class transferDataList extends Component {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      ...props
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    })
  }
  render() {
    let { item, index } = this.state
    // let yearArr = Object.keys(item);
    // let monthArr = Object.keys(item[year]);
    let resultArr = []
    // 处理年份
    for (let keyYear in item) {
      let obj = {};
      let arr = []
      obj.year = keyYear;
      let yearMonth = item[keyYear]
      // 处理月份
      for (let k in yearMonth) {
        let obj = {}
        obj.month = k
        obj.data = yearMonth[k]
        arr.push(obj)
      }
      obj.month = arr
      resultArr.push(obj)
    }

    console.log(resultArr, "子组件结果数组")
    return (
      <View style={styles.wrapper}>
        {
          resultArr.map((ele, index) => {
            return (
              <>
                <Text style={styles.yearStyle}>{ele.year}年</Text>
                {
                  ele.month.map((ele, index) => (
                    <View style={styles.monthStyle}>
                      <Text style={styles.monthTextStyle}>{ele.month}</Text>
                      {
                        ele.data.map((ele, index) => {
                          return (
                            ele.creditDebitFlag == "D" ? 
                            <View style={styles.detailInfoBox}>
                              <View style={styles.boxLeft}>
                                <Image style={{ width: 36, height: 36, marginRight: 10 }} source={headArr[Math.floor(4 * Math.random())]}></Image>
                                <View>
                                  {/* D：转出，支出；C：转入，收入 */}
                                  {
                                    ele.creditDebitFlag == "D" ?
                                      <Text>{ele.otherAccountName ? ele.otherAccountName : '无名'}</Text>
                                      // <Text>马德政</Text>
                                      :
                                      // <Text>{ele.remark ? ele.remark : '无名'}</Text>
                                      <></>
                                  }
                                  <Text style={{ marginTop: 5, fontSize: 12, color: '#999' }}>{ele.tradeDate.substr(4, 2)}-{ele.tradeDate.substr(6, 2)} {ele.tradeTime.substr(0, 2)}:{ele.tradeTime.substr(2, 2)}</Text>
                                </View>
                              </View>
                              <View>
                                {
                                  ele.creditDebitFlag == "D" ?
                                    <View style={{ alignItems: 'flex-end' }}>
                                      <Text style={{ color: '#59cc2c' }}>-￥{ele.debitAmount}</Text>
                                      <Text style={{ marginTop: 5, fontSize: 12, color: '#999' }}>已汇出</Text>
                                    </View>
                                    :
                                    // <View style={{ alignItems: 'flex-end' }}>
                                    //   <Text style={{ color: '#ff4848' }}>+￥{ele.credit_amount}</Text>
                                    //   <Text style={{ marginTop: 5, fontSize: 12, color: '#999' }}>收款成功</Text>
                                    // </View>
                                    <></>
                                }
                              </View>
                            </View>
                            :
                            <></>
                          )
                        })
                      }
                    </View>
                  ))
                }
              </>)
          })
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailInfoBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15
  },
  monthTextStyle: {
    color: '#666',
    backgroundColor: '#eee',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  monthStyle: {
    color: '#666',
    // backgroundColor: '#eee',
    // paddingHorizontal: 20,
  },
  yearStyle: {
    color: '#666',
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    fontSize: 18
  },
  wrapper: {
    width: '100%',
  }
})
export default transferDataList;