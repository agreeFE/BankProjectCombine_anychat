// 
//  关闭弹窗的组件
//  close function  关闭函数
// 


import React, { Component, } from 'react'

import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'

import { Close as CLOSE } from './imageSource/imageSource'

export default  class Close extends Component {
  constructor(props){
    super(props)

    this.state = {
      viewHeight:'100%'
    }
  }
  componentDidMount() {
    if( this.props.height ){
      this.setState({
          viewHeight:this.props.height
      })
    }else{
      this.setState({
          viewHeight:parseInt( Dimensions.get('window').height ) - 230
      })
    }
  }
  render() {
    const { show = true} = this.props
    return (
      <View style={[styles.container,{height:'100%'}]}>
        {this.props.children}
      </View>
    )
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: "relative",
    backgroundColor:"#f4f4f4",
    // backgroundColor: 'black',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    position:"absolute",
    bottom:0,
    top:0
  },
  close: {
    // backgroundColor: 'blue',
    height: 16,
    width: 16,
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 80
  },
})