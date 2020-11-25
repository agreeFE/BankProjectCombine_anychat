//修改密码

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import Pickers from '$/components/picker/pickerPro.js'
import { OPEN } from '../imageSource/imageSource';
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);


import '@/window'
const NetworkUtil = require('$/util/networkutil');
const DateUtil = require('$/util/dateutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');

module.exports = class ReportLoss extends Component < {} > {
  constructor(props) {

    super(props);

    this.state={
      ViewHeight:'100%',
      CreditCardCVV2:'',
      repaymentCreditCardDate:DateUtil.getYearMonthArray(2019, 2099),
      CreditCardDate: '', //转出周期
    }

    this.CreditCardCVV2 = this.CreditCardCVV2.bind(this)
    // this.CreditCardDate = this.CreditCardDate.bind(this)
  }
  componentDidMount() {
    let _this = this;
    _this.setState({
      ViewHeight:parseInt( Dimensions.get('window').height ) - 230,
    })
  }

  /**
   * @点击确认按钮提交信息
   * @author 卢鹏宇
   * @date 2019-09-25
   * @returns
   */
  fClickEnter(){
    let _this = this;
    let CreditCardCVV2 = _this.state.CreditCardCVV2;
    let CreditCardDate = _this.state.CreditCardDate;
    if( CreditCardCVV2.length <=0 || CreditCardCVV2 == ''){
      $Toast.info( 'CVV码不能为空', 1 );
      return;
    }
    if( CreditCardDate.length <=0 || CreditCardDate == ''){
      $Toast.info( '有效期不能为空', 1 );
      return;
    }
    CreditCardDate = CreditCardDate[0].substr(2,2) + CreditCardDate[1].substr(0,2);
    let params = [
      {
        FIELDCODE: 'CreditCardCVV2',
        FIELDVALUE: CreditCardCVV2
      },
      {
        FIELDCODE: 'CreditCardInDate',
        FIELDVALUE: CreditCardDate
      },
    ]
    _this.props.enterReportLoss( 'cardInfoSub', params  )
  }

  // 新密码输入框
  CreditCardNo( val ){
    let _this = this;
    _this.setState({
      CreditCardNo:val,
    })
  }
  CreditCardCVV2( val ){
    let _this = this;
    _this.setState({
      CreditCardCVV2:val,
    })
  }

  // 控制转出周期模态框显隐
  showCreditCardDate = () => {
    this.CreditCardDatePickers.init()
  }

  CreditCardDatePickerConfirm = (data) => {
    this.setState({
      CreditCardDate: data
    })
  }


  render() {
    let { repaymentCreditCardDate, CreditCardDate } = this.state
    return ( 
        <View style={{ height:this.state.ViewHeight }} >
          <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
            <Text style={styles.Stance}></Text>
            <Text style={styles.title}>填写信用卡信息</Text>
          </View>
          <ScrollView>
            <View style={styles.loanItem}>
              <Text> CVV码 </Text>
                <View style={styles.loanItemRight}>
                <TextInput   style={[ styles.useLoan, styles.loanItemRightText]}
                    placeholder="请输入信用卡CVV码"
                    ref="CreditCardCVV2"
                    onChangeText = { this.CreditCardCVV2 }
                    ></TextInput>
                </View>
            </View>
            <View style={styles.loanItem}>
              <Text>有效期</Text>
              <TouchableWithoutFeedback onPress={this.showCreditCardDate}>
                <View style={styles.loanItemRight}>
                  <Text style={[styles.loanItemRightText]} >{CreditCardDate}</Text>
                  <Image source={OPEN}></Image>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
          {/* 信用卡有效期模态窗 */}
          <Pickers
              ref={(view) => { this.CreditCardDatePickers = view }}
              pickerData={repaymentCreditCardDate}
              selectedValue={[CreditCardDate]}
              onPickerConfirm={this.CreditCardDatePickerConfirm}
              onPickerCancel={(data) => { console.warn(data) }}
            ></Pickers>
          <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
              <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                      // this.props.callBackHome('enterPassword');
                      this.fClickEnter()
                  }}>确认</Text>
          </LinearGradient>
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
  title:{
    color:'#000',
    fontSize:17,
    fontWeight:"bold"
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
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    color:'#999'
  },
  ensure:{
    width:'90%',
    height:45,
    marginLeft:'5%',
    borderRadius:5,
    backgroundColor:'#E39634',
    marginTop:10,
    marginBottom:20
    // position:'absolute',
    // bottom:120,
    // left:'5%'                        
  }
});