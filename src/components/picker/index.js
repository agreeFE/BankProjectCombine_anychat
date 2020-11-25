
// Picker 选择器
// 参数：
// pickIndex 第一次选中的index number
// pickData 选择的数据  array 子项需要有value 或者 不是对象或数组
// closeModal 关闭选择器的函数 fnc
// getChoseValue 获取选中的数据  fnc(value) value={value: , index: }


import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'

const TOP = 54, BOTTOM = 73, ITEMHEIGHT = 34
const HEIGHT = 200
export default class Pickers extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: props.pickIndex,
      animateHeight: new Animated.Value(0),
    }
    this.cancel = this.cancel.bind(this)
    this.ensure = this.ensure.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.scrollEnd = this.scrollEnd.bind(this)
  }


  render() {
    let { pickData } = this.props
    const { animateHeight, selectedIndex } = this.state
    return (
      <Animated.View style={[styles.container, { height: animateHeight }]}>
        {/* 确定取消 */}
        <View style={styles.options}>
          {/* 取消 */}
          <TouchableWithoutFeedback onPress={this.cancel}>
            <View style={[styles.option, { alignItems: "flex-start" }]}>
              <Text style={styles.optionFont}>取消</Text>
            </View>
          </TouchableWithoutFeedback>
          {/* 确定 */}
          <TouchableWithoutFeedback onPress={this.ensure}>
            <View style={[styles.option, { alignItems: "flex-end" }]}>
              <Text style={styles.optionFont}>确定</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1 }}>
          <View style={[styles.line, { top: TOP }]}></View>
          <View style={[styles.line, { top: TOP + ITEMHEIGHT }]}></View>

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1 }}
            data={pickData}
            onScroll={this.onScroll}
            onScrollEndDrag={this.scrollEnd}
            scrollEventThrottle={2}
            ref={(view) => { this.myScrollView = view }}
            showsVerticalScrollIndicator={false}

            getItemLayout={(data, index) => (
              { length: ITEMHEIGHT, offset: ITEMHEIGHT * index, index }
            )}
            initialScrollIndex={selectedIndex}
            renderItem={({ item, index }) =>
              <View
                key={index}
                style={[styles.item, {
                  opacity: index === selectedIndex ? 1 : 0.6,
                  marginTop: index === 0 ? TOP : 0,
                  marginBottom: index === pickData.length - 1 ? BOTTOM : 0
                }]}  >
                <Text style={styles.font} key={index}>{item.value || item}</Text>
              </View>}
          >
          </FlatList>
        </View>
      </Animated.View>
    )
  }
  componentDidMount() {
    const { animateHeight } = this.state
    Animated.parallel([
      Animated.timing(animateHeight, {
        toValue: HEIGHT,
        duration: 300,
        easing: Easing.out(Easing.linear)
      })
    ]).start()
  }
  // 滚动事件
  onScroll(event) {
    const currentOffset = event.nativeEvent.contentOffset.y
    let index = Math.round(currentOffset / ITEMHEIGHT)
    this.setState({
      selectedIndex: index,
      // dis: currentOffset
    })
  }

  scrollEnd(event) {
    let index = this.state.selectedIndex
    this.myScrollView.scrollToOffset({ offset: ITEMHEIGHT * index })
  }

  //取消
  cancel() {
    // this.props.closeModal()
    const { animateHeight } = this.state
    animateHeight.setValue(HEIGHT)
    Animated.parallel([
      Animated.timing(animateHeight,{
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.linear)
      })
    ]).start(()=>{
      this.props.closeModal()
    })
  }
  ensure() {
    const { animateHeight } = this.state
    animateHeight.setValue(HEIGHT)
    let data = {
      value: this.props.pickData[this.state.selectedIndex],
      index: this.state.selectedIndex
    }
    this.props.getChoseValue(data)
    Animated.parallel([
      Animated.timing(animateHeight,{
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.linear)
      })
    ]).start(()=>{
      this.props.closeModal()
    })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  options: {
    height: 37,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    height: '100%',
    width: 50,
    paddingBottom: 4,
    paddingTop: 12
  },
  optionFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#528FEE',
    letterSpacing: 0.18,
    textAlign: 'center',
    lineHeight: 21
  },
  line: {
    position: "absolute",
    zIndex: 6,
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0'
  },
  item: {
    height: 34,
    width: '100%',
    justifyContent: "center",
    alignItems: 'center',
    backfaceVisibility: 'hidden',

  },
  font: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 18,
    color: '#333333',
    letterSpacing: 0.22,
    textAlign: 'center',
    lineHeight: 25,
  }
})