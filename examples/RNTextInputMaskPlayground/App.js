import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  MaskedTextInput,
  CustomMask,
} from 'react-native-text-input-mask';

const App = () => {
  const myCustomMask = new CustomMask({
    name: 'myCustomMask',
    mask: '(000) - 000',
  });
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={styles.scroll} alwaysBounceVertical={true}>
          <Text style={styles.label}>Brazilian Phone</Text>
          <MaskedTextInput
            placeholder="Try something…"
            keyboardType="numeric"
            secureTextEntry={false}
            maskType="phone"
            style={styles.input}
          />
          <Text style={styles.label}>CNPJ</Text>
          <MaskedTextInput
            maskType="cnpj"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>CPF</Text>
          <MaskedTextInput
            maskType="cpf"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Custom</Text>
          <MaskedTextInput
            customMask={myCustomMask}
            keyboardType="numeric"
            style={styles.input}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
  input: {
    fontSize: 20,
    color: 'gray',
  },
  label: {
    width: '100%',
    fontSize: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
});

export default App;
