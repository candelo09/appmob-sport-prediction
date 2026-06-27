import useBet, {
  usePredictionByParticipantAndMatch,
} from "@/hooks/use-prediction";
import { Match } from "@/src/interfaces/matchs";
import React, { useState } from "react";
// import React, { useState } from "react";
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  matchId: Match;
  userId: number;
  onClose: () => void;
};

export default function MatchModal({
  visible,
  matchId,
  userId,
  onClose,
}: Props) {
  const { predictionByIdQuery } = usePredictionByParticipantAndMatch(
    userId,
    matchId.id,
  );

  const alreadyBet = predictionByIdQuery.data;

  const [valueHomeTeam, onChangeValueHomeTeam] = useState<string>("");
  const [valueAwayTeam, onChangeValueAwayTeam] = useState<string>("");

  const [qualifiedTeamId, setQualifiedTeamId] = useState<number | null>(null);

  React.useEffect(() => {
    if (alreadyBet) {
      onChangeValueHomeTeam(alreadyBet.predicted_home_score.toString());
      onChangeValueAwayTeam(alreadyBet.predicted_away_score.toString());

      setQualifiedTeamId(alreadyBet.qualified_team_id ?? null);
    }
  }, [alreadyBet]);

  // console.log("predictionByIdQuery ", predictionByIdQuery.data);

  // const handleChangeHomeTeamText = (text: string) => {
  //   onChangeValueHomeTeam(text);
  // };

  const handleChangeHomeTeamText = (text: string) => {
    onChangeValueHomeTeam(text);

    updateQualifiedTeam(text, valueAwayTeam);
  };

  // const handleChangeAwayTeamText = (text: string) => {
  //   onChangeValueAwayTeam(text);
  // };

  const handleChangeAwayTeamText = (text: string) => {
    onChangeValueAwayTeam(text);

    updateQualifiedTeam(valueHomeTeam, text);
  };

  const { toBet, updateBet } = useBet();

  // function formatDate(iso: string | number | Date) {
  //   const d = new Date(iso);
  //   return d.toLocaleString();
  // }
  // const [modalVisible, setModalVisible] = useState(visible);
  const match_date = new Date(matchId.match_date);
  const date_now = new Date();

  const diffMs = match_date.getTime() - date_now.getTime();
  const diffMinutes = diffMs / (1000 * 60);

  const updateQualifiedTeam = (homeScore: string, awayScore: string) => {
    const home = Number(homeScore);
    const away = Number(awayScore);

    if (home > away) {
      setQualifiedTeamId(matchId.homeTeam.id);
    } else if (away > home) {
      setQualifiedTeamId(matchId.awayTeam.id);
    } else {
      setQualifiedTeamId(null);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide" // or "fade", "none"
        transparent={true} // renders over a transparent background
        visible={visible}
        onRequestClose={onClose}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#4b4b4bff",
              padding: 20,
              borderRadius: 10,
              width: 480,
              maxWidth: "95%",
            }}
          >
            <>
              {diffMinutes <= 0 ? (
                <Text
                  style={{
                    color: "#fff",
                    paddingBottom: 25,
                    fontSize: 16,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  Mi apuesta!
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#fff",
                    paddingBottom: 25,
                    fontSize: 16,
                    fontWeight: 800,
                  }}
                >
                  Vamos! Haz tu predicción
                </Text>
              )}
            </>

            <View style={styles.teamsRow}>
              <View style={styles.team}>
                <Image
                  source={{ uri: matchId.homeTeam!.flag }}
                  resizeMode="cover"
                  style={styles.flag}
                />
                <TextInput
                  editable={diffMinutes <= 0 ? false : true}
                  keyboardType="numeric"
                  value={valueHomeTeam}
                  onChangeText={handleChangeHomeTeamText}
                  style={styles.teamName}
                  placeholder=""
                />
                <Text style={{ color: "#ffff", fontSize: 15 }}>
                  ({matchId.home_score})
                </Text>
                {/* <Text style={styles.teamName}>{matchId.item.homeTeam!.name}</Text> */}
              </View>

              <Text style={styles.vs}>vs</Text>

              <View style={styles.teamRight}>
                <Text style={{ color: "#ffff", fontSize: 15 }}>
                  ({matchId.away_score})
                </Text>
                <TextInput
                  editable={diffMinutes <= 0 ? false : true}
                  keyboardType="numeric"
                  value={valueAwayTeam}
                  onChangeText={handleChangeAwayTeamText}
                  style={styles.teamName}
                  placeholder=""
                />
                <Image
                  source={{ uri: matchId.awayTeam.flag }}
                  resizeMode="cover"
                  style={styles.flag}
                />
              </View>
            </View>

            {matchId.decided_by_penalties && (
              <View
                style={{
                  backgroundColor: "#2f3640",
                  borderRadius: 8,
                  paddingVertical: 8,
                  marginBottom: 15,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fbbf24",
                    fontWeight: "700",
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  ⚽ Definido por penales
                </Text>

                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {matchId.home_penalty_score} - {matchId.away_penalty_score}
                </Text>
              </View>
            )}

            {matchId.match_phase !== "GROUP" &&
              valueHomeTeam !== "" &&
              valueAwayTeam !== "" && (
                <View
                  style={{
                    marginBottom: 15,
                    backgroundColor: "#5a5a5aff",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      marginBottom: 10,
                      textAlign: "center",
                    }}
                  >
                    🏆 ¿Quién clasifica?
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      title={matchId.homeTeam?.name || "Local"}
                      color={
                        qualifiedTeamId === matchId.homeTeam?.id
                          ? "#1f9d55"
                          : "#6b7280"
                      }
                      onPress={
                        diffMinutes <= 0
                          ? undefined
                          : () => {
                              if (
                                Number(valueHomeTeam) === Number(valueAwayTeam)
                              ) {
                                setQualifiedTeamId(matchId.awayTeam.id);
                              }
                            }
                      }
                    />

                    <Button
                      title={matchId.awayTeam?.name || "Visitante"}
                      color={
                        qualifiedTeamId === matchId.awayTeam?.id
                          ? "#1f9d55"
                          : "#6b7280"
                      }
                      onPress={
                        diffMinutes <= 0
                          ? undefined
                          : () => setQualifiedTeamId(matchId.awayTeam?.id)
                      }
                    />
                  </View>
                </View>
              )}

            {/* <View style={styles.metaRow}>
              <Text style={styles.date}>{formatDate(matchId.item.match_date)}</Text>
              <Text style={styles.stadium}>{matchId.item.stadium}</Text>
            </View> */}
            <View>
              <>
                {diffMinutes <= 0 ? (
                  <View>
                    <Button
                      title="Cerrar"
                      color="#b92727ff"
                      onPress={onClose}
                    />
                  </View>
                ) : (
                  <>
                    <View style={styles.metaRow}>
                      <Button
                        title="Apostar"
                        color="#298a3eff"
                        onPress={() => {
                          // Se calcula nuevamente la hora actual
                          const now = new Date();
                          const matchDate = new Date(matchId.match_date);

                          if (matchDate <= now) {
                            alert(
                              "⏰ El partido ya comenzó. No es posible realizar o modificar la apuesta.",
                            );
                            onClose();
                            return;
                          }

                          if (alreadyBet) {
                            updateBet(
                              alreadyBet.id,
                              matchId,
                              parseInt(valueHomeTeam),
                              parseInt(valueAwayTeam),
                              qualifiedTeamId ?? undefined,
                            );
                            return;
                          }

                          toBet(
                            matchId,
                            parseInt(valueHomeTeam),
                            parseInt(valueAwayTeam),
                            qualifiedTeamId ?? undefined,
                          );

                          onClose();
                        }}
                      />
                      <Button
                        title="Cerrar"
                        color="#b92727ff"
                        onPress={onClose}
                      />
                    </View>
                  </>
                )}
              </>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    paddingBottom: 20,
  },
  team: { flexDirection: "row", alignItems: "center", gap: 8 },
  teamRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  flag: { width: 42, height: 28, borderRadius: 4 },
  teamName: {
    backgroundColor: "#e6f2ff",
    fontWeight: "700",
    marginHorizontal: 8,
    width: 30,
  },
  vs: { color: "#9fb8d6", fontWeight: "700" },

  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: { color: "#9fb8d6" },
  stadium: { color: "#9fb8d6" },

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
});
