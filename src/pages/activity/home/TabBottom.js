/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */
import '@/window'
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View
}
    from
    'react-native';
import PropTypes from 'prop-types';
import EventBus from "$/components/eventBus/eventBus"//中央通信组件
const router = require('$/router-control');
import { getLoginToken, setLoginToken } from '$/util/tokenutil'
var ico0 = require('$image/cloudTeller/peopleUp.png')
var ico1 = require('$image/cloudTeller/people0.png')
var ico2 = require('$image/cloudTeller/peopleOver.png')
// trangle
import SVG from "$/components/Svg";

export default class TabBottom extends PureComponent {

    static PropType = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        tabNames: PropTypes.array,
        tabIconNames: PropTypes.array,
        selectedTabIconNames: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            showImageStatus: 1
        }
    }

    componentDidMount() {
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    goToPage = (i) => {
        this.props.goToPage(i)
    }

    setAnimationValue({ value }) {
        console.log(value);
    }
    goJump = (i) => {
        let _this = this;
        if (i == '3') {
            if (!getLoginToken().data) {
                router.load('login', {
                    afterGoBack: function () {
                        // console.log('_this.props')
                        EventBus.emit('goToPage',3);
                        // console.log(_this.props)
                        // _this.props.goToPage(i);
                        // console.log(_this.props, 'tabBottom的属性值')
                    }
                })
            } else {
                _this.props.goToPage(i)
            }
        } else if (i == '0') {
            // router.load('cloudDots')
            if(window.$globalThemeType == 'green'){
                router.load('cloudDotsGreen')
            }
            if(window.$globalThemeType == 'blue'){
                router.load('cloudDots')
            }
            
        }else {
            _this.props.goToPage(i)
        }
    }
    componentDidMount(): void {
        let _this = this;
        let frequency = 25;
        let nowFrequency = 0

        let t = setInterval(function () {
            if (nowFrequency == frequency) {
                _this.setState({
                    showImageStatus: 2,
                });
                clearInterval(t);
                return
            } else {
                nowFrequency++
            }
            if (_this.state.showImageStatus == '0') {
                _this.setState({
                    showImageStatus: 1,
                });
            } else {
                _this.setState({
                    showImageStatus: 0,
                });
            }

        }, 250);
    }
    render() {
        // console.warn('ttttt', '')
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => {
                    // #DA8C2B tabBottomColor $globalStyle.homePage.
                    let color = this.props.activeTab === i ? $globalStyle.tabBottomColor : '#ACB1CC';
                    let icon = this.props.activeTab == i ? this.props.selectedTabIconNames[i] : this.props.tabIconNames[i];
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.tab}
                            onPress={() => {this.goJump(i)}}>
                            {/* 第一个例外 */}

                            <View style={[styles.FirstItemBox, i != '0' ? styles.unShow : styles.show]}>
                                <View style={[ styles.FirtabItem]}>
                                    <Image
                                        resizeMode="contain"
                                        style={[this.state.showImageStatus == '0' || this.state.showImageStatus == "2" ? styles.unShow : styles.show, styles.yunwangdianicon, styles.yunwangdian]}
                                        source={ico0} />
                                    <Image
                                        resizeMode="contain"
                                        style={[this.state.showImageStatus != '0' || this.state.showImageStatus == "2" ? styles.unShow : styles.show, styles.yunwangdianicon, styles.yunwangdian]}
                                        source={ico1} />
                                    <Image
                                        resizeMode="contain"
                                        style={[this.state.showImageStatus != '0' && this.state.showImageStatus == "2" ? styles.show : styles.unShow, styles.yunwangdianicon, styles.yunwangdian]}
                                        source={ico2} />
                                    {/* <Text style={{ color: "#fff", fontSize: 12, marginTop: -22, lineHeight: 50 }}>
                                        {this.props.tabNames[i]}
                                    </Text> */}
                                    <View style={styles.textCon}>
                                        <View style={{flexDirection: 'row', justifyContent: "space-around", alignItems: 'center', left: -4}}>
                                            <SVG source={require('$image/home/trangle.svg')} style={{width: 4, height: 5, marginRight: 5}} />
                                            <Text style={styles.firstItemText}>{this.props.tabNames[i]}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* 剩下的遍历出来 */}
                            <View style={[styles.tabItem, (i == '0' ? styles.unShow : styles.show)]}>
                                <SVG source={icon} style={styles.icon}></SVG>
                                <Text style={{ color: color, fontSize: 12 }}>
                                    {this.props.tabNames[i]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    FirstItemBox: {
        width: 106,
        height: 116,
        // backgroundColor: 'red',
        backgroundColor: 'transparent',
        // left: -17,
        // top: -10,
        // borderRadius: 59,
        // position: "relative",
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: "#FDF7F1",
        zIndex: 600
    },
    FirtabItem: {
        // paddingLeft: 8,
        width: 96,
        height: 96,
        // 
        // backgroundColor: 'red',
        // left: 10,
        // top: 10,
        // // borderRadius: 48,
        // position: "absolute",
        flex: 1,
        // flexDirection: "column",
        alignItems: "center",
        zIndex: 800
        // paddingRight:15
    },
    unShow: {
        display: "none",
        // position:"absolute",
        // left:10000,
        flex: 1,
    },
    show: {
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 20
    },
    tabs: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: "center",
        borderTopColor: '#F1F1F1',
        borderTopWidth: 1
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    icon: {
        width: 20,
        height: 20,
        marginBottom: 2
    },
    yunwangdianicon: {
        marginLeft: 5,
        zIndex: 800
    },
    yunwangdian: {
        width: 86,
        height: 86
    },
    textCon: {
        position: "absolute",
        top: 54,
        left: 0,
        right: 0,
        width: '100%',
        height: 42,
        paddingBottom: 5,
        borderBottomRightRadius: 24,
        borderTopRightRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: $globalStyle.clouterCountBg.backgroundColor,
        zIndex: 300
    },
    firstItemText: {
        fontFamily: 'PingFangSC-Medium',
        fontSize: 10,
        color: '#FFFFFF',
        letterSpacing: 0.12,
        // lineHeight: 10
    }
});
