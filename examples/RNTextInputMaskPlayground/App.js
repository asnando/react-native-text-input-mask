import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {
  MaskedTextInput,
} from 'react-native-text-input-mask';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} alwaysBounceVertical={true}>
        <MaskedTextInput
          placeholder="Try something…"
          keyboardType="numeric"
          secureTextEntry={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default App;
