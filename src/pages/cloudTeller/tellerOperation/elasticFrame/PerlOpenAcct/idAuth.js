import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Button,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  NativeModules
} from "react-native";

import {
  Close,
  ZHENGMIANCLICK,
  FANMIANCLICK,
  ZHENGMIAN,
  FANMIAN
} from "../imageSource/imageSource";

const AnyChat = NativeModules.AnyChatPlugin;

module.exports = class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state={
      frontPhoto: ZHENGMIANCLICK,
      backPhoto: FANMIANCLICK,
      frontOK: false,
      backOK: false,
    }
  }

  takePhoto = async attr => {
    await AnyChat.closeCamera(true,()=>{console.warn("关闭摄像头成功");},()=>{console.warn("关闭摄像头失败");})
    if (attr == "front") {
      AnyChat.takePhoto((succ)=>{
          console.warn("拍照成功:", succ);
          this.setState({
            frontPhoto: {uri: `file://${JSON.parse(succ).path}`},
            frontOK: true
          });
          setTimeout(() => {
            AnyChat.closeCamera(false,()=>{console.warn("打开摄像头成功");},()=>{console.warn("打开摄像头失败");})
          }, 1250);
      },(err)=>{
          console.warn('拍照失败', err )
          $Toast.info('拍照失败')
          setTimeout(() => {
            AnyChat.closeCamera(false,()=>{console.warn("打开摄像头成功");},()=>{console.warn("打开摄像头失败");})
          }, 1250);
      })
    } else if (attr == "back") {
        AnyChat.takePhoto((succ)=>{
            console.warn("拍照成功:", succ);
            this.setState({
              backPhoto: {uri: `file://${JSON.parse(succ).path}`},
              backOK: true
            });
            setTimeout(() => {
              AnyChat.closeCamera(false,()=>{console.warn("打开摄像头成功");},()=>{console.warn("打开摄像头失败");})
            }, 1250);
        },(err)=>{
            console.warn('拍照失败', err )
            $Toast.info('拍照失败')
            setTimeout(() => {
              AnyChat.closeCamera(false,()=>{console.warn("打开摄像头成功");},()=>{console.warn("打开摄像头失败");})
            }, 1250);
        })
    }

  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            // this.props.closeHome();
          }}
        >
          <View style={styles.close}>
            {/* <Image source={Close}></Image> */}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.topPart}>
          <View style={styles.stripe}></View>
          <Text style={styles.IDCheck}>身份验证</Text>
        </View>
        <View style={styles.middlePart}>
          <View style={styles.IDPhoto}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.takePhoto("front");
              }}
            >
              <ImageBackground
                source={this.state.frontPhoto}
                style={styles.IDPhotoBox}
              ></ImageBackground>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.IDPhoto}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.takePhoto("back");
              }}
            >
              <ImageBackground
                source={this.state.backPhoto}
                style={styles.IDPhotoBox}
              ></ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        </View>
        { this.state.frontOK && this.state.backOK &&
          <View style={styles.bottomPart}>
            <TouchableWithoutFeedback
              onPress={() => {
                  this.props.enterReportLoss("uploadImg",[this.state.frontPhoto.uri,this.state.backPhoto.uri]);
                  this.props.callBackHome("idConfirm");
              }}
            >
              <View style={styles.agreeButton}>
                <Text style={styles.buttonText}>确定</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        }
        
      </View>
    );
  }
};

const styles = StyleSheet.create({
  IDPhoto: {
    marginBottom: 40
  },
  IDPhotoBox: {
    width: 220,
    height: 136
  },
  middlePart: {
    marginTop: 20,
    height: "70%",
    justifyContent: "center"
  },
  IDCheck: {
    fontSize: 17,
    color: "#333333",
    letterSpacing: 0.2,
    marginLeft: 8
  },
  stripe: {
    backgroundColor: "#E39634",
    width: 4,
    height: 16,
    justifyContent: "space-between"
  },
  buttonText: {
    fontSize: 17,
    color: "#FFFFFF"
  },
  agreeButton: {
    width: 335,
    height: 45,
    borderRadius: 5,
    backgroundColor: "#E9962F",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomPart: {
    height: "20%",
    marginTop: 50
  },
  topPart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    marginTop: 15,
    left: 10
  },
  container: {
    backgroundColor: "#F4F4F4",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    paddingBottom: 20
  },
  close: {
    position: "absolute",
    right: 16,
    top: 22
  }
});
