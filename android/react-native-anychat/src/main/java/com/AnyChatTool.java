package com;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

// import com.agree.boot.trade.logging.A;
import com.bairuitech.anychat.AnyChatBaseEvent;
import com.bairuitech.anychat.AnyChatCoreSDK;
import com.bairuitech.anychat.AnyChatDefine;
import com.bairuitech.anychat.AnyChatRecordEvent;
import com.bairuitech.anychat.AnyChatStreamCallBack;
import com.bairuitech.anychat.AnyChatTextMsgEvent;
import com.bairuitech.anychat.AnyChatTransDataEvent;
import com.bairuitech.anychat.AnyChatVideoCallEvent;
import com.example.config.ConfigEntity;
import com.example.config.ConfigService;
import com.facebook.react.bridge.Callback;
import com.net.HttpService;
import com.net.JSONUtil;
import com.net.RequestCallback;
import com.utils.Constant;
import com.view.MySurfaceView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;

import androidx.annotation.NonNull;
import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static com.AnyChatMoudle.getErrorWritableMap;
import static com.AnyChatMoudle.getSuccessWritableMap;

public class AnyChatTool implements AnyChatBaseEvent, AnyChatRecordEvent, AnyChatTextMsgEvent, AnyChatTransDataEvent,
        AnyChatVideoCallEvent, AnyChatStreamCallBack {
    public Callback successCallback, errorCallback;
    private final int UPDATEVIDEOBITDELAYMILLIS = 200; // 监听音频视频的码率的间隔刷新时间（毫秒）
    public Activity context;
    boolean isOnVideo = false; // 是否在连接视频状态
    public AnyChatCoreSDK anyChatSDK;
    private boolean bSelfVideoOpened = false; // 本地视频是否已打开
    private boolean bOtherVideoOpened = false; // 对方视频是否已打开
    private Boolean mFirstGetVideoBitrate = false; // "第一次"获得视频码率的标致
    private Boolean mFirstGetAudioBitrate = false; // "第一次"获得音频码率的标致
    private final int SHOWLOGINSTATEFLAG = 1; // 显示的按钮是登陆状态的标识
    private final int SHOWWAITINGSTATEFLAG = 2; // 显示的按钮是等待状态的标识
    private final int SHOWLOGOUTSTATEFLAG = 3; // 显示的按钮是登出状态的标识
    private final int LOCALVIDEOAUTOROTATION = 1; // 本地视频自动旋转控制

    public static final int MSG_CHECKAV = 1;
    public static final int MSG_TIMEUPDATE = 2;

    private ScreenStatusReceiver mScreenStatusReceiver;
    private String SCREEN_ON = "android.intent.action.SCREEN_ON";
    private String SCREEN_OFF = "android.intent.action.SCREEN_OFF";
    public static String REENTERIN = Intent.ACTION_USER_FOREGROUND; // 从后台进入到js页面意图
    private int remoteId = 0;
    public static final int CLOSE = 0;
    public static final int OPEN = 1;
    private Handler handler;
    AnyChatPopwindow anyChatPopwindow;
    private SurfaceView mUserSurface;
    private SurfaceView mRemoteSurface;
    public static String sHostUrl;
    public static String sBusinessId;
    public static String IDNO;
    public static String IDNAME;
    public static String IDTYPE;
    public String userFlag;
    public String judgeFlag;
    public String conferID;
    public String conferUniID;
    // 回调js方法
    private static CallBack mCallBack;
    private String sid;
    private String groupId;
    private String agentId;
    private String msgId;
    private int zhenlv;
    private int malv;
    private int height;
    private int width;

    public boolean isInQuene = false;// 是否在队列

    public boolean enterQuene = false;

    public boolean isLogin = false;
    private int index = 0;
    private Handler mHandler;
    private TimerTask mTimerTask;
    private Timer mTimerCheckAv;

    boolean isCameraOpen = true;

    boolean isSpeakOpen = true;
    public static String sQueueno = null;


    public static void setCallBack(CallBack callBack) {
        mCallBack = callBack;
    }

    @Override
    public void OnAnyChatVideoCallEvent(int dwEventType, int dwUserId, int dwErrorCode, int dwFlags, int dwParam,
            String userStr) {
    }

    @Override
    public void OnAnyChatVideoDataCallBack(int userId, int streamIndex, byte[] data, int len, int w, int h) {
    }

    @Override
    public void OnAnyChatAudioDataCallBack(int i, int i1, byte[] bytes, int i2, int i3, int i4, int i5, int i6) {

    }

    public void takePhoto() {
        context.startActivityForResult(new Intent(context,CaptureActivity.class),10011);
    }

    public void onTakePhotoResult(String path){
        try {
            JSONObject obj = new JSONObject();
            obj.put("CommandType","takePhotoResult");
            obj.put("path",path);
            //mCallBack.doSomeThing(obj.toString());
            successCallback.invoke(obj.toString());
        } catch (JSONException e) {
            e.printStackTrace();
            errorCallback.invoke("take photo failed.");
        }
    }

    public void trans(String content,Callback succeed,Callback failed) {
        try {
            byte[] bytes = content.getBytes("utf-8");
            anyChatSDK.TransBuffer(remoteId,bytes,bytes.length);
            succeed.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS,"发送成功"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            failed.invoke(getErrorWritableMap(Constant.RESLUT_ERROR,"发送失败"));
        }
    }

    public interface CallBack {
        void doSomeThing(String string);
    }

    public void onMainActivityResume(){
        Log.e("video","onActivityResumed");
        Log.e("video","isOnVideo:"+isOnVideo+",isCameraOpen:"+isCameraOpen);
        Log.e("video","mUserSurface visible:" + mUserSurface.getVisibility());
        if (isOnVideo) {
            if (anyChatSDK == null) {
                anyChatSDK = AnyChatCoreSDK.getInstance(context);
                anyChatSDK.mVideoHelper = new MyVideoHelper();
            }
            anyChatSDK.SetBaseEvent(AnyChatTool.this);
            anyChatSDK.SetVideoCallEvent(AnyChatTool.this);
            anyChatSDK.SetTransDataEvent(AnyChatTool.this);
            anyChatSDK.SetRecordSnapShotEvent(AnyChatTool.this);
            anyChatSDK.SetMediaCallBackEvent(this);
            if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL)
                    == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                Log.e("surface","mRemoteSurface:"+mRemoteSurface);
                index = anyChatSDK.mVideoHelper.bindVideo(mRemoteSurface.getHolder());
                anyChatSDK.mVideoHelper.SetVideoUser(index, remoteId);
                Log.e("surface","index:"+index);
            }
            refreshAV();
        }

        if (isCameraOpen) {
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    if (mUserSurface != null) {
                        if(mUserSurface.getVisibility() == View.VISIBLE) {
                            Log.e("tag","self surface already visible on resume, set invisible.");
                            mUserSurface.setVisibility(View.INVISIBLE);
                        }
                        mUserSurface.setVisibility(View.VISIBLE);
                        refreshAV();
                    }
                }
            }, 1000);
        }
    }

    public void onMainActivityPause(){
        Log.e("video","onActivityPaused");
        if (mUserSurface != null) {
            mUserSurface.setVisibility(View.INVISIBLE);
        }
    }

    public void onMainActivityDestroy(){
        if(anyChatSDK != null){
            loginOut();
        }
    }


