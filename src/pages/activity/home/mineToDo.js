import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions, TouchableWithoutFeedback, PanResponder,FlatList, Animated, Easing } from 'react-native';
const router = require('$/router-control');
import { TODAYNO, TODOICON1, TODOICON2, TODOICON3, TODOICON4, TODOICON5} from '../imageSource'
import SVG from "$/components/Svg";
import Header from '$/components/header' 
import Calendar from '$/components/calendar' 
import scope from '@/scope'
import "$/window"
import {getYearMouthDayLine} from '$/util/dateutil'
const { width:Width, height:Height } = Dimensions.get('window')

class MineToDo extends Component {
  constructor(props) {
    super(props);
    scope(this) 
    this.state = {
      showOptions: false,
      title: new Date().getMonth() +1 + '月',
      currentMonth: `${new Date().getFullYear()}-${new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + new Date().getMonth() + 1}`,
      day: getYearMouthDayLine(),
      // index: 2,
      // width: -Width,
      // animatedTranlate: new Animated.Value(-Width),
    };
  }

  // componentWillMount() {
  //   this._panResponder = PanResponder.create({
  //     // 要求成为响应者：
  //     onMoveShouldSetPanResponder: this._onMoveSet,
  //     // onPanResponderGrant: this._onStart,
  //     onPanResponderMove: this._onMove,
  //     onPanResponderRelease: this._onEnd2,
  //     // onResponderEnd: this._onStart,
  //     // onPanResponderTerminate: this._onStart,
  //     onShouldBlockNativeResponder: () => false,
  //   })
  // }

