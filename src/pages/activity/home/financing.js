// 理财首页
import React, { Component,  } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, TouchableWithoutFeedback, FlatList, StatusBar, Keyboard, ImageBackground } from 'react-native';
import { WebView } from "react-native-webview";
import Header from '$/components/header'
import { OPEN, COINPICTURE, ICON2, ICON1, ICON4, ICON3, ICON5, SEARCHBLACK, YUYIN_B, KEFUBLACK, XIAOXIBLACK } from '../imageSource'
import ProductBox from './productBox/productBox';
import ProductBoardBox from './productBoard/productBoard';
import { ScrollView } from 'react-native-gesture-handler';
import router from '$/router-control'
import { getLoginToken, setLoginToken } from '$/util/tokenutil'
import { NavigationEvents } from 'react-navigation';
import "$/window"
import SVG from "$/components/Svg";
const { formatMoney } = require('$/util/moneyutil')

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
var amVAR = {};

module.exports = class cloudDots extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            businessData: [
                ['理财产品', ICON1],
                ['贵金属', ICON2],
                ['保险', ICON3],
                ['基金产品', ICON4],
                ['更多', ICON5],
            ],
            productData: [
                {
                    rate: '3.38',
                    day: '七日年化',
                    intro: '随时申赎',
                    kind: '聚生金理财',
                    limit: ''
                },
                {
                    rate: '2.74',
                    day: '业绩比较基准',
                    intro: '1分起购 稳健收益',
                    kind: '工银现金快线',
                    limit: ''
                },
                {
                    rate: '3.80',
                    day: '上日年化',
                    intro: '1万起购 定期3个月',
                    kind: '信诚薪金宝',
                    limit: 90
                },
                {
                    rate: '4.38',
                    day: '业绩比较基准',
                    intro: '1万起购 定期9个月',
                    kind: '万家天添宝A',
                    limit: 270
                },
                {
                    rate: '4.63',
                    day: '七日年化',
                    intro: '1万起购 定期12个月',
                    kind: '中邮货币A',
                    limit: 360
                },
            ],
            productBoardData: [
                {
                    rate: '3.16',
                    day: '业绩比较基准',
                    intro: '月度理财',
                    kind: '海通月月赢',
                    limit: 30
                },
                {
                    rate: '3.78',
                    day: '业绩比较基准',
                    intro: '季度理财',
                    kind: '广发弘利集合',
                    limit: 90
                },
                {
                    rate: '4.89',
                    day: '业绩比较基准',
                    intro: '年度理财',
                    kind: '易方达增利A',
                    limit: 360
                }
            ],
            productBoxData: [
                {
                    rate: '45.54',
                    day: '近一年收益率',
                    intro: '常胜将军，长期业绩优异',
                    kind: '弘发精选获利',
                },
                {
                    rate: '12.78',
                    day: '近一年收益率',
                    intro: '2019年唯一"四大满贯"债基',
                    kind: '中欧置业A',
                },
                {
                    rate: '27.36',
                    day: '近一年收益率',
                    intro: '超过30万用户都在看',
                    kind: '汇宏天富价值精选',
                }
            ],
            // isLogin: false, //是否登录
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // 判断是否登录
        // if (!getLoginToken().data) {
        //     return {
        //         isLogin: false
        //     }
        // } else {
        //     return {
        //         isLogin: true
        //     }
        // }
        return nextProps
    }
    observer() {
        let oMap = {}
        for (let pop in amVAR) {
            oMap[pop] = amVAR[pop]
        }
        this.setState(oMap, () => {

        })
    }
    toWebViewMore = () => {
        router.load('webview', {
            url: `http://${window.financialURL}/licaiProduct/financialProduct-more.html`
        })
        // this.props.navigation.navigate('webview', {
        //     url: 'http://192.9.200.220:8188/licaiProduct/licaiProduct.html'
        // })
    }
    toWebView = (index) => {
        switch (index) {
            case 0:
                router.load('webview', {
                    url: `http://${window.financialURL}/licaiProduct/financialProduct.html?theme=${window.$globalStyle.themeType}`,
                    title: '理财产品'
                })
                break
            case 3:
                router.load('webview', {
                    url: `http://${window.financialURL}/jijin/jijin.html?theme=${window.$globalStyle.themeType}`,
                    title: '基金'
                })
                break
            default:
            // router.load('webview', {
            //     url: `http://${window.financialURL}/jijin/jijin.html`
            // })
        }
        // this.props.navigation.navigate('webview', {
        //     url: 'http://192.9.200.220:8188/jijin/jijin.html'
        // })
    }
    // 用户登录
    userLogin = () => {
        const _this = this
        // 判断是否登录
        if (!getLoginToken().data) {
            router.load('login')
        } else {
            _this.setState({
                isLogin: true
            })
        }
    }
    // NavigationEvents处理逻辑
    // userLoginStatus = () => {
    //     const _this = this
    //     // 判断是否登录
    //     if (!getLoginToken().data) {
    //         _this.setState({
    //             isLogin: false
    //         })
    //     } else {
    //         _this.setState({
    //             isLogin: true
    //         })
    //     }
    // }

    render() {
        return (
            <View style={{ backgroundColor: '#eee', flex: 1 }}>
                <View style={{ width: '100%', height: 88, elevation: 3, zIndex: 10, opacity: 1, backgroundColor: '#fff' }}>
                    <View style={[styles.allTopBox, { flex: 1, flexDirection: 'row', }]}>
                        {/* 搜索框 */}
                        <View style={[styles.topSearchBox, { width: '74%', height: 50, marginTop: 25 }]}>
                            {/* 搜索框 */}
                            <View style={[styles.inputStyle, { borderColor: '#9298BE' }]}>
                                <Image style={styles.topSearchIco} source={SEARCHBLACK} />
                                <Text onPress={() => { router.load('search') }}
                                    style={[styles.topSearchInput, { color: '#000', opacity: 0.6 }]}
                                >查询持仓的基金产品</Text>
                                <SVG style={styles.topSearchIcoRight} source={YUYIN_B} />
                            </View>
                        </View>
                        {/* 耳机,justifyContent水平居中,alignItems垂直居中 */}
                        {/* <TouchableWithoutFeedback onPress={() => { router.load('comingSoon') }}> */}
                        <TouchableWithoutFeedback onPress={() => {  }}>
                            <View style={{ width: '13%', height: 50, marginTop: 25, flex: 1, flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                <Image style={styles.earphone} source={KEFUBLACK} />
                            </View>
                        </TouchableWithoutFeedback>
                        {/* 消息 */}
                        <TouchableWithoutFeedback onPress={() => { router.load('messageCenter') }}>
                            <View style={{ width: '15%', height: 50, marginTop: 25, justifyContent: "space-around", alignItems: 'center' }}>
                                <Image style={styles.earphone} source={XIAOXIBLACK} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                >
                    {/* 头部区域 */}
                    <View style={styles.topPart}>
                        {/* 账户信息展示 */}
                        <TouchableWithoutFeedback onPress={this.userLogin}>
                            <ImageBackground source={COINPICTURE} style={styles.accountMSG}>
                                {/* {isLogin ? */}
                                {this.props.isLogin ?
                                    <>
                                        <View style={styles.formatOne}>
                                            <Text style={styles.formatMoney}>{formatMoney(financialFund.financialEarn + financialFund.fundEarn)}</Text>
                                            <Image source={OPEN} style={styles.open}></Image>
                                        </View>
                                        <Text style={styles.formatText}>昨日收益（元）</Text>
                                        <View style={[styles.formatOne, { marginTop: 11 }]}>
                                            <Text style={styles.formatText}>总持仓（元）</Text>
                                            <Text style={styles.formatText}>{formatMoney(financialFund.financial + financialFund.fund)}</Text>
                                        </View>
                                    </>
                                    :
                                    <TouchableWithoutFeedback onPress={this.userLogin}>
                                        <View>
                                            <View style={styles.formatOne}>
                                                <Text style={styles.formatMoney}>登录查看</Text>
                                                <Image source={OPEN} style={styles.open}></Image>
                                            </View>
                                            <Text style={styles.formatText}>昨日收益（元）</Text>
                                            <View style={[styles.formatOne, { marginTop: 11 }]}>
                                                <Text style={styles.formatText}>总持仓（元）</Text>
                                                <Text style={styles.formatText}>--</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                }
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                        {/* 业务图标区 */}
                        <View style={styles.business}>
                            {
                                this.state.businessData.map((ele, index) => (
                                    <TouchableWithoutFeedback key={ele[0]} onPress={() => { this.toWebView(index) }}>
                                        <View style={styles.businessItem}>
                                            <SVG source={ele[1]} style={styles.businessIcon}></SVG>
                                            <Text style={styles.businessText}>{ele[0]}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))
                            }
                        </View>
                    </View>
                    {/* 理财产品滚动区域 */}
                    <View style={styles.middlePart}>
                        {/* 理财推荐 */}
                        <View style={styles.productTitle}>
                            <View style={styles.productTitlePartOne}>
                                <View style={styles.colorBlock}></View>
                                <Text style={styles.productTitleFormat}>理财推荐</Text>
                            </View>
                            <Text style={styles.moreFormat} onPress={this.toWebViewMore}>更多</Text>
                        </View>
                        <FlatList
                            // style={{paddingHorizontal:20}}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.productData}
                            contentContainerStyle={[styles.borrowDetailArea, { marginTop: -15, paddingBottom: 5 }]}
                            renderItem={({ item, index }) => <ProductBox navigation={this.props.navigation} item={item} index={index}></ProductBox>}
                            showsVerticalScrollIndicator={false}
                        >
                        </FlatList>
                    </View>
                    <View style={styles.middlePart}>
                        {/* 定期投资 */}
                        <View style={[styles.productTitle, { marginBottom: 4 }]}>
                            <View style={styles.productTitlePartOne}>
                                <View style={styles.colorBlock}></View>
                                <Text style={styles.productTitleFormat}>定期投资</Text>
                            </View>
                            <Text style={styles.moreFormat} onPress={this.toWebViewMore}>更多</Text>
                        </View>
                        <FlatList
                            // style = {{paddingHorizontal: 16}}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.productBoardData}
                            contentContainerStyle={[{ backgroundColor: '#fff', alignItems: 'center' }, styles.investRegularly]}
                            renderItem={({ item, index }) => <ProductBoardBox item={item} index={index}></ProductBoardBox>}
                            showsVerticalScrollIndicator={false}
                        >
                        </FlatList>
                        {/* 优选权益 */}
                        <View style={styles.productTitle}>
                            <View style={styles.productTitlePartOne}>
                                <View style={styles.colorBlock}></View>
                                <Text style={styles.productTitleFormat}>优选基金</Text>
                            </View>
                            <Text style={styles.moreFormat} onPress={this.toWebViewMore}>更多</Text>
                        </View>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.productBoxData}
                            style={{ flex: 1, backgroundColor: '#fff' }}
                            contentContainerStyle={[styles.borrowDetailArea, { marginTop: -15, paddingBottom: 40 }]}
                            renderItem={({ item, index }) => <ProductBox item={item} index={index}></ProductBox>}
                            showsVerticalScrollIndicator={false}
                        >
                        </FlatList>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    investRegularly: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        paddingHorizontal: 16
    },
    productTitlePartOne: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorBlock: {
        width: 2,
        height: 14,
        backgroundColor: $globalStyle.homePage.blockColor
    },
    borrowDetailArea: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    moreFormat: {
        fontSize: 13,
        color: '#666'
    },
    productTitleFormat: {
        fontFamily: 'PingFangSC-Medium',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#333333',
        marginLeft: 8,

    },
    productTitle: {
        // paddingHorizontal: 20,
        width: '92%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 12,
    },
    middlePart: {
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center'
    },
    businessText: {
        fontSize: 12,
        color: '#666',
        marginTop: 6,
        fontWeight: 'bold'
    },
    businessItem: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10

    },
    business: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        marginTop: 8
    },
    businessIcon: {
        width: 23,
        height: 23
    },
    formatText: {
        fontSize: 13,
        color: '#666',
    },
    formatMoney: {
        fontSize: 24,
        color: '#333333',
        marginRight: 10
    },
    formatOne: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    open: {
        // width: 20,
        // height: 20
    },
    accountMSG: {
        width: 343,
        height: 98,
        marginTop: 16,
        borderRadius: 10,
        paddingLeft: 24,
        paddingTop: 6,
        // backgroundColor: 'rgba(218,140,42,0.5)',
    },
    topPart: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    webView: {
        marginTop: 20
    },
    allTopBox: {
        paddingRight: 5,
        paddingTop: 13,
        position: 'absolute'
    },
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
    },
    topSearchIco: {
        marginLeft: 8,
        width: 14,
        height: 14,
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
    topSearchIcoRight: {
        width: 16,
        height: 16,
        marginRight: 16
    },
    earphone: {
        width: 20,
        height: 20,
    },
})
