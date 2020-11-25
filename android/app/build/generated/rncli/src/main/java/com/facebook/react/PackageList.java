
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.bankproject.BuildConfig;
import com.bankproject.R;

// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/viewpager
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-exit-app
import com.github.wumke.RNExitApp.RNExitAppPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-permissions
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
// react-native-picker
import com.beefe.picker.PickerViewPackage;
// react-native-push-notification
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-select-contact
import com.streem.selectcontact.SelectContactPackage;
// react-native-speech-iflytek
import com.zphhhhh.speech.SpeechPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-touch-id
import com.rnfingerprint.FingerprintAuthPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// react-native-zip-archive
import com.rnziparchive.RNZipArchivePackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new RNCViewPagerPackage(),
      new RNCameraPackage(),
      new RNDeviceInfo(),
      new RNExitAppPackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new LinearGradientPackage(),
      new RNPermissionsPackage(),
      new PickerViewPackage(),
      new ReactNativePushNotificationPackage(),
      new RNScreensPackage(),
      new SelectContactPackage(),
      new SpeechPackage(),
      new SplashScreenReactPackage(),
      new SvgPackage(),
      new FingerprintAuthPackage(),
      new ReactVideoPackage(),
      new RNCWebViewPackage(),
      new RNZipArchivePackage()
    ));
  }
}
