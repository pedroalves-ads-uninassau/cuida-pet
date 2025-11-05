import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐶 Cuida Pet</Text>
      <Text style={styles.subtitle}>Cuidando de quem te faz feliz 🧡</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFA333',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: '#3C3C3C',
  },
});
