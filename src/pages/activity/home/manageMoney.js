// 理财
import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions, Keyboard } from 'react-native';

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
var amVAR = {};

module.exports = class manageMoney extends Component<{}> {
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

    render() {
        return (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text style={{fontSize: 18, color: '#800000', padding: 10}}>理财</Text>
            </View>);
    }
}
