import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

const { formatMoney } = require('$/util/moneyutil')
import { BANK } from '../imageSource/imageSource';
import Close from '../close'

import '@/window'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');


module.exports = class ReportLoss extends Component<{}> {
  constructor(props) {
    super(props);
    this.state={
      viewHeight:'100%',
      ScrollViewHeight:'100%',
      ADDRESS:'',
      IDNAME:'',
      PHONE:''
    }
  }

  componentDidMount() {
    let _this = this;
  }

  _onLayout = (e) => {
    let {x,y,width,height} = e.nativeEvent.layout
    this.setState({
        viewHeight:height
    })
  }

  formatDate( newdate ){
    if(!newdate){return}
    let yyyy = newdate.substr(0,4) 
    let MM = newdate.substr(4,2) 
    let dd = newdate.substr(6,2) 
    return yyyy+'/'+MM+'/'+dd
  }
  render() {
    let index =2;
    let {viewHeight} = this.state
    return (
      <Close callBackHome = {()=> {this.props.closeHome()}} >
        <View style={{height:viewHeight}} onLayout={this._onLayout}>
          <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
            <Text style={styles.Stance}></Text>
            <Text style={styles.title}>确认购买理财产品信息</Text>
          </View>
          <ScrollView >
            {
              this.props.data.map(( item, index )=>{
                if( item['FIELDCODE'] == 'FLAMT' || item['FIELDCODE'] == 'INTEREST'){
                    return(
                      <View style={styles.loanItem}>
                        <Text style={{color:'#666666'}}> {item['FIELDNAME']} </Text>
                          <View style={styles.loanItemRight}>
                            <Text style={[ styles.useLoan, styles.loanItemRightText]}> {formatMoney(item['FIELDVALUE'])} </Text>
                          </View>
                      </View>
                    )
                }else if( item['FIELDCODE'] == 'SaleStartDate' || item['FIELDCODE'] == 'EndDate' ){
                    return(
                      <View style={styles.loanItem}>
                        <Text style={{color:'#666666'}}> {item['FIELDNAME']} </Text>
                          <View style={styles.loanItemRight}>
                            <Text style={[ styles.useLoan, styles.loanItemRightText]}> {this.formatDate(item['FIELDVALUE'])} </Text>
                          </View>
                      </View>
                    )
                }else{
                    return(
                      <View style={styles.loanItem}>
                        <Text style={{color:'#666666'}}> {item['FIELDNAME']} </Text>
                          <View style={styles.loanItemRight}>
                            <Text style={[ styles.useLoan, styles.loanItemRightText]}> {item['FIELDVALUE']} </Text>
                          </View>
                      </View>
                    )
                }
              })
            }
          </ScrollView>
          <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
            <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                    this.props.enterReportLoss('manageMoneyInfo','','已确认理财产品信息')
                    // this.props.addTellerList(2,'已确认信息');
                    this.props.closeHome()
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
    fontSize:15,
    color:'#333333'
  },
  loanItemRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    height: 45,
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
    marginLeft:'5%',
    borderRadius:5,
    marginTop:10,     
    marginBottom:20,               
  }
});