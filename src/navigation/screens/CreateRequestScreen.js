import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { createRequest } from '../services/api';

export default function CreateRequestScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    await createRequest({ title, description });
    alert('Request Created Successfully!');
  };

  return (
    <View style={styles.container}>
      <CustomInput placeholder="Title" onChangeText={setTitle} />
      <CustomInput placeholder="Description" onChangeText={setDescription} />
      <CustomButton title="Submit Request" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 }
});