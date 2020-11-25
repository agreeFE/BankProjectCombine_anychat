import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import htmlContent from "./resource/html";
import injectedSignaturePad from "./resource/js/signature_pad";
import PropTypes from "prop-types";

import { WebView } from "react-native-webview";

export default class SignatureComponent extends Component {
  /**
   * 入参属性的类型声明
   * @author 孟庆云
   */
  static PropTypes = {
    cancelText: PropTypes.string,
    cancelStyle: PropTypes.string,
    resignText: PropTypes.string,
    resignStyle: PropTypes.string,
    confirmText: PropTypes.string,
    confirmStyle: PropTypes.string,
    pictureType: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
  };
  /**
   * 入参属性的默认值
   * @author 孟庆云
   */
  static defaultProps = {
    cancelText: "取消",
    cancelStyle: "width:50%;border:1px solid #789EAA;font-size:16px;padding:5px 10px 5px 10px;border-radius:10px;color:#789EAA;margin-right:10px;",
    resignText: "重签",
    resignStyle: "width:20%;border:1px solid #789EAA;font-size:16px;padding:5px 10px 5px 10px;border-radius:10px;color:#789EAA;margin-right:10px;",
    confirmText: "确定",
    confirmStyle: "width:20%;border:1px solid #789EAA;font-size:16px;padding:5px 10px 5px 10px;border-radius:10px;color:#789EAA;margin-right:10px;",
    pictureType: "PNG",
    onCancel: () => {},
    onConfirm: () => {}
  };
  constructor(props) {
    super(props);

    this.state = {
      signature: {
        imagePng: null, // PNG格式图片的Base64字符串
        imageJpg: null, // JPG格式图片的Base64字符串
        imageSvg: null, // SVG格式图片的Base64字符串
        imageData: null // 签名的轨迹数据
      },
      cancelText: props.cancelText,
      cancelStyle: props.cancelStyle,
      resignText: props.resignText,
      resignStyle: props.resignStyle,
      confirmText: props.confirmText,
      confirmStyle: props.confirmText,
      pictureType: props.pictureType,
      onCancel: props.onCancel,
      onConfirm: props.onConfirm
    }

    let html = htmlContent(injectedSignaturePad);

    // 生成按钮部分的html片段
    let getPictureMethod = null;
    switch(props.pictureType.toUpperCase()) {
      case "PNG":
        getPictureMethod = "getSingaturePNG";
        break;
      case "JPG":
        getPictureMethod = "getSignatureJPG";
        break;
      case "SVG":
        getPictureMethod = "getSignatureSVG";
        break;
      default:
        getPictureMethod = "getSingaturePNG";
    }
    let btns = `<span style="${props.cancelStyle}" onclick="cancelSignature()">${props.cancelText}</span>
    <span style="${props.resignStyle}" onclick="clearSignature()">${props.resignText}</span>
    <span style="${props.confirmStyle}" onclick="${getPictureMethod}()">${props.confirmText}</span>
    `;
    // 替换按钮部分的HTML
    html = html.replace("<%buttons%>", btns);

    this.source = { html };

    this.messageDeal = this.messageDeal.bind(this);
  }
  render() {
    return (
      <View style={styles.webBg}>
        <WebView
          ref={ref => (this.webview = ref)}
          useWebKit={true}
          source={this.source}
          onMessage={this.messageDeal}
          javaScriptEnabled={true}
          onError={this.renderError}
        />
      </View>
    );
  }

  /**
   * Webview中传递的消息
   * @author 孟庆云
   */
  messageDeal(msg) {
    const data = JSON.parse(msg.nativeEvent.data);

    if (data.type === "cancel") {
      // 取消签名
      console.log("取消签名");
      
      if (this.state.onCancel) {
        this.state.onCancel();
      }
    } else {
      // 判断是否已经签名，如果没有签名的话，不处理
      if (data.data.length > 0) {
        if (this.state.onConfirm) {
          this.state.onConfirm(data);
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  webBg: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    flex: 1
  }
});