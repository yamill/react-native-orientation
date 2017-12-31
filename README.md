## React Native Orientation
[![npm version](https://badge.fury.io/js/react-native-orientation.svg)](https://badge.fury.io/js/react-native-orientation)

Listen to device orientation changes in React Native applications and programmatically set preferred orientation on a per screen basis. Works on both Android and iOS.

## Installing

```
npm install react-native-orientation --save
```

## Linking Native Dependencies

### Automatic Linking

```
react-native link react-native-orientation
```

Please note that you **still need to manually configure** a couple files even when using automatic linking. Please see the ['Configuration'](#configuration) section below. You will also **need to restart your simulator** before the package will work properly.

### Manual Linking

**iOS**

1. Add `node_modules/react-native-orientation/iOS/RCTOrientation.xcodeproj` to your xcode project, usually under the `Libraries` group
2. Add `libRCTOrientation.a` (from `Products` under `RCTOrientation.xcodeproj`) to build target's `Linked Frameworks and Libraries` list
3. Add `$(SRCROOT)/node_modules/react-native-orientation/iOS/RCTOrientation/` to `Project Name` -> `Build Settings` -> `Header Search Paths`


**Android**

1. In `android/setting.gradle`

    ```
    ...
    include ':react-native-orientation', ':app'
    project(':react-native-orientation').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-orientation/android')
    ```

2. In `android/app/build.gradle`

    ```
    ...
    dependencies {
        ...
        compile project(':react-native-orientation')
    }
    ```

3. Register module in `MainApplication.java`

    ```java
    import com.github.yamill.orientation.OrientationPackage;  // <--- import

    public class MainApplication extends Application implements ReactApplication {
      ......

      @Override
      protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new OrientationPackage()      <------- Add this
          );
      }

      ......

    }
    ```

### Configuration

**iOS**

Add the following to your project's `AppDelegate.m`:

```objc
#import "Orientation.h" // <--- import

@implementation AppDelegate

  // ...

  - (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
    while ([[UIDevice currentDevice] isGeneratingDeviceOrientationNotifications]) {
        [[UIDevice currentDevice] endGeneratingDeviceOrientationNotifications];
    }
  
    return [Orientation getOrientation];
  }

@end
```

**Android**

Implement `onConfigurationChanged` method in `MainActivity.java`

```java
    import android.content.Intent; // <--- import
    import android.content.res.Configuration; // <--- import

    public class MainActivity extends ReactActivity {
      ......
      @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

      ......

    }
```

## Usage

To use the `react-native-orientation` package in your codebase, you should use the Orientation module:
```javascript
import Orientation from 'react-native-orientation';
```

```javascript
export default class AppScreen extends Component {
  // ...

  componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }
  },

  componentDidMount() {
    // this locks the view to Portrait Mode
    Orientation.lockToPortrait();

    // this locks the view to Landscape Mode
    // Orientation.lockToLandscape();

    // this unlocks any previous locks to all Orientations
    // Orientation.unlockAllOrientations();

    Orientation.addOrientationListener(this._orientationDidChange);
  },

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  },

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });


    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    // ...

    return (
      // ...
    )
  }
}
```

## Orientation Events

```javascript
addOrientationListener((orientation) => {});
```

`orientation` will return one of the following values:
- `LANDSCAPE`
- `PORTRAIT`
- `PORTRAITUPSIDEDOWN`
- `UNKNOWN`

```javascript
removeOrientationListener((orientation) => {});
```

```javascript
addSpecificOrientationListener((specificOrientation) => {});
```

`specificOrientation` will return one of the following values:
- `LANDSCAPE-LEFT`
- `LANDSCAPE-RIGHT`
- `PORTRAIT`
- `PORTRAITUPSIDEDOWN`
- `UNKNOWN`

```javascript
removeSpecificOrientationListener((specificOrientation) => {});
```

## API

- `lockToPortrait()`
- `lockToLandscape()`
- `lockToLandscapeLeft()`
- `lockToLandscapeRight()`
- `unlockAllOrientations()`
- `getOrientation((err, orientation) => {})`
- `getSpecificOrientation((err, specificOrientation) => {})`
