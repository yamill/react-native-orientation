package com.github.yamill.orientation;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Point;
import android.hardware.SensorManager;
import android.provider.Settings;
import android.util.Log;
import android.view.Display;
import android.view.OrientationEventListener;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nullable;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class OrientationModule extends ReactContextBaseJavaModule {
    final private Activity mActivity;
    final OrientationEventListener mOrientationEventListener;
    final LifecycleEventListener mLifecycleEventListener;
    private Integer mOrientationValue;
    private String mOrientation;
    private String mSpecificOrientation;
    final private String[] mOrientations;

    private boolean mHostActive = false;

    public static final String LANDSCAPE = "LANDSCAPE";
    public static final String LANDSCAPE_LEFT = "LANDSCAPE-LEFT";
    public static final String LANDSCAPE_RIGHT = "LANDSCAPE-RIGHT";
    public static final String PORTRAIT = "PORTRAIT";
    public static final String PORTRAIT_UPSIDEDOWN = "PORTRAITUPSIDEDOWN";
    public static final String ORIENTATION_UNKNOWN = "UNKNOWN";

    private static final int ACTIVE_SECTOR_SIZE = 45;
    private final String[] ORIENTATIONS_PORTRAIT_DEVICE = {PORTRAIT, LANDSCAPE_RIGHT, PORTRAIT_UPSIDEDOWN, LANDSCAPE_LEFT};
    private final String[] ORIENTATIONS_LANDSCAPE_DEVICE = {LANDSCAPE_LEFT, PORTRAIT, LANDSCAPE_RIGHT, PORTRAIT_UPSIDEDOWN};

    public OrientationModule(ReactApplicationContext reactContext, final Activity activity) {
        super(reactContext);

        mActivity = activity;

        mOrientations = isLandscapeDevice() ? ORIENTATIONS_LANDSCAPE_DEVICE : ORIENTATIONS_PORTRAIT_DEVICE;

        mLifecycleEventListener = createLifecycleEventListener();
        reactContext.addLifecycleEventListener(mLifecycleEventListener);

        mOrientationEventListener = createOrientationEventListener(reactContext);
        if (mOrientationEventListener.canDetectOrientation()) {
            mOrientationEventListener.enable();
        }
    }

    private OrientationEventListener createOrientationEventListener(final ReactApplicationContext reactContext) {
        return new OrientationEventListener(reactContext,
            SensorManager.SENSOR_DELAY_NORMAL) {
            @Override
            public void onOrientationChanged(int orientationValue) {
                if (!mHostActive || isDeviceOrientationLocked() || !reactContext.hasActiveCatalystInstance()) return;

                mOrientationValue = orientationValue;

                if (mOrientation != null && mSpecificOrientation != null) {
                    final int halfSector = ACTIVE_SECTOR_SIZE / 2;
                    if ((orientationValue % 90) > halfSector
                        && (orientationValue % 90) < (90 - halfSector)) {
                        return;
                    }
                }

                final String orientation = getOrientationString(orientationValue);
                final String specificOrientation = getSpecificOrientationString(orientationValue);

                final DeviceEventManagerModule.RCTDeviceEventEmitter deviceEventEmitter =
                    (DeviceEventManagerModule.RCTDeviceEventEmitter)reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);

                if (!orientation.equals(mOrientation)) {
                    mOrientation = orientation;
                    WritableMap params = Arguments.createMap();
                    params.putString("orientation", orientation);
                    deviceEventEmitter.emit("orientationDidChange", params);
                }

                if (!specificOrientation.equals(mSpecificOrientation)) {
                    mSpecificOrientation = specificOrientation;
                    WritableMap params = Arguments.createMap();
                    params.putString("specificOrientation", specificOrientation);
                    deviceEventEmitter.emit("specificOrientationDidChange", params);
                }
            }
        };
    }

    private LifecycleEventListener createLifecycleEventListener() {
        return new LifecycleEventListener() {
            @Override
            public void onHostResume() {
                mHostActive = true;
            }

            @Override
            public void onHostPause() {
                mHostActive = false;
            }

            @Override
            public void onHostDestroy() {
                mHostActive = false;
            }
        };
    }

    @Override
    public String getName() {
        return "Orientation";
    }

    @ReactMethod
    public void getOrientation(Callback callback) {
        callback.invoke(null, mOrientation);
    }

    @ReactMethod
    public void lockToPortrait() {
      mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }

    @ReactMethod
    public void lockToLandscape() {
      mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
    }

    @ReactMethod
    public void lockToLandscapeLeft() {
      mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    }

    @ReactMethod
    public void lockToLandscapeRight() {
      mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE);
    }

    @ReactMethod
    public void unlockAllOrientations() {
      mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
    }

    @Override
    public @Nullable Map<String, Object> getConstants() {
      HashMap<String, Object> constants = new HashMap<String, Object>();
      constants.put("initialOrientation", mOrientation);
      return constants;
    }

    private boolean isDeviceOrientationLocked() {
        return Settings.System.getInt(
            mActivity.getContentResolver(),
            Settings.System.ACCELEROMETER_ROTATION, 0
        ) == 0;
    }

    private boolean isLandscapeDevice() {
        Display display = mActivity.getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        return size.x > size.y;
    }

    private String getSpecificOrientationString(int orientationValue) {
        if (orientationValue < 0) return ORIENTATION_UNKNOWN;
        final int index = (int)((float)orientationValue / 90.0 + 0.5) % 4;
        return mOrientations[index];
    }

    private String getOrientationString(int orientationValue) {
        final String specificOrientation = getSpecificOrientationString(orientationValue);
        switch (specificOrientation) {
            case LANDSCAPE_LEFT:
            case LANDSCAPE_RIGHT:
                return LANDSCAPE;
            case PORTRAIT:
            case PORTRAIT_UPSIDEDOWN:
                return PORTRAIT;
            default:
                return ORIENTATION_UNKNOWN;
        }
    }
}
