//短信验证
//

import React, { Component } from 'react'

import {
  View,
  Text,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

import Close from './close'
import Title from './title'

const LENGTH = 6

// const TIME= new Date().getTime() + 60*1000

module.exports =  class ShortMessageVerification extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      focusIndex: 0,
      value: [],
      timerCount: 60,
      opacityValue: new Animated.Value(1),
    }
    this.interval = this.interval.bind(this)
    this.startAnimated = this.startAnimated.bind(this)
    this.onPress = this.onPress.bind(this)
  }


  interval() {
    let _this = this
    setInterval(() =>{
    var timer=_this.state.timerCount-1
    if(timer===0){
      _this.interval&&clearInterval(_this.interval);
      _this.setState({timerCount:60})
    }else{
      _this.setState({timerCount:timer})
    }},1000)
  }

  render() {
    const { focusIndex, value,timerCount, opacityValue } = this.state
    
    return (
      <Close  callBackHome = {()=> {this.props.callBackHome()}}>
        <Title title={'短信验证'}></Title>
        <View style={{width: '100%', paddingLeft: 24}}>
          <Text style={styles.title}>请输入短信验证码</Text>
          <Text style={styles.text}>已发送验证码至138****8190</Text>
        </View>
        <View style={styles.textInput}>          
          {
            (new Array(LENGTH)).fill(1,0,LENGTH).map((item,index) => (
              <View style={styles.inputCon} key={index}>
                {
                  index === focusIndex ? 
                  <Animated.View 
                    style={{ width: 1, height: 20, backgroundColor: '#DCDCDC',
                      opacity: opacityValue.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: [1,0,1],
                      })
                    }}>
                  </Animated.View>
                  :
                  <Text style={{fontSize: 18}}>{value[index]}</Text>
                }
                
              </View>
            ))
          } 
          
         
        </View>
      
        <View style={{marginTop: 16, alignItems: "center"}}>
          <Text style={styles.text}>{timerCount}S后重新发送</Text>
        </View>

        <View style={{width: '100%',backgroundColor: '#D2D5DB', position: 'absolute', bottom: 30}}>
          <View style= {{ paddingLeft: 5,paddingRight: 5, paddingTop: 6,flexDirection: 'row', justifyContent: 'space-between',flexWrap: "wrap"}}>
            {
              [1,2,3,4,5,6,7,8,9].map((item,index) => (
                <TouchableWithoutFeedback
                  onPress= {() => {this.onPress(index+1)}}
                >
                  <View style={{width: 112, height: 46, backgroundColor: '#fff',justifyContent: 'center',alignItems: 'center', borderRadius: 5, marginBottom: 7}}>
                    <Text>{item}</Text>
                    <Text>ABC</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))
            }
           
          </View>
          <View style={{flexDirection:'row', alignItems: "center",justifyContent: "flex-end",paddingRight: 5}}>
              <TouchableWithoutFeedback onPress={() => {this.onPress(0)}}>
                <View style={{width: 112, height: 46, backgroundColor: '#fff',justifyContent: 'center',alignItems: 'center', borderRadius: 5, marginBottom: 3, marginRight: 8}}>
                  <Text>0</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.onPress(10)}}>
                <View style={{width: 112, height: 46, backgroundColor: '#fff',justifyContent: 'center',alignItems: 'center', borderRadius: 5, marginBottom: 3}}>
                  <Text>back</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
        </View>
       
      </Close>
    )
  }

  componentDidMount() {
    this.interval()
    this.startAnimated()
  }
  startAnimated() {
    this.state.opacityValue.setValue(1)
   
      Animated.timing(this.state.opacityValue, {
        toValue: 0,  //角度从0变1
        duration: 3000,  //从0到1的时间
        easing: Easing.out(Easing.linear),//线性变化，匀速旋转
      }).start(() => this.startAnimated())
  }

  onPress(index) {
    const { focusIndex, value } = this.state
    if(index < 10) {
      value.push(index)
      this.setState({
        focusIndex: focusIndex +1,
        value
      },()=> {
        if(this.state.focusIndex > LENGTH-1) {
          this.props.callBackHome('子组件点击了一下')
          return
        }
      })
    } else {
      value.pop()
      fIndex = focusIndex > 1 ? focusIndex-1 : 0
      this.setState({
        focusIndex: fIndex,
        value
      })
    }
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: '#333333',
    letterSpacing: 0.22,
    lineHeight: 25,
    marginTop: 32
  },
  text: {
    marginTop: 8,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999999',
 
    letterSpacing: 0,
    lineHeight: 21
  },
  textInput: {
    position: 'relative',
    marginTop: 20,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 10, 
    paddingRight: 10
  },
  inputCon: {
    width: 40,
    height: 40,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD0E6',
    justifyContent: "center",
    alignItems: "center"
  }
})
