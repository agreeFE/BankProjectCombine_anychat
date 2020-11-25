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

export default class AlertComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false, //true显示,false不显示
      title: "",
      content: "",
      opacity: 0.3, // 背景透明度
      statusBarBackground: "rgba(0, 0, 0, 0)" // 状态栏背景色
    };
    if (!global._alert) {
      this.state = {
        showAlert: false, //true显示,false不显示
        title: "",
        content: "",
        opacity: 0.3, // 背景透明度
        statusBarBackground: "rgba(0, 0, 0, 0)" // 状态栏背景色
      };
      global._alert = this;
    }
  }

  showModal(title, message) {
    if (!title) {
      title = "提示";
    }
    this.setState({
      showAlert: true,
      statusBarBackground: `rgba(0, 0, 0, ${this.state.opacity})`,
      title: title,
      content: message
    });
  }
  hide() {
    this.setState({
      showAlert: false,
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
          visible={this.state.showAlert}
          onRequestClose={this.close}
        >
          <TouchableOpacity
            style={[
              styles.alertBox,
              { backgroundColor: this.state.statusBarBackground }
            ]}
            onPress={() => this.hide()}
          >
            <View style={[styles.alertBoxItem]}>
              {/* 头部 */}
              <View style={styles.alertBoxHeader}>
                <Text style={styles.alertBoxHeaderContent}>
                  {this.state.title}
                </Text>
              </View>
              {/* 内容 */}
              <View style={styles.alertBoxContent}>
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  {this.state.content}
                </Text>
              </View>
              {/* 底部按钮 */}
              <View style={styles.alertBoxBottom}>
                <View style={[styles.textTouch]}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.hide();
                    }}
                  >
                    <View style={styles.rightTextBox}>
                      <Text style={[styles.rightBtnContent]}>确定</Text>
                    </View>
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
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  /* 右侧按钮 */
  rightTextBox: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFA243"
  },
  rightBtnContent: {
    color: "#FFFFFF"
  },
  alertBoxHeader: {
    width: "100%",
    height: "20%",
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: 1,
    justifyContent: "center"
  },
  alertBoxHeaderContent: {
    textAlign: "center",
    fontSize: 17,
    color: "#333333",
    lineHeight: 24,
    fontFamily: "PingFangSC-Regular"
  },
  alertBoxContent: {
    width: "100%",
    height: "50%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "#333333",
    lineHeight: 21,
    fontFamily: "PingFangSC-Regular"
  },
  alertBoxBottom: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 25,
    flex: 1,
    paddingLeft: "10%",
    paddingRight: "10%"
  },
  alertBox: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  alertBoxItem: {
    position: "absolute",
    width: "91.5%",
    height: "30%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF"
  }
});

AlertComponent.show = (title, message) => {
  global._alert.showModal(title, message);
};
AlertComponent.hide = () => {
  global._alert.hide();
};
