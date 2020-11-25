//用户信息确认
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
    Image,
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
        ViewHeight:'100%',
      }
    }
    componentDidMount() {
      let _this = this
      _this.setState({
        ViewHeight:parseInt( Dimensions.get('window').height ) - 230
      })
    }
  
    render() {
      return ( 
          <Close callBackHome = {()=> {this.props.closeHome()}} >
            <View style={{height:this.state.ViewHeight}}>
              <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
                <Text style={styles.Stance}></Text>
                <Text style={styles.title}>确认签约种类</Text>
              </View>
              <ScrollView style={{marginTop:100}}>
                <View style={styles.item}>
                  <Image style={{marginRight:10}} source={require('$image/cloudTeller/ico_duanxintong.png')}></Image>
                  <Text>短信通</Text>
                </View>
                <View style={styles.item}>
                  <Image style={{marginRight:10}} source={require('$image/cloudTeller/ico_shoujiyinhang.png')}></Image>
                  <Text>智慧银行</Text>
                </View>
                <View style={styles.item}>
                  <Image style={{marginRight:10}} source={require('$image/cloudTeller/ico_zhouzhoudao.png')}></Image>
                  <Text>ATM转账</Text>
                </View>
              </ScrollView>
              <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
                <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                          this.props.btnState && this.props.addTellerList(2,'我已确认签约种类。');
                          this.props.closeHome()
                      }}>{this.props.btnState ? "确认":"返回"}</Text>
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
    },
    item: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'row',
      margin: 30
    },
  });