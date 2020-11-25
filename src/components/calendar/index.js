import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, Dimensions, PanResponder, Animated, Easing } from 'react-native'
import {getYearMouthDayLine} from '$/util/dateutil'
const { width:Width, height:Height } = Dimensions.get('window')
let Day = ['日','一', '二', '三', '四', '五', '六']
module.exports = class Calendar extends Component {
  static defaultProps = {
    currentMonth: '',
    onMonthChange: () => {},
    onDayPress: () => {},
    markedDates: []
  }

  static propTypes = {
    currentMonth: PropTypes.string,
    onMonthChange: PropTypes.func,
    onDayPress: PropTypes.func,
    markedDates: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
      currentMonth: this.props.markedDates[0].substr(0,7) || this.getCurrentMonth(),
      animatedTranlate: new Animated.Value(-Width),
      selectDay: this.props.markedDates[0] || getYearMouthDayLine() ,
      width: -Width
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onMoveShouldSetPanResponder: this._onMoveSet,
      onPanResponderMove: this._onMove,
      onPanResponderRelease: this._onEnd,
      onShouldBlockNativeResponder: () => false,
    })
  }

  render() {
    const { currentMonth, animatedTranlate, width } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.day}>
          {
            Day.map((item,index) => (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>{item}</Text>
              </View>
            ))
          }
        </View>
        <View style={{flex: 1, overflow: 'hidden'}} {...this._panResponder.panHandlers}>
          <Animated.View style={{height: '100%', flexDirection: 'row', width: Width*3,  transform: [{translateX: animatedTranlate}]}}>
            {
              this._renderMonth(this.getLastMonth(currentMonth))
            }
            {
              this._renderMonth(currentMonth)
            }
            {
              this._renderMonth(this.getNextMonth(currentMonth))
            }
          </Animated.View>
        </View>
      </View>
    )
  }

  _renderMonth = (currentMonth) => {
    let arr = this.getMonthDay(currentMonth)
    let { markedDates } = this.props
    return(
      <View style={{height: '100%', width: Width}}>
        {
          arr.map((item,index) => (
            <View style={styles.day} key={index}>
              {
                item.map((day,dayIndex) => (
                  <TouchableWithoutFeedback onPress={() => {this.dayPress(day)}}>
                    <View key={dayIndex} style={{flex: 1, height: 40, justifyContent: "center", alignItems: "center"}}>
                      <View style={{width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center",
                        backgroundColor: this.state.selectDay === `${currentMonth}-${day> 9 ? day : '0'+day}` ? 'gray' : '#fff'
                      }}>
                        <Text 
                          style={{color: this.state.selectDay === `${currentMonth}-${day> 9 ? day : '0'+day}` ? 
                              '#fff' : 
                              `${currentMonth}-${day> 9 ? day : '0'+day}` === getYearMouthDayLine() ? 'blue' : 
                              `${currentMonth}-${day> 9 ? day : '0'+day}`.replace(/[^\d]+/g, '') > getYearMouthDayLine().replace(/[^\d]+/g, '') ? '#000' : '#999' }}
                        >{day}</Text>
                      </View>
                      <View style={{position:"absolute", left: '44%', bottom: -2, width: 6, height: 6, borderRadius: 3,
                       backgroundColor: markedDates.includes(`${currentMonth}-${day> 9 ? day : '0'+day}`) ? 'gray' : '#fff'}}></View>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
            </View>
          ))
        }
      </View>
    )
  }
  //获取当前年月 '2019-11'
  getCurrentMonth = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    month = month > 8 ? month + 1 : '0' + month + 1
    return `${year}-${month}`
  }
  //获取上一月 currentMonth: '2019-03'
  getLastMonth = (currentMonth) => {
    let [year, month] = currentMonth.split('-').map(item => Number(item))
    if(month < 2) {
      month = 12
      year = year -1
    } else {
      month = month - 1
    }
    return `${year}-${month > 9 ? month : '0' + month}`
  }
  //获取下一月
  getNextMonth = (currentMonth) => {
    let [year, month] = currentMonth.split('-').map(item => Number(item))
    if(month > 11) {
      month = 1
      year = year + 1
    } else {
      month = month + 1
    }
    return `${year}-${month > 9 ? month : '0' + month}`
  }
  //获取某月几日 ,一号星期几, 某月几周
  getMonthDay = (currentMonth) => {
    let [year,month] = currentMonth.split('-').map(item => Number(item))
    // let [current_year,current_month, current_day] = getYearMouthDayLine().split('-').map(item => Number(item))
    let day = new Date(year,month,0).getDate()
    let firstDay = new Date(year,month -1 ,1).getDay()
    let lastDay = new Date(year,month -1 ,day).getDay()
    let weeks = 2 + (day - (8 - firstDay) - lastDay)/7
    let daysArr = Array.from(new Array(day), (item, value) => {
      // if(year === current_year && month === current_month && value+1 === current_day ) {
      //   return '今'
      // }
      return value + 1
    })
    let startArr = Array.from(new Array(firstDay), () => '')
    let lastArr = Array.from(new Array(6 - lastDay), () => '')
    daysArr = [...startArr,...daysArr,...lastArr]
    let arr = []
    for(let i = 0; i< weeks; i++) {
      let arr2 = []
      arr2.push(...daysArr.slice(7*i,7*(i+1)))
      arr.push(arr2)
    }
    return arr 
  }

  // _onStart = (e, gs) => {
  //   this.setState({
  //     animatedTranlate: new Animated.Value(-Width),
  //     width: -Width
  //   })
  // }
  _onMoveSet = (e, gs) => {
    const { dx } = gs;
    return Math.abs(dx) > 10;
  }
  _onMove = (e, gs) => {
    const { dx } = gs;
    this.startAnimate(-Width + dx)
    this.state.animatedTranlate.setValue(-Width + dx)
  }
  _onEnd = (e, gs) => {
    let {currentMonth,width} = this.state
    const { dx, dy } = gs;
    if(dx > 80) {
      width = width + Width
      this.startAnimate(width)
      this.props.onMonthChange(this.getLastMonth(currentMonth))
    } else if(dx < -80) {
      width = width - Width
      this.startAnimate(width)
      this.props.onMonthChange(this.getNextMonth(currentMonth))
    } else {
      this.startAnimate(-Width)
    }
  }

  dayPress = (day) => {
    if(!day) return
    let { currentMonth } = this.state
    this.setState({
      selectDay: `${currentMonth}-${day> 9 ? day : '0'+day}`
    })
    this.props.onDayPress( `${currentMonth}-${day> 9 ? day : '0'+day}`)
  }
  
  toToday = () => {
    this.setState({
      currentMonth: this.getCurrentMonth(),
      selectDay: getYearMouthDayLine()
    },() => {
      this.dayPress(new Date().getDate())
      this.props.onMonthChange(this.state.currentMonth)
    })
    
  }

  startAnimate = (toValue) => {
    let { animatedTranlate, currentMonth } = this.state
    Animated.timing(animatedTranlate, {
      toValue,
      duration: 500,  //从0到1的时间
      easing: Easing.out(Easing.linear),//线性变化，匀速旋转
    }).start(() => {
      this.state.animatedTranlate.stopAnimation((value) => {
        if(value == 0) {
          this.setState({
            currentMonth: this.getLastMonth(currentMonth),
            selectDay: `${this.getLastMonth(currentMonth)}-01`
          })
          this.state.animatedTranlate.setValue(-Width)
        }
        if(value == -Width *2) {
          this.setState({
            currentMonth: this.getNextMonth(currentMonth),
            selectDay: `${this.getNextMonth(currentMonth)}-01`
          })
          this.state.animatedTranlate.setValue(-Width)
        }
      })
    })
  }

}
const styles = StyleSheet.create({
  container: {
    minHeight: 250,
    width: Width,
    backgroundColor: '#fff'
  },
  day: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
  }
})