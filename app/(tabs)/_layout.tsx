import "react-native-reanimated";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuthContext } from "@/src/context/AuthContext";
import Entypo from "@expo/vector-icons/Entypo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import DrawerNavigation from "../drawer/menuListLoggedInUser";
import LoginScreen from "../login/login";
import UserScreen from "../user/user";

import { TableRankingBets } from "@/src/components/rankingBets/tableRankingBets";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import HomeScreen from "../Home/home";
// export const unstable_settings = {
//   anchor: '(tabs)',
// };

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <>
      {isAuthenticated ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Inicio"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Ranking"
            component={TableRankingBets}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesome6 name="ranking-star" size={24} color="black" />
              ),
              headerStyle: { backgroundColor: "#474a50ff" },
              headerTintColor: "#fff",
            }}
          />
          <Tab.Screen
            name="Usuario"
            component={UserScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Entypo size={28} name="user" color="black" />
              ),
              headerTintColor: "#ffff",
              headerStyle: { backgroundColor: "#474a50ff" },
              headerTitle: ({ children }) => (
                <View>
                  <Text style={{ fontSize: 20, color: "#ffff" }}>Perfil</Text>
                  <Text style={styles.titleLogLogin}>{user?.fullname}</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="Inicio"
            component={DrawerNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Ranking"
            component={TableRankingBets}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesome6 name="ranking-star" size={24} color="black" />
              ),
              headerStyle: { backgroundColor: "#474a50ff" },
              headerTintColor: "#fff",
            }}
          />
          <Tab.Screen
            name="Ingresar"
            component={LoginScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Entypo size={28} name="login" color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerLogin: {
    position: "fixed",
    alignSelf: "flex-start",
    marginStart: "5%",
    // marginTop: '3%'
    // width:'80%'
  },

  headerLogLogin: {
    padding: 12,
    backgroundColor: "#6299b9ff",
    alignSelf: "flex-start",
    borderRadius: 60,
    // marginTop: 12,
    marginStart: 12,
  },

  titleLogLogin: {
    color: "white",
    fontSize: 15,
    fontWeight: 500,
    textAlign: "center",
  },
});
