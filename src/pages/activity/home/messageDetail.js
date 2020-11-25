import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
const router = require('$/router-control');
import Header from '$/components/header'
import scope from '@/scope'
import SVG from "$/components/Svg";
import QRCode from 'react-native-qrcode-svg';
import { ERCODE } from '../imageSource'

class messageDetail extends Component {

  constructor(props) {
    super(props)
    scope(this);
  }
  // 返回上一步
  back = () => {
    router.back()
  }
  render() {
    let message = router.getParams('type')
    const createTime = `${message.createTime.substr(0, 10)} ${message.createTime.substr(11, 8)}`;
    return (
      <View>
        {/* 标题栏 */}
        <Header
          title={message.msgStatus == 1 ? '消息通知' : '待办任务'}
          leftClick={this.back}
        ></Header>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* 标题区 */}
          <View style={{ height: 63, width: '100%', paddingHorizontal: 24, borderBottomColor: '#F0F0F0', borderBottomWidth: 1, marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: '#333333', fontWeight: 'bold' }}>线下网点领取补办银行卡</Text>
            <Text style={{ fontSize: 14, color: '#999', marginTop: 4 }}>{createTime}</Text>
          </View>
          {/* 内容区 */}
          <View style={{ width: '100%', marginTop: 40, paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 15, color: '#666' }}>请您在10个工作日后，前往深圳展会网点领取，领取新银行卡时请向工作人员出示以下凭证：</Text>
          </View>
          <View style={{justifyContent:'center',alignItems:'center',marginTop:20,}}> 
              <QRCode
                value= { message.tradeCode }
                size={200}
              />
            </View>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 16 }}>ID：{ message.tradeCode }</Text>
          <Text style={{ fontSize: 14, color: '#E74A55', marginTop: 16,paddingLeft:20,paddingRight:20 }}>重要提醒：请您妥善保管领卡凭证，不要随意转发他人，因凭证保管不善造成的其他后果，我行不承担任何责任。</Text>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({

})
module.exports = messageDetail;