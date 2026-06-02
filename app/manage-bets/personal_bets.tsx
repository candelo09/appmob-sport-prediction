import { usePrediction } from "@/hooks/use-prediction";
import { Match } from "@/src/interfaces/matchs";
import { Prediction } from "@/src/interfaces/prediction";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
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

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';

// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login

export default function PersonalBetsScreen() {
  const route = useRoute();
  const { userId } = route.params as { userId: number };

  // console.log(userId);

  const { predictionByIdQuery } = usePrediction(userId);

  // console.log(
  //   `predictionByIdQuery`,
  //   predictionByIdQuery.data?.predictionsByParticipant,
  // );

  useEffect(() => {
    predictionByIdQuery.refetch();
  });

  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Aquí llamarías tu API para recargar partidos
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  }, []);

  const filtered = predictionByIdQuery.data?.predictionsByParticipant.filter(
    (m) => {
      const q = query.toLowerCase().trim();
      if (!q) return true;
      return (
        m.matchId.homeTeam.name.toLowerCase().includes(q) ||
        m.matchId.awayTeam.name.toLowerCase().includes(q) ||
        m.matchId.stadium.toLowerCase().includes(q) ||
        `grupo ${m.matchId.group.letter.toLowerCase()}`.includes(q)
      );
    },
  );

  const groupedPredictions =
    filtered?.reduce(
      (acc, item) => {
        const groupLetter = item.matchId.group?.letter || "Sin Grupo";

        if (!acc[groupLetter]) {
          acc[groupLetter] = [];
        }

        acc[groupLetter].push(item);

        return acc;
      },
      {} as Record<string, Prediction[]>,
    ) || {};

  const groupedData = Object.entries(groupedPredictions);

  // const filteredbyToday =
  //   predictionByIdQuery.data?.predictionsByParticipant.filter((m) => {
  //     const q = query.toLowerCase().trim();
  //     if (!q) return true;
  //     return (
  //       m.matchId.homeTeam.name.toLowerCase().includes(q) ||
  //       m.matchId.awayTeam.name.toLowerCase().includes(q) ||
  //       m.matchId.stadium.toLowerCase().includes(q) ||
  //       m.predicted_away_score ||
  //       m.predicted_home_score ||
  //       m.matchId.group.letter ||
  //       m.matchId.stage
  //     );
  //   });

  // console.log(`filtered`, filtered);

  function formatDate(iso: string | number | Date) {
    const d = new Date(iso);
    return d.toLocaleString();
  }

  const Item: any = Picker.Item;
  const [value, setValue] = React.useState("0");
  const SelectMatchForDay = () => {
    return (
      <Picker
        testID="basic-picker"
        selectedValue={value}
        onValueChange={(v) => setValue(v)}
        accessibilityLabel="Basic Picker Accessibility Label"
        style={{
          backgroundColor: "#b5c8e4ff",
          alignContent: "flex-end",
          margin: 20,
          fontWeight: "900",
          color: "#000",
        }}
      >
        <Item
          style={{
            borderRadius: 10,
            color: "#000",
            fontSize: 15,
            fontWeight: "900",
          }}
          label="Hoy"
          value="0"
        />
        {/* <Item label="Mañana" value="1" /> */}
        <Item label="Todos" value="1" />
      </Picker>
    );
  };

  const [showModalBet, setShowModalBet] = useState(false);

  const [matchId, setMatchId] = useState({} as Match);

  function renderPrediction({ item }: { item: Prediction }) {
    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          setShowModalBet(true);
          setMatchId(item.matchId);
        }}
      >
        <View style={styles.teamsRow}>
          <View style={styles.team}>
            <Image
              source={{ uri: item.matchId.homeTeam!.flag }}
              resizeMode="cover"
              style={styles.flag}
            />
            <Text style={styles.teamName}>{item.matchId.homeTeam!.name}</Text>
            <Text style={{ color: "#ffff", fontWeight: "bold" }}>
              {item.predicted_home_score}
            </Text>
          </View>

          <Text style={styles.vs}>vs</Text>

          <Text style={{ color: "#ffff", fontWeight: "bold" }}>
            {item.predicted_away_score}
          </Text>

          <View style={styles.teamRight}>
            <Text style={styles.teamName}>{item.matchId.awayTeam.name}</Text>
            <Image
              source={{ uri: item.matchId.awayTeam.flag }}
              resizeMode="cover"
              style={styles.flag}
            />
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.date}>{formatDate(item.matchId.match_date)}</Text>
        </View>
      </Pressable>
    );
  }

  function renderGroup({ item }: { item: [string, Prediction[]] }) {
    const [groupLetter, predictions] = item;

    return (
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>GRUPO {groupLetter}</Text>

        <FlatList
          data={predictions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPrediction}
          scrollEnabled={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {/* <SelectMatchForDay></SelectMatchForDay> */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar equipo o estadio"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {/* {value === "0" ? ( */}
        <>
          {/* <FlatList
              data={filteredbyToday}
              // keyExtractor={({ item }: any) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={() => (
                <View style={styles.empty}>
                  <Text style={styles.emptyText}>
                    No hay partidos para mostrar
                  </Text>
                </View>
              )}
            /> */}
        </>
        {/* ) : (
          
        )} */}
        <>
          <FlatList
            data={groupedData}
            keyExtractor={(item) => item[0]}
            renderItem={renderGroup}
            contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  No hay partidos para mostrar
                </Text>
              </View>
            )}
          />
        </>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
    overflowX: "scroll",
    overscrollBehaviorY: "none",
  },
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
  flag: { width: 20, height: 20, borderRadius: 4 },
  teamName: { color: "#e6f2ff", fontWeight: "700", marginHorizontal: 8 },
  vs: { color: "#9fb8d6", fontWeight: "700" },

  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: { color: "#9fb8d6" },
  stadium: { color: "#9fb8d6" },
  stage: { color: "#d69f9f", fontWeight: 700 },

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

  accordion: {
    backgroundColor: "#eee",
    color: "#444",
    cursor: "pointer",
    padding: 18,
    width: "100%",
    textAlign: "left",
    boxShadow: "none",
    fontSize: 15,
    transitionDelay: "0.4s",
  },

  groupContainer: {
    marginBottom: 20,
  },

  groupTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    paddingHorizontal: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#4e6cff",
    paddingLeft: 10,
  },
});
