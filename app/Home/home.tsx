import { useAuthContext } from '@/src/context/AuthContext';
import { Matchs } from '@/src/interfaces/matchs';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';


// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login
export default function HomeScreen() {



    // datos mock — en producción obténlos de tu API
    const [matches] = useState([
        {
            id: '1',
            date: '2026-06-14T18:00:00Z',
            stadium: 'Lusail Stadium',
            teamA: { name: 'Argentina', flag: 'https://flagcdn.com/w320/ar.png' },
            teamB: { name: 'France', flag: 'https://flagcdn.com/w320/fr.png' },
        },
        {
            id: '2',
            date: '2026-06-15T15:00:00Z',
            stadium: 'Al Bayt',
            teamA: { name: 'Brazil', flag: 'https://flagcdn.com/w320/br.png' },
            teamB: { name: 'Spain', flag: 'https://flagcdn.com/w320/es.png' },
        },
        {
            id: '3',
            date: '2026-06-16T20:00:00Z',
            stadium: 'Khalifa International',
            teamA: { name: 'Germany', flag: 'https://flagcdn.com/w320/de.png' },
            teamB: { name: 'Portugal', flag: 'https://flagcdn.com/w320/pt.png' },
        },
    ]);

    const { isAuthenticated, user } = useAuthContext();
    const [refreshing, setRefreshing] = useState(false);
    const [query, setQuery] = useState('');

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // Aquí llamarías tu API para recargar partidos
        await new Promise((r) => setTimeout(r, 800));
        setRefreshing(false);
    }, []);

    const filtered = matches.filter((m) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;
        return (
            m.teamA.name.toLowerCase().includes(q) ||
            m.teamB.name.toLowerCase().includes(q) ||
            m.stadium.toLowerCase().includes(q)
        );
    });

    function formatDate(iso: string | number | Date) {
        const d = new Date(iso);
        return d.toLocaleString();
    }

    function renderItem({ item }: Matchs) {
        // console.log(item);

        return (
            <Pressable
                style={styles.card}
                onPress={() => console.log('Ejecuto MatchDay')}

            >
                <View style={styles.teamsRow}>
                    <View style={styles.team}>
                        <Image source={{ uri: item.teamA!.flag }} style={styles.flag} />
                        <Text style={styles.teamName}>{item.teamA!.name}</Text>
                    </View>

                    <Text style={styles.vs}>vs</Text>

                    <View style={styles.teamRight}>
                        <Text style={styles.teamName}>{item.teamB.name}</Text>
                        <Image source={{ uri: item.teamB.flag }} style={styles.flag} />
                    </View>
                </View>

                <View style={styles.metaRow}>
                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                    <Text style={styles.stadium}>{item.stadium}</Text>
                </View>
            </Pressable>
        );
    }

    return (

        <SafeAreaProvider style={styles.container}>


            <SafeAreaView>

                {isAuthenticated ? (
                    <>
                        <View style={{ marginBottom: 7, marginTop:5, position: 'relative', flexDirection: 'row' }}>
                            <View style={styles.headerLogLogin}>
                                <Text style={styles.titleLogLogin}>{user?.firstname[0]}{user?.surname[0]}</Text>
                            </View>
                            <View style={styles.headerLogin}>
                                <Text style={styles.nameTitle}>{user?.firstname} {user?.surname}</Text>
                                <Text style={styles.nameTitle}>{user?.email}</Text>
                            </View>

                        </View>
                    </>
                ) : (<></>)}


                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Buscar equipo o estadio"
                        value={query}
                        onChangeText={setQuery}
                        style={styles.searchInput}
                    />
                </View>

                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={() => (
                        <View style={styles.empty}><Text style={styles.emptyText}>No hay partidos para mostrar</Text></View>
                    )}
                />
            </SafeAreaView>

        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#071226' },
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
    }
});



