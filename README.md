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

# Methods
## .getValue()
Returns raw(unmasked) value string.

# Creating a mask

```0``` Represents any digit.

```[A-Z]``` Represents any alphabetic letter.

```?``` Says that the previous character is optional. In that case the ```_(underscore)``` will only show up when the user input the minimun size of characters. For example: A mask as ```(000?) 0``` will be initialized as ```(__) _``` and when user input the minimun 3 digits it will display the optional(s) like ```(00_) 0```.

```Special characters different from underscores``` will be displayed as separators or as it is, like spaces.

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
