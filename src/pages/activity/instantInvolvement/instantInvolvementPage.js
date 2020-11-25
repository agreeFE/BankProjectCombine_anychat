// 立即参与
import React, { Component,  } from 'react';
import { StyleSheet, View, Text, PixelRatio, Image, TouchableWithoutFeedback, FlatList, Dimensions, Keyboard, ImageBackground } from 'react-native';
import { WebView } from "react-native-webview";
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, OPEN, COINPICTURE, ICON1, ICON2, ICON3, ICON4, ICON5 } from '../imageSource'
import EventBus from "$/components/eventBus/eventBus"
import { ScrollView } from 'react-native-gesture-handler';
import scope from '@/scope'
import router from '$/router-control'

var bg01 = require('$image/instantInvolvement/bg01.jpg')
var bg02 = require('$image/instantInvolvement/bg02.jpg')
var bg03 = require('$image/instantInvolvement/bg03.jpg')
var bg04 = require('$image/instantInvolvement/bg04.jpg')
var bg05 = require('$image/instantInvolvement/bg05.jpg')
var bg06 = require('$image/instantInvolvement/bg06.jpg')
var bg07 = require('$image/instantInvolvement/bg07.jpg')
var bg08 = require('$image/instantInvolvement/bg08.jpg')
var bg09 = require('$image/instantInvolvement/bg09.jpg')
var bg10 = require('$image/instantInvolvement/bg10.jpg')
var bg11 = require('$image/instantInvolvement/bg11.jpg')

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
var amVAR = {};

module.exports = class instantInvolvementPage extends Component<{}> {
    constructor(props) {
        super(props);
        scope(this);
        var omap = {};
        omap[this.props.navigation.state.routeName] = this;
        $.instanceList.push(omap);

    }
    observer() {
        let oMap = {}
        for (let pop in amVAR) {
            oMap[pop] = amVAR[pop]
        }
        this.setState(oMap, () => {

        })
    }
    leftClick() {
        // alert('left')
        router.back()
    }



    render() {
        return (

            <View style={{ backgroundColor: '#eee', flex: 1,position:'relative' }}>
                <View style={{position:'absolute',zIndex:555555,width:'100%'}}>
                    <Header
                        title={`活动页`}
                        imageBackground={0}
                        leftClick={this.leftClick}
                        headerStyle={{backgroundColor:'rgba(0,0,0,0.2)'}}
                        showBackGround={false}
                    ></Header>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                    <View style={styles.ImageBox1}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg01} />
                    </View>
                    <View style={styles.ImageBox2}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg02} />
                    </View>

                    <View style={styles.ImageBox3}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg03} />
                    </View>
                    <View style={styles.ImageBox4}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg04} />
                    </View>
                    <View style={styles.ImageBox5}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg05} />
                    </View>
                    <View style={styles.ImageBox6}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg06} />
                    </View>
                    <View style={styles.ImageBox7}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg07} />
                    </View>
                    <View style={styles.ImageBox8}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg08} />
                    </View>
                    <View style={styles.ImageBox9}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg09} />
                    </View>
                    <View style={styles.ImageBox10}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg10} />
                    </View>
                    <View style={styles.ImageBox11}>
                        <Image resizeMode="cover" style={styles.ImageBoxContent} source={bg11} />
                    </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    ImageBox1: {
        width: "100%",
        height: 330,
        marginTop: 0,
    },
    ImageBox2: {
        width: "100%",
        height: 550,
        marginTop: 10,
    },
    ImageBox3: {
        width: "100%",
        height: 640,
        marginTop: 10,
    },
    ImageBox4: {
        width: "100%",
        height: 690,
        marginTop: 10,
    },
    ImageBox5: {
        width: "100%",
        height: 650,
        marginTop: 10,
    },
    ImageBox6: {
        width: "100%",
        height: 650,
        marginTop: 10,
    },
    ImageBox7: {
        width: "100%",
        height: 650,
        marginTop: 10,
    },
    ImageBox8: {
        width: "100%",
        height: 650,
        marginTop: 10,
    },
    ImageBox9: {
        width: "100%",
        height: 650,
        marginTop: 10,
    },
    ImageBox10: {
        width: "100%",
        height: 650,
        marginTop: 10,
    },
    ImageBox11: {
        width: "100%",
        height: 650,
        marginTop: 10,
        marginBottom:10,
    },
    ImageBoxContent: {
        width: "100%",
        height: "100%"
    }
})