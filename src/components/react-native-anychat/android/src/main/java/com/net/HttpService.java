package com.net;

import java.util.Map;

/**
 * Http 网络请求服务
 * Created by fgq</br>
 * Copyright ©2018 juziwl, All Rights Reserved.
 */

public final class HttpService {
    private HttpService(){}
    private static HttpService g_singleton = new HttpService();
    /**
     * 生成一个网络请求构造器
     * @return
     */
    public static Builder newBuilder(){
        return new Builder();
    }

    /**
     * 网络请求构造器
     */
    public static class Builder{
        private METHOD method = METHOD.GET;
        private String action;
        private Map<String,Object> header;
        private Map<String,Object> params;
        private RequestCallback callback;

        /**
         * 设置网络请求方法
         * @param method
         * @return
         */
        public Builder setMethod(METHOD method){
            this.method = method;
            return this;
        }

        /**
         * 设置请求路径
         * @param action
         */
        public Builder setAction(String action){
            this.action = action;
            return this;
        }

        /**
         * 设置请求头
         * @param header
         */
        public Builder setHeader(Map<String,Object>  header){
            this.header = header;
            return this;
        }

        /**
         * 设置请求参数
         * @param params
         * @return
         */
        public Builder setParams(Map<String,Object> params){
            this.params = params;
            return this;
        }

        /**
         * 绑定网络请求回调
         * @param callback
         * @return
         */
        public Builder setCallback(RequestCallback callback){
            this.callback = callback;
            return this;
        }

        /**
         * 执行网络请求
         */
        public void execute(){
            switch (method){
                case GET:
                    g_singleton.get(action,null != header ? header : null,callback);
                    break;

                case POST:
                    g_singleton.post(action,null != header ? header: null,null != params ? params : null,callback);
                    break;

                case PUT:
                    g_singleton.put(action,null != header ? header : null,null != params ? params : null,callback);
                    break;

                default:
                    break;
            }
        }
    }

    /**
     * 获取实例
     * @return
     */
    public static HttpService getInstance(){
        return g_singleton;
    }

    /**
     * GET 网络请求
     * @param action 请求路径
     * @param headers 头数据
     * @param callback 回调
     */
    public void get(String action, Map<String, Object> headers, RequestCallback callback){
        HttpAPI.getInstance().get(action,headers,callback);
    }

    /**
     * POST 网络请求
     * @param action 网络路径
     * @param headers 头数据
     * @param params 参数
     * @param callback 回调
     */
    public void post(String action,Map<String, Object> headers,Map<String, Object> params,RequestCallback callback){
        HttpAPI.getInstance().post(action,headers,params,callback);
    }

    /**
     * PUT 网络请求
     * @param action 网络路径
     * @param headers 头数据
     * @param params 参数
     * @param callback 回调
     */
    public void put(String action,Map<String, Object> headers,Map<String, Object> params,RequestCallback callback){
        HttpAPI.getInstance().put(action,headers,params,callback);
    }
}
