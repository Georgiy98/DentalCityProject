import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import validatorStyles from "./styles";
import ValidationBase from "./ValidationBase";
import Icon from "react-native-vector-icons/AntDesign";

export default class NameValidator extends ValidationBase {
  IsValidValue = () => {
    return this.state.value?.match("^[A-Za-zА-Яа-я' ]+$");
  };

  isPotentialValue = () => {
    return this.state.value?.match("^[A-Za-zА-Яа-я' ]*$");
  };

  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        <TextInput
          style={[
            validatorStyles.input,
            this.state.inputValidationStyle,
            this.state.inputFocusStyle,
          ]}
          placeholder="Ім'я"
          onChangeText={this.updateValue}
          onFocus={this.updateStyleOnInput}
          onBlur={this.updateStyleOnBlur}
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
