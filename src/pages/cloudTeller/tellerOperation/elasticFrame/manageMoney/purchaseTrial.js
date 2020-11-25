//理财购买试算
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

const { formatMoney } = require('$/util/moneyutil')
const { getTimespamp, getDatetimeByFormat } = require('$/util/dateutil');

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');

// const todo = [
//     {
//       "FIELDVALUE": "ACX191104",
//       "FIELDNAME": "产品代码",
//       "FIELDCODE": "ProCode"
//     },
//     {
//       "FIELDVALUE": "赞同创新系列191104期",
//       "FIELDNAME": "产品名称",
//       "FIELDCODE": "ProName"
//     },
//     {
//       "FIELDVALUE": "1003",
//       "FIELDNAME": "产品系列",
//       "FIELDCODE": "ProSerial"
//     },
//     {
//       "FIELDVALUE": "3.95%",
//       "FIELDNAME": "预计收益率",
//       "FIELDCODE": "PreYield"
//     },
//     {
//       "FIELDVALUE": "765.43",
//       "FIELDNAME": "理财金额",
//       "FIELDCODE": "FLAMT"
//     },
//     {
//       "FIELDVALUE": "30.23",
//       "FIELDNAME": "理财利息 ",
//       "FIELDCODE": "INTEREST"
//     },
//     {
//       "FIELDVALUE": "20190101",
//       "FIELDNAME": "发售起始日",
//       "FIELDCODE": "SaleStartDate"
//     },
//     {
//       "FIELDVALUE": "20201001",
//       "FIELDNAME": "产品到期日",
//       "FIELDCODE": "EndDate"
//     },
//     {
//       "FIELDVALUE": "5",
//       "FIELDNAME": "产品期限",
//       "FIELDCODE": "ProLimit"
//     }
//   ]

