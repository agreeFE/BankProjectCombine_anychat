// 全局样式
var globalStyle = {

    /*---------------------常规类(主色调,背景色,渐变色等)----------------------*/
    // 渐变背景色
    linerBackground:['#E28900', '#DD7B00', '#D46D01'],
    // 常规背景色
    backgroundColor:'#ECAA56',
    // 按钮渐变背景色
    // buttonLinerBackground:['#90B6BF', '#7A9CAB'],
    buttonLinerBackground:['#E9962F', '#FFC67E'],
    // 下标渐变色
    buttonLineLinerBackground:['#E9962F', '#FFC67E'],
    // 边框阴影色
    shadowColor:"#ddd",
    // 字体颜色
    textColor:"#fff",
    // 边框颜色
    borderColor:"#ddd",

    /*--------------------自定义组件类(新建组件时手动添加)------------------*/
    //云柜员小人所用自定义样式
    clouterCountBg:{
        backgroundColor:'#ECAA56',
    },
    /*-------------------主页------------------*/
    //主页字体颜色
    homePage: {
        adColor: '#E98013',
        textColor: '#DA8C2A',
        blockColor: '#DA8C2A'
    },
    tabBottomColor: '#DA8C2B',
    
    /*--------------------转账页面------------------*/
    // 通讯录转账
    transfer:{
        textColor: '#F39E33',
        queryColor: '#3D488C',
        queryBorder: '#3D488C',
        
    },
    //预约转账
    reservation: {
        textColor: '#DA8C2A',
        chosenColor: '#3D488C'
    },
    /*--------------------收支分析页面------------------*/
    // 扇形渐变色配置
    sectorColorConfig: {
        '.4': '#f5952a',
        '.6': '#fcbf59',
    },
    progressColor: '#3D488C',
    // 支出分类区小圆形动画颜色配置
    circleColorConfig: '#F5972C',
    innerCircleColorConfig: 'rgba(242,151,46,0.2)',

    /*--------------------网点预约页面------------------*/
    // 取号点击
    takeNum: {
        itemClickColor: '#666'
    },
    /*--------------------账户总览页面------------------*/
    account: {
        bgColor: "rgba(41,52,120,1)"
    },
    /*--------------------我的页面------------------*/
    mine:{
        textColor: '#3D488C'
    },
    tellerOperation:{
        listColor: '#E39634',
        videoUser:['#4AA3FF', '#FFB646']
    },
    
    chosenColor: '#293478',
    percentageLine:"#0E69F5",
    themeType: "blue"
};
module.exports = globalStyle;