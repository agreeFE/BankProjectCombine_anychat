// 理财首页
import React, { Component, } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import { WebView } from "react-native-webview";

import { Close } from "../imageSource/imageSource";


const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import scope from '@/scope';


module.exports = class Webview extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this);

    this.state = {
      // source:{uri: 'https://www.baidu.com'}
      source:{uri: 'file:///storage/emulated/0/agree/explosion-demo/index.html'}
    };
    console.warn(this.props.data[0].FIELDVALUE);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.closeHome();
          }}
        >
          <View>
            <View style={styles.close}>
              <Image source={Close}></Image>
            </View>
            <View style={styles.topPart}>
              <View style={styles.stripe}></View>
              <Text style={styles.IDCheck}>返回</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.middlePart}>
          <WebView
            ref={ref => (window.webview = ref)}
            // source={{uri: `${this.props.data[0].FIELDVALUE}`}}
            allowFileAccess={true}
            source={this.state.source}
          />
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
      flex: 1,
    //   marginTop: 20,
    //   height: "70%",
    //   justifyContent: "center"
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
      marginTop: 5,
      left: 10
    },
    container: {
      backgroundColor: "#F4F4F4",
      flex: 1,
    //   justifyContent: "flex-start",
    //   alignItems: "center",
    //   position: "relative",
    //   paddingBottom: 20
    },
    close: {
      position: "absolute",
      right: 16,
      top: 9
    }
  });

