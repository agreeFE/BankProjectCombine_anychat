import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback,Button } from 'react-native';
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD,RIGHTARROW } from './imageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
import LinearGradient from 'react-native-linear-gradient'

module.exports = class thelimitFirstStep extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {

    };
  }
  back = () => {
    router.back()
  }
  goJumpOrClick(){
    router.replace('transferLimit');
  }
  render() {
    return (
      <>
        <Header
          title={'转账限额'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
        <View style={[styles.bodyView]}>
              <Text style={[styles.bodyViewText,{width:'35%'}]}>一卡通</Text>
              <Text style={[styles.bodyViewText,{width:'55%',textAlign:'right',paddingRight:5,fontSize:15,color:'#999999'}]}>6227********2345</Text>
              <Image style={{ width: 12, height: 12, }} source={RIGHTARROW} />
        </View>
        <View style={styles.instructionsView}>
              <Text style={styles.instructionsText}>该卡尚未开通电子银行转账功能。开通后，即可在手机银行、大众版网银、VTM等渠道进行转账。</Text>          
          </View>
          <TouchableWithoutFeedback onPress={() => { this.goJumpOrClick(1) }} >
        <LinearGradient colors={['#E9962F', '#FFC67E']} style={styles.butView}>
        <Text style={{color:"#FFFFFF",textAlign:'center',fontSize:17,fontFamily:'PingFangSC-Medium'}}>立即开通</Text>
        </LinearGradient>
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
  },
  butView: {
    height: 45,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 50
  },
  bodyView: {
    height: 45,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyViewText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingLeft: 24,
    justifyContent: 'center',
    width: '90%'
  },
  instructionsView:{
    marginTop:20
  },
  instructionsText:{
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color:'#999999',
    paddingLeft:20,
    paddingTop:4,
    paddingRight:12
  }
})
