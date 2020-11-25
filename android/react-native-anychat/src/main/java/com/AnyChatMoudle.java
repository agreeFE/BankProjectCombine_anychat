package com;

import android.Manifest;
import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Handler;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.net.HttpService;
import com.net.RequestCallback;
import com.utils.Constant;
import com.utils.ReactFindViewUtil;
import com.utils.RxPermissions;
import com.view.MySurfaceView;
import com.view.glsurface.RoundCameraGLSurfaceView;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Random;

import javax.annotation.Nullable;

import io.reactivex.annotations.NonNull;
import io.reactivex.functions.Consumer;

@ReactModule(name = Constant.MODULE_NAME)
public class AnyChatMoudle extends ReactContextBaseJavaModule implements AnyChatTool.CallBack {
    private ReactApplicationContext mContext;

    private String[] CAMERA_PERMISSIONS = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.CAMERA, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.RECORD_AUDIO};
    public AnyChatTool anyChatTool;

    public static final int CLOSE = 0;
    public static final int OPEN = 1;
    public Handler handler;
    private SharedPreferences mShare ;


    public AnyChatMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        mShare = reactContext.getSharedPreferences("round_play_view", ReactApplicationContext.MODE_PRIVATE);
        mShare.edit().clear().apply();
        mContext = reactContext;
        anyChatTool = new AnyChatTool();
        AnyChatTool.setCallBack(this);
    }

    @Override
    public String getName() {
        return Constant.MODULE_NAME;
    }

    /**
     * RN调用anychat初始化
     */
    @ReactMethod
    public void init(final Callback successCallback, final Callback errorCallback) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.init(getCurrentActivity(), successCallback);
