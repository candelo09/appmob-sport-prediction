import { AuthProvider } from '@/src/context/AuthContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootLayout from './(tabs)/_layout';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


// export const LoginContext = createContext<LoginContextType | undefined>(undefined);;

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  App: { userId: string };
  Tabs: undefined
  //   Account: { userId: string } | undefined; // puedes poner params si los necesitas
};

// Create a client
const queryClient = new QueryClient()

export default function AppNavigator() {


  // function MainTabs() {
  //   return (
  //     <Tab.Navigator>
  //       <Tab.Screen name="Principal" component={AppScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} /> }} />
  //       <Tab.Screen name="Usuario" component={AccountScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => <Entypo size={28} name="user" color={color} /> }} />
  //     </Tab.Navigator>
  //   );
  // }




  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={RootLayout} options={{ headerShown: false }} />
          {/* <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </AuthProvider>
    </QueryClientProvider>

  );
}
