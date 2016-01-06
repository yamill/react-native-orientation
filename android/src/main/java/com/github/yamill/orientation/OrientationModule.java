package com.github.yamill.orientation;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.util.Log;

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

    public OrientationModule(ReactApplicationContext reactContext, final Activity activity) {
        super(reactContext);

        mActivity = activity;

        final ReactApplicationContext ctx = reactContext;

        final BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Configuration newConfig = intent.getParcelableExtra("newConfig");
                Log.d("receiver", String.valueOf(newConfig.orientation));

                String orientationValue = newConfig.orientation == 1 ? "PORTRAIT" : "LANDSCAPE";

                WritableMap params = Arguments.createMap();
                params.putString("orientation", orientationValue);

                ctx
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("orientationDidChange", params);
            }
        };

        activity.registerReceiver(receiver, new IntentFilter("onConfigurationChanged"));

        LifecycleEventListener listener = new LifecycleEventListener() {
            @Override
            public void onHostResume() {
                activity.registerReceiver(receiver, new IntentFilter("onConfigurationChanged"));
            }

            @Override
            public void onHostPause() {
                try
                {
                    activity.unregisterReceiver(receiver);
                }
                catch (java.lang.IllegalArgumentException e) {
                    FLog.e(ReactConstants.TAG, "receiver already unregistered", e);
                }
            }

            @Override
            public void onHostDestroy() {
                try
                {
                    activity.unregisterReceiver(receiver);
                }
                catch (java.lang.IllegalArgumentException e) {
                    FLog.e(ReactConstants.TAG, "receiver already unregistered", e);
                }
            }
        };

        reactContext.addLifecycleEventListener(listener);
    }

    @Override
    public String getName() {
        return "Orientation";
    }

    @ReactMethod
    public void getOrientation(Callback callback) {
        final int orientation = getReactApplicationContext().getResources().getConfiguration().orientation;

        if (orientation == Configuration.ORIENTATION_LANDSCAPE) {
            callback.invoke(null, "LANDSCAPE");
        } else if (orientation == Configuration.ORIENTATION_PORTRAIT) {
            callback.invoke(null, "PORTRAIT");
        } else if (orientation == Configuration.ORIENTATION_UNDEFINED) {
            callback.invoke(null, "UNKNOWN");
        } else {
            callback.invoke(orientation, null);
        }
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
    public void unlockAllOrientations() {
      mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
    }
}
