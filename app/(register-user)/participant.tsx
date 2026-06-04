import useCreateParticipant, {
  useAllParticipants,
} from "@/hooks/use-participant";
import AlertModal from "@/src/components/alert-modal/alertModal";
import AccountScreen from "@/src/components/participant/registerPage";
import { Participant } from "@/src/interfaces/participants";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Modal,
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
  const { toDeleteParticipant } = useCreateParticipant();
  const [showModalDeleteParticipant, setShowModalDeleteParticipant] =
    useState(false);
  const [participantToDelete, setParticipantToDelete] =
    useState<Participant>({} as Participant);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

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

  const deleteParticipant = async (participant: Participant) => {
    if (!participant.id) {
      setShowModalDeleteParticipant(false);
      setModalTitle("Error");
      setModalMessage("No se pudo identificar el participante.");
      setShowModalAlert(true);
      return;
    }

    try {
      await toDeleteParticipant(participant.id);
      setShowModalDeleteParticipant(false);
      await findallParticipant.refetch();
      setModalTitle("Excelente!");
      setModalMessage("Participante eliminado exitosamente.");
      setShowModalAlert(true);
    } catch (error) {
      console.error(error);
      setShowModalDeleteParticipant(false);
      setModalTitle("Error");
      setModalMessage("No se pudo eliminar el participante.");
      setShowModalAlert(true);
    }
  };

  const confirmDeleteParticipant = (participant: Participant) => {
    setParticipantToDelete(participant);
    setShowModalDeleteParticipant(true);
  };

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
        <View style={styles.cardHeader}>
          <View style={styles.cardInfo}>
            <Text style={styles.name}>{item.fullname}</Text>
            <Text style={styles.sub}>{item.email}</Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={(event) => {
              event.stopPropagation();
              confirmDeleteParticipant(item);
            }}
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
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

      <Modal
        animationType="fade"
        transparent
        visible={showModalDeleteParticipant}
        onRequestClose={() => setShowModalDeleteParticipant(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirmar</Text>
            <Text style={styles.modalMessage}>
              {"\u00bfEst\u00e1 seguro de eliminar este participante?"}
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowModalDeleteParticipant(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => deleteParticipant(participantToDelete)}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AlertModal
        visible={showModalAlert}
        title={modalTitle}
        messages={modalMessage}
        onClose={() => setShowModalAlert(false)}
      />
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

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  cardInfo: {
    flex: 1,
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

  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "80%",
    backgroundColor: "#37425c",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalMessage: {
    color: "#e6f2ff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  cancelButton: {
    backgroundColor: "#4e6cff",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  confirmButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
