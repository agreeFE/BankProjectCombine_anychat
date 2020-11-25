import React, { Component } from 'react';
import { StyleSheet, Image, View, ScrollView,Button, Text, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import Close from '../close'

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
      <Close callBackHome = {()=> {this.props.closeHome()}} >
        
      <View style={styles.container}>
        <View style={styles.topPart}>
          <Text style={styles.protocolTitle}>信用卡章程</Text>
          <ScrollView style={styles.protocolContent} showsVerticalScrollIndicator={false}>
            <View>
              <Text>
                第一章总则
              </Text>
              <Text>
                第一条  为适应市场需求和业务发展需要，根据《商业银行信用卡业务监督管理办法》及其他相关法律法规，制定本章程。
              </Text>
              <Text>
                第二条  信通信用卡是东莞农村商业银行（以下简称“发卡机构”）向单位和个人发行的，记录持卡人账户相关信息，具备发卡机构授信额度和透支功能，并为持卡人提供信用消费、转账结算、存取现金等相关银行服务的银行卡。
              </Text>
              <Text>
                第三条  东莞农村商业银行信通信用卡按发行对象不同可分为个人卡和单位卡，其中个人卡又可分为主卡和附属卡；按信用等级不同分为钻石卡、白金卡、金卡和普通卡。东莞农村商业银行信通信用卡是符合“银联”标准的人民币信用卡。
              </Text>
              <Text>
                第四条  发卡机构、营业网点、持卡人、特约商户及其他当事人办理信通信用卡业务时必须遵守本章程。
              </Text>
              <Text>
              第五条  本章程涉及的部分名词遵从如下定义

            　　“持卡人”指向发卡机构申请信通信用卡并获得卡片核发的单位或个人。单位卡持卡人应由其单位指定；个人卡持卡人包括主卡持卡人和附属卡持卡人。

            　　“信用额度”指发卡机构根据申请人的资信状况等为其核定、在卡片有效期内可循环使用的最高授信限额。

            　　“透支”指持卡人使用发卡机构为其核定的信用额度进行支付的方式，包括消费透支、取现透支、转账透支和透支扣收等。

            　　“银行记账日”指发卡机构根据持卡人发生的交易将交易款项记入其信通信用卡账户，或根据规定将费用（包括但不限于滞纳金、年费、手续费、追索费，下同）、利息等记入其信通信用卡账户的日期。

            　　“账单日”指发卡机构每月对持卡人的累计未还消费交易本金、取现交易本金、费用等进行汇总，结计利息，并计算出持卡人应还款额的日期。

            　　“还款日”指持卡人实际向发卡机构偿还其欠款的日期。

            　　“到期还款日”指发卡机构规定的持卡人应该偿还其全部应还款额或最低还款额的最后日期。

            　　“全部应还款额”指截至当前账单日，持卡人累计已记账但未偿还的交易本金，以及利息、费用等的总和。

            　　“最低还款额”指发卡机构规定的信通信用卡持卡人在到期还款日（含）前应该偿还的最低金额，包括累计未还消费交易本金及取现交易本金的一定比例，所有费用、利息、超过信用额度的欠款金额，发卡机构规定的持卡人应该偿还的其他欠款金额，以及以前月份最低还款额未还部分的总和。

            　　“免息还款期”指对于信通信用卡持卡人，除取现及转账透支交易外，其他透支交易从银行记账日起至到期还款日（含）之间可享受免息待遇的时间段。

            　　“滞纳金”指信通信用卡持卡人未能在到期还款日（含）前偿还最低还款额，按规定应向发卡机构支付的款项。
              </Text>
              <Text>  第二章  申领条件 </Text>

              <Text>　 第六条  单位申请信通信用卡的基本条件</Text>

              <Text>　（一）具有人民银行核发的基本账户开户许可证；</Text>

              <Text>　（二）在发卡机构所在地的金融机构开立银行基本账户且注册、办公地点在发卡机构所在地；</Text>

              <Text>　（三）具备法人资格或在有关部门合法登记并注册，有合法营业执照，执业在一年以上且经营管理效益良好；</Text>

              <Text>　（四）无营业执照的单位则须提供机构设置批文；其它经济组织必须经相关部门登记注册；</Text>

              <Text>　（五）经发卡机构信贷部门统一授信，如未统一授信的须经信用卡中心资信评估；</Text>

              <Text>　（六）单位卡持卡人必须是申请单位指定，且具有完全民事行为能力的该申请单位的员工。</Text>

              <Text>　符合以上条件的企业、事业单位及国家机关、部队、社会团体等单位均可向发卡机构申办单位卡。</Text>

              <Text>　第七条  单位申请金卡及金卡以上卡种的附加条件</Text>

              <Text>　（一）有固定的办公场所或生产场地，注册资本在100万元以上，连续3个月银行人民币账户存款日平均余额20万元以上，财务制度健全；</Text>

              <Text>　（二）单位领用普通卡1年以上，无不良信用记录，消费频繁，偿债能力正常，经发卡机构重新评估并审核批准；</Text>

              <Text>　（三）申请单位虽不符合1、2项条件，但愿意提供信用额度100％以上质押担保的。</Text>

              <Text>　第八条  个人申领信用卡（主卡）必须同时符合以下基本条件：</Text>

              <Text>　（一）年满18周岁（含）以上，具有完全民事行为能力；</Text>

              <Text>　（二）具有东莞户籍，或者已在东莞地区购置价值20万元以上的商品房；</Text>

              <Text>　（三）东莞有固定的住所和联系方法；</Text>

              <Text>　（四）职业稳定（含私营企业和个体户），收入稳定，具有按期偿还信用卡透支款本息的能力。</Text>

              <Text>　第九条  个人申请金卡（含）以上主卡必须符合以下至少一项附加条件：</Text>

              <Text>　（一）是本行授信业务特定单位正式职工；</Text>

              <Text>　（二）是金融机构正式职工（含本行正式职工）；</Text>

              <Text>　（三）持有东莞农村商业银行股份有限公司5万股以上股份；</Text>

              <Text>　（四）是本行VIP客户或者符合借记卡金卡开卡条件；</Text>

              <Text>　（五）能提供价值50万元以上家庭财产证明（房产、车辆、股权、存单、债券等）或年收入10万元以上的个人收入证明；</Text>

              <Text>　（六）是本行邀请的客户或者有本行员工推荐。</Text>

              <Text>　第十条  单位可申领若干张单位卡，持卡人资格由申领单位的法定代表人或其委托的代理人书面指定或注销。单位对单位卡账户发生的一切债务负有清偿责任。个人申领同一卡种的个人主卡最多只能一张，并且不同卡种的主卡共享一个客户级信用额度（影子额度）。</Text>

              <Text>　第十一条  个人在申领主卡的同时，亦同时为其指定人员申领附属卡，附属卡的所有交易款项及其利息、发生的费用等均记入主卡账户，主卡持卡人对个人卡账户项下发生的一切债务负有清偿责任，同时附属卡持卡人也对该个人卡账户项下所发生的债务负连带清偿责任。</Text>
            </View>
           
          </ScrollView>
        </View>
        <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
        {
          this.props.btnState ? 
          <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
            this.props.enterReportLoss('cardConstitution','','我已阅读信用卡章程。')
                  // this.props.closeHome()
              }}>确认</Text>
          : 
          <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                  this.props.closeHome()
              }}>返回</Text>
            }
          </LinearGradient>
      </View>
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
    marginBottom:20
  }
})
