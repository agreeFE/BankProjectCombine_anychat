
/**
 * @手机号码格式化
 * @param {val} 需格式化的手机号
 * @returns
 */
const formatPhone = (val) => {
  val = val.replace(/[^\d]/g, '').substr(0,11)
  if (val.length <= 3) {
    return val
  } else if (val.length <= 7) {
    val = val.replace(/(\d{3})(\d{0,4})/, '$1-$2')
  } else {
    val = val.replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1-$2-$3')
  }
  return val
}

module.exports={
  formatPhone
}