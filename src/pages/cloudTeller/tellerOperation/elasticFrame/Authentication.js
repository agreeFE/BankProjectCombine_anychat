import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Button,
  Text,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";

import {
  Close,
  ZHENGMIANCLICK,
  FANMIANCLICK,
  ZHENGMIAN,
  FANMIAN
} from "./imageSource/imageSource";

module.exports = class Authentication extends Component {
  state = {
    frontPhoto: ZHENGMIANCLICK,
    backPhoto: FANMIANCLICK
  };
  closePage = () => {
    // alert('关闭页面')
    this.props.callBackHome("子组件点击了一下");
  };
  takePhoto = attr => {
    if (attr == "front") {
      this.setState({
        frontPhoto: ZHENGMIAN
      });
    } else if (attr == "back") {
      this.setState({
        backPhoto: FANMIAN
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.callBackHome("子组件点击了一下");
          }}
        >
          <View style={styles.close}>
            <Image source={Close}></Image>
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
        <View style={styles.bottomPart}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.callBackHome("shortMessageVerification");
            }}
          >
            <View style={styles.agreeButton}>
              <Text style={styles.buttonText}>确定</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
