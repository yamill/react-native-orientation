'use strict';

var Orientation = require('react-native').NativeModules.Orientation;
var DeviceEventEmitter = require('react-native').DeviceEventEmitter;

var listeners = {};
var orientationDidChangeEvent = 'orientationDidChange';
var specificOrientationDidChangeEvent = 'specificOrientationDidChange';

var id = 0;
var META = '__listener_id';

function getKey(listener) {
  if (!listener.hasOwnProperty(META)) {
    if (!Object.isExtensible(listener)) {
      return 'F';
    }

    Object.defineProperty(listener, META, {
      value: 'L' + ++id
    });
  }

  return listener[META];
};

module.exports = {
  getOrientation: function getOrientation(cb) {
    Orientation.getOrientation(function (error, orientation) {
      cb(error, orientation);
    });
  },
  getSpecificOrientation: function getSpecificOrientation(cb) {
    Orientation.getSpecificOrientation(function (error, orientation) {
      cb(error, orientation);
    });
  },
  lockToPortrait: function lockToPortrait() {
    Orientation.lockToPortrait();
  },
  lockToLandscape: function lockToLandscape() {
    Orientation.lockToLandscape();
  },
  lockToLandscapeRight: function lockToLandscapeRight() {
    Orientation.lockToLandscapeRight();
  },
  lockToLandscapeLeft: function lockToLandscapeLeft() {
    Orientation.lockToLandscapeLeft();
  },
  unlockAllOrientations: function unlockAllOrientations() {
    Orientation.unlockAllOrientations();
  },
  addOrientationListener: function addOrientationListener(cb) {
    var key = getKey(cb);
    listeners[key] = DeviceEventEmitter.addListener(orientationDidChangeEvent, function (body) {
      cb(body.orientation);
    });
  },
  removeOrientationListener: function removeOrientationListener(cb) {
    var key = getKey(cb);

    if (!listeners[key]) {
      return;
    }

    listeners[key].remove();
    listeners[key] = null;
  },
  addSpecificOrientationListener: function addSpecificOrientationListener(cb) {
    var key = getKey(cb);

    listeners[key] = DeviceEventEmitter.addListener(specificOrientationDidChangeEvent, function (body) {
      cb(body.specificOrientation);
    });
  },
  removeSpecificOrientationListener: function removeSpecificOrientationListener(cb) {
    var key = getKey(cb);

    if (!listeners[key]) {
      return;
    }

    listeners[key].remove();
    listeners[key] = null;
  },
  getInitialOrientation: function getInitialOrientation() {
    return Orientation.initialOrientation;
  }
};