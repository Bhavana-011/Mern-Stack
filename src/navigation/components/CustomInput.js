import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ placeholder, onChangeText, secure }) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secure}
      onChangeText={onChangeText}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});

