import { useMatchs, useMatchsByDate } from '@/hooks/use-matchs';
import MatchModal from '@/src/components/Bets/betMatch';
import { Match } from '@/src/interfaces/matchs';
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';



// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login
export default function BetsScreen() {


    const { allMatchsQuery } = useMatchs();

    const { matchsByDateQuery } = useMatchsByDate(new Date(), new Date());



    // console.log(`matchsByDateQuery`, matchsByDateQuery);



    const [refreshing, setRefreshing] = useState(false);
    const [query, setQuery] = useState('');

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // Aquí llamarías tu API para recargar partidos
        await new Promise((r) => setTimeout(r, 800));
        setRefreshing(false);
    }, []);

    const filtered = allMatchsQuery.data?.filter((m) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;
        return (
            m.item.homeTeam.name.toLowerCase().includes(q) ||
            m.item.awayTeam.name.toLowerCase().includes(q) ||
            m.item.stadium.toLowerCase().includes(q)
        );
    });

    const filteredbyToday = matchsByDateQuery.data?.filter((m) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;
        return (
            m.item.homeTeam.name.toLowerCase().includes(q) ||
            m.item.awayTeam.name.toLowerCase().includes(q) ||
            m.item.stadium.toLowerCase().includes(q)
        );
    });

    // console.log(`filtered`, filtered);

    function formatDate(iso: string | number | Date) {
        const d = new Date(iso);
        return d.toLocaleString();
    }

    const Item: any = Picker.Item;
    const [value, setValue] = React.useState('0');
    const SelectMatchForDay = () => {
        return (

            <Picker
                testID="basic-picker"
                selectedValue={value}
                onValueChange={(v) => setValue(v)}
                accessibilityLabel="Basic Picker Accessibility Label"
                style={{ backgroundColor: '#b5c8e4ff', alignContent: 'flex-end', margin: 20, fontWeight: '900', color: '#000' }}

            >
                <Item style={{ borderRadius: 10, color: '#000', fontSize: 15, fontWeight: '900' }} label="Hoy" value="0" />
                {/* <Item label="Mañana" value="1" /> */}
                <Item label="Todos" value="1" />

            </Picker>


        )
    }


    const [showModalBet, setShowModalBet] = useState(false);

    const [matchId, setMatchId] = useState({} as Match);





    function renderItem({ item }: { item: Match }) {
        // console.log(item);

        return (
            <Pressable
                style={styles.card}
                onPress={() => {
                    setShowModalBet(true);
                    setMatchId( item );
                }}

            >
                <View style={styles.teamsRow}>
                    <View style={styles.team}>
                        <Image source={{ uri: item.homeTeam!.flag }} style={styles.flag} />
                        <Text style={styles.teamName}>{item.homeTeam!.name}</Text>
                    </View>

                    <Text style={styles.vs}>vs</Text>

                    <View style={styles.teamRight}>
                        <Text style={styles.teamName}>{item.awayTeam.name}</Text>
                        <Image source={{ uri: item.awayTeam.flag }} style={styles.flag} />
                    </View>
                </View>

                <View style={styles.metaRow}>
                    <Text style={styles.date}>{formatDate(item.match_date)}</Text>
                    <Text style={styles.stadium}>{item.stadium}</Text>
                </View>
            </Pressable>
        );
    }




    return (

        <SafeAreaProvider style={styles.container}>


            <SafeAreaView>
                <SelectMatchForDay></SelectMatchForDay>


                {showModalBet ? (<>
                    <MatchModal visible={showModalBet} matchId={matchId} onClose={() => setShowModalBet(false)} ></MatchModal></>) : <></>}


                {/* <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Buscar equipo o estadio"
                        value={query}
                        onChangeText={setQuery}
                        style={styles.searchInput}
                    />
                </View> */}



                {value === '0' ? (<>

                    <FlatList
                        data={filteredbyToday}
                        // keyExtractor={({ item }: any) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        ListEmptyComponent={() => (
                            <View style={styles.empty}><Text style={styles.emptyText}>No hay partidos para mostrar</Text></View>
                        )}
                    />

                </>) : (<>
                    <FlatList
                        data={filtered}
                        // keyExtractor={({ item }: any) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        ListEmptyComponent={() => (
                            <View style={styles.empty}><Text style={styles.emptyText}>No hay partidos para mostrar</Text></View>
                        )}
                    /></>)}

            </SafeAreaView>

        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#071226', overflowX:'scroll', overscrollBehaviorY:'none' },
    header: {
        height: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(99, 90, 90, 0.03)',
        backgroundColor: '#474a50ff',
    },
    title: { color: '#e6f2ff', fontSize: 20, fontWeight: '700' },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    loginBtn: {
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 8,
        backgroundColor: '#00a3ff',
    },
    newAccountBtn: {
        paddingVertical: 9,
        paddingHorizontal: 6,
        borderRadius: 8,
        backgroundColor: '#58866aff',
    },
    loginText: { color: '#ffffffff', fontWeight: '700' },

    searchBox: { padding: 12, backgroundColor: '#071226' },
    searchInput: {
        backgroundColor: '#7b97b3ff',
        color: '#e6f2ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },

    card: {
        backgroundColor: '#464f57ff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)',
    },
    teamsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    team: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    teamRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    flag: { width: 42, height: 28, resizeMode: 'cover', borderRadius: 4 },
    teamName: { color: '#e6f2ff', fontWeight: '700', marginHorizontal: 8 },
    vs: { color: '#9fb8d6', fontWeight: '700' },

    metaRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
    date: { color: '#9fb8d6' },
    stadium: { color: '#9fb8d6' },

    empty: { padding: 40, alignItems: 'center' },
    emptyText: { color: '#9fb8d6' },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
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
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    nameTitle: {

        color: 'white',
        // marginRight: '15%',
        fontSize: 16, fontWeight: 500,
        // textAlign: 'center'

    },

    headerLogin: {
        position: 'fixed',
        alignSelf: 'flex-start',
        marginStart: '5%',
        // marginTop: '3%'
        // width:'80%'
    },

    headerLogLogin: {
        padding: 12,
        backgroundColor: '#6299b9ff',
        alignSelf: 'flex-start',
        borderRadius: 60,
        // marginTop: 12,
        marginStart: 12

    },

    titleLogLogin: {
        color: 'white',
        fontSize: 12,
        fontWeight: 500,
        textAlign: 'center'
    },

    accordion: {
        backgroundColor: '#eee',
        color: '#444',
        cursor: 'pointer',
        padding: 18,
        width: '100%',
        textAlign: 'left',
        outline: 'none',
        fontSize: 15,
        transitionDelay: '0.4s'
    }
});



