import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import Pickers from '$/components/picker/pickerPro'
import { BACK_BG, GETMORE, CHECK} from '../imageSource'
import SVG from "$/components/Svg";
import scope from '@/scope'
const router = require('$/router-control')
let cityData = []
module.exports = class Apply extends Component {
  constructor(porps) {
    super(porps)
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);

    
    province.map((item, index) => {
      let obj= new Object
      obj[item] = city[index]
      cityData.push(obj)
    })
    this.state = {
      agree: true,
      selectedValue: ['北京', '北京']
    }
    
  }
  render() {
    const { agree, selectedValue } = this.state
    return (
      <View style={styles.container}>
        <Header
          title={'额度申请'} 
          leftClick={()=> {router.back()}}
          rightClick={()=> {}}
        ></Header>
        <ImageBackground source={BACK_BG} style={{height: 240, paddingLeft: 20,paddingRight: 20}}>
          <View style={styles.title}>
            <Text style={styles.titleText1}>可申请额度</Text>
            <Text style={styles.titleText2}>最高<Text style={styles.innerText}>20</Text>万元</Text>
            <Text style={styles.titleText3}>年利率6.2%起，以最终审批为准</Text>
          </View>
          <View style={styles.moreexta}>
            <View style={[styles.item, styles.border]}>
              <Text style={styles.itemFont}>随借随还</Text>
            </View>
            <View style={[styles.item, styles.border]}>
              <Text style={styles.itemFont}>快速出额度</Text>
            </View>
            <View style={[styles.item]}>
              <Text style={styles.itemFont}>按日计息</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.adView}>
          <Text style={styles.adFont}>凭借公积金、税务缴纳、个人征信申请额度</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressFont}>公积金/税务缴纳地</Text>
          <TouchableWithoutFeedback onPress={this.showAddress}>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems:"center"}}>
              <Text style={styles.addressFont}>{selectedValue[0] === selectedValue[1] ? `${selectedValue[0]}市` : `${selectedValue[0]}省 ${selectedValue[1]}市`}</Text>
              <SVG source={GETMORE} style={{width: 8, height: 16, marginLeft: 15}}></SVG>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.agreeView}>
          <TouchableWithoutFeedback onPress={() => {this.setState({agree: !agree})}}>
            <View style={{width: 24, height: 24, justifyContent: "center", alignItems: "center", marginRight: 5}}>
              <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: $globalStyle.chosenColor, backgroundColor: agree? $globalStyle.chosenColor : 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                <SVG source={agree ? require('$image/transferAccount/check.svg') : ''} style={{width: 20, height: 10}}></SVG>
              </View>
            </View>         
          </TouchableWithoutFeedback>
          <View style={{flex: 1}}>
            <Text style={styles.agreeFont}>我已阅读并同意签署
              <Text style={styles.agreeFont1} onPress={() => {this.show(1)}}>《额度借款合同》</Text>
              <Text style={styles.agreeFont1} onPress={() => {this.show(2)}}>《资信数据（含个人征信）查询授权书》</Text>
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.click}>
          <LinearGradient style={[styles.ensure, agree ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]} colors={$globalStyle.buttonLinerBackground}>
            <Text style={styles.ensureFont}>申请额度</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
        <Pickers
          ref={ref => this.picker = ref}
          pickerData={cityData}
          selectedValue={selectedValue}
          onPickerConfirm={this.getDateValue}
        ></Pickers>
      </View>
    )
  }
  click = () => {
    const { agree } = this.state
    if(agree) {
      router.replace('quotaFace')
      return
    } 
    $Toast.info('请同意相关协议')
    
    
  }
  show = (number) => {
    if( number === 1) {
      return
    }
  }

  showAddress = () => {
    this.picker.init()
  }

  getDateValue = (item) => {
    this.setState({
      selectedValue: item
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
  title:{
    height: 194,
    borderBottomColor: '#EDEEF5',
    borderBottomWidth: 1,
    alignItems: "center"
  },
  titleText1: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 18,
    color: '#333333',
    letterSpacing: 0.22,
    lineHeight: 25,
    marginTop: 39
  },
  titleText2: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 30,
    color: $globalStyle.themeType ==='blue' ? '#293478' : '#23566E',
    letterSpacing: 0.36,
    lineHeight: 42,
    marginTop: 16
  },
  innerText: {
    fontFamily: 'ArialMT',
    fontSize: 30,
    // color: '#001600',
    letterSpacing: 0.36,
    lineHeight: 42
  },
  titleText3: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#333333',
    letterSpacing: 0.18,
    lineHeight: 21,
    marginTop: 16
  },
  moreexta: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    flex: 1,
    height: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  border: {
    borderRightColor: '#EEEFF5',
    borderRightWidth: 1
  },
  itemFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999999',
    letterSpacing: 0.18,
    lineHeight: 21
  },
  adView: {
    height: 46,
    paddingLeft: 24,
    justifyContent: "center"
  },
  adFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: $globalStyle.reservation.textColor,
    lineHeight: 20
  },
  ensure: {
    marginLeft: 20,
    marginRight: 20,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60
  },
  ensureFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 24
  },
  address: {
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  addressFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    lineHeight: 21
  },
  agreeView: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 30,
    marginTop: 16,
    
  },
  agreeFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#333333',
    lineHeight: 18
  },
  agreeFont1: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#f4be7a',
    lineHeight: 18
  },

})