module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
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
        FLAMT:'',
        ProLimit:'',
        PreYield:'',
        
    };

  }
    componentDidMount() {

        let _this = this
        let startDate = '';
        let endDate = '';
        let nowYear = getDatetimeByFormat(new Date(),'yyyy')
        _this.props.data.map(( item, index )=>{
            // todo.map(( item, index )=>{
            if( item['FIELDCODE'] == 'FLAMT' ){
                _this.setState({
                    FLAMT:item['FIELDVALUE']
                })
            }else if( item['FIELDCODE'] == 'ProLimit' ){
                _this.setState({
                    ProLimit:item['FIELDVALUE']
                })
            }else if( item['FIELDCODE'] == 'PreYield' ){
                _this.setState({
                    PreYield:item['FIELDVALUE']
                })
            }else if( item['FIELDCODE'] == 'SaleStartDate' ){
                startDate = item['FIELDVALUE'].substring(4,8)
                let startArr = _this.state.progressArray;
                startArr[0]['date'] = startDate.slice(0,2)+'.'+startDate.slice(2);
                // startArr[1].date = getDatetimeByFormat(new Date(), 'MM.dd')
                // startArr[2].date = _this.GetDateStr(2)
            }else if( item['FIELDCODE'] == 'EndDate' ){
                endDate = item['FIELDVALUE'].substring(4,8)
                let endYear = item['FIELDVALUE'].substring(0,4);
                let endArr = this.state.progressArray;
                if( parseInt(endYear) > parseInt(nowYear) ){
                    endArr[3].date = endYear.slice(2)+'.'+endDate.slice(0,2)+'.'+endDate.slice(2);
                }else{
                    endArr[3].date = endDate.slice(0,2)+'.'+endDate.slice(2);
                }

            }else if( item['FIELDCODE'] == 'INTEREST' ){
                _this.setState({
                    expected:item['FIELDVALUE']
                })
            }
        })
        // 截止日期
        let JZYear = '20191018'.substring(0,4);
        let JZDate = '20191018'.substring(4,8);
        let startArr = _this.state.progressArray;
        let date = new Date( nowYear+'-'+JZDate.slice(0,2)+'-'+JZDate.slice(2) );
            newM =  date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
            newD = parseInt( date.getDate() )+ 1
            newD = newD > 9 ? newD : `0${newD}`;
        if( parseInt(JZYear) > parseInt(nowYear) ){
            startArr[2].date = JZYear.slice(2)+'.'+newM+'.'+newD;
        }else{
            startArr[2].date = newM+'.'+newD;
        }
        
    }

    GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 > 9 ? dd.getMonth() + 1 : `0${dd.getMonth() + 1}`;//获取当前月份的日期
        var d = dd.getDate() > 9 ? dd.getDate() : `0${dd.getDate()}`;
        return m+'.'+d;
    }

  render() {
    let index =2;
    return (
        <View style={styles.allBox}>
            <View style={styles.contentBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.Stance}></Text>
                    <Text style={styles.title}>收益试算</Text>
                </View>
                <ScrollView>
                    <View style={styles.contentItemBox}>
                        {/* 购买详情 */}
                        <View style={{borderBottomColor:"#D8D8D8",borderBottomWidth:1,borderTopColor:"#D8D8D8",borderTopWidth:1,width:"100%",marginBottom:10,backgroundColor:"#E8EFFF"}}>
                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"45%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:25}}>购买金额</Text>
                                </View>
                                <View style={{width:"55%",textAlign:"right"}}>
                                    <Text style={{textAlign:"right",lineHeight:40,paddingRight:25}}>{formatMoney(this.state.FLAMT)}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"45%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:25}}>产品期限(天)</Text>
                                </View>
                                <View style={{width:"55%",textAlign:"right"}}>
                                    <Text style={{textAlign:"right",lineHeight:40,paddingRight:25}}>{this.state.ProLimit}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',width:"100%",height:40,lineHeight:40}}>
                                <View style={{width:"45%",textAlign:"left"}}>
                                    <Text style={{textAlign:"left",lineHeight:40,paddingLeft:25}}>业绩基准(%)</Text>
                                </View>
                                <View style={{width:"55%",textAlign:"right"}}>
                                    <Text style={{textAlign:"right",lineHeight:40,paddingRight:25}}>{this.state.PreYield}</Text>
                                </View>
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

                                        {/* <Text style={{width:'100%',height:20,lineHeight:20,fontSize:10}}>{this.state.progressArray[i].name}</Text> */}
                                        
                                    </View>
                                )
                            })}

                        </View>

                        {/* 预期收益 */}
                        <View style={styles.productIntroductionTop}>
                            <View style={{width:"100%",height:150}}>
                                <Text style={{textAlign:"left",width:"100%",height:35,lineHeight:40,fontSize:13,color:"#8F8F8F",paddingLeft:20}}>起息日是计算收益开始日,
                                    <Text style={{color:"#F47265"}}> 现在买入,{this.state.progressArray[2].date}开始计算收益</Text>
                                </Text>
                                <Text style={{textAlign:"center",width:"100%",height:35,lineHeight:40,fontSize:16}}>预计收益</Text>
                                <Text style={{textAlign:"center",width:"100%",height:45,lineHeight:50,color:"#EF6155",fontSize:28}}>{formatMoney(this.state.expected)}</Text>
                                <Text style={{textAlign:"left",width:"100%",height:35,lineHeight:40,fontSize:13,color:"#8F8F8F",paddingLeft:20}}>试算收益仅供参考;理财非存款,产品有风险,投资需谨慎</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomBox}>
                <LinearGradient style={[styles.ensure,{marginTop:14,borderRadius:5}]} colors={$globalStyle.buttonLinerBackground}  >
                    <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                                this.props.closeHome('purchaseTrial')
                    }}>确认</Text>
                </LinearGradient>
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
    progressBox:{
        width:"94%",
        marginLeft:"3%",
        height:70,
        // paddingRight:10
        // backgroundColor:"#ddd"
    },
    introItem:{
        paddingLeft:20,
        paddingTop:20
    },
    productIntroductionTop:{
        flexDirection: 'row',
        marginTop:2,
        marginBottom:10,
        paddingBottom:15,
    },
    allBox:{
        width:"100%",
        height:"100%",
        backgroundColor:"#F4F4F4",
        borderTopLeftRadius:15, borderTopRightRadius:15, 
    },
    titleBox:{
        flexDirection: 'row',
        width:"100%",
        paddingLeft:20,
        paddingTop:32,
        paddingBottom:20,
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
        lineHeight:21,
        marginLeft:5,
        color:"#313131",
        fontWeight:"bold"
    },
    bottomBox:{
        width:'90%',
        height:45,
        marginLeft:'5%',
        borderRadius:5,
        marginTop:10,  
        marginBottom:20, 
    }
});