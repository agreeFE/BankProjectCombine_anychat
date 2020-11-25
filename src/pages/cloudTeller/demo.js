/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from "react";
import { StyleSheet, View, TextInput, Platform, NativeEventEmitter, Text, TouchableWithoutFeedback } from "react-native";
import { Recognizer, Synthesizer, SpeechConstant } from "react-native-speech-iflytek";
// import Button from "react-native-button";
// import console = require("console");

module.exports =  class demo extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      Synthesizer.init("5d64f9f6");
      Recognizer.init("5d64f9f6");
      console.warn('xinban')
      Recognizer.setParameter( 'vad_bos' , '2000')
      Recognizer.setParameter( 'vad_eos' , '2000')
    } else if (Platform.OS === 'ios') {
      Synthesizer.init("59a4161e");
      Recognizer.init("59a4161e");
    }

    this.state = {
      text: "我在测试。",
      recordBtnText: "Press to record",
      volume:''
    };

    this.onRecordStart = this.onRecordStart.bind(this);
    this.onRecordEnd = this.onRecordEnd.bind(this);
    this.onRecordCancel = this.onRecordCancel.bind(this);
    this.onRecognizerResult = this.onRecognizerResult.bind(this);
    this.onRecognizerError = this.onRecognizerError.bind(this);
    this.onRecognizerVolumeChanged = this.onRecognizerVolumeChanged.bind(this);
    this.onSyntheBtnPress = this.onSyntheBtnPress.bind(this);
    this.onIsSpeakingBtnPress = this.onIsSpeakingBtnPress.bind(this);
    this.onResumeBtnPress = this.onResumeBtnPress.bind(this);
  }

  componentDidMount() {
    this.recognizerEventEmitter = new NativeEventEmitter(Recognizer);
    this.recognizerEventEmitter.addListener('onRecognizerResult', this.onRecognizerResult)
    this.recognizerEventEmitter.addListener('onRecognizerError', this.onRecognizerError)
    this.recognizerEventEmitter.addListener('onRecognizerVolumeChanged', this.onRecognizerVolumeChanged)

    this.synthesizerEventEmitter = new NativeEventEmitter(Synthesizer);
    this.synthesizerEventEmitter.addListener('onSynthesizerSpeakCompletedEvent', this.onSynthesizerSpeakCompletedEvent);
    this.synthesizerEventEmitter.addListener('onSynthesizerBufferCompletedEvent', this.onSynthesizerBufferCompletedEvent);
  }

  componentWillUnmount() {
    this.recognizerEventEmitter.removeAllListeners();
    this.synthesizerEventEmitter.removeAllListeners();
  }

  render() {
    return (
      <View style={styles.container} onStartShouldSetResponder={() => true}>
        <Text>{this.state.text}</Text>
        <Text>{this.state.recordBtnText}</Text>
        <TextInput onChangeText={volume => this.setState({ volume })} value={this.state.volume} />
        <TouchableWithoutFeedback onPress={()=>{this.onRecordStart()}}>
          <View style={{width:100,height:100,backgroundColor:'red',}}>
            <Text style={{width:'100%',textAlign:"center"}}>Tap to speak </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  onRecordStart() {
    this.setState({ recordBtnText: "Release to stop" });
    Recognizer.start();
  }

  onRecordEnd() {
    this.setState({ recordBtnText: "Press to record" });
    Recognizer.stop();
  }

  onRecordCancel(evt) {
    // setTimeout(() => {
    //   Recognizer.cancel();
    // }, 500);
  }

  onRecognizerResult(e) {
    console.warn('result', e)
    this.setState({ text: e.result });
    if (e.isLast) {
      alert('guanbi')
      return;
    }
  }

  onRecognizerError(result) {
    if (result.errorCode !== 0) {
      alert(JSON.stringify(result));
    }
  }

  onRecognizerVolumeChanged(e) {
    this.setState({ volume: e.volume })
    // console.warn(e.volume)
  }

  async onSyntheBtnPress() {
    Synthesizer.start(this.state.text);
  }

  async onPauseBtnPress() {
    Synthesizer.pause();
  }

  onResumeBtnPress() {
    Synthesizer.resume();
  }

  async onIsSpeakingBtnPress() {
    let isSpeaking = await Synthesizer.isSpeaking();
    alert(isSpeaking);
  }

  onSynthesizerSpeakCompletedEvent(result) {
    alert('onSynthesizerSpeakCompletedEvent\n\n' + JSON.stringify(result));
  }

  onSynthesizerBufferCompletedEvent(result) {
    // alert('onSynthesizerBufferCompletedEvent\n\n' + JSON.stringify(result));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 5
  },
  result: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  recordBtn: {
    height: 34,
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc"
  },
  containerStyle: {
    backgroundColor: "#0275d8",
    margin: 4,
    padding: 4,
    borderRadius: 2
  }
});