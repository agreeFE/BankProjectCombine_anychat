/**
 * 手机号验证
 * @author 孟庆云
 * */
const mobilePhoneTest = phone => {
  const regex = /^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8})$/;

  return regex.test(phone);
}

module.exports = {
  mobilePhoneTest
}
