// 客户权益须知
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
          <Text style={styles.protocolTitle}>理财产品购买确认书</Text>
          <ScrollView>
          <View style={[styles.protocolContent,{paddingLeft:20, paddingRight:20,}]}>
            <Text style={styles.protocolTitle}>客户权益须知</Text>
              <Text style={{fontSize:15,marginBottom:5,color: '#666666',}}>
              尊敬的投资者：
              </Text>
              <Text style={{fontSize:15,marginBottom:5,color: '#666666',}}>
                &emsp;&emsp;
              理财非存款、产品有风险、投资须谨慎。
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                银行理财产品是指商业银行在对潜在目标客户群进行分析研究的基础上，针对特定目标客户群开发设计并销售，按照约定条件和实际投资收益情况向投资者支付收益、不保证本金支付和收益水平的非保本理财产品。商业银行根据募集方式的不同，将理财产品分为公募理财产品和私募理财产品。公募理财产品是指商业银行面向不特定社会公众公开发行的理财产品。私募理财产品是指商业银行面向合格投资者非公开发行的理财产品。合格投资者是指具备相应风险识别能力和风险承受能力，投资于单只理财产品不低于一定金额且符合下列条件的自然人、法人或者依法成立的其他组织：（一）具有 2 年以上投资经历，且满足家庭金融净资产不低于 300 万元人民币，或者家庭金融资产不低于 500 万元人民币，或者近 3 年本人年均收入不低于 40 万元人民币；（二）最近 1 年末净资产不低于 1000 万元人民币的法人或者依法成立的其他组织；（三）国务院银行业监督管理机构规定的其他情形。
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                我行理财产品分为固定收益类产品、权益类产品、商品及金融衍生品类产品和混合类产品四大类，请您充分认识不同类型产品的投资风险，谨慎投资。
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                为了保护您的合法权益，建议您：首先，请在投资银行理财产品前，通过我行专门为您设计的个人风险承受能力评估流程，了解您的投资目标，风险偏好和产品需求。其次，请认真阅读银行理财产品的相关销售文件，具体为《理财产品销售协议书》、《产品说明书》、《风险揭示书》和本《客户权益须知》等，然后选择购买与您自身风险承受能力相匹配的产品。您在阅读时如有不明之处，可及时向我行理财人员进行咨询。最后，请关注我行对理财产品的信息披露渠道与频率以及我行相关联络方式，以及当您对所购买的理财产品有任何异议或意见时请及时向我行反馈。我行将以诚实守信、勤勉尽责的态度竭诚为您提供专业的服务。

              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                第一 了解您的投资需求和风险承受能力

              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                    根据《商业银行理财业务监督管理办法》要求，银行在客户投资银行理财产品前，必
                须对客户的风险承受能力进行评估，以保障客户购买的理财产品与其风险承受能力相匹
                配。我行将从客户年龄、财务状况、投资经验、投资目的、收益预期、风险偏好、流动性
                要求、风险认识以及风险损失承受程度等方面，协助您全面了解您的投资需求和您的风险
                承受能力，帮助您选择适合自己风险承受能力的理财产品。
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                我行理财产品分为公募理财产品和私募理财产品。根据客户的不同情况，我行将客户风
                险承受能力分为保守型（A1）、谨慎型（A2）、稳健型（A3）、进取型（A4）、激进型
                （A5）五个等级。与此同时，根据银行理财产品投资范围、风险收益特点、流动性等不同因
                素，我行理财产品分为低风险产品、中低风险产品、中风险产品、中高风险产品、高风险产品
                等五个风险等级。
              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                为了及时更新您的财务状况，明确您的投资目标，个人投资风险承受能力评估结果的有效期为一年期，私募产品投资者个人投资风险能力评估结果的有效期为一年期，若您的风险承受能力评估结果已过有效期或者在评级结果有效期内发生了可能影响您自身风险承受能力的情形，请您在再次购买理财产品前，通过我行柜面或网上银行方式重新
              进行风险承受能力评估。

              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
                第二  了解理财产品的信息披露方式、渠道和频率


              </Text>
              <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
              &emsp;&emsp;
               有关产品相关信息的披露方式、渠道和频率，您可根据《产品说明书》中所载明的
              “ 信息公告 ”约定，及时登录赞同银行网站或致电赞同银行全国统一客户服务热线或到银行营业网点进行查询。
              </Text>
            </View>
            <Text style={styles.protocolTitle}>风险揭示书</Text>
            <View style={[styles.protocolContent,{paddingLeft:20, paddingRight:20,}]}>
                <Text style={{fontSize:15,marginBottom:5,color: '#666666',}}>
                尊敬的客户：
                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  由于理财资金管理运用过程中，可能会面临多种风险因素，因此，根据中国银行业监督管理委员会相关监管规定的要求，在您选择购买本理财计划前，请仔细阅读以下重要内容：
                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  理财非存款、产品有风险、投资须谨慎，投资者应充分认识以下风险：

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  1.	本金及理财收益风险：本理财计划不保障本金且不保证理财收益。您的本金和收益(如有，下同)可能会因市场变动而蒙受重大损失，您应充分认识投资风险，谨慎投资。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  2.	管理人风险：因管理人（包括本理财计划的投资管理人、所投资的信托计划/资管计划的受托人（如有）、相关投资顾问（如有）等，下同）受经验、技能等因素的限制，可能导致本理财计划项下的理财资金遭受损失。如因信托计划/资管计划的受托人和相关投资顾问违背相关协议约定、处理事务不当，可能导致本理财计划项下的理财资金遭受损失。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  3.	合作销售机构风险（凡涉及合作销售机构，均仅适用于银银合作渠道销售的理财产品，下同）：银银合作渠道的投资者购买本理财计划，如因合作销售机构结算备付金账户余额不足或合作销售机构未及时办理资金清算或违背相关合作协议约定、处理事务不当等，可能导致投资者认购/申购失败或本理财计划项下的理财资金遭受损失。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  4.	政策风险：本理财计划是针对当前的相关法规和政策设计的。如国家宏观政策以及市场相关法规政策发生变化，可能影响理财计划的受理、投资、偿还等的正常进行，甚至导致本理财计划收益降低甚至本金损失。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  5.	延期风险：如因理财计划项下资产组合变现等原因造成理财计划不能按时还本付息，理财持有期限将相应延长。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  6.	流动性风险：本理财计划存续期间，投资者只能在本产品说明书规定的时间内办理认购，理财计划成立后投资者不享有提前赎回权利。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  7.	再投资风险：由于赞同银行在特定情况下提前终止理财，则本理财计划的实际理财持有期限可能小于预定期限。如果理财计划提前终止，则投资者无法实现期初预期的全部收益。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  8.	信息传递风险：本理财计划存续期内提供估值，不提供账单，投资者应根据本理财计划说明书所载明的公告方式及时查询本理财计划的相关信息。赞同银行按照本产品说明书有关“信息公告”的约定，发布理财计划的信息公告。投资者应根据“信息公告”的约定及时登录赞同银行一网通网站或致电赞同银行全国统一客户服务热线、各营业网点或合作销售机构开户网点查询。如果投资者未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素的影响使得投资者无法及时了解理财计划信息，并由此影响投资者的投资决策，并可能导致投资者丧失提前退出及再投资的机会，因此而产生的责任和风险由投资者自行承担。另外，除银银合作渠道以外的投资者预留在赞同银行的有效联系方式变更的，应及时通知赞同银行（银银合作渠道的投资者应及时通知合作销售机构）。如投资者未及时告知赞同银行或合作销售机构联系方式变更的，或因投资者其他原因导致赞同银行或合作销售机构将可能在需要联系投资者时无法及时联系上，并可能会由此影响投资者的投资决策，由此而产生的责任和风险由投资者自行承担。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  9.	理财计划不成立风险：如自本理财计划开始认购至理财计划原定成立日之前，理财计划认购总金额未达到规模下限（如有约定），或国家宏观政策以及市场相关法规政策发生变化，或市场发生剧烈波动，或发生其他经赞同银行合理判断难以按照本产品说明书规定向客户提供本理财计划的情形，赞同银行有权宣布本理财计划不成立。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  10.	不可抗力风险：指由于自然灾害、战争等不可抗力因素的出现，将严重影响金融市场的正常运行，可能影响理财计划的受理、投资、偿还等的正常进行，甚至导致本理财计划收益降低甚至本金损失。对于由不可抗力风险所导致的任何损失，由投资者自行承担，赞同银行对此不承担任何责任。
  .	合作销售机构风险（凡涉及合作销售机构，均仅适用于银银合作渠道销售的理财产品，下同）：银银合作渠道的投资者购买本理财计划，如因合作销售机构结算备付金账户余额不足或合作销售机构未及时办理资金清算或违背相关合作协议约定、处理事务不当等，可能导致投资者认购/申购失败或本理财计划项下的理财资金遭受损失。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  11.	税务风险：根据国家相关法律法规，理财计划运营过程中发生的应由理财计划承担的增值税应税行为，由本产品管理人申报和缴纳增值税及附加税费。该等税款将直接从理财计划中扣付缴纳，本理财计划将因为前述增值税等税负承担导致计划税费支出增加、理财计划净值或实际收益降低，从而降低产品投资人的收益水平。
  .	合作销售机构风险（凡涉及合作销售机构，均仅适用于银银合作渠道销售的理财产品，下同）：银银合作渠道的投资者购买本理财计划，如因合作销售机构结算备付金账户余额不足或合作销售机构未及时办理资金清算或违背相关合作协议约定、处理事务不当等，可能导致投资者认购/申购失败或本理财计划项下的理财资金遭受损失。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  本理财计划类型为非保本浮动收益类型，个人投资者购买本理财计划，风险承受能力须在A2（稳健型）及以上。对于个人投资者，如影响您风险承受能力的因素发生变化，请及时告知赞同银行，并在购买本理财计划前应重新进行风险承受能力评估。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                本理财计划不保障本金且不保证理财收益，投资者的本金可能会因市场变动而蒙受重大损失，在市场最不利的情况下投资者将可能损失全部本金，投资者应充分认识投资风险，谨慎投资。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  示例：若投资者购买本理财计划，理财计划本金为100000元，在资产组合项下资产全部亏损的最不利情况下，理财计划100000元本金将全部损失。

                </Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                在您签署本理财计划的销售协议书前，应当仔细阅读本风险揭示书、本理财计划产品说明书及客户权益须知的全部内容，同时向我行了解本理财计划的其他相关信息，并自己独立作出是否认购本理财计划的决定。您将资金委托给我行运作是您真实的意思表示。本风险揭示书、理财计划产品说明书、销售协议书和客户权益须知等将共同构成贵我双方理财合同的有效组成部分，具有同等法律效力。

                </Text>
                <Text style={styles.protocolTitle}>客户确认栏（仅适用于个人客户）</Text>
                <Text style={{fontSize:15,marginBottom:10,color: '#666666',}}>
                &emsp;&emsp;
                  本人确认购买该理财计划为本人真实的意思表示,并认为该理财计划完全适合本人的投资目标、投资预期以及风险承受能力，本人自愿承担由此带来的一切后果。本人确认赞同银行相关业务人员对于理财产品说明书中限制本人权利、增加本人义务以及有关免除、限制赞同银行责任或赞同银行单方面拥有某些权利的条款已向本人予以说明，本人已完全理解并自愿接受。

                </Text>
              </View>
          </ScrollView>
              <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}>
                <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45,width:"100%"}}  onPress={() => {
                  this.props.callBackHome( 'monetary', 2, this.props.data)
                }}>返回</Text>
              </LinearGradient>
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
