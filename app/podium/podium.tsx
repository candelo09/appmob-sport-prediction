import usePodium, { usePodiumByParticipant } from "@/hooks/use-finals";
import { useAllTeams, useAllTeamsFinales } from "@/hooks/use-teams";
import { useAuthContext } from "@/src/context/AuthContext";
import { Podium } from "@/src/interfaces/podium";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PodiumPredictionScreen() {
  const [champion, setChampion] = useState<number | null>(null);
  const [runnerUp, setRunnerUp] = useState<number | null>(null);
  const [thirdPlace, setThirdPlace] = useState<number | null>(null);
  const { user } = useAuthContext();
  const { toCreatePodium } = usePodium();

  const { podiumParticipantQuery } = usePodiumByParticipant(user?.id || 0);

  console.log("podiumParticipantQuery ", podiumParticipantQuery.data);

  const { findallTeam } = useAllTeams();
  const { findallTeam: findallTeamFinales } = useAllTeamsFinales();

  const hasQualifiedTeams = (findallTeamFinales.data?.length || 0) > 0;

  const uniqueTeams = (findallTeamFinales.data || []).filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.team.id === item.team.id),
  );

  const teamsOptions = hasQualifiedTeams
    ? uniqueTeams.map((item) => item.team)
    : findallTeam.data || [];

  // Opciones disponibles para cada Picker
  const championOptions = teamsOptions;

  const runnerUpOptions = teamsOptions.filter((team) => team.id !== champion);

  const thirdPlaceOptions = teamsOptions.filter(
    (team) => team.id !== champion && team.id !== runnerUp,
  );

  useEffect(() => {
    if (podiumParticipantQuery.data) {
      setChampion(podiumParticipantQuery.data.champion_team_id);
      setRunnerUp(podiumParticipantQuery.data.runner_up_team_id);
      setThirdPlace(podiumParticipantQuery.data.third_place_team_id);
    } else {
      setChampion(null);
      setRunnerUp(null);
      setThirdPlace(null);
    }
  }, [podiumParticipantQuery.data]);

  const savePrediction = () => {
    if (!champion || !runnerUp || !thirdPlace) {
      alert("Debes seleccionar el campeón, subcampeón y tercer lugar.");
      return;
    }

    if (
      champion === runnerUp ||
      runnerUp === thirdPlace ||
      thirdPlace === champion
    ) {
      alert("No puede seleccionar el mismo equipo en el podio.");
      return;
    }

    const bodyPodium: Podium = {
      participant_id: user?.id || 0,
      champion_team_id: champion,
      runner_up_team_id: runnerUp,
      third_place_team_id: thirdPlace,
      created_at: new Date(),
      update_at: new Date(),
    };

    console.log({
      champion,
      runnerUp,
      thirdPlace,
    });

    // Aquí llamas tu servicio
    toCreatePodium(bodyPodium);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Pronóstico del Podio</Text>

      {/* CAMPEÓN */}
      <View style={styles.card}>
        <Text style={styles.label}>🥇 Campeón</Text>

        <Picker
          selectedValue={champion}
          onValueChange={(value) => {
            setChampion(value);

            if (runnerUp === value) {
              setRunnerUp(null);
            }

            if (thirdPlace === value) {
              setThirdPlace(null);
            }
          }}
        >
          <Picker.Item label="Seleccione..." value={null} />

          {championOptions.map((team) => (
            <Picker.Item key={team.id} label={team.name} value={team.id} />
          ))}
        </Picker>
      </View>

      {/* SUBCAMPEÓN */}
      <View style={styles.card}>
        <Text style={styles.label}>🥈 Subcampeón</Text>

        <Picker
          selectedValue={runnerUp}
          onValueChange={(value) => {
            setRunnerUp(value);

            if (thirdPlace === value) {
              setThirdPlace(null);
            }
          }}
        >
          <Picker.Item label="Seleccione..." value={null} />

          {runnerUpOptions.map((team) => (
            <Picker.Item key={team.id} label={team.name} value={team.id} />
          ))}
        </Picker>
      </View>

      {/* TERCER LUGAR */}
      <View style={styles.card}>
        <Text style={styles.label}>🥉 Tercer Lugar</Text>

        <Picker
          selectedValue={thirdPlace}
          onValueChange={(value) => setThirdPlace(value)}
        >
          <Picker.Item label="Seleccione..." value={null} />

          {thirdPlaceOptions.map((team) => (
            <Picker.Item key={team.id} label={team.name} value={team.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={savePrediction}>
        <Text style={styles.buttonText}>💾 Guardar Pronóstico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
});
