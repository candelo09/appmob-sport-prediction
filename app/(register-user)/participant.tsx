import { useAllParticipants } from "@/hooks/use-participant";
import AccountScreen from "@/src/components/participant/registerPage";
import { Participant } from "@/src/interfaces/participants";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';

// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login
export default function ParticipantScreen() {
  const [showModalCreateParticipant, setShowModalCreateParticipant] =
    useState(false);
  const [dataParticipant, setDataParticipant] = useState<Participant>(
    {} as Participant,
  );
  const [flagModalAccountUpdate, setFlagModalAccountUpdate] = useState(false);
  const { findallParticipant } = useAllParticipants();

  useEffect(() => {
    findallParticipant.refetch();
  });

  // console.log(findallParticipant);

  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Aquí llamarías tu API para recargar partidos
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  }, []);

  const filterByParticipant = findallParticipant.data?.filter((m) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      m.fullname.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    );
  });

  const renderItem: ListRenderItem<Participant> = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => {
        setFlagModalAccountUpdate(true);
        setShowModalCreateParticipant(true);
        setDataParticipant(item);
      }}
    >
      <View style={styles.card}>
        <Text style={styles.name}>{item.fullname}</Text>
        <Text style={styles.sub}>{item.email}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Participantes</Text>

      {/* LISTA */}

      <FlatList
        data={filterByParticipant}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No hay participantes para mostrar
            </Text>
          </View>
        )}
      />

      {/* BOTÓN CREAR */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setShowModalCreateParticipant(true);
          setDataParticipant({} as Participant);
          setFlagModalAccountUpdate(false);
        }}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {showModalCreateParticipant && !flagModalAccountUpdate ? (
        <>
          <AccountScreen
            visible={showModalCreateParticipant}
            participant={dataParticipant}
            titleModalParticipant="Nuevo"
            nameBtnModalParticipant="Crear Participante"
            onClose={() => setShowModalCreateParticipant(false)}
          ></AccountScreen>
        </>
      ) : (
        <>
          <AccountScreen
            visible={showModalCreateParticipant}
            participant={dataParticipant}
            titleModalParticipant="Modificar"
            nameBtnModalParticipant="Actualizar Participante"
            onClose={() => setShowModalCreateParticipant(false)}
          ></AccountScreen>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
    padding: 15,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#0f1c3a",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  sub: {
    color: "#aaa",
    fontSize: 13,
  },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4e6cff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  fabText: {
    color: "#fff",
    fontSize: 28,
  },

  empty: { padding: 40, alignItems: "center" },
  emptyText: { color: "#9fb8d6" },
});
