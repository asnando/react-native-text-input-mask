import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  MaskedTextInput,
  CustomMask,
} from 'rn-masked-text-input';

const App = () => {
  const refs = [];

  const saveInputRef = ref => {
    refs.push(ref);
  };

  const getInputsValues = () => {
    const fieldWithCustomMask = refs[refs.length - 1];
    console.log('Field with custom mask is valid:', fieldWithCustomMask.validate());
    refs.forEach(ref => console.log(ref.getValue()));
  };

  const myCustomMask = new CustomMask({
    name: 'myCustomMask',
    mask: '(0?00) - 000',
    validator: value => value === '111111',
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
            ref={saveInputRef}
          />
          <Text style={styles.label}>CNPJ</Text>
          <MaskedTextInput
            maskType="cnpj"
            keyboardType="numeric"
            style={styles.input}
            ref={saveInputRef}
          />
          <Text style={styles.label}>CPF</Text>
          <MaskedTextInput
            maskType="cpf"
            keyboardType="numeric"
            style={styles.input}
            ref={saveInputRef}
          />
          <Text style={styles.label}>Date</Text>
          <MaskedTextInput
            maskType="date"
            keyboardType="numeric"
            style={styles.input}
            ref={saveInputRef}
          />
          <Text style={styles.label}>Money</Text>
          <MaskedTextInput
            maskType="money"
            keyboardType="numeric"
            style={styles.input}
            ref={saveInputRef}
          />
          <Text style={styles.label}>Custom</Text>
          <MaskedTextInput
            customMask={myCustomMask}
            keyboardType="numeric"
            style={styles.input}
            ref={saveInputRef}
          />
          <Button title="Show Values" onPress={getInputsValues} />
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
    fontSize: 16,
    color: 'gray',
  },
  label: {
    width: '100%',
    fontSize: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
});

export default App;
