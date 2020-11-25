var PageNode = [ //弹框子页面信息维护
    //对私开户 -- 可开卡片选择
    {
        id: 'chooseCardType',
        file: require('./elasticFrame/PerlOpenAcct/chooseCardType'),
    },
    //对私开户 -- 签约信息录入
    {
        id: 'signInformConfirm',
        file: require('./elasticFrame/PerlOpenAcct/signInformConfirm'),
    },
    //对私开户 -- 查询密码设置
    {
        id: 'setQueryPwd',
        file: require('./elasticFrame/PerlOpenAcct/setQueryPwd'),
    },
    {
        id: 'infoConfirm',
        file: require('./elasticFrame/PerlOpenAcct/infoConfirm'),
    },
    {
        id: 'idAuth',
        file: require('./elasticFrame/PerlOpenAcct/idAuth'),
    },
    {
        id: 'webViewPage',
        file: require('./elasticFrame/PerlOpenAcct/webViewPage'),
    },
    {
        id: 'ProtocolAgreement',
        file: require('./elasticFrame/finalAss/ProtocolAgreement'),
    },
    {
        id: 'RecordSpeech',
        file: require('./elasticFrame/finalAss/RecordSpeech'),
    },
    // 确认贷款信息 0
    {
        id: 'confirmInfo',
        file: require('./elasticFrame/confirmInfo'),
    },
    //利息计算器 1
    {
        id: 'TotalPayments',
        file: require('./elasticFrame/TotalPayments'),
    },
    //身份验证 2
    {
        id: 'Authentication',
        file: require('./elasticFrame/Authentication'),
    },
    // 用户协议 3
    {
        id: 'ServiceAgreement',
        file: require('./elasticFrame/reportLoss/ServiceAgreement'),
    },
    // 网点 3
    {
        id: 'Dot',
        file: require('./elasticFrame/reportLoss/Dot'),
    },
    // 物流 3
    {
        id: 'logistics',
        file: require('./elasticFrame/reportLoss/logistics'),
    },

    //人脸识别 4 
    {
        id: 'faceRecognition',
        file: require('./elasticFrame/faceRecognition')
    },
    //短信验证 5
    {
        id: 'shortMessageVerification',
        file: require('./elasticFrame/shortMessageVerification')
    },
    //数字签名 6
    {
        id: 'signatureConfirmation',
        file: require('./elasticFrame/signatureConfirmation')
    },
    //客户评价 7
    {
        id: 'evaluate',
        file: require('./elasticFrame/evaluate')
    },
    {
        id: 'test',
        file: require('./elasticFrame/test')
    },
    //挂失 8
    {
        id: 'reportLoss',
        file: require('./elasticFrame/reportLoss/reportLoss')
    },
    //密码 9
    {
        id: 'enterPassword',
        file: require('./elasticFrame/reportLoss/enterPassword')
    },
    // 回执单 10
    {
        id: 'receipt',
        file: require('./elasticFrame/reportLoss/receipt')
    },
    // 摸板页面 13
    {
        id: 'model',
        file: require('./elasticFrame/model'),
    },
    // 身份验证 14
    {
        id: 'authentication',
        file: require('./elasticFrame/manageMoney/authentication'),
    },
    // 购买金额 15
    {
        id: 'monetary',
        file: require('./elasticFrame/manageMoney/monetary'),
    },
    // 购买成功 16
    {
        id: 'buySuccess',
        file: require('./elasticFrame/manageMoney/buySuccess'),
    },
    // 风险评估完成 17
    {
        id: 'riskAssessmentSuccess',
        file: require('./elasticFrame/finalAss/riskAssessmentSuccess'),
        // file: require('./elasticFrame/manageMoney/riskAssessmentSuccess'),
    },
    // 风险评估 18
    {
        id: 'riskAssessment',
        file: require('./elasticFrame/finalAss/riskAssessment'),
        // file: require('./elasticFrame/manageMoney/riskAssessment'),
    },
    // 产品介绍 19
    {
        id: 'productIntroduction',
        file: require('./elasticFrame/manageMoney/productIntroduction'),
    },
     // 密码重置-客户信息确认 20
     {
        id: 'idConfirm',
        file: require('./elasticFrame/passwordReset/idConfirm'),
    },
     {
        id: 'bankCardConfirm',
        file: require('./elasticFrame/passwordReset/bankCardConfirm'),
    },
     {
        id: 'infomationVoucher',
        file: require('./elasticFrame/passwordReset/infomationVoucher'),
    },
     // 密码重置-客户信息确认 20
     {
        id: 'userConfirmation',
        file: require('./elasticFrame/passwordReset/userConfirmation'),
    },
     // 密码重置-需挂失银行卡确认 21
     {
        id: 'bankCardConfirmation',
        file: require('./elasticFrame/passwordReset/bankCardConfirmation'),
    },
     // 密码重置-修改密码  新密码输入 22
     {
        id: 'passWordConfirmation',
        file: require('./elasticFrame/passwordReset/passWordConfirmation'),
    },
     // 信用卡激活- 密码输入   27
     {
        id: 'cardPassword',
        file: require('./elasticFrame/creditCardActivation/cardPassword'),
    },
     // 信用卡激活- 密码输入   27
     {
        id: 'transactionPassword',
        file: require('./elasticFrame/creditCardActivation/transactionPassword'),
    },
     // 信用卡激活- 回单   27
     {
        id: 'creditCardReceipt',
        file: require('./elasticFrame/creditCardActivation/creditCardReceipt'),
    },
     // 结束- 实物交割   27
     {
        id: 'QRCode',
        file: require('./elasticFrame/QRCode/QRCode'),
    },
    // 密码重置-修改密码  回执单 28
    {
        id: 'passwordReceipt',
        file: require('./elasticFrame/passwordReset/passwordReceipt'),
    },
    // 理财-   理财列表详细 29
    {
        id: 'manageMoneyList',
        file: require('./elasticFrame/manageMoney/manageMoneyList'),
    },
    // 理财购买试算
    {
        id: 'purchaseTrial',
        file: require('./elasticFrame/manageMoney/purchaseTrial'),
    },
    // 理财产品信息确认
    {
        id: 'manageMoneyInfo',
        file: require('./elasticFrame/manageMoney/manageMoneyInfo'),
    },
    // 理财 银行卡信息输入
    {
        id: 'manageMoneyBank',
        file: require('./elasticFrame/manageMoney/manageMoneyBank'),
    },
    // 理财 密码输入
    {
        id: 'manageMoneyPassword',
        file: require('./elasticFrame/manageMoney/manageMoneyPassword'),
    },
    // 理财 密码输入
    {
        id: 'bankCardInfo',
        file: require('./elasticFrame/manageMoney/bankCardInfo'),
    },
    // 理财 回单
    {
        id: 'manageMoneyReceipt',
        file: require('./elasticFrame/manageMoney/manageMoneyReceipt'),
    },
     // xinyongka- 信息确认   27
     {
        id: 'creditCardInfo',
        file: require('./elasticFrame/creditCardActivation/creditCardInfo'),
    },
     // 理财- 风险揭示书
     {
        id: 'risk',
        file: require('./elasticFrame/manageMoney/risk'),
    },
     // 理财- 客户权益须知
     {
        id: 'equity',
        file: require('./elasticFrame/manageMoney/equity'),
    },

]

module.exports = PageNode;