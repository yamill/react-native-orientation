## react-native-orientation
Listen to device orientation changes in react-native and set preferred orientation on screen to screen basis.

### Add it to your project

Run `npm install react-native-orientation --save`


#### iOS

1. Open your project in XCode, right click on your project and click `Add Files to "Your Project Name"`
2. Add `RCTOrientation` folder from your `node_modules/react-native-orientation` folder. <b>Make sure you have 'Create Groups' selected</b>

#### Android

1. In `android/setting.gradle`

    ```
    ...
    include ':Orientation', ':app'
    project(':Orientation').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-orientation/android')
    ```

2. In `android/app/build.gradle`

    ```
    ...
    dependencies {
        ...
        compile project(':Orientation')
    }
    ```

3. Register module (in MainActivity.java)

    ```
    import android.content.Intent; // <--- import
    import android.content.res.Configuration; // <--- import
    import com.github.yamill.orientation.OrientationPackage;  // <--- import

    public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
      ......

      @Override
      protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ReactInstanceManager.builder()
          .setApplication(getApplication())
          .setBundleAssetName("index.android.bundle")
          .setJSMainModuleName("index.android")
          .addPackage(new MainReactPackage())
          .addPackage(new OrientationPackage(this))              // <------ add here
          .setUseDeveloperSupport(BuildConfig.DEBUG)
          .setInitialLifecycleState(LifecycleState.RESUMED)
          .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

        setContentView(mReactRootView);
      }

      ......

    }
    ```

4. Implement onConfigurationChanged method (in MainActivity.java)

```
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
```

Whenever you want to use it within React Native code now you can:
`var Orientation = require('react-native-orientation');`


## Usage

```javascript
  _orientationDidChange: function(orientation) {
    if (orientation == 'LANDSCAPE') {
      //do something with landscape layout
    } else {
      //do something with portrait layout
    }
  },

  componentWillMount: function() {
    //The getOrientation method is async. It happens sometimes that
    //you need the orientation at the moment the js starts running on device.
    //getInitialOrientation returns directly because its a constant set at the
    //beginning of the js code.
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      //do stuff
    } else {
      //do other stuff
    }
  },

  componentDidMount: function() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    //Orientation.lockToLandscape(); //this will lock the view to Landscape
    //Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

    Orientation.addOrientationListener(this._orientationDidChange);
  },

  componentWillUnmount: function() {
	Orientation.getOrientation((err,orientation)=> {
		console.log("Current Device Orientation: ", orientation);
	});
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
```

## Events

- `addOrientationListener(function(orientation))`

orientation can return either `LANDSCAPE` `PORTRAIT` `UNKNOWN`
also `PORTRAITUPSIDEDOWN` is now different from `PORTRAIT`

- `removeOrientationListener(function(orientation))`

- `addSpecificOrientationListener(function(specificOrientation))`

specificOrientation can return either `LANDSCAPE-LEFT` `LANDSCAPE-RIGHT` `PORTRAIT` `UNKNOWN` `PORTRAITUPSIDEDOWN`

- `removeSpecificOrientationListener(function(specificOrientation))`

## Functions

- `lockToPortrait()`
- `lockToLandscape()`
- `lockToLandscapeLeft()`
- `lockToLandscapeRight()`
- `unlockAllOrientations()`
- `getOrientation(function(err, orientation)`

orientation can return either `LANDSCAPE` `PORTRAIT` `UNKNOWN` `PORTRAITUPSIDEDOWN`

- `getSpecificOrientation(function(err, specificOrientation)`

specificOrientation can return either `LANDSCAPE-LEFT` `LANDSCAPE-RIGHT` `PORTRAIT` `UNKNOWN` `PORTRAITUPSIDEDOWN`

## TODOS

- [x] Add some way to allow setting a preferred orientation on a screen by screen basis.
- [x] Make API Cleaner to Orientation Locking
- [x] Android Support
