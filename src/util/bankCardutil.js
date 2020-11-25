const NetworkUtil = require('$/util/networkutil');

//获取当前账户下所有银行卡信息

const getBankCard = (succ) => {
  if(window.bankCard) {
    succ(window.bankCard)
    return 
  }
  let info = {classify: 2}
  NetworkUtil.networkService('/account/bankcard/list', info, response => {
    window.bankCard = response.appBankCards
    succ(window.bankCard)
  })

}

const changeBankCard = () => {
  let info = {classify: 2}
  NetworkUtil.networkService('/account/bankcard/list', info, response => {
    window.bankCard = response.appBankCards
  })
}

module.exports = {
  getBankCard,
  changeBankCard
}