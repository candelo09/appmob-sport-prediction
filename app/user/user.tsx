import { useAuthContext } from "@/src/context/AuthContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';

// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login
export default function UserScreen() {
  const { logout, user } = useAuthContext();

  // console.log(`user`, user?.email);

  return (
    <SafeAreaProvider style={{ backgroundColor: "#071226" }}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* AVATAR */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.firstname?.charAt(0) || "U"}
            </Text>
          </View>

          <Text style={styles.title}>Mi Cuenta</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>
              {user?.firstname} {user?.surname}
            </Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>

            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.value}>{user?.phone}</Text>
          </View>
        </View>

        {/* BOTÓN */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
    padding: 20,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#0f1c3a",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4e6cff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  infoContainer: {
    width: "100%",
  },

  label: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 10,
  },

  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
