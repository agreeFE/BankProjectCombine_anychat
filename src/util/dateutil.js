/**
 * 获取系统当前时间戳
 * @author 孟庆云
 *  */
function getTimespamp(date) {
  return date.getTime();
}

/**
 * 获取系统当前年月
 * @author 孟庆云
 *  */
function getYearMouth() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  var currentData = '' + year + month;
  return currentData;
}
/**
 * 获取系统当前年月日
 *
 */

function getYearMouthDay() {
  let date = new Date();
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return '' + year + month + day;
}
/**
 * 获取系统当前年月日,格式化
 *
 */
function getYearMouthDayLine(separator="-") {
  let date = new Date();
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return year+ separator + month+ separator + day;
}

function getDatetimeByFormat(date, format) {
  if (!date) {
    date = new Date();
  }

  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let hours24 = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  let hours12 = date.getHours() % 12;
  hours12 = hours12 == 0 ? 12 : (hours12 > 9 ? hours12 : `0${hours12}`);
  let minutes =
    date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  let seconds =
    date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;

  return format
    .replace(/yyyy/, year)
    .replace(/MM/, month)
    .replace(/dd/, day)
    .replace(/HH/, hours24)
    .replace(/hh/, hours12)
    .replace(/mm/, minutes)
    .replace(/ss/, seconds);
}

// 生成用于picker组件使用的年月日数据
function getYearMonthDayArray(startYear, endYear) {
  let resultArr = []
  for (let i = startYear; i < endYear; i++) {
    let yearObj = {}
    let monthArr = []
    for (let j = 1; j < 13; j++) {
      let monthObj = {}
      let dayArr = []
      let dayNums = 32
      if (j == 2) {
        //如果是闰年
        if ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0) {
          dayNums = 30;
          //如果是平年
        } else {
          dayNums = 29;
        }
      } else if(j == 4 || j == 6 ||j == 9 ||j == 11) {
        dayNums = 31
      }
      for (let k = 1; k < dayNums; k++) {
        if (k < 10) {
          dayArr.push(( k + '日'))
        } else {
          dayArr.push((k + '日'))
        }
      }
      if (j < 10) {
        monthObj[(j + '月')] = dayArr
      } else {
        monthObj[(j + '月')] = dayArr
      }
      monthArr.push(monthObj)
    }

    yearObj[(i + '年')] = monthArr
    resultArr.push(yearObj)
  }
  return resultArr
}

// 生成用于picker组件使用的年月数据
function getYearMonthArray(startYear, endYear) {
  let resultArr = []
  for (let i = startYear; i < endYear; i++) {
    let yearObj = {}
    let monthArr = []
    for (let j = 1; j < 13; j++) {
      
      if (j < 10) {
        monthArr.push(('0' + j + '月'))
      } else {
        monthArr.push(( j + '月'))
      }
    }

    yearObj[(i + '年')] = monthArr
    resultArr.push(yearObj)
  }
  return resultArr
}

function getDayArray() {
  let resultArr = []
  for (let i = 1; i < 29; i++) {
    if (i < 10) {
      resultArr.push(('0' + i + '日'))
    } else {
      resultArr.push((i + '日'))
    }
  }
  return resultArr
}

module.exports = {
  getTimespamp,
  getYearMouth,
  getYearMouthDay,
  getDatetimeByFormat,
  getYearMonthDayArray,
  getYearMouthDayLine,
  getYearMonthArray,
  getDayArray
};
