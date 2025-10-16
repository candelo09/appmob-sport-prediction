import { Match } from "@/src/interfaces/matchs";
// import React, { useState } from "react";
import { Button, Modal, Text, View } from "react-native";

type Props = {
  visible: boolean;
  matchId: Match;
  onClose: () => void;
};




export default function MatchModal({ visible, matchId, onClose }: Props) {

  // const [modalVisible, setModalVisible] = useState(visible);

  return (
    <View>
      <Modal
        animationType="slide" // or "fade", "none"
        transparent={true} // renders over a transparent background
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>{JSON.stringify(matchId)}</Text>
            <Button title="Cerrar" onPress={onClose} />
          </View>
        </View>
      </Modal>
    </View>
  );

}

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     width: "85%",
//     padding: 20,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginBottom: 12,
//     borderRadius: 8,
//   },
//   loginBtn: {
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   loginText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   newAccountBtn: {
//     backgroundColor: "#16720dff",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   newAccountText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });