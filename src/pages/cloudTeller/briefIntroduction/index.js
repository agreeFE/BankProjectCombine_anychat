import React, { PureComponent } from 'react'

import {
  Dimensions,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

import { BI1, BI2, BI3 } from './imageSource/index'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class CloudTeller extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      top: 0.555,
      left: 0.453
    }
    this.next = this.next.bind(this)
  }
  
  render() {
    let { step, top, left } = this.state
    let image = step === 1 ? BI1 : (step === 2 ? BI2 : BI3)
    return (
      <View style={{flex: 1, position: "relative"}}>
        <View style={{position: "absolute"}}>
          <Image source={BI1}></Image>
          <Image source={BI2}></Image>
          <Image source={BI3}></Image>
        </View>
        <Image source={image} style={{width: '100%', height: '100%'}}></Image>
        <TouchableWithoutFeedback onPress={this.next}>
          <View style={[styles.btn,{top: HEIGHT*top, left: WIDTH*left}]}></View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  next() {
    let { step } = this.state
    this.setState({
      step: ++step
    }, () => {
      switch(this.state.step) {
        case 2: 
        this.setState({
          top: 0.37
        })
        break;
        case 3: 
        this.setState({
          top: 0.682
        })
        break;
        case 4:
        break;
        default:
        break;
      }
    })
    
  }

}


const styles = StyleSheet.create({
  btn: {
    position: "absolute", 
    width: WIDTH * 0.096, 
    height: HEIGHT* 0.037, 
  }
})
