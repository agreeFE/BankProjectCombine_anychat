
/**
 * 格式化卡号 
 * cardNum string 卡号
 * index 0-后四位 1-'1234 **** 1234' 2-'1234 1234 **** 1234; 3- 1234 1234 1234 1234 '
 */
function formatCardNum(cardNum, index) {
  let str
  switch(index) {
    // 后四位
    case 0: 
      str = cardNum.substr(-4)
      break;
    case 1: 
      str = `${cardNum.substr(0,4)} **** ${cardNum.substr(-4)}`
      break;
    case 2: 
      str = `${cardNum.substr(0,4)} ${cardNum.substr(4,4)} **** ${cardNum.substr(-4)}`
      break;
    case 3: 
      str = `${cardNum.substr(0,4)} ${cardNum.substr(4,4)} ${cardNum.substr(8,4)} ${cardNum.substr(-4)}`
      break;
    case 4: 
      str = `${cardNum.substr(0,4)} **** **** ${cardNum.substr(-4)}`
      break;
    default: 
      str = cardNum.substr(-4)
      break;
  }
  return str
}


module.exports = {
  formatCardNum
}