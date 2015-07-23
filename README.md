## react-native-orientation
Listen to device orientation changes in react-native and set preferred orientation on screen to screen basis.
Orientation listener adapted from @clavery.
Preferred orientation on screen to screen basis adapted from @dsibiski rnplay-ios.

### Add it to your project

1. Run `npm install react-native-orientation --save`
2. Open your project in XCode, right click on your project and click `Add Files to "Your Project Name"`
3. Add `RCTOrientation` from your `node_modules/react-native-orientation` folder.
4. Open AppDelegate.h and add the following property above UIWindow
`@property (nonatomic) bool shouldRotate;`
5. Open AppDelegate.m and add the following before the `@end`

```objective-c
- (NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  NSUInteger orientations;

  orientations = UIInterfaceOrientationMaskPortrait;

  if (self.shouldRotate == YES) {
    orientations = UIInterfaceOrientationMaskAllButUpsideDown;
  }

  return orientations;
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
    Orientation.shouldRotate(1); //this will allow rotation

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

`shouldRotate(BOOL)`

shouldRotate value should be either `0` or `1`

`_orientationDidChange(orientation)`

orientation can return either `LANDSCAPE` `PORTRAIT` `UNKNOWN`

## TODOS

- [x] Add some way to allow setting a preferred orientation on a screen by screen basis.
