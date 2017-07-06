import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Orientation from 'react-native-orientation';

export default class Demo extends Component {
  componentWillMount() {
    const init = Orientation.getInitialOrientation();
    this.setState({
      init,
      orientation: init,
      specificOrientation: init,
    });
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._updateOrientation);
    Orientation.addSpecificOrientationListener(this._updateSpecificOrientation);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._updateOrientation);
    Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation);
  }

  _getOrientation() {
    Orientation.getOrientation((err, orientation) => {
      Alert.alert(`Orientation is ${orientation}`);
    });
  }

  _getSpecificOrientation() {
    Orientation.getSpecificOrientation((err, orientation) => {
      Alert.alert(`Specific orientation is ${orientation}`);
    });
  }

  _updateOrientation = (orientation) => this.setState({ orientation });
  _updateSpecificOrientation = (specificOrientation) => this.setState({ specificOrientation });

  render() {
    const { init, orientation, specificOrientation } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Orientation Demo!
        </Text>
        <Text style={styles.instructions}>
          {`Initial Orientation: ${init}`}
        </Text>
        <Text style={styles.instructions}>
          {`Current Orientation: ${orientation}`}
        </Text>
        <Text style={styles.instructions}>
          {`Specific Orientation: ${specificOrientation}`}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this._getOrientation}
            style={styles.button}
          >
            <Text style={styles.instructions}>
              Get Orientation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._getSpecificOrientation}
            style={styles.button}
          >
            <Text style={styles.instructions}>
              Get Specific Orientation
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
