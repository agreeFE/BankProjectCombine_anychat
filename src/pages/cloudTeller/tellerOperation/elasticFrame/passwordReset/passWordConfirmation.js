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
} from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);


import '@/window'
import Close from '../close'

const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');

module.exports = class ReportLoss extends Component < {} > {
  constructor(props) {

    super(props);

    this.state={
      viewHeight:'100%',
      newPassWordValue:'',
      repeatPassWordValue:'',
      acctType:""
    }    
    
    this.newPassWordChange = this.newPassWordChange.bind(this)
    this.repeatPassWordChange = this.repeatPassWordChange.bind(this)
  }

  componentDidMount() {
    let _this = this;
    _this.inputFocus()
    if(_this.props.data.find && _this.props.data.find(e=>e.FIELDCODE == "OPENACCTYPE") && _this.props.data.find(e=>e.FIELDCODE == "OPENACCTYPE").FIELDVALUE == "2"){
      _this.setState({acctType:"存折"},()=>{
      })
    }else{
      _this.setState({acctType:"银行卡"})
    }
  }

  

  /**
   * @点击确认按钮提交信息
   * @author 卢鹏宇
   * @date 2019-09-25
   * @returns
   */
  fClickEnter(){
    let _this = this;
    let newPassWord = _this.state.newPassWordValue;
    let repeatPassWordValue = _this.state.repeatPassWordValue;
    if( newPassWord.length < 6 ){
      $Toast.info( '新取款密码长度不足6位', 1 );
      return;
    }
    if( repeatPassWordValue !== newPassWord ){
      $Toast.info( '两次密码输入不一致请重新输入', 1 );
      return;
    }
    _this.props.enterReportLoss( 'repeatPassword', newPassWord, '已完成密码输入。'  )
  }

  // 新密码输入框
  newPassWordChange( val ){
    let _this = this;
    _this.setState({
      newPassWordValue:val,
    })
  }
  // 第二次确认密码输入
  repeatPassWordChange( val ){
    let _this = this;
    _this.setState({
      repeatPassWordValue:val,
    })
    if( val.length >= 6){
      _this.refs.repeatNewPassWord.blur()
    }
  }

  inputFocus(){
    let newPassWord = this.refs.newPassWord;
    newPassWord.focus(); 
  }

  _onLayout = (e) => {
        let {x,y,width,height} = e.nativeEvent.layout
        this.setState({
            viewHeight:height
        })
    }

  render() {
     let { viewHeight} = this.state
    return ( 
      <Close  >
        <View style={{ height:viewHeight,backgroundColor:"#f4f4f4", borderTopLeftRadius:15, borderTopRightRadius:15,position:'relative'}} onLayout={this._onLayout} >
          <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
            <Text style={styles.Stance}></Text>
            <Text style={styles.title}>设置{this.state.acctType}密码</Text>
          </View>
            <View style={styles.loanItem}>
              <Text> {this.state.acctType}密码 </Text>
              <View style={styles.loanItemRight}>
                <TextInput   style={[ styles.useLoan, styles.loanItemRightText]}
                    placeholder="请输入6位密码"
                    ref="newPassWord"
                    keyboardType={'number-pad'}
                    secureTextEntry={true}
                    maxLength={6} 
                    onChangeText = { this.newPassWordChange }
                    ></TextInput>
              </View>
            </View>
            <View style={styles.loanItem}>
              <Text> 再次输入{this.state.acctType}密码 </Text>
                <View style={styles.loanItemRight}>
                <TextInput   style={[ styles.useLoan, styles.loanItemRightText]}
                    placeholder="请再次输入6位密码"
                    ref="repeatNewPassWord"
                    keyboardType={'number-pad'}
                    secureTextEntry={true}
                    maxLength={6} 
                    onChangeText = { this.repeatPassWordChange }
                    ></TextInput>
                </View>
            </View>
            
          <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
              <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                      // this.props.callBackHome('enterPassword');
                      this.fClickEnter()
                  }}>确认</Text>
          </LinearGradient>
        </View>
      </Close>
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
    borderRadius:5,
    backgroundColor:'#E39634',
    position:"absolute",
    bottom:20,
    left:'5%'
  }
});