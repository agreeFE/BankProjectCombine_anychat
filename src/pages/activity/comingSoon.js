import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
const router = require('$/router-control');
import Header from '$/components/header'
import { WU } from './imageSource'
import scope from '@/scope'

class comingSoon extends Component {
  constructor(props) {
    super(props);
    scope(this);
  }

  leftClick() {
    // alert('left')
    router.back()
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Header
          title={``}
          // imageBackground={0}
          leftClick={this.leftClick}
          // headerStyle={{ backgroundColor: 'rgba(122,162,171,0.6)' }}
          // showBackGround={false}
        ></Header>
        <View style={{alignItems:'center',justifyContent:'center',flex:1,marginBottom:100}}>
          <Image style={{ width: 200, height: 178 }} source={WU}></Image>
          <Text style={{ fontSize: 17, color: '#999999', marginTop: 30 }}>敬请期待…</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
module.exports = comingSoon;