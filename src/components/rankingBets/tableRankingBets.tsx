import { useRankgins } from '@/hooks/use-rankings';
import { StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function TableRankingBets() {

    const {allRankingsQuery} = useRankgins()

    console.log(allRankingsQuery.data);
    

    // const [items] = useState(allRankingsQuery.data)


    return (

        <SafeAreaProvider style={style.container}>
            <SafeAreaView>
                <View></View>
                <DataTable style={{backgroundColor:'#fff'}}>
                    <DataTable.Header>
                        <DataTable.Title>#</DataTable.Title>
                        <DataTable.Title numeric>Participante</DataTable.Title>
                        <DataTable.Title numeric>Puntos</DataTable.Title>
                    </DataTable.Header>

                    {allRankingsQuery.data?.map((item,index) => (
                        <DataTable.Row key={item.id}>
                            <DataTable.Cell>{index+1}</DataTable.Cell>
                            <DataTable.Cell style={{flex:2}} numeric>{item.participant.name}</DataTable.Cell>
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
            </SafeAreaView>
        </SafeAreaProvider>

    );
};

const style = StyleSheet.create({
    container: { 
        flex: 1, backgroundColor: '#071226', 
        overflowX:'scroll', 
        overscrollBehaviorY:'none',
        padding:20
     },
})