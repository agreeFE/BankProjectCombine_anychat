// 理财首页
import React, { Component,  } from 'react';
import {
  StyleSheet,
  View,
  PixelRatio,
} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { WebView } from "react-native-webview";
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, OPEN, LICAI } from '../imageSource'

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import scope from '@/scope';
const router = require("@/router-control");

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
      pageTitle: ''
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
  componentDidMount() { }
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
    this.setState({
      headerTitle: data.nativeEvent.data
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
        <WebView
          ref={ref => (window.webview = ref)}
          source={{ uri: this.state.url }}
          style={styles.webView}
          startInLoadingState={true}
          onNavigationStateChange={this._onNavigationStateChange}
          // onMessage={this.changeCurPage}
          onMessage={event => { this.changeCurPage(event) }}
        />
      </View>
    );
  }
  componentWillUnmount() {
    window.webview = undefined;
    window.webviewState = undefined;
    window.canGoBack = false;
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
    flex: 1
  },
});
