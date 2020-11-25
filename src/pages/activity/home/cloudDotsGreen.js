// 云网点首页(绿色版)
/*
    dis:云网点首页, 球状阵列3D动画
    author:liuxiaobin
*/
import React, { Component } from 'react';
import { StyleSheet,TouchableWithoutFeedback, NativeModules ,View, Image, Text, PixelRatio, Dimensions, Keyboard,ImageBackground,PanResponder,DeviceEventEmitter } from 'react-native';
import Header from "$/components/header"
const router = require('$/router-control')
import scope from '@/scope'
import { WebView } from "react-native-webview";


var ico1 = require('$image/cloudTeller/people0.png')

var itemBg = require('$image/cloudTeller/itemBg.png');
var itemBgYellow = require('$image/cloudTeller/itemBgYellow.png');

const AnyChat = NativeModules.AnyChatPlugin
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
var amVAR = {};
var tI = null;//定时器
var peopleLinetimerStatus = null;
var peopleLinetimer = null;

// const { StatusBarManager } = NativeModules;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let urlWebView = `http://${window.financialURL}/swiper3D/index.html`
// const  enterLineUrl = 'http://192.168.31.177:10000/bcss/pierce'
// const  enterLineUrl = 'http://192.9.200.11:6030'
const  enterLineUrl = 'http://192.168.31.31:6030'
// const  enterLineUrl = 'http://192.168.31.177:10000/bcss/pierce'
// const  enterLineUrl = 'http://192.9.200.57:4444'
// const enterLineUrl = 'http://192.168.187.76:10000/bcss/pierce'
//'http://192.168.31.31:4444' //'https://arcs.agree.cn:53073' 'http://192.9.200.57:4444',
// const  enterLineUrl = 'http://192.168.60.150:10000'//'http://192.168.31.31:4444' //'https://arcs.agree.cn:53073' 'http://192.9.200.57:4444',

const clickInex = '';
let timer = 25;

