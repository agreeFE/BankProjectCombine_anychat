package com;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Toast;
import com.bairuitech.anychat.AnyChatBaseEvent;
import com.bairuitech.anychat.AnyChatCoreSDK;
import com.bairuitech.anychat.AnyChatDefine;
import com.bairuitech.anychat.AnyChatRecordEvent;
import com.bairuitech.anychat.AnyChatTextMsgEvent;
import com.bairuitech.anychat.AnyChatTransDataEvent;
import com.example.config.ConfigEntity;
import com.example.config.ConfigService;
import com.facebook.react.bridge.Callback;
import com.net.JSONUtil;
import com.utils.Constant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;
import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class AnyChatTool implements AnyChatBaseEvent, AnyChatRecordEvent, AnyChatTextMsgEvent, AnyChatTransDataEvent {
    public Callback successCallback,errorCallback;
    public Activity context;
    public  AnyChatCoreSDK anyChatSDK;
    private final int SHOWLOGINSTATEFLAG = 1; // 显示的按钮是登陆状态的标识
    private final int SHOWWAITINGSTATEFLAG = 2; // 显示的按钮是等待状态的标识
    private final int SHOWLOGOUTSTATEFLAG = 3; // 显示的按钮是登出状态的标识
    private final int LOCALVIDEOAUTOROTATION = 1; // 本地视频自动旋转控制

    private int remoteId = 0;
    public static final int CLOSE = 0;
    public static final int OPEN = 1;
    private Handler handler;
    AnyChatPopwindow anyChatPopwindow;

    //回调js方法
    private static CallBack mCallBack;
    public static void setCallBack(CallBack callBack) {
        mCallBack = callBack;
    }
    public interface CallBack {
        void doSomeThing(String string);
    }

    public void init(Activity context,Callback successCallback){
        Log.e("fgq","插件init初始化");
        this.context=context;
        if (anyChatSDK == null) {
            anyChatSDK = AnyChatCoreSDK.getInstance(context);
            anyChatSDK.SetBaseEvent(this);
            anyChatSDK.SetTransDataEvent(this);
            anyChatSDK.InitSDK(android.os.Build.VERSION.SDK_INT, 0);
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_AUTOROTATION, LOCALVIDEOAUTOROTATION);
        }

        ApplyVideoConfig(context);

        AnyChatCoreSDK.SetSDKOptionString(AnyChatDefine.BRAC_SO_CLOUD_APPGUID, "fbe957d1-c25a-4992-9e75-d993294a5d56");

        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
        return;
    }

    public void login(String anychaturl, int anychatport, String name, String pwd, Callback successCallback, Callback errorCallback,Handler handler){
        Log.e("fgq","插件login     pwd====="+pwd+"    name======"+name+"    anychaturl======"+anychaturl+"    anychatport======"+anychatport);
        this.successCallback=successCallback;
        this.errorCallback=errorCallback;
        this.handler=handler;
        anyChatSDK.Logout();

        anyChatSDK.Connect(anychaturl,anychatport);
        anyChatSDK.Login(name,pwd);

        //initApply();
    }

    public void  loginOut(){
        anyChatSDK.Logout();
        anyChatSDK.removeEvent(this);
    }

    public void enterRoom(final Activity context, final int remoteId, int roomId, final Handler handler,final Callback successCallback){
        this.handler=handler;
        this.successCallback=successCallback;
        this.context=context;
        Log.e("fgq","插件enterRoom==roomId"+roomId+"remoteId:==="+remoteId);

        anyChatSDK.EnterRoom(roomId,"");

        anyChatSDK.UserCameraControl(-1,OPEN);
        anyChatSDK.UserSpeakControl(-1,OPEN);
        anyChatSDK.UserCameraControl(remoteId,OPEN);
        anyChatSDK.UserSpeakControl(remoteId,OPEN);

//        Intent intent = new Intent(context, VideoActivity.class);
//        intent.putExtra("UserID", String.valueOf(remoteId));
//        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        context.startActivity(intent);


         if (anyChatPopwindow==null){
             anyChatPopwindow=new AnyChatPopwindow(context,handler,remoteId);
         }
         View view=context.getWindow().getDecorView().findViewById(android.R.id.content);
        anyChatPopwindow.showAtLocation(view, Gravity.TOP | Gravity.CENTER_HORIZONTAL, 0, 0);
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    public void outRoom(int roomId){
        anyChatSDK.LeaveRoom(roomId);
    }

    public void anyChathide(final Callback successCallback){
        this.successCallback=successCallback;
        if (anyChatPopwindow==null) return;
        anyChatPopwindow.setGone();
        Log.e("fgq","视频弹窗anyChatPopwindow隐藏");
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    public void anyChatShow(final Callback successCallback){
        this.successCallback=successCallback;
        if (anyChatPopwindow==null) return;
        anyChatPopwindow.setShow();
        Log.e("fgq","视频弹窗anyChatPopwindow显示");
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    public void anyChatClose(final Callback successCallback){
        this.successCallback=successCallback;
        if (anyChatPopwindow==null) return;
        anyChatSDK=null;
        anyChatPopwindow.popwindowDismiss();
        anyChatPopwindow=null;
        Log.e("fgq","视频弹窗anyChatPopwindow关闭");
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    public void  updateProgress(String option,String optiondetail ,int progress){
        Log.e("fgq","插件，更新状态option"+option+"    optiondetail："+optiondetail+"    progress："+progress);
        anyChatPopwindow.updateProcess(option,optiondetail,progress);
    }

    @Override
    public void OnAnyChatConnectMessage(boolean bSuccess) {
        //通知UI 通话失败
        if(bSuccess){
            Log.e("fgq","OnAnyChatConnectMessage==连接服务器成功"+bSuccess);
        }else {
            Log.e("fgq","OnAnyChatConnectMessage==连接服务器失败"+bSuccess);
             errorCallback.invoke(AnyChatMoudle.getErrorWritableMap(Constant.RESLUT_ERROR, "失败"));
        }
    }

    @Override
    public void OnAnyChatLoginMessage(int dwUserId, int dwErrorCode) {
        if(dwErrorCode==0){
            Log.e("fgq","OnAnyChatLoginMessage==登录成功  dwUserId："+dwUserId+"   dwErrorCode："+dwErrorCode);
            successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
        }else {
            Log.e("fgq","OnAnyChatLoginMessage==登录失败  dwUserId："+dwUserId+"   dwErrorCode："+dwErrorCode);
            errorCallback.invoke(AnyChatMoudle.getErrorWritableMap(Constant.RESLUT_ERROR, "失败"));
        }
    }

    @Override
    public void OnAnyChatEnterRoomMessage(int dwRoomId, int dwErrorCode) {
        if(dwErrorCode == 0){
            Log.e("fgq","OnAnyChatEnterRoomMessage==进入房间成功dwRoomId："+dwRoomId+"    dwErrorCode："+dwErrorCode);
        }else {
            //通知UI 通话失败
            Log.e("fgq","OnAnyChatEnterRoomMessage==进入房间失败dwRoomId："+dwRoomId+"    dwErrorCode："+dwErrorCode);
        }
    }

    @Override
    public void OnAnyChatOnlineUserMessage(int dwUserNum, int dwRoomId) {
        Log.e("fgq","OnAnyChatOnlineUserMessage---进入   dwUserNum"+dwUserNum+"    dwRoomId"+dwRoomId);
        if (dwUserNum==0){

        }else {
        }
    }

    @Override
    public void OnAnyChatUserAtRoomMessage(int dwUserId, boolean bEnter) {
        if (!bEnter) {
                Toast.makeText(context, "对方已离开！", Toast.LENGTH_SHORT).show();
                remoteId=0;
                anyChatSDK.UserCameraControl(dwUserId, CLOSE);
                anyChatSDK.UserSpeakControl(dwUserId, CLOSE);
        } else {
            remoteId = dwUserId;
            Log.e("fgq","OnAnyChatUserAtRoomMessage===进入远程房间用户dwUserId:"+dwUserId);
            anyChatSDK.UserCameraControl(remoteId,OPEN);
            anyChatSDK.UserSpeakControl(remoteId,OPEN);
        }
    }

    @Override
    public void OnAnyChatLinkCloseMessage(int dwErrorCode) {
        Log.e("fgq","OnAnyChatLinkCloseMessage");
        anyChatSDK.LeaveRoom(-1);
        anyChatSDK.Logout();
    }

    @Override
    public void OnAnyChatRecordEvent(int dwUserId, int dwErrorCode, String lpFileName, int dwElapse, int dwFlags, int dwParam, String lpUserStr) {

    }

    @Override
    public void OnAnyChatSnapShotEvent(int dwUserId, int dwErrorCode, String lpFileName, int dwFlags, int dwParam, String lpUserStr) {

    }

    @Override
    public void OnAnyChatTextMessage(int dwFromUserid, int dwToUserid, boolean bSecret, String message) {

    }

    @Override
    public void OnAnyChatTransFile(int dwUserid, String FileName, String TempFilePath, int dwFileLength, int wParam, int lParam, int dwTaskId) {

    }

    @Override
    public void OnAnyChatTransBuffer(int dwUserid, byte[] lpBuf, int dwLen) {
        String str = new String(lpBuf);
        Log.e("fgq","OnAnyChatTransBuffer接通回调数据===长度"+str.length()+str);

        //回调给js
        mCallBack.doSomeThing(str);

//            if (str.length()>1100){
//                Log.e("fgq","OnAnyChatTransBuffer接通回调数据===11长度"+str.length()+str);
//                    try {
//                        //解析json
//                        JSONObject jsonObject=new JSONObject(str);n
//                        JSONObject jsonObject_commandParameters= jsonObject.getJSONObject("commandParameters");
//                            JSONObject jsonObject_APP_HEAD= jsonObject_commandParameters.getJSONObject("APP_HEAD");
//                            JSONObject jsonObject_REQ_BODY= jsonObject_commandParameters.getJSONObject("REQ_BODY");
//                            jsonObject_REQ_BODY.remove("SHOWDATA");
//                            JSONObject jsonObject_SYS_HEAD= jsonObject_commandParameters.getJSONObject("SYS_HEAD");
//                        String commandType=jsonObject.getString("commandType");
//
//                        //生成json
//                        JSONObject result=new JSONObject(str);
//                            JSONObject commandParameters = new JSONObject();
//                            commandParameters.put("APP_HEAD",jsonObject_APP_HEAD);
//                            commandParameters.put("REQ_BODY",jsonObject_REQ_BODY);
//                            commandParameters.put("SYS_HEAD",jsonObject_SYS_HEAD);
//                            result.put("commandParameters",commandParameters);
//                            result.put("commandType",commandType);
//
//                        str=result.toString();
//                        //str="{\"fgq\":122}";
//                        Log.e("fgq","OnAnyChatTransBuffer接通回调数据===11长度"+str.length()+str);
//
//                        mCallBack.doSomeThing(str);
//
//                    } catch (JSONException e) {
//                        e.printStackTrace();
//                        Log.e("fgq","报错 "+e.getMessage());
//                    }
//
//            }else {
//                //回调给js
//                mCallBack.doSomeThing(str);
//                Log.e("fgq","OnAnyChatTransBuffer接通回调数据===22长度"+str.length()+str);
//            }


//        try {
//            JSONObject obj = new JSONObject(str);
//            JSONObject object1= obj.getJSONObject("commandParameters");
//            JSONObject object= object1.getJSONObject("REQ_BODY");
//            String ROOMID=object.getString("ROOMID");
//            Log.e("fgq","接受到ROOMID==="+ROOMID);
//
//            anyChatSDK.EnterRoom(Integer.parseInt(ROOMID),"");
//
//            String remoteUserId=object.getString("REMOTEUSERID");
//            mCallBack.doSomeThing(remoteUserId);
//
//            Log.e("fgq","buffer里面打开远端视频remoteId==="+remoteUserId);
//            anyChatSDK.UserCameraControl(Integer.parseInt(remoteUserId),OPEN);
//            anyChatSDK.UserSpeakControl(Integer.parseInt(remoteUserId),OPEN);
//
//            Intent intent = new Intent(context, VideoActivity.class);
//            intent.putExtra("UserID", String.valueOf(remoteUserId));
//            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            context.startActivity(intent);
//
////            AnyChatPopwindow anyChatPopwindow=new AnyChatPopwindow(context,handler,remoteId);
////            View view=context.getWindow().getDecorView().findViewById(android.R.id.content);
////            anyChatPopwindow.showAtLocation(view, Gravity.TOP | Gravity.CENTER_HORIZONTAL, 0, 0);
//
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }
    }

    @Override
    public void OnAnyChatTransBufferEx(int dwUserid, byte[] lpBuf, int dwLen, int wparam, int lparam, int taskid) {

    }

    @Override
    public void OnAnyChatSDKFilterData(byte[] lpBuf, int dwLen) {

    }

    // 根据配置文件配置视频参数
    public void ApplyVideoConfig(Context context) {
        ConfigEntity configEntity = ConfigService.LoadConfig(context);
        if (configEntity.mConfigMode == 1) // 自定义视频参数配置
        {
            // 设置本地视频编码的码率（如果码率为0，则表示使用质量优先模式）
            AnyChatCoreSDK.SetSDKOptionInt(
                    AnyChatDefine.BRAC_SO_LOCALVIDEO_BITRATECTRL,
                    configEntity.mVideoBitrate);
//			if (configEntity.mVideoBitrate == 0) {
            // 设置本地视频编码的质量
            AnyChatCoreSDK.SetSDKOptionInt(
                    AnyChatDefine.BRAC_SO_LOCALVIDEO_QUALITYCTRL,
                    configEntity.mVideoQuality);
//			}
            // 设置本地视频编码的帧率
            AnyChatCoreSDK.SetSDKOptionInt(
                    AnyChatDefine.BRAC_SO_LOCALVIDEO_FPSCTRL,
                    configEntity.mVideoFps);
            // 设置本地视频编码的关键帧间隔
            AnyChatCoreSDK.SetSDKOptionInt(
                    AnyChatDefine.BRAC_SO_LOCALVIDEO_GOPCTRL,
                    configEntity.mVideoFps * 4);
            // 设置本地视频采集分辨率
            AnyChatCoreSDK.SetSDKOptionInt(
                    AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL,
                    configEntity.mResolutionWidth);
            AnyChatCoreSDK.SetSDKOptionInt(
                    AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL,
                    configEntity.mResolutionHeight);
            // 设置视频编码预设参数（值越大，编码质量越高，占用CPU资源也会越高）
            AnyChatCoreSDK.SetSDKOptionInt(
                    AnyChatDefine.BRAC_SO_LOCALVIDEO_PRESETCTRL,
                    configEntity.mVideoPreset);
        }
        // 让视频参数生效
        AnyChatCoreSDK.SetSDKOptionInt(
                AnyChatDefine.BRAC_SO_LOCALVIDEO_APPLYPARAM,
                configEntity.mConfigMode);
        // P2P设置
        AnyChatCoreSDK.SetSDKOptionInt(
                AnyChatDefine.BRAC_SO_NETWORK_P2PPOLITIC,
                configEntity.mEnableP2P);
        // 本地视频Overlay模式设置
        AnyChatCoreSDK.SetSDKOptionInt(
                AnyChatDefine.BRAC_SO_LOCALVIDEO_OVERLAY,
                configEntity.mVideoOverlay);
        // 回音消除设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_AUDIO_ECHOCTRL,
                configEntity.mEnableAEC);
        // 平台硬件编码设置
        AnyChatCoreSDK.SetSDKOptionInt(
                AnyChatDefine.BRAC_SO_CORESDK_USEHWCODEC,
                configEntity.mUseHWCodec);
        // 视频旋转模式设置
        AnyChatCoreSDK.SetSDKOptionInt(
                AnyChatDefine.BRAC_SO_LOCALVIDEO_ROTATECTRL,
                configEntity.mVideoRotateMode);
        // 本地视频采集偏色修正设置
        AnyChatCoreSDK.SetSDKOptionInt(
                AnyChatDefine.BRAC_SO_LOCALVIDEO_FIXCOLORDEVIA,
                configEntity.mFixColorDeviation);
        // 视频GPU渲染设置
        AnyChatCoreSDK.SetSDKOptionInt(
                AnyChatDefine.BRAC_SO_VIDEOSHOW_GPUDIRECTRENDER,
                configEntity.mVideoShowGPURender);
        // 本地视频自动旋转设置
        AnyChatCoreSDK.SetSDKOptionInt(
                AnyChatDefine.BRAC_SO_LOCALVIDEO_AUTOROTATION,
                configEntity.mVideoAutoRotation);
    }

    //申请进线
    private void initApply() {

        Map<String,Object> params = new HashMap<>();
        Map<String,Object> head = new HashMap<>();
        Map<String,Object> body = new HashMap<>();
        head.put("ConsumerId", "C002");
        head.put("ConsumerSeqNo", getUUID());
        head.put("RequestDate", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        head.put("RequestTime", new SimpleDateFormat("HHmmss").format(new Date()));
        head.put("TransServiceCode","createvideo_esb");
        body.put("QUEUETYPE","1");
        params.put("Head",head);
        params.put("Body",body);

        httpPostAsync(params,Constant.url,"GB18030");


//        HttpService.newBuilder()
//                .setAction(Constant.url)
//                .setMethod(METHOD.POST)
//                .setParams(params)
//                .setCallback(new RequestCallback() {
//                    @Override
//                    public void onSucceed(String data, String json) {
//                        Log.e("fgq","数据"+json);
//                    }
//
//                    @Override
//                    public void onFail(int code, String message) {
//                        Log.e("fgq","失败"+code+message);
//                    }
//                })
//                .execute();
    }

    //自动生成32位的UUid，对应数据库的主键id进行插入用。
    public String getUUID() {
        UUID uuid = UUID.randomUUID();
        String str = uuid.toString();
        // 去掉"-"符号
        String temp = str.substring(0, 8) + str.substring(9, 13)
                + str.substring(14, 18) + str.substring(19, 23)
                + str.substring(24);
        return temp;
    }



    public String httpPostAsync(final Map<String, Object> params, final String url, final String encode) {
        try {
            FutureTask<String> task = new FutureTask<>(new Callable<String>() {
                @Override
                public String call() throws Exception {
                    String timeout = "20";
                    if (timeout == null || timeout.length() == 0)
                        timeout = "20";
                    Log.d("配置文件配置的超时时间：", timeout);
                    OkHttpClient okHttpClient = new OkHttpClient.Builder().connectTimeout(Integer.valueOf(timeout), TimeUnit.SECONDS).build();
                    MediaType JSON = MediaType.parse("application/json; charset=" + encode);


                    Map<String,Object> paramsBody = new HashMap<>();
                    // 写入请求数据 body
                    String bodyContent = "";
                    if(null != params && !params.isEmpty()){
                        paramsBody.putAll(params);
                    }
                    bodyContent = JSONUtil.toJson(paramsBody);
                    RequestBody body = RequestBody.create(JSON,bodyContent);

                    Request request = new Request.Builder()
                            .url(url)
                            .post(body)
                            .build();
                    Call call = okHttpClient.newCall(request);

                    try {
                        Response response = call.execute();
                        byte[] responseBytes = response.body().bytes();
                       String responseUrl = new String(responseBytes, encode);
                       Log.e("fgq","====="+responseUrl);
                        return responseUrl;
                    } catch (Exception e) {
                        e.printStackTrace();
                        throw e;
                    }
                }
            });
            new Thread(task).start();
            return task.get();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("网络访问错误");
        }
    }

}
