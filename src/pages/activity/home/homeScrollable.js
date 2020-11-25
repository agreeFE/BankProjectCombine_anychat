/**
  author:liuxiaobin
  底部导航主体
 */

import React, { Component } from 'react';
// import ScrollableTabView from '$/components/rnScrollTabView/node_modules/react-native-scrollable-tab-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import EventBus from "$/components/eventBus/eventBus"//中央通信组件
import {
    StyleSheet,
    View,
    StatusBar,
    PixelRatio,
    Dimensions,
    NativeModules,
    TouchableOpacity
} from 'react-native';
import TabBottom from './TabBottom';//自定义导航栏
// import HomeScreen from './homePage';//首页
import HomeScreen from './demoPage';//首页

import MineScreen from './mine'; //我的
import ManageMoney from './financing'; //理财
import ActionSheet from 'react-native-actionsheet-api';
import Confirm from "$/components/confirm"
import AlertComponent from "$/components/Alert"

import Permissions from "react-native-permissions";

import "$/window"

// 状态栏高度获取
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = $platformOS() === 'ios' ? 20 : StatusBarManager.HEIGHT;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height + STATUSBAR_HEIGHT;
import { NavigationEvents } from 'react-navigation';
import scope from '@/scope'
import { getLoginToken, setLoginToken } from '$/util/tokenutil'
const tabTitles = ['云网点', '首页', '金融', '我的'];
//默认图标
const tabIcon = [
    { uri: "$image/home/home.svg" },
    { uri: "$image/home/home.svg" },
    { uri: "$image/home/financial.svg" },
    { uri: "$image/home/mine.svg" }
];
//选中图标
const tabSelectedIcon = [
    { uri: "$image/home/homeChosen.svg" },
    { uri: "$image/home/homeChosen.svg" },
    { uri: "$image/home/financialChosen.svg" },
    { uri: "$image/home/mineChosen.svg" }
];

const CloudDotsNull = class CloudDotsNull extends Component {
    render() {
        return (
            <View></View>
        )
    }
}

module.exports = class TabBottomView extends Component {
    constructor(props) {
        super(props);
        scope(this);
        var omap = {};
        omap[this.props.navigation.state.routeName] = this;
        $.instanceList.push(omap);
        this.state = {
            isLogin: false
        };
        chooseIndex=1
    }

    setBarStyle = (i) => {
        switch(i) {
            case 1: 
                StatusBar.setBarStyle(this.homePage.state.color)
                break;
            case 2: 
                StatusBar.setBarStyle('dark-content')
                break;
            case 3:
                StatusBar.setBarStyle(this.minePage.state.color)
                break;
            default: 
                StatusBar.setBarStyle('light-content')
                break;
        }
    }

    onChangeTabs = ({ i }) => {
        // console.log('onChangeTabs', i)
        this.setBarStyle(i)
        // this.setState({
        //     chooseIndex:i
        // },()=> {
        //     this.setBarStyle(this.state.chooseIndex)
        // })
    };

    goToPage = () => {
        this.setBarStyle(this.state.chooseIndex)
        if (!getLoginToken().data) {
            this.tab.goToPage(1)
            this.setState({
                isLogin: false
            })
            this.setState({
                chooseIndex:1
            })
        } else {
            this.setState({
                isLogin: true
            })
        }
    }

    render() {
        return (

            <View style={{ width: screenWidth, height: '100%' }}>
                <NavigationEvents 
                    onWillFocus={payload => { this.goToPage() }} 
                    onWillBlur={() => {StatusBar.setBarStyle('light-content')}}>
                </NavigationEvents>
                <ActionSheet />
                <Confirm></Confirm>
                <AlertComponent></AlertComponent>
                <View style={{position:"absolute",left:0,bottom:60,width:100,height:35,zIndex:6000}}></View>
                <ScrollableTabView
                    style={{position:"absolute",left:0,top:0,width:'100%',height:'100%',zIndex:60}}
                    initialPage={1}
                    locked={true}
                    renderTabBar={() =>
                        <TabBottom
                            ref={ref => this.tab = ref}
                            {...this.props}
                            tabNames={tabTitles}
                            tabIconNames={tabIcon}
                            selectedTabIconNames={tabSelectedIcon} />
                    }
                    tabBarPosition='bottom'
                    onChangeTab={this.onChangeTabs}
                    // page={this.state.chooseIndex}
                    >

                    <CloudDotsNull></CloudDotsNull>
                    <HomeScreen ref={ref => this.homePage = ref}></HomeScreen>
                    <ManageMoney isLogin={this.state.isLogin}></ManageMoney>
                    <MineScreen ref={ref => this.minePage = ref} goToPage={() => { this.goToPage(1) }}></MineScreen>
                    {/* <MineScreen></MineScreen> */}
                    

                </ScrollableTabView>
                
            </View>
        );
    }
    // 回退方式 在首页的子页面使用EventBus.emit('back',{});这种方式让这个页面进行一级路由回退
    backRouter() {
        //跳转页面并传递参数
        this.props.navigation.goBack();
    }
    // 一级路由跳转方法, 在首页的子页面使用
    // EventBus.emit('action',{
    //     path:"login",
    //     data:{
    //         name:'liuxiaobin'
    //     }
    // });
    //这种方式让这个页面进行一级路由跳转
    action(data) {
        this.props.navigation.navigate(data.path, {
            account: data.data,
        });
    }
    // 监听并设置状态改变刚更新UI
    componentDidMount(): void {

        let _this = this;

        this.goToPageLis = EventBus.addListener("goToPage", data => {
            // console.log('data-----------------')
            // console.log(data)
            _this.tab.goToPage(data)
        });
        // console.log('监听界面:componentWillMount');
        // console.log('进行监听');
        // EventBus.emit('navigatorData',{
        //     data:_this.props.navigation
        // });

    }
    // 监听并设置状态改变刚更新UI
    componentWillMount(): void {
        // console.log('监听界面:componentWillMount');
        // console.log('进行监听');
        let _this = this;
        this.subscribe = EventBus.addListener("back", data => {
            _this.backRouter()
        });
        this.actionSubscribe = EventBus.addListener("action", data => {
            _this.action(data)
        });

        // 检查是否有通知权限
        Permissions.checkNotifications().then(result => {
            if (result.status === "denied") {
                console.log("没有通知权限");

                $Modal.confirm("确认", "是否要前往设置开启通知权限？", [
                    {
                        text: '取消',
                        onPress: () => {},
                        style: 'default',
                    },
                    {
                        text: '确定', onPress: () => {
                            Permissions.openSettings();
                        },
                    }
                ]);
            }
        })
    }
    // 取消监听以防止重复注册
    componentWillUnmount(): void {
        // console.log('监听界面:componentWillUnmount');
        EventBus.remove(this.subscribe);
        EventBus.remove(this.actionSubscribe);
        EventBus.remove(this.goToPageLis);
        StatusBar.setBarStyle('light-content')
    }
}
