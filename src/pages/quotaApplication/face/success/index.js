import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native'
import { SUCCESS_FACE } from '../../imageSource'

export default class Success extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 3
    }
  }
  render() {
    const { time } = this.state
    return (
      <View style={styles.container}>
        <ImageBackground source={SUCCESS_FACE} style={{width: 60, height: 60}}></ImageBackground>
        <Text style={styles.font}>
          人脸识别通过，
          <Text style={{color: '#3484f5'}}>{time}秒</Text>
          后进入下一步
        </Text>
      </View>
    )
  }

  interval = () => {
    let _this = this
    const { fnc } = this.props
    setInterval(() =>{
    var timer=_this.state.time-1
    if(timer===0){
      _this.interval&&clearInterval(_this.interval)
      _this.setState({time:3})
      fnc()
    }else{
      _this.setState({time:timer})
    }},1000)
  }

  componentDidMount() {
    this.interval()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 89
  },
  font: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#DCDCDC',
    lineHeight: 22,
    marginTop: 24
  }
})
