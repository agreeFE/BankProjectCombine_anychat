import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, TextInput, Button, BVLinearGradient } from 'react-native';
import Header from '$/components/header'
import { BANK, RIGHTARROW, TONGXUNLU, LIUYAN } from './imageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
import LinearGradient from 'react-native-linear-gradient'

module.exports = class transferInfoAdrBook extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      username: '',//户名
      account: '',//账号
      bankName: '',//银行名称
      transferAmount: '',//转账金额
      shortNote: '',//短信通知
      trapos: '',//转账附言

    };
    this.usernameChange = this.usernameChange.bind(this);
    this.accountChange = this.accountChange.bind(this);
    this.transferAmountChange = this.transferAmountChange.bind(this);
    this.shortNoteChange = this.shortNoteChange.bind(this);
    this.traposChange = this.traposChange.bind(this);
  }
  usernameChange(text) {
    this.setState({ username: text })
  }
  accountChange(text) {
    this.setState({ account: text })
  }
  transferAmountChange(text) {
    this.setState({ transferAmount: text })
  }
  shortNoteChange(text) {
    this.setState({ shortNote: text })
  }
  traposChange(text) {
    this.setState({ trapos: text })
  }
  back = () => {
    router.back()
  }

  render() {
    return (
      <>
        <Header
          title={'通讯录转账'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <View style={{ backgroundColor: '#FFFFFF' ,height:111}}>
            <Text style={styles.leftTitleText}>收款人</Text>
            <View style={styles.accbodyView}>
              <Image style={{width:50,height:45,}} source={BANK} /> 
              <View style={{paddingLeft:20}}>
                 <Text style={{fontSize:15,color:'#333333',fontFamily:'PingFangSC-Medium'}}>罗君逸  <Text style={{fontSize:14,color:'#999999',fontFamily:'PingFangSC-Regular'}}>上海浦东发展银行 储蓄卡</Text></Text>
                 <Text style={{fontSize:14,color:'#666666',fontFamily:'PingFangSC-Medium',paddingTop:5}}>221 1234 6060 1238</Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: '#FFFFFF', marginTop: 8 }}>
            <Text style={styles.leftTitleText}>转账金额</Text>
            <View style={styles.inputInfoView}>
              <Text style={[styles.inputTitle, { fontSize: 25 }]}>￥</Text>
              <TextInput placeholder='0 手续费' style={[styles.inputText, { textAlign: 'left' }]} value={this.state.transferAmount} onChangeText={this.transferAmountChange}></TextInput>
            </View>
            <View style={[styles.inputInfoView, { height: 65 }]}>
              <Text style={[styles.inputTitle, { width: '25%' }]}>付款卡</Text>
              <View style={{ flexDirection: 'column', width: '60%' }}>
                <Text style={{ width: '100%', textAlign: 'right', fontSize: 15, color: '#3A3A3A' }}>赞同科技(7088)</Text>
                <Text style={{ width: '100%', textAlign: 'right', fontSize: 14, color: '#999999' }}>余额  ¥ 1230.00</Text>
              </View>
              <Image style={styles.inputImg} source={RIGHTARROW} />
            </View>
          </View>
          <View style={{ backgroundColor: '#FFFFFF', marginTop: 8 }}>
            <View style={styles.inputInfoView}>
              <Text style={[styles.inputTitle, { width: '25%' }]}>短信通知</Text>
              <TextInput placeholder='可不填' style={[styles.inputText, { width: '60%' }]} value={this.state.shortNote} onChangeText={this.shortNoteChange}></TextInput>
              <Image style={styles.inputImg} source={TONGXUNLU} />
            </View>
            <View style={styles.inputInfoView}>
              <Text style={[styles.inputTitle, { width: '25%' }]}>转账附言</Text>
              <TextInput placeholder='转账' style={[styles.inputText, { width: '60%' }]} value={this.state.trapos} onChangeText={this.traposChange}></TextInput>
              <Image style={styles.inputImg} source={LIUYAN} />
            </View>
          </View>
          <Text style={{ paddingLeft: 20, color: '#999999', fontSize: 13, paddingTop: 10 }}>将根据转账信息预计到账时间</Text>
          <LinearGradient colors={['#E9962F','#FFC67E']} style={styles.butView}>  
          <Text style={{color:"#FFFFFF",textAlign:'center',fontSize:17,fontFamily:'PingFangSC-Medium'}}>下一步</Text>      
          </LinearGradient>
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
  leftTitleText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingTop: 12,
    height: 45,
    paddingLeft: 20
  },
  inputInfoView: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    fontSize: 15,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 2
  },
  inputTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    letterSpacing: 0,
    width: '15%',
    paddingLeft: 20
  },
  inputText: {
    fontSize: 15,
    textAlign: 'right',
    width: '70%'
  },
  inputImg: {
    width: 16,
    height: 16,
    marginLeft: 20
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
  accbodyView:{
    width:'100%',
    paddingLeft:20,
    flexDirection:'row'
  }
})
