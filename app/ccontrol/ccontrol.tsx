import { useAuthContext } from "@/src/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';

// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login
export default function CControlScreen() {
  const { logout, user } = useAuthContext();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>Panel de Administración</Text>

      {/* CARDS */}
      <View style={styles.grid}>
        {/* PARTIDOS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("Matches");
            /* navigate */
          }}
        >
          <Text style={styles.cardTitle}>⚽ Partidos</Text>
          <Text style={styles.cardDesc}>Gestionar partidos</Text>
        </TouchableOpacity>

        {/* PARTICIPANTES */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("Participant");
          }}
        >
          <Text style={styles.cardTitle}>👥 Participantes</Text>
          <Text style={styles.cardDesc}>Gestionar usuarios</Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
    padding: 20,
  },

  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  card: {
    width: "48%",
    backgroundColor: "#0f1c3a",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  cardDesc: {
    color: "#aaa",
    fontSize: 13,
  },

  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
