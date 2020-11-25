package com;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Handler;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.style.ForegroundColorSpan;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import com.android.anychat.R;
import com.bairuitech.anychat.AnyChatBaseEvent;
import com.bairuitech.anychat.AnyChatCoreSDK;
import com.bairuitech.anychat.AnyChatDefine;
import com.example.config.ConfigEntity;
import com.example.config.ConfigService;

public class AnyChatPopwindow extends PopupWindow  implements AnyChatBaseEvent {
    private final int UPDATEVIDEOBITDELAYMILLIS = 200; //监听音频视频的码率的间隔刷新时间（毫秒）
    boolean isOnVideo = false;     //是否在连接视频状态
    private boolean bSelfVideoOpened = false; // 本地视频是否已打开
    private boolean bOtherVideoOpened = false; // 对方视频是否已打开
    private Boolean mFirstGetVideoBitrate = false; //"第一次"获得视频码率的标致
    private Boolean mFirstGetAudioBitrate = false; //"第一次"获得音频码率的标致
    private SurfaceView mOtherView;
    private SurfaceView mMyView;
    private ImageButton mImgSwitchVideo;
    private Button mEndCallBtn;
    private ImageButton mBtnCameraCtrl; // 控制视频的按钮
    private ImageButton mBtnSpeakCtrl; // 控制音频的按钮
    public AnyChatCoreSDK anychatSDK;
    public static final int CLOSE = 0;
    public static final int OPEN = 1;
    public Handler handler;
    public int remoteId;
    private View contentView;
    public Activity content;
    private ScreenStatusReceiver mScreenStatusReceiver;
    private String SCREEN_ON = "android.intent.action.SCREEN_ON";
    private String SCREEN_OFF = "android.intent.action.SCREEN_OFF";
    public static String REENTERIN = "android.intent.action.REENTERIN";   //从后台进入到js页面意图
    private RelativeLayout rl_back;
    private LinearLayout video_session,layoutLocal,ll;
    private FrameLayout fl;
    private ProgressBar progressBar;
    private TextView tv_option,tv_optiondetail,tv_progress;

    public AnyChatPopwindow(Activity content,Handler handler,int remoteId){
        super(content);
        this.content=content;
        this.handler=handler;
        this.remoteId=remoteId;
        LayoutInflater inflater = (LayoutInflater) content.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        contentView = inflater.inflate(R.layout.video_popwindow, null);
        //设置SelectPicPopupWindow的View
        this.setContentView(contentView);
        //设置SelectPicPopupWindow弹出窗体的宽
        this.setWidth(ViewGroup.LayoutParams.FILL_PARENT);
        //设置SelectPicPopupWindow弹出窗体的高
        this.setHeight(ViewGroup.LayoutParams.WRAP_CONTENT);
        //设置SelectPicPopupWindow弹出窗体可点击
        //       this.setFocusable(true);
//        //设置SelectPicPopupWindow弹出窗体动画效果
//        this.setAnimationStyle(R.style.AnimBottom);
        //实例化一个ColorDrawable颜色为半透明
        ColorDrawable dw = new ColorDrawable(Color.argb(0, 0, 0, 0));
        //设置SelectPicPopupWindow弹出窗体的背景
        this.setBackgroundDrawable(dw);
       // this.setOutsideTouchable(true);


        anychatSDK = AnyChatCoreSDK.getInstance(content);
        anychatSDK.SetBaseEvent(this);
        anychatSDK.mSensorHelper.InitSensor(content);
        AnyChatCoreSDK.mCameraHelper.SetContext(content);

        rl_back=  ((RelativeLayout) contentView.findViewById(R.id.rl_back));
        fl=  ((FrameLayout) contentView.findViewById(R.id.fl));

        tv_option=  ((TextView) contentView.findViewById(R.id.option));
        tv_optiondetail=  ((TextView) contentView.findViewById(R.id.optiondetail));
        tv_progress=((TextView) contentView.findViewById(R.id.tv_progress));
        progressBar=  ((ProgressBar) contentView.findViewById(R.id.progressBar));
        ll=((LinearLayout) contentView.findViewById(R.id.ll));


        //加载布局
         video_session=(LinearLayout) contentView.findViewById(R.id.video_session);
        video_session.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.e("fgq","外面");
            }
        });

