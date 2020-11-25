// 云网点首页
/*
    dis:云网点首页, 球状阵列3D动画
    author:liuxiaobin
*/
import React, { Component } from 'react';
import { StyleSheet,TouchableWithoutFeedback, NativeModules ,View, Image, Text, PixelRatio, Dimensions, Keyboard,ImageBackground,PanResponder } from 'react-native';
import Header from "$/components/header"
const router = require('$/router-control')
import scope from '@/scope'
const { getTimespamp, getDatetimeByFormat } = require('$/util/dateutil');

var ico1 = require('$image/cloudTeller/people0.png')
var itemBg = require('$image/cloudTeller/itemBg.png');
var itemBgYellow = require('$image/cloudTeller/itemBgYellow.png');
var tI = null;//定时器
var peopleLinetimerStatus = null;
var peopleLinetimer = null;

const AnyChatUtil = require('$/util/anyChatUtil');
const NetWorkutil = require('$/util/networkutil');
const AnyChat = NativeModules.AnyChatPlugin
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
var amVAR = {};

// const { StatusBarManager } = NativeModules;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
// alert(screenHeight/3.68/6.2)
// const  enterLineUrl = 'http://192.168.31.177:10000/bcss/pierce'
// const  enterLineUrl = 'http://172.172.18.118:6030'
// const  enterLineUrl = 'http://192.168.1.106:6030'
const  enterLineUrl = 'http://192.9.200.46:6030'
// const  enterLineUrl = 'http://58.23.208.52:6030'
// const  enterLineUrl = 'http://192.168.31.31:6030'
// const enterLineUrl = 'http://192.168.187.76:10000'
//'http://192.168.31.31:4444' //'https://arcs.agree.cn:53073' 'http://192.9.200.57:4444',
// const  enterLineUrl = 'http://192.168.60.150:10000'//'http://192.168.31.31:4444' //'https://arcs.agree.cn:53073' 'http://192.9.200.57:4444',
// const  enterLineUrl = 'http://192.9.200.57:4444'//'http://192.168.31.31:4444' //'https://arcs.agree.cn:53073' 'http://192.9.200.57:4444',

// 椭圆 439 ~ -40  275~125
var Circle = {
    centre_of_circle : {x:screenWidth/1.74,y:screenHeight/3.68},//中心点
    radius : 12,
    //绘制椭圆坐标系
    draw : function(){
        var dots = 88,
            a = screenWidth/1.74/11.5,   
            b = screenHeight/3.68/33, 
            dotsArr = [];
        for(var i = 0; i < dots; i++){
            var x = Circle.centre_of_circle.x+Circle.radius*Math.cos(i*2*Math.PI/dots)*a;
            var y = Circle.centre_of_circle.y+Circle.radius*Math.sin(i*2*Math.PI/dots)*b;
            var item = {
                y:y,
                x:x,
                style:{
                    // height:y/2,
                    // width:y/2.5>78?y/2.5:78,
                    // // width:y/2.5,
                    // lineHeight:y/2,
                    // fontSize:y/15>12?y/15:12
                    // fontSize:y/15
                    height:y/2.5>=72?y/2.5:72,
                    width:y/2.5>=72?y/2.5:72,
                    lineHeight:y/2.5>=72?y/2.5:72,
                    fontSize:y/15>13?y/15:13
                }
            }
            dotsArr.push(item);
        }
        return dotsArr;
    }
}

var dots = Circle.draw();
// console.log(dots)

let timer = 25;

