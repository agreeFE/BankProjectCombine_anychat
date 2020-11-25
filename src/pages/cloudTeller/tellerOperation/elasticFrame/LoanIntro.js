import React, { Component } from 'react';
import { Image,  ScrollView } from 'react-native';

import { ADV } from './imageSource/imageSource';
import Close from './close'

module.exports = class Authentication extends Component {
  closePage = () => {
    this.props.callBackHome('子组件点击了一下')
  }
  
  render() {
    return (
      <Close callBackHome={() =>{this.closePage()}}>
        <ScrollView style={{flex: 1}}>
            <Image source={ADV}></Image>
        </ScrollView>
      </Close>
    )
  }
}
