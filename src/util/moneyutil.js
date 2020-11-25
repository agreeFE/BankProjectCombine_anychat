// 格式化金额

const formatMoney = (s=0) => {
   // n = n > 0 && n <= 20 ? n : 2;  
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
   var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
   t = "";
   for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
   }
   return t.split("").reverse().join("") + "." + r;
}


//在金额输入框中使用,检验金额的合法性
const checkValidity = (text) => {
   let newText = (text != '' && text.substr(0, 1) == '.') ? '' : text;
   newText = newText.replace(/^0+[0-9]+/g, "0"); //不能以0开头输入
   newText = newText.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
   newText = newText.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
   newText = newText.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
   newText = newText.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
   return newText
}


// 反格式化金额
const reverseMoney = (s) => {
   return parseFloat(s.replace(/[^\d\.-]/g, ""))
}

module.exports = {
   formatMoney,
   checkValidity,
   reverseMoney
}
