
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions, Keyboard } from 'react-native';

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
var amVAR = {};

module.exports = class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    observer() {
        let oMap = {}
        for (let pop in amVAR) {
            oMap[pop] = amVAR[pop]
        }
        this.setState(oMap, () => {
            
        })
    }
    test(){
        // alert('跳转到3')
        //跳转页面并传递参数
        this.props.callBackHome('子组件点击了一下')
        // this.props.navigation.goBack(); 
    }

    render() {
        return (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text onPress={() => {
                    this.test()
                }} style={{fontSize: 18, color: '#800000', padding: 10}}>page1,点击触发回调(关闭弹框)</Text>
            </View>);
    }
}
