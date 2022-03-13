import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import validatorStyles from "./styles";
import ValidationBase from "./ValidationBase";
import Icon from "react-native-vector-icons/AntDesign";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default class DateValidator extends ValidationBase {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      inputText: "Дата народження",
      inputFillingStyle: styles.grey,
      showDatePicker: false,
      ...this.state,
    };
  }

  updateValue = (event, selectedDate) => {
    this.setShowDatePicker(false);
    if (!selectedDate) return false;
    this.setState(
      {
        value: selectedDate,
        inputText: selectedDate.toLocaleDateString("uk-UA"),
      },
      () => {
        this.updateStyleOnInput();
        this.props.onChangeValue(selectedDate, this.IsValidValue());
      }
    );
  };

  IsValidValue = () => {
    return this.state.value;
  };

  isPotentialValue = () => {
    return true;
  };

  setShowDatePicker = (value) => {
    this.setState({ showDatePicker: value });
  };

  render() {
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 1);
    let minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 150);

    return (
      <View style={validatorStyles.container}>
        <TouchableWithoutFeedback onPress={() => this.setShowDatePicker(true)}>
          <View
            style={[
              styles.inputContainer,
              this.state.inputValidationStyle,
              this.state.inputFocusStyle,
            ]}
          >
            {this.state.showDatePicker && (
              <RNDateTimePicker
                value={new Date()}
                onChange={this.updateValue}
                maximumDate={maxDate}
                minimumDate={minDate}
                mode="date"
              />
            )}
            <Text style={[validatorStyles.input, this.state.inputFillingStyle]}>
              {this.state.inputText}
            </Text>
            <Icon name="calendar" size={25} style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>
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
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  grey: {
    color: "grey",
  },
  black: {
    color: "#000",
  },
});
