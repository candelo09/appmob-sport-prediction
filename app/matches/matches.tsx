import useMatch, { useMatchs } from "@/hooks/use-matchs";
import useSaveTeamsFinales from "@/hooks/use-teams";
import MatchModalG from "@/src/components/match/MatchModalG";

import { Match } from "@/src/interfaces/matchs";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ListRenderItem,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

const FINAL_PHASES = [
  "ROUND_32",
  "ROUND_16",
  "QUARTER",
  "SEMI",
  "THIRD_PLACE",
  "FINAL",
] as const;

const PHASE_LABELS: Record<string, string> = {
  ROUND_32: "DIECISEISAVOS",
  ROUND_16: "OCTAVOS",
  QUARTER: "CUARTOS",
  SEMI: "SEMIFINAL",
  THIRD_PLACE: "TERCER PUESTO",
  FINAL: "FINAL",
};

const getMatchPhase = (matchPhase: string) => matchPhase.toUpperCase();

type MatchSection = {
  title: string;
  data: [string, Match[]][];
  isFinalPhase: boolean;
};

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';

// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login
export default function MatchScreen() {
  const [showModalCreateParticipant, setShowModalCreateParticipant] =
    useState(false);
  const [allMatch, setAllMatch] = useState<Match>({} as Match);
  console.log("allMatch ", allMatch);
  const { toCreateTeamFinal } = useSaveTeamsFinales();

  const [selectedMatch, setSelectedMatch] = useState(false);
  // const [flagModalAccountUpdate, setFlagModalAccountUpdate] = useState(false);
  const { toCreateMatch, toUpdateMatch } = useMatch();
  const { allMatchsQuery } = useMatchs();

  useEffect(() => {
    allMatchsQuery.refetch();
  }, [allMatchsQuery]);

  function formatDate(iso: string | number | Date) {
    const d = new Date(iso);
    return d.toLocaleString();
  }

  // console.log(findallParticipant);

  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Aquí llamarías tu API para recargar partidos
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  }, []);

  const filterByParticipant = allMatchsQuery.data?.filter((m) => {
    const q = query.toLowerCase().trim();

    if (!q) return true;

    const homeScore = m.home_score?.toString() || "";
    const awayScore = m.away_score?.toString() || "";
    const groupText = `grupo ${m.group?.letter || ""}`.toLowerCase();

    return (
      m.homeTeam.name.toLowerCase().includes(q) ||
      m.awayTeam.name.toLowerCase().includes(q) ||
      m.stadium.toLowerCase().includes(q) ||
      m.stage.toLowerCase().includes(q) ||
      groupText.includes(q) ||
      homeScore.includes(q) ||
      awayScore.includes(q)
    );
  });

  const hasFinalMatches =
    allMatchsQuery.data?.some(
      (m) => getMatchPhase(m.match_phase) !== "GROUP",
    ) || false;

  const groupedMatches =
    filterByParticipant
      ?.filter((item) => getMatchPhase(item.match_phase) === "GROUP")
      .reduce(
        (acc, item) => {
          const groupLetter = item.group?.letter || "Sin Grupo";

          if (!acc[groupLetter]) {
            acc[groupLetter] = [];
          }

          acc[groupLetter].push(item);

          return acc;
        },
        {} as Record<string, Match[]>,
      ) || {};

  const groupedFinalMatches =
    filterByParticipant
      ?.filter((item) => getMatchPhase(item.match_phase) !== "GROUP")
      .reduce(
        (acc, item) => {
          const finalPhase = getMatchPhase(item.match_phase);

          if (!acc[finalPhase]) {
            acc[finalPhase] = [];
          }

          acc[finalPhase].push(item);

          return acc;
        },
        {} as Record<string, Match[]>,
      ) || {};

  const groupedData = Object.entries(groupedMatches);

  const groupedFinalData = FINAL_PHASES.filter(
    (phase) => groupedFinalMatches[phase],
  ).map(
    (phase) =>
      [PHASE_LABELS[phase] || phase, groupedFinalMatches[phase]] as [
        string,
        Match[],
      ],
  );

  const matchSections: MatchSection[] = hasFinalMatches
    ? [
        {
          title: "Fase de Grupos",
          data: groupedData,
          isFinalPhase: false,
        },
        {
          title: "Fase Final",
          data: groupedFinalData,
          isFinalPhase: true,
        },
      ].filter((section) => section.data.length > 0)
    : [
        {
          title: "",
          data: groupedData,
          isFinalPhase: false,
        },
      ];

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

  const renderItem: ListRenderItem<Match> = ({ item }) => {
    const color = getStatusColor(item.stage);
    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          // setFlagModalAccountUpdate(true);
          setAllMatch(item);
          setShowModalCreateParticipant(true);
          setSelectedMatch(true);
        }}
      >
        <View style={styles.metaRow}>
          <Text style={styles.date}>{formatDate(item.match_date)}</Text>
          <Text style={styles.group}>
            {getMatchPhase(item.match_phase) === "GROUP"
              ? `Grupo ${item.group?.letter || ""}`
              : `Fase ${getMatchPhase(item.match_phase)}`}
          </Text>
        </View>
        <View style={styles.teamsRow}>
          <View style={styles.team}>
            <Image
              source={{ uri: item.homeTeam!.flag }}
              resizeMode="cover"
              style={styles.flag}
            />
            <Text style={styles.teamName}>{item.homeTeam!.name}</Text>
            {item.stage === "Finalizado" ? (
              <>
                <Text style={{ color: "white", fontWeight: "bold", left: 7 }}>
                  {item.home_score}
                </Text>
              </>
            ) : (
              <></>
            )}
          </View>

          <Text style={styles.vs}>vs</Text>

          <View style={styles.teamRight}>
            {item.stage === "Finalizado" ? (
              <>
                <Text style={{ color: "white", fontWeight: "bold", left: 7 }}>
                  {item.away_score}
                </Text>
              </>
            ) : (
              <></>
            )}
            <Text style={styles.teamName}>{item.awayTeam.name}</Text>
            <Image
              source={{ uri: item.awayTeam.flag }}
              resizeMode="cover"
              style={styles.flag}
            />
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.stadium}>Estadio {item.stadium}</Text>
          <Text style={{ color, fontWeight: "bold" }}>{item.stage}</Text>
        </View>
      </Pressable>
    );
  };

  function renderGroup({ item }: { item: [string, Match[]] }) {
    const [groupLetter, matches] = item;

    return (
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>GRUPO {groupLetter}</Text>

        <FlatList
          data={matches}
          keyExtractor={(item: Match) => item.id.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    );
  }

  function renderFinalGroup({ item }: { item: [string, Match[]] }) {
    const [finalPhase, matches] = item;

    return (
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>{finalPhase}</Text>

        <FlatList
          data={matches}
          keyExtractor={(item: Match) => item.id.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    );
  }

  function renderSection({ item }: { item: MatchSection }) {
    return (
      <View>
        {item.title ? (
          <Text style={styles.groupTitle}>{item.title}</Text>
        ) : null}

        <FlatList
          data={item.data}
          keyExtractor={(item) => item[0]}
          renderItem={item.isFinalPhase ? renderFinalGroup : renderGroup}
          scrollEnabled={false}
        />
      </View>
    );
  }

  // const renderItem: ListRenderItem<Match> = ({ item }) => (
  //   <Pressable
  //     style={styles.card}
  //     onPress={() => {
  //       setFlagModalAccountUpdate(true);
  //       setShowModalCreateParticipant(true);
  //       setDataParticipant(item);
  //     }}
  //   >
  //     <View style={styles.metaRow}>
  //       <Text style={styles.date}>{formatDate(item.match_date)}</Text>
  //       <Text style={styles.group}>Grupo {item.group?.letter || ""}</Text>
  //     </View>
  //     <View style={styles.teamsRow}>
  //       <View style={styles.team}>
  //         <Image
  //           source={{ uri: item.homeTeam!.flag }}
  //           resizeMode="cover"
  //           style={styles.flag}
  //         />
  //         <Text style={styles.teamName}>{item.homeTeam!.name}</Text>
  //       </View>

  //       <Text style={styles.vs}>vs</Text>

  //       <View style={styles.teamRight}>
  //         <Text style={styles.teamName}>{item.awayTeam.name}</Text>
  //         <Image
  //           source={{ uri: item.awayTeam.flag }}
  //           resizeMode="cover"
  //           style={styles.flag}
  //         />
  //       </View>
  //     </View>

  //     <View style={styles.metaRow}>
  //       <Text style={styles.stadium}>Estadio {item.stadium}</Text>
  //       <Text style={{ color, fontWeight: "bold" }}>{item.stage}</Text>
  //     </View>
  //   </Pressable>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partidos</Text>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Buscar equipo o estadio"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      {/* LISTA */}

      <FlatList
        data={matchSections}
        keyExtractor={(item) => item.title || "Fase de Grupos"}
        renderItem={renderSection}
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
          // setAllMatch();
          setSelectedMatch(false);
          // setFlagModalAccountUpdate(false);
        }}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {showModalCreateParticipant ? (
        <MatchModalG
          visible={showModalCreateParticipant}
          match={selectedMatch ? allMatch : ({} as Match)}
          title={selectedMatch ? "Editar Partido" : "Crear Partido"}
          buttonText={selectedMatch ? "Actualizar" : "Crear"}
          onClose={() => setShowModalCreateParticipant(false)}
          onSave={(data) => {
            if (selectedMatch) {
              toUpdateMatch(data);
            } else {
              toCreateMatch(data);
            }
          }}
          onSaveFinalMatch={(data) => {
            if (selectedMatch) {
              toCreateTeamFinal(data);
            } else {
            }
          }}
        ></MatchModalG>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
    overflowX: "scroll",
    overscrollBehaviorY: "none",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

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
  date: { color: "#9fb8d6", bottom: 10 },
  stadium: { color: "#9fb8d6" },
  group: { color: "#9fb8d6", bottom: 10 },

  empty: { padding: 40, alignItems: "center" },
  emptyText: { color: "#9fb8d6" },

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