//    Application.ActivityLifecycleCallbacks activityLifecycleCallbacks = new Application.ActivityLifecycleCallbacks() {
//        @Override
//        public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
//
//        }
//
//        @Override
//        public void onActivityStarted(Activity activity) {
//
//        }
//
//        @Override
//        public void onActivityResumed(Activity activity) {
//            Log.e("video","onActivityResumed");
//            if (activity == context) {
//                Log.e("video","isOnVideo:"+isOnVideo+",isCameraOpen:"+isCameraOpen);
//                Log.e("video","mUserSurface visible:"+mUserSurface.getVisibility());
//                if (isOnVideo) {
//                    if (anyChatSDK == null) {
//                        anyChatSDK = AnyChatCoreSDK.getInstance(context);
//                    }
//                    anyChatSDK.SetBaseEvent(AnyChatTool.this);
//                    anyChatSDK.SetVideoCallEvent(AnyChatTool.this);
//                    anyChatSDK.SetTransDataEvent(AnyChatTool.this);
//                    anyChatSDK.SetRecordSnapShotEvent(AnyChatTool.this);
//                    if (AnyChatCoreSDK.GetSDKOptionInt(
//                            AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
//                        index = anyChatSDK.mVideoHelper.bindVideo(mRemoteSurface.getHolder());
//                        anyChatSDK.mVideoHelper.SetVideoUser(index, remoteId);
//                    }
//
//                    refreshAV();
//
//                }
//                if (isCameraOpen) {
//                    new Handler().postDelayed(new Runnable() {
//                        @Override
//                        public void run() {
//                            if (mUserSurface != null && mUserSurface.getVisibility() != View.VISIBLE)
//                                mUserSurface.setVisibility(View.VISIBLE);
//                        }
//                    }, 1000);
//
//                }
//            }
//        }
//
//        @Override
//        public void onActivityPaused(Activity activity) {
//            Log.e("video","onActivityPaused");
//            if (activity == context && mUserSurface != null)
//                mUserSurface.setVisibility(View.INVISIBLE);
//        }
//
//        @Override
//        public void onActivityStopped(Activity activity) {
//
//        }
//
//        @Override
//        public void onActivitySaveInstanceState(Activity activity, Bundle outState) {
//
//        }
//
//        @Override
//        public void onActivityDestroyed(Activity activity) {
//            if (activity == context && anyChatSDK != null)
//                loginOut();
//
//        }
//    };

    public void init(Activity context, Callback successCallback) {
        Log.e("fgq", "插件init初始化");
        this.context = context;
        sQueueno = null;
        if (anyChatSDK == null) {
            anyChatSDK = AnyChatCoreSDK.getInstance(context);
            anyChatSDK.mVideoHelper = new MyVideoHelper();

            anyChatSDK.SetVideoCallEvent(this);
            anyChatSDK.SetBaseEvent(this);
            anyChatSDK.SetTransDataEvent(this);
            anyChatSDK.InitSDK(android.os.Build.VERSION.SDK_INT, 0);
            // 启动 AnyChat 传感器监听
            anyChatSDK.mSensorHelper.InitSensor(context);
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_AUTOROTATION, LOCALVIDEOAUTOROTATION);

            //context.getApplication().registerActivityLifecycleCallbacks(activityLifecycleCallbacks);
        }

        ApplyVideoConfig(context);

        AnyChatCoreSDK.SetSDKOptionString(AnyChatDefine.BRAC_SO_CLOUD_APPGUID, "fbe957d1-c25a-4992-9e75-d993294a5d56");

        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
        return;
    }

    public void login(String anychaturl, int anychatport, String name, String pwd, Callback successCallback,
            Callback errorCallback, Handler handler) {
        Log.e("fgq", "插件login     pwd=====" + pwd + "    name======" + name + "    anychaturl======" + anychaturl
                + "    anychatport======" + anychatport);
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.handler = handler;
        anyChatSDK.Logout();

        anyChatSDK.Connect(anychaturl, anychatport);
        anyChatSDK.Login(name, pwd);

        // initApply();
    }

    public void loginEx(String anychaturl, int anychatport, String userName, int userId, String struserid, String appid,
            int timestemp, String sigstr, Callback successCallback, Callback errorCallback, Handler handler,
            String strparam) {
        Log.e("fgq", "插件login  anychaturl======" + anychaturl + "    anychatport======" + anychatport);
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.handler = handler;
        anyChatSDK.Logout();

        anyChatSDK.Connect(anychaturl, anychatport);
        anyChatSDK.LoginEx(userName, userId, struserid, appid, timestemp, sigstr, strparam);

        // initApply();
    }

    public void loginOut() {
        sQueueno = null;
        isLogin = false;
        isOnVideo = false;
        if (anyChatSDK == null) {
            return;
        }
        anyChatSDK.UserCameraControl(remoteId, CLOSE);
        anyChatSDK.UserSpeakControl(remoteId, CLOSE);
        anyChatSDK.UserCameraControl(-1, CLOSE);
        anyChatSDK.UserSpeakControl(-1, CLOSE);
        if (mUserSurface != null) {
            try {

                mUserSurface.setVisibility(View.GONE);
                mUserSurface.getHolder().removeCallback(AnyChatCoreSDK.mCameraHelper);

            } catch (Exception e) {

            }

        }
        if (mRemoteSurface != null &&  mRemoteSurface.getParent() != null) {
            ((ViewGroup) mRemoteSurface.getParent()).removeView(mRemoteSurface);

        }
        anyChatSDK.LeaveRoom(-1);
        anyChatSDK.Logout();
        if (handler != null && runnable != null) {
            handler.removeCallbacks(runnable);
        }
        anyChatSDK.removeEvent(this);
        anyChatSDK.mSensorHelper.DestroySensor();
        anyChatSDK.Release();
        anyChatSDK = null;
        if (mTimerCheckAv != null) {
            mTimerCheckAv.cancel();
            mTimerCheckAv = null;
        }
        try {

            context.unregisterReceiver(mScreenStatusReceiver);
        } catch (Exception e) {

        }
    }

    public void hangUp(int roomId) {
        isOnVideo = false;
        anyChatSDK.UserCameraControl(remoteId, CLOSE);
        anyChatSDK.UserSpeakControl(remoteId, CLOSE);
        anyChatSDK.UserCameraControl(-1, CLOSE);
        anyChatSDK.UserSpeakControl(-1, CLOSE);

        anyChatSDK.LeaveRoom(roomId);

        context.unregisterReceiver(mScreenStatusReceiver);
    }

    // public void enterRoom(final Activity context, final int remoteId, int roomId, final Handler handler,
    public void enterRoom(final Activity context, int roomId, final Handler handler,
            final Callback successCallback, Callback errorCallback) {
        this.handler = handler;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.context = context;
        // Log.e("fgq", "插件enterRoom==roomId" + roomId + "remoteId:===" + remoteId);
        Log.e("fgq", "插件enterRoom==roomId" + roomId);
        // ApplyVideoConfig(this.context);
        anyChatSDK.EnterRoom(roomId, "123");
        // this.remoteId = remoteId;
        // anyChatSDK.UserCameraControl(-1,OPEN);
        // anyChatSDK.UserSpeakControl(-1,OPEN);
        // anyChatSDK.UserCameraControl(remoteId,OPEN);
        // anyChatSDK.UserSpeakControl(remoteId,OPEN);

        // Intent intent = new Intent(context, VideoActivity.class);
        // intent.putExtra("UserID", String.valueOf(remoteId));
        // intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // context.startActivity(intent);

        // if (anyChatPopwindow==null){
        // anyChatPopwindow=new AnyChatPopwindow(context,handler,remoteId);
        // }
        // View
        // view=context.getWindow().getDecorView().findViewById(android.R.id.content);
        // anyChatPopwindow.showAtLocation(view, Gravity.TOP |
        // Gravity.CENTER_HORIZONTAL, 0, 0);
        // successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS,
        // "成功"));
    }

    public void outRoom(int roomId) {
        anyChatSDK.LeaveRoom(roomId);
    }

    public void snapshot(final String photoDir,String photoName) {
        Log.e("snapshot","设置路径");
        AnyChatCoreSDK.SetSDKOptionString(AnyChatDefine.BRAC_SO_SNAPSHOT_TMPDIR, photoDir);

        File photoFile = new File(photoDir+"\\"+photoName);
        if(photoFile.exists()) {
            Log.e("snapshot","文件已经存在，删除文件");
            photoFile.delete();
        }

        String path = "{\"filename\":\"" + photoName + "\"}";
        Log.e("snapshot","path:"+path);
        int flag = AnyChatDefine.BRAC_RECORD_FLAGS_USERFILENAME
                + AnyChatDefine.ANYCHAT_RECORD_FLAGS_LOCALCB
                + AnyChatDefine.ANYCHAT_RECORD_FLAGS_SNAPSHOT
                + AnyChatDefine.ANYCHAT_TSFLAGS_OVERWRITE;
        //只拍自己
        int ret = anyChatSDK.StreamRecordCtrlEx(-1, 1, flag, 0, path);
        Log.e("snapshot","截图ret ="+ret);
    }

    public void pushScreen(int isOpen) {
        anyChatSDK.UserScreenCameraControl(isOpen,context);
    }

    public void anyChathide(final Callback successCallback) {
        this.successCallback = successCallback;

        if (anyChatPopwindow == null)
            return;
        anyChatPopwindow.setGone();
        Log.e("fgq", "视频弹窗anyChatPopwindow隐藏");
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            try {
                int videoBitrate = anyChatSDK.QueryUserStateInt(remoteId, AnyChatDefine.BRAC_USERSTATE_VIDEOBITRATE);
                int audioBitrate = anyChatSDK.QueryUserStateInt(remoteId, AnyChatDefine.BRAC_USERSTATE_AUDIOBITRATE);
                // Log.e("fgq","popwindow-------videoBitrate: "+videoBitrate+"audioBitrate:
                // "+audioBitrate);
                if (videoBitrate > 0) {
                    // handler.removeCallbacks(runnable);
                    mFirstGetVideoBitrate = true;
                    mRemoteSurface.setBackgroundColor(Color.TRANSPARENT);
                }

                if (audioBitrate > 0) {
                    mFirstGetAudioBitrate = true;
                }

                if (mFirstGetVideoBitrate) {
                    if (videoBitrate <= 0) {
                        Toast.makeText(context, "对方视频中断了!", Toast.LENGTH_SHORT).show();
                        // 重置下，如果对方退出了，有进去了的情况
                        mFirstGetVideoBitrate = false;
                    }
                }

                if (mFirstGetAudioBitrate) {
                    if (audioBitrate <= 0) {
                        Toast.makeText(context, "对方音频中断了!", Toast.LENGTH_SHORT).show();
                        // 重置下，如果对方退出了，有进去了的情况
                        mFirstGetAudioBitrate = false;
                    }
                }

                handler.postDelayed(runnable, UPDATEVIDEOBITDELAYMILLIS);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };

    public void anyChatPlay(SurfaceView userSurface, SurfaceView remoteSurface, final int remoteId, final Callback successCallback) {
        ApplyVideoConfig(context);
        this.mUserSurface = userSurface;
        Log.e("debug","userSurface:"+userSurface);
        this.remoteId = remoteId;

        // mUserSurface.setZOrderOnTop(true);
        this.mRemoteSurface = remoteSurface;
        Log.e("remoteId", "anyChatPlay: " + remoteId);
        
        mRemoteSurface.setTag(remoteId);

        // 初始化 Camera 上下文句柄
        AnyChatCoreSDK.mCameraHelper.SetContext(context);
        // 设置 SURFACE_TYPE_PUSH_BUFFERS 模式
        mUserSurface.getHolder().setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);

        //
        // 如果是采用Java视频显示，则需要设置Surface的CallBack
        if (AnyChatCoreSDK
                .GetSDKOptionInt(AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
            index = anyChatSDK.mVideoHelper.bindVideo(remoteSurface.getHolder());
            anyChatSDK.mVideoHelper.SetVideoUser(index, remoteId);
        }

        // 如果是采用Java视频采集，则需要设置Surface的CallBack
        if (AnyChatCoreSDK
                .GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_CAPDRIVER) == AnyChatDefine.VIDEOCAP_DRIVER_JAVA) {
            mUserSurface.getHolder().addCallback(AnyChatCoreSDK.mCameraHelper);
        }

        // 判断是否显示本地摄像头切换图标
        if (AnyChatCoreSDK
                .GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_CAPDRIVER) == AnyChatDefine.VIDEOCAP_DRIVER_JAVA) {
            if (AnyChatCoreSDK.mCameraHelper.GetCameraNumber() > 1) {
                // 默认打开前置摄像头
                AnyChatCoreSDK.mCameraHelper.SelectVideoCapture(AnyChatCoreSDK.mCameraHelper.CAMERA_FACING_FRONT);
            }
        } else {
            String[] strVideoCaptures = anyChatSDK.EnumVideoCapture();
            if (strVideoCaptures != null && strVideoCaptures.length > 1) {
                // 默认打开前置摄像头
                for (int i = 0; i < strVideoCaptures.length; i++) {
                    String strDevices = strVideoCaptures[i];
                    if (strDevices.indexOf("Front") >= 0) {
                        anyChatSDK.SelectVideoCapture(strDevices);
                        break;
                    }
                }
            }
        }
        // // 如果是采用Java视频显示，则需要设置Surface的CallBack

        registSreenStatusReceiver();

        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (isOnVideo) {
                    if (AnyChatCoreSDK.GetSDKOptionInt(
                            AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                        Log.e("surface",".mRemoteSurface:"+mRemoteSurface);
                        index = anyChatSDK.mVideoHelper.bindVideo(mRemoteSurface.getHolder());
                        anyChatSDK.mVideoHelper.SetVideoUser(index, remoteId);
                        Log.e("surface",".index:"+index);
                    }
                    mUserSurface.setVisibility(View.INVISIBLE);
                    mUserSurface.setVisibility(View.VISIBLE);

                    refreshAV();
                }
            }
        }, 1000);
        updateAV();
        // 如果视频流过来了，则把背景设置成透明的//每0.2秒执行一次
        // handler.postDelayed(runnable, UPDATEVIDEOBITDELAYMILLIS);
        isOnVideo = true;
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    private void registSreenStatusReceiver() {
        mScreenStatusReceiver = new ScreenStatusReceiver();
        IntentFilter screenStatusIF = new IntentFilter();
        screenStatusIF.addAction(SCREEN_ON);
        screenStatusIF.addAction(SCREEN_OFF);
        screenStatusIF.addAction(REENTERIN);
        context.registerReceiver(mScreenStatusReceiver, screenStatusIF);
    }

    private void updateAV() {

        mHandler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                super.handleMessage(msg);
                switch (msg.what) {
                case MSG_CHECKAV:
                    // 实时视频刷新
                    CheckVideoStatus();

                    break;

                }

            }
        };
        initTimerCheckAv();

    }

    private void initTimerCheckAv() {
        if (mTimerCheckAv == null)
            mTimerCheckAv = new Timer();
        mTimerTask = new TimerTask() {

            @Override
            public void run() {
                mHandler.sendEmptyMessage(MSG_CHECKAV);
            }
        };
        mTimerCheckAv.schedule(mTimerTask, 1000, 100);
    }

    class ScreenStatusReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Log.e("1213", "onReceive: " + intent.getAction());
            if (SCREEN_ON.equals(intent.getAction())) {
                Log.e("fgq", "屏幕亮");
                if (AnyChatCoreSDK.GetSDKOptionInt(
                        AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                    Log.e("surface","..mRemoteSurface:"+mRemoteSurface);
                    int index = anyChatSDK.mVideoHelper.bindVideo(mRemoteSurface.getHolder());
                    anyChatSDK.mVideoHelper.SetVideoUser(index, remoteId);
                    Log.e("surface","..index:"+index);
                }

                refreshAV();

            } else if (SCREEN_OFF.equals(intent.getAction())) {
                Log.e("fgq", "屏幕熄灭");
            } else if (REENTERIN.equalsIgnoreCase(intent.getAction())) {
                Log.e("fgq", "再次进入");
                if (isOnVideo) {
                    if (AnyChatCoreSDK.GetSDKOptionInt(
                            AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                        Log.e("surface","...mRemoteSurface:"+mRemoteSurface);
                        index = anyChatSDK.mVideoHelper.bindVideo(mRemoteSurface.getHolder());
                        anyChatSDK.mVideoHelper.SetVideoUser(index, remoteId);
                        Log.e("surface","...index:"+index);
                    }

                    refreshAV();
                }
            }
        }
    }

    private void refreshAV() {
        anyChatSDK.UserCameraControl(remoteId, OPEN);
        anyChatSDK.UserSpeakControl(remoteId, OPEN);
        if (isCameraOpen)
            anyChatSDK.UserCameraControl(-1, OPEN);
        if (isSpeakOpen)
            anyChatSDK.UserSpeakControl(-1, OPEN);

    }

    /**
     * 切换摄像头
     *
     * @param successCallback
     * @param errorCallback
     */
    public void switchCamera(Callback successCallback, Callback errorCallback) {
        // 如果是采用Java视频采集，则在Java层进行摄像头切换
        if (!isOnVideo) {
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "视频未在线"));
            return;
        }
        try {
            if (AnyChatCoreSDK.GetSDKOptionInt(
                    AnyChatDefine.BRAC_SO_LOCALVIDEO_CAPDRIVER) == AnyChatDefine.VIDEOCAP_DRIVER_JAVA) {
                AnyChatCoreSDK.mCameraHelper.SwitchCamera();
                successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "切换成功"));
                return;
            }

            String strVideoCaptures[] = anyChatSDK.EnumVideoCapture();
            String temp = anyChatSDK.GetCurVideoCapture();
            for (int i = 0; i < strVideoCaptures.length; i++) {
                if (!temp.equals(strVideoCaptures[i])) {
                    anyChatSDK.UserCameraControl(-1, 0);
                    bSelfVideoOpened = false;
                    anyChatSDK.SelectVideoCapture(strVideoCaptures[i]);
                    anyChatSDK.UserCameraControl(-1, 1);
                    break;
                }
            }
            successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "切换成功"));
        } catch (Exception e) {
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "切换失败"));
        }

    }

    public void closeCamera(boolean close, Callback successCallback) {
        isCameraOpen = !close;
        anyChatSDK.UserCameraControl(-1, close ? CLOSE : OPEN);
        if (close && mUserSurface != null) {
            mUserSurface.setVisibility(View.INVISIBLE);
        } else if (!close && mUserSurface != null) {
            mUserSurface.setVisibility(View.VISIBLE);
        }
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    public void closeSpeak(boolean close, Callback successCallback) {
        isSpeakOpen = !close;
        anyChatSDK.UserSpeakControl(-1, close ? CLOSE : OPEN);
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    public void anyChatShow(final Callback successCallback) {
        this.successCallback = successCallback;
        if (anyChatPopwindow == null)
            return;
        anyChatPopwindow.setShow();
        Log.e("fgq", "视频弹窗anyChatPopwindow显示");
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    public void anyChatClose(final Callback successCallback) {
        this.successCallback = successCallback;
        if (anyChatPopwindow == null)
            return;
        anyChatSDK = null;
        anyChatPopwindow.popwindowDismiss();
        anyChatPopwindow = null;
        Log.e("fgq", "视频弹窗anyChatPopwindow关闭");
        successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
    }

    public void updateProgress(String option, String optiondetail, int progress) {
        Log.e("fgq", "插件，更新状态option" + option + "    optiondetail：" + optiondetail + "    progress：" + progress);
        anyChatPopwindow.updateProcess(option, optiondetail, progress);
    }

    @Override
    public void OnAnyChatConnectMessage(boolean bSuccess) {

        // 通知UI 通话失败
        if (bSuccess) {
            Log.e("fgq", "OnAnyChatConnectMessage==连接服务器成功" + bSuccess);
        } else {
            isLogin = false;
            Log.e("fgq", "OnAnyChatConnectMessage==连接服务器失败" + bSuccess);
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "失败"));
            if (mTimerCheckAv != null)
                mTimerCheckAv.cancel();
        }
    }

    @Override
    public void OnAnyChatLoginMessage(int dwUserId, int dwErrorCode) {
        if (dwErrorCode == 0) {
            isLogin = true;

                // if (!enterQuene)
                    waitEnterRoom();
                // enterQuene = true;

            Log.e("fgq", "OnAnyChatLoginMessage==登录成功  dwUserId：" + dwUserId + "   dwErrorCode：" + dwErrorCode);
            // successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));
            // successCallback.invoke(AnyChatMoudle.getSuccessWritableMap(Constant.RESLUT_SUCCESS, userFlag));
        } else {
            Log.e("fgq", "OnAnyChatLoginMessage==登录失败  dwUserId：" + dwUserId + "   dwErrorCode：" + dwErrorCode);
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "失败"));
        }
    }

    private void CheckVideoStatus() {
        if (!bOtherVideoOpened && anyChatSDK != null) {

            if (anyChatSDK.GetCameraState(remoteId) == 2 && anyChatSDK.GetUserVideoWidth(remoteId) != 0) {
                SurfaceHolder holder = mRemoteSurface.getHolder();
                Log.e("gekkk", "CheckVideoStatus: " + 1);
                if (AnyChatCoreSDK.GetSDKOptionInt(
                        AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) != AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                    holder.setFormat(PixelFormat.RGB_565);
                    holder.setFixedSize(anyChatSDK.GetUserVideoWidth(remoteId),
                            anyChatSDK.GetUserVideoHeight(remoteId));
                    Log.e("mremote", "CheckVideoStatus: " + anyChatSDK.GetUserVideoWidth(remoteId) + " | ||| "
                            + anyChatSDK.GetUserVideoHeight(remoteId));
                }
                Surface s = holder.getSurface();
                if (AnyChatCoreSDK.GetSDKOptionInt(
                        AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                    anyChatSDK.mVideoHelper.SetVideoUser(index, remoteId);
                } else
                    anyChatSDK.SetVideoPos(remoteId, s, 0, 0, 0, 0);
                bOtherVideoOpened = true;
            }
        }

        if (!bSelfVideoOpened && anyChatSDK != null) {

            if (anyChatSDK.GetCameraState(-1) == 2 && anyChatSDK.GetUserVideoWidth(-1) != 0) {
                SurfaceHolder holder = mUserSurface.getHolder();
                Log.e("gekkk", "CheckVideoStatus: " + 2);
                if (AnyChatCoreSDK.GetSDKOptionInt(
                        AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) != AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                    holder.setFormat(PixelFormat.RGB_565);
                    holder.setFixedSize(anyChatSDK.GetUserVideoWidth(-1), anyChatSDK.GetUserVideoHeight(-1));
                    Log.e("muser", "CheckVideoStatus: " + anyChatSDK.GetUserVideoWidth(-1) + " | ||| "
                            + anyChatSDK.GetUserVideoHeight(-1));
                }

                Surface s = holder.getSurface();
                anyChatSDK.SetVideoPos(-1, s, 0, 0, 0, 0);
                bSelfVideoOpened = true;
            }
        }
    }

    /**
     * 创建用户等待进线方法
     */
    public void waitEnterRoom() {
        //担保人不需要进线
        if(userFlag == "10093"){
            return;
        }

        JSONObject params = new JSONObject();
        JSONObject head = new JSONObject();
        JSONObject body = new JSONObject();
        try {
        head.put("ConsumerId", "C002");
        head.put("ConsumerSeqNo", getUUID());
        head.put("RequestDate", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        head.put("RequestTime", new SimpleDateFormat("HHmmss").format(new Date()));
        head.put("TdgBrah", "12001");
        head.put("TransServiceCode", "createvideo_esb");
        body.put("DeviceType", "online");
        body.put("DeviceNum", userFlag);
        body.put("USERFLAG", userFlag);
        body.put("JUDGEFLAG", judgeFlag);
        body.put("CONFERID", conferID);
        body.put("QUEUETYPE", "1");
        params.put("Head", head);
        params.put("Body", body);
            Log.e("params", "params data: " + params);
            HttpService.getInstance().post(
                    TextUtils.isEmpty(AnyChatTool.sHostUrl) ? Constant.HOST_URL : AnyChatTool.sHostUrl, null,
                    params.toString(), new RequestCallback() {
                        @Override
                        public void onSucceed(String data, String json) {

                            Log.e("createUser", "onSucceed data: " + data);
                            Log.e("createUser", "onSucceed json: " + json);
                            try {
                                JSONObject response = new JSONObject(json);
                                JSONObject responseHEAD = response.optJSONObject("Head");
                                if ("000000".equalsIgnoreCase(responseHEAD.optString("ReturnCode"))) {
                                    JSONObject responseEntity = response.optJSONObject("Body");
                                    sid = responseEntity.optString("sid");
                                    sQueueno = responseEntity.optString("QUEUENO");
                                    groupId = responseEntity.optString("groupId");
                                    agentId = responseEntity.optString("agentId");
                                    msgId = responseEntity.optString("msgId");
                                    isInQuene = true;
                                } else {
                                    errorCallback.invoke(getErrorWritableMap(responseHEAD.optString("ReturnCode"),
                                            responseHEAD.optString("ReturnMessage")));
                                }

                            } catch (JSONException e) {
                                errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "返回参数解析异常"));
                                e.printStackTrace();

                            }

                        }

                        @Override
                        public void onFail(int code, String message) {
                            Log.e("createUser", "onFail message: " + message + "|| code :  " + code);
                            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "创建失败"));
                        }
                    });
        } catch (JSONException e) {
            e.printStackTrace();
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "传入参数异常"));
        }
    }

    @Override
    public void OnAnyChatEnterRoomMessage(int dwRoomId, int dwErrorCode) {
        enterQuene = false;

        if (dwErrorCode == 0) {
            anyChatSDK.UserCameraControl(-1, OPEN);
            anyChatSDK.UserSpeakControl(-1, OPEN);
            Log.e("fgq", "OnAnyChatEnterRoomMessage==进入房间成功dwRoomId：" + dwRoomId + "    dwErrorCode：" + dwErrorCode);
            successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功"));

        } else {
            // 通知UI 通话失败
            Log.e("fgq", "OnAnyChatEnterRoomMessage==进入房间失败dwRoomId：" + dwRoomId + "    dwErrorCode：" + dwErrorCode);
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR,
                    "OnAnyChatEnterRoomMessage==进入房间失败dwRoomId：" + dwRoomId + "    dwErrorCode：" + dwErrorCode));

        }
    }

    @Override
    public void OnAnyChatOnlineUserMessage(int dwUserNum, int dwRoomId) {
        Log.e("fgq", "OnAnyChatOnlineUserMessage---进入   dwUserNum" + dwUserNum + "    dwRoomId" + dwRoomId);
        if (dwUserNum == 0) {

        } else {
        }
        bOtherVideoOpened = false;
    }

    @Override
    public void OnAnyChatUserAtRoomMessage(int dwUserId, boolean bEnter) {
        //remoteId 和 thirdId 只能根据show_video命令赋值,stop_video清空
        if(dwUserId == thirdId && bEnter){
            mCallBack.doSomeThing("{\"CommandType\":\"thirdAtRoom\"}");
            if(thirdSurface != null) {
                playThird(thirdSurface, thirdId);
            }
        }else if(dwUserId == thirdId /* && !bEnter*/){
            mCallBack.doSomeThing("{\"CommandType\":\"thirdLeaveRoom\"}");
            stopThird();
        }else if(dwUserId == remoteId && bEnter){
            mCallBack.doSomeThing("{\"CommandType\":\"remoteAtRoom\"}");

            Log.e("remoteId", "OnAnyChatUserAtRoomMessage: " + remoteId);
            remoteId = dwUserId;
            Log.e("fgq", "OnAnyChatUserAtRoomMessage===进入远程房间用户dwUserId:" + dwUserId);
            anyChatSDK.UserCameraControl(remoteId, OPEN);
            anyChatSDK.UserSpeakControl(remoteId, OPEN);

            bOtherVideoOpened = true;
        }else if(dwUserId == remoteId /* && !bEnter*/){
            mCallBack.doSomeThing("{\"CommandType\":\"remoteLeaveRoom\"}");

            // remoteId = 0;
            anyChatSDK.UserCameraControl(dwUserId, CLOSE);
            anyChatSDK.UserSpeakControl(dwUserId, CLOSE);
            if (mTimerCheckAv != null)
                mTimerCheckAv.cancel();

            bOtherVideoOpened = false;
        }
    }

    @Override
    public void OnAnyChatLinkCloseMessage(int dwErrorCode) {
        enterQuene = false;
        mCallBack.doSomeThing("{\"CommandType\":\"linkClose\"}");

        Log.e("fgq", "OnAnyChatLinkCloseMessage");
        isLogin = false;
        isOnVideo = false;
        anyChatSDK.UserCameraControl(remoteId, CLOSE);
        anyChatSDK.UserSpeakControl(remoteId, CLOSE);
        anyChatSDK.UserCameraControl(-1, CLOSE);
        anyChatSDK.UserSpeakControl(-1, CLOSE);
        if (mTimerCheckAv != null)
            mTimerCheckAv.cancel();
        anyChatSDK.LeaveRoom(-1);
        anyChatSDK.Logout();
        if (handler != null)
            handler.removeCallbacks(runnable);
        anyChatSDK.removeEvent(this);
        anyChatSDK.mSensorHelper.DestroySensor();
        anyChatSDK.Release();
        try {
            errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "服务器繁忙"));
            context.unregisterReceiver(mScreenStatusReceiver);

        } catch (Exception e) {

        }
        // anyChatSDK.Logout();
    }

    @Override
    public void OnAnyChatRecordEvent(int dwUserId, int dwErrorCode, String lpFileName, int dwElapse, int dwFlags,
            int dwParam, String lpUserStr) {
        Log.e("snapshot","OnAnyChatRecordEvent:"+dwErrorCode);

    }

    public void startRecord() {
        //设置成录制MP4
        anyChatSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_RECORD_FILETYPE,0);
        // 设置录像文件宽度
        anyChatSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_RECORD_WIDTH, RecordParamAttr.recordwidth);
        // 设置录像文件高度
        anyChatSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_RECORD_HEIGHT,  RecordParamAttr.recordheight);
        // 设置录像码率
        anyChatSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_RECORD_VIDEOBR, RecordParamAttr.recordmalv);
        // 设置录像画面裁剪模式
        anyChatSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_RECORD_CLIPMODE, 2);
