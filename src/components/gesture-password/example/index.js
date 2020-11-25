import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import PasswordGesture from '$/components/gesture-password';


export default class AppDemo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            Height:Dimensions.get('window').height,
            Width:Dimensions.get('window').width,
            status: 'normal'
        }
    }

    onEnd(password) {
        // alert(password)
        if(password == '1236'){
            this.setState({
                status: 'right',
            });
        }else{
            this.setState({
                status: 'wrong',
            });

        }
    }

    onStart() {

        this.setState({
            status: 'normal',
        });
    }

    render() {
        return (

            <PasswordGesture
                ref='pg'
                status={this.state.status} //当前状态(默认,成功,失败-->normal,wrong,right)
                isClearPass={false} //绘制完图像后是否清空数据
                onStart={() => this.onStart()} //刚开始触发的回掉函数
                onEnd={(password) => this.onEnd(password)} //绘制结束的回掉函数
                innerCircle={true} //是否显示内圈圆形
                outerCircle={true} //是否显示外圈圆形
                normalColor={'#ddd'} //默认颜色
                rightColor={'#5FA8FC'} //成功颜色
                wrongColor={'#D93609'} //失败颜色
                backgroundColor={'#000'} //组件背景色
                Width={this.state.Width} //组件宽度
                Height={this.state.Height} //组件高度
            />


        );
    }
}

AppRegistry.registerComponent('AppDemo', () => AppDemo);
