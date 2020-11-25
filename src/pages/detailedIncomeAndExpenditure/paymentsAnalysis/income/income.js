import React, {  Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableWithoutFeedback,
  ART,
  ScrollView,
  BVLinearGradient,
  Button
} from 'react-native';
import LineProgress from '../Progress/lineProgress'
import SVG from "$/components/Svg";
import {formatMoney} from '@/util/moneyutil'

import { PAYMENTS_ICON } from '../../imageSource'
const router = require('$/router-control')

class Income extends Component {
  constructor(props) {
    super(props);
    let incomeData = [
      {
        id: 1,
        IncomeType: "退款",
        money: "1200",
      },
      {
        id: 2,
        IncomeType: "工资福利",
        money: "25540",
      },
      {
        id: 3,
        IncomeType: "基金分红",
        money: "2000",
      },
      {
        id: 4,
        IncomeType: "报销",
        money: "5800",
      },
      {
        id: 5,
        IncomeType: "他人还款",
        money: "8000",
      },
      {
        id: 6,
        IncomeType: "红包收入",
        money: "3000",
      },
      {
        id: 7,
        IncomeType: "现金存入",
        money: "1000",
      },
    ]
    let totalIncome = incomeData.reduce((total, ele) => {
      return total + parseInt(ele.money)
    }, 0)
    this.state = {
      incomeData: incomeData,
      totalIncome: totalIncome,
    }
  }
 
  render() {
    return (
      <>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* 收入标题区 */}
          <View style={styles.title}>
            <Text style={styles.titleItem}>收入</Text>
            <View>
              <Text style={styles.titleItem}>￥ {formatMoney(this.state.totalIncome)}</Text>
            </View>
          </View>
          {/* 收入数据展示区 */}
          <View>
            {
              this.state.incomeData.map((ele, index) => {
                let percent = (ele.money / this.state.totalIncome * 100).toFixed(0)
                return (
                  <TouchableWithoutFeedback key={ele.id} onPress={() => { this.itemClick(ele) }}>
                    <View style={[{ justifyContent: 'center', alignItems: 'center', flexDirection: "row" }, styles.incomeWrapper]}>
                      {/* 图标 */}
                      <View style={styles.imgBorder}>
                        <SVG source={PAYMENTS_ICON} style={{width:35,height:35}}></SVG>
                      </View>
                      <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        {/* 收入类型、金额 */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                          <Text style={styles.IncomeType}>{ele.IncomeType}</Text>
                          <Text style={styles.money}>￥ {formatMoney(ele.money)}</Text>
                        </View>
                        {/* 进度条、百分比 */}
                        <View style={[{ justifyContent: 'center', alignItems: 'center', flexDirection: "row" }]}>
                          <LineProgress percent={percent}></LineProgress>
                          <Text style={styles.progress}>{percent}%</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
            }
          </View>
        </View>
      </>
    )
  }
  // 
  itemClick = (item) => {
    router.load('categoryDetails', {info: item})
  }
}

const styles = StyleSheet.create({
  incomeWrapper: {
    marginVertical: 10
  },
  title: {
    width: 327,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: -10,
    paddingBottom: 20,
  },
  titleItem: {
    fontSize: 18,
    color: '#3A3A3A',
    fontWeight: '700'
  },
  imgBorder: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    borderStyle: 'solid',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  IncomeType: {
    fontSize: 15,
    color: '#3A3A3A'
  },
  money: {
    fontSize: 15,
    color: '#3A3A3A',
    fontWeight: '700'
  },
  progress: {
    width: 32,
    marginLeft: 22,
    fontSize: 13,
    color: '#3A3A3A'
  }
})

export default Income