//		anychat.SetSDKOptionInt(AnyChatDefine.BRAC_SO_RECORD_CLIPMODE, AnyChatDefine.ANYCHAT_VIDEOCLIPMODE_DYNAMIC);
        int recordRet = anyChatSDK.StreamRecordCtrlEx(-1, 1, 277303, 0, RecordParamAttr.generateJSON());
    }

    @Override
    public void OnAnyChatSnapShotEvent(int dwUserId, int dwErrorCode, String lpFileName, int dwFlags, int dwParam,
            String lpUserStr) {
        Log.e("snapshot","OnAnyChatSnapShotEvent:"+dwErrorCode);
        if(dwErrorCode == 0){
            this.successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "拍照成功"));
        }else{
            this.errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR,"拍照失败:"+dwErrorCode));
        }
    }

    @Override
    public void OnAnyChatTextMessage(int dwFromUserid, int dwToUserid, boolean bSecret, String message) {

    }

    @Override
    public void OnAnyChatTransFile(int dwUserid, String FileName, String TempFilePath, int dwFileLength, int wParam,
            int lParam, int dwTaskId) {

    }

    @Override
    public void OnAnyChatTransBuffer(int dwUserid, byte[] lpBuf, int dwLen) {
        String str = new String(lpBuf);
        Log.e("fgq", "OnAnyChatTransBuffer接通回调数据===长度" + str.length() + str);
        //
        // Log.e("json", str);
        try {
            JSONObject json = new JSONObject(str);
            String commandType = json.optString("commandType");
            Log.e("CommandType", "获取的CommandType：" + commandType);
            if ("enter_room".equals(commandType)) {
                isInQuene = false;
                String roomId = json.optString("roomid");
                // String otherUserId = json.getString("remoteuserid");
                Log.e("enter_room", "获取的roomId：" + roomId);
                this.successCallback.invoke(getSuccessWritableMap(Constant.RESLUT_SUCCESS, "成功连接远程正在进入房间"));
            }
            if ("show_video".equals(commandType)) {
                JSONObject cameraparam = json.optJSONObject("Cameraparam");
                width = Integer.parseInt(cameraparam.optString("camerawidth"));
                height = Integer.parseInt(cameraparam.optString("cameraheight"));
                malv = Integer.parseInt(cameraparam.optString("cameramalv"));
                zhenlv = Integer.parseInt(cameraparam.optString("camerazhenlv"));
                Log.e("show_video", "获取的Cameraparam：" + width + "-" + height + "-" + malv + "-" + zhenlv);
                RecordParamAttr.parse(str);
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("","OnAnyChatTransBufferException--服务器繁忙"+e.getMessage());
            // this.errorCallback.invoke(getErrorWritableMap(Constant.RESLUT_ERROR, "服务器繁忙"));
        }
        // 回调给js
        mCallBack.doSomeThing(str);
        Log.e("transBuffer","回调给js" + str);

        // if (str.length()>1100){
        // Log.e("fgq","OnAnyChatTransBuffer接通回调数据===11长度"+str.length()+str);
        // try {
        // //解析json
        // JSONObject jsonObject=new JSONObject(str);n
        // JSONObject jsonObject_commandParameters=
        // jsonObject.getJSONObject("commandParameters");
        // JSONObject jsonObject_APP_HEAD=
        // jsonObject_commandParameters.getJSONObject("APP_HEAD");
        // JSONObject jsonObject_REQ_BODY=
        // jsonObject_commandParameters.getJSONObject("REQ_BODY");
        // jsonObject_REQ_BODY.remove("SHOWDATA");
        // JSONObject jsonObject_SYS_HEAD=
        // jsonObject_commandParameters.getJSONObject("SYS_HEAD");
        // String commandType=jsonObject.getString("commandType");
        //
        // //生成json
        // JSONObject result=new JSONObject(str);
        // JSONObject commandParameters = new JSONObject();
        // commandParameters.put("APP_HEAD",jsonObject_APP_HEAD);
        // commandParameters.put("REQ_BODY",jsonObject_REQ_BODY);
        // commandParameters.put("SYS_HEAD",jsonObject_SYS_HEAD);
        // result.put("commandParameters",commandParameters);
        // result.put("commandType",commandType);
        //
        // str=result.toString();
        // //str="{\"fgq\":122}";
        // Log.e("fgq","OnAnyChatTransBuffer接通回调数据===11长度"+str.length()+str);
        //
        // mCallBack.doSomeThing(str);
        //
        // } catch (JSONException e) {
        // e.printStackTrace();
        // Log.e("fgq","报错 "+e.getMessage());
        // }
        //
        // }else {
        // //回调给js
        // mCallBack.doSomeThing(str);
        // Log.e("fgq","OnAnyChatTransBuffer接通回调数据===22长度"+str.length()+str);
        // }

        // try {
        // JSONObject obj = new JSONObject(str);
        // JSONObject object1= obj.getJSONObject("commandParameters");
        // JSONObject object= object1.getJSONObject("REQ_BODY");
        // String ROOMID=object.getString("ROOMID");
        // Log.e("fgq","接受到ROOMID==="+ROOMID);
        //
        // anyChatSDK.EnterRoom(Integer.parseInt(ROOMID),"");
        //
        // String remoteUserId=object.getString("REMOTEUSERID");
        // mCallBack.doSomeThing(remoteUserId);
        //
        // Log.e("fgq","buffer里面打开远端视频remoteId==="+remoteUserId);
        // anyChatSDK.UserCameraControl(Integer.parseInt(remoteUserId),OPEN);
        // anyChatSDK.UserSpeakControl(Integer.parseInt(remoteUserId),OPEN);
        //
        // Intent intent = new Intent(context, VideoActivity.class);
        // intent.putExtra("UserID", String.valueOf(remoteUserId));
        // intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // context.startActivity(intent);
        //
        //// AnyChatPopwindow anyChatPopwindow=new
        // AnyChatPopwindow(context,handler,remoteId);
        //// View
        // view=context.getWindow().getDecorView().findViewById(android.R.id.content);
        //// anyChatPopwindow.showAtLocation(view, Gravity.TOP |
        // Gravity.CENTER_HORIZONTAL, 0, 0);
        //
        // } catch (JSONException e) {
        // e.printStackTrace();
        // }
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
        // if(width * height * malv * zhenlv > 0 ){
        // configEntity.mConfigMode = 1;
        // }
        if (configEntity.mConfigMode == 1) // 自定义视频参数配置
        {
            // 设置本地视频编码的码率（如果码率为0，则表示使用质量优先模式）
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_BITRATECTRL, malv);
            // if (configEntity.mVideoBitrate == 0) {
            // 设置本地视频编码的质量
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_QUALITYCTRL, configEntity.mVideoQuality);
            // }
            // 设置本地视频编码的帧率
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_FPSCTRL, zhenlv);
            // 设置本地视频编码的关键帧间隔
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_GOPCTRL, configEntity.mVideoFps * 4);
            // 设置本地视频采集分辨率
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL, width);
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL, height);
            // 设置视频编码预设参数（值越大，编码质量越高，占用CPU资源也会越高）
            AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_PRESETCTRL, configEntity.mVideoPreset);
        }
        // 让视频参数生效
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_APPLYPARAM, configEntity.mConfigMode);
        // P2P设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_NETWORK_P2PPOLITIC, configEntity.mEnableP2P);
        // 本地视频Overlay模式设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_OVERLAY, configEntity.mVideoOverlay);
        // 回音消除设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_AUDIO_ECHOCTRL, configEntity.mEnableAEC);
        // 平台硬件编码设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_CORESDK_USEHWCODEC, configEntity.mUseHWCodec);
        // 视频旋转模式设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_ROTATECTRL, configEntity.mVideoRotateMode);
        // 本地视频采集偏色修正设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_FIXCOLORDEVIA, configEntity.mFixColorDeviation);
        // 视频GPU渲染设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_VIDEOSHOW_GPUDIRECTRENDER,
                configEntity.mVideoShowGPURender);
        // 本地视频自动旋转设置
        AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_AUTOROTATION, configEntity.mVideoAutoRotation);
    }

    /**
     * 未使用
     */
    // 申请进线
    private void initApply() {
        Map<String, Object> APP_HEAD = new HashMap<>();
        APP_HEAD.put("CHANNELCODE", "C003");
        APP_HEAD.put("MMDATE", "");
        APP_HEAD.put("MMID", "");
        APP_HEAD.put("OTHERDATA", "");
        APP_HEAD.put("TdgBrah", "10000");

        Map<String, Object> REQ_BODY = new HashMap<>();
        REQ_BODY.put("QUEUETYPE", "1");

        Map<String, Object> SYS_HEAD = new HashMap<>();
        SYS_HEAD.put("ConsumerIP", "000.000.000");
        // SYS_HEAD.put("ConsumerId", "C003");
        SYS_HEAD.put("ConsumerId", "C002");
        SYS_HEAD.put("ConsumerSeqNo", getUUID());
        SYS_HEAD.put("DeviceNum", "DE106");
        // SYS_HEAD.put("DeviceNum", "1424356572");
        SYS_HEAD.put("DeviceType", "APP");
        SYS_HEAD.put("DvcNum", "00000000");
        SYS_HEAD.put("MacValue", "00000000");
        SYS_HEAD.put("RequestDate", "20181009");
        SYS_HEAD.put("RequestTime", "110553");
        SYS_HEAD.put("ServerIP", Constant.url);
        SYS_HEAD.put("TdgBrah", "10000");
        SYS_HEAD.put("TranMode", "1");
        SYS_HEAD.put("TranTellerNo", "X0041");
        SYS_HEAD.put("TransServiceCode", "arb.arcs.createvideo.01");

        Map<String, Object> params = new HashMap<>();
        params.put("APP_HEAD", APP_HEAD);
        params.put("REQ_BODY", REQ_BODY);
        params.put("SYS_HEAD", SYS_HEAD);

        httpPostAsync(params, Constant.url, "GB18030");

        // HttpService.newBuilder()
        // .setAction(Constant.url)
        // .setMethod(METHOD.POST)
        // .setParams(params)
        // .setCallback(new RequestCallback() {
        // @Override
        // public void onSucceed(String data, String json) {
        // Log.e("fgq","数据"+json);
        // }
        //
        // @Override
        // public void onFail(int code, String message) {
        // Log.e("fgq","失败"+code+message);
        // }
        // })
        // .execute();
    }

    /**
     * 未使用
     * @return
     */
    // 自动生成32位的UUid，对应数据库的主键id进行插入用。
    public String getUUID() {
        UUID uuid = UUID.randomUUID();
        String str = uuid.toString();
        // 去掉"-"符号
        String temp = str.substring(0, 8) + str.substring(9, 13) + str.substring(14, 18) + str.substring(19, 23)
                + str.substring(24);
        return temp;
    }

    /**
     * 未使用
     * @param params
     * @param url
     * @param encode
     * @return
     */
    public String httpPostAsync(final Map<String, Object> params, final String url, final String encode) {
        try {
            FutureTask<String> task = new FutureTask<>(new Callable<String>() {
                @Override
                public String call() throws Exception {
                    String timeout = "20";
                    if (timeout == null || timeout.length() == 0)
                        timeout = "20";
                    Log.d("配置文件配置的超时时间：", timeout);
                    OkHttpClient okHttpClient = new OkHttpClient.Builder()
                            .connectTimeout(Integer.valueOf(timeout), TimeUnit.SECONDS).build();
                    MediaType JSON = MediaType.parse("application/json; charset=" + encode);

                    Map<String, Object> paramsBody = new HashMap<>();
                    // 写入请求数据 body
                    String bodyContent = "";
                    if (null != params && !params.isEmpty()) {
                        paramsBody.putAll(params);
                    }
                    bodyContent = JSONUtil.toJson(paramsBody);
                    RequestBody body = RequestBody.create(JSON, bodyContent);

                    Request request = new Request.Builder().url(url).post(body).build();
                    Call call = okHttpClient.newCall(request);

                    try {
                        Response response = call.execute();
                        byte[] responseBytes = response.body().bytes();
                        String responseUrl = new String(responseBytes, encode);
                        Log.e("fgq", "=====" + responseUrl);
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


    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // 三方会议
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////
    private SurfaceView thirdSurface;
    private int thirdId;
    public void playThird(@NonNull SurfaceView view, int userId){
        thirdSurface = view;
        thirdId = userId;
        Log.e("surface","thirdSurface:"+thirdSurface);
        int _index = anyChatSDK.mVideoHelper.bindVideo(thirdSurface.getHolder());
        thirdSurface.setTag(_index);
        anyChatSDK.mVideoHelper.SetVideoUser(_index, thirdId);
        Log.e("surface","_index:"+_index);

        anyChatSDK.UserCameraControl(thirdId, OPEN);
        anyChatSDK.UserSpeakControl(thirdId, OPEN);

        resumeThird();
    }

    public void resumeThirdDelay(){
        mHandler.postDelayed(this::resumeThird,1000);
    }

    public void resumeThird(){
        if(thirdSurface != null) {
//                if(thirdSurface.getVisibility() == View.VISIBLE){
//                    thirdSurface.setVisibility(View.INVISIBLE);
//                }
            thirdSurface.setVisibility(View.VISIBLE);
        }
    }

    public void pauseThirdDelay() {
        mHandler.postDelayed(this::pauseThird,1000);
    }

    public void pauseThird() {
        if(thirdSurface != null) {
            thirdSurface.setVisibility(View.INVISIBLE);
        }
    }

    public void stopThird(){
        pauseThird();

        anyChatSDK.UserCameraControl(thirdId, CLOSE);
        anyChatSDK.UserSpeakControl(thirdId, CLOSE);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // 共享桌面
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////
    private SurfaceView screenSurface;
    private static final int SCREEN_STREAM_INDEX = 1;

    public void playScreen(MySurfaceView view) {
        screenSurface = view;

        int _index = anyChatSDK.mVideoHelper.bindVideo(screenSurface.getHolder());
        screenSurface.setTag(_index);
        anyChatSDK.mVideoHelper.SetVideoUserEx(_index, remoteId,1);

        anyChatSDK.UserCameraControlEx(remoteId,OPEN,SCREEN_STREAM_INDEX,0,"");

        resumeScreen();
    }

    public void resumeScreenDelay(){
        mHandler.postDelayed(this::resumeScreen,1000*5);
    }

    public void resumeScreen(){
        if(screenSurface != null) {
//            快速切换visible状态，会导致黑屏
//            if(screenSurface.getVisibility() == View.VISIBLE){
//                screenSurface.setVisibility(View.INVISIBLE);
//            }
            screenSurface.setVisibility(View.VISIBLE);
        }
    }

    public void pauseScreenDelay(){
        mHandler.postDelayed(this::pauseScreen,1000);
    }

    public void pauseScreen() {
        if(screenSurface != null) {
            screenSurface.setVisibility(View.INVISIBLE);
        }
    }

    public void stopScreen() {
        pauseScreen();
        anyChatSDK.UserCameraControlEx(remoteId,CLOSE,SCREEN_STREAM_INDEX,0,"");
    }
}
