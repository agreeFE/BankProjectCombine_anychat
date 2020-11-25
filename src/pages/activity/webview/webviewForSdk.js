// 理财首页
import React, { Component, } from 'react';
import {
  StyleSheet,
  View,
  PixelRatio,
  Image,Platform
} from 'react-native';
import RNExitApp from 'react-native-exit-app';

import { WebView } from "react-native-webview";

import RNFS from 'react-native-fs';//文件下载,获取文件位置
const ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
console.warn('这是ExternalDirectoryPath----------------------')
console.warn(ExternalDirectoryPath)

const CachesDirectoryPath = RNFS.CachesDirectoryPath;
console.warn('这是CachesDirectoryPath')
console.warn(CachesDirectoryPath)

const DocumentDirectoryPath = RNFS.DocumentDirectoryPath;
console.warn('这是DocumentDirectoryPath')
console.warn(DocumentDirectoryPath)

import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, OPEN, LICAI } from '../imageSource'

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import scope from '@/scope';
const router = require("@/router-control");
const sdkJs = require('../../../../sdk/gooseSDK/sdfForWebInject');

import rnSDK from '../../../../sdk/gooseSDK/index'
//'file:///storage/emulated'
// const source = (Platform.OS == 'ios') ? require('./www/index.html') : { uri: 'file:///android_asset/www/index.html' }
// const source2 = { uri: 'file:///storage/emulated/0/Pictures/www/index.html'}
// const source3 = { uri: 'file:///storage/emulated/0/Pictures/index.html' }

let source3 = ''
if (Platform.OS === 'android') {
  source3 = {uri: 'file://' + ExternalDirectoryPath + '/upload-demo/index.html'}
  // source3 = {uri: ExternalDirectoryPath + '/upload-demo/index.html'}
}else{
  source3 = {uri: './upload-demo/index.html'}
}


let pagesDemo = ''
// const imgSource = require('$image/popUpPage/ConfirmInfo/open.png')
const imgSource = { uri: 'file:///storage/emulated/0/Pictures/image-d087a844-95db-4382-8f75-c8e3e8216345.jpg' }
//file:///storage/emulated/0/Pictures/image-d087a844-95db-4382-8f75-c8e3e8216345.jpg

console.warn('React-----------------------------------')
console.warn(React)

module.exports = class Webview extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);

    // 获取Webview需要加载的URL
    let url = router.getParams("url");
    if (url.indexOf('?') != -1) {
      url += '&currenttime=' + new Date().getTime();
    } else {
      url += '?currenttime=' + new Date().getTime();
    }
    console.warn('Webview访问地址: ' + url);
    const title = router.getParams("title");

    this.state = {
      url: url,
      headerTitle: title || '理财产品',
      pageTitle: '',
      content:''
    };

    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
  }
  observer() {
    let oMap = {};
    for (let pop in amVAR) {
      oMap[pop] = amVAR[pop];
    }
    this.setState(oMap, () => { });
  }
  componentDidMount() { 
    // let url = source2.uri;
    // alert(23333)
    // fetch(url)
    //   .then((response) => response.text())
    //   .then((responseText) => {
    //     alert(11111)
    //     console.warn('responseText-----------------------')
    //     console.warn(responseText)
    //     this.setState( {content: responseText});
    //   })
    //   .catch((error) => {
    //     console.warn(error);
    //   });
  }
  backForAndroid = () => {
    if (this.state.pageTitle == "产品" || this.state.pageTitle == "持仓") {
      router.back();
    } else if (window.canGoBack) {
      window.webview.goBack();
    } else {
      router.back();
    }
  }
  changeCurPage = (data) => {

    // rn收到前端请求,在这里调nativeSDK
    var objData = JSON.parse(data.nativeEvent.data)
    var options = objData.data;
    var timestamp = objData.timestamp;
    var funType = objData.type;
    
    rnSDK[funType](objData,function(resSuc){

      var successFunName = objData.type+'Success'+objData.timestamp;
      var successData = resSuc;
      var injectData = `window.GooseSDK.results['${successFunName}']('${successData}');`
      window.webview.injectJavaScript(injectData);

    },function(faidata){
      var failureFunName = objData.type+'Failure'+objData.timestamp;
      var failureData = faidata;
      var injectData = `window.GooseSDK.results['${failureFunName}']('${failureData}');`
      window.webview.injectJavaScript(injectData);

    }) 

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftIcon={BACK} rightIcon={ELLIPSIS}
          title={this.state.headerTitle}
          imageBackground={BACK_BG_HEAD}
          leftIconStyle={{ width: 9, height: 15 }} rightIconStyle={{ width: 22, height: 4 }}
          leftClick={this.backForAndroid}
          rightClick={() => { }}
        ></Header>
         {/* <View> */}
          {/* <Image source={imgSource}  style={styles.ImageBox}></Image> */}
         {/* </View> */}
        
        <WebView
          ref={ref => (window.webview = ref)}
          // source={{ uri: this.state.url }}
          source={source3}
          // html={this.state.content}
          // source={{ html:this.state.content,baseUrl:'file:///storage/emulated/0/Pictures/www/'}}
          style={styles.webView}
          startInLoadingState={true}
          javaScriptEnabled={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          mixedContentMode='always'
          onNavigationStateChange={this._onNavigationStateChange}
          onLoadEnd={syntheticEvent => {
            this.onLoadEnd(syntheticEvent);
          }}
          // onMessage={this.changeCurPage}
          onMessage={event => { this.changeCurPage(event) }}
        />
      </View>
    );
  }
  componentWillMount() {
   
    
  }
  componentWillUnmount() {
    window.webview = undefined;
    window.webviewState = undefined;
    window.canGoBack = false;

  }
  onLoadEnd(event) {
    window.webview.injectJavaScript(sdkJs);
  }

  _onNavigationStateChange(navState) {
    this.setState({
      pageTitle: navState.title
    });
    window.canGoBack = navState.canGoBack;
    window.webviewState = navState;
  }
};

const styles = StyleSheet.create({
  webView: {
    // width:300,
    // height:300,
    flex: 1
  },
  ImageBox:{
    width:100,
    height:100
  }
});
