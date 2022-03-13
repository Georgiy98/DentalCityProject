import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const PhoneNumberInput = ({ onChange, additionalStyle }) => {
  const phoneInput = useRef(PhoneInput);
  const [underscoreStyle, setUnderscoreStyle] = useState(styles.isValid);
  const [valid, setValid] = useState(true);

  const updateUnderscoreStyleOnBlur = () => {
    if (valid) setUnderscoreStyle(styles.isValid);
    else setUnderscoreStyle(styles.isInvalid);
  };

  const updateUnderscoreStyleOnInput = (value) => {
    if (value.match("^[0-9]+$")) {
      setUnderscoreStyle(styles.isValid);
      setValid(phoneInput.current?.isValidNumber(value));
    } else {
      setUnderscoreStyle(styles.isInvalid);
      setValid(false);
    }
  };

  return (
    <PhoneInput
      containerStyle={[styles.containerStyle, underscoreStyle, additionalStyle]}
      textContainerStyle={styles.textContainerStyle}
      textInputProps={{
        onFocus: () => {
          setUnderscoreStyle(styles.isFocused);
        },
        onBlur: updateUnderscoreStyleOnBlur,
      }}
      ref={phoneInput}
      defaultCode="UA"
      layout="first"
      placeholder="Номер телефону"
      onChangeText={(text) => {
        console.log("on text");
        updateUnderscoreStyleOnInput(text);
      }}
      onChangeFormattedText={(text) => {
        console.log("on Ftext");
        onChange(text, phoneInput.current?.isValidNumber(text));
      }}
      autoFocus
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: Colors.lighter,
  },
  wrapper: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  containerStyle: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  textContainerStyle: {
    backgroundColor: "#f1f1f1",
  },
  isValid: {
    borderBottomColor: "#888",
  },
  isInvalid: {
    borderBottomColor: "#f88",
  },
  isFocused: {
    borderBottomColor: "#000",
  },
});

export default PhoneNumberInput;
