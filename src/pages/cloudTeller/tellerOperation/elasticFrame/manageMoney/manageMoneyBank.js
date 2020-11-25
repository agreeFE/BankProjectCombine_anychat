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
      ACCNO:'',
      VOUNO:'',
    }

    this.ACCNO = this.ACCNO.bind(this)
    this.VOUNO = this.VOUNO.bind(this)
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
    let ACCNO = _this.state.ACCNO;
    let VOUNO = _this.state.VOUNO;
    if( ACCNO.length <=0 || ACCNO == '' ){
      $Toast.info( '信用卡卡号不能为空', 1 );
      return;
    }
    let params = [
      {
        FIELDCODE: 'ACCNO',
        FIELDVALUE: ACCNO
      },
      {
        FIELDCODE: 'VOUNO',
        FIELDVALUE: VOUNO
      },
    ]
    _this.props.enterReportLoss( 'manageMoneyBank', params, '已完成信息输入。'  )
  }

  ACCNO( val ){
    let _this = this;
    _this.setState({
      ACCNO:val,
    })
  }
  VOUNO( val ){
    let _this = this;
    _this.setState({
      VOUNO:val,
    })
  }

  // 控制转出周期模态框显隐
  showCreaditCardDate = () => {
    this.creaditCardDatePickers.init()
  }

  creaditCardDatePickerConfirm = (data) => {
    this.setState({
      CreaditCardDate: data
    })
  }


  render() {
    let { repaymentCreaditCardDate, CreaditCardDate } = this.state
    return ( 
        <View style={{ height:this.state.ViewHeight }} >
          <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
            <Text style={styles.Stance}></Text>
            <Text style={styles.title}>填写银行卡信息</Text>
          </View>
          <ScrollView>
            <View style={styles.loanItem}>
              <Text> 账号 </Text>
              <View style={styles.loanItemRight}>
                <TextInput   style={[ styles.useLoan, styles.loanItemRightText]}
                    placeholder="请输入账号"
                    ref="ACCNO"
                    keyboardType={'numeric'}
                    onChangeText = { this.ACCNO }
                    ></TextInput>
              </View>
            </View>
            <View style={styles.loanItem}>
              <Text> 凭证号 </Text>
              <View style={styles.loanItemRight}>
                <TextInput   style={[ styles.useLoan, styles.loanItemRightText]}
                    placeholder="请输入账号"
                    ref="VOUNO"
                    keyboardType={'numeric'}
                    onChangeText = { this.VOUNO }
                    ></TextInput>
              </View>
            </View>
          </ScrollView>
          <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
              <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
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
    marginBottom:20,
    // position:'absolute',
    // bottom:120,
    // left:'5%'                        
  }
});