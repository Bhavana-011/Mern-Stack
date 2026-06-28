import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CustomButton title="Create Request" onPress={() => navigation.navigate('CreateRequest')} />
      <CustomButton title="Track Requests" onPress={() => navigation.navigate('TrackRequest')} />
      <CustomButton title="Notifications" onPress={() => navigation.navigate('Notifications')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 }
});