package com;

import android.Manifest;
import android.os.Handler;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.utils.Constant;
import com.utils.RxPermissions;
import java.util.Map;
import io.reactivex.annotations.NonNull;
import io.reactivex.functions.Consumer;


public class AnyChatMoudle extends ReactContextBaseJavaModule implements AnyChatTool.CallBack {
    private ReactApplicationContext mContext;
    private String[] CAMERA_PERMISSIONS = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE,Manifest.permission.CAMERA,Manifest.permission.READ_EXTERNAL_STORAGE,Manifest.permission.RECORD_AUDIO};
    public AnyChatTool anyChatTool;

    public static final int CLOSE = 0;
    public static final int OPEN = 1;
    public Handler handler;

    public AnyChatMoudle(ReactApplicationContext reactContext) {
         super(reactContext);
         mContext = reactContext;
         anyChatTool=new AnyChatTool();
         anyChatTool.setCallBack(this);
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
                                    if(aBoolean){
                                        anyChatTool.init(getCurrentActivity(),successCallback);
//                                        Handler handler=new Handler();
//                                        AnyChatPopwindow anyChatPopwindow=new AnyChatPopwindow(getCurrentActivity(),handler,111);
//                                        View view=getCurrentActivity().getWindow().getDecorView().findViewById(android.R.id.content);
//                                        anyChatPopwindow.showAtLocation(view, Gravity.TOP | Gravity.CENTER_HORIZONTAL, 0, 0);
                                    }else{
                                        errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                        return;
                                    }
                                }
                            });
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

        if (anychaturl==null||"".equals(anychaturl)||anychatport==null||"".equals(anychatport)||name==null||"".equals(name)){
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
                                if(aBoolean){
                                    Handler handler=new Handler();
                                    anyChatTool.login(anychaturl,Integer.parseInt(anychatport),name,pwd,successCallback,errorCallback,handler);
                                }else{
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
                                if(aBoolean){
                                    anyChatTool.loginOut();
                                    successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
                                }else{
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
        final String remoteIdtemp = (String) map.get("remoteId");

        if (roomIdtemp==null||"".equals(remoteIdtemp)||remoteIdtemp==null||"".equals(remoteIdtemp)){
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "参数不对"));
            return;
        }
        final int roomId = Integer.valueOf(roomIdtemp);
        final int remoteId = Integer.valueOf(remoteIdtemp);

        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(CAMERA_PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if(aBoolean){
                                    final Handler handler=new Handler();
                                    anyChatTool.enterRoom(getCurrentActivity(),remoteId,roomId,handler,successCallback);
                                }else{
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
        if (roomIdtemp==null||"".equals(roomIdtemp)){
            roomId=-1;
        }else {
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
                                if(aBoolean){
                                    anyChatTool.outRoom(roomId);
                                    successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
                                }else{
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
                                if(aBoolean){
                                  anyChatTool.anyChathide(successCallback);
                                }else{
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
                                if(aBoolean){
                                    anyChatTool.anyChatShow(successCallback);
                                }else{
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
                                if(aBoolean){
                                    anyChatTool.anyChatClose(successCallback);
                                }else{
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
        final String option =       (String) map.get("option");
        final String detail = (String) map.get("detail");
        final String progress =     (String) map.get("progress");

        if (option==null||"".equals(option)||detail==null||"".equals(detail)||progress==null||"".equals(progress)){
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
                                if(aBoolean){
                                    anyChatTool.updateProgress(option,detail,Integer.parseInt(progress));
                                }else{
                                    errorCallback.invoke(getErrorWritableMap(Constant.PERMISSION_DENIED, "权限不足"));
                                }
                            }
                        });
            }
        });
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
}
