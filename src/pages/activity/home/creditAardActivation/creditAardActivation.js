import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, NativeModules, ScrollView, Keyboard, KeyboardAvoidingView, Easing, BVLinearGradient, Animated, Modal } from 'react-native';
import Header from '$/components/header'
import { BANK } from '../../imageSource/index'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import '@/window';
import scope from '$/scope'
import LinearGradient from 'react-native-linear-gradient'
const { formatMoney, checkValidity } = require('$/util/moneyutil')

// const  enterLineUrl = 'http://192.9.200.11:6030'//'http://192.168.31.31:4444' //'https://arcs.agree.cn:53073' 'http://192.9.200.57:4444',
const  enterLineUrl = 'http://192.168.31.31:6030'//'http://192.168.31.31:4444' //'https://arcs.agree.cn:53073' 'http://192.9.200.57:4444',
// const  enterLineUrl = 'http://192.168.60.150:10000'//'http://192.168.31.31:4444' //'https://arcs.agree.cn:53073' 'http://192.9.200.57:4444',
const AnyChat = NativeModules.AnyChatPlugin

var tI = null;//定时器
var peopleLinetimerStatus = null;
var peopleLinetimer = null;

module.exports = class transferInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    var omap = {};
        omap[this.props.navigation.state.routeName] = this;
        $.instanceList.push(omap);
    this.state = {
      lineStatus:'.',
      modelPeople:{//小萌萌
          height:0,
          bottom:60
      },
      transformRotate:0,//等待页面旋转角度
      showLinkModel:'0',
      userInfoData:{},//用户信息
    }
  }
  componentDidMount() {

    clearInterval(tI);
    clearInterval(peopleLinetimerStatus);
    clearInterval(peopleLinetimer)

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
  componentWillMount(){

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

  unCallCount(){
    clearInterval(tI);
    clearInterval(peopleLinetimerStatus);
    clearInterval(peopleLinetimer)
    
    let _this = this;
    AnyChat.quitLine((succ)=>{
        console.warn(succ)
    },( err )=>{
        console.warn(err)
    })
    AnyChat.loginOut(( succ )=>{
      console.warn('登出成功')
      _this.setState({
        showLinkModel: '0'
      });
        

      var initPeople = {
          height:0,
          bottom:60
      }
      _this.setState({
          modelPeople:initPeople
      });


    },( err )=>{
        console.warn('登出失败');
    });
  }
  
  callTellerOperation(){
      let _this = this

        clearInterval(tI);
        clearInterval(peopleLinetimerStatus);
        clearInterval(peopleLinetimer)
      
      tI = window.setInterval(function(){

          let transformRotateNew = _this.state.transformRotate-(-3);

          _this.setState({
              transformRotate: transformRotateNew,
          });

      },20);

     let defaultAction = [
            {
              text: '取消',
              onPress: () => {
              },
              style: 'default',
            },
            {
              text: '连线云柜员', onPress: () => {
                _this.setState({
                  showLinkModel: '1',
              });

              setTimeout(
                  () => { _this.peopleLine()},1000
              );

              _this.lineStatusTime();

              /**
               * @初始化 AnyChat
               * @author 卢鹏宇
               * @date 2019-09-04
               */
              AnyChat.init(( succ )=>{
                console.warn( succ )
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
                let params = {
                    enterLineUrl: enterLineUrl,
                    businessId: "XYKJH",
                    IDNO:window.idCard,
                    IDTYPE:'02',
                    IDNAME:window.userName
                }
                AnyChat.enterLine ( params, ( succ )=>{
                    console.warn( '进线成功回调='+ succ )
                    let params = [
                      {
                        FIELDCODE: 'CreditCardNo',
                        FIELDVALUE: '6224880005459999'
                      },
                    ]
                        router.load("tellerOperation",{
                          creaditCardInfo:params,
                        });
                        _this.setState({
                            showLinkModel: '0',
                        });
                }, ( err )=>{
                    // console.warn( err )
                });
            }, ( err )=>{
                // console.warn( err )
            });
              },
            }
          ];
          window.$Modal.confirm('提示','您的信用卡不支持在线激活，请您前往网点办理或者连线云柜员办理。',defaultAction)

  }

  componentWillUnmount(){
    AnyChat.loginOut(( succ )=>{
    },( err )=>{
        console.warn('登出失败');
    });
  }
  // 返回弹框
  backToHome(){
      router.back();
  }

  render() {
    return (
      <>
        <Header
          title={'信用卡激活'}
          // leftClick={this.back}
          leftClick={()=> {this.backToHome()}}
        ></Header>
        
          <View  style={{backgroundColor:'#F0EFF4', width:'100%', height:'100%'}}>
          <View style={{flexDirection:"row",marginTop:32,marginLeft:24,marginBottom:20,alignItems:"center"}}>
            <Text style={styles.Stance}></Text>
            <Text style={styles.title}>请确认您的未激活信用卡</Text>
          </View>
            <TouchableWithoutFeedback onPress={()=>{
              this.callTellerOperation()
            }}>
              <View style={{flexDirection:'row',paddingLeft:10, paddingRight:10, paddingTop:10, paddingBottom:10, backgroundColor:'#fff', width:'90%', height:80, marginLeft:'5%'}}>
                <Image source= {BANK} resizeMode={'contain'} style={{width:80, height:60}} ></Image>
                <View style={{paddingLeft:20, paddingTop:2}}>
                  <Text style={{fontSize:15, fontWeight:'bold'}}>6002 **** **** 3017</Text>
                  <Text style={{marginTop:10}}>赞卡通信用卡</Text>
                  
                </View>

        
                    <Text style={{borderRadius:5,position:"absolute",top:13,right:'5%',paddingTop:2,paddingBottom:2,paddingLeft:8,paddingRight:8,borderWidth:1,borderColor:$globalStyle.backgroundColor,color:$globalStyle.backgroundColor}}>主卡</Text>
           
                
              </View>
              
            </TouchableWithoutFeedback>
          </View>
        
          {/* <View style={[styles.model,this.state.showLinkModel==='1'?styles.showModel:styles.unShowModel]}>
              <Text style={{color:"#fff"}}>正在连线...</Text>
          </View> */}
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
      </>
    )
  }

}

const styles = StyleSheet.create({
  showModel:{

  },
  Stance:{
    width:2,
    height:14,
    backgroundColor:"#000",
    marginRight:8
  },
  title:{
    color:'#000',
    fontSize:15,
    fontWeight:"bold"
  },
  unShowModel:{
      left:10000,
      backgroundColor:"#000"
  },
  model:{
    position:"absolute",
    width:"100%",
    height:"100%",
    zIndex:4000000,
    paddingTop:'80%',
    backgroundColor:'rgba(0,0,0,0.9)',
    alignItems: 'center',
    // justifyContent:"space-around"
  },
})