//        LinearLayout view=(LinearLayout) contentView.findViewById(R.id.view);
//        view.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Log.e("fgq","外面view");
//            }
//        });
        mMyView = (SurfaceView) contentView.findViewById(R.id.surface_local);
        mOtherView = (SurfaceView) contentView.findViewById(R.id.surface_remote);
        layoutLocal = (LinearLayout) contentView.findViewById(R.id.frame_local_area);



        mImgSwitchVideo = (ImageButton) contentView.findViewById(R.id.ImgSwichVideo);
        mEndCallBtn = (Button) contentView.findViewById(R.id.endCall);
        mBtnSpeakCtrl = (ImageButton) contentView.findViewById(R.id.btn_speakControl);
        mBtnCameraCtrl = (ImageButton) contentView.findViewById(R.id.btn_cameraControl);
        mBtnSpeakCtrl.setOnClickListener(onClickListener);
        mBtnCameraCtrl.setOnClickListener(onClickListener);
        mImgSwitchVideo.setOnClickListener(onClickListener);
        mEndCallBtn.setOnClickListener(onClickListener);

        // 如果是采用Java视频采集，则需要设置Surface的CallBack
        if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_CAPDRIVER) == AnyChatDefine.VIDEOCAP_DRIVER_JAVA) {
            mMyView.getHolder().addCallback(AnyChatCoreSDK.mCameraHelper);
        }

        // 如果是采用Java视频显示，则需要设置Surface的CallBack
        if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
            int index = anychatSDK.mVideoHelper.bindVideo(mOtherView.getHolder());
            anychatSDK.mVideoHelper.SetVideoUser(index, remoteId);
        }

        mMyView.setZOrderOnTop(true);

        anychatSDK.UserCameraControl(remoteId, OPEN);
        anychatSDK.UserSpeakControl(remoteId, OPEN);

        anychatSDK.SetVideoPos(remoteId,mOtherView.getHolder().getSurface(),0,0,0,0);

        // 判断是否显示本地摄像头切换图标
        if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_CAPDRIVER) == AnyChatDefine.VIDEOCAP_DRIVER_JAVA) {
            if (AnyChatCoreSDK.mCameraHelper.GetCameraNumber() > 1) {
                // 默认打开前置摄像头
                AnyChatCoreSDK.mCameraHelper.SelectVideoCapture(AnyChatCoreSDK.mCameraHelper.CAMERA_FACING_FRONT);
            }
        } else {
            String[] strVideoCaptures = anychatSDK.EnumVideoCapture();
            if (strVideoCaptures != null && strVideoCaptures.length > 1) {
                // 默认打开前置摄像头
                for (int i = 0; i < strVideoCaptures.length; i++) {
                    String strDevices = strVideoCaptures[i];
                    if (strDevices.indexOf("Front") >= 0) {
                        anychatSDK.SelectVideoCapture(strDevices);
                        break;
                    }
                }
            }
        }

        //adjustLocalVideo(false);

        anychatSDK.UserCameraControl(-1, OPEN);// -1表示对本地视频进行控制，打开本地视频
        anychatSDK.UserSpeakControl(-1, OPEN);// -1表示对本地音频进行控制，打开本地音频

        registSreenStatusReceiver();

        // 如果视频流过来了，则把背景设置成透明的//每0.2秒执行一次
        handler.postDelayed(runnable, UPDATEVIDEOBITDELAYMILLIS);
        isOnVideo=true;

        //ApplyVideoConfig();

        int videowidth=anychatSDK.GetUserVideoWidth(remoteId);
        int videoheight=anychatSDK.GetUserVideoHeight(remoteId);
        if (videowidth==0) videowidth=1280;
        if (videoheight==0) videoheight=720;

        changeVideoSize(videowidth,videoheight,mOtherView,false);
    }

    private View.OnClickListener onClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            int id=view.getId();
            if (id==R.id.ImgSwichVideo){
                // 如果是采用Java视频采集，则在Java层进行摄像头切换
                if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_CAPDRIVER) == AnyChatDefine.VIDEOCAP_DRIVER_JAVA) {
                    AnyChatCoreSDK.mCameraHelper.SwitchCamera();
                    return;
                }

                String strVideoCaptures[] = anychatSDK.EnumVideoCapture();
                String temp = anychatSDK.GetCurVideoCapture();
                for (int i = 0; i < strVideoCaptures.length; i++) {
                    if (!temp.equals(strVideoCaptures[i])) {
                        anychatSDK.UserCameraControl(-1, 0);
                        bSelfVideoOpened = false;
                        anychatSDK.SelectVideoCapture(strVideoCaptures[i]);
                        anychatSDK.UserCameraControl(-1, 1);
                        break;
                    }
                }
            }else if(id==R.id.endCall){
                exitVideoDialog();
            }else if(id==R.id.btn_speakControl){
                if ((anychatSDK.GetSpeakState(-1) == 1)) {
                    mBtnSpeakCtrl.setImageResource(R.drawable.speak_off);
                    anychatSDK.UserSpeakControl(-1, 0);
                } else {
                    mBtnSpeakCtrl.setImageResource(R.drawable.speak_on);
                    anychatSDK.UserSpeakControl(-1, 1);
                }
            }else if(id==R.id.btn_cameraControl){
                if ((anychatSDK.GetCameraState(-1) == 2)) {
                    mBtnCameraCtrl.setImageResource(R.drawable.camera_off);
                    anychatSDK.UserCameraControl(-1, 0);
                } else {
                    mBtnCameraCtrl.setImageResource(R.drawable.camera_on);
                    anychatSDK.UserCameraControl(-1, 1);
                }
            }
        }
    };



    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            try {
                int videoBitrate = anychatSDK.QueryUserStateInt(remoteId, AnyChatDefine.BRAC_USERSTATE_VIDEOBITRATE);
                int audioBitrate = anychatSDK.QueryUserStateInt(remoteId, AnyChatDefine.BRAC_USERSTATE_AUDIOBITRATE);
                //Log.e("fgq","popwindow-------videoBitrate:   "+videoBitrate+"audioBitrate:    "+audioBitrate);
                if (videoBitrate > 0) {
                    //handler.removeCallbacks(runnable);
                    mFirstGetVideoBitrate = true;
                    mOtherView.setBackgroundColor(Color.TRANSPARENT);
                }

                if(audioBitrate > 0){
                    mFirstGetAudioBitrate = true;
                }

                if (mFirstGetVideoBitrate) {
                    if (videoBitrate <= 0){
                        Toast.makeText(content, "对方视频中断了!", Toast.LENGTH_SHORT).show();
                        // 重置下，如果对方退出了，有进去了的情况
                        mFirstGetVideoBitrate = false;
                    }
                }

                if (mFirstGetAudioBitrate){
                    if (audioBitrate <= 0){
                        Toast.makeText(content, "对方音频中断了!", Toast.LENGTH_SHORT).show();
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


    private void exitVideoDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(content);
        builder.setMessage("Are you sure to exit ?")
                .setCancelable(false)
                .setPositiveButton("Yes",
                        new DialogInterface.OnClickListener() {

                            @Override
                            public void onClick(DialogInterface dialog,
                                                int which) {
                                //TODO 销毁页面
                                popwindowDismiss();

                            }
                        })
                .setNegativeButton("No", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.cancel();
                    }
                }).show();
    }


    public void popwindowDismiss(){
        isOnVideo=false;
        anychatSDK.UserCameraControl(remoteId, CLOSE);
        anychatSDK.UserSpeakControl(remoteId, CLOSE);
        anychatSDK.UserCameraControl(-1, CLOSE);
        anychatSDK.UserSpeakControl(-1, CLOSE);

        anychatSDK.LeaveRoom(-1);
        anychatSDK.Logout();
        handler.removeCallbacks(runnable);
        anychatSDK.removeEvent(this);
        anychatSDK.mSensorHelper.DestroySensor();
        anychatSDK.Release();

        content.unregisterReceiver(mScreenStatusReceiver);
        dismiss();
    }

    public void updateProcess(String option,String optiondetail ,int progress){
        ll.setVisibility(View.VISIBLE);

        String opyionstr="正在为您办理"+option;
        SpannableStringBuilder spannable_option = new SpannableStringBuilder(opyionstr);
        spannable_option.setSpan(new ForegroundColorSpan(Color.RED),6,opyionstr.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        tv_option.setText(spannable_option);

        String optiondetailstr="当前正在处理"+optiondetail;
        SpannableStringBuilder spannable_optiondetail = new SpannableStringBuilder(optiondetailstr);
        spannable_optiondetail.setSpan(new ForegroundColorSpan(Color.RED),6,optiondetailstr.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        tv_optiondetail.setText(spannable_optiondetail);

        tv_progress.setText(progress+"%");

        progressBar.setProgress(progress);
    }

    @Override
    public void OnAnyChatConnectMessage(boolean bSuccess) {

    }

    @Override
    public void OnAnyChatLoginMessage(int dwUserId, int dwErrorCode) {

    }

    @Override
    public void OnAnyChatEnterRoomMessage(int dwRoomId, int dwErrorCode) {
        if(dwErrorCode == 0){
            Log.e("AnyChatPopwindow-fgq","OnAnyChatEnterRoomMessage==进入房间成功dwRoomId："+dwRoomId+"    dwErrorCode："+dwErrorCode);
        }else {
            //通知UI 通话失败
            Log.e("AnyChatPopwindow-fgq","OnAnyChatEnterRoomMessage==进入房间失败dwRoomId："+dwRoomId+"    dwErrorCode："+dwErrorCode);
        }
    }

    @Override
    public void OnAnyChatOnlineUserMessage(int dwUserNum, int dwRoomId) {
        Log.e("AnyChatPopwindow-fgq","OnAnyChatOnlineUserMessage---进入   dwUserNum"+dwUserNum+"    dwRoomId"+dwRoomId);
        if (dwUserNum==0){

        }else {
        }
    }

    @Override
    public void OnAnyChatUserAtRoomMessage(int dwUserId, boolean bEnter) {
        if (!bEnter) {
            Toast.makeText(content, "AnyChatPopwindow--对方已离开！", Toast.LENGTH_SHORT).show();
            remoteId=0;
            anychatSDK.UserCameraControl(dwUserId, CLOSE);
            anychatSDK.UserSpeakControl(dwUserId, CLOSE);
        } else {
            remoteId = dwUserId;
            Log.e("AnyChatPopwindow-fgq","OnAnyChatUserAtRoomMessage===进入远程房间用户dwUserId:"+dwUserId);
            anychatSDK.UserCameraControl(remoteId,OPEN);
            anychatSDK.UserSpeakControl(remoteId,OPEN);
        }
    }

    @Override
    public void OnAnyChatLinkCloseMessage(int dwErrorCode) {

        Log.e("AnyChatPopwindow-fgq ","OnAnyChatLinkCloseMessage");
        anychatSDK.LeaveRoom(-1);
        anychatSDK.Logout();
    }

    /**
     * 设置本地视频的宽高
     * @param bLandScape
     */
    public void adjustLocalVideo(boolean bLandScape) {
        float width;
        float height = 0;
        DisplayMetrics dMetrics = new DisplayMetrics();
        content.getWindowManager().getDefaultDisplay().getMetrics(dMetrics);
        width = (float) dMetrics.widthPixels / 4;
        LinearLayout layoutLocal = (LinearLayout) contentView.findViewById(R.id.frame_local_area);
        FrameLayout.LayoutParams layoutParams = (FrameLayout.LayoutParams) layoutLocal.getLayoutParams();
        if (bLandScape) {
            if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL) != 0)
                height = width * AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL)
                        / AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL) + 5;
            else
                height = (float) 3 / 4 * width + 5;
        } else {
            if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL) != 0)
                height = width * AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL)
                        / AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL) + 5;
            else
                height = (float) 4 / 3 * width + 5;
        }
        layoutParams.width = (int) width;
        layoutParams.height = (int) height;
        Log.e("fgq","自己视频的宽高width:    "+width+"   height:    "+height);
        layoutLocal.setLayoutParams(layoutParams);
    }


    private void registSreenStatusReceiver() {
        mScreenStatusReceiver = new ScreenStatusReceiver();
        IntentFilter screenStatusIF = new IntentFilter();
        screenStatusIF.addAction(SCREEN_ON);
        screenStatusIF.addAction(SCREEN_OFF);
        screenStatusIF.addAction(REENTERIN);
        content.registerReceiver(mScreenStatusReceiver, screenStatusIF);
    }

    class ScreenStatusReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (SCREEN_ON.equals(intent.getAction())) {
                Log.e("fgq","屏幕亮");
                if (AnyChatCoreSDK
                        .GetSDKOptionInt(AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                    int index = anychatSDK.mVideoHelper.bindVideo(mOtherView
                            .getHolder());
                    anychatSDK.mVideoHelper.SetVideoUser(index, remoteId);
                }

                refreshAV();


            } else if (SCREEN_OFF.equals(intent.getAction())) {
                Log.e("fgq","屏幕熄灭");
            }else if (REENTERIN.equals(intent.getAction())) {
                Log.e("fgq","再次进入");
                if (isOnVideo){
                    if (AnyChatCoreSDK
                            .GetSDKOptionInt(AnyChatDefine.BRAC_SO_VIDEOSHOW_DRIVERCTRL) == AnyChatDefine.VIDEOSHOW_DRIVER_JAVA) {
                        int index = anychatSDK.mVideoHelper.bindVideo(mOtherView
                                .getHolder());
                        anychatSDK.mVideoHelper.SetVideoUser(index, remoteId);
                    }

                    refreshAV();
                }
            }
        }
    }


    private void refreshAV() {
        anychatSDK.UserCameraControl(remoteId, OPEN);
        anychatSDK.UserSpeakControl(remoteId, OPEN);
        anychatSDK.UserCameraControl(-1, OPEN);
        anychatSDK.UserSpeakControl(-1, OPEN);
        bOtherVideoOpened = false;
        bSelfVideoOpened = false;
    }


    public void setGone(){
        rl_back.setVisibility(View.GONE);
//        video_session.setVisibility(View.GONE);
//        fl.setVisibility(View.GONE);
//        mOtherView.setVisibility(View.GONE);
//        mMyView.setVisibility(View.GONE);
//        layoutLocal.setVisibility(View.GONE);
    }

    public void setShow(){
        rl_back.setVisibility(View.VISIBLE);
        video_session.setVisibility(View.VISIBLE);
        fl.setVisibility(View.VISIBLE);
        mOtherView.setVisibility(View.VISIBLE);
        mMyView.setVisibility(View.VISIBLE);
        layoutLocal.setVisibility(View.VISIBLE);
    }


    // 根据配置文件配置视频参数
    private void ApplyVideoConfig() {
        ConfigEntity configEntity = ConfigService.LoadConfig(content);
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


    public void changeVideoSize(int videoWidth,int videoHeight,SurfaceView surfaceView,boolean bLandScape) {
        DisplayMetrics dMetrics = new DisplayMetrics();
        content.getWindowManager().getDefaultDisplay().getMetrics(dMetrics);
        int screentwidth = dMetrics.widthPixels ;
        int screentheight = dMetrics.heightPixels ;

        //根据视频尺寸去计算->视频可以在sufaceView中放大的最大倍数。
        float max = Math.min((float) videoWidth / (float) screentwidth,(float) videoHeight / (float) screentheight);
        Log.e("fgq","视频宽："+videoWidth+"     视频高："+videoHeight+
                "      屏幕宽"+screentwidth+"     屏幕高"+screentheight+"    max比例"+max);
        //视频宽高分别/最大倍数值 计算出放大后的视频尺寸
        videoWidth = (int) Math.ceil((float) videoWidth / max);
        videoHeight = (int) Math.ceil((float) videoHeight / max);

        Log.e("fgq","计算之后的视频宽"+videoWidth+"高："+videoHeight);

        FrameLayout.LayoutParams layoutParamsSV = new FrameLayout.LayoutParams(videoWidth, videoHeight);
        //layoutParamsSV.gravity=1;
        int a=videoWidth-screentwidth;
        layoutParamsSV.leftMargin=-a/2;
        Log.e("fgq","leftMargin:"+a/2);
        surfaceView.setLayoutParams(layoutParamsSV);



        float width;
        float height = 0;
        content.getWindowManager().getDefaultDisplay().getMetrics(dMetrics);
        width = (float) dMetrics.widthPixels / 4;
        FrameLayout.LayoutParams layoutParams = (FrameLayout.LayoutParams) layoutLocal.getLayoutParams();
        if (bLandScape) {
            if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL) != 0)
                height = width * AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL)
                        / AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL) + 5;
            else
                height = (float) 3 / 4 * width + 5;
        } else {
            if (AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL) != 0)
                height = width * AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL)
                        / AnyChatCoreSDK.GetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL) + 5;
            else
                height = (float) 4 / 3 * width + 5;
        }
        layoutParams.width = (int) width;
        layoutParams.height = (int) height;
        Log.e("fgq","自己视频的宽高width:    "+width+"   height:    "+height);
        layoutLocal.setLayoutParams(layoutParams);
    }
}
