// 全局样式
var globalStyle = {

    /*---------------------常规类----------------------*/
    // 渐变背景色
    linerBackground: ['#307EA2', '#2B6C8A', '#1F536C'],
    // 常规背景色
    backgroundColor: '#7FA2B0',
    // 按钮渐变背景色
    // buttonLinerBackground:['#E9962F', '#FFC67E'],
    buttonLinerBackground:['#9CC8D2', '#7AA2AB'],
    // 下标渐变色
    buttonLineLinerBackground:['#D5E3E7', '#D1E0E5','#D5E3E7'],
    // buttonLinerBackground: ['#3481A5', '#1F4C61'],

    // 边框阴影色
    shadowColor: "#ddd",
    // 字体颜色
    textColor: "#fff",
    // 边框颜色
    borderColor: "#ddd",

    /*--------------------自定义控件类------------------*/
    //云柜员小人所用自定义样式
    clouterCountBg: {
        // backgroundColor: '#7FA2B0',
        backgroundColor: '#7AA2AB',
    },
    /*-------------------主页------------------*/
    //主页字体颜色
    homePage: {
        adColor: '#296682',
        textColor: '#7AA2AB',
        blockColor: '#1F4C61'
        // btnColor: ['#3481A5', '#1F4C61']
    }, 
    tabBottomColor: '#23566E',
    /*--------------------转账页面------------------*/
    // 通讯录转账
    transfer:{
        textColor: '#7AA2AB',
        queryColor: '#7AA2AB',
        queryBorder: '#CECECE',
        // #7AA2AB
    },
    //预约转账
    reservation: {
        textColor: '#7AA2AB',
        chosenColor: '#7AA2AB'
    },
    /*--------------------收支分析页面------------------*/
    // 扇形渐变色配置
    sectorColorConfig: {
        '.4': '#27CBD2',
        '.6': '#77EEF6',
    },
    progressColor: '#305F70',
    // 支出分类区小圆形动画颜色配置
    circleColorConfig: '#27CCD2',    
    innerCircleColorConfig: 'rgba(163,249,255,0.2)',

     /*--------------------网点预约页面------------------*/
    // 取号点击
    takeNum: {
        itemClickColor: '#7AA2AB'
    },
    /*--------------------账户总览页面------------------*/
    account: {
        bgColor: "rgba(122,162,171,1)"
    },
    /*--------------------我的页面------------------*/
    mine:{
        textColor: '#1F4C61'
    },
    tellerOperation:{
        listColor: '#1F4C61',
        videoUser:['#7BAEC6', '#7BAEC6']
    },

    // 是否选择背景 
    chosenColor: '#7aa2ab', 
    percentageLine:"#7FA2B0",
    themeType: "green",
};
module.exports = globalStyle;