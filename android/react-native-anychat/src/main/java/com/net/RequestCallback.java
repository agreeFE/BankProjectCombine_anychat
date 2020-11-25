package com.net;

/**
 * Http 网络请求服务
 * Created by fgq</br>
 * Copyright ©2018 juziwl, All Rights Reserved.
 */
public interface RequestCallback {
    /**
     * 网络请求结束，服务器返回JSON数据中 code 为200
     * @param data 如果服务器JSON数据中data 字段
     * @param json 原 JSON 数据
     */
    void onSucceed(String data, String json);

    void onFail(int code, String message);
}
