/**
 * Confirm组件
 * @author 刘晓斌
 * @author 孟庆云
 * */
import React, { Component,  } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient"
let theme = require('$theme/index.js')

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false, //true显示,false不显示
      title: "",
      content: "",
      opacity: 0.3, // 背景透明度
      statusBarBackground: "rgba(0, 0, 0, 0)", // 状态栏背景色
      actions: [
        {
          text: "取消",
          onPress: () => {},
          style: "default"
        },
        {
          text: "确定",
          onPress: () => {},
        }
      ]
    };

    if (!global._confirm) {
      this.state = {
        showConfirm: false, //true显示,false不显示
        title: "",
        content: "",
        opacity: 0.3, // 背景透明度
        statusBarBackground: "rgba(0, 0, 0, 0)", // 状态栏背景色
        actions: [
          {
            text: "取消",
            onPress: () => {},
            style: "default"
          },
          {
            text: "确定",
            onPress: () => {},
          }
        ]
      };
      global._confirm = this;
    }
  }

  cancelFun() {
    let { onPress } = this.state.actions[0];
    onPress("");
  }

  confirmFun() {
    let { onPress } = this.state.actions[1];
    onPress("");
  }

  showModal(title, message, actions) {
    this.setState({
      showConfirm: true,
      statusBarBackground: `rgba(0, 0, 0, ${this.state.opacity})`,
      title: title,
      content: message,
      actions: [
        ...actions,
        {
          actions
        }
      ]
    });
  }
  hide() {
    this.setState({
      showConfirm: false,
      statusBarBackground: "rgba(0, 0, 0, 0)"
    });
  }

  render() {
    return (
      <>
        <StatusBar
          translucent={true}
          backgroundColor={this.state.statusBarBackground}
          barStyle={"light-content"}
        />
        <Modal
          transparent={true}
          visible={this.state.showConfirm}
          onRequestClose={this.close}
        >
          <TouchableOpacity
            style={[
              styles.confirmBox,
              { backgroundColor: this.state.statusBarBackground }
            ]}
            onPress={() => this.hide()}
          >
            <View style={[styles.confirmBoxItem]}>
              {/* 头部 */}
              <View style={styles.confirmBoxHeader}>
                <Text style={styles.confirmBoxHeaderContent}>
                  {this.state.title}
                </Text>
              </View>
              {/* 内容 */}
              <View style={styles.confirmBoxContent}>
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  {this.state.content}
                </Text>
              </View>
              {/* 底部按钮 */}
              <View style={styles.confirmBoxBottom}>
                <View style={[styles.textTouch]}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.hide();
                      this.cancelFun();
                    }}
                  >
                    <View style={styles.leftTextBox}>
                      <Text style={[styles.leftBtnContent]}>
                        {this.state.actions[0].text}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={[styles.textTouch]}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.hide();
                      this.confirmFun();
                    }}
                  >
                    <LinearGradient 
                      style={styles.rightTextBox}
                      colors={$globalStyle.buttonLinerBackground}
                    >
                      <Text style={styles.rightBtnContent}>{this.state.actions[1].text}</Text>
                    </LinearGradient> 
                    {/* <View style={styles.rightTextBox}>
                      <Text style={[styles.rightBtnContent]}>
                        
                      </Text>
                    </View> */}
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textTouch: {
    height: "50%",
    width: "45%",
    justifyContent: "center",
    alignItems: "center"
  },
  /* 左侧按钮 */
  leftTextBox: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.backgroundColor,
    justifyContent: "center",
    alignItems: "center"
  },
  leftBtnContent: {
    color: theme.backgroundColor
  },
  /* 右侧按钮 */
  rightTextBox: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.backgroundColor
  },
  rightBtnContent: {
    color: "#FFFFFF"
  },
  confirmBoxHeader: {
    width: "100%",
    height: "20%",
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: 1,
    justifyContent: "center"
  },
  confirmBoxHeaderContent: {
    textAlign: "center",
    fontSize: 17,
    color: "#333333",
    lineHeight: 24,
    fontFamily: "PingFangSC-Regular"
  },
  confirmBoxContent: {
    width: "100%",
    height: "40%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "#333333",
    lineHeight: 21,
    fontFamily: "PingFangSC-Regular"
  },
  confirmBoxBottom: {
    width: "100%",
    height: "30%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 25,
    flex: 1,
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  confirmBox: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  confirmBoxItem: {
    position: "absolute",
    width: "91.5%",
    height: "28%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF"
  },
});

Confirm.show = (title, message, actions) => {
  global._confirm.showModal(title, message, actions);
};
Confirm.hide = () => {
  global._confirm.hide();
};
