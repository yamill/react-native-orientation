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
    };
    this._updateOrientation = this._updateOrientation.bind(this);
    Orientation.addOrientationListener(this._updateOrientation);
  }

  _updateOrientation(or) {
    this.setState({ or });
  }

  render() {
    const { init, or} = this.state;
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
        <TouchableOpacity
          onPress={Orientation.lockToLandscape}
          style={styles.button}
        >
          <Text style={styles.instructions}>
            Lock To Landscape
          </Text>
        </TouchableOpacity>
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
