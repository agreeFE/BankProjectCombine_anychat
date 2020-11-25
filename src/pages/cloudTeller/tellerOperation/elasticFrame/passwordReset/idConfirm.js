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
                <Text style={styles.title}>身份证信息确认</Text>
              </View>
              <ScrollView>
                {
                  this.props.data.showData.map(( item , index )=>{
                    return (
                      <View style={styles.loanItem}>
                        <Text> { item["FIELDNAME"] } </Text>
                          <View style={styles.loanItemRight}>
                            <Text style={[ styles.useLoan, styles.loanItemRightText]}> { item["FIELDVALUE"] } </Text>
                          </View>
                      </View>
                    )
                  })
                }
              </ScrollView>
              <LinearGradient style={styles.ensure} colors={$globalStyle.buttonLinerBackground}  >
                {
                  this.props.btnState ? 
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={async() => {
                          this.props.enterReportLoss("submitTask", this.props.data.submitData);
                          this.props.addTellerList(2,'我已确认身份证信息。');
                          this.props.closeHome()
                      }}>确认</Text>
                  : 
                  <Text style={{color:'#fff',fontSize:17,textAlign:"center",height:45,lineHeight:45}} onPress={() => {
                          this.props.closeHome()
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