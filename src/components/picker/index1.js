// sureText 
// cancelText
// sureStyle
// cancelStyle
// titleText
// titleStyle
// sure
// cancel
// selectedIndex
// pickData





import React, { Component } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  FlatList,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

const HEIGHT = 200, OPACITY = 0.6
const TOP = 54, BOTTOM = 73, ITEMHEIGHT = 34

export default class Picker extends Component {
  constructor(props) {
    super(props)
    this.myScrollView = []
    this.state = {
      animateHeight: new Animated.Value(0),
      animateOpacity: new Animated.Value(0),
      selectedIndex: props.selectedIndex
    }
  }
  render() {
    const { animateHeight, animateOpacity, selectedIndex } = this.state
    const { sureText, cancelText, sureStyle,cancelStyle, titleText, titleStyle, pickData} = this.props
    const PICKDATA = Object.prototype.toString.call(pickData).slice(8).split(']')[0] === 'Array' ?
    [pickData] :  [Object.keys(pickData),pickData[Object.keys(pickData)[selectedIndex[0]]]]
    return (
      <View style={[styles.container,{backgroundColor: `rgba(52, 52, 52, 0.6)`}]}>
        {/* <View style={{flex: 1, backgroundColor: 'rgba(52, 52, 52)', opacity: ani}}></View> */}
        {/* 选择器 */}
        <Animated.View style={[styles.pickCon,{height: animateHeight}]}>
          {/* 头部 */}
          <View style={styles.header}>
            <Text style={[styles.itemFont, cancelStyle]} onPress={() => {this.clickItem(1)}}>{cancelText}</Text>
            <Text style={[styles.titleFont, titleStyle]}>{titleText}</Text>
            <Text style={[styles.itemFont, sureStyle]} onPress={() => {this.clickItem(2)}}>{sureText}</Text>
          </View>
          {/* 主体 */}
          <View style={{flex: 1, flexDirection: "row"}}>
            <View style={[styles.line,{top: TOP}]}></View>
            <View style={[styles.line,{top: TOP + ITEMHEIGHT}]}></View>
            {
              selectedIndex.map((item,num) => (
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  style={{flex: 1}}
                  data = {PICKDATA[num]}
                  onScroll={(event) => {this.onScroll(event,num)}}
                  onScrollEndDrag={() => {this.scrollEnd(num)}}
                  scrollEventThrottle={2}
                  ref={(view) => { this.myScrollView.push(view) }}
                  showsVerticalScrollIndicator = {false}
                  getItemLayout={(data, index) => (
                    {length: ITEMHEIGHT, offset: ITEMHEIGHT * index, index}
                  )}
                  initialScrollIndex = {selectedIndex[num]}
                  renderItem={({item, index}) => 
                  <View
                    style={[styles.item, {
                      opacity: index === selectedIndex[num] ? 1 : 0.6,
                      marginTop: index === 0 ? TOP : 0,
                      marginBottom: index === PICKDATA[num].length - 1 ? BOTTOM : 0
                    }]}  >
                    <Text style={styles.font} key={index}>{item.value || item}</Text>
                  </View> }
                ></FlatList>
              ))
            }
          </View>
        </Animated.View>
      </View>
    )
  }

  clickItem = (num) => {
    const { sure, cancel } = this.props
    const { selectedIndex, animateHeight, animateOpacity } = this.state
    const fnc = () => {
      if(num !==1) {
        sure(selectedIndex)
      }
      cancel()
    }
    animateHeight.setValue(HEIGHT)
    animateOpacity.setValue(OPACITY)
    Animated.parallel([
      Animated.timing(animateHeight,{
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.linear)
      }),
      Animated.timing(animateOpacity,{
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.linear)
      })
    ]).start(fnc)
  }

  onScroll = (event,num) => {
    const { selectedIndex } = this.state
    const length = selectedIndex.length
    const currentOffset = event.nativeEvent.contentOffset.y
    let index = Math.round(currentOffset / ITEMHEIGHT)
    selectedIndex.splice(num,1,index) 
    if(num < length ) {
      selectedIndex.fill(0,num+1,length) 
    }
    this.setState({
      selectedIndex
    })
  }

  scrollEnd = (num) => {
    const { selectedIndex } = this.state
    const index = selectedIndex[num]
    const length = selectedIndex.length -1
    for(let i = length; i>num; i--) {
      this.myScrollView[i].scrollToOffset({offset: ITEMHEIGHT * 0})
    }
    this.myScrollView[num].scrollToOffset({offset: ITEMHEIGHT * index})
  }

  componentDidMount() {
    const { animateHeight, animateOpacity } = this.state
    Animated.parallel([
      Animated.timing(animateHeight,{
        toValue: HEIGHT,
        duration: 300,
        easing: Easing.out(Easing.linear)
      }),
      Animated.timing(animateOpacity,{
        toValue: OPACITY,
        duration: 300,
        easing: Easing.out(Easing.linear)
      })
    ]).start()
  }
  static PropTypes = {
    sureText: PropTypes.string,
    cancelText: PropTypes.string,
    titleText: PropTypes.string,
    sureStyle: PropTypes.object,
    cancelStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    sure: PropTypes.func,
    cancel: PropTypes.func,
    selectedIndex: PropTypes.array,
    pickData: PropTypes.array
  }

  static defaultProps = {
    sureText: '确定',
    cancelText: '取消',
    titleText: '',
    sureStyle: {},
    cancelStyle: {},
    titleStyle: {},
    sure: () => {},
    cancel: () => {},
    selectedIndex: [0],
    pickData: [1,2,3]
  }
 
}


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'flex-end'
  },
  pickCon: {
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  itemFont: {
    fontSize: 16,
    lineHeight: 38
  },
  titleFont: {
    flex: 1,
    textAlign: "center",
    lineHeight: 38
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
