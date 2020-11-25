//购买金额
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio,TextInput, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LinearGradient from "react-native-linear-gradient"

import Pickers from '$/components/picker/pickerPro.js'
import { OPEN,DUIGOU  } from '../imageSource/imageSource';

import CardPick from '$/components/cardPick'
import InputScrollView from 'react-native-input-scroll-view';

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
const { formatMoney } = require('$/util/moneyutil')

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
const DateUtil = require('$/util/dateutil');
const tokenutil = require('$/util/tokenutil');

module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
        moneyValue:"",
        repaymentCreditCardDate:['6224 8480 7680 8765', '6224 8480 7680 8765'],
        CreditCardDate: '中国银行（0879）', //转出周期
        viewHeight:'100%',
        boxClick:false,
        placeholderInfo:'',
        textareaHeight:60,
        pickIndex: 0, //模态框被选择的索引值
        cardInfoList: [
            {key:0, value:'62222222255252522', label:'中国银行', acc_bal:'7000'},
            {key:1, value:'62222222255252522', label:'中国银行', acc_bal:'6000'},
            {key:2, value:'62222222255252522', label:'中国银行', acc_bal:'5000'},
            {key:3, value:'62222222255252522', label:'中国银行', acc_bal:'2000'},
            {key:4, value:'62222222255252522', label:'中国银行', acc_bal:'4000'},
        ],
        payCard: { 'card_bank': '中国银行', 'card_no': '62252888888', 'acc_bal': '100000' },//付款卡信息
        inputNone:false
    };
    this.onChangeTextHandle = this.onChangeTextHandle.bind(this);

  }
  componentWillMount () {  //将要加载控件
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }
 
  componentWillUnmount () { //将要销毁控件
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow (e) {  //当键盘弹出的时候要做的事
        //拿到的值就是键盘的高度
    this.setState({
      textareaHeight: e.endCoordinates.height + 150 
    })
  }

  _keyboardDidHide (e) {   //当键盘收缩的时候要做的事
    this.setState({
      textareaHeight:  60 ,
      ViewHeight:'auto',
    })
  }
    componentDidMount() {
        let _this = this
        // let inputView = _this.refs.inputView;
        // inputView.focus(); 
        let item = this.props.data;
        // item = [
        //     "true",
        //     "1",
        //     "PSDR191104",
        //     "个人人民币结构性存款191104期",
        //     "CCY",
        //     "1001",
        //     "R1",
        //     "5",
        //     "20190101",
        //     "20201001",
        //     "20201001",
        //     "5.25%",
        //     "AYO/网银/手机",
        //     "10000"
        // ]
        _this.setState({
            placeholderInfo:'起购金额'+ formatMoney(item[13]) +'，1元递增',
        })
    }
    buy(){
        let _this = this;
        let item = _this.props.data
        // item = [
        //     "true",
        //     "1",
        //     "PSDR191104",
        //     "个人人民币结构性存款191104期",
        //     "CCY",
        //     "1001",
        //     "R1",
        //     "5",
        //     "20190101",
        //     "20201001",
        //     "20201001",
        //     "5.25%",
        //     "AYO/网银/手机",
        //     "10000"
        // ]
        let moneyValue = _this.state.moneyValue;
        if( moneyValue == null || moneyValue.length== 0 ){
            $Toast.info( '购买金额不能为空。' , 1 );
            return;
        }
        if( parseInt(moneyValue) < parseInt( item[13].replace(',','') ) ){
            $Toast.info( '购买金额不能低于'+ formatMoney(item[13]) , 1 );
            return;
        }
        if( !_this.isInit(moneyValue) ){
            $Toast.info( '请输入大于起售金额的整数' , 1 );
            return;
        }
        if( !_this.state.boxClick ){
             $Toast.info( '请阅读并勾选相关协议。', 2);
            return;
        }
        let params = [
            {
                FIELDCODE: 'PRONAME',
                FIELDVALUE: item[3]
            },
            {
                FIELDCODE: 'FLAMT',
                FIELDVALUE: _this.state.moneyValue
            },
            {
                FIELDCODE: 'INTEREST',
                FIELDVALUE: ( ( ( ( parseFloat(item[11]) / 100 ) / 365 ) * parseInt( item[7] ) ) * parseInt( _this.state.moneyValue ) ).toFixed(2)
            },
            {
                FIELDCODE: 'PROCODE',
                FIELDVALUE: item[2]
            },
            {
                FIELDCODE: 'ProCurrency',
                FIELDVALUE: item[4]
            }
        ]
        _this.refs.inputView.blur();
        window.$globalManageMoney = _this.state.moneyValue;
        window.$globalManageName = item[3];
        _this.props.enterReportLoss( 'monetary',  params, '已输入购买金额。' );
    }
    onChangeTextHandle(value){
        let _this = this;
        _this.setState({
            moneyValue:value
        })
    }


    //pick选中回调
    getDateValue = ({ index, item }) => {
        // console.warn(item);
        let _this = this
        var payInfo = { 'card_bank': item.label, 'card_no': item.value, 'acc_bal': item.acc_bal }
        _this.setState({ payCard: payInfo })
        _this.setState({ pickIndex: item.key })
    }
    // 显示模态框
    toggleModal = () => {
        // this.cardPick.toggleModal()
        Keyboard.dismiss()
        setTimeout(() => {
        this.cardPick.toggleModal()
        }, 20)
    }

    _onLayout = (e) => {
        let {x,y,width,height} = e.nativeEvent.layout
        this.setState({
            viewHeight:height
        })
    }

    isInit(num) {
        return num%1 === 0
    }

    fBoxClick(){
         this.setState({
            boxClick:!this.state.boxClick
        }) 
    }

    fInputNone(){
        this.setState({
            inputNone:true
        })
    }

    render() {
        let index =2;
        let { repaymentCreditCardDate, CreditCardDate, viewHeight} = this.state
        let item = this.props.data
        // item = [
        //     "true",
        //     "1",
        //     "PSDR191104",
        //     "个人人民币结构性存款191104期",
        //     "CCY",
        //     "1001",
        //     "R1",
        //     "5",
        //     "20190101",
        //     "20201001",
        //     "20201001",
        //     "5.25%",
        //     "AYO/网银/手机",
        //     "10000"
        // ]
        return (
            <View style={[styles.allBox,{borderTopLeftRadius:15, borderTopRightRadius:15,height:viewHeight}]} onLayout={this._onLayout}>
                    <View style={styles.titleBox}>
                        <Text style={styles.Stance}></Text>
                        {/* <Text style={styles.title}>{this.props.data[3]}</Text> */}
                        <Text style={styles.title}>输入购买金额</Text>
                    </View>
                <InputScrollView >
                    <View style={{backgroundColor:"#fff",}}>
                        <Text style={{paddingLeft:20,paddingTop:10, paddingBottom:10, fontSize:17,color:'#4D7486',fontWeight:'bold'}}>{item[3]}</Text>
                        {/* <View style={styles.loanItem}>
                            <Text style={{fontSize:15,}}>付款卡</Text>
                            <TouchableWithoutFeedback onPress={this.toggleModal}>
                                <View style={styles.loanItemRight}>
                                    <View>
                                        <Text style={[styles.loanItemRightText,{fontSize:15,paddingTop:11, paddingRight:8}]} >{this.state.payCard.card_bank}({(this.state.payCard.card_no).substr(-4)})</Text>
                                        <Text style={[styles.loanItemRightText, {fontSize:14, color:'#999', paddingRight:8,paddingBottom:11}]} >余额  ¥ {formatMoney(this.state.payCard.acc_bal)}</Text>
                                    </View>
                                    <Image source={OPEN}></Image>
                                </View>
                            </TouchableWithoutFeedback>
                        </View> */}
                        <Text style={{paddingLeft:20, paddingTop:20 ,fontSize:16, color:'#3a3a3a', fontWeight:'bold'}}>购买金额</Text>
                        <View style={{flexDirection: 'row',height:this.state.textareaHeight}}>
                            <View style={{width:"15%",}}>
                                <Text style={{paddingLeft:15,paddingTop:15,fontSize:25}}>￥</Text>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <View style={{width:"80%",marginTop:10,}}>
                                    <TextInput value={this.state.moneyValue} 
                                        ref= 'inputView' 
                                        onChangeText={this.onChangeTextHandle} 
                                        placeholder={ this.state.placeholderInfo }
                                        style={{fontSize:15}} 
                                        keyboardType="numeric"
                                        />
                                </View>
                                <View style={{width:"10%",marginTop:28}} >
                                    <Text onPress={() => {
                                        this.setState({
                                            moneyValue:""
                                        })
                                    }} style={{paddingLeft:-5,lineHeight:15,width:15,height:15,backgroundColor:"#DDDDDD",borderRadius:15,textAlign:"center",color:"#fff"}}>×</Text>
                                </View>
                            </View>   
                            {/* {
                                this.state.inputNone?
                                    <View style={{flexDirection:"row"}}>
                                        <View style={{width:"80%",marginTop:10,}}>
                                            <TextInput value={this.state.moneyValue} 
                                                ref= 'inputView' 
                                                onChangeText={this.onChangeTextHandle} 
                                                placeholder={ this.state.placeholderInfo }
                                                style={{fontSize:15}} 
                                                keyboardType="numeric"
                                                onBlur= { this.fInputNone()}
                                                />
                                        </View>
                                        <View style={{width:"10%",marginTop:28}} >
                                            <Text onPress={() => {
                                                this.setState({
                                                    moneyValue:""
                                                })
                                            }} style={{paddingLeft:-5,lineHeight:15,width:15,height:15,backgroundColor:"#DDDDDD",borderRadius:15,textAlign:"center",color:"#fff"}}>×</Text>
                                        </View>
                                    </View>    
                                :
                                    <Text style={{width:"100%",marginTop:10,lineHeight:45,fontSize:15,}} onPress={()=>{
                                        console.warn(22)
                                        this.setState({
                                            inputNone :true
                                        })
                                    }}
                                    >{ formatMoney(this.state.moneyValue)}</Text>
                            } */}
                        </View>
                    </View>
                <View style={styles.userBox}>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.fBoxClick()
                    }}>
                        <View style={{width:30,height:60}}>

                            <View style={{width:16, height:16 ,borderColor:'#dedede', borderWidth:1, backgroundColor:this.state.boxClick?'#85A9B5':'#fff', paddingLeft:2, marginTop:2}}>
                                {
                                    this.state.boxClick?
                                    <Image source={DUIGOU} resizeMode={'contain'} style={{width:12,height:12,}}></Image>
                                    :null
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View  style={styles.userTalk} >
                        <Text style={styles.userTalkText}>我已同意
                            <Text style={{color:'#E9962F'}} onPress={()=>{this.props.callBackHome('equity', 2, item)}}>《理财产品购买确认书》</Text>   
                            {/* <Text style={{color:'#E9962F'}} onPress={()=>{this.props.callBackHome('risk', 2, item)}}>《风险揭示书》</Text>    */}
                            {/* <Text style={{color:'#E9962F'}}>《销售协议书》</Text>    */}
                            ，并知晓页面展示收益率不代表收益承诺。
                        </Text>
                    </View>
                </View>
            </InputScrollView>
                <View style={styles.bottomBox}>
                    <LinearGradient style={[styles.ensure,{marginTop:14,borderRadius:5}]} colors={$globalStyle.buttonLinerBackground} >
                        <Text  style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                                this.buy()
                        }}>确认购买</Text>
                    </LinearGradient>
                </View>
                {/* 信用卡有效期模态窗 */}
           {/* 模态窗 */}
          <CardPick
            ref={ref => { this.cardPick = ref }}
            cardList={this.state.cardInfoList}
            selectIndex={this.state.pickIndex}
            onConfirm={this.getDateValue}
          ></CardPick>
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
    allBox:{
        width:"100%",
        height:"auto",
        backgroundColor:"#F4F4F4",
    },
    titleBox:{
        flexDirection: 'row',
        width:"100%",
        paddingLeft:24,
        paddingTop:32,
        paddingBottom:20
    },
    MoneyBox:{
        borderBottomColor:"#DADADA",
        borderBottomWidth:1,
        width:"100%",
        height:80
    },
    contentItemBox:{
        width:"100%",
        height:"97%",
        marginTop:"1%",
        backgroundColor:"#fff"
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
        borderRadius:5,
        position:'absolute',
        bottom:40,
        left:'5%'
    },
    loanItemRightText: {
        textAlign: 'right',
        height: 40,
        lineHeight:40,
        textAlign:"right",
        paddingRight:5
    },
    loanItemRight: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 100,
        height: 35,
    },
    loanItem: {
        height: 65,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        borderTopColor: '#F0F0F0',
        borderTopWidth: 1,
        color:'#999'
    },
    userBox:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        flexDirection:"row"
    },
    userTalk:{
        paddingRight:20
    }
});