//                                        Handler handler=new Handler();
//                                        AnyChatPopwindow anyChatPopwindow=new AnyChatPopwindow(getCurrentActivity(),handler,111);
//                                        View view=getCurrentActivity().getWindow().getDecorView().findViewById(android.R.id.content);
//                                        anyChatPopwindow.showAtLocation(view, Gravity.TOP | Gravity.CENTER_HORIZONTAL, 0, 0);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                    return;
                                }
                            }
                        });
            }
        });
    }

    /**
     * RN调用anychat初始化
     */
    @ReactMethod
    public void enterLine(final ReadableMap readableMap, final Callback successCallback, final Callback errorCallback) {
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();
        Log.e("enterLine => {}",new JSONObject(map).toString());

        anyChatTool.sHostUrl = (String) map.get("enterLineUrl");
        anyChatTool.sBusinessId = (String) map.get("businessId");
        anyChatTool.IDNO = (String) map.get("IDNO");
        anyChatTool.IDTYPE = (String) map.get("IDTYPE");
        anyChatTool.IDNAME = (String) map.get("IDNAME");
        anyChatTool.conferUniID = (String) map.get("CONFERUNIID");
        anyChatTool.userFlag = (String) map.get("USERFLAG");
        if (anyChatTool.isLogin) {
            try {
                anyChatTool.successCallback = successCallback;
                anyChatTool.errorCallback = errorCallback;
                anyChatTool.waitEnterRoom();
            } catch (Exception e) {
                e.printStackTrace();
                errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "进线失败"));
            }
        } else {
            try {
                newUser(successCallback, errorCallback);
            } catch (JSONException e) {
                e.printStackTrace();
                errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "创建用户失败"));
            }
        }

    }

    /**
     * RN调用anychat退线
     */
    @ReactMethod
    public void quitLine(final Callback successCallback, final Callback errorCallback) {
        try {
            if (anyChatTool.isInQuene) {
                quitQuene(successCallback, errorCallback);
            } else {
                anyChatTool.enterQuene = false;

                quitQuene(successCallback, errorCallback);
                anyChatTool.enterQuene = true;

            }

        } catch (JSONException e) {
            e.printStackTrace();

        }

    }

    /**
     * 退线方法
     * @param successCallback
     * @param errorCallback
     * @throws JSONException
     */
    private void quitQuene(final Callback successCallback, final Callback errorCallback) throws JSONException {

        JSONObject params = new JSONObject();
        JSONObject head = new JSONObject();
        JSONObject body = new JSONObject();
        head.put("ConsumerId", "C002");
        head.put("ConsumerSeqNo", System.currentTimeMillis() + "" + new Random().nextInt(10000));
        head.put("RequestDate", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        head.put("RequestTime", new SimpleDateFormat("HHmmss").format(new Date()));
        head.put("TransServiceCode", "cancelvideo_esb");
        body.put("QUEUENO", AnyChatTool.sQueueno);
        body.put("QUEDATE", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        params.put("Head", head);
        params.put("Body", body);


        HttpService.getInstance().post(
                TextUtils.isEmpty(AnyChatTool.sHostUrl) ? Constant.HOST_URL : AnyChatTool.sHostUrl,
                null,
                params.toString(),
                new RequestCallback() {
                    @Override
                    public void onSucceed(String data, String json) {
                        Log.e("AnyChatMoudle", "quitQueuen: "+ json );
                        successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "取消进线成功"));
                        AnyChatTool.sQueueno = null;
                    }

                    @Override
                    public void onFail(int code, String message) {
                        Log.e("createUser", "onFail message: " + message + "|| code :  " + code);
                        errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, message));
                    }
                });


    }

    public void newUser(final Callback successCallback, final Callback errorCallback) throws JSONException {
        JSONObject params = new JSONObject();
        JSONObject head = new JSONObject();
        JSONObject body = new JSONObject();
        head.put("ConsumerId", "C002");
        head.put("ConsumerSeqNo", System.currentTimeMillis() + "" + new Random().nextInt(10000));
        head.put("RequestDate", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        head.put("RequestTime", new SimpleDateFormat("HHmmss").format(new Date()));
        head.put("TransServiceCode", "que012_esb");
        body.put("APPLYCHANNELCODE", "C002");
        body.put("CONFERUNIID", anyChatTool.conferUniID);
        body.put("USERFLAG", anyChatTool.userFlag);
        params.put("Head", head);
        params.put("Body", body);

        Log.e("params", "params data: " + params);
        Log.e("HOST_URL", "HOST_URL data: " + Constant.HOST_URL);
        Log.e("AnyChatTool.sHostUrl", "AnyChatTool.sHostUrl data: " + AnyChatTool.sHostUrl);
        HttpService.getInstance().post(
                 AnyChatTool.sHostUrl,
//                TextUtils.isEmpty(AnyChatTool.sHostUrl) ? Constant.HOST_URL : AnyChatTool.sHostUrl,
                null,
                params.toString(),
                new RequestCallback() {

                    @Override
                    public void onSucceed(String data, String json) {
                        Log.e("createUser", "onSucceed data: " + data);
                        Log.e("createUser", "onSucceed json: " + json);
                        try {
                            JSONObject response = new JSONObject(json);
                            JSONObject responseHEAD = response.optJSONObject("Head");
                            if ("000000".equalsIgnoreCase(responseHEAD.optString("ReturnCode"))) {
                                JSONObject responseEntity = response.optJSONObject("Body");
                                anyChatTool.loginEx(responseEntity.getString("IP"),
                                        Integer.parseInt(responseEntity.getString("PORT")),
                                        responseEntity.getString("USERNAME"),
                                        Integer.parseInt(responseEntity.getString("USERID")),
                                        responseEntity.getString("USERID"),
                                        responseEntity.getString("APPID"),
                                        Integer.parseInt(responseEntity.getString("TIMESTAMP")),
                                        responseEntity.getString("PASSWORD"),

                                        successCallback,
                                        errorCallback,
                                        handler,
                                        ""
                                );
                                anyChatTool.userFlag = responseEntity.getString("USERFLAG");
                                anyChatTool.judgeFlag = responseEntity.getString("JUDGEFLAG");
                                anyChatTool.conferID = responseEntity.optString("CONFERID");
                            } else {
                                errorCallback.invoke(getErrorWritableMap(responseHEAD.optString("ReturnCode"), responseHEAD.optString("ReturnMessage")));
                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "返回参数解析异常"));
                        }


                    }

                    @Override
                    public void onFail(int code, String message) {
                        Log.e("createUser", "onFail message: " + message + "|| code :  " + code);

                    }
                });
    }


    /**
     * RN调用login登录
     */
    @ReactMethod
    public void login(final ReadableMap readableMap, final Callback successCallback, final Callback errorCallback) {
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();

        final String pwd = (String) map.get("pwd");
        final String name = (String) map.get("name");
        final String anychaturl = (String) map.get("anychaturl");
        final String anychatport = (String) map.get("anychatport");

//        final String anychaturl=Constant.onlineIp;
//        final String anychatport = Constant.onlinePort;
//          final String name = "肖慧杨";

        if (anychaturl == null || "".equals(anychaturl) || anychatport == null || "".equals(anychatport) || name == null || "".equals(name)) {
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "参数错误"));
            return;
        }

        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    Handler handler = new Handler();
                                    anyChatTool.login(anychaturl, Integer.parseInt(anychatport), name, pwd, successCallback, errorCallback, handler);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }


    /**
     * RN调用loginOut退出
     */
    @ReactMethod
    public void loginOut(final Callback successCallback, final Callback errorCallback) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.loginOut();
                                    successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }

    /**
     * RN调用loginOut退出
     */
    @ReactMethod
    public void hangUp(ReadableMap readableMap, final Callback successCallback, final Callback errorCallback) {
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();

        final String roomIdtemp = (String) map.get("roomId");
        final int roomId;
        if (roomIdtemp == null || "".equals(roomIdtemp)) {
            roomId = -1;
        } else {
            roomId = Integer.valueOf(roomIdtemp);
        }
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.hangUp(roomId);
                                    successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }

    /**
     * RN调用enterRoom进入房间
     */
    @ReactMethod
    public void enterRoom(final ReadableMap readableMap, final Callback successCallback, final Callback errorCallback) {
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();
        final String roomIdtemp = (String) map.get("roomId");
        // final String remoteIdtemp = (String) map.get("remoteId");

        // if (roomIdtemp == null || "".equals(remoteIdtemp) || remoteIdtemp == null || "".equals(remoteIdtemp)) {
        if (roomIdtemp == null) {
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "参数不对"));
            return;
        }
        final int roomId = Integer.valueOf(roomIdtemp);
        // final int remoteId = Integer.valueOf(remoteIdtemp);

        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    final Handler handler = new Handler();
                                    // anyChatTool.enterRoom(getCurrentActivity(), remoteId, roomId, handler, successCallback, errorCallback);
                                    anyChatTool.enterRoom(getCurrentActivity(), roomId, handler, successCallback, errorCallback);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }

    /**
     * RN调用outRoom离开房间
     */
    @ReactMethod
    public void outRoom(final ReadableMap readableMap, final Callback successCallback, final Callback errorCallback) {
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();

        final String roomIdtemp = (String) map.get("roomId");
        final int roomId;
        if (roomIdtemp == null || "".equals(roomIdtemp)) {
            roomId = -1;
        } else {
            roomId = Integer.valueOf(roomIdtemp);
        }
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.outRoom(roomId);
                                    successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }




    @ReactMethod

    public void changePlayViewCircle(final String nativeId, final Callback successCallback, final Callback errorCallback) {
        final MySurfaceView surfaceView = (MySurfaceView) ReactFindViewUtil.findView(getCurrentActivity().getWindow().getDecorView(), nativeId);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {

            if(mShare != null){
                mShare.edit().putBoolean("circle",true).apply();
                mShare.edit().putBoolean("square",false).apply();
                mShare.edit().putString(nativeId , nativeId).commit();
            }
            surfaceView.changeShape();
            successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
        } else {
            successCallback.invoke(getSuccessWritableMap(Constant.API_DENIED, "版本不支持"));
        }

    }

    @ReactMethod

    public void changePlayViewSquare(final String nativeId, final Callback successCallback, final Callback errorCallback) {
        final MySurfaceView surfaceView = (MySurfaceView) ReactFindViewUtil.findView(getCurrentActivity().getWindow().getDecorView(), nativeId);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//            surfaceView.setCircle(false);
//            surfaceView.setSquare(true);
            if(mShare != null){
                mShare.edit().putBoolean("circle",false).apply();
                mShare.edit().putBoolean("square",true).apply();
                mShare.edit().putString(nativeId , nativeId).commit();
            }
            surfaceView.changeShape();
            successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
        } else {
            successCallback.invoke(getSuccessWritableMap(Constant.API_DENIED, "版本不支持"));
        }

    }


    @ReactMethod

    public void changePlayViewNormal(final String nativeId, final Callback successCallback, final Callback errorCallback) {
        final MySurfaceView surfaceView = (MySurfaceView) ReactFindViewUtil.findView(getCurrentActivity().getWindow().getDecorView(), nativeId);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            if(mShare != null) {
                mShare.edit().putBoolean("circle", false).commit();
                mShare.edit().putBoolean("square", false).commit();
                mShare.edit().putString(nativeId, nativeId).commit();
            }
            surfaceView.changeShape();
            successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
        } else {
            successCallback.invoke(getSuccessWritableMap(Constant.API_DENIED, "版本不支持"));
        }

    }

    @ReactMethod
    public void changePlayViewRect(final String nativeId, final Callback successCallback, final Callback errorCallback) {
        final RoundCameraGLSurfaceView surfaceView = (RoundCameraGLSurfaceView) ReactFindViewUtil.findView(getCurrentActivity().getWindow().getDecorView(), nativeId);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            surfaceView.changeToRect();
            successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
        } else {
            successCallback.invoke(getSuccessWritableMap(Constant.API_DENIED, "版本不支持"));
        }

    }

    /**
     * RN调用  视频弹窗隐藏
     */
    @ReactMethod
    public void anyChatPlay(final ReadableMap readableMap, final Callback successCallback, final Callback errorCallback) {
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();
        String userNativeViewId = (String) map.get("userNativeViewId");
        String remoteNativeViewId = (String) map.get("remoteNativeViewId");
        final String remoteIdtemp = (String) map.get("remoteId");
        final int remoteId = Integer.valueOf(remoteIdtemp);

        final MySurfaceView userSurface = (MySurfaceView) ReactFindViewUtil.findView(getCurrentActivity().getWindow().getDecorView(), userNativeViewId);
        final MySurfaceView remoteSurface = (MySurfaceView) ReactFindViewUtil.findView(getCurrentActivity().getWindow().getDecorView(), remoteNativeViewId);
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.anyChatPlay(userSurface, remoteSurface, remoteId, successCallback);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }


    /**
     * RN调用  视频弹窗隐藏
     */
    @ReactMethod
    public void anyChatHide(final Callback successCallback, final Callback errorCallback) {

        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.anyChathide(successCallback);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }

    /**
     * RN调用 视频弹窗显示
     */
    @ReactMethod
    public void anyChatShow(final Callback successCallback, final Callback errorCallback) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.anyChatShow(successCallback);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }


    /**
     * RN调用 视频弹窗关闭
     */
    @ReactMethod
    public void anyChatClose(final Callback successCallback, final Callback errorCallback) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.anyChatClose(successCallback);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }

    /**
     * RN调用 关闭摄像头
     */
    @ReactMethod
    public void closeCamera(final boolean close, final Callback successCallback, final Callback errorCallback) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.closeCamera(close, successCallback);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }

    /**
     * RN调用 切换摄像头
     */
    @ReactMethod
    public void switchCamera( final Callback successCallback, final Callback errorCallback) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.switchCamera(successCallback, errorCallback);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }
    /**
     * RN调用 关闭语音
     */
    @ReactMethod
    public void closeSpeak(final boolean close, final Callback successCallback, final Callback errorCallback) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.closeSpeak(close, successCallback);
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }

    /**
     * RN调用 更新进度
     */
    @ReactMethod
    public void updateProgress(final ReadableMap readableMap, final Callback successCallback, final Callback errorCallback) {
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();
        final String option = (String) map.get("option");
        final String detail = (String) map.get("detail");
        final String progress = (String) map.get("progress");

        if (option == null || "".equals(option) || detail == null || "".equals(detail) || progress == null || "".equals(progress)) {
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "参数不对"));
            return;
        }

        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    anyChatTool.updateProgress(option, detail, Integer.parseInt(progress));
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
    }

    @ReactMethod
    public void snapshot(final String path, final String name, final Callback successCallback, final Callback errorCallback){
        try {
            anyChatTool.successCallback = successCallback;
            anyChatTool.errorCallback = errorCallback;
            anyChatTool.snapshot(path,name);
            //successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS,"拍照成功"));
        }catch (Exception e){
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR,"拍照异常"));
        }

    }
    @ReactMethod
    public void takePhoto(final Callback succeed,final Callback failed){
        anyChatTool.successCallback = succeed;
        anyChatTool.errorCallback = failed;
        anyChatTool.takePhoto();
    }

    @ReactMethod
    public void transBuffer(String content,Callback succeed,Callback failed){
        anyChatTool.trans(content,succeed,failed);
    }

    @ReactMethod
    public void startPushScreen(final Callback successCallback, final Callback errorCallback){
        try {
            anyChatTool.pushScreen(1);
            successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS,"开始共享屏幕"));
        }catch (Exception e){
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR,"共享屏幕失败"));
        }
    }

    @ReactMethod
    public void stopPushScreen(final Callback successCallback, final Callback errorCallback){
        try {
            anyChatTool.pushScreen(0);
            successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS,"停止共享屏幕"));
        }catch (Exception e){
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR,"停止共享失败"));
        }
    }



    /*
     * 回调RN数据错误原因
     *@param key: 错误码
     *@param value:错误原因
     **/
    public static WritableMap getErrorWritableMap(String key, String value) {
        WritableMap mMap = null;
        mMap = Arguments.createMap();
        mMap.putString(Constant.RESLUT_CODE, key);
        mMap.putString(Constant.RESLUT_MSG, value);
        return mMap;
    }

    /*
     * 回调RN成功数据
     *@param key: 成功码
     *@param value:WritableMap型 成功原因
     **/
    public static WritableMap getSuccessWritableMap(String key, String value) {
        WritableMap mMap = null;
        mMap = Arguments.createMap();
        mMap.putString(Constant.RESLUT_STATUS, key);
        mMap.putString(Constant.RESLUT_DATA, value);
        return mMap;
    }

    @Override
    public void doSomeThing(String string) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(Constant.EVENT_NAME, string);
    }

    public void onJSEvent(ReactContext reactContext,
                          String eventName,
                          @Nullable String eventData) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, eventData);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // 7.21 泉州新增api
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * 播放第三方视频
     */
    @ReactMethod
    public void playThird(final ReadableMap map, final Callback succeed, final Callback failed){
        String thirdNativeViewId = (String) map.getString("thirdNativeViewId");
        final MySurfaceView thirdSurface = findView(thirdNativeViewId);
        if(thirdSurface == null){
            failed.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "未找到播放容器"));
            return;
        }

        final String _thirdId = (String) map.getString("thirdId");
        if(TextUtils.isEmpty(_thirdId)){
            failed.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "用户Id为空"));
            return;
        }
        final int thirdId = Integer.parseInt(_thirdId);

        anpai(() -> anyChatTool.playThird(thirdSurface,thirdId),succeed,failed);
    }

    /**
     * 停止播放第三方视频
     */
    @ReactMethod
    public void stopThird(final Callback succeed, final Callback failed){
        anpai(()->anyChatTool.stopThird(),succeed,failed);
    }

    /**
     * 播放共享屏幕(文档)
     */
    @ReactMethod
    public void playScreen(final ReadableMap map, final Callback succeed, final Callback failed){
        String screenNativeViewId = (String) map.getString("screenNativeViewId");
        final MySurfaceView screenSurface = findView(screenNativeViewId);
        if(screenSurface == null){
            failed.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "未找到播放容器"));
            return;
        }

        anpai(() -> anyChatTool.playScreen(screenSurface),succeed,failed);
    }

    /**
     * 停止播放共享屏幕(文档)
     */
    @ReactMethod
    public void stopScreen(final Callback succeed, final Callback failed){
        anpai(()->anyChatTool.stopScreen(),succeed,failed);
    }

    private void anpai(Runnable r, final Callback succeed, final Callback failed) {
        Activity act = getCurrentActivity();
        if(act == null){
            if(failed != null) {
                failed.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "act == null"));
            }
            return;
        }

        act.runOnUiThread(() -> RxPermissions.getIntance(getCurrentActivity())
                .request(CAMERA_PERMISSIONS)
                .subscribe(accept -> {
                    if (accept) {
                        r.run();
                        if (succeed != null) {
                            succeed.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "invoke success."));
                        }
                    } else {
                        if(failed != null) {
                            failed.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                        }
                    }
                }).dispose());
    }

    private MySurfaceView findView(String thirdNativeViewId) {
        Activity act = getCurrentActivity();
        if(act == null || TextUtils.isEmpty(thirdNativeViewId)){
            return null;
        }
        return (MySurfaceView) ReactFindViewUtil.findView(act.getWindow().getDecorView(),thirdNativeViewId);
    }

}
