import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getRequests } from '../services/api';

export default function TrackRequestScreen() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getRequests();
    setRequests(data);
  };

  return (
    <View>
      <FlatList
        data={requests}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.title} - {item.status}</Text>
        )}
      />
    </View>
  );
}
