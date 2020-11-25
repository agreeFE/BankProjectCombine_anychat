package com.net;

import java.io.IOException;
import java.util.Iterator;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okio.Buffer;

/**
 * Http 网络请求服务
 * Created by fgq</br>
 * Copyright ©2018 juziwl, All Rights Reserved.
 */

public class LogInterceptor implements Interceptor {

    @Override
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        StringBuffer buffer = new StringBuffer();
        buffer.append("---- request start ---->");
        buffer.append("\n");
        buffer.append("url:" + request.url().url().toString());
        buffer.append("\n");
        buffer.append("method:" + request.method());
        buffer.append("\n");
        Iterator<String> headerIt = request.headers().names().iterator();
        while (headerIt.hasNext()){
            String name = headerIt.next();
            buffer.append(name + ":" + request.headers().get(name));
            buffer.append("\n");
        }
        buffer.append("request:\n");
        RequestBody body = request.body();
        buffer.append("  length:" + (body != null ? body.contentLength() : "0") + "\n");
        if(body != null){
            Request requestCopy = request.newBuilder().build();
            Buffer bodyBuffer = new Buffer();
            requestCopy.body().writeTo(bodyBuffer);
            buffer.append("  content:" + bodyBuffer.readUtf8() + "\n");
        }
        Response response = chain.proceed(chain.request());
        okhttp3.MediaType mediaType = response.body().contentType();
        String content = response.body().string();
        buffer.append("response:");
        buffer.append("\n  length:"+ content.length() + "\n" +
                "  code:" + response.code() + "\n" +
                "  message:" + response.message());
        buffer.append("\n");
        buffer.append("  " + content);
        buffer.append("\n");
        buffer.append("<---- request end -----");
        return response.newBuilder()
                .body(okhttp3.ResponseBody.create(mediaType, content))
                .build();
    }
}
