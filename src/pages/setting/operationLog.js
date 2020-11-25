import React, { Component,  } from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD } from './setImageSource'
const router = require('$/router-control');
import scope from '$/scope'
// import ScrollableTabView from '$/components/rnScrollTabView/node_modules/react-native-scrollable-tab-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
const NetworkUtil = require('$/util/networkutil');
module.exports = class operationLog extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      tabNames: ['全部', '登录日志', '其他操作日志'],
      dataSize: '20', //每页请求条数
      curTab: 0, //当前tab页
      allData: [], //全部数据
      loginData: [],//登录日志数据
      otherData: [],//其他操作日志数据
      //网络请求状态
      isLoading: true,
      error: false,
      errorInfo: "",
      allShowFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      loginShowFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      otherShowFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      isRefreshing: false,//下拉控制
      // 
      allCurrentPage: '1',//数据当前分页页码
      allTotalPage: '',//数据总页数
      allItemTotalNo: '0',//数据总条数
      loginCurrentPage: '1',//数据当前分页页码
      loginTotalPage: '',//数据总页数
      loginItemTotalNo: '',//数据总条数
      otherCurrentPage: '1',//数据当前分页页码
      otherTotalPage: '',//数据总页数
      otherItemTotalNo: '',//数据总条数
    };
  }
  componentDidMount() {
    this.getlog('all')
    this.getlog('login')
    this.getlog('other')
  }
  // 处理数据请求
  getlog(type = 'all') {
    let _this = this
    let { dataSize, allData, loginData, otherData, allCurrentPage, loginCurrentPage, otherCurrentPage, allTotalPage, loginTotalPage, otherTotalPage } = this.state
    var data = {
      current: type == 'all' ? allCurrentPage : type == 'login' ? loginCurrentPage : otherCurrentPage, // 根据type设置不同的当前页
      size: dataSize,
      operatorType: type
    }
    switch (type) {
      case 'all': {
        _this.setState({
          allShowFoot: 2,
        })
        break
      }
      case 'login': {
        _this.setState({
          loginShowFoot: 2,
        })
        break
      }
      case 'other': {
        _this.setState({
          otherShowFoot: 2,
        })
        break
      }
    }
    NetworkUtil.networkService('/user/op/log', data, function (response) {

      switch (type) {
        case 'all':
          // 判断数据请求是否到最后一页
          if (allCurrentPage <= response.pages) {
            // 页数加一，供下次请求调用
            let page = parseInt(allCurrentPage) + 1;
            _this.setState({
              allData: allData.concat(response.records),
              allCurrentPage: page,
              allTotalPage: response.pages,
              allItemTotalNo: response.total,
              allShowFoot: 0
            })
            // 判断数据不足20条的场景
            if (page - 1 <= response.pages) {
              _this.setState({
                allShowFoot: 1
              })
            }
          } else {
            _this.setState({
              allShowFoot: 1
            })
          }
          break
        case 'login':
          if (loginCurrentPage <= response.pages) {
            let page = parseInt(loginCurrentPage) + 1;
            _this.setState({
              loginData: loginData.concat(response.records),
              loginCurrentPage: page,
              loginTotalPage: response.pages,
              loginItemTotalNo: response.total,
              loginShowFoot: 0
            })
            // 判断数据不足20条的场景
            if (page - 1 <= response.pages) {
              _this.setState({
                loginShowFoot: 1
              })
            }
          } else {
            _this.setState({
              loginShowFoot: 1
            })
          }
          break
        case 'other':
          if (otherCurrentPage <= response.pages) {
            let page = parseInt(otherCurrentPage) + 1;
            _this.setState({
              otherData: otherData.concat(response.records),
              otherCurrentPage: page,
              otherTotalPage: response.pages,
              otherItemTotalNo: response.total,
              otherShowFoot: 0
            })
            // 判断数据不足20条的场景
            if (page - 1 <= response.pages) {
              _this.setState({
                otherShowFoot: 1
              })
            }
          } else {
            _this.setState({
              otherShowFoot: 1
            })
          }
          break
      }
    })
  }
  back = () => {
    router.back()
  }
  _renderFooter = (showFootType) => {
    if (showFootType === 1) {
      return (
        <View style={styles.footer}>
          <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
            没有更多数据了
                </Text>
        </View>
      );
    } else if (showFootType === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载更多数据...</Text>
        </View>
      );
    } else if (showFootType === 0) {
      return (
        <View style={styles.footer}>
          <Text>请继续上拉加载，请求数据</Text>
        </View>
      );
    }
  }
  _renderItem = ({ item, index }) => {
    let { dataSize, allCurrentPage, loginCurrentPage, otherCurrentPage, curTab, allItemTotalNo, loginItemTotalNo, otherItemTotalNo, allShowFoot, loginShowFoot, otherShowFoot } = this.state
    return (
      <View style={styles.bodyWrapperView} key={index}>
        <View style={styles.bodyView}>
          <View style={{ width: '50%', alignItems: 'flex-start', fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#3A3A3A', letterSpacing: 0, justifyContent: 'center' }}>
            <Text>{item.operatorDesc}</Text>
          </View>
          <View style={{ width: '50%', fontFamily: 'PingFangSC-Regular', fontSize: 13, color: '#3A3A3A', alignItems: 'flex-end', justifyContent: 'center' }}>
            <Text>{item.createTime}</Text>
            {
              item.channel ?
                <Text style={{ color: '#999999' }}>{item.channel}</Text>
                :
                <></>
            }
          </View>
        </View>
        {
          curTab == 0 ?
            index == (allCurrentPage - 1) * dataSize - 1 || index == allItemTotalNo - 1 ?
              this._renderFooter(allShowFoot)
              :
              <></>
            :
            <></>
        }
        {
          curTab == 1 ?
            index == (loginCurrentPage - 1) * dataSize - 1 || index == loginItemTotalNo - 1 ?
              this._renderFooter(loginShowFoot)
              :
              <></>
            :
            <></>
        }
        {
          curTab == 2 ?
            index == (otherCurrentPage - 1) * dataSize - 1 || index == otherItemTotalNo - 1 ?
              this._renderFooter(otherShowFoot)
              :
              <></>
            :
            <></>
        }
      </View>
    )
  }
  // _onAllEndReached = (type) => {
  //   // this.getlog(type)
  //   //如果是正在加载中或没有更多数据了，则返回
  //   // if (this.state.showFoot != 0) {
  //   //   return;
  //   // }
  //   // //如果当前页大于或等于总页数，那就是到最后一页了，返回
  //   // if ((pageNo != 1) && (pageNo >= totalPage)) {
  //   //   return;
  //   // } else {
  //   //   pageNo++;
  //   // }
  //   // //底部显示正在加载更多数据
  //   // this.setState({ showFoot: 2 });
  //   // //获取数据
  //   // this.fetchData(pageNo);
  // }
  render() {
    return (
      <>
        <Header
          title={'日志查询'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <ScrollableTabView
            // renderTabBar={() => <DefaultTabBar tabNames={this.state.tabNames}/>}//忽略这一行，为默认的样式
            tabBarPosition='overlayTop'//top、bottom、overlayTop、overlayBottom顶部底部悬浮
            onChangeTab={(obj) => { console.warn('选中了：' + obj.i); this.setState({ curTab: obj.i }) }}//切换后调用此方法
            onScroll={(postion) => { console.log('postion:' + postion) }}//正在滚动调用 0到length-1
            locked={false}//手指是否能拖动视图，默认为false（表示可以拖动）
            initialPage={0}//初始化时被选中的Tab下标，默认是0（即第一页）
            tabBarBackgroundColor="#FFFFFF"//背景色
            tabBarActiveTextColor={$globalStyle.backgroundColor}//选中的tab的文字颜色
            tabBarInactiveTextColor="#333333"//没有选中的tab的文字颜色
            tabBarTextStyle={{ fontSize: 15, paddingTop: 10 }}//tab的字体的style
            scrollWithoutAnimation={false}//设置“点击”Tab时，视图切换是否有动画，默认为false（即：有动画效果）
            tabBarUnderlineStyle={{ backgroundColor: $globalStyle.backgroundColor, height: 3, }}
          >
            {/*{每个被包含的子视图必须使用tabLabel属性，表示对应Tab显示的文字}*/}
            {/*{每个被包含的子视图必须使用tabLabel属性，表示对应Tab显示的文字}*/}
            {/*{每个被包含的子视图必须使用tabLabel属性，表示对应Tab显示的文字}*/}

            <View tabLabel='全部' style={styles.container}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingTop: 60, paddingBottom: 150, minHeight: '100%' }}
                data={this.state.allData}
                renderItem={this._renderItem}
                onEndReached={() => { this.getlog('all') }}
                onEndReachedThreshold={0.001}
              />
            </View>

            <View tabLabel='登录日志' style={styles.container}>

              <FlatList
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingTop: 60, paddingBottom: 150, minHeight: '100%' }}
                data={this.state.loginData}
                renderItem={this._renderItem}
                onEndReached={() => { this.getlog('login') }}
                onEndReachedThreshold={0.001}
              />
            </View>

            <View tabLabel='其他操作日志' style={styles.container}>

              <FlatList
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingTop: 60, paddingBottom: 150, minHeight: '100%' }}
                data={this.state.otherData}
                renderItem={this._renderItem}
                onEndReached={() => { this.getlog('other') }}
                onEndReachedThreshold={0.001}
              />
            </View>
          </ScrollableTabView>

        </View>
      </>
    )
  }

}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
  },
  container: {
    backgroundColor: '#eee',
    // paddingTop: 50,
    flex: 1
  },
  bodyView: {
    flexDirection: 'row',
    height: 44,
  },
  bodyWrapperView: {
    height: 44,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 1,
    paddingLeft: 25,
    paddingRight: 15,
  }
})
