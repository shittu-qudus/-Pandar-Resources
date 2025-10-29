import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import  LocationScreen from '../screens/nearby';
import TabNavigator from './buttomtab'; 
import WelcomeScreen from '../screens/welcome';
import  StoreDetails from '../screens/details';
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Nearby" 
          component={LocationScreen} 
          options={{ title: 'Nearby Stores' }}
        />
        <Stack.Screen 
          name="StoreDetails" 
          component={StoreDetails} 
          options={{ title: 'Store Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;