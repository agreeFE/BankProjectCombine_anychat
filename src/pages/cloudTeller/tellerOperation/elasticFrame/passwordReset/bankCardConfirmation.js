//银行卡信息确认

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
} from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import Close from '../close'
import '@/window'
const NetworkUtil = require('$/util/networkutil');
const {formatCardNum} = require('$/util/cardNumutil');
const { formatMoney } = require('$/util/moneyutil')
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');

module.exports = class ReportLoss extends Component < {} > {
  constructor(props) {
    super(props);

    this.state={
      ViewHeight:'100%'
    }
    
  }

  componentDidMount() {
    let _this = this;
    _this.setState({
      ViewHeight:parseInt( Dimensions.get('window').height ) - 230
    })
    this.props.data.map(( item , index )=>{
      if( item["FIELDNAME"] == '卡号' ){
        window.$globalBankCardNum = item["FIELDVALUE"];
      }
    })
  }

  render() {
    return ( 
      <Close callBackHome = {()=> {this.props.closeHome()}} >

          <View style={{ height:'100%',backgroundColor:"#f4f4f4", borderTopLeftRadius:15, borderTopRightRadius:15, }} >
            <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
              <Text style={styles.Stance}></Text>
              <Text style={styles.title}>核对重置密码银行卡信息</Text>
            </View>
            <ScrollView>
            {
                this.props.data.map(( item , index )=>{
                  if( item["FIELDNAME"] == '卡号' ){
                    return (
                      <View style={styles.loanItem}>
                        <Text> {  item["FIELDNAME"] } </Text>
                        <View style={styles.loanItemRight}>
                        <Text style={[ styles.useLoan, styles.loanItemRightText]}> { formatCardNum( item["FIELDVALUE"], 4 ) } </Text>
                        </View>
                      </View>
                    ) 
                  }else if( item["FIELDNAME"] == '余额' ){
                    return(
                      <View style={styles.loanItem}>
                        <Text> {  item["FIELDNAME"] } </Text>
                        <View style={styles.loanItemRight}>
                        <Text style={[ styles.useLoan, styles.loanItemRightText]}> {  formatMoney( item["FIELDVALUE"] )  } </Text>
                        </View>
                      </View>
                    );
                  }else if( item["FIELDNAME"] == '开户行' ){
                    return(
                      <View style={styles.loanItem}>
                        <Text> 开户网点 </Text>
                        <View style={styles.loanItemRight}>
                        <Text style={[ styles.useLoan, styles.loanItemRightText]}> 赞同银行{ item["FIELDVALUE"] } </Text>
                        </View>
                      </View>
                    );
                  }else{
                    return(
                      <View style={styles.loanItem}>
                        <Text> {  item["FIELDNAME"] } </Text>
                        <View style={styles.loanItemRight}>
                        <Text style={[ styles.useLoan, styles.loanItemRightText]}> { item["FIELDVALUE"] } </Text>
                        </View>
                      </View>
                    );
                  }
                })
              }
            </ScrollView>
            <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
              {
                this.props.btnState ? 
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                          this.props.addTellerList(2,'已确认信息。');
                          this.props.closeHome();
                      }}>确认</Text>
                  :
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                      this.props.closeHome();
                  }}>返回</Text>
              }
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