package com.view;


import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.view.glsurface.RoundCameraGLSurfaceView;

import io.reactivex.annotations.Nullable;

/**
 * 项目名称: TestPlugin
 * 类名称：RNPlayView
 * 类描述：$DESC
 * 创建人：ShangZemin
 * 创建时间：2019/9/4 8:04
 * 修改人：烈满
 * 修改时间：2019/9/4 8:04
 * 修改备注：
 */

public class RNPlayView  extends SimpleViewManager<MySurfaceView> {


    @Override
    public String getName() {
        return "RNPlayView";
    }

    @Override
    protected MySurfaceView createViewInstance(ThemedReactContext reactContext) {
        MySurfaceView view = new MySurfaceView(reactContext);
        return view;
    }

    @ReactProp(name = "nativeId")
    public void setSrc(MySurfaceView view, @Nullable String nativeId) {
        view.setNativeId(nativeId);
        view.setTag(nativeId);
    }
    @ReactProp(name = "shape")
    public void setShape(MySurfaceView view, @Nullable String shape) {
        view.setShape(shape);
    }
}

