import React, { Component } from "react";
import { View, Text, Animated, Easing, StyleSheet,ImageBackground,Dimensions,DatePickerAndroid } from "react-native";
import Header from "$/components/header"
import scope from "@/scope";

const router = require("@/router-control");

let screenHeight = Dimensions.get('window').height;

module.exports = class ScanScreen extends Component {
  constructor(props) {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate()
    const today = "" + year + month + day
    super(props);
    scope(this);
    this.state = {
        startDate: today, //起始日期
        endDate: today, //结束日期
    };
  }

  componentDidMount() {

  }

  showModalDate = async (index) => {
    const { year: curYear, month: curMonth, day: curDay, startDate, endDate } = this.state
    let date = index == 1 ? startDate : endDate
    const { action, year, month, day } = await DatePickerAndroid.open({
      // 要设置默认值为今天的话，使用`new Date()`即可。
      // 下面显示的会是2020年5月25日。月份是从0开始算的。
      date: new Date(date.substr(0, 4), date.substr(4, 2) - 1, date.substr(6, 2)),
      mode: 'spinner'
    });
    // 安卓处理日期
    if (action !== DatePickerAndroid.dismissedAction) {
      // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
      if (index == 1) {
        let dealMonth = month + 1 < 10 ? "0" + (month + 1) : month + 1
        this.setState({
          startDate: "" + year + dealMonth + day
        })
      }
      if (index == 2) {
        let dealMonth = month + 1 < 10 ? "0" + (month + 1) : month + 1
        this.setState({
          endDate: "" + year + dealMonth + day
        })
      }
    }
    // this.setState({
    //   userDefineDate: true
    // })
  }

  render() {
    return (
      <View style={styles.allBox}>
            <ImageBackground resizeMode={'contain'} source={require('$image/cloudTeller/homebgG.jpg')} style={{ width: '100%',height:"100%"}}>
                <Header 
                    title={'历史记录'}
                    imageBackground={0}
                    leftClick={()=> {router.back()}}
                    showRightIco={false}
                    // headerStyle={{backgroundColor: "rgba(41,52,120,1)"}}
                ></Header>
                <View style={styles.dateBox}>
                    {/* <Text style={{color:"#fff"}} onPress={() => { this.showModalDate() }}>点击触发时间</Text>
                    <Text style={{color:"#fff"}}>{this.state.startDate}</Text>
                    <Text style={{color:"#fff"}}>{this.state.endDate}</Text> */}
                    <View style={{width:"40%",height:60,backgroundColor:"#05243F",borderRadius:10,marginLeft:"5%",lineHeight:60}}>
                        <Text onPress={() => { this.showModalDate(1) }} style={{color:"#fff",lineHeight:60,textAlign:"center"}}>{this.state.startDate}</Text>
                    </View>
                    <View style={{width:"10%",height:60,color:"#fff"}}>
                        <Text style={{color:"#fff",lineHeight:60,textAlign:"center"}}>至</Text>
                    </View>
                    <View style={{width:"40%",height:60,backgroundColor:"#05243F",borderRadius:10,lineHeight:60}}>
                        <Text onPress={() => { this.showModalDate(2) }} style={{color:"#fff",lineHeight:60,textAlign:"center"}}>{this.state.endDate}</Text>
                    </View>
                </View>
                <View style={styles.listBox}>
                    <View style={styles.listItemBox}>
                      <View style={{flexDirection:"row",height:40}}>
                        <Text style={{width:"45%",textAlign:"left",paddingLeft:20,color:"#2398FF",fontSize:16}}>卡挂失</Text>
                        <Text style={{width:"34%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>2019年9月16日</Text>
                        <Text style={{width:"21%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>14:00:00</Text>
                      </View>
                      <View style={{flexDirection:"row",height:40}}>
                        <Text style={{width:"45%",textAlign:"left",paddingLeft:20,color:"#fff",fontSize:14}}>工号: 12567</Text>
                        <Text style={{width:"34%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>时长</Text>
                        <Text style={{width:"21%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>60分钟</Text>
                      </View>
                    </View>

                    <View style={styles.listItemBox}>
                      <View style={{flexDirection:"row",height:40}}>
                        <Text style={{width:"45%",textAlign:"left",paddingLeft:20,color:"#2398FF",fontSize:16}}>修改信息</Text>
                        <Text style={{width:"34%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>2019年9月16日</Text>
                        <Text style={{width:"21%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>15:10:00</Text>
                      </View>
                      <View style={{flexDirection:"row",height:40}}>
                        <Text style={{width:"45%",textAlign:"left",paddingLeft:20,color:"#fff",fontSize:14}}>工号: 12567</Text>
                        <Text style={{width:"34%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>时长</Text>
                        <Text style={{width:"21%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>60分钟</Text>
                      </View>
                    </View>

                    <View style={styles.listItemBox}>
                      <View style={{flexDirection:"row",height:40}}>
                        <Text style={{width:"45%",textAlign:"left",paddingLeft:20,color:"#2398FF",fontSize:16}}>密码重置</Text>
                        <Text style={{width:"34%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>2019年9月16日</Text>
                        <Text style={{width:"21%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>16:20:00</Text>
                      </View>
                      <View style={{flexDirection:"row",height:40}}>
                        <Text style={{width:"45%",textAlign:"left",paddingLeft:20,color:"#fff",fontSize:14}}>工号: 12567</Text>
                        <Text style={{width:"34%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>时长</Text>
                        <Text style={{width:"21%",textAlign:"right",paddingRight:20,color:"#fff",fontSize:13}}>60分钟</Text>
                      </View>
                    </View>
                  
                </View>
            </ImageBackground>
            <View style={{width:"100%",height:100,backgroundColor:"#03081C",flexDirection: 'column', alignItems: 'center'}}>
                  
            </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    allBox:{
        width:'100%',
        height:screenHeight,
        backgroundColor:"#01081F"
    },
    dateBox:{
        width:"100%",
        height:'17%',
        // backgroundColor:"#fff",
        paddingTop:30,
        flexDirection:"row"
    },
    listBox:{
        width:"100%",
        height:'83%',
        // backgroundColor:"#fff",
        // paddingTop:30,
        flexDirection:"column"
    },
    listItemBox:{
      flexDirection:"column",
      borderBottomColor:"#335A75",
      borderBottomWidth:1,
      marginBottom:10,
      paddingTop:12
    }
});
