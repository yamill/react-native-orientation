import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Orientation from 'react-native-orientation';

class demo extends Component {
  constructor() {
    super();
    const init = Orientation.getInitialOrientation();
    this.state = {
      init,
      or: init,
      sor: init,
    };
    this._updateOrientation = this._updateOrientation.bind(this);
    Orientation.addOrientationListener(this._updateOrientation);
    this._updateSpecificOrientation = this._updateSpecificOrientation.bind(this);
    Orientation.addSpecificOrientationListener(this._updateSpecificOrientation);
  }

  _updateOrientation(or) {
    this.setState({ or });
  }

  _updateSpecificOrientation(sor) {
    this.setState({ sor });
  }

  render() {
    const { init, or, sor} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Orientation Demo!
        </Text>
        <Text style={styles.instructions}>
          {`Initial Orientation: ${init}`}
        </Text>
        <Text style={styles.instructions}>
          {`Current Orientation: ${or}`}
        </Text>
        <Text style={styles.instructions}>
          {`Specific Orientation: ${sor}`}
        </Text>
        <TouchableOpacity
          onPress={Orientation.unlockAllOrientations}
          style={styles.button}
        >
          <Text style={styles.instructions}>
            Unlock All Orientations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Orientation.lockToPortrait}
          style={styles.button}
        >
          <Text style={styles.instructions}>
            Lock To Portrait
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={Orientation.lockToLandscapeLeft}
            style={styles.button}
          >
            <Text style={styles.instructions}>
              Lock To Left
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Orientation.lockToLandscape}
            style={styles.button}
          >
            <Text style={styles.instructions}>
              Lock To Landscape
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Orientation.lockToLandscapeRight}
            style={styles.button}
          >
            <Text style={styles.instructions}>
              Lock To Right
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 3,
    backgroundColor: 'grey',
  }
});

AppRegistry.registerComponent('demo', () => demo);
