import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, } from 'react-native';
import Header from '$/components/header'
import { GREENCHECK} from './imageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'

module.exports = class transferInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {

    };
  }
  back = () => {
    router.back()
  }
  TRfinish() {
    // router.load('transferAccounts')
    router.back()
  }
  render() {
    return (
      <>
        <Header
          title={'转账成功'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
        <Image style={{width:50,height:50,marginTop:60}} source={GREENCHECK} />
        <Text style={{fontFamily: 'PingFangSC-Medium',fontSize: 17,color: '#333333',marginTop:12}}>转账成功</Text>
        <Text style={{fontFamily: 'PingFangSC-Regular',fontSize: 15,color: '#666666',marginTop:24}}>预计10秒内到账</Text>
          <TouchableWithoutFeedback onPress={() => { this.TRfinish() }} >
            <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText]}>完成</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    )
  }
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
    alignContent:'center',
    alignItems:'center'
  },
  bodyView: {
    height: 35,
    width: 142,
    marginTop: 2,
    alignItems: 'center',
    borderColor:'#999999',
    borderWidth:1,
    borderRadius:4,
    justifyContent:'center',
    marginTop:166
  },
  bodyViewText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#666666',
    letterSpacing: 0,
    textAlign:'center'
  }
})
