import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, TextInput } from 'react-native';
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import { OPEN } from './imageSource/imageSource';
import Close from './close'

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
    },() =>{
      if( _this.state.focusIndex > 5 ) {
        _this.props.enterReportLoss( 'password',  _this.state.inputValue )
        return
      }
    })

  }

  componentDidMount() {
    this.inputFocus();
    
  }
  inputFocus(){
    var inputView = this.refs.inputView;
    inputView.focus(); 
  }

  render() {
    let index =2;
    const { focusIndex, value } = this.state;
    return (
      <Close callBackHome = {()=> {this.props.closeHome()}}>
        <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
          <Text style={styles.Stance}></Text>
          <Text style={styles.title}>密码输入</Text>
        </View>
        <Text style={{marginTop:80,fontSize:18,color:'#333',textAlign:'center'}}>请您输入取款密码</Text>
        <View style={{position:'relative'}}>
          <View style={styles.textInput}>          
            {
              this.state.value.map((item,index) => (
                <View style={styles.inputCon} key={index} onPress={()=>{
                  // this.inputFocus();
                }} >
                  <Text>{item.text}</Text>
                </View>
              ))
            } 
          </View>
            <TextInput 
              style={{width: '120%', height: 80, textAlign: "left",position:"absolute",top:0,bottom:0,left:0,right:0,marginLeft:'-20%'}}
              ref= 'inputView'
              keyboardType={'number-pad'}
              maxLength={6}
              onChange={this.onChange}
            ></TextInput>

        </View>
      </Close>
    );
  }
  
};

const styles = StyleSheet.create({
  Stance:{
    width:4,
    height:16,
    backgroundColor:'#E39634',
    marginRight:8
  },
  title:{
    color:'#000',
    fontSize:17,
    fontWeight:"bold"
  },
  textInput: {
    // backgroundColor: 'red',
    marginTop: 20,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 10, 
    paddingRight: 10
  },
  inputCon: {
    width: 40,
    height: 40,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#CBD0E6',
    // borderBottomColor: 'red',
    justifyContent: "center",
    alignItems: "center"
  }
});