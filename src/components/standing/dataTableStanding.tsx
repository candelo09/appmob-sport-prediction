import { useGroupstandingByGroup } from "@/hooks/use-group-standing";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import { DataTable } from "react-native-paper";

type Props = {
  groupId: number;
};

export default function DataTableStanding({ groupId }: Props) {
  const { allGroupStandingByGroup } = useGroupstandingByGroup(groupId);

  // const [items] = useState(allGroupStandingByGroup.data);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allGroupStandingByGroup) {
      const timeout = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [allGroupStandingByGroup]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Tabla cargando...</Text>
      </View>
    );
  }

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 3 }} textStyle={styles.title}>
          Equipo
        </DataTable.Title>
        <DataTable.Title
          style={styles.titleContainer}
          textStyle={styles.title}
          numeric
        >
          Pts
        </DataTable.Title>
        <DataTable.Title
          style={styles.titleContainer}
          textStyle={styles.title}
          numeric
        >
          PJ
        </DataTable.Title>
        <DataTable.Title
          style={styles.titleContainer}
          textStyle={styles.title}
          numeric
        >
          +/-
        </DataTable.Title>
        <DataTable.Title
          style={styles.titleContainer}
          textStyle={styles.title}
          numeric
        >
          GF:GC
        </DataTable.Title>
        <DataTable.Title
          style={styles.titleContainer}
          textStyle={styles.title}
          numeric
        >
          G
        </DataTable.Title>
        <DataTable.Title
          style={styles.titleContainer}
          textStyle={styles.title}
          numeric
        >
          E
        </DataTable.Title>
        <DataTable.Title
          style={styles.titleContainer}
          textStyle={styles.title}
          numeric
        >
          P
        </DataTable.Title>

        {/* <DataTable.Title numeric>Fat</DataTable.Title> */}
      </DataTable.Header>

      {allGroupStandingByGroup.data!.map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell style={{ flex: 3 }} textStyle={styles.rowText}>
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={styles.flag}
                  source={{ uri: item.team.flag }}
                ></Image>
                <Text style={{ paddingStart: 3, fontSize: 11 }}>
                  {item.team.name}
                </Text>
              </View>
            </>
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.rowContainer}
            textStyle={styles.rowText}
            numeric
          >
            {item.points}
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.rowContainer}
            textStyle={styles.rowText}
            numeric
          >
            {item.matches_played}
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.rowContainer}
            textStyle={styles.rowText}
            numeric
          >
            {item.goal_difference}
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.rowContainer}
            textStyle={styles.rowText}
            numeric
          >
            {item.goals_for}:{item.goals_against}
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.rowContainer}
            textStyle={styles.rowText}
            numeric
          >
            {item.wins}
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.rowContainer}
            textStyle={styles.rowText}
            numeric
          >
            {item.draws}
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.rowContainer}
            textStyle={styles.rowText}
            numeric
          >
            {item.losses}
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      {/* <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(sizeTbl / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${sizeTbl}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            /> */}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flag: { width: 15, height: 15, borderRadius: 4 },

  rowText: { fontWeight: 700, fontSize: 11 },
  title: { fontWeight: 900, fontSize: 11 },
  titleContainer: { flex: 2 },
  rowContainer: { flex: 2 },
});
