import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, SMALLRIGHT, BANK, SETTING } from './imageSource'
const NetworkUtil = require('$/util/networkutil');
import { formatMoney } from '$/util/moneyutil'
const router = require('$/router-control');
import scope from '$/scope'

module.exports = class transferInfo extends Component<{}> {
    constructor(props) {
        super(props);
        scope(this)
        this.state = {
            traInfo: { a: '1000.00', b: '交房租', c: '中国银行(7102)', d: '李婷婷', e: '上海浦东发展银行(1935)', f: '每月12日', g: '仅提醒，不自动转账' },
            traHisList: []
        };
    }
    back = () => {
        router.back()
    }
    setBookTransfer = () => {
        router.load('transferInfoEdit',{info:this.state.traInfo})
    }
    _renderItem({ item, index }) {
        return (
            <TouchableWithoutFeedback onPress={() => this._onItemClick(item)}>
                <View key={index} style={styles.accbodyView}>
                    <View>
                        <Image style={{ width: 30, height: 30, }} source={BANK} />
                    </View>
                    <View style={{ width: '45%', paddingLeft: 20 }}>
                        <Text style={{ fontSize: 15, color: '#333333', fontFamily: 'PingFangSC-Regular' }}>{item.a}</Text>
                        <Text style={{ fontSize: 13, color: '#666666', fontFamily: 'PingFangSC-Regular', paddingTop: 5 }}>{item.c}</Text>
                    </View>
                    <View style={{ width: '40%', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 15, color: '#333333', fontFamily: 'PingFangSC-Semibold' }}>{item.b}</Text>
                        <Text style={{ fontSize: 13, color: '#666666', fontFamily: 'PingFangSC-Semibold', paddingTop: 5 }}>{item.d}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        const { traHisList, traInfo } = this.state
        return (
            <>
                <Header
                    title={'预约转账详情'}
                    leftClick={this.back}
                    rightClick={() => { alert('more') }}
                ></Header>
                {/* 内容 */}
                <View style={styles.body}>
                    <View style={{ width: '100%', height: 180, backgroundColor: '#FFFFFF' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: '#333333', paddingTop: 18, paddingLeft: 20, width: '65%', fontFamily: 'PingFangSC-Medium' }}>{traInfo.transferAlias}</Text>
                            <TouchableWithoutFeedback onPress={this.setBookTransfer}>
                                <View style={styles.setStyle}>
                                    <Image source={SETTING} style={{ width: 20, height: 20 }}></Image>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: '40%' }}>
                            <Text style={{ fontSize: 15, color: '#333333', paddingLeft: 20, fontFamily: 'PingFangSC-Medium', width: '40%' }}>
                                {`${traInfo.payerCardBank}(${traInfo.payerCardNo.substr(-4)})`}
                            </Text>
                            <Image style={{ width: 15, height: 6, }} source={SMALLRIGHT} />
                            <View style={{ width: '55%', paddingLeft: '5%' }}>
                                <Text style={{ fontSize: 15, color: '#333333' }}>{traInfo.payeeName}</Text>
                                <Text style={{ fontSize: 14, color: '#999999', paddingTop: 3 }}>{`${traInfo.payeeCardBank}(${traInfo.payeeCardNo.substr(-4)})`}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: '15%', paddingLeft: 20 }}>
                            <Text style={{ fontSize: 14, color: '#333333' }}>{traInfo.transferCycle === 2 ? `每月${traInfo.transferDate.substr(-2)}日 ` : traInfo.transferDate}转账：{formatMoney(traInfo.transferAmount)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: '15%', paddingLeft: 20 }}>
                            <Text style={{ fontSize: 14, color: $globalStyle.reservation.textColor }}>{traInfo.transferWay === 1 ? '仅提醒,不自动转账' : '自动转账'}</Text>
                        </View>
                    </View>
                    <View style={styles.listBody}>
                        <Text style={{ fontSize: 14, color: '#333333', paddingTop: 18, paddingLeft: 20, fontFamily: 'PingFangSC-Medium' }}>{traHisList.length > 0 ? '历史记录:' : '暂无更多记录'}</Text>
                        {
                            traHisList.length > 0 ?
                                <View>
                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        data={traHisList}
                                        renderItem={this._renderItem}
                                    />
                                </View>
                                :
                                <></>
                        }
                    </View>
                </View>
            </>
        )
    }

    static getDerivedStateFromProps(props, state) {
        let prop = props.navigation.state.params
        if (state.traInfo !== prop.info) {
            return {
                traInfo: prop.info
            }
        }
        return null
    }
}
const styles = StyleSheet.create({
    setStyle: {
        marginRight: 20,
        backgroundColor: '#ddd',
        marginTop: 18,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        backgroundColor: '#F6F6F6',
        height: '100%',
        width: '100%',
    },
    listBody: {
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%'
    },
    accbodyView: {
        width: '100%',
        height: 74,
        borderColor: '#E8E8E8',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingLeft: 20,
        flexDirection: 'row'
    }
})
