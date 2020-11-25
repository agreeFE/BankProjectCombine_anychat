package com.bankproject;


import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.AnyChatMoudle;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 这里定义了在加载js的时候，同时弹起启动屏
        // 第二个参数true，是启动页全屏显示，隐藏了状态栏。
        SplashScreen.show(this, true);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        try {
            AnyChatMoudle anychat = getReactInstanceManager().getCurrentReactContext().getNativeModule(AnyChatMoudle.class);
            anychat.anyChatTool.onMainActivityResume();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        try {
            AnyChatMoudle anychat = getReactInstanceManager().getCurrentReactContext().getNativeModule(AnyChatMoudle.class);
            anychat.anyChatTool.onMainActivityPause();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            AnyChatMoudle anychat = getReactInstanceManager().getCurrentReactContext().getNativeModule(AnyChatMoudle.class);
            anychat.anyChatTool.onMainActivityDestroy();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void onActivityResult(int requestCode,int resultCode,Intent data){
        super.onActivityResult(requestCode,resultCode,data);

        if(requestCode == 10011 && resultCode == RESULT_OK && data != null){
            Log.e("take photo","photo path:"+data);
            AnyChatMoudle anychat = getReactInstanceManager().getCurrentReactContext().getNativeModule(AnyChatMoudle.class);
            anychat.anyChatTool.onTakePhotoResult(data.getStringExtra("key_path"));
            return;
        }

        try {
            AnyChatMoudle anychat = getReactInstanceManager().getCurrentReactContext().getNativeModule(AnyChatMoudle.class);
            anychat.anyChatTool.anyChatSDK.onRequestResult(requestCode,resultCode,data);
        }catch (Exception e){
            e.printStackTrace();
        }

    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "BankProject";
  }
}
