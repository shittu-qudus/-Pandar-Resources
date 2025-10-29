import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = React.memo(() => {
  const navigation = useNavigation();

  
  React.useEffect(() => {
    const preloadHome = async () => {
      try {
        
        const HomeModule = await import('./HomeScreen'); 
      } catch (error) {
        console.log('Preloading failed:', error);
      }
    };
    
    preloadHome();
  }, []);

 
  const handleNavigate = React.useCallback(() => {
    requestAnimationFrame(() => {
      navigation.navigate("Home");
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Image
          source={require('../assets/home.jpg')}
          style={styles.image}
          resizeMode="contain"
          fadeDuration={0}
        />
        <Text style={styles.fashion}>
          Fashion without breaking{'\n'}the bank, all in one.
        </Text>
        <Text style={styles.unleash}>
          Unleash your style without breaking the bank at RetroRiches! Our app is your one-stop emporium for fashion-forward finds at unbeatable prices
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleNavigate}
          activeOpacity={0.8}
        >
          <Text style={styles.buttontext}>Explore Stores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

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
    gap: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  image: {
    height: 400,
    width: 400,
    maxWidth: '100%',
  },
  fashion: {
    fontSize: 30,
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
    fontWeight: '700',
    includeFontPadding: false,
    lineHeight: 36,
  },
  unleash: {
    color: "grey",
    padding: 10,
    textAlign: 'center',
    width: '100%',
    maxWidth: 400,
    fontSize: 16,
    lineHeight: 22,
    includeFontPadding: false,
  },
  button: {
    backgroundColor: "#2456DA",
    width: '100%',
    maxWidth: 400,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 90,
    shadowColor: "#2456DA",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttontext: {
    color: "white",
    fontSize: 16,
    fontWeight: '600',
    includeFontPadding: false,
  }
});

export default WelcomeScreen;