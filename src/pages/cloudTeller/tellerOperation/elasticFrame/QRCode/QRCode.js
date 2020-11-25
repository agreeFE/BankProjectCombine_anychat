import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, ScrollView } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import QRCode from 'react-native-qrcode-svg';
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import { OPEN , chapter } from '../imageSource/imageSource';
import Close from '../close'

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
      <Close callBackHome = {()=> {this.props.closeHome()}} >
        <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
          <Text style={styles.Stance}></Text>
          <Text style={styles.title}>客户凭条</Text>
        </View>
        <ScrollView>
          <Text style={{paddingLeft:20,paddingRight:20}}>请持本凭条到交割设备或者柜台进行实物交割，如有疑问可咨询现场工作人员。</Text>
          {
            this.props.data.map(( item, index )=>{
              if( item["FIELDCODE"]==  'QRCODE'){
                return(
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:20,}}> 
                      <QRCode
                        value= { item["FIELDVALUE"] }
                        size={200}
                      />
                    </View>
                )
              }
            })
          }

        </ScrollView>
        <LinearGradient style={styles.ensure} colors= {$globalStyle.buttonLinerBackground}  >
            <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                    this.props.closeHome()
                }}>返回</Text>
        </LinearGradient>
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
    borderBottomWidth: 1
  },
  ensure:{
    width:'90%',
    height:45,
    marginLeft:'5%',
    borderRadius:5,
    backgroundColor:'#E39634',
    marginTop:10,
    // position:'absolute',
    // bottom:20,
    // left:'5%'                        
  }
});