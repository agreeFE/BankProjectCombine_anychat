import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
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

  }
  componentDidMount() {
    
    
  }

  render() {
    let index =2;
    return (
      <Close callBackHome = {()=> {this.props.closeHome()}} show={false}>
        <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
          <Text style={styles.Stance}></Text>
          <Text style={styles.title}>银行卡挂失</Text>
        </View>
        <View style={styles.loanItem}>
          <Text> 卡号</Text>
            <View style={styles.loanItemRight}>
              <Text style={[index == 2 ? styles.useLoan : '', styles.loanItemRightText]}>6224********3590</Text>
              {/* <Image source={OPEN}></Image> */}
            </View>
        </View>
        <View style={styles.loanItem}>
          <Text> 开户网点</Text>
            <View style={styles.loanItemRight}>
              <Text style={[index == 2 ? styles.useLoan : '', styles.loanItemRightText]}>北京分行太阳宫分行</Text>
            </View>
        </View>
        <View style={styles.loanItem}>
          <Text> 卡类型</Text>
            <View style={styles.loanItemRight}>
              <Text style={[index == 2 ? styles.useLoan : '', styles.loanItemRightText]}>一类卡</Text>
            </View>
        </View>
        <View style={styles.loanItem}>
          <Text> 卡状态</Text>
            <View style={styles.loanItemRight}>
              <Text style={[index == 2 ? styles.useLoan : '', styles.loanItemRightText]}>正常</Text>
            </View>
        </View>
        
        <LinearGradient style={styles.ensure} colors={['#E9962F', '#FFC67E']}  >
            <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                    this.props.enterReportLoss('enter')
                }}>确认</Text>
        </LinearGradient>
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
    borderBottomWidth: 1
  },
  ensure:{
    width:'90%',
    height:45,
    borderRadius:5,
    backgroundColor:'#E39634',
    position:'absolute',
    bottom:120,
    left:'5%'                        
  }
});