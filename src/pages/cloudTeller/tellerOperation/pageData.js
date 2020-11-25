var pageData = {
    idConfirm: {
        showData: [{
                FIELDNAME: "证件类型",
                FIELDVALUE: "身份证"
            },
            {
                FIELDNAME: "证件号码",
                FIELDVALUE: "511621198512073898"
            },
            {
                FIELDNAME: "姓名",
                FIELDVALUE: "马德政"
            },
            {
                FIELDNAME: "性别",
                FIELDVALUE: "男"
            },
            {
                FIELDNAME: "地址",
                FIELDVALUE: "河北省石家庄市正定县新城铺镇西咬村祥春胡同10号"
            },
            {
                FIELDNAME: "证件有效期",
                FIELDVALUE: "20300514"
            },
        ],
        submitData: [{
                FIELDCODE: "IDTYPE",
                FIELDVALUE: "02"
            },
            {
                FIELDCODE: "IDNO",
                FIELDVALUE: "511621198512073898"
            },
            {
                FIELDCODE: "IDNAME",
                FIELDVALUE: "马德政"
            },
            {
                FIELDCODE: "IDSEX",
                FIELDVALUE: "1"
            },
            {
                FIELDCODE: "IDADDRESS",
                FIELDVALUE: "河北省石家庄市正定县新城铺镇西咬村祥春胡同10号"
            },
            {
                FIELDCODE: "IDCERTDUEDATE",
                FIELDVALUE: "20200514"
            },
        ]
    },
    bankCardConfirm: {
        showData: [{
            FIELDNAME: "银行卡卡号",
            FIELDVALUE: "6201116010888800076"
        }],
        submitData: [{
            FIELDCODE: "ACCNO",
            FIELDVALUE: "6201116010888800076"
        }]
    },
}
pageData = JSON.stringify(pageData)
module.exports = pageData;