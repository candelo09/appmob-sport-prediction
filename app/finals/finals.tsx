import { useFinals } from "@/hooks/use-finals";
import { Match } from "@/src/interfaces/matchs";
import {
  FINAL_PHASES,
  FinalPhase,
  getFinalPhase,
} from "@/src/services/finals-service";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type FinalPhaseGroup = {
  phase: FinalPhase;
  matches: Match[];
};

export default function FinalsScreen() {
  const { finalsQuery } = useFinals();
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await finalsQuery.refetch();
    setRefreshing(false);
  }, [finalsQuery]);

  useFocusEffect(
    useCallback(() => {
      finalsQuery.refetch();
    }, [finalsQuery]),
  );

  const filteredMatches = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return finalsQuery.data || [];

    return (finalsQuery.data || []).filter((match) => {
      return (
        match.homeTeam.name.toLowerCase().includes(q) ||
        match.awayTeam.name.toLowerCase().includes(q) ||
        match.stadium.toLowerCase().includes(q) ||
        match.stage.toLowerCase().includes(q)
      );
    });
  }, [finalsQuery.data, query]);

  const groupedData = useMemo(() => {
    const matchesByPhase = filteredMatches.reduce(
      (acc, match) => {
        const phase = getFinalPhase(match.match_phase);

        if (!phase) return acc;

        acc[phase].push(match);

        return acc;
      },
      FINAL_PHASES.reduce(
        (acc, phase) => {
          acc[phase] = [];
          return acc;
        },
        {} as Record<FinalPhase, Match[]>,
      ),
    );

    return FINAL_PHASES.map((phase) => ({
      phase,
      matches: matchesByPhase[phase],
    }));
  }, [filteredMatches]);

  function formatDate(iso: string | number | Date) {
    const d = new Date(iso);

    return d.toLocaleString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Juego":
        return "#28a745";
      case "Finalizado":
        return "#dc3545";
      case "Por Jugar":
        return "#ffc107";
      default:
        return "#ffffff";
    }
  };

  const getMatchStatus = (match: Match) => {
    if (
      match.stage === "En Juego" ||
      match.stage === "Finalizado" ||
      match.stage === "Por Jugar"
    ) {
      return match.stage;
    }

    return "Por Jugar";
  };

  const formatScore = (score: number | null | undefined) => {
    return score === null || score === undefined ? "-" : score;
  };

  function renderMatch({ item }: { item: Match }) {
    const status = getMatchStatus(item);
    const color = getStatusColor(status);

    return (
      <View style={styles.card}>
        <View style={styles.metaRow}>
          <Text style={styles.date}>{formatDate(item.match_date)}</Text>
          <Text style={{ color, fontWeight: "bold" }}>{status}</Text>
        </View>

        <View style={styles.teamsRow}>
          <View style={styles.team}>
            <Image
              source={{ uri: item.homeTeam.flag }}
              resizeMode="cover"
              style={styles.flag}
            />
            <Text style={styles.teamName} numberOfLines={2}>
              {item.homeTeam.name}
            </Text>
            <Text style={styles.score}>{formatScore(item.home_score)}</Text>
          </View>

          <Text style={styles.vs}>vs</Text>

          <View style={styles.teamRight}>
            <Text style={styles.score}>{formatScore(item.away_score)}</Text>
            <Text style={styles.teamNameRight} numberOfLines={2}>
              {item.awayTeam.name}
            </Text>
            <Image
              source={{ uri: item.awayTeam.flag }}
              resizeMode="cover"
              style={styles.flag}
            />
          </View>
        </View>

        <Text
          style={{
            color: "#fbbf24",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Penales: {item.home_penalty_score} - {item.away_penalty_score}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.stadium}>Estadio {item.stadium}</Text>
        </View>
      </View>
    );
  }

  function renderPhase({ item }: { item: FinalPhaseGroup }) {
    return (
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>{item.phase.toUpperCase()}</Text>

        <FlatList
          data={item.matches}
          keyExtractor={(match: Match) => match.id.toString()}
          renderItem={renderMatch}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <View style={styles.phaseEmpty}>
              <Text style={styles.emptyText}>Sin partidos programados</Text>
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar equipo, estadio o fase"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            placeholderTextColor="#d7e4f2"
          />
        </View>

        <FlatList
          data={groupedData}
          keyExtractor={(item) => item.phase}
          renderItem={renderPhase}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
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
    gap: 8,
  },
  team: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  teamRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    minWidth: 0,
  },
  flag: { width: 42, height: 28, borderRadius: 4 },
  teamName: {
    flex: 1,
    color: "#e6f2ff",
    fontWeight: "700",
  },
  teamNameRight: {
    flex: 1,
    color: "#e6f2ff",
    fontWeight: "700",
    textAlign: "right",
  },
  score: { color: "#ffffff", fontWeight: "bold", minWidth: 18 },
  vs: { color: "#9fb8d6", fontWeight: "700" },

  metaRow: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  date: { color: "#9fb8d6", flex: 1 },
  stadium: { color: "#ffffff", flex: 1 },

  empty: { padding: 40, alignItems: "center" },
  phaseEmpty: {
    backgroundColor: "#293440",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  emptyText: { color: "#9fb8d6", textAlign: "center" },

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
