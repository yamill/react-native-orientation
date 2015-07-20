var Orientation = require('NativeModules').Orientation;
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

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
