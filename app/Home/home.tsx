import { useMatchsByDate } from "@/hooks/use-matchs";
import { useScoringRules } from "@/hooks/use-scoring-rules";
import ScoringRulesModal from "@/src/components/scoring-rules/scoringRulesModal";
// import ScoringRulesModal from "@/src/components/scoring-rules/scoringRulesModal";
import { useAuthContext } from "@/src/context/AuthContext";
import { Match } from "@/src/interfaces/matchs";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';

// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login
export default function HomeScreen() {
  // datos mock — en producción obténlos de tu API

  // const [matches] = useState([
  //   {
  //     id: "1",
  //     date: "2026-06-14T18:00:00Z",
  //     stadium: "Lusail Stadium",
  //     teamA: { name: "Argentina", flag: "https://flagcdn.com/w320/ar.png" },
  //     teamB: { name: "France", flag: "https://flagcdn.com/w320/fr.png" },
  //   },
  //   {
  //     id: "2",
  //     date: "2026-06-15T15:00:00Z",
  //     stadium: "Al Bayt",
  //     teamA: { name: "Brazil", flag: "https://flagcdn.com/w320/br.png" },
  //     teamB: { name: "Spain", flag: "https://flagcdn.com/w320/es.png" },
  //   },
  //   {
  //     id: "3",
  //     date: "2026-06-16T20:00:00Z",
  //     stadium: "Khalifa International",
  //     teamA: { name: "Germany", flag: "https://flagcdn.com/w320/de.png" },
  //     teamB: { name: "Portugal", flag: "https://flagcdn.com/w320/pt.png" },
  //   },
  // ]);

  const { isAuthenticated, user } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);
  const [showModalScoringRules, setShowModalScoringRules] = useState(false);
  const [query, setQuery] = useState("");

  const { matchsByDateQuery } = useMatchsByDate(new Date(), new Date());

  const { allScoringRules } = useScoringRules() || null;

  useEffect(() => {
    matchsByDateQuery.refetch();
    allScoringRules.refetch();
  });
  // console.log("allScoringRules ", allScoringRules.data);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Aquí llamarías tu API para recargar partidos
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  }, []);

  const filtered = matchsByDateQuery.data?.filter((m) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      m.homeTeam.name.toLowerCase().includes(q) ||
      m.awayTeam.name.toLowerCase().includes(q) ||
      m.stadium.toLowerCase().includes(q)
    );
  });

  // function formatDate(iso: string | number | Date) {
  //   const d = new Date(iso);
  //   return d.toLocaleString();
  // }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Juego":
        return "#28a745"; // verde
      case "Finalizado":
        return "#dc3545"; // rojo
      case "Por Jugar":
        return "#ffc107"; // amarillo
      default:
        return "#ffffff";
    }
  };

  function renderItem({ item }: { item: Match }) {
    const color = getStatusColor(item.stage);
    return (
      <Pressable style={styles.card} onPress={() => {}}>
        <View style={styles.teamsRow}>
          <View style={styles.team}>
            <Image
              source={{ uri: item.homeTeam!.flag }}
              resizeMode="cover"
              style={styles.flag}
            />
            <Text style={styles.teamName}>{item.homeTeam!.name}</Text>
            <Text style={styles.teamName}>{item.home_score}</Text>
          </View>

          <Text style={styles.vs}>vs</Text>

          <View style={styles.teamRight}>
            <Text style={styles.teamName}>{item.away_score}</Text>
            <Text style={styles.teamName}>{item.awayTeam.name}</Text>
            <Image
              source={{ uri: item.awayTeam.flag }}
              resizeMode="cover"
              style={styles.flag}
            />
          </View>
        </View>

        <View style={styles.metaRow}>
          {/* <Text style={styles.date}>{formatDate(item.match_date)}</Text> */}
          <Text style={styles.stadium}>Grupo {item.group?.letter || ""}</Text>
          <Text style={styles.stadium}>Estadio {item.stadium}</Text>
          <Text style={{ color, fontWeight: "bold" }}>{item.stage}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {isAuthenticated ? (
          <>
            <View
              style={{
                marginBottom: 7,
                marginTop: 5,
                position: "relative",
                flexDirection: "row",
              }}
            >
              <View style={styles.headerLogLogin}>
                <Text style={styles.titleLogLogin}>
                  {user?.firstname[0]}
                  {user?.surname[0]}
                </Text>
              </View>
              <View style={styles.headerLogin}>
                <Text style={styles.nameTitle}>Bienvenid@</Text>
                <Text style={styles.nameTitle}>
                  {user?.firstname} {user?.surname}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar equipo o estadio"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.teamsRow}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 15,
              top: 10,
              left: 10,
            }}
          >
            PARTIDOS DEL DÍA
          </Text>
          <View style={styles.teamRight}>
            <Button
              style={{
                backgroundColor: "rgb(231, 170, 71)",

                height: 40,
                // width: 50,
                marginEnd: 15,
              }}
              onPress={() => {
                setShowModalScoringRules(true);
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 10,
                  // bottom: 10,
                  marginBottom: 20,
                }}
              >
                Reglas
              </Text>
            </Button>
          </View>
          {showModalScoringRules ? (
            <>
              <ScoringRulesModal
                visible={showModalScoringRules}
                onClose={() => setShowModalScoringRules(false)}
                scoringRules={allScoringRules.data || []}
              ></ScoringRulesModal>
            </>
          ) : (
            <></>
          )}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item: Match) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No hay partidos para mostrar</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071226" },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(99, 90, 90, 0.03)",
    backgroundColor: "#474a50ff",
  },
  title: { color: "#e6f2ff", fontSize: 20, fontWeight: "700" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  loginBtn: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: "#00a3ff",
  },
  newAccountBtn: {
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: "#58866aff",
  },
  loginText: { color: "#ffffffff", fontWeight: "700" },

  searchBox: { padding: 12, backgroundColor: "#071226" },
  searchInput: {
    backgroundColor: "#7b97b3ff",
    color: "#e6f2ff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  card: {
    backgroundColor: "#464f57ff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  team: { flexDirection: "row", alignItems: "center", gap: 8 },
  teamRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  flag: { width: 42, height: 28, borderRadius: 4 },
  teamName: { color: "#e6f2ff", fontWeight: "700", marginHorizontal: 8 },
  vs: { color: "#9fb8d6", fontWeight: "700" },

  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: { color: "#9fb8d6" },
  stadium: { color: "#ffffff" },

  empty: { padding: 40, alignItems: "center" },
  emptyText: { color: "#9fb8d6" },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  nameTitle: {
    color: "white",
    // marginRight: '15%',
    fontSize: 16,
    fontWeight: 500,
    // textAlign: 'center'
  },

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
    fontSize: 12,
    fontWeight: 500,
    textAlign: "center",
  },
});
