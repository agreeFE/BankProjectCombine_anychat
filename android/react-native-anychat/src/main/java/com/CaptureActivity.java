package com;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.hardware.Camera;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.android.anychat.R;

import java.io.File;
import java.io.FileOutputStream;

public class CaptureActivity extends Activity {

    public static final String KEY_PATH = "key_path";

    private SurfaceView mSurfaceView;

    private Camera mCamera;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);// 隐藏标题
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_capture);

        mSurfaceView = (SurfaceView) findViewById(R.id.surface);
        if(mSurfaceView != null){
            mSurfaceView.getHolder().addCallback(surfaceCallback);
        }
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Log.e("ca","post delay");
                mSurfaceView.setVisibility(View.VISIBLE);
            }
        }, 500);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(mCamera != null) {
            mCamera.stopPreview();
            mCamera.release();
            mCamera = null;
        }
    }

    SurfaceHolder.Callback surfaceCallback = new SurfaceHolder.Callback() {
        @Override
        public void surfaceCreated(SurfaceHolder holder) {
            Log.e("ca","surface created");
            try {
                mCamera = Camera.open(Camera.CameraInfo.CAMERA_FACING_BACK);
                mCamera.setPreviewDisplay(mSurfaceView.getHolder());
                mCamera.startPreview();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @Override
        public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
        }

        @Override
        public void surfaceDestroyed(SurfaceHolder holder) {
        }
    };

    public void onCaptureClick(View view) {
        mCamera.takePicture(null, null, takePictureCallback);
    }

    Camera.PictureCallback takePictureCallback = new Camera.PictureCallback() {
        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
            try {
                //限制图片尺寸
                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inJustDecodeBounds = true;
                BitmapFactory.decodeByteArray(data,0,data.length,options);
                options.inSampleSize = calculateInSampleSize(options,1000,1000);
                options.inJustDecodeBounds = false;
                Bitmap bitmap = BitmapFactory.decodeByteArray(data,0,data.length,options);

                //保存文件
                File file = MyFileUtils.getOutputMediaFile(1);
                FileOutputStream fos = new FileOutputStream(file);
                bitmap.compress(Bitmap.CompressFormat.JPEG,80,fos);
                fos.close();

                //返回文件路径
                Intent intent = new Intent();
                intent.putExtra(KEY_PATH,file.getPath());
                setResult(RESULT_OK,intent);
                finish();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };

    public static int calculateInSampleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {
        // 源图片的高度和宽度
        final int height = options.outHeight;
        final int width = options.outWidth;
        int inSampleSize = 1;
        if (height > reqHeight || width > reqWidth) {
            // 计算出实际宽高和目标宽高的比率
            final int heightRatio = Math.round((float) height / (float) reqHeight);
            final int widthRatio = Math.round((float) width / (float) reqWidth);
            // 选择宽和高中最小的比率作为inSampleSize的值，这样可以保证最终图片的宽和高
            // 一定都会大于等于目标的宽和高。
            inSampleSize = heightRatio < widthRatio ? heightRatio : widthRatio;
        }
        return inSampleSize;
    }
}
