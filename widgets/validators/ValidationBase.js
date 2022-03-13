import React from 'react';
import validatorStyles from './styles';

export default class ValidationBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_valid: true,
      inputValidationStyle: validatorStyles.valid,
      inputFocusStyle: validatorStyles.blured,
      errorStyle: validatorStyles.invisible,
      value: '',
      error: null,
    };
    this.inputWidget = React.createRef();
    this.errorWidget = React.createRef();
    this.updateStyleOnBlur = this.updateStyleOnBlur.bind(this);
  }

  updateValue = newValue => {
    this.setState({value: newValue}, () => {
      this.updateStyleOnInput();
      this.props.onChangeValue(newValue, this.IsValidValue());
    });
  };

  updateStyleOnInput = () => {
    this.setState({
      inputFocusStyle: validatorStyles.focused,
    });
    if (!this.isPotentialValue()) {
      this.setState({
        inputValidationStyle: validatorStyles.invalid,
        errorStyle: validatorStyles.visible,
        is_valid: false,
        error: 'Недопустиме значення',
      });
    } else {
      this.setState({
        inputValidationStyle: validatorStyles.valid,
        is_valid: true,
        errorStyle: validatorStyles.invisible,
        error: '',
      });
    }
  };

  updateStyleOnBlur = () => {
    this.setState({
      inputFocusStyle: validatorStyles.blured,
    });
    if (!this.state.value) {
      this.setState({
        inputValidationStyle: validatorStyles.invalid,
        errorStyle: validatorStyles.visible,
        is_valid: false,
        error: 'Поле не може бути порожнім',
      });
    } else if (!this.IsValidValue(this.state.value)) {
      this.setState({
        inputValidationStyle: validatorStyles.invalid,
        errorStyle: validatorStyles.visible,
        is_valid: false,
        error: 'Недопустиме значення',
      });
    } else {
      this.setState({
        inputValidationStyle: validatorStyles.valid,
        is_valid: true,
        errorStyle: validatorStyles.invisible,
        error: '',
      });
    }
  };
  makeBlur = () => {
    this.inputWidget.current.blur();
  };
  onFocus = () => {
    this.inputWidget.current.focus();
  };

  IsValidValue = () => {
    // validation at finish
  };

  isPotentialValue = () => {
    // validation in progress
  };

  render() {
    // return markup
  }
}
