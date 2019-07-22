# react-native-text-input-mask
🎭 Always on masked text input React Native component.

# Installation
```bash
npm install react-native-text-input-mask --save
```

# Usage
```jsx
import { MaskedTextInput } from 'react-native-text-input-mask';

const myComponent = () => {
  return (
    <View>
      <MaskedTextInput
        placeholder="Try something…"
        keyboardType="numeric"
        secureTextEntry={false}
        maskType="phone"
        style={styles.input}
      />
    </View>
  );
}
```

# Props
| Name | Type | Description |
| ---- | ---- | ----------- |
| value | String | Initial value for the mask |
| maskType | String | Type of mask to apply. See [supported mask types](#supported-mask-types).
| customMask | Mask | Instance of custom configured mask. See the [Custom Mask](#custom-mask) section to create a new one.

<b>Note:</b><i> All the other properties from native ```TextInput``` are supported. Check the React Native TextInput component reference for futher information.</i>

# Supported Mask Types
Currently supported mask types are: ```phone, cpf, cnpj```

# Custom Mask
```jsx
import { MaskedTextInput, CustomMask } from 'react-native-text-input-mask';

const myComponent = () => {
  const myCustomMask = new CustomMask({
    name: 'myCustomMask',
    mask: '(000) 000-000'
  });
  return (
    <View>
      <MaskedTextInput customMask={myCustomMask} keyboardType="numeric" />
    </View>
  );
}
```

# Examples
See the ```examples/RNTextInputMaskPlayground``` app and play with it.

![react-native-text-input-mask-example](https://user-images.githubusercontent.com/33915907/61661114-bfdaa400-aca1-11e9-9c2a-432d6b7b37e4.gif)
