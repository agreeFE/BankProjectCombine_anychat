import React, { Component } from 'react';
import { StyleSheet, Image, View, ScrollView,Button, Text, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import Close from '../close'

module.exports = class ServiceAgreement extends Component {
  constructor(props) {
    super(props);
    this.state={
      submitValue:[{
          FIELDCODE: "ERRORCODE",
          FIELDVALUE: "000000"
      },{
          FIELDCODE: "ERRORMSG",
          FIELDVALUE: "确认提交"
      }]
    }
  }
  render() {
    return (
      <Close callBackHome = {()=> {this.props.closeHome()}} >
          <Text style={styles.protocolTitle}>请您朗读标准话术</Text>
          <ScrollView>
          <View style={[styles.protocolContent,{paddingLeft:20, paddingRight:20,}]}>
              <Text style={{fontSize:15,fontWeight:"bold",marginBottom:5,color: '#666666',}}>
              &emsp;&emsp; 本人承诺：
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
              贷款资金不用于股票、期货、金融衍生产品、股本权益性投资、购房以及国家有关法律、法规和规章禁止的其他消费与投资行为。
              </Text>
            </View>
          </ScrollView>
            {
              this.props.btnState ? 
                <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}>
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45,width:"100%"}}  onPress={() => {
                    this.props.enterReportLoss("submitTask", this.state.submitValue,'我已朗读话术')
                  }}>我已朗读话术</Text>
                </LinearGradient>
              : 
              <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                this.props.closeHome()
              }}>返回</Text>
              </LinearGradient>
            }
      </Close>
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
    fontSize: 15,
    color: '#666666',
  },
  protocolTitle: {
    fontSize: 17,
    color: "#666666",
    textAlign: 'center',
    marginTop: 24,
    marginBottom:12,
    fontWeight:"bold",
  },
  container: {
    backgroundColor: "red",
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
    marginTop:20,
    marginBottom:20,
  }
})
