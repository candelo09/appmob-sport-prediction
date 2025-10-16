import 'react-native-reanimated';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuthContext } from '@/src/context/AuthContext';
import Entypo from '@expo/vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNavigation from '../drawer/menuListLoggedInUser';
import LoginScreen from '../login/login';
import UserScreen from '../user/user';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

const Tab = createBottomTabNavigator();

export default function RootLayout() {

  const { isAuthenticated, user } = useAuthContext();


  return (
    <>
      {isAuthenticated ? (<Tab.Navigator>
        <Tab.Screen name="Principal" component={DrawerNavigation} options={{ headerShown: false, tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} /> }} />
        <Tab.Screen name="Usuario" component={UserScreen} options={{ tabBarIcon: ({ color }) => <Entypo size={28} name="user" color={color} />, headerTintColor: '#ffff', headerStyle: { backgroundColor: '#474a50ff' }, headerTitle: ({ children }) => <View>
          <Text style={{fontSize:20, color:'#ffff'}}>Perfil</Text>
          <Text style={styles.titleLogLogin}>{user?.firstname} {user?.surname}</Text>
          </View> , }} />
      </Tab.Navigator>)
        :
        (<Tab.Navigator>
          <Tab.Screen name="Principal" component={DrawerNavigation} options={{ headerShown: false, tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} /> }} />
          <Tab.Screen name="Ingresar" component={LoginScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => <Entypo size={28} name="login" color={color} /> }} />
        </Tab.Navigator>)}
    </>

  );

}

const styles = StyleSheet.create({
  headerLogin: {
    position: 'fixed',
    alignSelf: 'flex-start',
    marginStart: '5%',
    // marginTop: '3%'
    // width:'80%'
  },

  headerLogLogin: {
    padding: 12,
    backgroundColor: '#6299b9ff',
    alignSelf: 'flex-start',
    borderRadius: 60,
    // marginTop: 12,
    marginStart: 12

  },

  titleLogLogin: {
    color: 'white',
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center'
  }
})
