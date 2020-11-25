package com.view;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Outline;
import android.graphics.Rect;
import android.os.Build;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewOutlineProvider;

import androidx.annotation.RequiresApi;

public class MySurfaceView extends SurfaceView {
    //查找View的唯一标识
    private String nativeId;
    //设置半径
    private int radius;

    //设置是否是圆
    private boolean isCircle = false;
    //设置是否为方形
    private boolean isSquare = false;

    private String mShape;

//    @Override
//    public void requestLayout() {
//        super.requestLayout();
//        post(measureAndLayout);
//    }
//
//    private final Runnable measureAndLayout = new Runnable() {
//        @Override
//        public void run() {
//            measure(MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
//                    MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
//            layout(getLeft(), getTop(), getRight(), getBottom());
//        }
//    };

    public MySurfaceView(Context context) {
        super(context);
        init();
    }


    private void init(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            setOutlineProvider(new ViewOutlineProvider() {
                @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
                @Override
                public void getOutline(View view, Outline outline) {
                    SharedPreferences sharedPreferences = getContext().getSharedPreferences("round_play_view", Context.MODE_PRIVATE);



                    radius = Math.min(view.getMeasuredWidth(),view.getMeasuredHeight())/2;
                    Log.e("MySurfaceView", "radius: " + radius );
                    if("userNativeViewId".equalsIgnoreCase(nativeId) ){
                        Log.e("MySurfaceView", "mcircle: " + sharedPreferences.getBoolean("circle",false) );
                        if(sharedPreferences.getBoolean("mcircle",false)){

                            Rect rect = new Rect(view.getMeasuredWidth()/2 - radius, view.getMeasuredHeight()/2 -radius,
                                    view.getMeasuredWidth()/2 + radius,  view.getMeasuredHeight()/2 + radius);
                            outline.setRoundRect(rect, radius);
                        }else if(sharedPreferences.getBoolean("square",false)){


                            Rect rect = new Rect(view.getMeasuredWidth()/2- radius , view.getMeasuredHeight()/2 - radius,
                                    view.getMeasuredWidth()/2 + radius, view.getMeasuredHeight()/2 + radius);
                            outline.setRect(rect);

                        }else {

                            Rect rect = new Rect(0, 0 , view.getMeasuredWidth(), view.getMeasuredHeight());
                            outline.setRect(rect);
                        }
                    }else {
                        Rect rect = new Rect(0, 0 , view.getMeasuredWidth(), view.getMeasuredHeight());
                        outline.setRect(rect);
                    }
                }
            });
            setClipToOutline(true);
        }
    }

    public String getNativeId() {
        return nativeId;
    }

    public void setNativeId(String nativeId) {
        this.nativeId = nativeId;
        if("thirdNativeViewId".equals(nativeId)){
            setVisibility(View.INVISIBLE);
        }
    }


    public void setRadius(int radius) {
        this.radius = radius;
    }

    public boolean isCircle() {
        return isCircle;
    }

    public void setCircle(boolean circle) {

        this.isCircle = circle;
        Log.e("setCircle", "setCircle: "+isCircle );
    }


    public boolean isSquare() {
        return isSquare;
    }

    public void setSquare(boolean square) {
        this.isSquare = square;
    }

    public void changeShape(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            invalidateOutline();
        }
    }

    public void setShape(String shape) {
        this.mShape = shape;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            invalidateOutline();
        }
    }
}