// 拍照组件

import React, { Component, } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
var camera = require('$image/cloudTeller/cameraIco.png');
import { RNCamera } from "react-native-camera";
export default class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    //切换状态
    getPhoto = () => {
        //请求打开摄像头
        this.props.getphotoType('打开摄像头')
    }
    //拍照
    takePicture = async function () {
        
        const options = { quality: 0.5, base64: true,pauseAfterCapture:true};
        const data = await this.camera.takePictureAsync(options);
        //将base64传给父组件
        this.props.setphoto('data:image/png;base64,' + data.base64)
    };
    render() {
        return (
            <View>
                <View style={styles.ImgBox}>
                    <View style={{ flexDirection: 'row', width: '100%', height: 200, borderRadius: 5, borderWidth: 1, borderColor: $globalStyle.borderColor, backgroundColor: "transparent" }}>
                        {this.props.photoType
                            ? <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={styles.preview}
                                type={RNCamera.Constants.Type.back}
                            >
                                <Text style={{ fontSize: 22, color: $globalStyle.textColor }} onPress={this.takePicture.bind(this)}>[点击拍照]</Text>
                            </RNCamera>
                            :
                            <View style={{ width: '100%', height: '100%' }}>
                                {this.props.imagePath == ''
                                    ? <ImageBackground source={this.props.photo} style={{ width: '100%', height: '100%' }}>
                                        <TouchableWithoutFeedback onPress={() => { this.getPhoto() }}>
                                            <View style={styles.IcoImgBox}>
                                                <View style={styles.IcoImgItem}>
                                                    <Image resizeMode="contain" style={styles.topSearchIco} source={camera} />
                                                </View>
                                                <Text style={styles.IcoImgItemTitle}>{this.props.title}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </ImageBackground>
                                    :
                                    <TouchableWithoutFeedback onPress={() => { this.getPhoto() }}>
                                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.props.imagePath }}>
                                        </Image>
                                    </TouchableWithoutFeedback>
                                }
                            </View>
                        }
                    </View>

                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    Title: {
        marginBottom: 20
    },
    IcoImgBox: {
        flex: 1,
        textAlign: "center"
    },
    IcoImgItem: {
        width: "40%",
        height: "40%",
        marginLeft: "30%",
        marginTop: "10%"
    },
    IcoImgItemTitle: {
        marginTop: "9%",
        textAlign: "center",
        color: "#3D4B8C",
        fontSize: 16,
        fontWeight: "bold"
    },
    topSearchIco: {
        width: "100%",
        height: "100%"
    },
    ImgBox: {
        width: "80%",
        height: 200,
        flex: 1,
        marginLeft: "10%"
    },
    preview: {
        width: '100%',
        height: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

})
