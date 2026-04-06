import { ScoringRules } from "@/src/interfaces/scoring-rules";
import React from "react";
// import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  scoringRules: ScoringRules[];
};

export default function ScoringRulesModal({
  visible,
  onClose,
  scoringRules,
}: Props) {
  // console.log("scoringRules ", scoringRules);

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
          <View style={styles.card}>
            <>
              {scoringRules.map((item, index) => (
                <>
                  <View style={styles.cardRules}>
                    <Text style={{ color: "#fff" }}>
                      Siglas: {item.abbreviation}
                    </Text>

                    <Text style={{ color: "#fff" }}>
                      Descripcion: {item.description}
                    </Text>
                    <Text style={{ color: "#fff" }}>Puntos: {item.point}</Text>
                  </View>
                </>
              ))}
            </>
          </View>
          <Button title="Cerrar" color="#b92727ff" onPress={onClose} />
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
  cardRules: {
    backgroundColor: "rgb(202, 148, 81)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(29, 53, 67, 0.03)",
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
