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
  const [ref, setRef] = useState(null);
  const [value, setValue] = useState(value);

  const saveInputRef = ref => setRef(ref);

  const getInputValue = () => {
    if (ref) {
      console.log(ref.getValue());
    }
  };

  const onChangeText = value => console.log(`onChangeText with value "${value}"`);

  const myCustomMask = new CustomMask({
    name: 'myCustomMask',
    mask: '(0?00) - 000',
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
          <Text style={styles.label}>Date</Text>
          <MaskedTextInput
            maskType="date"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Money</Text>
          <MaskedTextInput
            maskType="money"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Custom</Text>
          <MaskedTextInput
            customMask={myCustomMask}
            keyboardType="numeric"
            style={styles.input}
            ref={saveInputRef}
            onChangeText={onChangeText}
          />
          <Button title="GetValue" onPress={getInputValue} />
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