module.exports = class cloudDots extends Component<{}> {
    constructor(props) {
        super(props);
        scope(this);

        var enterArr = [];

        enterArr = [
            {
                name:'密码重置',
                path:''
            },
            {
                name:'个人开户',
                path:''
            }, 
            {
                name:'理财',
                path:''
            },
            {
                name:'密码重置',
                path:''
            },
            {
                name:'个人开户',
                path:''
            },
            {
                name:'转账',
                path:''
            },
            {
                name:'快贷',
                path:''
            },
            {
                name:'理财',
                path:''
            },
            
            
        ]

        //椭圆数组矩阵处理
        var keyIndex = enterArr.length;
        var dots = Circle.draw();

        console.log('路由参数')
        console.log(this.props.navigation.state.params)
        // 偏移位置
        var positionNumber = 18;
        // 密码重置
        if(this.props.navigation.state.params == 1){
            enterArr = [
                {
                    name:'个人开户',
                    path:''
                }, 
                {
                    name:'理财',
                    path:''
                },
                {
                    name:'密码重置',
                    path:''
                },
                {
                    name:'个人开户',
                    path:''
                },
                {
                    name:'转账',
                    path:''
                },
                {
                    name:'快贷',
                    path:''
                },
                {
                    name:'理财',
                    path:''
                },
                {
                    name:'密码重置',
                    path:''
                },
                
            ]
        }
        // 个人开户
        if(this.props.navigation.state.params == 2){
            enterArr = [
                {
                    name:'理财',
                    path:''
                },
                {
                    name:'密码重置',
                    path:''
                },
                {
                    name:'个人开户',
                    path:''
                },
                {
                    name:'转账',
                    path:''
                },
                {
                    name:'快贷',
                    path:''
                },
                {
                    name:'理财',
                    path:''
                },
                {
                    name:'密码重置',
                    path:''
                },
                {
                    name:'个人开户',
                    path:''
                }, 
            ]
        }
        //理财
        if(this.props.navigation.state.params == 0){
            enterArr = [
                {
                    name:'密码重置',
                    path:''
                },
                {
                    name:'个人开户',
                    path:''
                }, 
                {
                    name:'理财',
                    path:''
                },
                {
                    name:'密码重置',
                    path:''
                },
                {
                    name:'个人开户',
                    path:''
                },
                {
                    name:'转账',
                    path:''
                },
                {
                    name:'快贷',
                    path:''
                },
                {
                    name:'理财',
                    path:''
                },
                
                
            ]
        }
        positionNumber = 0;

        //单个长度间隔
        var keyArrayL = parseInt(dots.length/keyIndex);
        let allKeyArray = [];
        for(var i = 0;i<keyIndex;i++){

            var numNow = i*keyArrayL+(positionNumber);
            if(numNow>dots.length){
                numNow = numNow-dots.length
            }
            if(numNow<0){
                numNow = numNow+Number(dots.length)
            }
            
            var allKeyArrayItem = {
                index:numNow,
                coordinate:dots[numNow],
                dis:enterArr[i],
                itemBg:itemBg
            }
            allKeyArray.push(allKeyArrayItem)
        }
        // console.log(allKeyArray)
        this.state = {
            lineStatus:'.',
            modelPeople:{//小萌萌
                height:120,
                bottom:60
            },
            transformRotate:0,//等待页面旋转角度
            userInfoData:{},//用户信息
            allKeyArray:allKeyArray,
            showAllModel:'0',//是否显示所有蒙层,0不显示,1显示
            showLinkModel:'0',//是否选中连接蒙层,0不显示,1呼叫柜员 //todothis
            callIng:'0',//是否正在呼叫, 0未呼叫,1呼叫中
            showRightIco:false,//是否显示右侧更多
            counter:{
                left:-5,
                bottom:-5000
            },
            roomState:false,
            clickIndex:'',
            USERFLAG:"10092",
            CONFERUNIID:"13001234567"
        }
        // console.log(this.state.allKeyArray)
    }

    lineStatusTime(){
        let _this = this;
        peopleLinetimerStatus = window.setInterval(function(){

            if(_this.state.lineStatus == '...'){
                _this.setState({
                    lineStatus:''
                });
            }else if(_this.state.lineStatus == '..'){
                _this.setState({
                    lineStatus:'...'
                });
            }else if(_this.state.lineStatus == '.'){
                _this.setState({
                    lineStatus:'..'
                });
            }
            else if(_this.state.lineStatus == ''){
                _this.setState({
                    lineStatus:'.'
                });
            }

        },800);
    }
    // 人物填充描边
    peopleLine(){
        let _this = this;
        
        var initPeople = {
            height:0,
            bottom:60
        }

        // clearInterval(peopletimer);
        peopleLinetimer = window.setInterval(function(){

            if(initPeople.height >= 120){

                clearInterval(peopleLinetimer);
                
                setTimeout(
                    () => { 
                        initPeople = {
                            height:0,
                            bottom:60
                        }
                        _this.setState({
                            modelPeople:initPeople
                        },()=>{
                            _this.peopleLine() 
                        });
                    },800
                );

            }else{
                console.log("initPeople.height",initPeople.height);
                initPeople.height = initPeople.height-(-3)
                initPeople.bottom = 60-initPeople.height/2
                _this.setState({
                    modelPeople:initPeople
                });
            }

        },150);
        

    }

    // 动画人物跳出来
    peopleJump(){
        let _this = this;
        let thisT = 1;
        _this.setState({
            counter: {
                left:-5,
                bottom:-50
            },
        });
        var peopletimer = window.setInterval(function(){
            console.log("counter",_this.state.counter.bottom);
            let newCounterBottom = _this.state.counter.bottom;
            newCounterBottom = Number(Number(newCounterBottom) + Number(thisT));
            thisT = thisT + 0.6;
            let newCounter = {
                left:-5,
                bottom:newCounterBottom
            }

            if(newCounterBottom <= 0){
                _this.setState({
                    counter: newCounter,
                });

            }else{
                _this.setState({
                    showAllModel: "1",
                });
                clearInterval(peopletimer);
                
            }

        },30);
    }

    componentDidMount() {
        let _this = this;
        clearInterval(tI);
        clearInterval(peopleLinetimerStatus);
        clearInterval(peopleLinetimer)

        setTimeout(
            () => { _this.peopleJump() },400
        );

        //获取用户偏好数据
        $Storage.load({
            key: 'userInfo'
        }).then(result => {
            var userInfo = JSON.parse(result);

            // console.log('用户信息result', userInfo)
            _this.setState((previousState) => {
                return ({
                    userInfoData: userInfo,
                })
            });
        });

    }

    // 状态改变刚更新UI
    componentWillMount(): void {
        let _this = this;
        let dotsLength = dots.length;//坐标长度
        let itemLength = parseInt(dots.length/this.state.allKeyArray.length)//每一个选项所占的坐标数量
        let moveI = 0;//当前移动的坐标数

        timer = 5;

        let moveStart = 0;
        let startX = 0; //滑动前位置
        let isTimer = false;
        let isStart = false; //是否开始
        
        _this._panResponderChoose = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onStartShouldSetPanResponderCapture: (event, gestureState) => true,
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

            // 开始手势操作
            onPanResponderGrant: (event, gestureState) => {
                alert('开始')
                console.log(event)
            
            },
            // 移动操作
            onPanResponderMove: (event, gestureState) => {
                
            },
            // 释放手势
            onPanResponderRelease: (event, gestureState) => {
                // _this.callCountModel()
            }
        })

        _this._panResponderTop = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onStartShouldSetPanResponderCapture: (event, gestureState) => true,
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

            // 开始手势操作
            onPanResponderGrant: (event, gestureState) => {
                // alert('开始')
                // console.log(gestureState);
                moveStart = 0;
                // console.log('开始')
                isTimer = false;
            },
            // 移动操作
            onPanResponderMove: (event, gestureState) => {

                // this.onMove(event, gestureState);
                moveStart++
                // 以第一次触碰的位置为初始位置
                if(moveStart == 2){
                    startX = gestureState.moveX
                }

                // 向右滑动
                if(moveStart>=3&&gestureState.moveX-startX>=4){
                    // console.log('开始惯性移动')
                    if(isTimer == false){
                        // console.log('执行向右定时器动画')
                        let newAllKeyArray = _this.state.allKeyArray;
                        let newAllKeyArrayLength = newAllKeyArray.length;
                        isTimer = true;
                        var t = window.setInterval(function(){

                            moveI ++;
                            if(moveI>=itemLength+1){

                                moveI = 0;
                                clearInterval(t);
                                t = null;
                                return
                            }

                            for(var i = 0;i<newAllKeyArrayLength;i++){
                                var nowIndex = newAllKeyArray[i].index;
                                nowIndex++;
                                if(nowIndex == dotsLength){
                                    nowIndex = 0;
                                }
                                newAllKeyArray[i].index = nowIndex;
                                newAllKeyArray[i].coordinate = dots[nowIndex]
                            }

                            _this.setState({
                                allKeyArray: newAllKeyArray,
                            });

                        },timer);
                    }
                }
                // 向左滑动
                if(moveStart>=3&&gestureState.moveX-startX<=-4){
                    // console.log('开始惯性移动')
                    if(isTimer == false){
                        let newAllKeyArray = _this.state.allKeyArray;
                        let newAllKeyArrayLength = newAllKeyArray.length;
                        isTimer = true;
                        //定时器向左滚动
                        //定时器向右滚动
                        var t = window.setInterval(function(){
                            moveI ++;
                            if(moveI>=itemLength+1){

                                moveI = 0;

                                // console.log('执行向左定时器动画结束')
                                clearInterval(t);
                                t = null;
                                return
                            }
                            for(var i = 0;i<newAllKeyArrayLength;i++){
                                var nowIndex = newAllKeyArray[i].index;
                                nowIndex--;
                                if(nowIndex == -1){
                                    nowIndex = dotsLength-1;
                                }
                                newAllKeyArray[i].index = nowIndex;
                                newAllKeyArray[i].coordinate = dots[nowIndex]
                            }

                            _this.setState({
                                allKeyArray: newAllKeyArray,
                            });

                        },timer);

                    }
                }

                // if(moveStart>=5||)
                // console.log('移动中')
                // console.log(event)
                // console.log(gestureState)
            },
            // 释放手势
            onPanResponderRelease: (event, gestureState) => {
                isTimer = false;
                // alert(gestureState)
                // this.onEnd(event, gestureState);
                // console.log('移动完毕')
                // console.log(event)
                // console.log(moveStart)
            }
        })

        //手势事件
        _this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onStartShouldSetPanResponderCapture: (event, gestureState) => true,
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

            // 开始手势操作
            onPanResponderGrant: (event, gestureState) => {
                // alert('开始')
                // console.log(gestureState);
                moveStart = 0;
                // console.log('开始')
                isTimer = false;
            },
            // 移动操作
            onPanResponderMove: (event, gestureState) => {
                // this.onMove(event, gestureState);
                moveStart++
                // 以第一次触碰的位置为初始位置
                if(moveStart == 2){
                    startX = gestureState.moveX
                }

                // 向右滑动
                if(moveStart>=3&&gestureState.moveX-startX>=4){
                    // console.log('开始惯性移动')
                    if(isTimer == false){
                        // console.log('执行向右定时器动画')
                        let newAllKeyArray = _this.state.allKeyArray;
                        let newAllKeyArrayLength = newAllKeyArray.length;
                        isTimer = true;
                        //定时器向右滚动
                        var t = window.setInterval(function(){
                            moveI ++;
                            if(moveI>=itemLength+1){

                                moveI = 0;

                                // console.log('执行向左定时器动画结束')
                                clearInterval(t);
                                t = null;
                                return
                            }
                            for(var i = 0;i<newAllKeyArrayLength;i++){
                                var nowIndex = newAllKeyArray[i].index;
                                nowIndex--;
                                if(nowIndex == -1){
                                    nowIndex = dotsLength-1;
                                }
                                newAllKeyArray[i].index = nowIndex;
                                newAllKeyArray[i].coordinate = dots[nowIndex]
                            }

                            _this.setState({
                                allKeyArray: newAllKeyArray,
                            });

                        },timer);
                    }
                }
                // 向左滑动
                if(moveStart>=3&&gestureState.moveX-startX<=-4){
                    // console.log('开始惯性移动')
                    if(isTimer == false){
                        let newAllKeyArray = _this.state.allKeyArray;
                        let newAllKeyArrayLength = newAllKeyArray.length;
                        isTimer = true;
                        //定时器向左滚动
                        var t = window.setInterval(function(){

                            moveI ++;
                            if(moveI>=itemLength+1){

                                moveI = 0;
                                clearInterval(t);
                                t = null;
                                return
                            }

                            for(var i = 0;i<newAllKeyArrayLength;i++){
                                var nowIndex = newAllKeyArray[i].index;
                                nowIndex++;
                                if(nowIndex == dotsLength){
                                    nowIndex = 0;
                                }
                                newAllKeyArray[i].index = nowIndex;
                                newAllKeyArray[i].coordinate = dots[nowIndex]
                            }

                            _this.setState({
                                allKeyArray: newAllKeyArray,
                            });

                        },timer);
                    }
                }

                // if(moveStart>=5||)
                // console.log('移动中')
                // console.log(event)
                // console.log(gestureState)
            },
            // 释放手势
            onPanResponderRelease: (event, gestureState) => {
                isTimer = false;
                // alert(gestureState)
                // this.onEnd(event, gestureState);
                // console.log('移动完毕')
                // console.log(event)
                // console.log(moveStart)
            }
        })

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
            <View style={[styles.cloudDotsBox,{height:screenHeight,backgroundColor:"#01081F"}]}>
                <ImageBackground resizeMode={'contain'} source={require('$image/cloudTeller/homebgG.jpg')} style={{ width: '100%',height:'100%'}}>
                    <View style={[styles.pageBox,{height:screenHeight,backgroundColor:"rgba(254,200,46,0)"}]}>
                        <Header
                            imageBackground={0}
                            showBackGround={true}
                            leftClick={()=> {this.backToHome()}}
                            showLeftIco={true}
                            showRightIco={true}
                            // headerStyle={{backgroundColor: "rgba(41,52,120,1)"}}
                            rightClick={()=> {router.load('cloudsHistoricRecords')}}></Header>
                        {/* 球状阵列3D动画 */}
                        {/* 外层大圆 */}

                        <View style={[styles.slippage]} >
                            {/* 轨道 */}
                            {/* <View style={{width:400,height:400,position:"absolute",top:0,left:70,borderRadius:200,borderColor:"#11324E",borderWidth:2.5,transform: [{skewY:'0deg'},{rotateX:'66.5deg'}, {rotateY:'0deg'} ]}}></View> */}
                            <View style={[styles.slippageModelTop]} {...this._panResponderTop.panHandlers}></View>
                            <View style={[styles.slippageModel]} {...this._panResponder.panHandlers}></View>
                            {this.state.allKeyArray.map((item, i) => {
                                return (
                                    // 内层小圆
                                    <TouchableWithoutFeedback onPress={() => {
                                        // this.props.navigation.navigate("tellerOperation",{
                                        // account:"liudabin",
                                        // });
                                        this.changeBG(i)
                                        
                                        }} >
                                        <View  style={[styles.smallCircle,{width:item.coordinate.style.width,height:item.coordinate.style.height,top:item.coordinate.y,left:item.coordinate.x,alignItems:"center",justifyContent:"center"}]}>
                                            <ImageBackground resizeMode={'contain'} source={this.state.allKeyArray[i].itemBg} style={{ width: '100%',height:"100%", borderRadius:50 }}>
                                                <Text style={[{color:"#fff",fontSize:item.coordinate.style.fontSize,paddingLeft:5,transform: [{skewY:'-12deg'}],textAlign:"center",lineHeight:item.coordinate.style.lineHeight}]}>{item.dis.name}</Text>
                                            </ImageBackground>
                                        </View>
                                    </TouchableWithoutFeedback>
                        
                                )
                            })}
                        </View>
                        {/* 选中事件蒙层 */}
                        <View style={[styles.model,this.state.showLinkModel==='1'?styles.showModel:styles.unShowModel]}>
                            {/* 旋转动画 */}
                            {/* <View style={{width:'100%',height:80,justifyContent:'center',alignItems:'center',transform:[{rotate: this.state.transformRotate+'deg' }]}}>
                                <View style={{width:110,height:110,borderColor:"#779EA6",borderWidth:1,borderRadius:55}}>
                                <View style={{width:16,height:16,borderRadius:8,backgroundColor:"#5EE2DE",position:"absolute",right:-8,top:47,zIndex:5000000}}></View>
                                </View>
                            </View> */}
                            <View style={{color:"#fff",position:"absolute",top:100,width:'100%',paddingLeft:'15%',paddingRight:"15%"}}>
                                <Text style={{color:"#2673BC",marginBottom:5}}>温馨提示:</Text>
                                <Text style={{color:"#2673BC"}}>您选择了视频连线,当前排队第 <Text style={{color:"#C9CE07"}}>2</Text> 位 , 预计等待<Text style={{color:"#C9CE07"}}>1</Text>分钟</Text>
                            </View>
                            
                            <View style={{width:'100%',height:300,justifyContent:"center",alignContent:"center",alignItems:"center"}}>

                                    {/* 由中间向两侧发散 */}
                                    <View style={{width:86,height:120,position:"absolute",top:0,zIndex:10}}>
                                        <Image style={{width:86,height:120,position:"absolute",bottom:0}} resizeMode="cover" source={require('$image/cloudTeller/counterLine.png')} />
                                    </View>
                                    <View style={{width:86,height:this.state.modelPeople.height,position:"absolute",top:0,zIndex:11,overflow:"hidden"}}>
                                        <Image style={{width:86,height:120}} resizeMode="cover" source={require('$image/cloudTeller/peopleUpBig.png')} />
                                    </View>
                                    {/* <View style={{width:86,height:120,position:"absolute",top:0,zIndex:11}}>
                                        <Image style={{width:86,height:this.state.modelPeople.height,position:"absolute",bottom:this.state.modelPeople.bottom}} resizeMode="cover" source={require('$image/cloudTeller/peopleUpBig.png')} />
                                    </View> */}

                                    {/* 由上向下发散 */}
                                    {/* <View style={{width:86,height:120,position:"absolute",top:0,zIndex:10}}>
                                        <Image style={{width:86,height:120,position:"absolute",bottom:0}} resizeMode="cover" source={require('$image/cloudTeller/counterLine.png')} />
                                    </View>
                                    <View style={{width:86,height:120,position:"absolute",top:0,zIndex:11}}>
                                        <Image style={{width:86,height:this.state.modelPeople.height,position:"absolute",bottom:this.state.modelPeople.bottom}} resizeMode="cover" source={require('$image/cloudTeller/peopleUpBig.png')} />
                                    </View> */}



                                <View style={{width:120,height:120}} ></View>
                                <Text style={{color:"#fff",textAlign:"center",marginTop:10}}>{this.state.USERFLAG == "10092" ? "正在连线":"正在等待分享链接"}{this.state.lineStatus}</Text>
                                <Text style={{color:"#1470E8",marginTop:100,paddingTop:8,paddingBottom:8,paddingLeft:10,paddingRight:10,backgroundColor:"#021626",borderRadius:10}} onPress={() => {
                                            // this.props.navigation.navigate("tellerOperation",{
                                            //     account:"liudabin",
                                            // });
                                            this.unCallCount()
                                        }}>{this.state.USERFLAG == "10092" ? "取消连线" : "取消等待"}</Text>
                            </View>
                            
                        </View>
                        <View style={[styles.mengmengda,{bottom:0,left:20,zIndex:50000,position:"absolute"}]}>
                            {/* todo */}
                            <Image style={[styles.peopleBox,{left:this.state.counter.left,bottom:this.state.counter.bottom}]} resizeMode="contain" source={ico1} />
                            <Image style={styles.kefubg} resizeMode="contain" source={require('$image/cloudTeller/kefubg.png')} />
                            {/* 柜员语音弹出框 */}

                            {/* 选中呼叫弹框 */}
                            <View style={[styles.peopleContentBoxSelect,{flexDirection: 'column', alignItems: 'center',minHeight:80},this.state.showLinkModel==='1'&&this.state.showAllModel === "1"?styles.showModel:styles.unShowModel]}>
                                <View style={[styles.textBox,{zIndex:1200}]}>
                                    <Text style={[styles.textBoxContent,{color:'#2A90EE'}]}>您选择了视频接入服务,当前排队第<Text style={{color:"#C9CE07"}}>2</Text>位,预计等待<Text style={{color:"#C9CE07"}}>10</Text>秒钟.不再等待,可<Text onPress={() => {
                                            // this.props.navigation.navigate("tellerOperation",{
                                            //     account:"liudabin",
                                            // });
                                            this.unCallCount()
                                        }} style={{color:"#21435A", textDecorationLine: 'underline',textDecorationStyle: 'dashed',textDecorationColor: '#FFC911',width:200,height:50,}}>取消连接</Text></Text>
                                </View>
                            </View>

                            {/* 默认弹框 */}
                            <View style={[styles.peopleContentBox,{flexDirection: 'column', alignItems: 'center'},this.state.showLinkModel==='0'&&this.state.showAllModel === "1"?styles.showModel:styles.unShowModel]}>
                                <View style={[styles.textBox,{zIndex:1200}]}>
                                    <Text  style={[styles.textBoxContent,{color:'#2A90EE'}]}>您好,{this.state.userInfoData.cnName}先生,我是远程柜员小赞.请选择以上业务类型,可与我快速视频连接办理哦~如果没有您想要办理的业务,请<Text style={{color:"#FFC911", textDecorationLine: 'underline',textDecorationStyle: 'dashed',textDecorationColor: 'FFC911'}} onPress={() => {
                                            this.setState({
                                                showLinkModel: '2',
                                            });
                                            // this.callCount()
                                        }}>点击这里</Text>通过视频或语音连线云柜员。</Text>
                                </View>
                            </View>

                            {/* 选择视频或语音弹框 */}
                            <View style={[styles.peopleContentBox,{flexDirection: 'column', alignItems: 'center'},this.state.showLinkModel==='2'&&this.state.showAllModel === "1"?styles.showModel:styles.unShowModel]}>
                                <View style={[styles.textBox,{zIndex:1200}]}>
                                    <Text style={[styles.textBoxContent,{color:'#2A90EE'}]}>您还可以选择直接连线远程柜员或通过语音对我说:</Text>
                                </View>
                                <View style={[styles.FastEntryBox,{marginTop:10,flexDirection: 'row', alignItems: 'center'}]}>
                                    <TouchableWithoutFeedback onPress={() => {
                                            // this.props.navigation.navigate("tellerOperation",{
                                            //     account:"liudabin",
                                            // });
                                            this.callCountModel('-1')
                                        }} >
                                        <View style={[styles.FastEntry,{width:"50%",flexDirection: 'column', alignItems: 'center'}]}>
                                            <Image style={{width:60,height:60}} resizeMode="contain" source={require('$image/cloudTeller/vediobg.png')} />
                                            <Text style={{color:"#fff"}}>远程柜员</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => {
                                            router.load("cloudTellerVoice",{
                                                account:"liudabin",
                                            });
                                            // this.callCountModel()
                                        }} >
                                        <View style={[styles.FastEntry,{width:"50%",flexDirection: 'column', alignItems: 'center'}]}>
                                            <Image style={{width:60,height:60}} resizeMode="contain" source={require('$image/cloudTeller/talkbg.png')} />
                                            <Text style={{color:"#fff"}}>语音搜索</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{width:"100%",height:100,backgroundColor:"#03081C",flexDirection: 'column', alignItems: 'center'}}>

                </View>
                <ImageBackground source={require('$image/cloudTeller/homebg.png')} style={{ width: '100%', height: '100%' ,zIndex:-1}}></ImageBackground>
            </View>
        );
    }

    unCallCount(){
        let _this = this;
        clearInterval(tI);
        clearInterval(peopleLinetimerStatus);
        clearInterval(peopleLinetimer)
        
        // 球的颜色变回去
        var newAllKeyArray = _this.state.allKeyArray;
        for(var i = 0;i<newAllKeyArray.length;i++){
            newAllKeyArray[i].itemBg = itemBg;
        }
        _this.setState({//todo
            allKeyArray:newAllKeyArray
        });

        _this.setState({
            callIng: '0',
            showLinkModel:"0"
        });
        var initPeople = {
            height:120,
            bottom:60
        }
        _this.setState({
            modelPeople:initPeople
        });
        
        if( _this.state.roomState ){
            AnyChat.quitLine((succ)=>{
                console.warn('succ',succ)
            },( err )=>{
                console.warn('err',err)
            })
            AnyChat.loginOut(( succ )=>{
                // console.warn( '销毁后=' + succ );
            },( err )=>{
                // console.warn();
            });
        }
    }
    // 返回弹框
    backToHome(){
        router.back();
    }
    //更改选中背景
    changeBG(k){
        // alert(k)
        // if(k==4||k==3){
        //     return
        // }
        let _this = this;
        let newAllKeyArray = _this.state.allKeyArray;
        for(var i = 0;i<newAllKeyArray.length;i++){
            if(k == i){
                newAllKeyArray[i].itemBg = itemBgYellow;
            }else{
                newAllKeyArray[i].itemBg = itemBg;
            }
        }
        _this.setState({//todo
            allKeyArray:newAllKeyArray,
            clickIndex:k
        });
        this.callCountModel(k)
    }
    // 呼叫柜员弹框
    callCountModel(k){
        let _this = this;
        let defaultAction = [
            {
              text: '取消',
              onPress: () => {

                var newAllKeyArray = _this.state.allKeyArray;
                for(var i = 0;i<newAllKeyArray.length;i++){
                    newAllKeyArray[i].itemBg = itemBg;
                }
                _this.setState({//todo
                    allKeyArray:newAllKeyArray
                });

              },
              style: 'default',
            },
            {
              text: '确定', onPress: () => {
                _this.ConfirmUserFlag();
                // _this.callCount();
                //   if(k==3||k==4){
                //     router.load("comingSoon",{
                //         account:"liudabin",
                //     });
                //   }else{
                //     _this.callCount();
                //   }
              },
            }
        ];
      window.$Modal.confirm('呼叫柜员','确认呼叫远程柜员吗?',defaultAction)
    }

    ConfirmUserFlag(){
        let defaultAction = [
            {
              text: '担保人',
              onPress: () => {
                this.setState({
                    USERFLAG:"10093",
                    CONFERUNIID:"13001234568",
                },()=>{
                    this.callCount();
                });
              },
              style: 'default',
            },
            {
              text: '本人', onPress: () => {
                this.callCount();
              },
            }
        ];
      window.$Modal.confirm('身份确认','请问是本人办理业务还是担保人?',defaultAction)
    }

    // 呼叫柜员
    callCount() {
        let _this = this;

        clearInterval(tI);
        clearInterval(peopleLinetimerStatus);
        clearInterval(peopleLinetimer)
        
        // setTimeout(
        //     () => { _this.peopleLine() },1000
        // );
        // _this.peopleLine()
        _this.lineStatusTime()

        // tI = window.setInterval(function(){

        //     let transformRotateNew = _this.state.transformRotate-(-3);

        //     _this.setState({
        //         transformRotate: transformRotateNew,
        //     });

        // },20);
        
        
        _this.setState({
            showLinkModel: '1',
        });
        _this.setState({
            callIng: '1',
        });

            /**
             * @初始化 AnyChat
             * @author 卢鹏宇
             * @date 2019-09-04
             */
            AnyChat.init(( succ )=>{
                console.warn( 'init',succ )
                _this.setState({
                    roomState:true
                })
                 /**
                 * @ AnyChat 进线
                 * @author 卢鹏宇
                 * @date 2019-09-05
                 * @params enterLineUrl ：URL 192.168.31.31
                 * @params businessId ： 业务类型
                 */
                let businessId = ''
                // switch ( _this.state.clickIndex ) {
                //     case 0 :
                //         businessId = 'LCZX' //理财咨询
                //         break;
                //     case 1 :
                //         businessId = 'MMCZ' // 密码重置
                //         break;
                //     case 2 :
                //         businessId = 'YHKGS' // 个人开户
                //         break;
                //     default:
                //         break;
                // }

                if( _this.state.clickIndex == 0 || _this.state.clickIndex == 3 ){
                    businessId = 'MMCZ' //密码重置
                }else if( _this.state.clickIndex == 1 || _this.state.clickIndex == 4 ){
                    businessId = 'YHKGS' // 个人开户
                }else if( _this.state.clickIndex == 2 || _this.state.clickIndex == 7 ){
                    businessId = 'LCZX' //理财咨询
                }

                let params = {
                    enterLineUrl: enterLineUrl,
                    businessId: businessId,
                    IDNO:this.state.userInfoData.idCard,
                    IDTYPE:'02',
                    IDNAME:window.userName,
                    USERFLAG: this.state.USERFLAG,
                    CONFERUNIID: this.state.CONFERUNIID
                }
                console.log('params', params)
                AnyChat.enterLine ( params, ( succ )=>{
                    console.warn( '进线成功:'+ succ )
                    // console.warn( '进线成功,userflag:'+ succ.data )
                    // let phoneSingleParams = {
                    //     "Body": {
                    //         "USERFLAG": succ.data,
                    //         "OPERATION": "1",
                    //     },
                    //     "Head": {
                    //         "ConsumerId"      : "C002",
                    //         "ConsumerSeqNo"   : getTimespamp(new Date()),//时间戳  当前时间
                    //         "RequestDate"     : getDatetimeByFormat(new Date(), 'yyyyMMdd'),
                    //         "RequestTime"     : getDatetimeByFormat(new Date(), 'HHmmss'),
                    //         "TransServiceCode": "arb.phonesingle.01.01"
                    //     }
                    // }
                    // AnyChatUtil.AnynetworkService(enterLineUrl,phoneSingleParams,(succ)=>{
                    //     console.warn("phonesingle返回：", JSON.stringify(succ));
                    //     let {MMID, MMDATE} = succ.data.Body
                    //     if(_this.state.callIng == '1'){
                            clearInterval(peopleLinetimerStatus);
                            clearInterval(peopleLinetimer);
                            router.load("tellerOperation",{
                                account:"liudabin",
                                // userflag:succ.data
                                // MMID:MMID,
                                // MMDATE:MMDATE,
                            });
                            _this.setState({
                                showLinkModel: '0',
                            });
                    //     }
                    // },(error)=>{
                    //     console.warn(' 失败' + error )
                    // })


                }, ( err )=>{
                    $Toast.info('呼叫视频服务失败')
                    console.warn('进线失败', err )
                    _this.unCallCount();
                });
            }, ( err )=>{
                $Toast.info('呼叫视频服务失败')
                console.warn( err )
                _this.unCallCount();
            });

    }
}

