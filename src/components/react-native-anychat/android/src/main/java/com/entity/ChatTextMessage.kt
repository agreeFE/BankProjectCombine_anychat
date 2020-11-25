package com.entity

import com.android.anychat.R


/**
 * Created by wanghefu on 2018/7/25.
 */

data class ChatTextMessage(               //字段名称 类型 长度 Y：必输 N：非必输 备注
        var CommandType : String? = null, // message notice upload download(to server)

        var sessionid   : String? = null, //会话ID char 30 Y 建立聊天报文中携带会话ID
        var mmid        : String? = null, //多媒体连接号 Char 30 Y
        var msgtype     : String? = null, //消息类型 char 10 Y 文字：text；
        var msgcontent  : String? = null, //消息内容 char Y 文本内容。
        var msgchannel  : String? = null, //消息渠道 char 10 Y 设置渠道类型如webchat、appchat和wechat等
        var fromuser    : String? = null, //发送方 char 20 Y 发送方业务名称
        var touser      : String? = null, //目标方 char 20 Y 目标方业务名称
        var msgid       : String? = null, //消息id Char 20 Y 消息id，保证单笔会话惟一(渠道号+发起方名称+8位序号)

        var roomid      : String? = null
) : Message{
    override fun userName(): String? {
        return fromuser
    }

    override fun userImg(): Int {
        return R.drawable.personal_info_call
    }

    override fun viewType(): Int {
        return ViewType.LEFT_TEXT
    }
}
