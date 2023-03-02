import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { RenderSingIn } from '../screens/connexions';
import {Connexion, Home, SinglePost} from '../screens/jndex';
import Test from '../screens/Test/Test';

export const StackNavigatioon = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Connect"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Connect" component={Connexion} />
        <Stack.Screen name="SinglePost" component={SinglePost} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="SingIn" component={RenderSingIn} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
