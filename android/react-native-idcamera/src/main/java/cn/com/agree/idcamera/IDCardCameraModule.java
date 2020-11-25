package cn.com.agree.idcamera;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.text.TextUtils;
import android.util.Base64;


import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.tbruyelle.rxpermissions2.RxPermissions;
import com.wildma.idcardcamera.camera.IDCardCamera;


import org.w3c.dom.Text;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import io.reactivex.annotations.NonNull;
import io.reactivex.functions.Consumer;

/**
 * Created by cn_pa on 2016/11/24.
 * 提供讯飞语音识别 React Native 接口
 */

public class IDCardCameraModule extends ReactContextBaseJavaModule {
    private Context context;
    private final String[] PERMISSIONS = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.CAMERA};
    private Callback errorCallback;
    private Callback successCallback;


    public IDCardCameraModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        reactContext.addActivityEventListener(new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (resultCode == IDCardCamera.RESULT_CODE) {
                    //获取图片路径，显示图片
                    final String path = IDCardCamera.getImagePath(data);


                    if (!TextUtils.isEmpty(path)) {
//                        FileInputStream fis = null;
//                        Bitmap bitmap = null;
//                        try {
//                            fis = new FileInputStream(path);
//                            bitmap  = BitmapFactory.decodeStream(fis);
//                        } catch (FileNotFoundException e) {
//                            WritableMap params = Arguments.createMap();
//                            params.putString("message", "系统未知原因");
//                            errorCallback.invoke(params);
//                            e.printStackTrace();
//                            return;
//
//                        }

                        WritableMap params = Arguments.createMap();

                        params.putString("imgs",path );
                        successCallback.invoke(params);

                    }else {
                        WritableMap params = Arguments.createMap();
                        params.putString("message", "系统未知原因");


                        errorCallback.invoke(params);
                    }
                }else if(requestCode == IDCardCamera.TYPE_IDCARD_FRONT || requestCode == IDCardCamera.TYPE_IDCARD_BACK && resultCode == Activity.RESULT_CANCELED){
                    WritableMap params = Arguments.createMap();
                    params.putString("message", "您退出了操作");
                    errorCallback.invoke(params);
                }
            }

            @Override
            public void onNewIntent(Intent intent) {

            }
        });
    }

    @Override
    public String getName() {
        return "IDCardCameraModule";
    }

    @ReactMethod
    public void getIDCardPhoto(final int type , final Callback successCallback, final Callback errorCallback) {
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        if(type >= 1 && type <= 3  )
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                new RxPermissions(getCurrentActivity())
                        .request(PERMISSIONS)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(@NonNull Boolean aBoolean) throws Exception {
                                if(aBoolean){

                                    IDCardCamera.create(getCurrentActivity()).openCamera(type);
                                }else{
                                    WritableMap params = Arguments.createMap();
                                    params.putString("message", "权限不足");
                                    errorCallback.invoke(params);

                                }
                            }
                        });
            }
        });
        else {
            WritableMap params = Arguments.createMap();
            params.putString("message", "参数错误");
            errorCallback.invoke(params);
        }

    }
    /**
     * bitmap转为base64
     *
     * @param bitmap
     * @return
     */
    private String bitmapToBase64(Bitmap bitmap) {

        String result = null;
        ByteArrayOutputStream baos = null;
        try {
            if (bitmap != null) {
                baos = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);

                baos.flush();
                baos.close();

                byte[] bitmapBytes = baos.toByteArray();
                result = Base64.encodeToString(bitmapBytes, Base64.DEFAULT);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (baos != null) {
                    baos.flush();
                    baos.close();
                }
                bitmap.recycle();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

}
