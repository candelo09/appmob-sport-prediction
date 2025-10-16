import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from './registerPage';

export default function RegisterUserLayout() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="registerPage"  component={AccountScreen} options={{headerTitle:''}}/>
    </Stack.Navigator>
  );
}
