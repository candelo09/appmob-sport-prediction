import HomeScreen from "@/app/Home/home";
import BetsScreen from "@/app/manage-bets/bets";
import { useAuthContext } from "@/src/context/AuthContext";

import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import PersonalBetsScreen from "../manage-bets/personal_bets";
import StandingsTableScreen from "../manage-standings/StandingsTable";
import ResultScreen from "../results/results";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { isAuthenticated, user } = useAuthContext();

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
          <Drawer.Screen name="Inicio" component={HomeScreen} />
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
          <Drawer.Screen name="Inicio" component={HomeScreen} />
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
        </Drawer.Navigator>
      )}
    </>
  );
}
