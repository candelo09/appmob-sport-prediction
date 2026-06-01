import BetsScreen from "@/app/manage-bets/bets";
import { useAuthContext } from "@/src/context/AuthContext";

import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import ParticipantScreen from "../(register-user)/participant";
import TabLayout from "../(tabs)/tabs";
import CControlScreen from "../ccontrol/ccontrol";
import FinalsScreen from "../finals/finals";
import LoginScreen from "../login/login";
import PersonalBetsScreen from "../manage-bets/personal_bets";
import StandingsTableScreen from "../manage-standings/StandingsTable";
import MatchScreen from "../matches/matches";
import ResultScreen from "../results/results";
import UserScreen from "../user/user";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { isAuthenticated, user } = useAuthContext();
  // console.log("user ", user);

  return (
    <>
      {isAuthenticated ? (
        <Drawer.Navigator
          screenOptions={{
            drawerPosition: "right",
            headerStyle: { backgroundColor: "#474a50ff" },
            headerTitle: "Polla Mundialista 2026",
            headerTintColor: "white",
          }}
        >
          <Drawer.Screen name="Principal" component={TabLayout} />
          {/* <Drawer.Screen name="Perfil" component={UserScreen} /> */}
          <Drawer.Screen
            name="Gestionar apuestas"
            component={BetsScreen}
            initialParams={{ userId: user?.id || 0 }}
            options={{ headerTitle: "Realiza tus apuestas" }}
          />
          <Drawer.Screen
            name="Mis Predicciones"
            component={PersonalBetsScreen}
            initialParams={{ userId: user?.id || 0 }}
            options={{ headerTitle: "Mis predicciones" }}
          />
          <Drawer.Screen
            name="Tabla de Posiciones"
            component={StandingsTableScreen}
            options={{ headerTitle: "Tabla de Posiciones" }}
          />
          <Drawer.Screen
            name="Resultados"
            component={ResultScreen}
            options={{ headerTitle: "Resultados" }}
          />
          <Drawer.Screen
            name="Eliminatorias"
            component={FinalsScreen}
            options={{ headerTitle: "Eliminatorias" }}
          />
          <Drawer.Screen
            name="User"
            component={UserScreen}
            options={{ drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{ drawerItemStyle: { display: "none" } }}
          />
          {user?.perfil === "ADM" && (
            <>
              <Drawer.Screen
                name="Participant"
                component={ParticipantScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="Matches"
                component={MatchScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="Centro Control"
                component={CControlScreen}
                options={{ headerTitle: "Centro Control" }}
              />
            </>
          )}
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator
          screenOptions={{
            drawerPosition: "right",
            headerStyle: { backgroundColor: "#474a50ff" },
            headerTitle: "Polla Mundialista 2026",
            headerTintColor: "white",
          }}
        >
          <Drawer.Screen name="Principal" component={TabLayout} />
          <Drawer.Screen
            name="Tabla de Posiciones"
            component={StandingsTableScreen}
            options={{ headerTitle: "Tabla de Posiciones" }}
          />
          <Drawer.Screen
            name="Resultados"
            component={ResultScreen}
            options={{ headerTitle: "Resultados" }}
          />
          <Drawer.Screen
            name="Eliminatorias"
            component={FinalsScreen}
            options={{ headerTitle: "Eliminatorias" }}
          />
        </Drawer.Navigator>
      )}
    </>
  );
}
