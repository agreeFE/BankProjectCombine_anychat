package com;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.view.RNPlayView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AnyChatPackage implements ReactPackage{
    public AnyChatMoudle anyChatMoudle;
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        anyChatMoudle = new AnyChatMoudle(reactContext);
        modules.add(anyChatMoudle);
        return modules;
    }



    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new RNPlayView()
        );
    }
}
