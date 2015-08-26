var Orientation = require('react-native').NativeModules.Orientation;
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var listeners = {};
var deviceEvent = "orientationDidChange";

module.exports = {
  lockToPortrait() {
    Orientation.lockToPortrait();
  },
  lockToLandscape() {
    Orientation.lockToLandscape();
  },
  unlockAllOrientations() {
    Orientation.unlockAllOrientations();
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
