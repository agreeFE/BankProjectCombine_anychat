import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import { View, Image,Text, Animated, Easing, StyleSheet,TouchableWithoutFeedback} from "react-native";
import Header from '$/components/header'
import { SHOUKUAN, FUKUAN} from '../imageSource'
import scope from "@/scope";
const router = require("@/router-control");
let time = 0

module.exports = class ScanScreen extends Component {
  constructor(props) {
    super(props);
    scope(this);
    this.state = {
      moveAnim: new Animated.Value(0),
      // time: 0
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(0);
    Animated.timing(this.state.moveAnim, {
      toValue: -200,
      duration: 1500,
      easing: Easing.linear
    }).start(() => this.startAnimation());
  };
  //  识别二维码
  onBarCodeRead = result => {
    // 识别到二维码，自动跳转到固定页面
    // console.warn(3333)
    time ++
    if(time === 1) {
      router.replace('account')
      time = 0
    }
    
  };
  //收款码付款码跳转
  itemClick(index){
      if(index==0){
        //收款
        router.load('receiptCode')
      }else{
        //付款
        router.load('payCode')
      }
  }
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <View style={styles.container}>
          <Header
            title={`扫一扫`}
            leftClick={()=> {router.back()}}
            imageBackground={0}
            showRightIco={false}
            headerStyle={{backgroundColor: $globalStyle.account.bgColor}}
          ></Header>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={this.onBarCodeRead}
          >
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle} />
              <Animated.View
                style={[
                  styles.border,
                  { transform: [{ translateY: this.state.moveAnim }] }
                ]}
              />
              <Text style={styles.rectangleText}>放入框内，自动扫描</Text>           
            </View>
            <View style={styles.codeView}>
              <TouchableWithoutFeedback onPress={() => {this.itemClick(0)}}>
                <View style={styles.codeBox}>
                <Image style={styles.codeImageBox} source={SHOUKUAN} />
                <Text style={styles.codeText}>收款码</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.itemClick(1)}}>
                <View style={styles.codeBox}>
                <Image style={styles.codeImageBox} source={FUKUAN} />
                <Text style={styles.codeText}>付款码</Text>
                </View>
              </TouchableWithoutFeedback>
              </View>
          </RNCamera>
        </View>
      </View>
      
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row"
  },
  preview: {
    flex: 1,
    
    // opacity: 0.5,
    // justifyContent: "flex-end",
    // alignItems: "center"
  },
  rectangleContainer: {
    // backgroundColor: 'rgba(0,0,0,0.5)', 
    // opacity: 0.5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  rectangle: {
    // backgroundColor: 'rgba(0,0,0,1)', 
    
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: "#00FF00",
    backgroundColor: "transparent"
  },
  rectangleText: {
    flex: 0,
    color: "#FFFFFF",
    marginTop: 10
  },
  border: {
    flex: 0,
    width: 200,
    height: 2,
    backgroundColor: "#00FF00"
  },
  codeView:{
    flexDirection:'row',
    alignItems:'center',
    bottom:60
  },
  codeBox:{
    width:'50%',
    alignItems:'center'
  },
  codeImageBox:{
    width: 42, 
    height: 42,
    flex: 0
  },
  codeText:{
    flex: 0,
    color: "#FFFFFF",
    marginTop:12
  }
});