const styles = StyleSheet.create({
    showModel:{

    },
    unShowModel:{
        left:10000,
        backgroundColor:"#fff"
    },
    model:{
        position:"absolute",
        width:"100%",
        height:"100%",
        zIndex:40000000,
        backgroundColor:'rgba(0,0,0,0.8)',
        alignItems: 'center',
        paddingTop:'80%'
        // justifyContent:"space-around"
    },
    mengmengda:{
        width:"100%",
        height:'20%',
        position:"absolute",
        // backgroundColor:"#fff"
    },
    textBoxContent:{
        fontSize:15,
    },
    peopleContentBoxSelect:{
        padding:12,
        position:"absolute",
        left:86,
        bottom:40,
        zIndex:600,
        width:"57%",
        height:95,
        borderRadius:12,
        // borderBottomLeftRadius:0,
        backgroundColor:"#051F34"
    },
    peopleContentBox:{
        padding:12,
        position:"absolute",
        left:86,
        bottom:40,
        zIndex:600,
        width:"57%",
        // height:155,
        borderRadius:12,
        // borderBottomLeftRadius:0,
        backgroundColor:"#051F34"
    },
    FastEntryBox:{
        position:"relative",
        zIndex:1000
    },
    peopleBox:{
        width:100,
        height:100,
        position:"absolute",
        // left:-5,
        // bottom:-5
    },
    kefubg:{
        width:100,
        height:100,
        position:"absolute",
        left:-6,
        bottom:-45
    },
    smallCircle:{
        // width:80,
        // height:80,
        alignItems:'center',
        justifyContent: 'center',
        position:"absolute",
        zIndex:1000,
        // transform: [{skewY:'-13deg'}]
    },
    cloudDotsBox:{
        width:'100%',
        height:'100%'
        // height:500,
        // backgroundColor:"#000"
    },
    pageBox:{
        width:'100%',
        height:"100%",
        // position:"absolute",
        // zIndex:1000,
        // backgroundColor:"#000"
    },
    slippageModel:{
        width:"100%",
        height:'50%',
        top:'40%',
        // backgroundColor:"#fff",
        transform: [{skewY:'-12.7deg'}],
        position:"absolute",
        zIndex:300,
        
    },
    slippageModelTop:{
        width:"100%",
        top:30,
        height:'40%',
        position:"absolute",
        zIndex:300,
        // backgroundColor:"red",
        transform: [{skewY:'-12.7deg'}]
    },
    slippage:{
        width:"100%",
        height:'85%',
        position:"absolute",
        left:0,
        top:'1.8%',
        
        // paddingTop:60,
        zIndex:500,
        transform: [{skewY:'12.7deg'}]
        // backgroundColor:"#fff"
    }
})
