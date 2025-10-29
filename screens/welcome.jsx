import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Image
          source={require('../assets/home.jpg')}
          style={styles.image}
          height={400}
          width={400}
        />
        <Text style={styles.fashion}>Fashion without breaking 
        the bank, all in one.</Text>
        <Text style={styles.unleash}>Unleash your style without breaking the bank at RetroRiches! Our app is your one-stop emporium for fashion-forward finds at unbeatable prices</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttontext}>Explore Stores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer: {
    justifyContent: "center",
    alignItems: 'center',
    gap: 30
  },
  fashion: {
    fontSize: 30,
    width: 400,
    textAlign: 'center'
  },
  unleash: {
    color: "grey",
    padding: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: "#2456DA",
    width: 400,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 90
  },
  buttontext: {
    color: "white",
    fontSize: 16
  }
});