import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investor Login</Text>

      <CustomInput placeholder="Username" onChangeText={setUsername} />
      <CustomInput placeholder="Password" secure onChangeText={setPassword} />

      <CustomButton title="Login" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 }
});
