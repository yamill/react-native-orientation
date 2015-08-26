## react-native-orientation
Listen to device orientation changes in react-native and set preferred orientation on screen to screen basis.

### Add it to your project

1. Run `npm install react-native-orientation --save`
2. Open your project in XCode, right click on your project and click `Add Files to "Your Project Name"`
3. Add `RCTOrientation` from your `node_modules/react-native-orientation` folder.
4. Open AppDelegate.h and add the following property `@property (nonatomic) int orientation;`
5. Open AppDelegate.m and add the following before the `@end`

```objective-c
- (NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  switch (self.orientation) {
    case 1:
      return UIInterfaceOrientationMaskPortrait;
      break;
    case 2:
      return UIInterfaceOrientationMaskLandscape;
      break;
    case 3:
      return UIInterfaceOrientationMaskAllButUpsideDown;
      break;
    default:
      return UIInterfaceOrientationMaskPortrait;
      break;
  }
}
```

Whenever you want to use it within React Native code now you can:
`var Orientation = require('react-native-orientation');`


## Usage

```javascript
  _orientationDidChange: function(orientation) {
    if(orientation == 'LANDSCAPE'){
      //do something with landscape layout
    }else{
      //do something with portrait layout
    }
  },
  componentDidMount: function(){
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    //Orientation.lockToLandscape(); //this will lock the view to Landscape
    //Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

    Orientation.addOrientationListener(this._orientationDidChange);
  },
  componentWillUnmount: function() {
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
```

## Events

`addOrientationListener(function)`

`removeOrientationListener(function)`

## Functions

`lockToPortrait()`
`lockToLandscape()`
`unlockAllOrientations()`

`_orientationDidChange(orientation)`

orientation can return either `LANDSCAPE` `PORTRAIT` `UNKNOWN`

## TODOS

- [x] Add some way to allow setting a preferred orientation on a screen by screen basis.
- [x] Make API Cleaner to Orientation Locking
- [] Find a way to expose shouldAutoRotate (??? a PR would be great)
