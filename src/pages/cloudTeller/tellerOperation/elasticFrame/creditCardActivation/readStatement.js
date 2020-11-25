import React, { Component } from 'react';
import { StyleSheet, Image, View, ScrollView,Button, Text, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from "react-native-linear-gradient"


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
          <Text style={styles.protocolTitle}>请朗读以下声明</Text>
          <ScrollView style={styles.protocolContent} showsVerticalScrollIndicator={false}>
            <View>
              <Text>
                 本人已阅读全部申请材料，充分了解并清楚知晓该信用卡产品的相关信息，愿意遵守领用合同（协议的）各项规则。
              </Text>
            </View>
           
          </ScrollView>
        </View>
        <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
        {
          this.props.btnState ? 
          <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                  this.props.enterReportLoss('readStatement','','我已朗读声明。')
              }}>确认</Text>
          : 
          <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                  this.props.closeHome()
              }}>返回</Text>
            }
          </LinearGradient>
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
    color: "#333",
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
  },
  ensure:{
    width:'90%',
    height:45,
    marginLeft:'5%',
    borderRadius:5,
    backgroundColor:'#E39634',
    marginTop:20,
    marginBottom:20,
  }
})
