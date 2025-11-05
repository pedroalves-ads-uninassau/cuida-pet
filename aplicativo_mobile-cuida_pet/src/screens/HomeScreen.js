import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Links de topo */}
      <View style={styles.topLinks}>
        <Text style={styles.link}>privacidade</Text>
        <Text style={styles.link}>ajuda</Text>
      </View>

      {/* Logo central */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo-cuida-pet.png")} // coloque o caminho da sua logo aqui
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Texto principal */}
      <Text style={styles.title}>
        Conectando pessoas e pets com amor e tecnologia!!
      </Text>

      {/* Botão */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F57C00",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  topLinks: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    gap: 10,
  },
  link: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: "#F57C00",
    fontWeight: "bold",
    fontSize: 16,
  },
});
