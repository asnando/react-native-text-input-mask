import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyledMaskedTextInput,
} from './MaskedTextInput.styles';
import Mask from '../mask';
import masks from '../masks';

const resolveMaskFromList = maskType => masks[maskType];

const initialState = {
  value: '',
  cursorSelection: {
    start: -1,
    end: -1,
  },
};

class MaskedTextInput extends PureComponent {
  constructor(props) {
    super(props);
    const {
      value,
      maskType,
      customMask,
    } = props;

    let useMask;
    if (customMask) {
      useMask = customMask;
    } else {
      useMask = resolveMaskFromList(maskType);
      if (!useMask) {
        throw new Error(`Could not detect mask configuration for "${maskType}" mask type.`);
      }
    }
    this.state = {
      ...initialState,
      value: value || initialState.value,
      mask: useMask,
    };
  }

  componentDidMount() {
    const { value } = this.state;
    // Updates/Set the state value with masked value.
    return this.handleChangeText(value, false);
  }

  // eslint-disable-next-line class-methods-use-this
  onFieldLeave(callback) {
    // Remove unused mask underscores
    // Updates the "isFocused" state
    if (typeof callback === 'function') {
      callback();
    }
  }

  getValue() {
    const { value, mask } = this.state;
    return mask.getValue(value);
  }

  validate() {
    const { value, mask } = this.state;
    return mask.validate(value);
  }

  clear() {
    return this.handleChangeText(initialState.value, false);
  }

  handleChangeText(text, notify = true) {
    const { mask, value: prevValue, cursorSelection } = this.state;
    const { onChangeText } = this.props;
    this.setState({
      value: mask.maskValue(text, prevValue, cursorSelection),
    }, () => {
      this.updateCursor();
      if (typeof onChangeText === 'function' && notify) {
        const { value } = this.state;
        if (value !== prevValue) {
          onChangeText(this.getValue(value));
        }
      }
    });
  }

  handleSelectionChange({ nativeEvent: { selection } }) {
    this.setState({
      cursorSelection: selection,
    });
  }

  handleFocus() {
    const { onFocus } = this.props;
    // Add unused mask underscores
    // Updates the "isFocused" state
    this.updateCursor();
    if (typeof onFocus === 'function') {
      onFocus();
    }
  }

  handleBlur() {
    const { onBlur } = this.props;
    return this.onFieldLeave(() => {
      if (typeof onBlur === 'function') {
        onBlur();
      }
    });
  }

  handleSubmitEditing() {
    const { onSubmitEditing } = this.props;
    return this.onFieldLeave(() => {
      if (typeof onSubmitEditing === 'function') {
        onSubmitEditing();
      }
    });
  }

  // Updates the input text cursor to the first empty _ (underscore) position.
  updateCursor() {
    const { textInputRef } = this;
    const { value } = this.state;

    let selectionStart = value.length;

    if (/_/.test(value)) {
      selectionStart = value.indexOf('_');
    }

    const selectionEnd = selectionStart;

    const updatedCursorSelection = {
      start: selectionStart,
      end: selectionEnd,
    };

    return this.setState({
      cursorSelection: updatedCursorSelection,
    }, () => {
      // ! Could make it change cursor selection only using setTimeout 😐.
      setTimeout(() => {
        textInputRef.setNativeProps({
          selection: updatedCursorSelection,
        });
      });
    });
  }

  saveTextInputRef(ref) {
    this.textInputRef = ref;
  }

  focus() {
    const { textInputRef } = this;
    return textInputRef.focus();
  }

  blur() {
    const { textInputRef } = this;
    return textInputRef.blur();
  }

  render() {
    const {
      value,
    } = this.state;
    const {
      placeholder,
      keyboardType,
      secureTextEntry,
      maxLength,
    } = this.props;
    return (
      <StyledMaskedTextInput
        {...this.props}
        ref={(...args) => this.saveTextInputRef(...args)}
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
        clearButtonMode="while-editing"
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
  customMask: null,
  // Native TextInput events
  onChangeText: null,
  onFocus: null,
  onBlur: null,
  onSubmitEditing: null,
};

MaskedTextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number,
  maskType: PropTypes.string,
  customMask: PropTypes.instanceOf(Mask),
  // Native TextInput events
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmitEditing: PropTypes.func,
};

export default MaskedTextInput;
