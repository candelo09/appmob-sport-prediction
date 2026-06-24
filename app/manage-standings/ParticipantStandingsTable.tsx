import ParticipantAccordionGroup from "@/src/components/standing/participantAccordionGroup";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ParticipantStandingsTableScreen() {
  // console.log(allGroupStandingByGroup);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Aquí llamarías tu API para recargar partidos
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaProvider
      style={{ backgroundColor: "#071226", overflow: "scroll" }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SafeAreaView>
          <ParticipantAccordionGroup></ParticipantAccordionGroup>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
