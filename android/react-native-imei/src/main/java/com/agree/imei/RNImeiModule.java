package com.agree.imei;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.os.Build;
import android.telephony.TelephonyManager;

import com.agree.imei.util.RxPermissions;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

import io.reactivex.functions.Consumer;

public class RNImeiModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private TelephonyManager tm;

    private String[] permissions = new String[] {Manifest.permission.READ_PHONE_STATE};

    public RNImeiModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.tm = (TelephonyManager) reactContext.getSystemService(Context.TELEPHONY_SERVICE);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IMEI";
    }

    @SuppressLint("MissingPermission")
    @ReactMethod
    public void getImei(final Promise promise) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermissions.getIntance(getCurrentActivity())
                        .request(permissions)
                        .subscribe(new Consumer<Boolean>() {
                            @Override
                            public void accept(Boolean aBoolean) throws Exception {
                                if (aBoolean) {
                                    if (Build.VERSION.SDK_INT >= 23) {
                                        int count = tm.getPhoneCount();
                                        String[] imei = new String[count];
                                        for (int i = 0; i < count; i++) {
                                            if (Build.VERSION.SDK_INT >= 26) {
                                                imei[i] = tm.getImei(i);
                                            } else {
                                                imei[i] = tm.getDeviceId(i);
                                            }
                                        }
                                        promise.resolve(Arguments.fromJavaArgs(imei));
                                    } else {
                                        promise.resolve(Arguments.fromJavaArgs(new String[]{tm.getDeviceId()}));
                                    }
                                } else {
                                    promise.reject(new RuntimeException("权限不足！"));
                                    return;
                                }
                            }
                        });
            }
        });
    }

    /**
     * 获取应用ID
     * */
    @SuppressLint("MissingPermission")
    @ReactMethod
    public void getApplicationId(final Promise promise) {
        ApplicationInfo info = getReactApplicationContext().getApplicationInfo();
        promise.resolve(info.processName);
    }
}
