package com.github.yamill.orientation;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.text.TextUtils;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class OrientationModule extends ReactContextBaseJavaModule {
    final private Activity mActivity;

    public OrientationModule(ReactApplicationContext reactContext, final Activity activity) {
        super(reactContext);

        mActivity = activity;
    }

    @Override
    public String getName() {
        return "Orientation";
    }

    @ReactMethod
    public void getOrientation(Callback callback) {

    }

    @ReactMethod
    public void lockToPortrait() {
        mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }

    @ReactMethod
    public void lockToLandscape() {
        mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    }

    @ReactMethod
    public void lockToSensorLandscape() {
        mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
    }

    @ReactMethod
    public void unlockAllOrientations() {
        mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
    }

    @Override
    public
    @Nullable
    Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<String, Object>();
        int orientationInt = getReactApplicationContext().getResources().getConfiguration().orientation;

        String orientation = this.getOrientationString(orientationInt);
        if (TextUtils.equals(orientation, "null")) {
            constants.put("initialOrientation", null);
        } else {
            constants.put("initialOrientation", orientation);
        }

        return constants;
    }

    private String getOrientationString(int orientation) {
        if (orientation == Configuration.ORIENTATION_LANDSCAPE) {
            return "LANDSCAPE";
        } else if (orientation == Configuration.ORIENTATION_PORTRAIT) {
            return "PORTRAIT";
        } else if (orientation == Configuration.ORIENTATION_UNDEFINED) {
            return "UNKNOWN";
        } else {
            return "null";
        }
    }
}
