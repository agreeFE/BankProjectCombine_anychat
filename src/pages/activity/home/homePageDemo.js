// 首页(底部导航栏的首页)
// author:liuxiaobin
// date:2019/8/27
import React, { Component,  } from 'react';
import { FlatList, StyleSheet, View, Text, PixelRatio, StatusBar, Dimensions, Keyboard, ScrollView, Image, ImageBackground, TextInput, TouchableWithoutFeedback, Button, BVLinearGradient } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import Swiper from 'react-native-swiper';
import EventBus from "$/components/eventBus/eventBus"
import router from '$/router-control'
import { SEARCH, YUYIN, KEFU, YUYINBLACK, XIAOXI, KEFUBLACK, XIAOXIBLACK } from '../imageSource/index'

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
var amVAR = {};

module.exports = class homePage extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            color: 'light-content',
            yuyin: YUYIN,
            kefu: KEFU,
            xiaoxi: XIAOXI
        };
    }
    observer() {
        let oMap = {}
        for (let pop in amVAR) {
            oMap[pop] = amVAR[pop]
        }
        this.setState(oMap, () => {

        })
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
                router.load('account');
                break;
            case 5:
                //收支明细
                router.load('balance');
                break;
            case 6:
                //收支明细
                router.load('instantInvolvementPage');
                break;
            case 7:
                router.load('scan');
        }
    };
    // item 点击跳转
    itemClick = (index) => {
        switch(index) {
            case 0:
                router.load('quotaApply')
                break;
            case 1:
                router.load('networkReservation')
                break;
            case 2:
                router.load('searchTransactions')
                break;
            case 3:
                // router.load('quotaApply')
                break;
            case 4:
                // router.load('quotaApply')
                break;
        }
    }
    _onScroll = (event) => {
        let y = event.nativeEvent.contentOffset.y
        let opacityPercent = y / 64
        if (y < 64) {
            this.searchBar.setNativeProps({
                style: { opacity: opacityPercent }
            })
        } else {
            this.searchBar.setNativeProps({
                style: { opacity: 1 }
            })
        }
        if (y < 20) {
            EventBus.emit('changeColor', false); //statusBar变为白色字体
        } else {
            EventBus.emit('changeColor', true); //statusBar变为黑色字体
        }
        if (y < 37) {
            this.setState({
                yuyin: YUYIN,
                kefu: KEFU,
                xiaoxi: XIAOXI
            })
        } else {
            this.setState({
                yuyin: YUYINBLACK,
                kefu: KEFUBLACK,
                xiaoxi: XIAOXIBLACK
            })
        }
    }
    componentWillUnmount() {
        EventBus.emit('changeColor', false);
    }
    // 监听并设置状态改变statusBar的状态
    componentWillMount(): void {
        // console.log('监听界面:componentWillMount');
        // console.log('进行监听');
        let _this = this;
        this.subscribe = EventBus.addListener("changeColor", data => {
            _this.changeColor(data)
        });
    }

    changeColor(data) {
        this.setState({
            color: data ? 'dark-content' : 'light-content'
        })
    }
    render() {
        return (
            <>
                <StatusBar
                    barStyle={this.state.color}
                />
                <ScrollView style={styles.content} stickyHeaderIndices={[0]} onScroll={this._onScroll}>
                    {/* <View style={styles.content}> */}
                    {/* 搜索框主干 */}
                    <ImageBackground source={require('$image/home/back_bg_head.png')} style={{ width: '100%', height: 88, elevation: 3, }}>
                        <View ref={ref => this.searchBar = ref} style={[styles.allTopBox, { flex: 1, flexDirection: 'row', opacity: 0, backgroundColor: '#fff' }]}>
                            {/* 搜索框 */}
                            <View style={[styles.topSearchBox, { width: '74%', height: 50, marginTop: 25 }]}>
                                {/* 搜索框 */}
                                <View style={styles.inputStyle}>
                                    <Image style={styles.topSearchIco} source={SEARCH} />

                                    <Text onPress={() => { this.goJump(3) }}
                                        style={styles.topSearchInput}
                                        placeholderTextColor={'#A3A8C5'}
                                    >查询持仓的基金产品</Text>

                                    <Image style={styles.topSearchIcoRight} source={this.state.yuyin} />
                                </View>
                            </View>
                            {/* 耳机,justifyContent水平居中,alignItems垂直居中 */}
                            <View style={{ width: '13%', height: 50, marginTop: 25, flex: 1, flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                <Image style={styles.earphone} source={this.state.kefu} />
                            </View>
                            {/* 消息 */}
                            <View style={{ width: '15%', height: 50, marginTop: 25, justifyContent: "space-around", alignItems: 'center' }}>
                                <Image style={styles.earphone} source={this.state.xiaoxi} />
                            </View>
                        </View>
                        <View style={[styles.allTopBox, { flex: 1, flexDirection: 'row', backgroundColor: 'transparent' }]}>
                            {/* 搜索框 */}
                            <View style={[styles.topSearchBox, { width: '74%', height: 50, marginTop: 25 }]}>
                                {/* 搜索框 */}
                                <View style={styles.inputStyle}>
                                    <Image style={styles.topSearchIco} source={SEARCH} />
                                    <Text onPress={() => { this.goJump(3) }}
                                        style={styles.topSearchInput}
                                        placeholderTextColor={'#A3A8C5'}
                                    >查询持仓的基金产品</Text>
                                    <Image style={styles.topSearchIcoRight} source={this.state.yuyin} />
                                </View>
                            </View>
                            {/* 耳机,justifyContent水平居中,alignItems垂直居中 */}
                            <View style={{ width: '13%', height: 50, marginTop: 25, flex: 1, flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                <Image style={styles.earphone} source={this.state.kefu} />
                            </View>
                            {/* 消息 */}
                            <View style={{ width: '15%', height: 50, marginTop: 25, justifyContent: "space-around", alignItems: 'center' }}>
                                <Image style={styles.earphone} source={this.state.xiaoxi} />
                            </View>
                        </View>
                    </ImageBackground>
                    {/* 搜索框下方,到立刻参与按钮 */}
                    <ImageBackground source={require('$image/home/back_bg_foot.png')} style={{ width: '100%', height: 210 }}>
                        {/* 快捷入口 */}
                        <View style={[styles.allTopBoxBottom, { height: 60, flex: 1, flexDirection: 'row', paddingTop: 10 }]}>
                            {/* 账户总览 */}
                            <TouchableWithoutFeedback onPress={() => { this.goJump(4) }} >
                                <View style={{ width: '25%', padding: 0, height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }} >
                                    <Image style={styles.allTopBoxBottomIcoFir} source={require('$image/home/zhzl.png')} />
                                    <Text style={styles.allTopBoxBottomName}>账户总览</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* 转账 */}
                            <TouchableWithoutFeedback onPress={() => { this.goJump(1) }}>
                                <View style={{ width: '25%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Image style={styles.allTopBoxBottomIcoFir} source={require('$image/home/zz.png')} />
                                    <Text style={styles.allTopBoxBottomName}>转账</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* 收支明细 */}
                            <TouchableWithoutFeedback onPress={() => { this.goJump(5) }}>
                                <View style={{ width: '25%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Image style={styles.allTopBoxBottomIcoFir} source={require('$image/home/szmx.png')} />
                                    <Text style={styles.allTopBoxBottomName}>收支明细</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* 扫一扫 */}
                            <TouchableWithoutFeedback onPress={() => {this.goJump(7)}}>
                                <View style={{ width: '25%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Image style={styles.allTopBoxBottomIcoFir} source={require('$image/home/sys.png')} />
                                    <Text style={styles.allTopBoxBottomName}>扫一扫</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {/* 支付选赞同,广告 */}
                        <View style={{ flexDirection: 'row', height: 40 }} onPress={() => {
                                    this.goJump(6)
                        }}>
                            <View style={{ flexDirection: 'column', width: '60%', height: 25, alignItems: 'center' }} >
                                <Text style={styles.allTopBoxBottomAd}>支付选赞同·大奖天天拿</Text>
                                <Text style={styles.allTopBoxBottomAdSmall}>苹果手机  黄金礼盒天天赢</Text>
                            </View>
                            <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }} >
                                <Image style={styles.allTopBoxBottomAdIco} source={require('$image/home/zt.png')} />
                            </View>
                        </View>
                        {/* 立即参与 */}
                        <View style={{ borderRadius: 14, flexDirection: 'row', height: 40, flexDirection: 'column', alignItems: 'center', overflow: "hidden" }} >
                            {/* <Image style={styles.allTopBoxBottomAdIco} source={require('$image/home/zt.png')} /> */}
                            {/* <Button style={{padding:10,width:200}} title={"立即参与"} onPress={() => {
                            }}></Button> */}

                            <LinearGradient style={{ borderRadius: 14 }} colors={['#E28900', '#DD7B00', '#D46D01']}>
                                <Text style={styles.partakeBtn} onPress={() => {
                                    // EventBus.emit('action', {
                                    //     path: "login",
                                    //     data: {
                                    //         name: 'liuxiaobin'
                                    //     }
                                    // });
                                    this.goJump(6)
                                }}>立即参与</Text>

                                {/*   */}
                            </LinearGradient>

                        </View>
                    </ImageBackground>

                    {/* 立即参与下面的快捷入口 */}
                    <View style={styles.allTopBoxBottomBox}>
                        {/* 快捷入口 */}
                        <View style={[styles.allTopBoxBottom, { height: 60, flex: 1, flexDirection: 'row', paddingTop: 10 }]}>
                            <TouchableWithoutFeedback onPress={() => {this.itemClick(0)}}>
                                <View style={{ width: '20%', padding: 0, height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Image style={styles.allTopBoxBottomIco} source={require('$image/home/dk.png')} />
                                    <Text style={styles.allTopBoxBottomNameSe}>贷款</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {this.itemClick(1)}}>
                                <View style={{ width: '20%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Image style={styles.allTopBoxBottomIco} source={require('$image/home/my/fjwd.png')} />
                                    <Text style={styles.allTopBoxBottomNameSe}>附近网点</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {this.itemClick(2)}}>
                                <View style={{ width: '20%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Image style={styles.allTopBoxBottomIco} source={require('$image/home/jycx.png')} />
                                    <Text style={styles.allTopBoxBottomNameSe}>交易查询</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {this.itemClick(3)}}>
                                <View style={{ width: '20%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Image style={styles.allTopBoxBottomIco} source={require('$image/home/dqck.png')} />
                                    <Text style={styles.allTopBoxBottomNameSe}>定期存款</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {this.itemClick(4)}}>
                                <View style={{ width: '20%', height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Image style={styles.allTopBoxBottomIco} source={require('$image/home/qb.png')} />
                                    <Text style={styles.allTopBoxBottomNameSe}>全部</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    {/* swiper头条轮播 */}
                    <View >
                        {/* 快捷入口 */}
                        <View style={[styles.leadNewsBox, { flex: 1, flexDirection: 'row', paddingTop: 10 }]}>
                            <View style={[{ width: '20%', height: 30, position: "absolute", top: 8, zIndex: 90, backgroundColor: "#fff" }]}>
                                <Text style={[styles.leadNewsBoxNameBox, { textAlign: "center" }]}>头条</Text>
                            </View>
                            <View style={{ width: '80%', height: 40, position: "absolute", top: 8, left: "20%", zIndex: 50 }}>
                                {/* <Text>zIndex测试</Text> */}

                                <Swiper
                                    //样式
                                    style={{ width: '100%' }}
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
                                    <View>
                                        <Text style={[styles.leadNewsBoxContentBox, { fontSize: 14 }]}>80后和90后: 到底谁的负债更多,压力更大?</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.leadNewsBoxContentBox, { fontSize: 14 }]}>外交部回应美加征关税措施.</Text>
                                    </View>

                                </Swiper>


                            </View>

                        </View>
                    </View>

                    {/* 轮播下方,借款图片 */}
                    <View style={{ width: "100%" }}>
                        {/* 快捷入口 */}
                        <View style={[styles.borrowMoneyBox, { paddingTop: 10 }]}>
                            <Image resizeMode="contain" style={styles.borrowMoneyBoxImg} source={require('$image/home/guang_gao.png')} />
                        </View>
                    </View>

                    {/* 热门活动 */}
                    <View style={styles.activitysBox}>
                        {/* 标题 */}
                        <View style={[styles.activitysTitleBox, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18 }]}>
                            <Text style={styles.activitysTitleNameIco}>|</Text>
                            <Text style={styles.activitysTitleName}>热门活动</Text>
                        </View>
                        <View style={styles.activitysContentBox}>
                            {/* 热门活动快捷入口 */}
                            <View style={[styles.allTopBoxBottom, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                                <View style={{ width: '47%', padding: 0, height: 60, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.activitysContentName, { width: '55%', marginLeft: "5%", alignItems: 'center' }]}>
                                        <Text style={styles.activitysContentNameString}>推荐办卡</Text>
                                        <Text style={styles.activitysContentNameCt}>送1000积分</Text>
                                    </View>
                                    <View style={[styles.activitysContentImg, , { width: '50%' }]}>
                                        <Image style={styles.activitysContentCtImg} source={require('$image/home/tjbk.png')} />
                                    </View>
                                </View>
                                <View style={{ width: '47%', padding: 0, height: 60, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.activitysContentName, { width: '55%', marginLeft: "5%", alignItems: 'center' }]}>
                                        <Text style={styles.activitysContentNameString}>品牌家具</Text>
                                        <Text style={styles.activitysContentNameCt}>最低3折起</Text>
                                    </View>
                                    <View style={[styles.activitysContentImg, , { width: '50%' }]}>
                                        <Image style={styles.activitysContentCtImg} source={require('$image/home/ppjj.png')} />
                                    </View>
                                </View>
                                <View style={{ width: '47%', padding: 0, height: 60, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.activitysContentName, { width: '55%', marginLeft: "5%", alignItems: 'center' }]}>
                                        <Text style={styles.activitysContentNameString}>电影票</Text>
                                        <Text style={styles.activitysContentNameCt}>尽享视觉盛宴</Text>
                                    </View>
                                    <View style={[styles.activitysContentImg, , { width: '50%' }]}>
                                        <Image style={styles.activitysContentCtImg} source={require('$image/home/dyp.png')} />
                                    </View>
                                </View>
                                <View style={{ width: '47%', padding: 0, height: 60, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.activitysContentName, { width: '55%', marginLeft: "5%", alignItems: 'center' }]}>
                                        <Text style={styles.activitysContentNameString}>品质度假</Text>
                                        <Text style={styles.activitysContentNameCt}>云南七日游</Text>
                                    </View>
                                    <View style={[styles.activitysContentImg, , { width: '50%' }]}>
                                        <Image style={styles.activitysContentCtImg} source={require('$image/home/pzdj.png')} />
                                    </View>
                                </View>

                            </View>
                        </View>

                    </View>

                    {/* 为您推荐 */}
                    <View style={styles.activitysBox}>
                        {/* 标题 */}
                        <View style={[styles.activitysTitleBox, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18 }]}>
                            <Text style={styles.activitysTitleNameIco}>|</Text>
                            <Text style={styles.activitysTitleName}>为您推荐</Text>
                        </View>
                        {/* 为您推荐快捷入口 */}
                        <View style={[styles.recommendContent, { flex: 1, flexDirection: 'row', paddingTop: 10 }]}>
                            <View style={styles.recommendContentItem}>
                                <Text style={styles.recommendContentItemTitle}>随时申赎</Text>
                                <Text style={styles.recommendContentItemTitleIc}>日日欣理财</Text>
                                <Text style={styles.recommendContentItemPers}>
                                    <Text style={styles.recommendContentItemPersNumber}>3.38</Text>
                                    <Text style={styles.recommendContentItemPersP}>%</Text>
                                </Text>
                                <Text style={styles.recommendContentItemPersDisc}>7日年化</Text>
                            </View>

                            <View style={styles.recommendContentItem}>
                                <Text style={styles.recommendContentItemTitle}>月度理财</Text>
                                <Text style={styles.recommendContentItemTitleIc}>聚益生金30天</Text>
                                <Text style={styles.recommendContentItemPers}>
                                    <Text style={styles.recommendContentItemPersNumber}>3.08</Text>
                                    <Text style={styles.recommendContentItemPersP}>%</Text>
                                </Text>
                                <Text style={styles.recommendContentItemPersDisc}>业绩比较基准</Text>
                            </View>

                            <View style={styles.recommendContentItem}>
                                <Text style={styles.recommendContentItemTitle}>季度理财</Text>
                                <Text style={styles.recommendContentItemTitleIc}>聚益生金91天</Text>
                                <Text style={styles.recommendContentItemPers}>
                                    <Text style={styles.recommendContentItemPersNumber}>4.09</Text>
                                    <Text style={styles.recommendContentItemPersP}>%</Text>
                                </Text>
                                <Text style={styles.recommendContentItemPersDisc}>业绩比较基准</Text>
                            </View>

                        </View>

                    </View>

                    {/* 特色服务 */}
                    <View style={styles.special}>
                        {/* 标题 */}
                        <View style={[styles.activitysTitleBox, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18 }]}>
                            <Text style={styles.activitysTitleNameIco}>|</Text>
                            <Text style={styles.activitysTitleName}>特色服务</Text>
                        </View>
                        {/* 内容 */}
                        <View style={styles.specialContent}>
                            <ImageBackground source={require('$image/home/tsb_1.png')} style={{ width: '100%', height: 180 }}>
                                {/* 横向滚动内容区域 */}
                                <View style={styles.specialContentScroll}>
                                    <ScrollView style={{ width: '100%', height: 180, flexDirection: "row" }} horizontal={true}>
                                        {/* 里面内容直接横向排开即可滚动 */}
                                        {/* 一组卡片 */}
                                        <View style={styles.specialContentItem}>
                                            <View style={styles.specialContentItemImgBox}>
                                                <Image resizeMode="contain" style={styles.specialContentItemImgItem} source={require('$image/home/ts_1.png')} />
                                            </View>
                                            <View style={styles.specialIcoBox}>
                                                <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                    <Image resizeMode="contain" source={require('$image/home/ts_kk.png')} />
                                                    <Text style={{ fontSize: 12, color: "#949494" }}>开卡</Text>
                                                </View>
                                                <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                    <Image resizeMode="contain" source={require('$image/home/ts_hkcj.png')} />
                                                    <Text style={{ fontSize: 12, color: "#949494" }}>还款抽奖</Text>
                                                </View>
                                                <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                    <Image resizeMode="contain" source={require('$image/home/ts_tjyl.png')} />
                                                    <Text style={{ fontSize: 12, color: "#949494" }}>推荐有礼</Text>
                                                </View>
                                                <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                    <Image resizeMode="contain" source={require('$image/home/ts_zq.png')} />
                                                    <Text style={{ fontSize: 12, color: "#949494" }}>专区</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* 第二组卡片 */}
                                        <View style={styles.specialContentItem}>
                                            <View style={styles.specialContentItemImgBox}>
                                                <Image resizeMode="contain" style={styles.specialContentItemImgItem} source={require('$image/home/ts_2.png')} />
                                            </View>
                                            <View style={styles.specialIcoBox}>
                                                <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                    <Image resizeMode="contain" source={require('$image/home/ts_mp.png')} />
                                                    <Text style={{ fontSize: 12, color: "#949494" }}>门票</Text>
                                                </View>
                                                <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                    <Image resizeMode="contain" source={require('$image/home/ts_hkcj.png')} />
                                                    <Text style={{ fontSize: 12, color: "#949494" }}>还款抽奖</Text>
                                                </View>
                                                <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                    <Image resizeMode="contain" source={require('$image/home/ts_tjyl.png')} />
                                                    <Text style={{ fontSize: 12, color: "#949494" }}>推荐有礼</Text>
                                                </View>
                                                <View style={{ width: '25%', height: 40, marginTop: 5, alignItems: "center", flexDirection: "column" }}>
                                                    <Image resizeMode="contain" source={require('$image/home/ts_zq.png')} />
                                                    <Text style={{ fontSize: 12, color: "#949494" }}>专区</Text>
                                                </View>
                                            </View>
                                        </View>


                                    </ScrollView>
                                </View>
                            </ImageBackground>
                        </View>

                    </View>

                    {/* 精选榜单 */}
                    <View style={styles.carefullyChosen}>
                        {/* 标题 */}
                        <View style={[styles.activitysTitleBox, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18 }]}>
                            <Text style={styles.activitysTitleNameIco}>|</Text>
                            <Text style={styles.activitysTitleName}>精选榜单</Text>
                        </View>
                        {/* 内容 */}
                        <View style={styles.carefullyChosenContent}>
                            <View style={styles.carefullyChosenContentItem}>
                                <View style={styles.carefullyChosenContentItemImgBox}>
                                    <Image resizeMode="contain" style={styles.carefullyChosenContentItemImg} source={require('$image/home/rank_1.png')} />
                                </View>
                                <View style={styles.carefullyChosenContentItemCtox}>
                                    <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 16, marginBottom: 2 }}>买基金也要精挑细选</Text>
                                    <Text style={{ color: "#505050", fontSize: 14, marginBottom: 4 }}>收益每天多一点儿</Text>
                                    <Text style={{ color: "#ED905E", fontSize: 12 }}>低风险,无费率</Text>
                                </View>
                                <View style={styles.carefullyChosenContentItemCtoxAll}>
                                    <Text style={{ color: "#767676", fontSize: 15 }}>全部</Text>
                                </View>
                            </View>

                            <View style={styles.carefullyChosenContentItem}>
                                <View style={styles.carefullyChosenContentItemImgBox}>
                                    <Image resizeMode="contain" style={styles.carefullyChosenContentItemImg} source={require('$image/home/rank_2.png')} />
                                </View>
                                <View style={styles.carefullyChosenContentItemCtox}>
                                    <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 16, marginBottom: 2 }}>小小的定投,大大的梦想</Text>
                                    <Text style={{ color: "#505050", fontSize: 14, marginBottom: 4 }}>精选最适合你的定投基金,收益日增</Text>
                                    <Text style={{ color: "#8A98F4", fontSize: 12 }}>为牛市播种,为幸福投资</Text>
                                </View>
                                {/* <View style={styles.carefullyChosenContentItemCtoxAll}>
                                    <Text style={{color:"#767676",fontSize:15}}>全部</Text>
                                </View> */}
                            </View>
                            <View style={styles.carefullyChosenContentItem}>
                                <View style={styles.carefullyChosenContentItemImgBox}>
                                    <Image resizeMode="contain" style={styles.carefullyChosenContentItemImg} source={require('$image/home/rank_3.png')} />
                                </View>
                                <View style={styles.carefullyChosenContentItemCtox}>
                                    <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 16, marginBottom: 2 }}>业绩领跑基金榜</Text>
                                    <Text style={{ color: "#505050", fontSize: 14, marginBottom: 4 }}>无惧市场动荡,它们始终靠前</Text>
                                    <Text style={{ color: "#61BCED", fontSize: 12 }}>1年内收益排名前1%</Text>
                                </View>
                                {/* <View style={styles.carefullyChosenContentItemCtoxAll}>
                                    <Text style={{color:"#767676",fontSize:15}}>全部</Text>
                                </View> */}
                            </View>
                        </View>
                    </View>
                    {/* 底部图片区域 */}
                    <View style={styles.bottomImgBox}>
                        <Image resizeMode="contain" style={styles.bottomImg} source={require('$image/agree_LOGO.png')} />
                    </View>
                    {/* </View> */}
                </ScrollView>
            </>
        );
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
        marginTop: 3
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
        // height:100,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#000'
    },
    special: {
        marginTop: 8
    },
    carefullyChosenContentItemImg: {
        width: "70%",
        marginLeft: "10%",
        marginTop: -10,
        // height:80
    },
    carefullyChosenContentItemCtox: {
        width: "69%",
        // height:80,
        flexDirection: "column"
        // backgroundColor:"#000"
    },
    carefullyChosenContentItemCtoxAll: {
        width: "13%",
        // flex:1,
        // height:100,
        alignItems: "center",
        // backgroundColor:"#000"
    },
    carefullyChosenContentItemImgBox: {
        width: "19%",
        // height:80,
        // backgroundColor:"#000"
    },
    carefullyChosenContentItem: {
        marginTop: 10,
        marginBottom: 10,
        width: "88%",
        marginLeft: "6%",
        flexDirection: "row",
        alignItems: "center"
    },
    carefullyChosenContent: {
        flexDirection: "column"
    },
    carefullyChosen: {
        // marginTop:8,
        marginBottom: 0
    },
    activeDotStyle: {
        display: "none"
    },
    bottomImg: {
        width: '38%',
        marginLeft: "27.5%",
        height: 30,
        marginTop: 38
    },
    bottomImgBox: {
        width: '100%',
        height: 120,
        // marginTop:15,
        // backgroundColor:"#000",
    },
    recommendContentItemPersDisc: {
        color: "#DA8C2A",
        fontSize: 14
    },
    recommendContentItemPersP: {
        fontSize: 12
    },
    recommendContentItemPersNumber: {
        fontSize: 20
    },
    recommendContentItemPers: {
        color: "#DA8C2A"
    },
    recommendContentItemTitleIc: {
        color: "#767676",
        marginTop: 3,
        marginBottom: 6
    },
    recommendContentItemTitle: {
        fontSize: 16,
        color: "#000"
    },
    recommendContentItem: {
        width: "30%",
        marginRight: "2.7%",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        shadowColor: "#ddd",
        shadowOffset: { width: 1, height: 1 },
        elevation: 2,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        flexDirection: "column",
    },
    recommendContent: {
        paddingLeft: "6%"
    },
    activitysContentCtImg: {
        width: '80%',
        // marginLeft:"5%"
    },
    activitysContentNameCt: {
        fontSize: 13,
        color: "#727272"
    },
    activitysContentNameString: {
        fontSize: 16,
        // fontWeight:"700"
    },
    activitysTitleName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    activitysTitleNameIco: {
        marginTop: -2,
        fontSize: 20,
        fontWeight: "bold",
        color: "#DA8C2A",
        marginRight: 6
    },
    activitysContentBox: {
        width: '100%',
        // height:30,
        // backgroundColor:"red"
    },
    activitysTitleBox: {
        width: '100%',
        height: 40,
        lineHeight: 40,
        // backgroundColor:"#fff"
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
        // marginLeft:"1.5%",
    },
    leadNewsBoxNameBox: {
        height: 26,
        borderColor: "#E98013",
        borderWidth: 1,
        // marginTop:-1,
        lineHeight: 26,
        width: '70%',
        marginLeft: '23%',
        color: "#E98013",
        fontWeight: "bold",
        borderRadius: 5
    },
    leadNewsBoxContentBox: {
        height: 26,
        // borderColor:"#E98013",
        // borderWidth:1,
        marginTop: -1,
        lineHeight: 26,
        textAlign: "center",
        width: '100%',
        // marginLeft:'23%',
        // color:"#E98013",
        // fontWeight:"bold",
        // borderRadius:5
    },
    leadNewsBox: {
        height: 45,
        marginTop: 10,
        // marginBottom:10,
        borderTopWidth: 1,
        borderTopColor: '#F4F4F4',
        borderBottomWidth: 1,
        borderBottomColor: '#F4F4F4'
    },
    partakeBtn: {
        // borderStyle:"solid",
        // borderWidth:1,
        // borderColor:"#9298BE",
        // padding:20,
        borderRadius: 14,
        height: 40,
        width: 140,
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 40,
        textAlign: "center",
        // backgroundColor:"#E37D00",
        marginTop: -1
    },
    allTopBoxBottomBox: {
        marginTop: 5
    },
    allTopBoxBottomAdIco: {
        height: 80,
        marginTop: -58
    },
    allTopBoxBottomAd: {
        color: '#E6830D',
        fontSize: 17,
        marginTop: -35,
        fontWeight: "bold"
    },
    allTopBoxBottomAdSmall: {
        color: '#fff',
        marginTop: 5
    },
    allTopBoxBottomIco: {
        width: 22,
        height: 22,
        marginBottom: 5
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
        color: "#363636",
        fontSize: 13,
        fontWeight: "bold"
    },
    allTopBoxBottom: {
        width: '100%',
        // backgroundColor:'#000'
    },
    topSearchInput: {
        width: "60%",
        height: 30,
        lineHeight: 26,
        padding: 0,
        paddingLeft: 1,
        // borderStyle:"solid",
        // borderWidth:1,
        // borderColor:"#9298BE",
        position: "absolute",
        left: 40,
        bottom: 0,
        fontSize: 14,
        color: "#A3A8C5"
    },
    topSearchIco: {
        marginTop: 8,
        marginLeft: 10,
        width: 15,
        height: 15
    },
    topSearchIcoRight: {
        position: "absolute",
        right: 13,
        top: 7,
        width: 12,
        height: 16
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
        borderRadius: 15,
        height: 32,
        lineHeight: 32,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#9298BE"
    }
});