module.exports = class cloudDots extends Component<{}> {
    constructor(props) {
        super(props);
        scope(this);

        var paramString = '?param='
        if(this.props.navigation.state.params == 1){
            paramString = paramString+'1'
        }else if(this.props.navigation.state.params == 2){
            paramString = paramString+'2'
        }else if(this.props.navigation.state.params == 0){
            paramString = paramString+'0'
        }else{
            paramString = paramString+'0'
        }
        // console.log(this.props.navigation.state.params)
        urlWebView +=  paramString;
        console.log(urlWebView)

        var enterArr = [
            {
                name:'卡挂失',
                path:''
            },
            {
                name:'密码重置',
                path:''
            },
            {
                name:'理财购买',
                path:''
            },
            {
                name:'卡激活',
                path:''
            },
            {
                name:'综合签约',
                path:''
            },
            {
                name:'预约网点',
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
        ]


        this.state = {
            lineStatus:'.',
            modelPeople:{//小萌萌
                height:0,
                bottom:60
            },
            transformRotate:0,//等待页面旋转角度
            userInfoData:{},//用户信息
            showAllModel:'0',//是否显示所有蒙层,0不显示,1显示
            showLinkModel:'0',//是否选中连接蒙层,0不显示,1呼叫柜员
            callIng:'0',//是否正在呼叫, 0未呼叫,1呼叫中
            showRightIco:false,//是否显示右侧更多
            counter:{
                left:-5,
                bottom:-5000
            },
            roomState:false,
        }

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
                        });
                        _this.peopleLine() 
                    },800
                );
            }else{
                initPeople.height = initPeople.height-(-1)
                initPeople.bottom = 60-initPeople.height/2
                _this.setState({
                    modelPeople:initPeople
                });
            }

        },3);

    }

    //动画人物跳出来
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
            let newCounterBottom = _this.state.counter.bottom;
            newCounterBottom = Number(Number(newCounterBottom) + Number(thisT));
            thisT = thisT+0.3;
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

        },5);
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


    }


    observer() {
        let oMap = {}
        for (let pop in amVAR) {
            oMap[pop] = amVAR[pop]
        }
        this.setState(oMap, () => {

        })
    }

    changeCurPage(event){
        this.callCountModel(event.nativeEvent.data)
        // this.setState({
        //     clickInex:event.nativeEvent.data
        // },()=>{
        //     this.callCountModel()
        // })
    }

    render() {
        return (
            <View style={[styles.cloudDotsBox,{height:screenHeight,backgroundColor:"#01081F"}]}>
                <ImageBackground resizeMode={'contain'} source={require('$image/cloudTeller/homebg.png')} style={{ width: '100%',height:"100%"}}>
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
                            <WebView
                                style={styles.webview}
                                useWebKit={false}
                                source={{ uri: urlWebView }}
                                javaScriptEnabled={true}
                                onError={this.renderError}

                                onMessage={(event) => { this.changeCurPage(event) }}
                            />
                        </View>
                        {/* 萌萌哒小客服 */}
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
                                {/* <View style={{width:'10%',height:"10%"}}> */}
                                    <View style={{width:86,height:120,position:"absolute",top:0,zIndex:10}}>
                                        {/* <Image style={{width:86,height:120,position:"absolute",bottom:0}} resizeMode="cover" source={require('$image/cloudTeller/peopleUpBig.png')} /> */}
                                        <Image style={{width:86,height:120,position:"absolute",bottom:0}} resizeMode="cover" source={require('$image/cloudTeller/counterLine.png')} />
                                    </View>
                                    {/* <View style={{width:86,height:120,position:"absolute",top:0,zIndex:11}}>
                                        <Image style={{width:86,height:this.state.modelPeople.height,position:"absolute",bottom:this.state.modelPeople.bottom}} resizeMode="cover" source={require('$image/cloudTeller/peopleUpBig.png')} />
                                    </View> */}
                                    <View style={{width:86,height:this.state.modelPeople.height,position:"absolute",top:0,zIndex:11,overflow:"hidden"}}>
                                        <Image style={{width:86,height:120}} resizeMode="cover" source={require('$image/cloudTeller/peopleUpBig.png')} />
                                    </View>
                                    
                                {/* </View> */}


                                <View style={{width:120,height:120}} ></View>
                                <Text style={{color:"#fff",textAlign:"center",marginTop:10}}>正在连线{this.state.lineStatus}</Text>
                                <Text style={{color:"#1470E8",marginTop:100,paddingTop:8,paddingBottom:8,paddingLeft:10,paddingRight:10,backgroundColor:"#021626",borderRadius:10}} onPress={() => {
                                            // this.props.navigation.navigate("tellerOperation",{
                                            //     account:"liudabin",
                                            // });
                                            this.unCallCount()
                                        }}>取消连线</Text>
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
                                        }} style={{color:"#C9CE07", textDecorationLine: 'underline',textDecorationStyle: 'dashed',textDecorationColor: '#FFC911'}}>取消连接</Text></Text>
                                </View>
                            </View>

                            {/* 默认弹框 */}
                            <View style={[styles.peopleContentBox,{flexDirection: 'column', alignItems: 'center'},this.state.showLinkModel==='0'&&this.state.showAllModel === "1"?styles.showModel:styles.unShowModel]}>
                                <View style={[styles.textBox,{zIndex:1200}]}>
                                    <Text  style={[styles.textBoxContent,{color:'#2A90EE'}]}>您好,{this.state.userInfoData.cnName}先生,我是远程柜员小赞.请选择以上业务类型,可与我快速视频连接办理哦~如果没有您想要办理的业务,请<Text style={{color:"#FFC911", textDecorationLine: 'underline',textDecorationStyle: 'dashed',textDecorationColor: 'FFC911'}} onPress={() => {
                                            this.setState({
                                                showLinkModel: '2',
                                            });

                                        }}>点击这里</Text></Text>
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
                                            this.callCountModel()
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
                                            // this.callCount()
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
                {/* <ImageBackground source={require('$image/cloudTeller/homebg.png')} style={{ width: '100%', height: '100%' }}></ImageBackground> */}
            </View>
        );
    }

    unCallCount(){
        let _this = this;

        clearInterval(tI);
        clearInterval(peopleLinetimerStatus);
        clearInterval(peopleLinetimer)
        
        _this.setState({
            callIng: '0',
        });
        _this.setState({
            showLinkModel: '0',
        });
        
        clearInterval(peopleLinetimerStatus);
        var initPeople = {
            height:0,
            bottom:60
        }
        _this.setState({
            modelPeople:initPeople
        });

        // AnyChat.loginOut(( succ )=>{
        //     // console.warn( '销毁后=' + succ );
        // },( err )=>{
        //     // console.warn();
        // });
        if( _this.state.roomState ){
            AnyChat.quitLine((succ)=>{
                console.warn(succ)
            },( err )=>{
                console.warn(err)
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
    // 呼叫柜员弹框
    callCountModel( index ){
        let _this = this;
        let defaultAction = [
            {
              text: '取消',
              onPress: () => {

              },
              style: 'default',
            },
            {
              text: '确定', onPress: () => {
                _this.callCount( index );
              },
            }
        ];
      window.$Modal.confirm('呼叫柜员','确认呼叫远程柜员吗?',defaultAction)
    }
    // 呼叫柜员
    callCount( index ) {
        clearInterval(tI);
        clearInterval(peopleLinetimerStatus);
        clearInterval(peopleLinetimer)

        let _this = this;
        setTimeout(
            () => { _this.peopleLine() },1000
        );
        _this.lineStatusTime()

        tI = window.setInterval(function(){

            let transformRotateNew = _this.state.transformRotate-(-3);

            _this.setState({
                transformRotate: transformRotateNew,
            });

        },20);

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
            console.log('succ', succ)
             _this.setState({
                roomState:true
            })
            // console.warn( succ )
             /**
             * @ AnyChat 进线
             * @author 卢鹏宇
             * @date 2019-09-05
                enterLineUrl: 'https://arcs.agree.cn:53073',
             * @params enterLineUrl ：URL 192.168.31.31
             * @params businessId ： 业务类型
             */

            let businessId = ''
            switch ( index ) {
                case '0' :
                    businessId = 'LCZX' //理财咨询
                    break;
                case '1' :
                    businessId = 'MMCZ' // 密码重置
                    break;
                case '2' :
                    businessId = 'YHKGS' // 卡挂失
                    break;
                default:
                    break;
            }

            let params = {
                enterLineUrl: enterLineUrl,
                businessId: businessId,
                IDNO:this.state.userInfoData.idCard,
                IDTYPE:'02',
                IDNAME:window.userName
            }
            console.log('params', params)
            AnyChat.enterLine ( params, ( succ )=>{
                console.warn( '进线成功回调='+ succ )
                if(_this.state.callIng == '1'){
                    router.load("tellerOperation",{
                        account:"liudabin",
                    });
                    _this.setState({
                        showLinkModel: '0',
                    });
                }
            }, ( err )=>{
                $Toast.info('呼叫视频服务失败')
                console.warn('进线失败', err )
                _this.unCallCount();
            });
        }, ( err )=>{
            console.warn('init失败', err )
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
        position:"absolute"
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
        height:300,
        top:300,
        position:"absolute",
        zIndex:300,
    },
    slippageModelTop:{
        width:"97%",
        top:30,
        height:300,
        position:"absolute",
        zIndex:300,
    },
    slippage:{
        width:"100%",
        height:'65%',
        position:"absolute",
        // left:24,
        top:60,
        // paddingTop:60,
        zIndex:500,
        // transform: [{skewY:'12.7deg'}]
        // backgroundColor:"#fff"
    },
    webview: {
        backgroundColor: "#051F34"
    }
})
