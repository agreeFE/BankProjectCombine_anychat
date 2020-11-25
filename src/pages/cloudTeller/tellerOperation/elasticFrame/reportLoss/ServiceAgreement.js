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
          <Text style={styles.protocolTitle}>个人开户服务协议</Text>
          <ScrollView>
          <View style={[styles.protocolContent,{paddingLeft:20, paddingRight:20,}]}>
              <Text style={{fontSize:15,fontWeight:"bold",marginBottom:5,color: '#666666',}}>
              &emsp;&emsp; 第一章总则
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                第一条 为进一步规范储蓄个人开户业务的办理,维护客户利
                益,确保银行资金安全,根据《储蓄管理条例》以及中国人民
                银行、中国银行业监督管理委员会的有关规定,结合我行实际
                情况,特制定本管理办法.
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                第二条 本管理办法所称个人开户是指储户存单/存折/银行卡
                的个人开户、预留密码的个人开户、个人开户申请书的个人开户.个人开户的存单、
                存折必须是记名式的,不记名式的存单,存折不能个人开户.
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                第三条 本管理办法所称的有效身份证明是指开立个人银
                行账户出具的有效证件,包括:居民身份证、临时身份证、户
                口簿(16岁以下的中国公民),护照,港(澳)居民往来内地通
                行证,台湾居民来往大陆通行证等,储户出示的本人身份证明
                的姓名,必须与该笔储蓄存款所记户名一致.储户通过电子渠道(包括网上银行、自助终端,电话银行
                等)形株式向银行自助申请的个人开户.
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                第四条 营业网点在受理储户申请个人开户前或口头个人开户失效
                后未继续办理口头个人开户或未办理正式个人开户的,该储蓄存款被他
                人支取的,银行不负赔偿责任.
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                第五条 储户向营业网点申请个人开户可由本人或代理人办
                理.储户向营业网点申请解挂,除16周岁以下储户由其监护人
                代理外,其余储户原则由本人亲自办理.如遇特殊情况确须代
                办时,代理人除提供本人有效身份证件、原存款人有效身份证
                件外,还需提供具有法律效力的相关文件正本  
              </Text>
            </View>
          </ScrollView>
            {
              this.props.btnState ? 
                <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}>
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45,width:"100%"}}  onPress={() => {
                    this.props.enterReportLoss("submitTask", this.state.submitValue,'我已同意用户协议。')
                  }}>我已阅读，并同意以上协议</Text>
                </LinearGradient>
              : 
              <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                this.props.closeHome()
              }}>返回</Text>
              </LinearGradient>
            }
      </Close>
      // <View style={styles.container}>
      //   <View style={styles.topPart}>
      //     <Text style={styles.protocolTitle}>银行卡个人开户服务协议</Text>
      //     <ScrollView style={styles.protocolContent} showsVerticalScrollIndicator={false}>
      //       <View>
      //         <Text>
      //           第一章总则
      //         </Text>
      //         <Text>
      //           第一条 为进一步规范储蓄个人开户业务的办理,维护客户利
      //           益,确保银行资金安全,根据《储蓄管理条例》以及中国人民
      //           银行、中国银行业监督管理委员会的有关规定,结合我行实际
      //           情况,特制定本管理办法.
      //         </Text>
      //         <Text>
      //           第二条 本管理办法所称个人开户是指储户存单/存折/银行卡
      //           的个人开户、预留密码的个人开户、个人开户申请书的个人开户.个人开户的存单、
      //           存折必须是记名式的,不记名式的存单,存折不能个人开户.
      //         </Text>
      //         <Text>
      //           第三条 本管理办法所称的有效身份证明是指开立个人银
      //           行账户出具的有效证件,包括:居民身份证、临时身份证、户
      //           口簿(16岁以下的中国公民),护照,港(澳)居民往来内地通
      //           行证,台湾居民来往大陆通行证等,储户出示的本人身份证明
      //           的姓名,必须与该笔储蓄存款所记户名一致.储户通过电子渠道(包括网上银行、自助终端,电话银行
      //           等)形株式向银行自助申请的个人开户.
      //         </Text>
      //         <Text>
      //           第四条 营业网点在受理储户申请个人开户前或口头个人开户失效
      //           后未继续办理口头个人开户或未办理正式个人开户的,该储蓄存款被他
      //           人支取的,银行不负赔偿责任.
      //         </Text>
      //         <Text>
      //           第五条 储户向营业网点申请个人开户可由本人或代理人办
      //           理.储户向营业网点申请解挂,除16周岁以下储户由其监护人
      //           代理外,其余储户原则由本人亲自办理.如遇特殊情况确须代
      //           办时,代理人除提供本人有效身份证件、原存款人有效身份证
      //           件外,还需提供具有法律效力的相关文件正本  
      //         </Text>
      //       </View>
           
      //     </ScrollView>
      //   </View>
      //   <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
      //   {
      //     this.props.btnState ? 
      //     <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
      //             this.props.enterReportLoss('message','','我已同意用户协议。')
      //         }}>我已阅读，并同意以上协议</Text>
      //     : 
      //     <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
      //             this.props.closeHome()
      //         }}>关闭</Text>
      //       }
      //     </LinearGradient>
      //   </View>
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
    fontWeight:"bold"
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
