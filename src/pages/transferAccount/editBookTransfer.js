import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, BackHandler } from 'react-native';
import Header from '$/components/header'
import { SUCCESS } from './imageSource'
import scope from '$/scope'
import {formatMoney} from '$/util/moneyutil'
const router = require('$/router-control');
class operatSuccess extends Component { 
  constructor(props) {
    super(props)
    scope(this)
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap); 
    this.state = {
      changeLimit: true,
      singleDayLimit: 0, 
      annualQuota: 0, 
      singleDayNumber: 0
    }
  }

  render() {
    const { changeLimit, singleDayLimit, annualQuota, singleDayNumber } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        {/* 标题栏 */}
        <Header
          title={'操作成功'}
          leftClick={this.back}
        ></Header>
        {/* 内容区 */}
        <View style={[styles.content]}>
          <Image source={SUCCESS} style={{ marginTop: 60 }}></Image>
          <Text style={{ fontSize: 17, color: '#333333', marginTop: 12 }}>设置预约转账成功</Text>
          {/* 完成按钮 */}
          <Text onPress={this.back} style={styles.finish}>返回</Text>
        </View>
      </View>
    )
  }

  // static getDerivedStateFromProps(props, state) {
  //   let info = props.navigation.state.params.params
  //   if( info.singleDayLimit === state.singleDayLimit && info.annualQuota === state.annualQuota && info.singleDayNumber === info.singleDayNumber) {
  //     return null
  //   }
  //   return info
  // }

  back = () => {
    router.load('reservationTransfer')
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.back(); // works best when the goBack is async
    return true;
  }

}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    flex: 1
  },
  finish:{
    width:142,
    height:35,
    borderColor:'#999',
    borderWidth:1,
    borderRadius:4,
    textAlign:'center',
    lineHeight:35,
    marginTop:100
  }
})
module.exports = operatSuccess;