import { useAuthContext } from '@/src/context/AuthContext';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import MenuListLoggedInUser from '../../src/components/menuListHomeLogin/menuListLoggedInUser';
// import Menu from '@/src/components/menuListHomeLogin/menuListLoggedInUser';


// HomeScreen: lista de partidos (ejemplo: mundial) + botón para ir a Login
export default function UserScreen() {

    const { logout, user } = useAuthContext();

    // console.log(`user`, user?.email);

    return (

        <SafeAreaProvider style={{ backgroundColor: "#071226" }}>


            <View style={styles.container}>


                <View style={styles.card}>
                    <Text style={styles.title}>Cuenta</Text>

                    <Text style={styles.content}>Nombre: {user?.firstname} {user?.surname} </Text>
                    <Text style={styles.content}>Email: {user?.email}</Text>
                    <Text style={styles.content}>Telefono: {user?.phone}</Text>

                </View>

                <View>
                    <TouchableOpacity style={styles.newAccountBtn} onPress={() => {
                        logout();

                    }} >
                        <Text style={{ color: 'white' }}>Cerrar Sesion</Text>
                    </TouchableOpacity>
                </View>



            </View>
        </SafeAreaProvider>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#071226',
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 50,
        top: 50,
        // marginTop: '30%',
        // position: 'relative'
    },
    header: {
        height: 100,
        // paddingHorizontal: 16,
        padding: 16,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // borderBottomWidth: 1,
        borderBottomColor: 'rgba(99, 90, 90, 0.03)',
        backgroundColor: '#474a50ff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
    },

    loginBtn: {
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 8,
        backgroundColor: '#00a3ff',
    },
    newAccountBtn: {
        // paddingVertical: 9,
        // paddingHorizontal: 6,
        margin:10,
        padding:15,
        borderRadius: 8,
        backgroundColor: '#ad4755ff',
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
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },

});



