import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>RNTextInputMaskPlayground</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
