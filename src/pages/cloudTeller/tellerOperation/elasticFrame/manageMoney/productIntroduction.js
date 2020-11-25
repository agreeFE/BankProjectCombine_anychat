//产品介绍
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

const { formatMoney } = require('$/util/moneyutil')

const { getTimespamp, getDatetimeByFormat } = require('$/util/dateutil');
import { anquan, licaibao } from '../imageSource/imageSource';

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');


module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state={
        ViewHeight:'100%',
        expected:0,
        progressIcoWidth:20,// 进度条组件元素参数(圆点宽高)
        progressArray:[
            {
                name:'起售',
                date:'09:12',
                status:1,//0未激活,1激活
                width:'20%',//单组数据宽度
                progressStartPosition:'0%',//起始位置
                progressEndPosition:'0%'//终止位置
            },
            {
                name:'截止',
                date:'09:19',
                status:1,//0未激活,1激活
                width:"20%",//单组数据宽度
                progressStartPosition:'0%',//位置
                progressEndPosition:'20%'//位置
            },
            {
                name:'起息日',
                date:'09:22',
                status:0,//0未激活,1激活
                width:"20%",//单组数据宽度
                progressStartPosition:'20%',//位置
                progressEndPosition:'40%'//位置
            },
            {
                name:'到期',
                date:'10:22',
                status:0,//0未激活,1激活
                width:"55%",//单组数据宽度
                progressStartPosition:'40%',//位置
                progressEndPosition:'85%'//位置
            }
        ],
    }
  }
  componentDidMount() {
    console.warn('详细页面', JSON.stringify( this.props.data ) )
    let _this = this;
    _this.setState({
      ViewHeight:parseInt( Dimensions.get('window').height ) - 200,
    })
    let item= this.props.data;
    // let item= ["true","1","PSDU191105","个人美元结构性存款191105期","US","1001","R1","7","20190101","20201001","20201001","2.35%","AYO/网银/手机","2000"]
    // 开始日期
    let nowYear = getDatetimeByFormat(new Date(),'yyyy')
    let startDate = item[8].substring(4,8);
    let startArr = _this.state.progressArray;
        startArr[0]['date'] = startDate.slice(0,2)+'.'+startDate.slice(2);
    // 截止日期
    let JZYear = item[9].substring(0,4);
    let JZDate = item[9].substring(4,8);
    let date = new Date( nowYear+'-'+JZDate.slice(0,2)+'-'+JZDate.slice(2) );
        newM =  date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        newD = parseInt( date.getDate() )+ 1
        newD = newD > 9 ? newD : `0${newD}`;
    if( parseInt(JZYear) > parseInt(nowYear) ){
        startArr[1].date = JZYear.slice(2)+'.'+JZDate.slice(0,2)+'.'+JZDate.slice(2);
        startArr[2].date = JZYear.slice(2)+'.'+newM+'.'+newD;
    }else{
        startArr[1].date =  JZDate.slice(0,2)+'.'+JZDate.slice(2);
        startArr[2].date = newM+'.'+newD;
    }
    // 到期日期
    let endDate = item[10].substring(4,8);
    let endYear = item[10].substring(0,4);
    let endArr = this.state.progressArray;
    if( parseInt(endYear) > parseInt(nowYear) ){
        endArr[3].date = endYear.slice(2)+'.'+endDate.slice(0,2)+'.'+endDate.slice(2);
    }else{
        endArr[3].date = endDate.slice(0,2)+'.'+endDate.slice(2);
    }
  }

  GetDateStr( dd, AddDayCount) {
    // var dd = new Date();
    // let dd = dd;
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1 > 9 ? dd.getMonth() + 1 : `0${dd.getMonth() + 1}`;//获取当前月份的日期
    let d = dd.getDate() > 9 ? dd.getDate() : `0${dd.getDate()}`;
    return m+'.'+d;
}

  render() {
    let index =2;
    let item= this.props.data
    // let item= ["true","1","PSDU191105","个人美元结构性存款191105期","US","1001","R1","7","20190101","20201001","20201001","2.35%","AYO/网银/手机","2000"]
    return (
        <View style={[styles.allBox,{height:'100%',backgroundColor:"#f4f4f4", borderTopLeftRadius:15, borderTopRightRadius:15,}]}>
                <View style={styles.titleBox}>
                    <Text style={styles.Stance}></Text>
                    <Text style={styles.title}>理财产品介绍</Text>
                </View>
                <ScrollView style={{height:this.state.ViewHeight}} >
                        <View style={{backgroundColor:'#fff',marginBottom:20,paddingBottom:20,}}>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:14,borderBottomColor:'#F2F2F2',borderBottomWidth:1}}>
                                <Text style={{color:'#333', fontSize:16, fontWeight:'bold'}}>{item[3]}</Text>
                                <Text style={{color:'#333', fontSize:14, marginTop:4 }}>{item[5]}</Text>
                            </View>
                            <View style={styles.productIntroductionTop}>
                                <View style={{width:"50%",height:70}}>
                                    <Text style={{height:38,lineHeight:38,color:'#999999',fontSize:13,paddingLeft:20,}}>业绩比较基准</Text>
                                    <Text style={{height:38,lineHeight:50,color:"#DA8C2A",fontSize:24,paddingLeft:20,}}>{item[11]}</Text>
                                    <Text style={{color:"#DA8C2A",fontSize:14,marginTop:20,paddingLeft:20,}}>
                                        <Text style={{textAlign:"center",width:"25%",height:35,lineHeight:35,marginRight:5}}>{item[6]}</Text>
                                        <Text style={{textAlign:"center",width:"2%",height:35,lineHeight:35,marginRight:5}}>|</Text>
                                        <Text style={{textAlign:"center",width:"25%",height:35,lineHeight:35,}}>{formatMoney(item[13])}元起购</Text>
                                    </Text>
                                </View>
                                <View style={{width:"49%",height:70}}>
                                    <Text style={{width:"100%",height:38,lineHeight:38,paddingLeft:20,color:'#999999',fontSize:13}}>投资期限(天)</Text>
                                    <Text style={{width:"100%",height:38,lineHeight:50,paddingLeft:20,color:"#333",fontSize:24}}>{item[7]}</Text>
                                    <Text style={{color:"#666666",fontSize:14,paddingLeft:20,marginTop:20}}>累计成交52万笔</Text>
                                </View>
                            </View>
                             {/* 进度条 */}
                            <View style={styles.progressBox}>
                                {this.state.progressArray.map((tab, i) => {
                                    return (
                                        <View style={[this.state.progressArray[i].status===1?{backgroundColor:"#ED9F3E"}:{backgroundColor:"#959393"},{height:2,position:"absolute",width:this.state.progressArray[i].width,left:this.state.progressArray[i].progressStartPosition,top:35}]}>
                                            <View style={{width:"100%",height:50,position:"relative",top:-30}}>
                                                {/* 球 */}
                                                <View style={[{width:14,height:14,backgroundColor:"#e4393c",position:"absolute",top:24,borderRadius:7,overflow:"hidden"},i===0?{left:'0%'}:{right:0},this.state.progressArray[i].status===1?{backgroundColor:"#ED9F3E"}:{backgroundColor:"#959393"}]}>
                                                </View>
                                                <Text  style={[{width:"100%",height:50,textAlign:"right",fontSize:10},i===0?{textAlign:"left"}:{textAlign:"right",position:"relative",right:-4},this.state.progressArray[i].status===1?{color:"#3E4C8C",fontWeight:"bold"}:{color:"#959393"}]}>{this.state.progressArray[i].name}</Text>
                                                <Text  style={[{width:"100%",height:50,textAlign:"right",fontSize:10,color:"#959393"},i===0?{textAlign:"left"}:{textAlign:"right",position:"relative",right:-6}]}>{this.state.progressArray[i].date}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                <Text style={{color:"#999999",fontSize:14,marginTop:80}}>起息日是计算收益开始日，<Text style={{color:'#DA8C2A'}}>现在买入，{this.state.progressArray[2].date}开始计算收益</Text></Text>
                            </View>
                        </View>

                        <View style={{backgroundColor:"#fff",paddingBottom:20}}>
                            <Text style={{color:'#333333', fontSize:17, fontWeight:"bold",paddingLeft:20,marginTop:16}}>产品亮点</Text>
                            <View >
                                <View style={styles.introItem}>
                                    <Image source={anquan} resizeMode={'contain'} style={{width:18,height:18,marginTop:2}}></Image>
                                    <View style={{paddingLeft:5}}>
                                        <Text style={{fontSize:15,color:"#333"}}>每日可购买,到期自动还本付息</Text>
                                        <Text style={{fontSize:14,color:"#999"}}>存续期间不允许赎回,理财到期自动返回本金和收益</Text>
                                    </View>
                                </View>
                                <View style={styles.introItem}>
                                    <Image source={anquan} resizeMode={'contain'} style={{width:18,height:18,marginTop:2}}></Image>
                                    <View style={{paddingLeft:5}}>
                                        <Text style={{fontSize:15,color:"#333"}}>较低风险，投资策略稳健</Text>
                                        <Text style={{fontSize:14,color:"#999"}}>100%主投固收类资产，不参与股市，中高评级信用债为主，根据市场择机参与利率债投资</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{backgroundColor:"#fff",width:"100%",marginTop:20}}>
                            <Text style={{color:'#333333', fontSize:17, fontWeight:"bold",paddingLeft:20,marginTop:16}}>交易规则</Text>
                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"30%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:20,fontSize:15,color:"#999"}}>购买时间</Text>
                                </View>
                                <View style={{width:"70%",textAlign:"right"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingRight:20}}>申购首日9:30 - 末日22:30</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"30%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:20,fontSize:15,color:"#999"}}>购买费率</Text>
                                </View>
                                <View style={{width:"70%",textAlign:"right"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingRight:20}}>购买费率为0</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"30%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:20,fontSize:15,color:"#999"}}>赎回时间</Text>
                                </View>
                                <View style={{width:"70%",textAlign:"right"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingRight:20}}>到期自动还本付息</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"30%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:20,fontSize:15,color:"#999"}}>赎回费率</Text>
                                </View>
                                <View style={{width:"70%",textAlign:"right"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingRight:20}}>无</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"30%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:20,fontSize:15,color:"#999"}}>到账时间</Text>
                                </View>
                                <View style={{width:"70%",textAlign:"right"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingRight:20}}>T+3内到账,最快T+0,T指工作日</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{backgroundColor:"#fff",width:"100%",marginTop:20,paddingBottom:16,}}>
                            <Text style={{color:'#333333', fontSize:17, fontWeight:"bold",paddingLeft:20,marginTop:16}}>产品介绍</Text>
                            <Text style={{color:'#DA8C2A', paddingLeft:20, fontSize:15}}>中低风险</Text>
                            <Text style={{color:'#333', paddingLeft:20, fontSize:15}}>本金风险相对较小，收益浮动相对可控。</Text>
                        </View>
                </ScrollView>
                <View style={styles.ensure}>
                    <View style={[{flexDirection:'row',justifyContent:'space-around'}]}>
                        <LinearGradient style={{width:"45%", height:45, borderRadius:5,}} colors={$globalStyle.buttonLinerBackground}  >
                        <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                                this.props.addTellerList(3,'请您输入理财产品购买金额',false,'');
                                this.props.callBackHome('monetary',item)
                            }}>购买</Text>
                        </LinearGradient>
                        <LinearGradient style={{width:"45%",height:45, borderRadius:5, backgroundColor:'#ddd' }}  colors={['#ddd','#ddd']}  >
                        <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                                // this.props.enterReportLoss('manageMoneyInfo','','已确认理财产品信息')
                                if( this.props.manageMoneyIndex == 1 ){
                                    this.props.callBackHome('manageMoneyList',1)
                                }else{
                                    this.props.closeHome();
                                }
                            }}>返回</Text>
                        </LinearGradient>
                    </View>

                </View>
        </View>
    );
  }
  
};

