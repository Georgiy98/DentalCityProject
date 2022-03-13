import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import validatorStyles from "./styles";
import ValidationBase from "./ValidationBase";
import PhoneNumberInput from "../PhoneNumberInput";
import PhoneInput from "react-native-phone-number-input";
import Icon from "react-native-vector-icons/AntDesign";

export default class PhoneNumberValidator extends ValidationBase {
  constructor(props) {
    super(props);
    this.phoneInput = React.createRef();
  }

  IsValidValue = () => {
    return this.phoneInput.current?.isValidNumber(this.state.value);
  };

  isPotentialValue = () => {
    if (!this.state.value) return true;
    return this.state.value?.match("^[+][0-9 ]*$");
  };

  render() {
    return (
      <View style={validatorStyles.container}>
        <PhoneInput
          containerStyle={[
            styles.container,
            this.state.inputValidationStyle,
            this.state.inputFocusStyle,
          ]}
          textContainerStyle={styles.textContainer}
          textInputProps={{
            onFocus: this.updateStyleOnInput,
            onBlur: this.updateStyleOnBlur,
          }}
          ref={this.phoneInput}
          defaultCode="UA"
          layout="first"
          placeholder="Номер телефону"
          onChangeFormattedText={this.updateValue}
        />
        <View style={[validatorStyles.errorContainer, this.state.errorStyle]}>
          <Icon
            name="exclamationcircleo"
            size={11}
            color="#f88"
            style={validatorStyles.errorIcon}
          />
          <Text style={validatorStyles.errorText}>{this.state.error}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f1f1f1",
  },
  textContainer: {
    backgroundColor: "#f1f1f1",
  },
});
