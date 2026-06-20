import { useGroups } from "@/hooks/use-group";
import { useAllTeams, useAllTeamsFinales } from "@/hooks/use-teams";
import AlertModal from "@/src/components/alert-modal/alertModal";
import { Match } from "@/src/interfaces/matchs";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

type Props = {
  visible: boolean;
  match: Match;
  title: string;
  buttonText: string;
  onClose: () => void;
  onSave: (data: Match) => void;
};

export default function MatchModal({
  visible,
  match,
  title,
  buttonText,
  onClose,
  onSave,
}: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const { findallTeam } = useAllTeams();
  const { findallTeam: findallTeamFinales } = useAllTeamsFinales();
  const { allGroupsQuery } = useGroups();
  const hasQualifiedTeams = (findallTeamFinales.data?.length || 0) > 0;

  const uniqueTeams = (findallTeamFinales.data || []).filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.team.id === item.team.id),
  );

  const teamsOptions = hasQualifiedTeams
    ? uniqueTeams.map((item) => item.team)
    : findallTeam.data || [];
  // const teamsOptions = hasQualifiedTeams
  //   ? findallTeamFinales.data?.map((qualifiedTeam) => qualifiedTeam.team) || []
  //   : findallTeam.data || [];
  const localTeamLabel = hasQualifiedTeams
    ? "Equipo local clasificado"
    : "Equipo local";
  const awayTeamLabel = hasQualifiedTeams
    ? "Equipo visitante clasificado"
    : "Equipo visitante";
  const finalPhases = [
    { id: 1, cod: "ROUND_32", name: "DICISEISAVOS" },
    { id: 2, cod: "ROUND_16", name: "OCTAVOS" },
    { id: 3, cod: "QUARTER", name: "CUARTOS" },
    { id: 4, cod: "SEMI", name: "SEMIFINALES" },
    { id: 5, cod: "THIRD_PLACE", name: "TERCER LUGAR" },
    { id: 6, cod: "FINAL", name: "FINAL" },
  ];

  finalPhases.map((res) => console.log("cod ", res.cod));
  const validationSchema = Yup.object({
    homeTeam: Yup.string().required("Equipo local requerido"),
    awayTeam: Yup.string()
      .required("Equipo visitante requerido")
      .test(
        "different-teams",
        "Local y visitante no pueden ser iguales",
        (value, context) => {
          return (
            !value ||
            !context.parent.homeTeam ||
            value !== context.parent.homeTeam
          );
        },
      ),
    match_phase: hasQualifiedTeams
      ? Yup.string().required("Fase requerida")
      : Yup.string(),
    date: Yup.string().required("Fecha requerida"),
    stadium: Yup.string().required("Estadio requerido"),
  });

  // const groupTeam: any = findallTeam.data?.find((m) => {
  //   // setTeamId(match.group.id)
  //   const team_Id = teamId;
  //   if (team_Id) return true;
  //   return m.group.id;
  // });

  // function groupTeam(groupId: number) {
  //   if (groupId) return true;

  //   const getGruopTeam: any = findallTeam.data?.find((g) => g.id === groupId);

  //   return getGruopTeam;
  // }

  function formatDate(iso: string | number | Date) {
    if (!iso) return "";

    const d = new Date(iso);

    if (isNaN(d.getTime())) return "";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleSubmit = (values: any) => {
    const hasScores =
      values.homeScore !== "" &&
      values.homeScore !== null &&
      values.homeScore !== undefined &&
      values.awayScore !== "" &&
      values.awayScore !== null &&
      values.awayScore !== undefined;

    const hasScoresPenal =
      values.home_penalty_score !== "" &&
      values.home_penalty_score !== null &&
      values.home_penalty_score !== undefined &&
      values.away_penalty_score !== "" &&
      values.away_penalty_score !== null &&
      values.away_penalty_score !== undefined;

    const body: Match = {
      id: match?.id,
      homeTeam: values.homeTeam,
      awayTeam: values.awayTeam,
      match_date: new Date(values.date),
      stadium: values.stadium,
      home_score: hasScores ? values.homeScore : null,
      away_score: hasScores ? values.awayScore : null,
      stage: hasScores ? "Finalizado" : "Por Jugar",
      group: values.group,
      match_phase: values.match_phase,
      home_penalty_score: hasScoresPenal ? values.home_penalty_score : null,
      away_penalty_score: hasScoresPenal ? values.away_penalty_score : null,
      decided_by_penalties: false,
    };

    onSave(body);
    setShowAlert(true);
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>

            <Formik
              initialValues={{
                homeTeam: match?.homeTeam?.id.toString() || "",
                awayTeam: match?.awayTeam?.id.toString() || "",
                date: match?.match_date ? formatDate(match.match_date) : "",
                stadium: match?.stadium || "",
                homeScore: match?.home_score?.toString() || "",
                awayScore: match?.away_score?.toString() || "",
                home_penalty_score: match?.home_penalty_score?.toString() || "",
                away_penalty_score: match?.away_penalty_score?.toString() || "",
                decided_by_penalties: match?.decided_by_penalties || false,
                group:
                  match?.group !== undefined ? match?.group.id?.toString() : "",
                match_phase: match?.match_phase || "",
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  {/* Equipos */}
                  <Picker
                    selectedValue={values.homeTeam}
                    onValueChange={(value) => {
                      handleChange("homeTeam")(value);
                    }}
                    style={styles.picker}
                  >
                    <Picker.Item label={localTeamLabel} value="" />
                    {teamsOptions.map((team) => (
                      <Picker.Item
                        key={team.id}
                        label={team.name}
                        value={team.id.toString()}
                      />
                    ))}
                  </Picker>
                  {touched.homeTeam && errors.homeTeam && (
                    <Text style={styles.error}>{errors.homeTeam}</Text>
                  )}

                  <Picker
                    selectedValue={values.awayTeam}
                    onValueChange={(value) => {
                      handleChange("awayTeam")(value);
                    }}
                    style={styles.picker}
                  >
                    <Picker.Item label={awayTeamLabel} value="" />
                    {teamsOptions.map((team) => (
                      <Picker.Item
                        key={team.id}
                        label={team.name}
                        value={team.id.toString()}
                      ></Picker.Item>
                    ))}
                  </Picker>
                  {touched.awayTeam && errors.awayTeam && (
                    <Text style={styles.error}>{errors.awayTeam}</Text>
                  )}
                  {/* Estadio */}

                  <TextInput
                    style={styles.input}
                    placeholder="Estadio"
                    value={values.stadium}
                    onChangeText={handleChange("stadium")}
                  />

                  {/* Fecha */}
                  <TextInput
                    style={styles.input}
                    placeholder="Fecha (YYYY-MM-DD HH:MM:SS)"
                    value={values.date}
                    onChangeText={handleChange("date")}
                  />

                  {!hasQualifiedTeams && (
                    <>
                      {/* Grupos */}
                      <Picker
                        selectedValue={values.group}
                        onValueChange={(value) => {
                          handleChange("group")(value);
                        }}
                        style={styles.picker}
                      >
                        <Picker.Item label="Seleccione Grupo" value="1" />
                        {allGroupsQuery.data?.map((group) => (
                          <Picker.Item
                            key={group.id}
                            label={group.letter}
                            value={group.id.toString()}
                          />
                        ))}
                      </Picker>
                      {touched.homeTeam && errors.homeTeam && (
                        <Text style={styles.error}>{errors.homeTeam}</Text>
                      )}
                    </>
                  )}

                  {/* Marcadores (solo útil en update) */}
                  {hasQualifiedTeams && (
                    <>
                      <Picker
                        selectedValue={values.match_phase}
                        onValueChange={(value) => {
                          handleChange("match_phase")(value);
                        }}
                        style={styles.picker}
                      >
                        <Picker.Item label="Seleccione fase" value="" />
                        {finalPhases.map((phase) => (
                          <Picker.Item
                            key={phase.id}
                            label={phase.name}
                            value={phase.cod}
                          />
                        ))}
                      </Picker>
                      {touched.match_phase && errors.match_phase && (
                        <Text style={styles.error}>{errors.match_phase}</Text>
                      )}
                    </>
                  )}

                  <View style={styles.row}>
                    <TextInput
                      style={styles.score}
                      placeholder="Local"
                      keyboardType="numeric"
                      value={values.homeScore}
                      onChangeText={handleChange("homeScore")}
                    />
                    <TextInput
                      style={styles.score}
                      placeholder="Visitante"
                      keyboardType="numeric"
                      value={values.awayScore}
                      onChangeText={handleChange("awayScore")}
                    />
                  </View>

                  {hasQualifiedTeams &&
                    values.homeScore === values.awayScore &&
                    values.homeScore !== "" &&
                    values.awayScore !== "" && (
                      <>
                        <View style={{ top: 7 }}>
                          <View style={styles.row}>
                            <TextInput
                              style={styles.score}
                              placeholder="Penal Local"
                              keyboardType="numeric"
                              value={values.home_penalty_score}
                              onChangeText={handleChange("home_penalty_score")}
                            />
                            <TextInput
                              style={styles.score}
                              placeholder="Penal Visitante"
                              keyboardType="numeric"
                              value={values.away_penalty_score}
                              onChangeText={handleChange("away_penalty_score")}
                            />
                          </View>
                        </View>
                      </>
                    )}

                  {/* Botones */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleSubmit()}
                    >
                      <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonClose}
                      onPress={onClose}
                    >
                      <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>

        <AlertModal
          visible={showAlert}
          title="Éxito"
          messages="Partido guardado correctamente"
          onClose={() => setShowAlert(false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center", // 👈 esto centra verticalmente
    alignItems: "center",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center", // 👈 centra el contenido
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#1c2a4a",
    borderRadius: 16,
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  score: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    width: "48%",
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  button: {
    backgroundColor: "#4e6cff",
    padding: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  buttonClose: {
    backgroundColor: "#ff4e4e",
    padding: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  error: {
    color: "#ff6b6b",
    fontSize: 12,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
});
