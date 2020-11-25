// 云网点
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, PixelRatio, Dimensions, ImageBackground, Image, ScrollView, TouchableWithoutFeedback, NativeModules, NativeEventEmitter } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import AnyChatView from '$/components/AnyChat/RNPlayViewManager';

import PageNode from './pageNode';
import PageData from './pageData';
import ReportLossPassword from './elasticFrame/reportLoss/enterPassword'
import ManageMoneyPassword from './elasticFrame/manageMoney/manageMoneyPassword'
//系统推送
import PushNotification from 'react-native-push-notification';
import { _downloadFile } from '$/util/RNFSUtils'

const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);

import scope from '@/scope';
import '@/window';
const AnyChatUtil = require('$/util/anyChatUtil');
const NetWorkUtil = require('$/util/networkutil');
const DeviceUtil = require("$/util/deviceutil");
const router = require('$/router-control');
import { AUDIO, OFFAUDIO, VIDEO, OFFVIDEO } from './elasticFrame/imageSource/imageSource';

const tokenutil = require('$/util/tokenutil');
const { getTimespamp, getDatetimeByFormat } = require('$/util/dateutil');

import RNFS from 'react-native-fs';

const AnyChat = NativeModules.AnyChatPlugin;
// const url = 'https://arcs.agree.cn:53073'
// const AnyChatUrl = 'http://192.168.31.177:4444';
const AnyChatUrl = 'http://192.9.200.46:6030';
// const AnyChatUrl = 'http://192.9.200.11:6030';
// const AnyChatUrl = 'http://172.172.18.118:6030';
// const AnyChatUrl = 'http://192.168.1.106:6030';
// const AnyChatUrl = 'http://58.23.208.52:6030';
// const AnyChatUrl = 'http://192.168.31.31:6030';
// const AnyChatUrl = 'http://192.168.60.150:10000';
const NetWorkUrl = '/bcss/pierce';
// const url = 'http://192.9.200.57:4444';

// window.$globalVideoState = '';
// window.$globalVideoRouter = '';

/**
 * @接受推送信息
 * @author 卢鹏宇
 * @date 2019-09-29
 * @param { type } 当前页面语音框类型，1 黑色警告框， 2 用户对话框， 3 柜员带点击查看对话框
 * @param { info } 提示语
 * @param { pageName } 子页面
 * @returns
 */

const TELLERLIST = {
    'VerifyCustId_1':{
        type:'3',
        isSure: true,
        info:'test',
        pageName:'test',
    },
    'test':{
        type:'3',
        isSure: false,
        info:'test',
        pageName:'test',
    },
    //对私开户 -- 可开卡片选择
    'ChooseCardType_2':{
        type:'3',
        isSure: false,
        info:'请您确认银行卡种类',
        pageName:'chooseCardType',
        seeInfo:'查看银行卡种类'
    },
    //对私开户 -- 签约信息录入
    'SignInformConfirm_1':{
        type:'3',
        isSure: false,
        info:'请您确认签约种类',
        pageName:'signInformConfirm',
        seeInfo:'查看签约种类'
    },
    'CheckShortCode':{
        type:'3',
        isSure: false,
        info:'请您确认短信验证码',
        pageName:'shortMessageVerification',
    },
    //对私开户 -- 查询密码设置
    'SetQueryPwd_1':{
        type:'3',
        isSure: true,
        info:'请设置查询密码',
        pageName:'setQueryPwd',
        // seeInfo:''
    },
    'Commit_1':{
        type:'3',
        isSure: true,
        info:'请您确认业务信息',
        pageName:'infoConfirm',
        seeInfo:'查看业务信息'
    },
    'CustInformConfirm_1':{
        type:'3',
        isSure: true,
        info:'请您确认个人信息',
        pageName:'infomationVoucher',
        seeInfo:'查看个人信息'
    },

    'RiskAss_1':{
        type:'3',
        isSure: false,
        info:'请您确认风险评估题目',
        pageName:'riskAssessment',
        // seeInfo:'查看题目'
    },
    'AssRes_1':{
        type:'3',
        isSure: false,
        info:'请您确认风险评估结果',
        pageName:'riskAssessmentSuccess',
        // seeInfo:'查看个人结果'
    },
    
    'ConfirmProtocol_1':{
        type:'3',
        isSure: false,
        info:'请您确认用户协议',
        pageName:'ProtocolAgreement',
        seeInfo:'查看用户协议'
    },
    
    'RecordSpeech_1':{
        type:'3',
        isSure: true,
        info:'请您朗读标准话术',
        pageName:'RecordSpeech',
        // seeInfo:'查看用户协议'
    },
    
    'ScreenSign_1':{
        type:'3',
        isSure: false,
        info:'请您签字确认',
        pageName:'signatureConfirmation',
        // seeInfo:'查看用户协议'
    },



    // 挂失 -- 卡信息确认
    'AccountListSelection_1':{
        type:'3',
        isSure: true,
        info:'请您确认挂失银行卡信息',
        pageName:'reportLoss',
        seeInfo:'查看挂失银行卡信息'
    },
    // 挂失 -- 协议确认
    'AcceptAgreement_2':{
        type:'3',
        isSure: false,
        info:'请您确认用户协议',
        pageName:'ServiceAgreement',
        seeInfo:'查看用户协议'
    },
    // 挂失 -- 输入密码
    'SetPassword_1':{
        type:'3',
        isSure: false,
        info:'请输入取款密码',
        pageName:'enterPassword',
        seeInfo:''
    },
    // 密码重置 -- 密码确认
    // 'ReadCustIdNo_1':{
    //     type:'3',
    //     isSure: false,
    //     info:'请您确认身份证信息',
    //     pageName:'authentication',
    //     seeInfo:'查看身份证信息'
    // },
    'ReadCustIdNo_1':{
        type:'3',
        isSure: false,
        info:'请您确认身份证信息',
        // pageName:'idConfirm',
        pageName:'idAuth',
        // seeInfo:'查看身份证信息'
    },
    'MessageLink_1':{
        type:'3',
        isSure: true,
        info:'请您确认链接信息',
        pageName:'webViewPage',
        seeInfo:'查看链接信息'
    },
    'ReadTOutBankCard_1':{
        type:'3',
        isSure: false,
        info:'请您确认银行卡信息',
        pageName:'bankCardConfirm',
        seeInfo:'查看银行卡信息'
    },

    'CustInformGather_1':{
        type:'3',
        isSure: true,
        info:'请您确认个人信息',
        pageName:'infomationVoucher',
        seeInfo:'查看个人信息'
    },
    'CustInformGather_2':{
        type:'3',
        isSure: true,
        info:'请您确认个人信息',
        pageName:'userConfirmation',
        seeInfo:'查看个人信息'
    },
    // 密码重置 -- 银行卡信息确认    
    'QueryCardList_1':{
        type:'3',
        isSure: true,
        info:'请您确认要重置密码的银行卡信息',
        pageName:'bankCardConfirmation',
        seeInfo:'查看信息'
    },
    // 密码重置 -- 密码更改
    'SetPwd_1':{
        type:'3',
        isSure: true,
        info:'请您输入新的密码',
        pageName:'passWordConfirmation',
        seeInfo:''
    },
    // 信用卡激活 -- 卡号填写
    'ReadCreditCard_1':{
        type:'3',
        isSure: false,
        info:'请输入信用卡信息',
        pageName:'cardInfoSub',
        seeInfo:''
    },
    // 信用卡激活 -- 输入安全信息
    'SetQueryPwd_Credit_1':{
        type:'3',
        isSure: true,
        info:'请设置信用卡查询密码',
        pageName:'cardPassword',
        seeInfo:''
    },
    // 信用卡激活 --交易密码
    'SetTransPwd_Credit_1':{
        type:'3',
        isSure: true,
        info:'请设置信用卡交易密码',
        pageName:'transactionPassword',
        seeInfo:''
    },
    // 信用卡激活 -- 输入安全信息
    'ConfirmCreditCardInfo_1':{
        type:'3',
        isSure: true,
        info:'请确认激活信用卡信息',
        pageName:'creditCardInfo',
        seeInfo:'点击查看'
    },
    // 理财产品列表
    'QueryFinalPros_2':{
        type:'3',
        isSure: true,
        info:'请您仔细阅读理财产品信息',
        pageName:'manageMoneyList',
        seeInfo:'查看产品信息'
    },
    // 理财产品列表
    'FncTria_1':{
        type:'3',
        isSure: true,
        info:'请您查看理财产品预期收益试算结果',
        pageName:'purchaseTrial',
        seeInfo:'查看信息'
    },
    // 理财产品列表
    'ConfirmProducts_2':{
        type:'3',
        isSure: true,
        info:'请您确认购买理财产品信息',
        pageName:'manageMoneyInfo',
        seeInfo:'查看信息'
    },
    // 理财 卡 （折） 确认
    'SelectAccType_1':{
        type:'3',
        isSure: true,
        info:'请您确认购买理财产品银行卡信息',
        pageName:'bankCardInfo',
        seeInfo:'点击查看'
    },
    // 理财 卡 （折） 确认
    'CheckPwd_1':{
        type:'3',
        isSure: false,
        // info:'请您确认信息并输入取款密码',
        info:'请输入取款密码',
        pageName:'manageMoneyPassword',
        seeInfo:''
    },
    // 物流快递
    'ChooseSendCardWay_1':{
        type:'3',
        isSure: true,
        info:'已为您选择领卡方式为物流快递',
        pageName:'logistics',
        seeInfo:'点击查看'
    },
    // 物流快递
    'ChooseSendCardWay_2':{
        type:'3',
        isSure: true,
        info:'已为您选择领卡方式为银行网点自取',
        pageName:'Dot',
        seeInfo:'点击查看'
    },
    // 结束 实物交割 -- 结束实物交割
    'TakeNotes_2':{
        type:'3',
        isSure: true,
        info:'请持本凭条到交割设备或者柜台进行实物交割，如有疑问可咨询现场工作人员',
        pageName:'QRCode',
        seeInfo:'查看凭条'
    },
    
    
}


