import React, { Component } from 'react';
import { StyleSheet, Image, View, ScrollView,Button, Text, TouchableWithoutFeedback } from 'react-native';

import { Close } from './imageSource/imageSource';

module.exports = class ServiceAgreement extends Component {
  closePage() {
    alert('关闭页面')
  }
  test(){
    // alert('跳转到3')
    //跳转页面并传递参数
    this.props.callBackHome('子组件点击了一下')
    // this.props.navigation.goBack(); 
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topPart}>
          <Text style={styles.protocolTitle}>银行卡挂失服务协议</Text>
          <ScrollView style={styles.protocolContent} showsVerticalScrollIndicator={false}>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
            <Text>
              本人同意并不可撤销地授权：贵行按照国家相关规定采集并向金融信用信息基础数据库及其他依法成立的征信机构提供本人个人信息和包括信贷信息在内的信用信息（包含本人因未及时履行合同义务产生的不良信息）
            </Text>
          </ScrollView>
        </View>
        <View style={styles.bottomPart}>
          <TouchableWithoutFeedback onPress={() => { this.props.enterReportLoss('message')}}>
          <View style={styles.agreeButton}>
            <Text style={styles.buttonText}>
              我已阅读，并同意以上协议
            </Text>
          </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF'
  },
  agreeButton: {
    width: 335,
    height:45,
    borderRadius:5,
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomPart: {
    height:'20%',
    marginTop: 30
  },
  topPart: {
    height:'68%',
    marginTop: 10
  },
  protocolContent: {
    width: '89%',
    marginTop: 12,
    fontSize: 15,
    color: '#666666',
  },
  protocolTitle: {
    fontSize: 17,
    color: "#666666",
    textAlign: 'center',
    marginTop: 30,
  },
  container: {
    backgroundColor: "#F4F4F4",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    right: 16,
    top: 22
  }
})
