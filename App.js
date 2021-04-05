import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Routes from './src/routes/Routes';

class App extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={styles.statusbarcolor} />
        <SafeAreaView style={styles.container}>
          <Routes />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  statusbarcolor: {
    backgroundColor: '#60DAC4',
  },
  container: {
    flex: 1,
  },
});

export default App;
