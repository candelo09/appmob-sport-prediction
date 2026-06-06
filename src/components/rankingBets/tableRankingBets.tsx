import { useRankgins } from "@/hooks/use-rankings";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function TableRankingBets() {
  const { allRankingsQuery } = useRankgins();

  useEffect(() => {
    allRankingsQuery.refetch();
  });

  // console.log(allRankingsQuery.data);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Aquí llamarías tu API para recargar partidos
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  }, []);

  // const [items] = useState(allRankingsQuery.data)

  return (
    <SafeAreaProvider style={style.container}>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <DataTable style={{ backgroundColor: "#fff" }}>
            <DataTable.Header>
              <DataTable.Title>
                <Text style={{ fontWeight: "bold" }}>#</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={{ fontWeight: "bold" }}>Pos. Inscripción</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{ fontWeight: "bold" }}>Participante</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{ fontWeight: "bold" }}>Puntos</Text>
              </DataTable.Title>
            </DataTable.Header>

            {allRankingsQuery.data?.map((item, index) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>
                  <Text style={{ fontWeight: "bold" }}>{index + 1}</Text>
                </DataTable.Cell>
                <DataTable.Cell>{item.position_rank}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }} numeric>
                  {item.participant.fullname}
                </DataTable.Cell>
                <DataTable.Cell numeric>{item.points}</DataTable.Cell>
              </DataTable.Row>
            ))}

            {/* <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        // label={`${from + 1}-${to} of ${items.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                    /> */}
          </DataTable>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
    overflowX: "scroll",
    overscrollBehaviorY: "none",
    padding: 20,
  },
});
