package com.net;

import android.util.Log;

import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.CacheControl;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

/**
 * Http 网络请求服务
 * Created by fgq</br>
 * Copyright ©2018 juziwl, All Rights Reserved.
 */

public final class HttpAPI {
    private static OkHttpClient g_client;

    public static final MediaType JSON = MediaType.parse("application/json; charset=GB18030");

    private HttpAPI(){

        // 初始化 OkHttp3 网络请求库
        int cacheSize = 10 * 1024 * 1024;
        OkHttpClient.Builder builder = new OkHttpClient.Builder()
                .connectTimeout(15, TimeUnit.SECONDS)
                .writeTimeout(20, TimeUnit.SECONDS)
                .readTimeout(20, TimeUnit.SECONDS)
                //.cache(new Cache(cachePath.getAbsoluteFile(), cacheSize))
                .addInterceptor(new LogInterceptor());
        g_client = builder.build();

    }

    private static HttpAPI g_singleton = new HttpAPI();
    public static HttpAPI getInstance(){
        return g_singleton;
    }


    /**
     * 处理网络请求回调
     */
    class HttpCallbackImpl implements Callback {
        private RequestCallback callback;

        public HttpCallbackImpl(RequestCallback callback) {
            this.callback = callback;
        }

        @Override
        public void onFailure(Call call, IOException e) {
            if(null != callback)
                callback.onFail(-102,e.getMessage());
        }

        @Override
        public void onResponse(Call call, Response response) throws IOException {
            if(null != callback){
//                ResponseBody responseBody = response.body();
//                byte[] b = responseBody.bytes();     //获取数据的bytes
//                String info = new String(b, "GB18030");   //然后将其转为gb2312
//                Log.e("fgqhaha",info);

                Response aa = call.execute();
                byte[] responseStr = aa.body().bytes();
                String info = new String(responseStr, "GB18030");   //然后将其转为gb2312

                Log.e("fgqhaha",info);




                // Log.e("fgqhaha",responseBody.string());


//                try {
//                    Log.e("fgqhaha",data);
//                    String clientStr = new String(data.getBytes("gbk"), "utf-8");
//                    Log.e("fgqha","数据"+clientStr);
//                } catch (UnsupportedEncodingException e) {
//                    e.printStackTrace();
//                }

//                JSONObject object = null;
//                try {
//                    object = new JSONObject(data);
//                    JSONObject header = (JSONObject) object.get("header");
//                    int code = header.getInt("code");
//                    String message=header.getString("msg");
//                    if(code==200){
//                        callback.onSucceed(message,data);
//                    }else{
//                        callback.onFail(code,message);
//                    }
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }
            }
        }
    }


    /**
     * GET 网络请求
     * @param action 请求路径
     * @param headers 头数据
     * @param callback 回调
     */
    public void get(String action,Map<String, Object> headers,RequestCallback callback){
        Request.Builder builder = new Request.Builder().url(action);

        // 不使用缓存，仅网络
        CacheControl.Builder cacheBuilder = new CacheControl.Builder();
        cacheBuilder.noCache();
        builder.cacheControl(cacheBuilder.build());

        // 添加默认的头信息
        builder.addHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        builder.addHeader("Accept-Language","en-us,en;q=0.5");
        builder.addHeader("Content-Type","application/json");
       // builder.addHeader("content-type", "application/json;charset=gbk");


        if(null != headers && headers.size() > 0){
            Iterator<String> it = headers.keySet().iterator();
            while (it.hasNext()){
                String key = it.next();
                String value = headers.get(key) != null ? headers.get(key).toString():"";
                builder.addHeader(key,value);
            }
        }

        Call call = g_client.newCall(builder.build());
        call.enqueue(new HttpCallbackImpl(callback));
    }



    /**
     * POST 网络请求
     * @param action 网络路径
     * @param headers 头数据
     * @param params 参数
     * @param callback 回调
     */
    public void post(String action,Map<String, Object> headers,Map<String, Object> params,RequestCallback callback){
        request(METHOD.POST,action,headers,params,callback);
    }


    /**
     * PUT 网络请求
     * @param action 网络路径
     * @param headers 头数据
     * @param params 参数
     * @param callback 回调
     */
    public void put(String action,Map<String, Object> headers,Map<String, Object> params,RequestCallback callback){
        request(METHOD.PUT,action,headers,params,callback);
    }


    /**
     * 网络请求
     * @param method 请求方法
     * @param action 网络路径
     * @param headers 头数据
     * @param params 参数
     * @param callback 回调
     */
    private void request(METHOD method, String action, Map<String, Object> headers, Map<String, Object> params, RequestCallback callback){
        Request.Builder builder = new Request.Builder().url(action);

        // 不使用缓存，仅网络
        CacheControl.Builder cacheBuilder = new CacheControl.Builder();
        cacheBuilder.noCache();
        builder.cacheControl(cacheBuilder.build());


        // 添加默认的头信息
//        builder.addHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
//        builder.addHeader("Accept-Language","en-us,en;q=0.5");
//        builder.addHeader("Content-Type","application/json");



        if(null != headers && headers.size() > 0){
            Iterator<String> it = headers.keySet().iterator();
            while (it.hasNext()){
                String key = it.next();
                String value = headers.get(key) != null ? headers.get(key).toString():"";
                builder.addHeader(key,value);
            }
        }

        Map<String,Object> paramsBody = new HashMap<>();


        // 写入请求数据 body
        String bodyContent = "";
        if(null != params && !params.isEmpty()){
            paramsBody.putAll(params);
        }
        bodyContent = JSONUtil.toJson(paramsBody);
        RequestBody body = RequestBody.create(JSON,bodyContent);
        switch (method){
            case GET:
                break;
            case POST:
                builder.post(body);
                break;
            case PUT:
                builder.put(body);
                break;
            case DELETE:
                builder.delete(body);
                break;
        }

        Call call = g_client.newCall(builder.build());
        call.enqueue(new HttpCallbackImpl(callback));
    }
}
