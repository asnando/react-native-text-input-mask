import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import {
  StyledMaskedTextInput,
} from './MaskedTextInput.styles';

const initialState = {
  value: '',
};

class MaskedTextInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      value: props.value || initialState.value,
    };
  }

  handleChangeText(text) {
    console.log('handleChangeText');
    // Update the text value in the state.
    this.setState({ value: text });
  }

  handleSelectionChange() {
    console.log('handleSelectionChange');
  }

  handleFocus() {
    console.log('handleFocus');
  }

  handleBlur() {
    console.log('handleBlur');
  }

  handleSubmitEditing() {
    console.log('handleSubmitEditing');
  }

  render() {
    const { value } = this.state;
    const {
      placeholder,
      keyboardType,
      secureTextEntry,
      maxLength,
    } = this.props;
    return (
      <StyledMaskedTextInput
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        onChangeText={(...args) => this.handleChangeText(...args)}
        onSelectionChange={(...args) => this.handleSelectionChange(...args)}
        onFocus={(...args) => this.handleFocus(...args)}
        onBlur={(...args) => this.handleBlur(...args)}
        onSubmitEditing={(...args) => this.handleSubmitEditing(...args)}
        clearButtonMode="always"
      />
    );
  }
}

MaskedTextInput.defaultProps = {
  value: null,
  placeholder: null,
  keyboardType: 'default',
  secureTextEntry: false,
  maxLength: null,
  maskType: null,
};

MaskedTextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number,
  maskType: PropTypes.string,
};

export default MaskedTextInput;
