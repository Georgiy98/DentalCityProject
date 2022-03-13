import { StyleSheet } from "react-native";

const validatorStyles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  input: {
    fontSize: 16,
    padding: 5,
  },
  errorContainer: {
    flexDirection: "row",
  },
  errorText: {
    color: "#f88",
  },
  errorIcon: {
    paddingTop: 4,
    paddingRight: 5,
  },
  valid: {
    borderBottomColor: "#888",
  },
  invalid: {
    borderBottomColor: "#f88",
  },
  invisible: {
    display: "none",
  },
  visible: {
    display: "flex",
  },
  blured: {
    borderBottomWidth: 1,
  },
  focused: {
    borderBottomWidth: 2,
  },
});

export default validatorStyles;
