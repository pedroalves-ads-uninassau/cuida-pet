import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginCadastroScreen() {
  return (
    <LinearGradient colors={['#FFB347', '#FF8008']} style={styles.container}>
      <View style={styles.topLinks}>
        <Text style={styles.link}>privacidade</Text>
        <Text style={styles.link}>ajuda</Text>
      </View>

      <Image 
        source={require('../../assets/images/logo-cuida-pet.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem vindo(a){'\n'}ao CUIDA PET</Text>

      <TouchableOpacity style={[styles.button, styles.orangeButton]}>
        <Text style={styles.orangeButtonText}>REGISTRE-SE GRATUITAMENTE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.grayButton]}>
        <Text style={styles.grayButtonText}>JÁ TEM UMA CONTA?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.grayButton]}>
        <Text style={styles.grayButtonText}>CADASTRO DE CLÍNICA</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Versão: 0.0.1 (Beta)</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 50,
  },
  topLinks: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  link: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 12,
    fontWeight: '500',
  },
  logo: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    width: '75%',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  orangeButton: {
    backgroundColor: '#FFA733',
  },
  grayButton: {
    backgroundColor: '#f3f3f3',
  },
  orangeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  grayButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  version: {
    color: '#fff',
    fontSize: 12,
  },
});
