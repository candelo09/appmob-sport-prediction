// import { Participant } from "@/src/interfaces/participants";
import { Participant } from "@/src/interfaces/participants";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from 'formik';
import { useState } from "react";
// import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Yup from 'yup';

export default function AccountScreen() {
    const myImage = require('./img/imgcreateuser.png');
    const routeBackGen = 'http://192.168.12.199:3000/';

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [name, setName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [textErrorEmail, showMessageErroEmail] = useState(false)


    const validationSchema = Yup.object({ // O usa tu propia validación
        email: Yup.string().email('Email inválido').required('El email es requerido'),
        name: Yup.string().required('El nombre es requerido'),
        password: Yup.string().required('La contraseña es obligatoria'),
        phone: Yup.string().required('El telefono es obligatorio'),
        confirmPassword: Yup.string().required('Debe confirmar la contraseña')
    });



    // function handleCheckForm() {




    //     // if (!validator.isEmail(email)) {
    //     //     showMessageErroEmail(true)
    //     //     return;
    //     // }

    //     // if (name === '' && email === '' && phone === '' && password === '' && confirmPassword === "") {

    //     // }
    // }


    function createParticipant(participantBody: Participant) {



        return fetch(`${routeBackGen}participants`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(participantBody)
        })

    }

    function showSwal() {

        return Alert.alert('Registro Participante', 'Te has registro exitosamente.', [
            // {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            // },
            { text: 'OK', onPress: () => router.navigate('/') },
        ]);

    }

    function showModalErrorMatchPasword() {

        return Alert.alert('Upss!', 'Lo sentimos, por favor valida que las contraseñas coincidan.', [
            // {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            // },
            { text: 'OK', onPress: () => { } },
        ]);
    }

    const handleSubmit = (values: any, { resetForm }: any) => {
        // Perform submission logic here
        // console.log('Form submitted:', values);
        const body: Participant = {
            // id: 0,
            name: values.name,
            email: values.email,
            phone: values.phone,
            password: values.password,
            created_at: new Date
        }
        if (values.password === values.confirmPassword) {
            createParticipant(body);
            showSwal();
            resetForm(); // Reset the form after submission
        } else {
            showModalErrorMatchPasword()
        }

    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    return (
        <SafeAreaProvider style={{ backgroundColor: "#071226" }}>
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        style={styles.tinyLogo}
                        // source={{
                        //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                        // }}
                        source={myImage}

                    />
                    <Formik
                        initialValues={{ email: '', name: '', password: '', phone: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                            <View style={styles.viewInput}>


                                <Text style={styles.title}>Crear Participante</Text>

                                <TextInput
                                    placeholder="Correo electrónico"
                                    style={styles.input}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                />
                                {touched.email && errors.email ? (
                                    <Text style={{ color: "red" }}>{errors.email}</Text>
                                ) : null}
                                <TextInput
                                    placeholder="Nombre Completo"
                                    style={styles.input}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                                {touched.name && errors.name ? (
                                    <Text style={{ color: "red" }}>{errors.name}</Text>
                                ) : null}
                                <TextInput
                                    placeholder="Telefono"
                                    style={styles.input}
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    // keyboardType="number-pad"
                                    inputMode="tel"

                                />
                                {touched.phone && errors.phone ? (
                                    <Text style={{ color: "red" }}>{errors.phone}</Text>
                                ) : null}

                                <View style={styles.agreementContainer}>
                                    <TextInput
                                        placeholder="Contraseña"
                                        style={styles.inputPass}
                                        secureTextEntry={!showPassword}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        maxLength={6}

                                    />
                                    <TouchableOpacity style={styles.btnCheckPass} onPress={() => setShowPassword(!showPassword)}>
                                        {/* You can use an icon here, e.g., <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} /> */}
                                        <Entypo name={showPassword ? "eye" : "eye-with-line"} size={35} color="white" />
                                    </TouchableOpacity>

                                </View>

                                {touched.password && errors.password ? (
                                    <Text style={{ color: "red" }}>{errors.password}</Text>
                                ) : null}

                                <View style={styles.agreementContainer}>
                                    <TextInput
                                        placeholder="Comfirnar Contraseña"
                                        style={styles.inputPass}
                                        secureTextEntry={!showConfirmPassword}
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        maxLength={6}
                                    />
                                    <TouchableOpacity style={styles.btnCheckPass} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {/* You can use an icon here, e.g., <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} /> */}
                                        <Entypo name={showConfirmPassword ? "eye" : "eye-with-line"} size={35} color="white" />
                                    </TouchableOpacity>

                                </View>
                                {touched.confirmPassword && errors.confirmPassword ? (
                                    <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
                                ) : null}


                                <TouchableOpacity style={styles.newAccountBtn} onPress={() => {
                                    //router.navigate('/')
                                    { handleSubmit() }
                                    // handleSubmit()
                                }} >
                                    <Text style={styles.newAccountText}>Crear Cuenta</Text>
                                </TouchableOpacity>

                            </View>
                        )}

                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#071226',
        alignItems: 'center',
        justifyContent: 'center',

    },

    viewInput: {
        width: "80%"
    },

    // modalContent: {
    //     width: "85%",
    //     padding: 20,
    //     backgroundColor: "#fff",
    //     borderRadius: 12,
    //     elevation: 5,
    // },
    title: {
        fontSize: 30,
        fontWeight: "800",
        marginBottom: 30,
        textAlign: "center",
        color: "#ffffffff",
    },
    input: {
        borderWidth: 4,
        borderColor: "#ccc",
        marginBottom: 12,
        padding: 15,
        borderRadius: 15,
        backgroundColor: "#ffffff",
        // width:"80%"
    },
    inputPass: {
        borderWidth: 4,
        borderColor: "#ccc",
        marginBottom: 12,
        padding: 15,
        borderRadius: 15,
        backgroundColor: "#ffffff",
        width: "80%"
    },
    btnCheckPass: {
        position: 'absolute',
        alignSelf: 'center',
        right: 10,
        top: 10
    },
    newAccountBtn: {
        backgroundColor: "#475699ff",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10
    },
    newAccountText: {
        color: "#fff",
        fontWeight: "600",
    },
    tinyLogo: {
        width: 50,
        height: 50,
        marginBottom: 15
    },

    emailVal: {
        color: "red",
    },

    agreementContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
});

