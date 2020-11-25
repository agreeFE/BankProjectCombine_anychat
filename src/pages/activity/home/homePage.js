// 首页(底部导航栏的首页)
// author:liuxiaobin
// date:2019/8/27
import React, { Component,  } from 'react';
import {
    StyleSheet, View, Text, PixelRatio, StatusBar, ScrollView,
    Image, ImageBackground, TextInput, TouchableWithoutFeedback, Button, BVLinearGradient,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import LinearGradient from "react-native-linear-gradient"
import Swiper from '$/components/swiper';
import EventBus from "$/components/eventBus/eventBus"
import SVG from "$/components/Svg";
import "$/window"
import router from '$/router-control'
import {
    SEARCH, SEARCHBLACK, KEFU, XIAOXI, KEFUBLACK, XIAOXIBLACK, IMAGEBG,
    ZHZL, ZZ, SZMX, SYS, DK, FJWD, JYCX, LC, JJ, YUYIN_W, YUYIN_B,
    JIEKUANTUPIAN, SERVICEIMG1, SERVICEIMG2, ITEMBG, GOIN
} from '../imageSource'
// import AlertComponent from '../../../components/Alert';
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
const NetworkUtil = require('$/util/networkutil')
const { getLoginToken } = require('$/util/tokenutil')

import PushNotification from 'react-native-push-notification';

module.exports = class homePage extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            startChange: false,
            changeBg: false,
            color: 'light-content',
        };

    }

    // 监听并设置状态改变statusBar的状态
    // componentWillUnmount() {
    //     StatusBar.setBarStyle('light-content')
    // }


    // 监听并设置状态改变statusBar的状态
    componentDidMount() {

        // let _this = this;
        // window.$ActionSheet.showActionSheetWithOptions({
        //         title: '选择登录方式',
        //         options:  ['雪碧', '可口可乐', '脉动', '芬达', '不喜欢喝饮料'],
        //         cancelButtonIndex: 4,
        //         //destructiveButtonIndex: 0,
        //         tintColor: '#1567E5',
        //     },
        //     (buttonIndex) => {
        //         console.log(buttonIndex)
        //     }
        // );
        
    }


    toWebviewFinacing(index) {
        let url,title;
        switch (index) {
            case 1:
                url = `http://${window.financialURL}/licaiProduct/dayDayGood.html?rate=3.38&theme=${window.$globalStyle.themeType}&day=7日年化&name=日日欣理财`,
                title = '日日欣理财'
                break
            case 2:
                url = `http://${window.financialURL}/licaiProduct/dayDayGood.html?rate=3.08&limit=30&theme=${window.$globalStyle.themeType}&day=业绩比较基准&name=聚益生金30天`
                title = '聚益生金30天'
                break
            case 3:
                url = `http://${window.financialURL}/licaiProduct/dayDayGood.html?rate=4.09&limit=91&theme=${window.$globalStyle.themeType}&day=业绩比较基准&name=聚益生金91天`
                title = '聚益生金91天'
                break
        }
        router.load('webview', {
            url,
            title,
            // title: '产品详情'
        })
    }
    toWebviewFund() {
        router.load('webview', {
            url: `http://${window.financialURL}/jijin/jijin.html`
        })
    }
    render() {
        const { startChange, changeBg } = this.state
        return (
            <>
                {/* <NavigationEvents onWillFocus={payload => {StatusBar.setBarStyle(this.state.color)}}></NavigationEvents> */}
                <ScrollView style={styles.content} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} onScroll={this._onScroll}>
                    {/* 搜索框主干 */}
                    <View ref={ref => this.searchBar = ref} style={{ width: '100%', height: 88, elevation: 3, zIndex: 10, opacity: 1, backgroundColor: 'transparent' }}>
                        <View style={[styles.allTopBox, { flex: 1, flexDirection: 'row', backgroundColor: 'transparent' }]}>
                            {/* 搜索框 */}
                            <View style={[styles.topSearchBox, { width: '74%', height: 50, marginTop: 25 }]}>
                                {/* 搜索框 */}
                                <View style={[styles.inputStyle, { borderColor: startChange ? '#9298BE' : '#fff' }]}>
                                    <Image style={styles.topSearchIco} source={startChange ? SEARCHBLACK : SEARCH} />
                                    <Text onPress={() => { this.goJump(3) }}
                                        style={[styles.topSearchInput, { color: startChange ? '#000' : "#fff", opacity: 0.6 }]}
                                    >查询持仓的基金产品</Text>
                                    <SVG style={styles.topSearchIcoRight} source={startChange ? YUYIN_B : YUYIN_W} />
                                </View>
                            </View>
                            {/* 耳机,justifyContent水平居中,alignItems垂直居中 */}
                            {/* <TouchableWithoutFeedback onPress={() => { router.load('comingSoon') }}> */}
                            <TouchableWithoutFeedback onPress={() => {  }}>
                                <View style={{ width: '13%', height: 50, marginTop: 25, flex: 1, flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                    <Image style={styles.earphone} source={startChange ? KEFUBLACK : KEFU} />
                                </View>
                            </TouchableWithoutFeedback>
                            {/* 消息 */}
                            <TouchableWithoutFeedback onPress={() => { router.load('messageCenter') }}>
                                <View style={{ width: '15%', height: 50, marginTop: 25, justifyContent: "space-around", alignItems: 'center' }}>
                                    <Image style={styles.earphone} source={startChange ? XIAOXIBLACK : XIAOXI} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={{ marginTop: -88 }}>
                        {/* 搜索框下方,到立刻参与按钮 */}
                        <ImageBackground source={IMAGEBG} style={{ width: '100%', height: 298, paddingTop: 88, zIndex: -1, alignItems: 'center' }}>
                            {/* 快捷入口 */}
                            <View style={[styles.allTopBoxBottom, { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 5 }]}>
                                {/* 账户总览 */}
                                <TouchableWithoutFeedback onPress={() => { this.goJump(4) }} >
                                    <View style={{ width: '25%', padding: 0, height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }} >
                                        <Image style={styles.allTopBoxBottomIcoFir} source={ZHZL} />
                                        <Text style={styles.allTopBoxBottomName}>账户总览</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {/* 转账 */}
                                <TouchableWithoutFeedback onPress={() => { this.goJump(1) }}>
                                    <View style={{ width: '25%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                        <Image style={styles.allTopBoxBottomIcoFir} source={ZZ} />
                                        <Text style={styles.allTopBoxBottomName}>转账</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {/* 收支明细 */}
                                <TouchableWithoutFeedback onPress={() => { this.goJump(5) }}>
                                    <View style={{ width: '25%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                        <Image style={styles.allTopBoxBottomIcoFir} source={SZMX} />
                                        <Text style={styles.allTopBoxBottomName}>收支明细</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {/* 扫一扫 */}
                                <TouchableWithoutFeedback onPress={() => { this.goJump(7) }}>
                                    <View style={{ width: '25%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                        <Image style={styles.allTopBoxBottomIcoFir} source={SYS} />
                                        <Text style={styles.allTopBoxBottomName}>扫一扫</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            {/* 支付选赞同,广告 */}
                            <TouchableWithoutFeedback onPress={() => { this.goJump(6) }}>
                                <View style={{ flexDirection: 'row', height: 85, paddingTop: 12, paddingLeft: 25 }}>
                                    <View style={{ width: '60%', alignItems: "flex-start", justifyContent: 'center' }} >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.allTopBoxBottomAd}>手机银行</Text>
                                            <Image style={{ width: 100, height: 24 }} source={require('$image/home/adText.png')}></Image>
                                        </View>

                                        <Text style={styles.allTopBoxBottomAdSmall}>新模式· 新业态· 新未来</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }} >
                                        {/* <Image style={styles.allTopBoxBottomAdIco} source={window.$globalThemeType === 'blue' ? require('$image/home/zt.png') : 0} /> */}
                                        <SVG style={styles.allTopBoxBottomAdIco} source={$globalThemeType === 'blue' ? require('$image/home/zt.svg') : 0}></SVG>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* 立即参与 */}
                            <TouchableWithoutFeedback onPress={() => { this.goJump(6) }}>
                                {/* <LinearGradient style={{ borderRadius: 16, width: 108, height: 32, alignItems: 'center', justifyContent: 'center', marginTop: 15 }} colors={window.$globalStyle.linerBackground}>
                                    <Text style={styles.partakeBtn}>立即参与</Text>
                                </LinearGradient> */}
                                <View>
                                    <Image style={{ width: 128, height: 36, marginTop: 12 }} source={GOIN}></Image>
                                </View>
                            </TouchableWithoutFeedback>
                        </ImageBackground>

                        {/* 立即参与下面的快捷入口 */}
                        <View style={styles.allTopBoxBottomBox}>
                            {/* 快捷入口 */}
                            <View style={[styles.allTopBoxBottom, { height: 60, flex: 1, flexDirection: 'row', paddingTop: 10 }]}>
                                <TouchableWithoutFeedback onPress={() => { this.itemClick(0) }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <SVG style={styles.allTopBoxBottomIco} source={DK} />
                                        <Text style={styles.allTopBoxBottomNameSe}>赞E贷</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.itemClick(1) }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <SVG style={styles.allTopBoxBottomIco} source={FJWD} />
                                        <Text style={styles.allTopBoxBottomNameSe}>附近网点</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => { this.itemClick(3) }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <SVG style={styles.allTopBoxBottomIco} source={LC} />
                                        <Text style={styles.allTopBoxBottomNameSe}>理财产品</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.itemClick(2) }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <SVG style={[styles.allTopBoxBottomIco, { marginLeft: -5, }]} source={JYCX} />
                                        <Text style={styles.allTopBoxBottomNameSe}>交易查询</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.itemClick(4) }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <SVG style={styles.allTopBoxBottomIco} source={JJ} />
                                        <Text style={styles.allTopBoxBottomNameSe}>信用卡激活</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                        {/* swiper头条轮播 */}
                        <TouchableWithoutFeedback onPress={() => { this.goJump(8) }}>
                            {/* 快捷入口 */}
                            <View style={[styles.leadNewsBox, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                                <View style={[{ width: '20%', height: 26, backgroundColor: "#fff" }]}>
                                    <Text style={[styles.leadNewsBoxNameBox, { textAlign: "center" }]}>头条</Text>
                                </View>
                                <View style={{ width: '80%', justifyContent: "center", overflow: 'hidden' }}>
                                    {/* <Text>zIndex测试</Text> */}
                                    <Swiper
                                        //样式
                                        style={{ width: '100%', }}
                                        // style={styles.wrapper}
                                        //高度
                                        height={40}
                                        // 是否显示控制按钮（即左右两侧的箭头是否可见）
                                        showsButtons={false}
                                        //这个很主要，解决白屏问题
                                        removeClippedSubviews={false}
                                        // 切换时间，单位秒
                                        autoplayTimeout={3}
                                        // 是否自动轮播
                                        autoplay={true}
                                        // 如果为true，滚动方向是横向的，如果为false，滚动方向是竖向的
                                        horizontal={false}
                                        // 分页风格
                                        // paginationStyle={styles.paginationStyle}
                                        // 点样式
                                        dotStyle={styles.activeDotStyle}
                                        // 活动点样式
                                        activeDotStyle={styles.activeDotStyle}
                                    >
                                        <View style={{ flex: 1, justifyContent: "center", paddingLeft: 2 }}>
                                            <Text style={[styles.leadNewsBoxContentBox, { fontSize: 14 }]}>80后和90后: 到底谁的负债更多,压力更大?</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", paddingLeft: 2 }}>
                                            <Text style={[styles.leadNewsBoxContentBox, { fontSize: 14 }]}>外交部回应美加征关税措施.</Text>
                                        </View>
                                    </Swiper>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        {/* 轮播下方,借款图片 */}
                        <View style={{ width: "100%" }}>
                            {/* 快捷入口 adver */}
                            <TouchableWithoutFeedback onPress={() => { router.load('adver') }}>
                                <View style={[styles.borrowMoneyBox, { paddingTop: 1 }]}>
                                    <Image resizeMode="contain" style={styles.borrowMoneyBoxImg} source={JIEKUANTUPIAN} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        {/* 热门活动 */}
                        <View style={[styles.activitysBox, { marginTop: 5 }]}>
                            {/* 标题 */}
                            <View style={[styles.activitysTitleBox, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18 }]}>
                                {/* <Text style={styles.activitysTitleNameIco}>|</Text> */}
                                <View style={{ width: 2, height: 14, backgroundColor: $globalStyle.homePage.blockColor }}></View>
                                <Text style={styles.activitysTitleName}>热门活动</Text>
                            </View>
                            <View style={styles.activitysContentBox}>
                                {/* 热门活动快捷入口 */}
                                <TouchableWithoutFeedback onPress={() => { this.goJump(8) }}>
                                    <View style={[styles.allTopBoxBottom, { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }]}>
                                        <View style={{ width: '47%', padding: 0, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <View style={[styles.activitysContentName, { width: '55%', marginLeft: 2, alignItems: 'flex-start' }]}>
                                                <Text style={styles.activitysContentNameString}>推荐办卡</Text>
                                                <Text style={styles.activitysContentNameCt}>送1000积分</Text>
                                            </View>
                                            <View style={[styles.activitysContentImg, , { width: '50%' }]}>
                                                <Image resizeMode="contain" style={styles.activitysContentCtImg} source={require('$image/home/tjbk.png')} />
                                            </View>
                                        </View>
                                        <View style={{ width: '47%', padding: 0, height: 50, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={[styles.activitysContentName, { width: '55%', marginLeft: 2, alignItems: 'flex-start' }]}>
                                                <Text style={styles.activitysContentNameString}>品牌家具</Text>
                                                <Text style={styles.activitysContentNameCt}>最低3折起</Text>
                                            </View>
                                            <View style={[styles.activitysContentImg, , { width: '50%' }]}>
                                                <Image resizeMode="contain" style={styles.activitysContentCtImg} source={require('$image/home/ppjj.png')} />
                                            </View>
                                        </View>
                                        <View style={{ width: '47%', padding: 0, height: 50, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={[styles.activitysContentName, { width: '55%', marginLeft: 2, alignItems: 'flex-start' }]}>
                                                <Text style={styles.activitysContentNameString}>电影票</Text>
                                                <Text style={styles.activitysContentNameCt}>尽享视觉盛宴</Text>
                                            </View>
                                            <View style={[styles.activitysContentImg, , { width: '50%' }]}>
                                                <Image resizeMode="contain" style={styles.activitysContentCtImg} source={require('$image/home/dyp.png')} />
                                            </View>
                                        </View>
                                        <View style={{ width: '47%', padding: 0, height: 50, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={[styles.activitysContentName, { width: '55%', marginLeft: 2, alignItems: 'flex-start' }]}>
                                                <Text style={styles.activitysContentNameString}>品质度假</Text>
                                                <Text style={styles.activitysContentNameCt}>云南七日游</Text>
                                            </View>
                                            <View style={[styles.activitysContentImg, , { width: '50%' }]}>
                                                <Image resizeMode="contain" style={styles.activitysContentCtImg} source={require('$image/home/pzdj.png')} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                        </View>

                        {/* 为您推荐 */}
                        <View style={[styles.activitysBox, { marginTop: 5 }]}>
                            {/* 标题 */}
                            <View style={[styles.activitysTitleBox, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18 }]}>
                                {/* <Text style={styles.activitysTitleNameIco}>|</Text> */}
                                <View style={{ width: 2, height: 14, backgroundColor: $globalStyle.homePage.blockColor }}></View>
                                <Text style={styles.activitysTitleName}>为您推荐</Text>
                            </View>
                            {/* 为您推荐快捷入口 */}
                            <View style={[{ flex: 1, flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-around', }]}>
                                {/* <BoxShadow setting={shadowOpt}>  ITEMBG*/}
                                <ImageBackground style={{ width: 120, height: 136 }} resizeMode={'contain'} source={ITEMBG}>
                                    <TouchableWithoutFeedback onPress={() => { this.toWebviewFinacing(1) }}>
                                        <View style={styles.recommendContentItem}>
                                            <Text style={styles.recommendContentItemTitle}>随时申赎</Text>
                                            <Text style={styles.recommendContentItemTitleIc}>日日欣理财</Text>
                                            <Text style={styles.recommendContentItemPers}>
                                                <Text style={styles.recommendContentItemPersNumber}>3.38</Text>
                                                <Text style={styles.recommendContentItemPersP}>%</Text>
                                            </Text>
                                            <Text style={styles.recommendContentItemPersDisc}>7日年化</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ImageBackground>
                                {/* </BoxShadow>
                                <BoxShadow setting={shadowOpt}> */}
                                <ImageBackground style={{ width: 120, height: 136 }} source={ITEMBG}>
                                    <TouchableWithoutFeedback onPress={() => { this.toWebviewFinacing(2) }}>
                                        <View style={styles.recommendContentItem}>
                                            <Text style={styles.recommendContentItemTitle}>月度理财</Text>
                                            <Text style={styles.recommendContentItemTitleIc}>聚益生金30天</Text>
                                            <Text style={styles.recommendContentItemPers}>
                                                <Text style={styles.recommendContentItemPersNumber}>3.08</Text>
                                                <Text style={styles.recommendContentItemPersP}>%</Text>
                                            </Text>
                                            <Text style={styles.recommendContentItemPersDisc}>业绩比较基准</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ImageBackground>
                                {/* </BoxShadow> */}
                                {/* <BoxShadow setting={shadowO pt}> */}
                                <ImageBackground style={{ width: 120, height: 136 }} source={ITEMBG}>
                                    <TouchableWithoutFeedback onPress={() => { this.toWebviewFinacing(3) }}>
                                        <View style={styles.recommendContentItem}>
                                            <Text style={styles.recommendContentItemTitle}>季度理财</Text>
                                            <Text style={styles.recommendContentItemTitleIc}>聚益生金91天</Text>
                                            <Text style={styles.recommendContentItemPers}>
                                                <Text style={styles.recommendContentItemPersNumber}>4.09</Text>
                                                <Text style={styles.recommendContentItemPersP}>%</Text>
                                            </Text>
                                            <Text style={styles.recommendContentItemPersDisc}>业绩比较基准</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ImageBackground>

                                {/* </BoxShadow> */}
                            </View>

                        </View>

                        {/* 特色服务 */}
                        <View style={[styles.special]}>
                            {/* 标题 */}
                            <View style={[styles.activitysTitleBox, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18 }]}>
                                {/* <Text style={styles.activitysTitleNameIco}>|</Text> */}
                                <View style={{ width: 2, height: 14, backgroundColor: $globalStyle.homePage.blockColor }}></View>
                                <Text style={styles.activitysTitleName}>特色服务</Text>
                            </View>
                            {/* 内容 */}
                            <View style={styles.specialContent}>
                                <Image source={require('$image/home/tsb_2.png')} style={{ width: 0, height: 0 }}></Image>
                                <ImageBackground source={changeBg ? require('$image/home/tsb_2.png') : require('$image/home/tsb_1.png')} style={{ width: '100%', height: 180 }}>
                                    {/* 横向滚动内容区域 */}
                                    <View style={styles.specialContentScroll}>
                                        <ScrollView
                                            style={{ width: '100%', height: 188, flexDirection: "row" }}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            onScroll={this.scrollEnd}
                                        >
                                            {/* 里面内容直接横向排开即可滚动 */}
                                            {/* 一组卡片 */}
                                            <TouchableWithoutFeedback onPress={() => { this.goJump(8) }}>
                                                <View style={styles.specialContentItem}>
                                                    <View style={styles.specialContentItemImgBox}>
                                                        <Image resizeMode="contain" style={styles.specialContentItemImgItem} source={require('$image/home/ts_1.png')} />
                                                    </View>
                                                    <View style={styles.specialIcoBox}>
                                                        <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                            <Image style={{ width: 20, height: 22 }} resizeMode="contain" source={require('$image/home/ts_kk.png')} />
                                                            <Text style={{ fontSize: 12, color: "#949494" }}>开卡</Text>
                                                        </View>
                                                        <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                            <Image style={{ width: 20, height: 22 }} resizeMode="contain" source={require('$image/home/ts_hkcj.png')} />
                                                            <Text style={{ fontSize: 12, color: "#949494" }}>还款抽奖</Text>
                                                        </View>
                                                        <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                            <Image style={{ width: 20, height: 22 }} resizeMode="contain" source={require('$image/home/ts_tjyl.png')} />
                                                            <Text style={{ fontSize: 12, color: "#949494" }}>推荐有礼</Text>
                                                        </View>
                                                        <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                            <Image style={{ width: 20, height: 22 }} resizeMode="contain" source={require('$image/home/ts_zq.png')} />
                                                            <Text style={{ fontSize: 12, color: "#949494" }}>专区</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            {/* 第二组卡片 */}
                                            <TouchableWithoutFeedback onPress={() => { this.goJump(8) }}>
                                                <View style={styles.specialContentItem}>
                                                    <View style={styles.specialContentItemImgBox}>
                                                        <Image resizeMode="contain" style={styles.specialContentItemImgItem} source={require('$image/home/ts_2.png')} />
                                                    </View>
                                                    <View style={styles.specialIcoBox}>
                                                        <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                            <Image style={{ width: 20, height: 22 }} resizeMode="contain" source={require('$image/home/ts_kk.png')} />
                                                            <Text style={{ fontSize: 12, color: "#949494" }}>门票</Text>
                                                        </View>
                                                        <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                            <Image style={{ width: 20, height: 22 }} resizeMode="contain" source={require('$image/home/ts_hkcj.png')} />
                                                            <Text style={{ fontSize: 12, color: "#949494" }}>还款抽奖</Text>
                                                        </View>
                                                        <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                            <Image style={{ width: 20, height: 22 }} resizeMode="contain" source={require('$image/home/ts_tjyl.png')} />
                                                            <Text style={{ fontSize: 12, color: "#949494" }}>推荐有礼</Text>
                                                        </View>
                                                        <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                            <Image style={{ width: 20, height: 22 }} resizeMode="contain" source={require('$image/home/ts_zq.png')} />
                                                            <Text style={{ fontSize: 12, color: "#949494" }}>专区</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>


                                        </ScrollView>
                                    </View>
                                </ImageBackground>
                            </View>

                        </View>

                        {/* 精选榜单 */}
                        <View style={{ marginTop: 5 }}>
                            {/* 标题 */}
                            <View style={[styles.activitysTitleBox, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18 }]}>
                                {/* <Text style={styles.activitysTitleNameIco}>|</Text> */}
                                <View style={{ width: 2, height: 14, backgroundColor: $globalStyle.homePage.blockColor }}></View>
                                <Text style={styles.activitysTitleName}>精选榜单</Text>
                            </View>
                            {/* 内容 */}
                            <View style={styles.carefullyChosenContent}>
                                <TouchableWithoutFeedback onPress={this.toWebviewFund}>
                                    <View style={[styles.carefullyChosenContentItem]}>
                                        <View style={styles.carefullyChosenContentItemImgBox}>
                                            <Image resizeMode="contain" style={styles.carefullyChosenContentItemImg} source={require('$image/home/rank_1.png')} />
                                        </View>
                                        <View style={[styles.carefullyChosenContentItemCtox,]}>
                                            <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 14, marginBottom: 2 }}>买基金也要精挑细选</Text>
                                            <Text style={{ color: "#505050", fontSize: 14, marginBottom: 4 }}>收益每天多一点儿</Text>
                                            <Text style={{ color: "#ED905E", fontSize: 12 }}>低风险,无费率</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.toWebviewFund}>
                                    <View style={styles.carefullyChosenContentItem}>
                                        <View style={styles.carefullyChosenContentItemImgBox}>
                                            <Image resizeMode="contain" style={styles.carefullyChosenContentItemImg} source={require('$image/home/rank_2.png')} />
                                        </View>
                                        <View style={styles.carefullyChosenContentItemCtox}>
                                            <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 14, marginBottom: 2 }}>小小的定投,大大的梦想</Text>
                                            <Text style={{ color: "#505050", fontSize: 14, marginBottom: 4 }}>精选最适合你的定投基金,收益日增</Text>
                                            <Text style={{ color: "#8A98F4", fontSize: 12 }}>为牛市播种,为幸福投资</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.toWebviewFund}>
                                    <View style={styles.carefullyChosenContentItem}>
                                        <View style={styles.carefullyChosenContentItemImgBox}>
                                            <Image resizeMode="contain" style={styles.carefullyChosenContentItemImg} source={require('$image/home/rank_3.png')} />
                                        </View>
                                        <View style={styles.carefullyChosenContentItemCtox}>
                                            <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 14, marginBottom: 2 }}>业绩领跑基金榜</Text>
                                            <Text style={{ color: "#505050", fontSize: 14, marginBottom: 4 }}>无惧市场动荡,它们始终靠前</Text>
                                            <Text style={{ color: "#61BCED", fontSize: 12 }}>1年内收益排名前1%</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        {/* 底部图片区域 */}
                        <View style={styles.bottomImgBox}>
                            <Image resizeMode="contain" style={styles.bottomImg} source={require('$image/agree_LOGO.png')} />
                        </View>
                        {/* </View> */}

                    </View>
                </ScrollView>
            </>
        );
    }

    //页面跳转
    goJump(index) {
        switch (index) {
            case 1:
                //转账
                router.load('transferAccounts');
                break;
            case 2:

                break;
            case 3:
                //搜索
                router.load('search');
                break;
            case 4:
                //账户总览
                // router.load('webview', {
                //     url: `http:192.168.137.1:8088`
                // })
                router.load('account');
                break;
            case 5:
                //收支明细
                router.load('balance');
                break;
            case 6:
                //活动页
                router.load('instantInvolvementPage');
                break;
            case 7:
                router.load('scan');
                break;
            case 8:
                //敬请期待
                // router.load('comingSoon');
                break;
        }
    };
    // item 点击跳转
    itemClick = (index) => {
        switch (index) {
            case 0:
                // if (verifyLoginTokenUsage(getLoginToken().data) === 0 || verifyLoginTokenUsage(getLoginToken().data) === 3) {
                if (!getLoginToken().data) {
                    router.load('login', {
                        afterGoBack: () => {
                            NetworkUtil.networkService('/account/loans/loanQuotaQuery', {}, response => {
                                router.load('confirmInfo')
                            },
                                err => {
                                    router.load('quotaApplyHome')
                                })
                        }
                    })
                } else {
                    NetworkUtil.networkService('/account/loans/loanQuotaQuery', {}, response => {
                        router.load('confirmInfo')
                    },
                        err => {
                            router.load('quotaApplyHome')
                        })
                }

                break;
            case 1:
                router.load('networkReservation')
                break;
            case 2:
                router.load('searchTransactions')
                break;
            case 3:
                router.load('webview', {
                    url: `http://${window.financialURL}/licaiProduct/financialProduct.html`
                });
                break;
            case 4:
                router.load('creditAardActivation')
                break;
        }
    }
    _onScroll = (event) => {
        let { y } = event.nativeEvent.contentOffset
        let opacityPercent = y / 60
        this.searchBar.setNativeProps({
            style: { opacity: (y < 60 && y > 5) ? opacityPercent : 1, backgroundColor: y > 60 / 2 ? '#fff' : 'transparent' }
        })

        this.setState({
            startChange: y > 60 / 2,
            color: y > 60 / 2 ? 'dark-content' : 'light-content'
        })
        // EventBus.emit('changeColor', y > 60 / 2); //statusBar变色, true == 黑色，
        StatusBar.setBarStyle(y > 60 / 2 ? 'dark-content' : 'light-content');
    }

    scrollEnd = (event) => {
        let { x } = event.nativeEvent.contentOffset
        this.setState({
            changeBg: x > 100
        })
    }

    showNotification() {
        console.log("弹出通知");

        const id = Math.random().toString().substr(2, 5);

        const notificationConfig = {
            /* Android Only Properties */
            id: id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            ticker: "My Notification Ticker", // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
            subText: "二维码", // (optional) default: none
            color: "white", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: "group", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            priority: "high", // (optional) set notification priority, default: high
            visibility: "public", // (optional) set notification visibility, default: private
            importance: "high", // (optional) set notification importance, default: high
            title: "标题", // (optional)
            message: "收到一个消息", // (required)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            // repeatType: 'time', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
            // repeatTime: 30,
            // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
            param: JSON.stringify({router: "scan"})
        };

        PushNotification.localNotification(notificationConfig);
    }
}
const styles = StyleSheet.create({
    specialIcoBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    specialContentItemImgItem: {
        width: "100%",
        marginTop: -84
    },
    specialContentItemImgBox: {
        width: 246,
        height: 86,
        marginLeft: 7
    },
    specialContentItem: {
        marginRight: 10,
        width: 260,
        height: 140,
        marginTop: 20,
        borderRadius: 4,
        backgroundColor: '#FFFFFF'
    },
    specialContentScroll: {
        width: "100%",
        height: 180,
        paddingLeft: 15,
        paddingRight: 5
    },
    specialContent: {
        width: "100%",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5
    },
    special: {
        marginTop: 8
    },
    carefullyChosenContentItemImg: {
        height: 40,
        width: 40,
        marginLeft: "10%",
        marginTop: -10,
    },
    carefullyChosenContentItemCtox: {
        width: "69%",
    },
    carefullyChosenContentItemCtoxAll: {
        width: "13%",
        alignItems: "center",
    },
    carefullyChosenContentItemImgBox: {
        width: "19%",
    },
    carefullyChosenContentItem: {
        // width: "88%",
        // marginLeft: "6%",
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    carefullyChosenContent: {
        flexDirection: "column"
    },
    activeDotStyle: {
        display: "none"
    },
    bottomImg: {
        width: '60%',
        marginLeft: "20%",
        height: 44,
        // marginTop: 38
    },
    bottomImgBox: {
        width: '100%',
        margin: 10
    },
    recommendContentItemPersDisc: {
        // color: "#DA8C2A",
        color: '#E78E1E',
        fontSize: 14
    },
    recommendContentItemPersP: {
        fontSize: 12
    },
    recommendContentItemPersNumber: {
        fontSize: 20
    },
    recommendContentItemPers: {
        color: '#E78E1E',
    },
    recommendContentItemTitleIc: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 13,
        lineHeight: 18,
        color: '#666666',
        marginTop: 3,
        marginBottom: 6
    },
    recommendContentItemTitle: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 15,
        color: '#333333',
        lineHeight: 21
    },
    recommendContentItem: {
        // width: 108,
        // height: 127,
        flex: 1,
        paddingTop: 15,
        borderRadius: 4,
        paddingLeft: 14,
        // backgroundColor: '#fff'
    },
    recommendContent: {
        paddingLeft: "6%"
    },
    activitysContentCtImg: {
        width: '80%',
    },
    activitysContentNameCt: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: "#666"
    },
    activitysContentNameString: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 15,
        color: '#333333',
        lineHeight: 21
        // fontWeight:"700"
    },
    activitysTitleName: {
        marginLeft: 8,
        fontSize: 17,
        color: '#333333',
        fontWeight: "bold",
    },
    activitysTitleNameIco: {
        // marginTop: -2,
        fontSize: 26,
        height: 26,
        overflow: 'hidden',
        fontWeight: "bold",
        color: "#1F4C61",
        marginRight: 6
    },
    activitysContentBox: {
        width: '100%',
        paddingHorizontal: 27,
        // backgroundColor: 'red'
        // height:30,
        // backgroundColor:"red"
    },
    activitysTitleBox: {
        width: '100%',
        height: 40,
        lineHeight: 40,
        // backgroundColor:"blue"
    },
    activitysBox: {
        width: '100%',
        // height:90,
        // backgroundColor:"#000"
    },
    borrowMoneyBox: {
        width: '92%',
        height: 90,
        marginLeft: "4%"
        // paddingLeft:5,
        // paddingRight:5,
        // marginTop:10,
        // marginLeft:"5%",
        // backgroundColor:"#000"
    },
    borrowMoneyBoxImg: {
        width: '100%',
        height: 90
        // marginLeft:"1.5%",
    },
    leadNewsBoxNameBox: {
        height: 22,
        borderColor: $globalStyle.homePage.adColor,
        borderWidth: 1,
        marginTop: 2,
        lineHeight: 22,
        width: '60%',
        marginLeft: '23%',
        fontSize: 13,
        color: $globalStyle.homePage.adColor,
        fontWeight: "bold",
        borderRadius: 5
    },
    leadNewsBoxContentBox: {
        height: 26,
        marginTop: -1,
        lineHeight: 26,
        textAlign: "left",
        width: '100%',
    },
    leadNewsBox: {
        height: 45,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F4F4F4',
        borderBottomWidth: 1,
        borderBottomColor: '#F4F4F4'
    },
    partakeBtn: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'PingFangSC-Medium',
        lineHeight: 18,
        textAlign: "center",
    },
    allTopBoxBottomBox: {
        marginTop: 5
    },
    allTopBoxBottomAdIco: {
        width: 120,
        height: 73,
    },
    allTopBoxBottomAd: {
        // color: '#E6830D',
        fontSize: 18,
        lineHeight: 24,
        opacity: 0.89,
        fontFamily: 'PingFangSC-Medium',
        // fontWeight: 'bold',
        marginRight: 5,
        color: '#fff'
    },
    // allTopBoxBottomAd2: {
    //     fontFamily: 'FZJZJW--GB1-0',
    //     fontSize: 22,
    //     lineHeight: 26,
    //     color: $globalStyle.homePage.adColor,
    // },
    allTopBoxBottomAdSmall: {
        marginTop: 5,
        opacity: 0.85,
        fontFamily: 'PingFangSC-Medium',
        fontSize: 15,
        color: '#DDDDDD',
        lineHeight: 20
    },
    allTopBoxBottomIco: {
        width: 26,
        height: 26,
        marginBottom: 6
    },
    allTopBoxBottomIcoFir: {
        width: 30,
        height: 30,
        marginBottom: 5
    },
    allTopBoxBottomName: {
        color: "#fff"
    },
    allTopBoxBottomNameSe: {
        color: "#666",
        fontSize: 12,
        fontFamily: 'PingFangSC-Medium',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 16
    },
    allTopBoxBottom: {
        width: '100%',
        // backgroundColor:'#000'
    },
    topSearchInput: {
        flex: 1,
        lineHeight: 18,
        padding: 0,
        paddingLeft: 8,
        fontSize: 13,
        color: "#fff",
        opacity: 0.64,
        fontFamily: 'PingFangSC-Regular',
    },
    topSearchIco: {
        marginLeft: 8,
        width: 14,
        height: 14,
        // backgroundColor:'red'
    },
    topSearchIcoRight: {
        width: 16,
        height: 16,
        marginRight: 16
    },
    earphone: {
        width: 20,
        height: 20,
    },
    allTopBox: {
        paddingRight: 5,
        paddingTop: 13,
        position: 'absolute'
    },
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: "#FCFCFC"
    },
    normalTabImage: {
        width: '100%',
        height: 300,
    },
    // 顶部查询
    topSearchBox: {
        // backgroundColor: 'powderblue',
        paddingTop: 8,
        paddingLeft: 15,
        paddingRight: 15
    },
    inputStyle: {
        position: "relative",
        borderRadius: 26,
        height: 32,
        lineHeight: 32,
        borderStyle: "solid",
        borderWidth: 1,
        // borderColor: "#9298BE",
        flexDirection: 'row',
        alignItems: "center"

    }
});
