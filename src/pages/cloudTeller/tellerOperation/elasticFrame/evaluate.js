// 评价页面
// commit 点击确定时触发的事件
import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, TextInput, FlatList, Dimensions } from "react-native";

import LinearGradient from "react-native-linear-gradient"
import { DISSATISFIED, VERYDISSATISFIED, SATISFIED, CustomerService, V, S, D, } from "./imageSource/imageSource";

import Close from "./close";
import scope from "@/scope";
import '@/window'

const router = require("$/router-control");

const evaluates = [
  [
    "业务知识很专业",
    "工作态度相当好",
    "办理业务效率很高",
    "沟通相当顺畅"
  ],
  [
    "业务知识较专业",
    "工作态度好",
    "办理业务效率高",
    "沟通较顺畅"
  ],
  [
    "业务知识不专业",
    "工作态度不好",
    "办理业务不高",
    "沟通不顺畅"
  ],
];

module.exports = class Evaluate extends Component {
  constructor(props) {
    super(props);
    scope(this);
    this.state = {
      checkIndex: 1,
      evaluateValue: [],
      textInputValue: "",
      ViewHeight:"100%"
    };
    this.setEvaluateValue = this.setEvaluateValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      ViewHeight:parseInt( Dimensions.get('window').height ),
    })
  }

  render() {
    const { checkIndex, evaluateValue, textInputValue } = this.state;
    return (
      <Close
        callBackHome={() => {
          this.props.closeHome();
        }}
        height={"100%"}
      >
        <View style={{ alignItems: "center",width:'100%'}}>

          <LinearGradient style={{position:"relative",top:83,width:'30%',height:4,borderRadius:3}} colors={$globalStyle.buttonLineLinerBackground}  >
            {/* <Text style={{position:"relative",top:83,width:'30%',height:6,backgroundColor:'#D1E1E6'}}></Text> */}
          </LinearGradient>
          
          <View style={{ marginTop:60 }}>
            <Text style={styles.font,[{fontSize:16,fontWeight:'bold'}]}>请对柜员做出评价</Text>
            
          </View>
          <View style={{ marginTop: 56, marginBottom:40, width: 60, height: 60 }}>
            <Image source={CustomerService} style={{ width: 65, height: 65 }} />
          </View>
          <View style={{ paddingLeft: 40, paddingRight: 40, width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 25, paddingBottom: 24, }}  >
              <TouchableWithoutFeedback onPress={() => { this.setState({ checkIndex: 0 }); }} >
                <View style={{ alignItems: "center" }}>
                  <Image source={checkIndex === 0 ? VERYDISSATISFIED : V} resizeMode='contain' style={{ width:40,height:40 }} />
                  <Text style={[ styles.font, styles.imageFont, checkIndex === 0 ? {fontWeight:"bold",color:"#EDA00C"} : {color:"#666666"}]} >
                    非常满意
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { this.setState({ checkIndex: 1 }); }}  >
                <View style={{ alignItems: "center" }}>
                  <Image source={checkIndex === 1 ? SATISFIED : S} resizeMode='contain' style={{ width:40,height:40 }} />
                  <Text style={[ styles.font, styles.imageFont, checkIndex === 1 ? {fontWeight:"bold",color:"#EDA00C"} : {color:"#666666"} ]} >
                    满意
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { this.setState({ checkIndex: 2 }); }} >
                <View style={{ alignItems: "center" }}>
                  <Image source={checkIndex === 2 ? DISSATISFIED : D} resizeMode='contain' style={{ width:40,height:40 }} />
                  <Text style={[ styles.font, styles.imageFont, checkIndex === 2 ? {fontWeight:"bold",color:"#EDA00C"} : {color:"#666666"} ]} >
                    不满意
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              style={{ width: "100%"}}
              data={evaluates[this.state.checkIndex]}
              numColumns={"2"}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setEvaluateValue(index);
                  }}
                >
                  <View
                    style={[
                      styles.evaluate,
                      {
                        borderTopColor: evaluateValue.includes(index)
                          ? $globalStyle.backgroundColor
                          : "#D5D5D5",
                        borderBottomColor: evaluateValue.includes(index)
                          ? $globalStyle.backgroundColor
                          : "#D5D5D5",
                        borderLeftColor: evaluateValue.includes(index)
                          ? $globalStyle.backgroundColor
                          : "#D5D5D5",
                        borderRightColor: evaluateValue.includes(index)
                          ? $globalStyle.backgroundColor
                          : "#D5D5D5"
                      },
                      {
                          backgroundColor: evaluateValue.includes(index)
                            ? $globalStyle.backgroundColor
                            : "#F4F4F4"
                        },
                    ]}
                  >
                    <Text
                      style={[
                        styles.evaluateFont,
                        {
                          color: evaluateValue.includes(index)
                            ? "#fff"
                            : "#8E8E8E"
                        },
                        
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
            
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="写下您的评价内容"
              style={styles.textInput}
              editable={true}
              multiline={true}
              onChange={this.onChange}
            />
          </View>
            <LinearGradient style={styles.button} colors={$globalStyle.buttonLinerBackground} >
                  <Text style={styles.buttonFont}  onPress={() => { this.commit() }} >确认提交</Text>
            </LinearGradient>
        </View>
      </Close>
    );
  }

  setEvaluateValue(index) {
    const { evaluateValue } = this.state;
    if (evaluateValue.includes(index)) {
      let i = evaluateValue.indexOf(index);
      evaluateValue.splice(i, 1);
    } else {
      evaluateValue.push(index);
    }
    this.setState({});
  }

  onChange(e) {
    const { text } = e.nativeEvent;
    this.setState({
      textInputValue: text
    });
  }

  commit() {
    if( window.$globalVideoRouter.length > 1 && window.$globalVideoRouter ){
        let defaultAction = [
            {
              text: '取消',
              onPress: () => {
                window.$globalVideoRouter = '';
                if(window.$globalThemeType == 'green'){
                    router.back()
                }
                if(window.$globalThemeType == 'blue'){
                  router.back()
                }
              },
              style: 'default',
            },
            {
              text: '确定', onPress: () => {
                  router.load(window.$globalVideoRouter)
                  window.$globalVideoRouter = '';
              },
            }
        ];
      window.$Modal.confirm('交割凭证','您好，银行卡挂失业务已办理成功，请您点击查看银行卡交割凭证信息。',defaultAction)
    }else{
      window.$globalVideoRouter = '';
      if(window.$globalThemeType == 'green'){
        router.back()
      }
      if(window.$globalThemeType == 'blue'){
        router.back()
      }
    }
  }
};
const styles = StyleSheet.create({
  font: {
    fontFamily: "PingFangSC-Regular",
    fontSize: 15,
    color: "#333333",
    textAlign: "center",
    lineHeight: 22,
    
  },
  button: {
    width: 335,
    height: 45,
    marginTop: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFont: {
    fontFamily: "PingFangSC-Medium",
    fontSize: 17,
    color: "#FFFFFF",
    lineHeight: 45,
    width:335,
    height:45,
    textAlign:"center",
  },
  input: {
    width: 327,
    height: 120,
    backgroundColor: "#EAEAEA",
    borderRadius: 4,
    paddingLeft: 4,
    paddingRight: 4,
    marginTop:24
  },
  textInput: {
    fontFamily: "PingFangSC-Regular",
    fontSize: 15,
    height: 120,
    color: "#999999",
    textAlign: "left",
    lineHeight: 21,
    textAlignVertical: "top"
  },
  imageFont: {
    color: "#666666",
    lineHeight: 21,
    marginTop: 11
  },
  evaluate: {
    width: '48%',
    height: 28,
    fontSize:14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginTop: 6,
    marginBottom: 6,
    marginRight: "4%"
  },
  evaluateFont: {
    fontFamily: "PingFangSC-Regular",
    fontSize: 14,
    color: "#999999",
    letterSpacing: 0,
    textAlign: "right",
    lineHeight: 18
  }
});
