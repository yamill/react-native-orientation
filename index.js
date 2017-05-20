var Orientation = require('react-native').NativeModules.Orientation;
var DeviceEventEmitter = require('react-native').DeviceEventEmitter;

var listeners = {};
var orientationDidChangeEvent = "orientationDidChange";
var specificOrientationDidChangeEvent = "specificOrientationDidChange";

const ORIENTATION_CHANGED = "_ORIENTATION_CHANGED";
const INITIAL_STATE = {
    orientation: null
};

var id = 0;
var META = '__listener_id';

function getKey(listener){
  if (!listener.hasOwnProperty(META)){
    if (!Object.isExtensible(listener)) {
      return 'F';
    }
    Object.defineProperty(listener, META, {
      value: 'L' + ++id,
    });
  }
  return listener[META];
};

module.exports = {
  OrientationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case ORIENTATION_CHANGED:
        return {
          ...state,
          orientation: action.orientation
        }
    }
    return state;
  },

  init(s) {
    const handler = (orientation) => {
      s && s.dispatch({
        type: ORIENTATION_CHANGED,
        orientation: orientation
      });
    };

    Orientation.getOrientation((error, orientation) => {
      handler(orientation);
    });

    var key = getKey(handler);
    listeners[key] = DeviceEventEmitter.addListener(orientationDidChangeEvent, (body) => {
      handler(body.orientation);
    });
  },

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
    var key = getKey(cb);
    listeners[key] = DeviceEventEmitter.addListener(orientationDidChangeEvent,
      (body) => {
        cb(body.orientation);
      });
  },
  removeOrientationListener(cb) {
    var key = getKey(cb);
    if (!listeners[key]) {
      return;
    }
    listeners[key].remove();
    listeners[key] = null;
  },
  addSpecificOrientationListener(cb) {
    var key = getKey(cb);
    listeners[key] = DeviceEventEmitter.addListener(specificOrientationDidChangeEvent,
      (body) => {
        cb(body.specificOrientation);
      });
  },
  removeSpecificOrientationListener(cb) {
    var key = getKey(cb);
    if (!listeners[key]) {
      return;
    }
    listeners[key].remove();
    listeners[key] = null;
  },
  getInitialOrientation() {
    return Orientation.initialOrientation;
  }
}
