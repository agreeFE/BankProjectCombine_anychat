import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, View, ImageBackground, TouchableWithoutFeedback, Dimensions } from 'react-native';
import TextBubble from '../../../components/textBubble/TextBubble'
module.exports = class App extends Component {
  state = {
    businessTextArr: [
      { businessName: "综合签约", bubbleSize: 82 },
      { businessName: "购买理财产品", bubbleSize: 100 },
      { businessName: "快速借钱", bubbleSize: 75 },
      { businessName: "开通证券账户", bubbleSize: 102 },
      { businessName: "办理贷款", bubbleSize: 75 }
    ]
  }
  render() {
    return (
      <ImageBackground style={styles.container} source={require('$image/speechRecognition/bg.png')}>
        <View style={styles.bumpRegion}>
          {this.state.businessTextArr.map((ele, index) => {
            return (
              <TextBubble businessText={ele.businessName} bubbleSize={ele.bubbleSize} curIndex={index} key={ele}></TextBubble>
            )
          })}
        </View>
      </ImageBackground>
    );
  }
}
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  bumpRegion: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    width: screenWidth,
    justifyContent: 'flex-end',
    paddingBottom: 70,
    alignItems: 'baseline',
    backgroundColor: '#23262D',
  },
});