import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../Home/home';
import LoginScreen from '../login/login';

export default function TabLayout() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Ingresar" component={LoginScreen} />
    </Tab.Navigator>
  );
  // const colorScheme = useColorScheme();

  // return (
  //   <Tabs
  //     screenOptions={{
  //       tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
  //       headerShown: false,
  //       tabBarButton: HapticTab,
  //     }}>
  //     <Tabs.Screen
  //       name="index"
  //       options={{
  //         title: 'Home',
  //         tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
  //       }}
  //     />
  //     <Tabs.Screen
  //       name="login"
  //       options={{
  //         title: 'Ingresar',
  //         tabBarIcon: ({ color }) => <Entypo name="login" size={28} color={color} />,
  //       }}
  //     />
  //   </Tabs>
  // );
}
