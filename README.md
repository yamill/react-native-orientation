## react-native-orientation
Listen to device orientation changes in react-native.
Orientation module adapted from @clavery.

### Add it to your project

1. Run `npm install react-native-orientation --save`
2. Open your project in XCode, right click on your project and click `Add Files to "Your Project Name"`
3. Add `RCTOrientation` from your `node_modules/react-native-orientation` folder.
5. Whenever you want to use it within React code now you can:
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
    Orientation.addOrientationListener(this._orientationDidChange);
  },
  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
```

## Events

`addOrientationListener(function)`

`removeOrientationListener(function)`

## TODOS

- [ ] Add some way to allow setting a preferred orientation on a screen by screen basis.