  render() {
    const { showOptions, currentMonth, day, index, animatedTranlate } = this.state
    let title = this.setTitle(currentMonth)
    return (
      <View style={styles.container}>
        <Header
          title={title}
          leftClick={() => {router.back()}}
          showRightIco={true}
          rightClick={() => {router.load('eventList')}}
        ></Header>
        <View style={{flex: 1}}>
            {/* <Calendar
              ref={value => this.calendar = value}
              onDayPress={(day) => {this.onDayPress(day)}}
              onMonthChange={(month)=> {this._onMonthChange(month)}}
              current={this.state.current}
              hideExtraDays
              hideArrows
              style={styles.calendar}
              markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
            /> */}
          <Calendar
            ref={value => this.calendar = value}
            onMonthChange={this.onMonthChange}
            onDayPress={this._onDayPress}
            markedDates={['2019-12-09', '2020-01-02']}
          ></Calendar>
          {
            (currentMonth.split('-')[0] == new Date().getFullYear() && currentMonth.split('-')[1] == new Date().getMonth() + 1) ? 
            <Text>{day.split('-')[0]== new Date().getFullYear()}</Text>
            :
            <TouchableWithoutFeedback onPress={()=> {this.calendar.toToday()}}>
              <View style={{position: "absolute", right: 30, bottom: 100, width: 60, height: 60, borderRadius: 30, backgroundColor: $globalStyle.backgroundColor,}}>
                <Text style={{fontSize: 30, color: '#fff', lineHeight: 60, textAlign: "center"}}>今</Text>
              </View>
            </TouchableWithoutFeedback>
          }

          <TouchableWithoutFeedback onPress={()=> {this.setState({showOptions: !showOptions})}}>
            <View style={{position: "absolute", right: 30, bottom: 30, width: 60, height: 60, borderRadius: 30, transform: [{rotateZ: showOptions? '45deg' : '0deg'}], backgroundColor: $globalStyle.backgroundColor, zIndex: 99}}>
              <Text style={{fontSize: 50, color: '#fff', lineHeight: 60, textAlign: "center"}}>+</Text>
            </View>
          </TouchableWithoutFeedback>
         

          {
            showOptions ?
            <View style={{position: "absolute", width: '100%', height: '100%', justifyContent: 'flex-end',backgroundColor:'rgba(255,255,255,0.9)', paddingBottom: 20}}>
              {/* <Text style={styles.leftTitleText}>可添加预约</Text> */}
              <View style={styles.botView}>
              <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(0) }} >
                <View style={styles.footBox}>
                  <SVG style={styles.footImg} source={TODOICON1} />
                  <Text style={styles.imgText}>还贷款</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(1) }} >
                <View style={styles.footBox}>
                  <SVG style={styles.footImg} source={TODOICON2} />
                  <Text style={styles.imgText}>还信用卡</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(2) }} >
                  <View style={styles.footBox}>
                    <SVG style={styles.footImg} source={TODOICON3} />
                    <Text style={styles.imgText}>转给TA</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(3) }} >
                  <View style={styles.footBox}>
                    <SVG style={styles.footImg} source={TODOICON4} />
                    <Text style={styles.imgText}>网点预约</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(4) }} >
                <View style={styles.footBox}>
                  <SVG style={styles.footImg} source={TODOICON5} />
                  <Text style={styles.imgText}>自定义</Text>
                </View>
                </TouchableWithoutFeedback>
              </View>
          </View>
            :
            <></>
          }

        </View>
      </View>
    );
  }

  // _onMoveSet = (e, gs) => {
  //   const { dx } = gs;
  //   return Math.abs(dx) > 10;
  // }
  // _onMove = (e, gs) => {
  //   const { dx } = gs;
  //   this.startAnimate(-Width + dx)
  //   this.state.animatedTranlate.setValue(-Width + dx)
  // }
  // _onEnd2 = (e, gs) => {
  //   const { dx, dy } = gs;
  //   let { index, width } = this.state
  //   console.warn('tag', dx)
  //   if(dx > 80) {
  //     // arr = arr.map(item =>item - 1)
  //     width = width + Width
  //     this.startAnimate(width)
  //   } else if(dx < -80) {
  //     // arr = arr.map(item =>item + 1)
  //     width = width - Width
  //     this.startAnimate(width)
  //   } else {
  //     this.startAnimate(-Width)
  //   }
  // }

  // startAnimate = (toValue) => {
  //   let { animatedTranlate, index } = this.state
  //   Animated.timing(animatedTranlate, {
  //     toValue,
  //     duration: 500,  //从0到1的时间
  //     easing: Easing.out(Easing.linear),//线性变化，匀速旋转
  //   }).start(()=> {
  //     this.state.animatedTranlate.stopAnimation((value) => {
  //       if(value == 0) {
  //         this.setState({
  //           index: index -1
  //         })
  //         this.state.animatedTranlate.setValue(-Width)
  //       }
  //       if(value == -Width *2) {
  //         this.setState({
  //           index: index +1
  //         })
  //         this.state.animatedTranlate.setValue(-Width)
  //       }
  //     })
  //   })
  // }

  goJumpOrClick = (num) => {
    switch(num) {
      case 0:
        router.load('addTransferAccounts',1); //还贷款
        break;
      case 1:
        router.load('addTransferAccounts',2); //还信用卡
        break;
      case 2:
        // router.load('transferAccounts')
        router.load('addTransferAccounts',4);  //转给他
        break;
      case 3:
        router.load('networkReservation')
        break;
      case 4:
        router.load('addTransferAccounts',4);  //自定义
        break;
    }
  }

  setTitle = (currentMonth) => {
    let title = '',[ year, month] = currentMonth.split('-').map(item => Number(item))
    if(month === 1) {
      title = `${year}年${month}月`
    } else {
      title = `${month}月`
    }
    return title
  }
 
  onMonthChange = (currentMonth) => {
    this.setState({
      currentMonth
    })
  }

  _onDayPress = (day) => {
    this.setState({
      day
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  botView: {
    marginTop: '2%',
    marginBottom: 50,
    flexDirection: 'row',
    flexWrap: "wrap",
    width: '100%'
  },
  footBox: {
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  footImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  imgText: {
    marginTop: 8
  },
  blurView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});
module.exports = MineToDo;