const province=["北京","上海","广东","江苏","浙江","重庆","安徽","福建","甘肃","广西",
"贵州","海南","河北","黑龙江","河南","湖北","湖南","江西","吉林","辽宁","内蒙古",
"宁夏","青海","山东","山西","陕西","四川","天津","新疆","西藏","云南","香港",
"澳门","台湾"]

const city=[["北京"],
      ["上海"],
      ["广州","深圳","珠海","东莞","中山","佛山","惠州","河源","潮州","江门","揭阳","茂名","梅州","清远","汕头","汕尾","韶关","顺德","阳江","云浮","湛江","肇庆"],
      ["南京","常熟","常州","海门","淮安","江都","江阴","昆山","连云港","南通","启东","沭阳","宿迁","苏州","太仓","泰州","同里","无锡","徐州","盐城","宜兴","仪征","张家港","镇江","周庄"],
      ["杭州","安吉","慈溪","定海","奉化","海盐","黄岩","湖州","嘉兴","金华","临安","临海","丽水","宁波","瓯海","平湖","千岛湖","衢州","江山","瑞安","绍兴","嵊州","台州","温岭","温州","余姚","舟山"],
      ["万州","涪陵","渝中","大渡口","江北","沙坪坝","九龙坡","南岸","北碚","万盛","双桥","渝北","巴南","黔江","长寿","綦江","潼南","铜梁","大足","荣昌","璧山","梁平","城口","丰都","垫江","武隆","忠县","开县","云阳","奉节","巫山","巫溪","石柱","秀山","酉阳","彭水","江津","合川","永川","南川"],
      ["合肥","安庆","蚌埠","亳州","巢湖","滁州","阜阳","贵池","淮北","淮南","黄山","九华山","六安","马鞍山","宿州","铜陵","屯溪","芜湖","宣城"],
      ["福州","厦门","泉州","漳州","龙岩","南平","宁德","莆田","三明"],
      ["兰州","白银","定西","敦煌","甘南","金昌","酒泉","临夏","平凉","天水","武都","武威","西峰","张掖"],
      ["南宁","百色","北海","桂林","防城港","贵港","河池","贺州","柳州","钦州","梧州","玉林"],
      ["贵阳","安顺","毕节","都匀","凯里","六盘水","铜仁","兴义","玉屏","遵义"],
      ["海口","儋县","陵水","琼海","三亚","通什","万宁"],
      ["石家庄","保定","北戴河","沧州","承德","丰润","邯郸","衡水","廊坊","南戴河","秦皇岛","唐山","新城","邢台","张家口"],
      ["哈尔滨","北安","大庆","大兴安岭","鹤岗","黑河","佳木斯","鸡西","牡丹江","齐齐哈尔","七台河","双鸭山","绥化","伊春"],
      ["郑州","安阳","鹤壁","潢川","焦作","济源","开封","漯河","洛阳","南阳","平顶山","濮阳","三门峡","商丘","新乡","信阳","许昌","周口","驻马店"],
      ["武汉","恩施","鄂州","黄冈","黄石","荆门","荆州","潜江","十堰","随州","武穴","仙桃","咸宁","襄阳","襄樊","孝感","宜昌"],
      ["长沙","常德","郴州","衡阳","怀化","吉首","娄底","邵阳","湘潭","益阳","岳阳","永州","张家界","株洲"],
      ["南昌","抚州","赣州","吉安","景德镇","井冈山","九江","庐山","萍乡","上饶","新余","宜春","鹰潭"],
      ["长春","吉林","白城","白山","珲春","辽源","梅河","四平","松原","通化","延吉"],
      ["沈阳","鞍山","本溪","朝阳","大连","丹东","抚顺","阜新","葫芦岛","锦州","辽阳","盘锦","铁岭","营口"],
      ["呼和浩特","阿拉善盟","包头","赤峰","东胜","海拉尔","集宁","临河","通辽","乌海","乌兰浩特","锡林浩特"],
      ["银川","固源","石嘴山","吴忠"],
      ["西宁","德令哈","格尔木","共和","海东","海晏","玛沁","同仁","玉树"],
      ["济南","滨州","兖州","德州","东营","菏泽","济宁","莱芜","聊城","临沂","蓬莱","青岛","曲阜","日照","泰安","潍坊","威海","烟台","枣庄","淄博"],
      ["太原","长治","大同","侯马","晋城","离石","临汾","宁武","朔州","沂州","阳泉","榆次","运城"],
      ["西安","安康","宝鸡","汉中","渭南","商州","绥德","铜川","咸阳","延安","榆林"],
      ["成都","巴中","达川","德阳","都江堰","峨眉山","涪陵","广安","广元","九寨沟","康定","乐山","泸州","马尔康","绵阳","眉山","南充","内江","攀枝花","遂宁","汶川","西昌","雅安","宜宾","自贡","资阳"],
      ["天津"],
      ["乌鲁木齐","阿克苏","阿勒泰","阿图什","博乐","昌吉","东山","哈密","和田","喀什","克拉玛依","库车","库尔勒","奎屯","石河子","塔城","吐鲁番","伊宁"],
      ["拉萨","阿里","昌都","林芝","那曲","日喀则","山南"],
      ["昆明","大理","保山","楚雄","东川","个旧","景洪","开远","临沧","丽江","六库","潞西","曲靖","思茅","文山","西双版纳","玉溪","中甸","昭通"],
      ["香港"],
      ["澳门"],
      ["台北","基隆","台南","台中","高雄","屏东","南投","云林","新竹","彰化","苗栗","嘉义","花莲","桃园","宜兰","台东","金门","马祖","澎湖"],
    ];
