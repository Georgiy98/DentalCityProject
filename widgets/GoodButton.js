import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
export default function GoodButton({ children, style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.button, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#628",
    padding: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    borderRadius: 4,
  },
});