var amVAR = {};
var { height } = Dimensions.get('window');

module.exports = class cloudDots extends Component<{}> {
    constructor(props) {
        super(props);

        scope(this);
        var omap = {};
        omap[this.props.navigation.state.routeName] = this;
        $.instanceList.push(omap);

        this.state = {
            userInfoData:{},//用户信息
            headerAn: true,     //展示全屏
            frameHomeShow: false, //是否展示弹框(实际使用时,子组件通过回调函数,改它来实现隐藏弹框)
            nowPages: require('./elasticFrame/PerlOpenAcct/signInformConfirm'), //当前弹框内的子页面
            enterPassword:false, // 挂失弹窗
            manageMoneyPassword:false, //理财输入密码弹窗
            messageOne: true,//展示产品介绍说明
            frameHomeEnd:true,//评价信息
            allPages: PageNode,
            allData: PageData,
            reportLossWarehouse:'',//储存挂失推送返回参数
            count: 0, //定时器从零开始
            countTotal:10, // 定时器运行10s end
            countOff:false, //定时器开关 ，默认为false
            tellerList:[],//柜员推送消息列表 1 柜员 2用户 {type:'1',text:'温馨提醒：请您确认是本人办理业务，办理过程中请注意周围环境安全。'}
            audioState: true, //默认音频状态
            videoState: true, //默认视频状态
            viewWidth:'100%',
            boyWidth:60,
            fullScreenHeight:835,
            fullScreenWidth:393,
            viewHeight:'100%',
            agentWindowWidth:'100%',
            viewOpacity:0,
            btnState:false,//子页面的按钮状态
            firstShowVideo:true,
            // putScreenHeight:"100%",
            putScreenStatus:false,
            putScreenOpacity:0,
            viewRight:'100%',
            viewBigOpacity:1,
            viewData:'',//子页面数据
            AGENTNAME:'',//柜员姓名
            AGENTID:'1001',//柜员号
            userInfoList:{},//用户信息储存
            showInfo:false,//安全提示及柜员号显示
            connectTime:'',//柜员接通时间
            creditCardParams:'',//信用激活信息提交
            manageMoneyIndex:'',//信用卡页面隐藏显示标识
            lastNodeName:'',//上一个页面的节点名称
            inputValue:'',
            PerlOpenAcctSTATE:true,
            OpenDepositReceiptSTATE:true,
            PerlCustInfoUpdateSTATE:true,
            PerlPwdManageSTATE:true,
            GSSTATE:true,
            XYKSTATE:true,
            MMCZSTATE:true,
            LCZXSTATE:true,
            RiskAssmtSTATE:true,
            AuthEnTiCationSTATE:true,
            chatBoxPlace:-999,
            MMDATE:"",
            MMID:"",
            USERFLAG:""
        };

        this.RecivedPushNotification = this.RecivedPushNotification.bind(this);

    }


    observer() {
        let oMap = {}
        for (let pop in amVAR) {
            oMap[pop] = amVAR[pop]
        }
        this.setState(oMap, () => {

        })
    }

    /**
     * @确认按钮
     * @author 卢鹏宇
     * @date 2019-09-23
     * @param { type } 确认按钮所属子页面 根据类型传值不通，
     * @param { value } 传参
     * @param { promptInfo } 成功提示信息
     * @returns
     */
    async enterReportLoss( type , value, promptInfo ){
        let _this = this
        let info = _this.state.reportLossWarehouse;
        let params = {
            "Body": {
                "FLOWID": info.commandParameters.FLOWID,
                "TASKID":info.commandParameters.TASKID,
                "NODEID":info.commandParameters.NODEID,
                "BUSISTEP":info.commandParameters.BUSISTEP,
                "MMDATE":info.commandParameters.MMDATE,
                "MMID":info.commandParameters.MMID,
                "FILEINDXNO":info.commandParameters.FILEINDXNO,
                "NODENAME":info.commandParameters.NODENAME,
                "MESSAGETYPE":"0004",
                "FLOWNAME": info.commandParameters.FLOWNAME,
                "PAGETYPE": info.commandParameters.PAGETYPE || "",
                "PUSHDATA":{},
            },
            "Head": {
                "ConsumerId"      : "C002",
                "ConsumerSeqNo"   : getTimespamp(new Date()),//时间戳  当前时间
                "RequestDate"     : getDatetimeByFormat(new Date(), 'yyyyMMdd'),
                "RequestTime"     : getDatetimeByFormat(new Date(), 'HHmmss'),
                "TransServiceCode": "submittask_esb"
            }
        }
        if(type == 'pushMessage' || type == 'message'){
            params.Head.TransServiceCode = 'pushmessage02_esb';
            params.Body.PUSHDATA = [{
                FIELDCODE: "ERRORCODE",
                FIELDVALUE: "000000"
            },{
                FIELDCODE: "ERRORMSG",
                FIELDVALUE: value || "确认提交"
            }]
        }
        if(type == "submitTask"){
            params.Body.PUSHDATA = value;
        } 
        if(type == "uploadImg"){
            _this.uploadImg(value)
            return
        } 
        if( type == 'password' || type == 'manageMoneyPassword' ){
            params.Body.PASSWORD = value;
        } 
        if( type == 'repeatPassword'  ){
            params.Body.PUSHDATA = [{
                FIELDCODE: "SETPINBLOCK",
                FIELDVALUE: value
            },{
                FIELDCODE: "ReturnCode",
                FIELDVALUE: "000000"
            },{
                FIELDCODE: "ReturnMessage",
                FIELDVALUE: "交易成功"
            }]
        }
        if( type == 'cardInfoSub' || type == 'manageMoneyBank' ){
            params.Body.PUSHDATA = value
        }
        if(  type == 'monetary' ){
            params.Body.PUSHDATA = value
            params.Head.TransServiceCode = 'pushmessage02_esb';
        }
        if( type == 'cardPassword' ){
            params.Body.BUSISTEP = info.commandParameters.BUSISTEP+'_save'
            params.Body.PUSHDATA = value
            params.Head.TransServiceCode = 'pushmessage02_esb';
        }
        if(  type == 'manageMoneyInfo'  ){
            params.Head.TransServiceCode = 'pushmessage02_esb';
        }
        // console.warn( (JSON.stringify(params)) )
        AnyChatUtil.AnynetworkService( AnyChatUrl, params, ( succ )=>{
            console.warn( '成功' + JSON.stringify(succ) );
            if( promptInfo ){
                _this.addTellerList(2,promptInfo);
            }
            _this.closeHome();
            _this.setState({
                enterPassword:false,
                manageMoneyPassword:false
            })
            
        }, ( err )=>{
            console.warn(' 失败' + err )
        })
    }

    async uploadImg(value){
        let _this = this
        let info = _this.state.reportLossWarehouse;
        let params = {
            "Body": {
                "FLOWID": info.commandParameters.FLOWID,
                "TASKID":info.commandParameters.TASKID,
                "NODEID":info.commandParameters.NODEID,
                "BUSISTEP":info.commandParameters.BUSISTEP,
                "MMDATE":info.commandParameters.MMDATE,
                "MMID":info.commandParameters.MMID,
                "NODENAME":info.commandParameters.NODENAME,
                "FILEINDXNO":info.commandParameters.FILEINDXNO,
                "MESSAGETYPE":"0004",
                "FLOWNAME": info.commandParameters.FLOWNAME,
                "ReqStruct":[{
                    "BASE64FILE": await _this.getImageBase64(value[0]),
                    "FILEKIND": "01",
                    "FILESUBKIND": "1",
                    "PNGTYPE": "02"
                },{
                    "BASE64FILE": await _this.getImageBase64(value[1]),
                    "FILEKIND": "01",
                    "FILESUBKIND": "2",
                    "PNGTYPE": "02"
                }],
            },
            "Head": {
                "ConsumerId"      : "C002",
                "ConsumerSeqNo"   : getTimespamp(new Date()),//时间戳  当前时间
                "RequestDate"     : getDatetimeByFormat(new Date(), 'yyyyMMdd'),
                "RequestTime"     : getDatetimeByFormat(new Date(), 'HHmmss'),
                "TransServiceCode": "filebase64notice_esb"
            }
        }
        AnyChatUtil.AnynetworkService( AnyChatUrl, params, ( succ )=>{
            console.warn( 'uploadImg成功' + JSON.stringify(succ) );
        }, ( err )=>{
            console.warn(' uploadImg失败' + err )
        })
    }
    
    sendOnlineMessageToAgent(message){
        let msg = {
            commandType: "sendOnlineMessage",
            content: message
        }
        AnyChat.transBuffer(JSON.stringify(msg),()=>{
            console.warn("发送消息成功");
        },()=>{
            console.warn("发送消息失败");
        })
    }

    // 关闭子页面弹窗
    closeHome( type ){
        this.setState((previousState) => {
            return ({
                frameHomeShow: false,
                btnState:true,
            })
        });
    }

    editManageMoneyIndex( index ){
        this.setState((previousState) => {
            return ({
                manageMoneyIndex: index,
            })
        });
        console.warn(this.state.manageMoneyIndex)
    }

    /**
     * @弹出子页面
     * @author 卢鹏宇
     * @date 2019-09-23
     * @param {*} msg
     * @param { id }  需打开的页面
     * @param { type }  是否点击查看
     * @param { data }  打开页面传入数据
     */
    callBackHome( id , type , data ) {
        let _this = this;
        let allPages = _this.state.allPages
        //关闭弹框
        _this.setState((previousState) => {
            return ({
                frameHomeShow: false
            })
        });
        if( type == 1 ){
            _this.setState((previousState) => {
                return ({
                    btnState: false
                })
            });
            allPages.map((item, index) => {
                if (allPages[index].id == id){
                     //打开第二个页面
                    if( id == 'ServiceAgreement' ){
                        _this.setState((previousState) => {
                            return ({
                                nowPages: _this.state.allPages[index].file,
                                btnState: false,
                            })
                        })
                    }else if( id == 'enterPassword' ){
                        //  确认信息并输入密码页面，密码节点并没有返回确认信息，传入确认信息页面返回值。
                        _this.setState((previousState) => {
                            return ({
                                nowPages:_this.state.allPages[index].file,
                                btnState: false,
                                viewData:_this.state.userInfoList['reportLoss']
                            })
                        })
                    } else if(   id == 'monetary'  ){ //id == 'productIntroduction' ||
                        _this.setState((previousState) => {
                            return ({
                                nowPages: _this.state.allPages[index].file,
                                btnState: false,
                                viewData: data
                            })
                        })
                    }else{
                        _this.setState((previousState) => {
                            return ({
                                nowPages: _this.state.allPages[index].file,
                                btnState: false,
                                viewData:_this.state.userInfoList[id]
                            })
                        })
                    }
                }
            })
        }else{
            _this.setState((previousState) => {
                return ({
                    btnState: true
                })
            });
            allPages.map((item, index) => {
                if (allPages[index].id == id){
                    if( id == 'productIntroduction'   ){
                        _this.setState((previousState) => {
                            return ({
                                nowPages: _this.state.allPages[index].file,
                                btnState: false,
                                viewData: data
                            })
                        })
                     }else if(Object.keys(JSON.parse(PageData)).includes(id)){
                        _this.setState((previousState) => {
                            return ({
                               nowPages: _this.state.allPages[index].file,
                               viewData: JSON.parse(_this.state.allData)[id],
                            })
                        });
                     }else{
                         //打开第二个页面
                         _this.setState((previousState) => {
                             return ({
                                nowPages: _this.state.allPages[index].file,
                                //  manageMoneyIndex: manageMoneyIndex ? manageMoneyIndex:0
                             })
                         });
                     }
                }
            })
        }
        //打开弹框
        _this.setState((previousState) => {
            return ({
                frameHomeShow: true
            })
        });
    }


    /**
     * @挂失输入交易密码弹窗
     * @author 卢鹏宇
     * @date 2019-10-21
     */
    callReportLossPage(){
        let _this = this;
        _this.setState({
            frameHomeShow: false,
            btnState:true,
            enterPassword:true
        })
    }
    callManageMoneyPage(){
        let _this = this;
        _this.setState({
            frameHomeShow: false,
            btnState:true,
            manageMoneyPassword:true
        })
    }

    // setPutScreenSize(){
    //     let boxHeight = (parseInt( Dimensions.get('window').height ) - 230)
    //     let boxWidth = parseInt( Dimensions.get('window').width )
    //     if(boxWidth*1200/695 > boxHeight){

    //     }
    // }

    componentDidMount() {
        let _this = this
        //获取用户偏好数据
        $Storage.load({
            key: 'userInfo'
        }).then(result => {
            var userInfo = JSON.parse(result);

            console.log('用户信息result', userInfo)
            _this.setState((previousState) => {
                return ({
                    userInfoData: userInfo,
                })
            });
        });
        
        this.recognizerEventEmitter = new NativeEventEmitter(AnyChat);
        this.recognizerEventEmitter.addListener('RecivedPushNotification', this.RecivedPushNotification);
        this.setState({
            viewHeight:parseInt( Dimensions.get('window').height ) - 230,
            fullScreenHeight:parseInt( Dimensions.get('window').height ),
            fullScreenWidth:parseInt( Dimensions.get('window').width ),
        })
        // this.setPutScreenSize()
        let creditCardParams = router.getParams('creaditCardInfo');
        // let creditCardParams  = [
        //     {
        //       FIELDCODE: 'CreditCardNo',
        //       FIELDVALUE: '6224880005459999'
        //     }
        //   ]
        console.log("信用卡信息：", creditCardParams);
        
        if( creditCardParams ){
            this.setState({
                creditCardParams:creditCardParams
            })
        }
        // _this.addTellerList(3,'我已修改密码',false,'')
        
        // _this.callBackHome('passWordConfirmation')
        // 测试用，跳过登录 start
        // AnyChat.init((succ) => {
        //     console.warn(succ)
        //     /**
        //     * @AnyChat 进线
        //     * @author 卢鹏宇
        //     * @date 2019-09-05
        //         enterLineUrl: 'https://arcs.agree.cn:53073',
        //     * @params enterLineUrl ：URL 192.168.31.31
        //     * @params businessId ： 业务类型
        //     */
        //     let params = {
        //         enterLineUrl: 'http://192.168.31.31:4444',
        //         businessId: "",

        //     }
        //     AnyChat.enterLine(params, (succ) => {
        //         console.warn('进线成功回调=' + succ)
        //     }, (err) => {
        //         // console.warn( err )
        //     });
        // }, (err) => {
        //     $Toast.info( '连接失败，即将关闭当前窗口。', 2, () => {
        //         // router.replace('evaluate');
        //     });
        // });
    //     // 测试用，跳过登录 end
        let eventData = {
            "commandParameters": {
              "COMPRATE": "18.18",
              "RequestTime": "112415",
              "FILEINDXNO": "C002_202011060000012586",
              "MMDATE": "20201106",
              "AGENTID": "UM-001",
              "FLOWID": "PersOpenAcct",
              "NODEID": "VerifyCustId",
              "AGENTNAME": "UM-001",
              "NODENAME": "客户身份核身",
              "FLOWNAME": "个人开户",
              "SHOWINIT": [],
              "TASKID": "20201106000000001409",
              "RequestDate": "20201106",
              "ConsumerId": "YCGT_SIT",
              "BUSISTEP": "VerifyCustId_1",
              "NOTICESERNO": "0000277625",
              "MMID": "2020110600005233"
            },
            "commandType": "OpenPage"
          }
        setTimeout(async() => {
            // console.warn( 'base64' +  await this.getImageBase64("idcardZ"));
            // this.uploadImg()
            // this.RecivedPushNotification(JSON.stringify(eventData))
        }, 3000);

        // const { userflag } = this.props.navigation.state.params
        // this.setState({
        //     USERFLAG:userflag
        // })

        // let phoneSingleParams = {
        //     "Body": {
        //         "USERFLAG": userflag,
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
        // AnyChatUtil.AnynetworkService(AnyChatUrl,phoneSingleParams,(succ)=>{
        //     console.warn("phonesingle返回：", JSON.stringify(succ));
        //     let {MMID, MMDATE} = succ.data.Body
        //     this.setState({
        //         MMDATE:MMDATE,
        //         MMID:MMID
        //     })
        // },(error)=>{
        //     console.warn(' 失败' + error )
        // })

        
    }

    loginOut(func){
        AnyChat.loginOut(( succ )=>{
            console.warn( '销毁后=', succ );
            if (func) {
                window.$globalVideoState = false
                func(succ)
            }
        },( err )=>{
            console.warn();
        });
    }


    /**
     * @监听云柜员推送信息。
     * @author 卢鹏宇
     * @date 2019-09-23
     * @param { eventData }  云柜员推送返回值
     */
    RecivedPushNotification(eventData){
        console.warn( '接受推送消息:', JSON.parse(JSON.stringify(eventData)) )
        let _this = this;
        try{
           let ed = JSON.parse(eventData) ;
           let commandType = ed.CommandType ? ed.CommandType :ed.commandType;
           //  云柜员点击接通 开始视频
           console.log("commandType:", commandType);
           if(!commandType){
            try {
                ed = JSON.parse(ed)
            } catch (error) {
                console.warn(error);
                return
            }
            commandType = ed.CommandType ? ed.CommandType :ed.commandType;
            console.log("commandType:", commandType);
            if(commandType == "sendOnlineMessage"){
             _this.addTellerList(3,ed.content,false,'');
             _this.setState({chatBoxPlace:0})
             return
            }
           }
           if('enter_room' == commandType){
                //打开模拟器
                this.count()
                let roomId = ed.roomid;
                // let otherUserId = ed.remoteuserid;
                //TODO enterRoom  then playView
                let params ={
                    roomId: roomId,
                    // remoteId: otherUserId
                }
                // 进入直播间。
                AnyChat.enterRoom(params, ( succ )=>{
                    console.log("enterRoomJSSuccCallBack",JSON.stringify(succ));
                    
                    _this.setState({
                        countOff: true,
                    })
                    clearInterval(this.timer);
                }, ( err )=>{
                    console.warn( '进入房间失败，返回值：'+ JSON.stringify(err))
                })

           }else if('show_video' == commandType){
                if(this.state.firstShowVideo){
                    this.setState({
                        firstShowVideo:false
                    })
                    /**
                     * @ 更改视频窗口的形状
                     * @author 卢鹏宇
                     * @date 2019-09-10
                     * @ params  nativeId
                     */
                    setTimeout(()=>{
                        // 视频窗口画圆
                        AnyChat.changePlayViewCircle('userNativeViewId', ( succ )=>{
                            console.warn("改变视频窗口成功。")
                        }, ( err )=>{
                            console.warn( "改变视频窗口失败。" )
                        })
                        let remoteId = JSON.parse(ed.useridlist)[1]
                        console.log("useridlist:", ed.useridlist);
                        console.log("remoteId:", remoteId);
                        let params = {
                            userNativeViewId: 'userNativeViewId',
                            remoteNativeViewId:'remoteNativeViewId',
                            remoteId
                        }
                        // 开启视频
                        AnyChat.anyChatPlay(params, ( succ )=>{
                            console.warn( '开启视频成功，返回值：'+ JSON.stringify(succ)  );
                            this.setState({
                                viewOpacity:1
                            })
                            window.$globalVideoState = true;
                        } ,( err )=>{
                            console.warn( '开启视频失败，返回值：'+ err )
                        })
                    },500)
                }else{
                    console.warn("非第一次show_video");
                    if(JSON.parse(ed.useridlist).length == 3){
                        console.warn("三方视频开始");
                        let thirdParmas = {
                            thirdNativeViewId:"thirdNativeViewId",
                            thirdId:JSON.parse(ed.useridlist)[2]
                        }
                        AnyChat.playThird(thirdParmas, ( succ )=>{
                            console.warn( '开启第三方视频成功，返回值：'+ JSON.stringify(succ)  );
                            this.setState({agentWindowWidth:"50%"})
                        } ,( err )=>{
                            console.warn( '开启第三方视频失败，返回值：'+ err )
                        })
                    }else if(JSON.parse(ed.useridlist).length == 2){
                        console.warn("三方视频结束");
                        this.setState({agentWindowWidth:"100%"})
                        AnyChat.stopThird(( succ )=>{
                            console.warn( '关闭第三方视频成功，返回值：'+ JSON.stringify(succ)  );
                        } ,( err )=>{
                            console.warn( '关闭第三方视频失败，返回值：'+ err )
                        })
                    }
                }

           }else if('stop_video' == commandType){
                //  云柜员主动挂断视频。
                clearInterval(this.timer);
               //关闭弹框
               this.setState((previousState) => {
                   return ({
                       frameHomeShow: false,
                       viewRight: 0,
                       viewBigOpacity:1,
                   })
               });
               this.backEnd();
             //  接受云柜员指令，
           }else if( 'Exit' == commandType ){

                _this.setState((previousState) => {
                    return ({
                        AGENTNAME: ed.commandParameters.AGENTNAME,
                        AGENTID: ed.commandParameters.AGENTID,
                        showInfo:true,
                        connectTime: getDatetimeByFormat( new Date(), 'yyyy-MM-dd HH:mm:ss')
                    })
                });
           } else if(commandType == "OpenPage"){
                _this.setState({
                    reportLossWarehouse:ed
                })
                // 密码重置 -- 开始进度提示
                let COMPRATE = ed.commandParameters.COMPRATE
                let FLOWID = ed.commandParameters.FLOWID
                let NODENAME = ed.commandParameters.NODENAME
                let NODEID = ed.commandParameters.NODEID
                let BUSISTEP = ed.commandParameters.BUSISTEP
                let FLOWNAME = ed.commandParameters.FLOWNAME
                let ENDFIELDVALUE = '';
                let ENDFIELDCODE = '';
                if( ed.commandParameters.SHOWDATA ){
                    ENDFIELDVALUE = ed.commandParameters.SHOWDATA[0].FIELDVALUE
                    ENDFIELDCODE = ed.commandParameters.SHOWDATA[0].FIELDCODE
                }
                if(ed.commandParameters.PAGETYPE == "FileTransfer"){
                    let defaultAction = [
                        {
                          text: '取消',
                          style: 'default',
                        },
                        {
                          text: '确定', onPress: () => {
                            _this.fFindUserList( ed , "FileTransfer")
                          },
                        }
                    ];
                    window.$Modal.confirm('文件下载','是否同意下载坐席柜员推送的文件?',defaultAction)
                    return
                }
                if( FLOWID == 'PersOpenAcct' ){
                    if( _this.state.PerlOpenAcctSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'个人开户')
                        _this.setState({
                            PerlOpenAcctSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'PerlPwdManage' ){
                    if( _this.state.PerlPwdManageSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'个人凭证密码管理')
                        _this.setState({
                            PerlPwdManageSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'OpenDepositReceipt' ){
                    if( _this.state.OpenDepositReceiptSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'开立个人存单')
                        _this.setState({
                            OpenDepositReceiptSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'PerlCustInfoUpdate' ){
                    if( _this.state.PerlCustInfoUpdateSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'个人客户信息维护')
                        _this.setState({
                            PerlCustInfoUpdateSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'PerlPwdReset' ){
                    if( _this.state.MMCZSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'密码重置')
                        _this.setState({
                            MMCZSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'MoPhBaToBank' ){
                    if( _this.state.GSSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'银行卡挂失')
                        _this.setState({
                            GSSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'CreditCardAct_SelfHelp' ){
                    if( _this.state.XYKSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'信用卡激活')
                        _this.setState({
                            XYKSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'FinalAss' ){
                    if( _this.state.LCZXSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'理财咨询')
                        _this.setState({
                            LCZXSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'RiskAssmt' ){
                    if( _this.state.RiskAssmtSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'风险评估')
                        _this.setState({
                            RiskAssmtSTATE:false,
                        })
                    }
                }
                if( FLOWID == 'AuthEnTiCation' ){
                    if( _this.state.AuthEnTiCationSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'贷款面签')
                        _this.setState({
                            AuthEnTiCationSTATE:false,
                        })
                    }
                }
                if( BUSISTEP == 'SignInformConfirm_1' ){
                    if(ed.commandParameters.PAGETYPE == "CheckShortCode"){
                        BUSISTEP = "CheckShortCode"
                    }
                }
                if( BUSISTEP == 'GainEntityCard_later' ){
                    _this.enterReportLoss('submitTask')
                    _this.addTellerList(3,'正在为您开卡',false,'');
                }
                if( BUSISTEP == 'GainBankBook_later' ){
                    _this.enterReportLoss('submitTask')
                    _this.addTellerList(3,'正在为您开折',false,'');
                }
                if( BUSISTEP == 'ShowTradeType_1' ){
                    _this.addTellerList(3,'根据监管机构相关规定，银行工作人员必须对客户本人拍照核实身份，请您正视手机摄像头',false,'');
                }
                if( BUSISTEP == 'RiskAlert_1' ){
                    _this.addTellerList(3,'正在为您语音播报风险提示',false,'');
                }
                if( BUSISTEP == 'AgentQuery_1' ){
                    _this.addTellerList(3,'正在进行坐席问询',false,'');
                }
                // if( BUSISTEP == 'Commit_4' || BUSISTEP == 'Commit_5'){
                //     _this.addTellerList(5,'已完成业务提交',false,'');
                // }
                // if( BUSISTEP == 'LoanInput_2'){
                //     _this.addTellerList(5,'已完成业务提交',false,'');
                // }
                if( COMPRATE == '100.00'){
                    _this.addTellerList(5,'已完成业务提交',false,'');
                }
                if( NODEID == 'CustInformGather' ){
                    _this.addTellerList(5,'已为您完成拍照',false,'');
                }
                //信用卡信息提交
                if( BUSISTEP == 'WaitSubmitData_1' ){
                    _this.enterReportLoss('manageMoneyBank', _this.state.creditCardParams )
                }
                //挂断监听
                if( BUSISTEP == 'EXCPOUT_1' ){
                    _this.setState((previousState) => {
                        return ({
                            frameHomeShow: false,
                            PerlOpenAcctSTATE:true,
                            OpenDepositReceiptSTATE:true,
                            PerlCustInfoUpdateSTATE:true,
                            PerlPwdManageSTATE:true,
                            GSSTATE:true,
                            XYKSTATE:true,
                            MMCZSTATE:true,
                            LCZXSTATE:true,
                            RiskAssmtSTATE:true,
                            AuthEnTiCationSTATE:true,
                        })
                    });
                    _this.addTellerList(1,'已为您取消办理',false,FLOWNAME)
                }

                if( ENDFIELDVALUE == '0' && ENDFIELDCODE == 'TranCreateElecFlg' ){
                    _this.setState((previousState) => {
                        return ({
                            PerlOpenAcctSTATE:true,
                            OpenDepositReceiptSTATE:true,
                            PerlCustInfoUpdateSTATE:true,
                            PerlPwdManageSTATE:true,
                            GSSTATE:true,
                            XYKSTATE:true,
                            MMCZSTATE:true,
                            LCZXSTATE:true,
                            RiskAssmtSTATE:true,
                            AuthEnTiCationSTATE:true,
                        })
                    });
                    if( FLOWID == 'FinalAss' ){
                        _this.addTellerList(4,'理财购买业务办理完成。','manageMoneyReceipt','查看电子回单')
                        _this.callBackHome( 'manageMoneyReceipt',1 );
                    }else if( FLOWID == 'CreditCardAct_SelfHelp' ){
                        _this.addTellerList(4,'信用卡激活业务办理完成。','creditCardReceipt','查看电子回单')
                        _this.callBackHome( 'creditCardReceipt' );
                    }else if( FLOWID == 'MoPhBaToBank'){
                        _this.addTellerList(4,'银行卡挂失业务办理完成。','receipt','查看电子回单')
                        _this.callBackHome( 'receipt' );
                    }else if( FLOWID == 'PerlPwdReset'){
                        _this.addTellerList(4,'密码重置业务办理完成。','passwordReceipt','查看电子回单')
                        _this.callBackHome( 'passwordReceipt' );
                    }
                }
                // 展示柜员推送消息
                if( TELLERLIST[BUSISTEP] ){
                    if( TELLERLIST[BUSISTEP].isSure ){
                        _this.fFindUserList( ed , TELLERLIST[BUSISTEP].pageName , BUSISTEP)
                    }else{
                        _this.addTellerList( 3, TELLERLIST[BUSISTEP].info, TELLERLIST[BUSISTEP].pageName, TELLERLIST[BUSISTEP].seeInfo )
                        if( BUSISTEP == 'SetPassword_1' ){
                            _this.callReportLossPage()
                        }else if( BUSISTEP == 'CheckPwd_1' ){
                            _this.callManageMoneyPage()
                        }else{
                            _this.callBackHome( TELLERLIST[BUSISTEP].pageName );
                        }
                    }
                }
           }else if(commandType == "ShowPercent"){
                if( ed.commandParameters.FLOWID == 'PerlOpenAcct' ){
                    if( _this.state.PerlOpenAcctSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'个人开户')
                        _this.setState({
                            PerlOpenAcctSTATE:false,
                        })
                    }
                }
                if( ed.commandParameters.FLOWID == 'PerlPwdManage' ){
                    if( _this.state.PerlPwdManageSTATE ){
                        _this.addTellerList(1,'即将为您办理',false,'个人凭证密码管理')
                        _this.setState({
                            PerlPwdManageSTATE:false,
                        })
                    }
                }
               if(ed.commandParameters.NODENAME !== this.state.lastNodeName){
                   this.setState({
                       lastNodeName: ed.commandParameters.NODENAME
                    },()=>{
                    this.addTellerList(3, `正在为您办理${ed.commandParameters.NODENAME}`)
                   })
                }
           }else if(commandType == "close_desk"){
                AnyChat.stopPushScreen((success)=>{
                    console.warn("关闭投屏成功", success);
                    let content = {
                        commandType: 'closedesknotice'
                    }
                    AnyChat.transBuffer(JSON.stringify(content),success=>{
                        console.warn("通知成功",success);
                    },error=>{
                        console.warn("通知失败",error);
                    })
                },(error)=>{
                    console.warn("关闭投屏失败", error);
                })
           }else if(commandType == "request_desk"){
                let defaultAction = [
                    {
                      text: '取消',
                      style: 'default',
                    },
                    {
                      text: '确定', onPress: () => {
                        AnyChat.startPushScreen((success)=>{
                            console.warn("投屏成功", success);
                            let {height,width} =  Dimensions.get('window');
                            let content = {
                                commandType: 'opendesknotice',
                                height: height.toString(),
                                width: width.toString()
                            }
                            console.warn("content", content);
                            AnyChat.transBuffer(JSON.stringify(content),success=>{
                                console.warn("通知成功",success);
                            },error=>{
                                console.warn("通知失败",error);
                            })
                        },(error)=>{
                            console.warn("投屏失败", error);
                        })
                      },
                    }
                ];
                window.$Modal.confirm('手机投屏','是否同意将手机屏幕展示给坐席柜员?',defaultAction)
           }else if(commandType == "putScreen"){
               this.setState({
                  putScreenStatus: true,
                  putScreenOpacity: 1,
                  viewWidth: 1,
                  boyWidth: 1,
              },()=>{
                  let param = {
                     screenNativeViewId:"screenNativeViewId"
                  }
                  AnyChat.playScreen(param,succ=>{
                      console.warn("开始投屏成功:",succ);
                  },err=>{
                      this.setState({
                          putScreenStatus: false,
                          putScreenOpacity: 0,
                          viewWidth: '100%',
                          boyWidth: 60,
                      })
                      console.warn("开始投屏失败:",err);
                  })
              })
           }else if(commandType == "stopPutScreen"){
                this.setState({
                    putScreenStatus: false,
                    putScreenOpacity: 0,
                    viewWidth: '100%',
                    boyWidth: 60,
                })
                AnyChat.stopScreen(succ=>{
                    console.warn("停止投屏成功:",succ);
                },err=>{
                    console.warn("停止投屏失败:",err);
                })
           }else{
               console.warn("未处理的commandType:",commandType);
           }

        }catch(e){
          console.log(e);
        }
      }

    async getImageBase64(path){
        let base64 = ""
        try{
            base64 = await RNFS.readFile(path, 'base64')
        }catch(error){
            console.warn(error);
        }
        return base64
    }  

     /**
     * @根据推送返回值查询列表
     * @author 卢鹏宇
     * @date 2019-09-26
     * @param { data }  接口传参
     * @param { type }  页面名称
     * @param { BUSISTEP }  推送节点
     */
    fFindUserList( data, type, BUSISTEP ){
        let _this = this;
        var params = {
            "Body": {
                "MMDATE" : data.commandParameters.MMDATE,
                "MMID" : data.commandParameters.MMID,
                "NOTICESERNO" : data.commandParameters.NOTICESERNO,
            },
            "Head": {
                "ConsumerId" : "C002",
                "ConsumerSeqNo" : getTimespamp(new Date()),
                "RequestDate" : getDatetimeByFormat(new Date(), 'yyyyMMdd'),
                "RequestTime" : getDatetimeByFormat(new Date(), 'HHmmss'),
                "TransServiceCode" : "noticemsg_esb"
            }
        }
        console.warn( params )
        AnyChatUtil.AnynetworkService( AnyChatUrl, params, ( succ )=>{
            //先隐藏弹出框在进行数据更改，由于数据格式不一致，现更改数据会报错。
            if( succ.data.Head.ReturnCode == '000000'){
                _this.setState((previousState) => {
                    return ({
                        frameHomeShow: false,
                    })
                });
                if(type == "FileTransfer"){
                    let fileName =  succ.data.Body.SHOWDATA.find(e=>e.FIELDCODE == "fileName").FIELDVALUE
                    $Toast.loading('开始下载...')
                    _downloadFile(encodeURI(`http://192.9.200.32:8080/download/${fileName}`), fileName)
                    return
                }
                if(BUSISTEP =='QueryFinalPros_2' ){
                    if( succ.data.Body.SHOWDATA[0]['FIELDVALUE'].length > 1 ){
                        let userInfoList = _this.state.userInfoList;
                        userInfoList[type] = succ.data.Body.SHOWDATA
                        _this.setState({
                            viewData:succ.data.Body.SHOWDATA,
                            userInfoList:userInfoList
                        },()=>{
                            _this.addTellerList( 3, '请您查看理财产品列表', TELLERLIST[BUSISTEP].pageName, '查看产品列表' )
                            _this.callBackHome(type)
                        })
                    }else if( succ.data.Body.SHOWDATA[0]['FIELDVALUE'].length == 1 ){
                        let userInfoList = _this.state.userInfoList;
                        userInfoList['productIntroduction'] = succ.data.Body.SHOWDATA[0]['FIELDVALUE'][0]
                        _this.addTellerList( 6, '请仔细阅读', 'productIntroduction', succ.data.Body.SHOWDATA[0]['FIELDVALUE'][0][3] )
                        _this.setState({
                            viewData:succ.data.Body.SHOWDATA[0]['FIELDVALUE'][0],
                            userInfoList:userInfoList
                        },()=>{
                            _this.callBackHome('productIntroduction', 1)
                        })
                    }
                }              
                else{
                    let userInfoList = _this.state.userInfoList;
                    userInfoList[type] = succ.data.Body.SHOWDATA
                    _this.setState({
                        viewData:succ.data.Body.SHOWDATA,
                        userInfoList:userInfoList
                    },()=>{
                        if( BUSISTEP == 'TakeNotes_2'){
                            succ.data.Body.SHOWDATA.map(( item, index )=>{
                                if( item["FIELDCODE"]==  'QRCODE' ){
                                    _this.showNotification( item['FIELDVALUE'] )
                                }
                            })
                        }else{
                            _this.addTellerList( 3, TELLERLIST[BUSISTEP].info, TELLERLIST[BUSISTEP].pageName, TELLERLIST[BUSISTEP].seeInfo )
                            _this.callBackHome(type)
                        }
                    })
                }
            }

           
        }, ( err )=>{
            console.warn(' 失败' + err )
        })
    }
    /**
     * @ 添加聊天框
     * @author 卢鹏宇
     * @date 2019-09-23
     * @param { type } 1：黑色提示框 ； 2： 客户纯文字聊天框； 3： 柜员聊天框 ； 
     * @param { text } 聊天框内容
     * @param { pageNode } 聊天框 可点击状态，点击跳转的子页面
     * @param { seeInfo } 点击所需查看信息详细文字说明
     */
    // _this.addTellerList( 3, '请您输入需购买理财银行卡信息','bankCardInfo', '点击查看银行卡信息' )
    addTellerList(type, text, pageNode, seeInfo){
        let _this = this;
        _this.state.messageOne = true;
        let time = ''
        let newTellerList = _this.state.tellerList
        type == '4' ?  time = getDatetimeByFormat(new Date(), 'yyyy-MM-dd HH:mm:ss') : time = getDatetimeByFormat(new Date(), 'HH:mm:ss')
        if( pageNode ){
            newTellerList.push({type:type, text:text, pageNode:pageNode, seeInfo:seeInfo, time:time})
        }else{
            newTellerList.push({type:type, text:text,seeInfo:seeInfo, time:time})
        }
        _this.setState({
            tellerList:newTellerList
        })
        setTimeout(()=>{
            if( _this.myScrollview ){
                _this.myScrollview.scrollTo({x:0,y: 10000000,animated:true});
            }
        },500)
    }

    /**
     * 显示通知
     * */
    showNotification( code ) {
        const id = Math.random().toString().substr(2, 5);
        const notificationConfig = {
            /* Android Only Properties */
            id: id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            ticker: "My Notification Ticker", // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: "请您在10个工作日后，去深圳展会网点领取，领取新银行卡时请出示此凭证，点击查看》", // (optional) default: "message" prop
            subText: "二维码", // (optional) default: none
            color: "white", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: "group", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            priority: "high", // (optional) set notification priority, default: high
            visibility: "public", // (optional) set notification visibility, default: private
            importance: "high", // (optional) set notification importance, default: high
            title: "线下网点领取补办银行卡", // (optional)
            message: "收到一个消息", // (required)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            // repeatType: 'time', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
            // repeatTime: 30,
            // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
            param: JSON.stringify({router: "messageCenter"})
        };
        PushNotification.localNotification(notificationConfig);
        window.$globalVideoRouter = 'messageCenter';
        let networkUrl = NetWorkUrl + '/uploadTradeCode'
        let deviceId =  DeviceUtil.getDeviceIdSync();
        console.log("获取的设备ID：" + deviceId);
        let params = {
             "deviceid": JSON.stringify(deviceId),
             "tradeCode":code
        } 
        console.warn( JSON.stringify(params) )
        NetWorkUtil.networkService( networkUrl, params, ( succ )=>{
            console.warn( JSON.stringify(succ) )
        },( err )=>{
            console.warn( JSON.stringify(err) )
        })
    }

    /**
     * @定时器
     * @author 卢鹏宇
     * @date 2019-09-17
     */
    count() {
        const _this = this;
        _this.timer = setInterval(()=>{
            _this.setState({
                    count: _this.state.count + 1
                })
            if( _this.state.count >= _this.state.countTotal ){
                if( !_this.state.countOff ){
                    clearInterval(_this.timer);
                    window.$globalVideoState = false
                    _this.loginOut();
                    $Toast.info( '连接失败，即将关闭当前窗口。', 2, () => {
                        router.replace('evaluate');
                    });
                }
            }
        }, 50000);
    }

    /**
     * @ 点击  视频  状态栏
     * @author 卢鹏宇
     * @date 2019-09-19
     */
    tellerStateControl( type ){
        let _this = this
        if( type == 'audio' ){
            _this.setState({
                audioState: !_this.state.audioState
            })
            AnyChat.closeSpeak(_this.state.audioState, ()=>{
                console.warn('关闭语音成功')
            }, ()=>{
                console.warn('关闭语音失败')
            })
        }else if( type == 'video' ){
            _this.setState({
                videoState: !_this.state.videoState,
                viewOpacity: _this.state.videoState?0:1
            })
            AnyChat.closeCamera(_this.state.videoState, ()=>{
                console.warn('关闭视频成功')
            }, ()=>{
                console.warn('关闭视频失败')
            })
        }
    }

    //挂断
    backEnd() {
        const _this = this;
        _this.loginOut();
        window.$globalVideoState = false
        $Toast.info( '连接断开，即将关闭当前窗口。', 2, () => {
            router.replace('evaluate');
        });
    }

    _onLayout(e){
        let {x,y,width,height} = e.nativeEvent.layout
        this.setState({
            viewHeight:parseInt( Dimensions.get('window').height ) - parseInt( height )
        })
    }

    /**
     * @销毁前退出视频
     * @author 卢鹏宇
     * @date 2019-09-23
     */
    componentWillUnmount(){
        this.loginOut();
        this.recognizerEventEmitter.removeListener( 'RecivedPushNotification' , this.RecivedPushNotification )
    //    this.recognizerEventEmitter.addListener('RecivedPushNotification', this.RecivedPushNotification);
        window.$globalVideoState = false;
        this.setState((previousState) => {
            return ({
                PerlOpenAcctSTATE:true,
                OpenDepositReceiptSTATE:true,
                PerlCustInfoUpdateSTATE:true,
                PerlPwdManageSTATE:true,
                GSSTATE:true,
                XYKSTATE:true,
                MMCZSTATE:true,
                LCZXSTATE:true,
                RiskAssmtSTATE:true,
                AuthEnTiCationSTATE:true,
            })
        });
    }



    render() {
        let _this = this
        // ------------------定义弹框主体start-----------------
        let NowPages = this.state.nowPages;
        // 挂失输入交易密码弹窗
        // this.state.enterPassword? 
        let reportLossPage = 
            <View style={{position:'absolute',zIndex:9999,top:0,bottom:0,width:'100%',right:this.state.enterPassword?0:'100%'}}>
                {
                    this.state.enterPassword?
                        <ReportLossPassword
                            callBackHome={(id, type, data) => this.callBackHome(id, type, data)}
                            closeHome={(type)=>this.closeHome(type)}
                            enterReportLoss={( type, PASSWORD, promptInfo )=>this.enterReportLoss(type, PASSWORD, promptInfo )}
                            addTellerList = {(type,text,pageNode,seeInfo)=>this.addTellerList(type,text,pageNode,seeInfo)}
                            btnState = {this.state.btnState}
                            data = {this.state.viewData}
                            manageMoneyIndex = {this.state.manageMoneyIndex}
                            editManageMoneyIndex = {(index)=>{this.editManageMoneyIndex(index)}}
                        ></ReportLossPassword>:null
                }
            </View>
        let manageMoneyPasswordPage = 
            <View style={{position:'absolute',zIndex:9999,top:0,bottom:0,width:'100%',right:this.state.manageMoneyPassword?0:'100%'}}>
                {
                    this.state.manageMoneyPassword?
                        <ManageMoneyPassword
                            callBackHome={(id, type, data) => this.callBackHome(id, type, data)}
                            closeHome={(type)=>this.closeHome(type)}
                            enterReportLoss={( type, PASSWORD, promptInfo )=>this.enterReportLoss(type, PASSWORD, promptInfo )}
                            addTellerList = {(type,text,pageNode,seeInfo)=>this.addTellerList(type,text,pageNode,seeInfo)}
                            btnState = {this.state.btnState}
                            data = {this.state.viewData}
                            manageMoneyIndex = {this.state.manageMoneyIndex}
                            editManageMoneyIndex = {(index)=>{this.editManageMoneyIndex(index)}}
                        ></ManageMoneyPassword>:null
                }
            </View>
            
        let frameHomePage = this.state.frameHomeShow ?
            <View style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.30)', width: '100%' }} >
                {/* 点击关掉弹出框(实际使用时,直接控制setState中frameHomeShow让弹框消失或者显示) */}
                <NowPages   callBackHome={(id, type, data) => this.callBackHome(id, type, data)}
                            closeHome={(type)=>this.closeHome(type)}
                            enterReportLoss={( type, PASSWORD, promptInfo )=>this.enterReportLoss(type, PASSWORD, promptInfo )}
                            addTellerList = {(type,text,pageNode,seeInfo)=>this.addTellerList(type,text,pageNode,seeInfo)}
                            btnState = {this.state.btnState}
                            data = {this.state.viewData}
                            manageMoneyIndex = {this.state.manageMoneyIndex}
                            editManageMoneyIndex = {(index)=>{this.editManageMoneyIndex(index)}}
                            ></NowPages>
            </View> : null;

        let headerAn = this.state.headerAn ?
            <View style={[styles.headS,{width:this.state.viewWidth}]} 
             onLayout={(e) => this._onLayout(e)}
            >
                {/* 根据当前视频状态控制隐藏显示 视频区域 */}
                <LinearGradient style={[styles.ensure,{opacity:this.state.viewOpacity}]} colors={$globalStyle.tellerOperation.videoUser}>
                    <AnyChatView style={[styles.boy,{width:this.state.boyWidth}]} nativeId='userNativeViewId' shape='c'></AnyChatView>
                </LinearGradient>
                <AnyChatView style={[styles.headBaGrImgS,{opacity:this.state.viewBigOpacity},{width:this.state.agentWindowWidth}]} nativeId='remoteNativeViewId'></AnyChatView>
                <AnyChatView style={[styles.headBaGrImgSThird,{opacity:this.state.viewOpacity}]} nativeId='thirdNativeViewId'></AnyChatView>
                <View style={styles.headBot} >
                    <TouchableWithoutFeedback onPress={() => {
                                this.tellerStateControl('audio')
                            }} style={{
                                width: 40,
                                height: 40,
                                marginTop: -6
                            }}>
                        <Image style={[styles.headBotImg,{width:22,height:22}]}
                            resizeMode='contain'
                            source={ this.state.audioState ? AUDIO : OFFAUDIO }
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                            this.tellerStateControl('video')
                    }} style={{
                        width: 40,
                        height: 40,
                        marginTop: -6
                    }}>
                        <Image style={[styles.headBotImg,{width:22,height:22}]}
                            resizeMode='contain'
                            source={ this.state.videoState ? VIDEO : OFFVIDEO }
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.backEnd()
                        // this.showNotification()
                    }} style={{
                        width: 40,
                        height: 40,
                        marginTop: -6
                    }}>
                        <Image style={[styles.headBotImg,{width:34,height:34}]}
                            resizeMode='contain'
                            source={require('$image/cloudTeller/connect/three.png')}
                        />
                    </TouchableWithoutFeedback>
                    <Image style={[styles.headBotImg,{width:22,height:22}]}
                        resizeMode='contain'
                        source={require('$image/cloudTeller/connect/four.png')}
                    />
                    <Image style={[styles.headBotImg,{width:22,height:22}]}
                        resizeMode='contain'
                        source={require('$image/cloudTeller/connect/five.png')}
                    />
                </View>
            </View>
            : null;

        // let messageThree=this.state.messageThree?
        //     <View style={styles.userBox}>
        //         <View  style={styles.userTalk} >
        //             <Text style={styles.userTalkText}>我已同意相关协议</Text>
        //         </View>
        //         {/* 圆形头像 */}
        //         <Image source={require('$image/image/cloudTeller/connect/rightHeadImg.png')} style={styles.rightHeadImg}/>

        //     </View>
        //     :null;    
        let putScreenView = 
        <View style={{position:'absolute',zIndex:9999,top:0,bottom:0,height:this.state.fullScreenHeight,width:this.state.fullScreenWidth,right:this.state.putScreenStatus?0:'100%'}}>
            {
                <AnyChatView style={[styles.headBaGrImgSS,{zIndex:9999,height:this.state.fullScreenHeight,width:this.state.fullScreenWidth,opacity:this.state.putScreenOpacity}]} nativeId='screenNativeViewId'></AnyChatView> 
            }
        </View>
        
        let messageOne = this.state.messageOne ?
            <View>
                {
                    _this.state.tellerList.map( ( item, index )=>{
                        if( item.type == '1' ){
                            return(
                                <View style={styles.textView} >
                                    <Text style={styles.text}>
                                        { item.time }
                                        &nbsp;
                                        工号{ this.state.AGENTID }&nbsp; { this.state.AGENTNAME } 
                                        {item.text}
                                        <Text style={{ color: '#49A5FF', }}>
                                        {item.seeInfo}
                                        </Text>
                                        业务
                                    </Text>
                                </View>
                            )
                        }else if( item.type == '2' ){
                            return(
                                <View>
                                    <View style={styles.textView} >
                                        <Text style={styles.timeText}>
                                            { item.time }
                                        </Text>
                                    </View>
                                    <View style={styles.userBox}>
                                        <View style={styles.userTalk} >
                                            <View style={styles.rightTriangular}></View>
                                            <Text style={styles.userTalkText}>{item.text}</Text>
                                        </View>
                                        {/* 圆形头像 */}
                                        <Image source={require('$image/cloudTeller/connect/rightHeadImg.png')} style={styles.rightHeadImg} />
                                    </View>
                                </View>
                            )
                        }else if( item.type == '3' ){
                            return(
                                <View>
                                    <View style={styles.textView} >
                                        <Text style={styles.timeText}>
                                            { item.time }
                                        </Text>
                                    </View>
                                    <View style={styles.container}  >
                                        {/* 圆形头像 */}
                                        <Image source={require('$image/cloudTeller/connect/leftHeadImg.png')} style={styles.leftHeadImg} />
                                            <View style={styles.proBox}  >
                                                <View style={styles.leftTriangular}></View>
                                                <View style={{ fontSize: 14,  paddingTop:10,position:'relative' }}>
                                                    <Text style={{ fontSize: 15 }} >
                                                        {item.text}。 
                                                        <TouchableWithoutFeedback onPress={() => {
                                                                _this.callBackHome(item.pageNode , 1);
                                                            }}>
                                                            <Text style={{ color: '#49A5FF', fontSize: 15, textDecorationLine:'underline' }}>
                                                                {item.seeInfo}
                                                            </Text>
                                                        </TouchableWithoutFeedback>
                                                    </Text>
                                                </View>
                                            </View>
                                    </View>
                                </View>
                            )
                        }else if( item.type == '4' ){
                            return(
                                <View style={styles.textView} >
                                    <Text style={[styles.text,{marginBottom:10}]}>
                                        { item.time }
                                    </Text>
                                    <Text style={styles.text}>
                                        {item.text}&nbsp; &nbsp; 
                                        <TouchableWithoutFeedback onPress={() => {
                                            _this.callBackHome(item.pageNode , 1);
                                        }}>
                                            <Text style={{ color: '#49A5FF', textDecorationLine:'underline' }}>
                                            {item.seeInfo}
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    </Text>
                                </View>
                            )
                        }else if( item.type == '5' ){
                            return(
                                <View style={[styles.textView]} >
                                    <Text style={styles.text}>
                                        { item.time }
                                        &nbsp;
                                        工号{ this.state.AGENTID }&nbsp; { this.state.AGENTNAME } 
                                        {item.text}
                                        <Text style={{ color: '#49A5FF', }}>
                                        {item.seeInfo}
                                        </Text>
                                    </Text>
                                </View>
                            )
                        }else if( item.type == '6' ){
                            return(
                                <View>
                                    <View style={styles.textView} >
                                        <Text style={styles.timeText}>
                                            { item.time }
                                        </Text>
                                    </View>
                                    <View style={styles.container}  >
                                        {/* 圆形头像 */}
                                        <Image source={require('$image/cloudTeller/connect/leftHeadImg.png')} style={styles.leftHeadImg} />
                                            <View style={styles.proBox}  >
                                                <View style={styles.leftTriangular}></View>
                                                <View style={{ fontSize: 14,  paddingTop:10,position:'relative' }}>
                                                    <Text style={{ fontSize: 15 }} >
                                                        {item.text}
                                                        <TouchableWithoutFeedback onPress={() => {
                                                                _this.callBackHome(item.pageNode , 1);
                                                            }}>
                                                            <Text style={{ color: '#49A5FF', fontSize: 15, textDecorationLine:'underline' }}>
                                                                {item.seeInfo}
                                                            </Text>
                                                        </TouchableWithoutFeedback>
                                                            产品信息
                                                    </Text>
                                                </View>
                                            </View>
                                    </View>
                                </View>
                            )
                        }
                    } )
                }
            </View>
            : null;
        let textInputBox =                 
        <View style={{height:parseInt(this.state.viewHeight)/4,display:'flex',flexDirection:'row',position:'relative',right: this.state.chatBoxPlace}}>
            <TextInput
                style={{height: 40, bottom: 10, left: 10, width: '70%',borderRadius: 5,borderColor: 'black', borderWidth: 1,position:'absolute'}}
                value={this.state.inputValue}
                onChangeText={text=>{this.setState({inputValue:text})}}
                ></TextInput>
            <TouchableWithoutFeedback onPress={()=>{
                console.warn(this.state.inputValue);
                this.sendOnlineMessageToAgent(this.state.inputValue);
                this.addTellerList(2,this.state.inputValue)
                this.setState({
                    inputValue:"",
                    chatBoxPlace:-999
                })
                }}>
              <LinearGradient style={{ width: '10%', marginHorizontal: '8%', height: 40, borderRadius: 25, bottom: 10, right: -25,justifyContent: 'center', alignItems: 'center' ,position:'absolute'}} colors={window.$globalStyle.buttonLinerBackground}>
                <Text style={styles.loginBtn}>发送</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
        </View>
        return (
            <View style={styles.body}>
                {/* 视频显示区域 */}
                {reportLossPage}
                {manageMoneyPasswordPage}
                {putScreenView}
                {headerAn}
                <View style={{position:'absolute',top:230, bottom:0,left:0,right:0}}>
                    {frameHomePage}
                    <ImageBackground resizeMode={'contain'} source={require('$image/agree_LOGO.png')} style={{ width: '100%',height:'100%'}} imageStyle={{width:'40%',left:'30%',position:'absolute',top:50 }} >

                        <ScrollView 
                            ref={(r) => this.myScrollview = r}
                            contentContainerStyle={{paddingBottom:20}}
                        >
                            {
                                this.state.showInfo ?
                                <View>
                                    <View style={styles.textView} >
                                        <Text style={[styles.text,{marginBottom:10}]}>
                                            { this.state.connectTime }
                                        </Text>
                                        <Text style={styles.text}>
                                            已为您成功接通工作人员 
                                            <Text style={{color:'#49A5FF'}}>
                                            { this.state.AGENTNAME } 
                                            </Text> &nbsp;
                                            工号
                                            <Text style={{color:'#49A5FF'}}>
                                            { this.state.AGENTID }
                                            </Text>
                                        </Text>
                                    </View>
                                    {/* 柜员安全提示 */}
                                    <View style={styles.textcontainer}>
                                        <Image source={require('$image/cloudTeller/connect/leftHeadImg.png')} style={styles.leftHeadImg} />
                                        <View style={styles.messageBox} >
                                            <View style={styles.leftTriangular}></View>
                                                <View style={{borderBottomColor:'#f5f5f5',borderBottomWidth:1,paddingBottom:5,marginBottom:5}}>
                                                    <Text>
                                                        您好，
                                                        <Text style={{color:'#49A5FF'}}>
                                                            {this.state.userInfoData.cnName || "马德政"}
                                                        </Text>
                                                        先生
                                                    </Text>
                                                </View>
                                                <Text style={{ fontSize: 15 }} >请确认是您本人在办理业务，请在办理过程中注意周围环境安全。</Text>
                                                {/* <Text style={{ fontSize: 15 }} >请在办理过程中注意周围环境安全。</Text> */}
                                            </View>
                                        </View>
                                    </View>: null
                            }
                            {messageOne}
                            {textInputBox}
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View>);
    }

}
const styles = StyleSheet.create({
    headS: {
        // width: '100',
        height: 230,
        position:'relative'
    },
    headH: {
        width: '100%',
        height: 160,
        paddingTop: 10
    },
    headBaGrImgS: {
        height: 230,
        top: 0,
        left: 0,
        position: 'absolute',
    },
    headBaGrImgSThird: {
        width: '50%',
        height: 230,
        top: 0,
        right: 0,
        position: 'absolute',
    },
    headBaGrImgSS: {
        // width: '100%',
        // height: '100%',
        position: 'absolute',
    },
    headBaGrImgH: {
        width: '100%',
        height: 160,
        top: 0,
        position: 'absolute',
    },
    scaling: {
        width: 30,
        height: 30,
        marginTop: 35,
        marginLeft: 300,
        position: 'absolute',
        zIndex: 99
    },
    scalingH: {
        width: 30,
        height: 30,
        position: 'absolute',
        marginTop: -10,
        zIndex: 99
    },
    headBotHImage: {
        flex: 1,
        flexDirection: 'row',
        marginTop: -5,
        justifyContent:"space-around"
    },
    ensure:{
        width: 64,
        height: 64,
        marginTop:102,
        marginLeft:12,
    },
    boy: {
        // width: 60,
        height: 60,
        marginTop: 2,
        marginLeft: 2,
    },
    boyH: {
        width: 60,
        height: 60,
        marginTop: 20
    },
    teller: {
        width: 60,
        height: 60,
        marginTop: 20
    },
    headBot: {
        width: '100%',
        height: 40,
        bottom: -25,
        backgroundColor: 'rgba(0,0,0,0.30)',
        // backgroundColor: 'red',
        flexDirection: "row",
        justifyContent:'space-around',
        alignItems:'center',
        textAlign:'center',
    },
    headBotH: {
        width: '100%',
        height: 40,
        flexDirection: "row",
    },
    headBotImg: { },
    headBotImgGuaduan: {
        width: 34,
        height: 34,
        marginTop: -6
    },
    headBotHImageBox: {
        height: 40,
    },
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f4f4f4',
        // backgroundColor: 'red',
    },
    frameHomeBox: {
        position: "absolute",
        width: '100%',
        top: 0,
        left: 0,
        backgroundColor: "#F4F4F4",
        zIndex: 30
    },
    textView: {
        textAlign: 'center',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom:10,
    },
    text: {
        fontFamily: 'PingFangSC-Medium',
        fontSize: 13,
        color: '#666666',
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft: 15,
        paddingRight: 15,
        textAlign:"center"
    },
    timeText:{
        fontFamily: 'PingFangSC-Medium',
        fontSize: 13,
        color: '#999999',
        borderRadius: 10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft: 15,
        paddingRight: 15,
        textAlign:"center"
    },
    textcontainer:{
        marginTop: 10,
        marginBottom:10,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: "row",
    },
    container: {
        marginTop: 10,
        width: '100%',
        paddingBottom:10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: "row",
    },
    leftHeadImg: {
        marginLeft: 20,
        width: 40,
        height: 40
    },
    proBox: {
        marginLeft: 10,
        maxWidth:'61%',
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize:15
    },
    messageBox:{
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding:10,
        maxWidth:'61%',
        position:'relative'
    },
    nodeImg: {
        width: 47,
        height: 47,
        marginLeft:6
    },
    jinruImg: {
        width: 5,
        height: 9
    },
    userBox: {
        marginTop: 10,
        marginBottom:10,
        width: '100%',
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: "row",
        position:'relative'
    },
    rightHeadImg: {
        marginRight: 20,
        width: 40,
        height: 40

    },
    userTalk: {
        maxWidth:'61%',
        marginRight: 10,
        height: 40,
        padding:10,
        backgroundColor: '#9EEA6A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position:'relative'
    },
    userTalkText: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 15,
        color: '#333333',
        textAlign: 'center',
    },
    botproBox: {
        height: 24,
        width: '80%',
        marginLeft: '10%',
        borderTopColor: '#F6F6F6',
        borderTopWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        bottom: 0
    },
    leftTriangular:{
        width: 0,
        height: 0,
        borderTopWidth: 5,
        borderTopColor: 'transparent',
        borderRightWidth: 5,
        borderRightColor: '#fff',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        borderBottomWidth: 5,
        borderBottomColor: 'transparent',
        position:'absolute',
        left:-10,
        top:15,
    },
    rightTriangular:{
        width: 0,
        height: 0,
        borderTopWidth: 5,
        borderTopColor: 'transparent',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: '#9EEA6A',
        borderBottomWidth: 5,
        borderBottomColor: 'transparent',
        position:'absolute',
        right:-10,
        top:15,
    },
});
