import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Animated, 
  TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#FFB347', '#FF8008']}
      style={styles.container}
    >
      <View style={styles.topLinks}>
        <Text style={styles.link}>privacidade</Text>
        <Text style={styles.link}>ajuda</Text>
      </View>

      <Animated.View 
        style={[
          styles.content, 
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <Image 
          source={require('../../assets/images/logo-cuida-pet.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Conectando pessoas e pets com amor e tecnologia!!
        </Text>
      </Animated.View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('LoginCadastro')}
      >
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
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
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    paddingHorizontal: 25,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: '#FF8008',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
