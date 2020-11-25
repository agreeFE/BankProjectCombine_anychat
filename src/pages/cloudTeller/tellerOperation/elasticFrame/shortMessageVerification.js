//短信验证
//

import React, { Component } from 'react'

import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'

import Close from './close'
import Title from './title'

const TEXTINPUT = [
  'textInput1',
  'textInput2',
  'textInput3',
  'textInput4',
  'textInput5',
  'textInput6'
]
const VALUE = [
  '',
  '',
  '',
  '',
  '',
  ''
]

// const TIME= new Date().getTime() + 60*1000

module.exports =  class ShortMessageVerification extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      focusIndex: 0,
      value: ['','', '','', '',''],
      timerCount: 60
    }
    this.onChange = this.onChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.interval = this.interval.bind(this)
    // this.interval()
    // this.time = new Date().getTime()
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
    const { focusIndex, value,timerCount } = this.state
    
    return (
      <Close  callBackHome = {()=> {this.props.callBackHome()}}>
        <Title title={'短信验证'}></Title>
        <View style={{paddingLeft: 24}}>
          <Text style={styles.title}>请输入短信验证码</Text>
          <Text style={styles.text}>已发送验证码至176****9392</Text>
        </View>
        <View style={styles.textInput}>          
          {
            TEXTINPUT.map((item,index) => (
              <View style={styles.inputCon} key={index}>
                <TextInput 
                  style={{width: '100%', height: '100%', textAlign: "center"}}
                  autoFocus={focusIndex === index}
                  editable={focusIndex == index}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  value={value[index]}
                  ref={item}
                  onChange={this.onChange}
                  onKeyPress={this.onKeyPress}
                ></TextInput>
              </View>
            ))
          } 
        </View>
        <View style={{marginTop: 16, alignItems: "center"}}>
          <Text style={styles.text}>{timerCount}S后重新发送</Text>
        </View>
      </Close>
    )
  }

  componentDidMount() {
    this.interval()
  }
  onChange(event) {
    const { focusIndex, value } = this.state
    if(!event.nativeEvent.text) return

    
    value[focusIndex] = event.nativeEvent.text
    this.refs[TEXTINPUT[focusIndex]].blur()
    this.setState({
      focusIndex: focusIndex+1,
      value
    },() =>{
      if(this.state.focusIndex > TEXTINPUT.length-1) {
        this.props.enterReportLoss("pushMessage");
        this.props.addTellerList(2,'我已确认短信验证码。');
        this.props.closeHome()
        return
      } else {
        this.refs[TEXTINPUT[this.state.focusIndex]].focus()
      }
      
    })
  }
  onKeyPress(event) {
    const { focusIndex,value } = this.state
    
    if (event.nativeEvent.key == "Backspace") {
      if (focusIndex > 0) {
        value[this.state.focusIndex -1 ] = ''
        this.setState({
          focusIndex: focusIndex - 1,
          value
        }, () => {
          this.refs[TEXTINPUT[this.state.focusIndex]].focus()
        })
      }
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
    // backgroundColor: 'red',
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
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD0E6',
    // borderBottomColor: 'red',
    justifyContent: "center",
    alignItems: "center"
  }
})
