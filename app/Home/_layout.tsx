// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AppScreen from '../(tabs)';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export type RootStackParamList = {
//   App: { userId: string };
// //   Account: { userId: string } | undefined; // puedes poner params si los necesitas
// };

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false }}/>
//       {/* <Stack.Screen name="Account" component={AccountScreen} /> */}
//     </Stack.Navigator>
//   );
// }

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './home';

export default function RegisterUserLayout() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home"  component={HomeScreen} options={{headerTitle:''}}/>
    </Stack.Navigator>
  );
}