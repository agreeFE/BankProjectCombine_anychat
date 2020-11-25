import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions, TextInput, ScrollView, Keyboard } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import InputScrollView from 'react-native-input-scroll-view';

const { formatMoney } = require('$/util/moneyutil')
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);


import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');

module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      focusIndex: 0,
      value: [
        {text:''},
        {text:''},
        {text:''},
        {text:''},
        {text:''},
        {text:''},
      ],
      inputValue:[],
      textareaHeight:80,
      userInfoData:{},//用户信息
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const _this = this
    const { focusIndex } = _this.state
    let newValue = this.state.value;
        newValue = [
          {text:''},
          {text:''},
          {text:''},
          {text:''},
          {text:''},
          {text:''},
        ];
    let inputText = event.nativeEvent.text 
    for( let i = 0 ; i < inputText.length ; i++ ){
      newValue[i].text = '*' ;
      i >= 5 ? _this.setState({
        inputValue : inputText
      }):''
    }
    _this.setState({
      focusIndex: focusIndex+1,
      value: newValue,
    },()=>{
      if( _this.state.focusIndex > 5 ){
        _this.refs.inputView.blur();
      }
    })
  }

  submit(){
    let _this = this;
    _this.refs.inputView.blur();
    if( _this.state.inputValue.length < 6 ){
      $Toast.info( '请输入密码', 2);
      return;
    }
    _this.props.enterReportLoss( 'password',  _this.state.inputValue ,'已完成密码输入。');
  }

  _keyboardDidShow (e) {  //当键盘弹出的时候要做的事
        //拿到的值就是键盘的高度
    this.setState({
      textareaHeight: e.endCoordinates.height + 150 
    })
    console.warn( this.state.textareaHeight)
  }

  _keyboardDidHide (e) {   //当键盘收缩的时候要做的事
    this.setState({
      textareaHeight:  80 ,
      ViewHeight:'auto'
    })
  }


  componentWillMount () {  //将要加载控件
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }
 
  componentWillUnmount () { //将要销毁控件
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  componentDidMount() {
    this.props.btnState ?  this.inputFocus(): '';
    this.props.btnState ?  'this.inputFocus()' :
    this.setState({
      ViewHeight:parseInt( Dimensions.get('window').height ) - 260,
    })
    //获取用户偏好数据
    $Storage.load({
        key: 'userInfo'
    }).then(result => {
        var userInfo = JSON.parse(result);
        _this.setState((previousState) => {
            return ({
                userInfoData: userInfo,
            })
        });
    });
  }
  
  inputFocus(){
    let inputView = this.refs.inputView;
    inputView.focus(); 
  }

  render() {
    let index =2;
    const { focusIndex, value, textareaHeight } = this.state;
    return (
      <View style={{backgroundColor: 'rgba(0,0,0,0.30)',width:'100%',height:'100%'}}>
        <View style={{width:'90%',position:'absolute',top:'20%',left:'5%',backgroundColor:'#fff',borderRadius:10,}}>
          <View style={{marginTop:12,marginBottom:15,borderBottomColor:'#ebebeb',borderBottomWidth:1,paddingBottom:12}}>
            <Text style={styles.title}>请输入取款密码</Text>
          </View>
          <View style={{position:"relative"}}>
            <Text style={{color:"#333", fontSize:15, width:"100%", textAlign:"center"}}>{this.state.userInfoData.cnName} <Text style={{color:'#666'}}>(中国银行)</Text> </Text>
            {/* <Text style={{color:"#333", fontSize:24, width:"100%", textAlign:"center", marginBottom:16,marginTop:16}}> ￥{formatMoney(window.$globalManageMoney)} </Text> */}
            {/* <Text style={{width:'100%',textAlign:"center",}}>请输入银行卡 <Text style={{color:'#E39634'}}>6224 **** **** 9999</Text>交易密码 </Text> */}
            <Text style={{width:'100%',textAlign:"center",}}>请输入银行卡 <Text style={{color:'#E39634'}}>6201 **** **** 0076</Text>交易密码 </Text>
            <InputScrollView >
                  <View >
                    <View style={styles.textInput}>          
                      {
                        this.state.value.map((item,index) => {
                          if( index == 5){
                            return(
                              <View style={styles.inputConRight} key={index} >
                                <Text>{item.text}</Text>
                              </View>
                            )
                          }else{
                            return(
                              <View style={styles.inputCon} key={index} >
                                <Text>{item.text}</Text>
                              </View>
                            )
                          }

                        })
                      } 
                    </View>
                    <TextInput 
                      style={{width: '120%', height: 80, textAlign: "left",position:"absolute",top:0,bottom:0,left:0,right:0,marginLeft:'-20%',zIndex:4,}}
                      ref= 'inputView'
                      keyboardType={'number-pad'}
                      secureTextEntry={true}
                      maxLength={6}
                      onChange={this.onChange}
                    ></TextInput>
                  </View>
                  <LinearGradient style={styles.ensure} colors= {$globalStyle.buttonLinerBackground} >
                      <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                             this.submit()
                          }}>确认</Text>
                  </LinearGradient>
            </InputScrollView>
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
  title:{
    color:'#333333',
    fontSize:17,
    fontWeight:"bold",
    textAlign:"center",
    width:"100%",
    textAlign:"center",
  },
  textInput: {
    // backgroundColor: 'red',
    marginTop: 10,
    height: 52,
    width: '100%',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10, 
    paddingRight: 10
  },
  inputCon: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: '#CBD0E6',
    flexDirection:"row",
    alignItems: "center",
    position:'relative',
    borderRightColor:'#fff',
    borderRightWidth:0,
    justifyContent:'center'
  },
  inputConRight:{
    width: 52,
    height: 52,
    borderColor: '#CBD0E6',
    borderWidth: 1,
    lineHeight:52,
    alignItems: "center",
    position:'relative',
    flexDirection:"row",
    justifyContent:'center'
  },
  loanItemRightText: {
    marginRight: 16,
    textAlign: 'right'
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
    marginLeft:"5%",
    marginTop:30,
    marginBottom:16
  }
});