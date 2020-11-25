import React, { Component,  } from 'react';
import { NavigationEvents } from 'react-navigation';
import LinearGradient from "react-native-linear-gradient"
import { View, StyleSheet, StatusBar, Image, TextInput, Text, TouchableWithoutFeedback, Modal, NativeModules } from 'react-native';
import { SEARCH, YUYIN, WASTE, BUCUNZAI, RIGHTARROW, DELX, DKJL, WDDK } from './searchImageSource'
const router = require('$/router-control')
import SVG from "$/components/Svg";
import scope from '$/scope'
const { StatusBarManager } = NativeModules
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT

module.exports = class aboutInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      searchValue: '',
      noHis: false,
      seaHisList: [],//历史搜索
      seaRecList: ['私钻闪耀', '贷款', '转账关爱周'],//推荐搜索
      allFun: false,
      animationType: 'fade',//none slide fade
      modalVisible: false,//模态场景是否可见
      transparent: true,//是否透明显示
    };
    this.searchChange = this.searchChange.bind(this);
    this.searchSub = this.searchSub.bind(this);
  }
  componentDidMount() {
    this.getsearchList()

  }
  //删除历史
  delHis(index) {
    if (index == 1) {
      //开启对话框
      this.setState({ modalVisible: true });
    } else if (index == 2) {
      //关闭对话框
      this.setState({ modalVisible: false });
    } else if (index == 3) {
      //删除历史搜索
      this.setState({ modalVisible: false });
      this.setState({ noHis: true });
      this.setState({ seaHisList: [] });
      $Storage.remove({
        key: 'seaHisList'
      });
      $Toast.success('删除成功')
    }
  }
  //搜索栏监听
  searchChange(text) {
    this.setState({
      searchValue: text
    })
  }
  //搜索栏确定事件
  searchSub() {
    this.setState({
      noHis: false
    })
    var data = this.state.seaHisList
    data.unshift(this.state.searchValue)
    this.setState({
      seaHisList: Array.from(new Set(data))
    })
    $Storage.save({
      key: 'seaHisList',
      data: JSON.stringify(data)
    });
  }
  //获取历史搜索
  getsearchList() {
    let _this = this
    $Storage.load({
      key: 'seaHisList'
    }).then(result => {
      console.warn('result', result)
      _this.setState((previousState) => {
        return ({
          seaHisList: JSON.parse(result),
        })
      });
    }).catch(err => {
      _this.setState({
        noHis: true,
      })
    });
  }
  //展示全部功能
  allFun() {
    this.setState({
      allFun: true,
    })
  }

  //返回
  back = (index) => {
    if (index == 1) {
      router.back()
    } else if (index == 2) {
      this.setState({
        allFun: false,
      })
    }

  }
  //选中记录
  chooseInfo = (index) => {
    this.setState({
      searchValue: index
    })
  }
  listComponent(item) {
    return <TouchableWithoutFeedback onPress={() => { this.chooseInfo(item) }}>
      <View style={{ backgroundColor: '#F1F5F7', height: 36, borderRadius: 18, marginLeft: 12, marginTop: 12, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'PingFangSC-Light', fontSize: 14, color: '#333333', textAlign: 'justify' }}>{item}</Text>
      </View>
    </TouchableWithoutFeedback>
  }
  // componentDidMount() {
    
  // }

  render() {
    return (
      <>
        <NavigationEvents onDidFocus={payload => { StatusBar.setBarStyle('dark-content') }} onWillFocus={payload => { StatusBar.setBarStyle('dark-content') }}></NavigationEvents>
        <View style={styles.topPad}>
        </View>
        {/* 搜索框 */}
        {this.state.allFun == false ?
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 60,alignItems: 'center' }}>
              <View style={[ { width: '70%', height: 60, marginLeft: 20, justifyContent: 'center', }]}>
                <View style={styles.inputStyle}>
                  <Image style={styles.topSearchIco} source={SEARCH} />
                  <TextInput style={styles.topSearchInput}
                    autoFocus={true}
                    placeholderTextColor={'#A3A8C5'} placeholder='您有899红包待收'
                    value={this.state.searchValue} onChangeText={this.searchChange} onSubmitEditing={this.searchSub}></TextInput>
                  {this.state.searchValue.length <= 0 ? <SVG style={styles.topSearchIcoRight} source={YUYIN} /> : <></>}
                  {this.state.searchValue.length > 0 ?
                    <TouchableWithoutFeedback onPress={() => { this.searchChange('') }}>
                      <Image style={[styles.topSearchIcoRight, { width: 16 }]} source={DELX} />
                    </TouchableWithoutFeedback>
                    : <></>}
                </View>
              </View>
              <View style={styles.quxiaobox}>
                <Text onPress={() => { this.back(1) }} style={styles.quxiao}>取消</Text>
              </View>
            </View>
            {/* 内容搜索页 */}
            {this.state.searchValue == '' ? <View style={styles.body}>
              <View style={{ width: '93%', marginLeft: '3%' }}>
                <View style={{ width: '100%', flexDirection: 'row', height: 26, lineHeight: 26, paddingTop: 5, justifyContent: 'center' }}>
                  <Text style={[styles.headTitleStyle, { width: '90%' }]}>历史搜索</Text>
                  <TouchableWithoutFeedback onPress={() => { this.delHis(1) }}>
                    <View>
                      <SVG style={{ width: 16, height: 16, top: 5 }} source={WASTE} />
                    </View>
                  </TouchableWithoutFeedback>

                </View>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                {this.state.seaHisList.map((item) => this.listComponent(item))}
                {this.state.noHis ? <Text style={{ marginLeft: 35, marginTop: 10 }}>暂无搜索历史</Text> : <></>}
              </View>


              <View style={{ width: '93%', marginLeft: '3%', marginTop: 30 }}>
                <View style={{ width: '100%', flexDirection: 'row', height: 26, lineHeight: 26, paddingTop: 5, justifyContent: 'center' }}>
                  <Text style={[styles.headTitleStyle, { width: '90%' }]}>搜索推荐</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                {this.state.seaRecList.map((item) => this.listComponent(item))}
              </View>
            </View>
              : <></>}
            {/* 内容有结果页 */}
            {this.state.searchValue == '贷款' ?
              <View style={styles.body}>
                <View style={{ width: '100%', height: 8, backgroundColor: '#F4F4F4' }}></View>
                <View style={{ width: '100%', height: 195 }}>
                  <View style={{ width: '93%', marginLeft: '3%' }}>
                    <View style={{ width: '100%', flexDirection: 'row', height: 26, lineHeight: 26, paddingTop: 5, justifyContent: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                      <Text style={[styles.headTitleStyle, { width: '80%' }]}>功能</Text>
                      <Text onPress={() => { this.allFun() }} style={{ fontFamily: 'PingFangSC-Regular', fontSize: 13, color: '#999999', top: 2 }}>全部（30）</Text>
                      <Image style={{ width: 13, height: 13, top: 5 }} source={RIGHTARROW} />
                    </View>
                    <View style={{ borderBottomColor: '#F4F4F4', borderBottomWidth: 1, height: 80, justifyContent: 'center' }}>
                      <Image style={styles.bodyLeftImg} source={DKJL} />
                      <Text style={{ fontSize: 15, color: '#151515', paddingLeft: 40 }}><Text style={{ color: '#EA9933' }}>贷款</Text>记录</Text>
                      <Text style={{ marginTop: 10, paddingLeft: 40 }}>全部-<Text style={{ color: '#EA9933' }}>贷款</Text>-我的<Text style={{ color: '#EA9933' }}>贷款</Text>-<Text style={{ color: '#EA9933' }}>贷款</Text>记录</Text>
                    </View>
                    <View style={{ borderBottomColor: '#F4F4F4', borderBottomWidth: 1, height: 80, justifyContent: 'center' }}>
                      <Image style={styles.bodyLeftImg} source={WDDK} />
                      <Text style={{ fontSize: 15, color: '#151515', paddingLeft: 40 }}>我的<Text style={{ color: '#EA9933' }}>贷款</Text></Text>
                      <Text style={{ marginTop: 10, paddingLeft: 40 }}>全部-<Text style={{ color: '#EA9933' }}>贷款</Text>-我的<Text style={{ color: '#EA9933' }}>贷款</Text></Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '100%', height: 8, backgroundColor: '#F4F4F4' }}></View>
                <View style={{ width: '100%', height: 195 }}>
                  <View style={{ width: '93%', marginLeft: '3%' }}>
                    <View style={{ width: '100%', flexDirection: 'row', height: 26, lineHeight: 26, paddingTop: 5, justifyContent: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                      <Text style={[styles.headTitleStyle, { width: '80%' }]}>产品</Text>
                      <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 13, color: '#999999', top: 2 }}>全部（6）</Text>
                      <Image style={{ width: 13, height: 13, top: 5 }} source={RIGHTARROW} />
                    </View>
                    <View style={{ borderBottomColor: '#F4F4F4', borderBottomWidth: 1, height: 80, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 15, color: '#151515', paddingLeft: 12 }}>北京建工<Text style={{ color: '#EA9933' }}>贷款</Text></Text>
                      <Text style={{ marginTop: 10, paddingLeft: 12, fontSize: 13, color: '#999999' }}>BA1995 | 私募基金 </Text>
                    </View>
                    <View style={{ borderBottomColor: '#F4F4F4', borderBottomWidth: 1, height: 80, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 15, color: '#151515', paddingLeft: 15 }}>广州建工<Text style={{ color: '#EA9933' }}>贷款</Text></Text>
                      <Text style={{ marginTop: 10, paddingLeft: 12, fontSize: 13, color: '#999999' }}>BA1995 | 私募基金 </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '100%', height: 8, backgroundColor: '#F4F4F4' }}></View>
              </View>
              : <></>}
            {/* 内容无结果页 */}
            {this.state.searchValue != '' ?
              <View style={[styles.body, { flexDirection: 'row', justifyContent: 'center' }]}>
                <SVG style={{ width: 174, height: 156, top: 88 }} source={BUCUNZAI} />
              </View>
              : <></>}
          </View> : <></>}
        {/* 全部功能页 */}
        {this.state.allFun ?
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around',height: 60, alignItems: 'center', }}>
              <View style={[ { width: '70%', height: 60, marginLeft: 20,justifyContent: 'center', }]}>
                <View style={styles.inputStyle}>
                  <Image style={styles.topSearchIco} source={SEARCH} />
                  <TextInput style={styles.topSearchInput} editable={false}
                    placeholderTextColor={'#A3A8C5'} placeholder='您有899红包待收'
                    value={this.state.searchValue} onChangeText={this.searchChange} onSubmitEditing={this.searchSub}></TextInput>
                  <SVG style={styles.topSearchIcoRight} source={YUYIN} />
                </View>
              </View>
              <View style={styles.quxiaobox}>
                <Text onPress={() => { this.back(2) }} style={styles.quxiao}>取消</Text>
              </View>
            </View>
            <Text style={{ paddingLeft: 20, color: '#999999' }}>全部相关功能（30）</Text>
            <View style={[styles.body], { paddingLeft: 30 }}>

              <View style={{ borderBottomColor: '#F4F4F4', borderBottomWidth: 1, height: 80, justifyContent: 'center' }}>
                <Image style={styles.bodyLeftImg} source={DKJL} />
                <Text style={{ fontSize: 15, color: '#151515', paddingLeft: 40 }}><Text style={{ color: '#EA9933' }}>贷款</Text>记录</Text>
                <Text style={{ marginTop: 10, paddingLeft: 40 }}>全部-<Text style={{ color: '#EA9933' }}>贷款</Text>-我的<Text style={{ color: '#EA9933' }}>贷款</Text>-<Text style={{ color: '#EA9933' }}>贷款</Text>记录</Text>
              </View>
              <View style={{ borderBottomColor: '#F4F4F4', borderBottomWidth: 1, height: 80, justifyContent: 'center' }}>
                <Image style={styles.bodyLeftImg} source={WDDK} />
                <Text style={{ fontSize: 15, color: '#151515', paddingLeft: 40 }}>我的<Text style={{ color: '#EA9933' }}>贷款</Text></Text>
                <Text style={{ marginTop: 10, paddingLeft: 40 }}>全部-<Text style={{ color: '#EA9933' }}>贷款</Text>-我的<Text style={{ color: '#EA9933' }}>贷款</Text></Text>
              </View>
            </View>
          </View>

          : <></>}
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.delHis(2)
          }}
        >
          <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ height: 178, width: '90%', marginLeft: '5%', alignItems: 'center', backgroundColor: 'white', borderRadius: 5 }}>
              <View style={{ height: 48, borderBottomColor: '#EBEBEB', borderBottomWidth: 1, width: '100%', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, color: '#333333', textAlign: 'center' }}>温馨提示</Text>
              </View>
              <View style={{ height: 80, width: '100%', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, color: '#333333', textAlign: 'center' }}>确定删除全部历史记录</Text>
              </View>
              <View style={{ height: 80, width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => { this.delHis(2) }}>
                  <View style={{ height: 35, width: '40%', borderColor: $globalStyle.backgroundColor, borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: $globalStyle.backgroundColor }}>取消</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.delHis(3) }}>
                  <LinearGradient colors={$globalStyle.buttonLinerBackground} style={{ marginLeft: '5%', height: 35, width: '40%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: $globalStyle.textColor }}>确定</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
      </>
    )
  }

}

