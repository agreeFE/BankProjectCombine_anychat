import React, { Component } from 'react'

import {
  View,
  Text,
  NativeModules,
  Platform,
  NativeEventEmitter,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'

import { Recognizer } from "react-native-speech-iflytek";

import CloudBg from '$/components/cloudBg/index'
import CloudTellerBI from './briefIntroduction/index'
import HomePage from './homePage/index'
import BreathingLamp from '$/components/breathingLamp/index'
import Header from './header/header'
import Wave from '$/components/waveView/Wave'
import Distinguish from './distinguish/index'

import VoiceSuccess from './voiceSuccess/index'
import VoiceFail from './voiceFailure/index'

import scope from '../../scope'

const AnyChat = NativeModules.AnyChatPlugin
var tI = null;//定时器

module.exports = class CloudTeller extends Component {
  constructor(props) {
    super(props)
    scope(this);

    /**
     * 调用科大讯飞语音识别功能
     * 初始化语音识别
     * @author 卢鹏宇
     */
    if (Platform.OS === 'android') {
      Recognizer.init("5d64f9f6");
      Recognizer.setParameter( 'vad_bos' , '2000')
      Recognizer.setParameter( 'vad_eos' , '2000')
    } else if (Platform.OS === 'ios') {
      Recognizer.init("59a4161e");
    }

    this.state = {
      transformRotate:0,//等待页面旋转角度
      showBI: false,
      talk: true,
      distinguish: false,
      unrecognized: false,
      param: "",
      SpeechRecognitionResults:'',
      SpeechRecognitionvolume:'',
      increase:false,
      showLinkModel:'',
      showText:true
    }
    this.nextStep = this.nextStep.bind(this)
    this.talk = this.talk.bind(this)
    this.back = this.back.bind(this)

    /**
     * 语音识别绑定this
     * @author 卢鹏宇
     */
    this.onRecordStart = this.onRecordStart.bind(this);
    this.onRecordEnd = this.onRecordEnd.bind(this);
    this.onRecognizerResult = this.onRecognizerResult.bind(this);
    this.onRecognizerError = this.onRecognizerError.bind(this);
    this.onRecognizerVolumeChanged = this.onRecognizerVolumeChanged.bind(this);

    const params = {
      "APP_ID": "17073782",
    	"API_KEY": "hsObP0Q4eRFbyXYIAhqc6Dpx",
    	"SECRET_KEY": "IGhzcd6ycBugVIIxveIb6vRHcjBxxOZp"
    }

    // NativeModules.BaiDuSpeechPlugin.initSpeech(params, succ => {
    //   console.warn('初始化百度语音识别成功')
    //   console.warn(succ)
    // }, err => {
    //   console.error('初始化百度语音识别失败')
    //   console.error(err)
    // })
  }
  componentDidMount() {
    let _this = this

    /**
     * 语音识别监听
     * @author 卢鹏宇
     */
    this.recognizerEventEmitter = new NativeEventEmitter(Recognizer);
    this.recognizerEventEmitter.addListener('onRecognizerResult', this.onRecognizerResult)
    this.recognizerEventEmitter.addListener('onRecognizerError', this.onRecognizerError)
    this.recognizerEventEmitter.addListener('onRecognizerVolumeChanged', this.onRecognizerVolumeChanged)


    /**
     * 开始语音识别
     * @author 卢鹏宇
     * **/
    this.onRecordStart();

    // WebSDK.getDefaults("firstEnterCloudTeller", succ => {
    //   console.warn('成功获取偏好', succ)

    //   if (!succ.data) {
    //     _this.setState({
    //       showBI: true
    //     })
    //   }
    // }, err => {
    //   console.warn('获取偏好失败', err)
    //   _this.setState({
    //     showBI: true
    //   })
    // })
  }
  render() {
    let { showBI, param, talk, distinguish, unrecognized, SpeechRecognitionText } = this.state

    return (
      <CloudBg>
        {
          showBI ?
          <CloudTellerBI next={this.nextStep}></CloudTellerBI>
          :
          <View style={{flex: 1}}>
            <Header back={this.back}></Header>
            <View style={{height: "74%"}}>
              {
                talk ?
                <Distinguish value={SpeechRecognitionText}></Distinguish>
                :
                (distinguish ?
                  <VoiceSuccess value={param}  callBackLoad={()=>this.callBackLoadModal()}  ></VoiceSuccess>
                  :
                  unrecognized ?
                  <VoiceFail callBackLoad={()=>this.callBackLoadModal()}></VoiceFail>
                  :
                  <HomePage></HomePage>
                )
              }
            </View>
            <View style={[styles.model,this.state.showLinkModel==='1'?styles.showModel:styles.unShowModel]}>
                {/* 旋转动画 */}
                <View style={{width:'100%',height:80,justifyContent:'center',alignItems:'center',transform:[{rotate: this.state.transformRotate+'deg' }]}}>
                    <View style={{width:110,height:110,borderColor:"#779EA6",borderWidth:1,borderRadius:55}}>
                    <View style={{width:16,height:16,borderRadius:8,backgroundColor:"#5EE2DE",position:"absolute",right:-8,top:47,zIndex:5000000}}></View>
                    </View>
                </View>
                <Text style={{color:"#fff",marginTop:-50}}>正在连线...</Text>
                <Text style={{color:'#C9CE07',position:'absolute',bottom:150, fontSize: 20,textAlign:"center"}} onPress={()=>{
                  this.unCallCount()
                }} >取消连线</Text>
            </View>
            <View style={{flex:1,justifyContent:'center',marginLeft: -1 }}>
              {
                talk ?
                <Wave SpeechRecognitionvolume={this.state.SpeechRecognitionvolume}
                      increase = {this.state.increase}
                      ></Wave>
                :
                <BreathingLamp fnc={this.talk} showText={this.state.showText}></BreathingLamp>
              }
            </View>

          </View>
        }

      </CloudBg>
    )
  }

  unCallCount(){
    clearInterval(tI);
    AnyChat.loginOut(( succ )=>{
      this.setState({
        showLinkModel: '0',
        showText:true
      });
    },( err )=>{
        console.warn();
    });
  }

  // 点击云柜员跳转
  callBackLoadModal() {
    const _this = this;
    let defaultAction = [
      {
        text: '取消',
        onPress: () => {
          clearInterval(tI);
        },
        style: 'default',
      },
      {
        text: '确定', onPress: () => {
          _this.callBackLoad();
        },
      }
    ];
    window.$Modal.confirm('呼叫柜员','确认呼叫远程柜员吗?',defaultAction)
  }
  callBackLoad(){

    let _this = this;

    clearInterval(tI);
    tI = window.setInterval(function(){

        let transformRotateNew = _this.state.transformRotate-(-3);

        _this.setState({
            transformRotate: transformRotateNew,
        });

    },20);

    this.setState({
      showLinkModel: '1',
      showText:false,
    });
    /**
     * @初始化 AnyChat
     * @author 卢鹏宇
     * @date 2019-09-04
     */
    AnyChat.init(( succ )=>{
        console.warn( succ )
          /**
         * @ AnyChat 进线
         * @author 卢鹏宇
         * @date 2019-09-05
         * @params enterLineUrl ：URL
         * @params businessId ： 业务类型
         */
        let params = {
            enterLineUrl: 'https://arcs.agree.cn:53073',
            businessId: ""
        }
        AnyChat.enterLine ( params, ( succ )=>{
            console.warn( '进线成功回调='+ succ )
            this.props.navigation.navigate("tellerOperation",{
                account:"liudabin",
            });
            this.setState({
                showLinkModel: '0',
                showText:true
            });
        }, ( err )=>{
            console.warn( err )
        });
    }, ( err )=>{
        console.warn( err )
    });
  }

  /**
   * 语音识别开始
   * @author 卢鹏宇
   */
  onRecordStart() {
    Recognizer.start();
  }

  /**
   * 语音识别结束
   * @author 卢鹏宇
   */
  onRecordEnd() {
    Recognizer.stop();
  }

  onRecognizerResult(e) {
    this.setState({
      SpeechRecognitionText: e.result
    })
    if (e.isLast) {
      // this.setState({increase:false})
      this.setState({
        talk: false,
        distinguish: true,
        unrecognized: false,
        param: e.result,
        SpeechRecognitionText:''
      })
      return;
    }
  }

  onRecognizerError(result) {
    this.setState({
      talk: false,
      distinguish: false,
      unrecognized: true
    })
    // if (result.errorCode !== 0) {

    // }
  }

  onRecognizerVolumeChanged(e) {
    this.setState({ SpeechRecognitionvolume: parseInt( e.volume ) })
  }

  nextStep() {
    // let { showBI } = this.state
    this.setState({
      showBI: false,
    })
    console.warn('设置偏好数据，下次加载时不会显示引导页')
    // WebSDK.saveDefaults({
    //   "key": "firstEnterCloudTeller",
    //   "value": "Finished"
    // })
  }
  // 点击 ‘点击说话’ 按钮
  talk() {
    // let { talk } = this.state
    const _this = this
    _this.setState({
      talk: true,
      distinguish: false,
      unrecognized: false,
      increase:true
    })

    /**
     * 开始语音识别
     * @author 卢鹏宇
     * **/
    this.onRecordStart();


	  // NativeModules.BaiDuSpeechPlugin.startSpeech(speechResult => {
    //     // 识别成功
    //     console.warn('识别成功', JSON.stringify(speechResult))
    //     _this.setState({
    //       talk: false,
    //       distinguish: true,
    //       unrecognized: false,
    //       param: speechResult.data
    //     })
    //   }, speechErr => {
    //     // 识别失败
    //     _this.setState({
    //       talk: false,
    //       distinguish: false,
    //       unrecognized: true
    //     })
    //   })
  }

  back() {
    // const { unrecognized, talk, distinguish } = this.state
    // if(unrecognized || distinguish || talk) {
    //   this.setState({
    //     talk: false,
    //     distinguish: false,
    //     unrecognized: false,
    //   })
    // } else {
      this.props.navigation.goBack()
    // }
  }
}
const styles = StyleSheet.create({
  model:{
    position:"absolute",
    width:"100%",
    height:"100%",
    zIndex:4000,
    paddingTop:'80%',
    backgroundColor:'rgba(0,0,0,0.8)',
    alignItems: 'center',
    // justifyContent:"space-around"
  },
  showModel:{

  },
  unShowModel:{
      left:10000,
      backgroundColor:"#fff"
  },
})
