var Orientation = require('react-native').NativeModules.Orientation;
var RCTDeviceEventEmitter = require('react-native').RCTDeviceEventEmitter;

var listeners = {};
var deviceEvent = "orientationDidChange";

module.exports = {
  shouldRotate(string) {
    Orientation.shouldRotate(string);
  },
  addOrientationListener(cb) {
    listeners[cb] = RCTDeviceEventEmitter.addListener(deviceEvent,
      (body) => {
        cb(body.orientation);
      });
  },
  removeOrientationListener(cb) {
    if (!listeners[cb]) {
      return;
    }
    listeners[cb].remove();
    listeners[cb] = null;
  }
}
