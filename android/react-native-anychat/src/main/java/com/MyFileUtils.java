package com;

import android.content.Context;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Properties;

/**
 * Created by sunny on 2015-10-19.
 */
public class MyFileUtils {
    public static String saveFolder = "agree";
    public static String imgFolder = "img";
    public static String vidFolder = "vid";
    public static String audFolder = "aud";

    public static final int TYPE_IMAGE = 1;
    public static final int TYPE_VIDEO = 2;
    public static final int TYPE_AUDIO = 3;

    public static Uri getOutputMediaFileUri(int type) {
        return Uri.fromFile(getOutputMediaFile(type));
    }

    public static File getOutputMediaFile(int type) {
        // To be safe, you should check that the SDCard is mounted
        // using Environment.getExternalStorageState() before doing this.

        File mediaStorageDir = null;
        try {
            mediaStorageDir = new File(Environment.getExternalStorageDirectory(), saveFolder);
            switch (type){
                case TYPE_IMAGE:
                    mediaStorageDir = new File(mediaStorageDir,imgFolder);
                    break;
                case TYPE_VIDEO:
                    mediaStorageDir = new File(mediaStorageDir,vidFolder);
                    break;
                case TYPE_AUDIO:
                    mediaStorageDir = new File(mediaStorageDir,audFolder);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 如果不存在 就创建文件夹
        if (!mediaStorageDir.exists()) {
            if (!mediaStorageDir.mkdirs()) {
                return null;
            }
        }

        // Create a media file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new java.util.Date());
        File mediaFile;
        if (type == TYPE_IMAGE) {
            mediaFile = new File(mediaStorageDir.getPath() + File.separator + "IMG_" + timeStamp + ".jpg");
        } else if (type == TYPE_VIDEO) {
            mediaFile = new File(mediaStorageDir.getPath() + File.separator + "VID_" + timeStamp + ".mp4");
        } else if(type == TYPE_AUDIO) {
            mediaFile = new File(mediaStorageDir.getPath() + File.separator + "AUD_" + timeStamp + ".amr");
        }else {
            return null;
        }
        Log.d("LOG_TAG", "mediaFile.path---->" + mediaFile.getPath());
        return mediaFile;
    }

    /**
     * Create a File for saving an apk
     */
    public static String getDownloadApkPath() {
        File mediaStorageDir = null;
        try {
            mediaStorageDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), saveFolder);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 如果不存在 就创建文件夹
        if (!mediaStorageDir.exists()) {
            if (!mediaStorageDir.mkdirs()) {
                return null;
            }
        }
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new java.util.Date());
        return mediaStorageDir.getPath() + File.separator + timeStamp + ".apk";
    }

    /**
     * Create a File for saving an file
     */
    public static String getDownloadPath(String fileName) {
        File mediaStorageDir = null;
        try {
            mediaStorageDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), saveFolder);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 如果不存在 就创建文件夹
        if (!mediaStorageDir.exists()) {
            if (!mediaStorageDir.mkdirs()) {
                return null;
            }
        }
        return mediaStorageDir.getPath() + File.separator + fileName;
    }

    ///////////////////////////////////////////////////////////////////////////////////

    private static Properties properties;

    public static Properties getProperties(){
        if(properties == null) {
            properties = getProperties(getConfigPath("appConfig.properties"));
        }
        return properties;
    }

    public static void copyAssets2PhoneIfNeeded(Context context, String name) {
        try {
            File target = dirFile();
            String[] fileList = context.getAssets().list(name);
            if (fileList.length > 0) {//如果是目录
                File file = new File(target + File.separator + name);
                file.mkdirs();//如果文件夹不存在，则递归
                for (String fileName : fileList) {
                    String childName = name + File.separator + fileName;
                    copyAssets2PhoneIfNeeded(context, childName);
                }
            } else {//如果是文件
                //InputStream inputStream = MyFileUtils.class.getResourceAsStream(name);
                InputStream inputStream = context.getAssets().open(name);
                File file = new File(target + File.separator + name);
                file.createNewFile();
                if (!file.exists() || file.length() == 0) {
                    FileOutputStream fos = new FileOutputStream(file);
                    int len ;
                    byte[] buffer = new byte[1024];
                    while ((len = inputStream.read(buffer)) != -1) {
                        fos.write(buffer, 0, len);
                    }
                    fos.flush();
                    fos.close();
                    inputStream.close();
                    Log.i("copyAssets2Phone", "文件复制完毕");
                } else {
                    Log.i("copyAssets2Phone", "文件已存在，无需复制");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static Properties getProperties(String path) {
        try {
            Properties props = new Properties();
            InputStream in = new FileInputStream(path);
            props.load(in);
            return props;
        } catch (Exception e1) {
            e1.printStackTrace();
            return null;
        }
    }

    private static String getConfigPath(String fileName) {
        File mediaStorageDir = null;
        try {
            mediaStorageDir = dirFile();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 如果不存在 就创建文件夹
        if (!mediaStorageDir.exists()) {
            if (!mediaStorageDir.mkdirs()) {
                return null;
            }
        }
        return mediaStorageDir.getPath() + File.separator + fileName;
    }

    private static File dirFile() {
        return new File(Environment.getExternalStorageDirectory()+File.separator+saveFolder);
    }
}
