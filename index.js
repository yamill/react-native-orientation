var Orientation = require('react-native').NativeModules.Orientation;
var DeviceEventEmitter = require('react-native').DeviceEventEmitter;

var listeners = {};
var orientationDidChangeEvent = "orientationDidChange";
var specificOrientationDidChangeEvent = "specificOrientationDidChange";

module.exports = {
  getOrientation(cb) {
    Orientation.getOrientation((error,orientation) =>{
      cb(error, orientation);
    });
  },
  getSpecificOrientation(cb) {
    Orientation.getSpecificOrientation((error,orientation) =>{
      cb(error, orientation);
    });
  },
  lockToPortrait() {
    Orientation.lockToPortrait();
  },
  lockToLandscape() {
    Orientation.lockToLandscape();
  },
  lockToLandscapeRight() {
    Orientation.lockToLandscapeRight();
  },
  lockToLandscapeLeft() {
    Orientation.lockToLandscapeLeft();
  },
  unlockAllOrientations() {
    Orientation.unlockAllOrientations();
  },
  addOrientationListener(cb) {
    listeners[cb] = DeviceEventEmitter.addListener(orientationDidChangeEvent,
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
  },
  addSpecificOrientationListener(cb) {
    listeners[cb] = DeviceEventEmitter.addListener(specificOrientationDidChangeEvent,
      (body) => {
        cb(body.specificOrientation);
      });
  },
  removeSpecificOrientationListener(cb) {
    if (!listeners[cb]) {
      return;
    }
    listeners[cb].remove();
    listeners[cb] = null;
  },
  getInitialOrientation() {
    return Orientation.initialOrientation;
  }
}