const styles = StyleSheet.create({
    Stance:{
        width:4,
        height:16,
        backgroundColor:$globalStyle.tellerOperation.listColor,
        marginRight:8
    },
    introItem:{
        paddingLeft:20,
        paddingTop:20,
        flexDirection:'row'
    },
    productIntroductionTop:{
        flexDirection: 'row',
        marginTop:10,
        marginBottom:10,
        paddingBottom:15,
    },
    allBox:{
        width:"100%",
        height:"100%",
        backgroundColor:"#f4f4f4"
    },
    titleBox:{
        flexDirection: 'row',
        width:"100%",
        paddingLeft:20,
        paddingTop:20,
        paddingBottom:16
    },
    contentItemBox:{
        width:"100%",
    },
    contentBox:{
        width:"100%",
    },
    titleIco:{
        fontSize:36,
        lineHeight:24,
        fontWeight:"bold",
        color:"#E39634"
    },
    title:{
        fontSize:17,
        lineHeight:20,
        marginLeft:5,
        color:"#313131",
        fontWeight:"bold"
    },
    bottomBox:{
        paddingLeft:20,
        paddingRight:20,
    },
    progressBox:{
        width:"92%",
        marginLeft:"4%",
        height:100,
        marginTop:40,
        // paddingLeft:10,
        // paddingRight:10
        // backgroundColor:"#ddd"
    },
    ensure:{
        width:'90%',
        height:45,
        marginLeft:'5%',
        borderRadius:5,
        marginTop:10,     
        marginBottom:20,               
      }
});