const styles = StyleSheet.create({
  topPad: {
    height: STATUSBAR_HEIGHT,
    marginTop: 10,
  },
  body: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  bodyView: {
    height: 45,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  quxiaobox: {
    // height: 36,
    // lineHeight: 36,
    justifyContent: 'center',
    // width: '20%',
    // backgroundColor: 'red',
    alignItems: 'center'
  },
  quxiao: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 17,
    color: '#333333',
  },
  bodyViewText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingLeft: 24,
    justifyContent: 'center',
    width: '35%'
  },
  inputStyle: {
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#333333",
  },
  topSearchIco: {
    width: 15,
    height: 15,
  },
  topSearchIcoRight: {
    width: 12,
    height: 16
  },
  topSearchInput: {
    flex: 1,
    lineHeight: 18,
    padding: 0,
    paddingLeft: 15,
    paddingRight: 15,
    // position: "absolute",
    // left: 40,
    // bottom: 8,
    fontSize: 14,
    color: "#A3A8C5",

  },
  // topSearchIcoRight: {
  //   position: "absolute",
  //   right: 13,
  //   top: 7,
  //   width: 12,
  //   height: 16
  // },
  headTitleStyle: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 17,
    color: '#333333',
    textAlign: 'justify'
  },
  bodyLeftImg: {
    width: 20, height: 20, position: 'absolute', marginLeft: 6
  }
})
