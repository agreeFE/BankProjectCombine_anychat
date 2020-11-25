import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

import Header from '$/components/header'
import Pickers from '$/components/picker/pickerPro'
import Expend from './expend/expend'
import Income from './income/income'
import { PAYMENTS_CHANGE, BLUETRA, GRAYTRA } from '../imageSource/index'
import SVG from "$/components/Svg";
import scope from '@/scope'
const router = require('$/router-control')
let Year = [], YearMonth = []
let [year, month] = [new Date().getFullYear(),new Date().getMonth() + 1]
for(let i =0; i< 3; i++) {
  Year.push(`${year - i}年`)
}
for(month; month > 0;month--) {
  let mon = month > 9 ? month : `0${month}`
  YearMonth.push(`${year}年${mon}月`)
}
class Payments extends Component {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      dateMode: true, // 用于日期年月的切换
      clickLeft: false,
      showYearData: Year,
      showMonthData: YearMonth,
      selectMonthData: [YearMonth[0]],
      selectYearData: [Year[0]]
    }
  }
  render() {
    const { dateMode, clickLeft, showYearData,showMonthData, selectYearData, selectMonthData } = this.state
    return (
      <>
        <View style={styles.container}>
          <Header
            title={`收支分析`}
            leftClick={() => { router.back() }}
            rightClick={() => { }}
          ></Header>
          <View style={{flex: 1}}>
            {/* 日期选择栏 */}
            <View style={styles.dateChoose}>
              <TouchableWithoutFeedback onPress={this.showPicker}>
                <View style={styles.modeDate}>
                  {
                    dateMode ?
                      <Text style={[styles.textFont,{color: clickLeft ? '#528FEE' : '#3A3A3A'}]}>
                        <Text style={{fontWeight: 'bold'}}>{`${selectMonthData[0].substr(5,2)}`}</Text>
                        {`/${selectMonthData[0].substr(0,4)}`}</Text>
                      :
                      <Text style={[styles.textFont,{color: clickLeft ? '#528FEE' : '#3A3A3A'}]}>{selectYearData[0]}</Text>
                  }
                  <View style={styles.downTril}></View>
                  <SVG source={clickLeft ? BLUETRA : GRAYTRA} style={styles.triangle}></SVG>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.switchDateChoose}>
                <View style={styles.switchDateMode}>
                  <Text style={styles.modeSwitch}>{this.state.dateMode ? '月' : '年'}</Text>
                  <SVG source={PAYMENTS_CHANGE} style={{ width: 14, height: 14 }}></SVG>
                  <Text style={styles.modeSwitch}>{this.state.dateMode ? '年' : '月'}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* 滚动区域 */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.container}
            >
              {/* 支出展示区 */}
              <View>
                <Expend></Expend>
              </View>
              {/* 收入展示区 */}
              <View>
                <Income></Income>
              </View>
            </ScrollView>
            <Pickers
              ref={ref => this.picker = ref}
              pickerData={ showMonthData }
              selectedValue={selectMonthData}
              onPickerCancel={this.toggleColor}
              onPickerConfirm={this.getMonthData}
            ></Pickers>
            <Pickers
              ref={ref => this.picker1 = ref}
              pickerData={ showYearData }
              selectedValue={selectYearData}
              onPickerCancel={this.toggleColor}
              onPickerConfirm={this.getYearData}
            ></Pickers>
          </View>
        </View>
      </>
    )
  }
  showPicker = () => {
    if(this.state.dateMode) {
      this.picker.init()
    } else {
      this.picker1.init()
    }
    this.toggleColor()
  }
  toggleColor = () => {
    this.setState({
      clickLeft: !this.state.clickLeft
    })
  }

  getMonthData = (item) => {
    this.setState({
      selectMonthData: item
    })
    this.toggleColor()
  }
  getYearData = (item) => {
    let yearMonth = []
    for(let i = 12; i> 0; i--) {
      yearMonth.push(`${item[0].substr(0,4)}年${i}月`)
    }
    this.setState((state, props) => ({
      selectYearData: item,
      showMonthData: item[0].substr(0,4) !== new Date().getFullYear()+'' ? yearMonth : YearMonth,
      selectMonthData: item[0].substr(0,4) !== new Date().getFullYear()+'' ? [yearMonth[0]] : [YearMonth[0]]
    }))
    this.toggleColor()
  }

  switchDateChoose = () => {
    // console.warn('tag', this.state.dateMode)
    
    this.setState((state, props) => ({
      dateMode: !state.dateMode,
    }))

    
  }
}

const styles = StyleSheet.create({
  triangle: {
    marginLeft: 10,
    width: 12,
    height: 7
  },
  switchDateMode: {
    flexDirection: 'row',
    marginRight: 24,
    alignItems: "center"
  },
  header: {
    height: 79
  },
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1
  },
  dateChoose: {
    height: 45,
    backgroundColor: '#fff',
    // flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeDate: {
    fontSize: 15,
    color: '#3A3A3A',
    marginLeft: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  modeSwitch: {
    fontSize: 15,
    color: '#3A3A3A',
    marginHorizontal: 7
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#000',
    lineHeight: 21,
    textAlign: 'center'
  },
});

module.exports = Payments;
