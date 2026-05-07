// import { Participant } from "@/src/interfaces/participants";
import AlertModal from "@/src/components/alert-modal/alertModal";
import { Participant } from "@/src/interfaces/participants";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { Formik } from "formik";
import { useState } from "react";
// import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Yup from "yup";

export default function AccountScreenOld() {
  const myImage = require("./img/imgcreateuser.png");
  const routeBackGen = "https://api.chsystem.online/";

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [textErrorEmail, showMessageErroEmail] = useState(false)

  const validationSchema = Yup.object({
    // O usa tu propia validación
    email: Yup.string()
      .email("Email inválido")
      .required("El email es requerido"),
    name: Yup.string().required("El nombre es requerido"),
    surname: Yup.string().required("El apellido es requerido"),
    password: Yup.string().required("La contraseña es obligatoria"),
    phone: Yup.string().required("El telefono es obligatorio"),
    // perfil: Yup.string().required("El perfil es obligatorio"),
    confirmPassword: Yup.string().required("Debe confirmar la contraseña"),
  });

  // function handleCheckForm() {

  //     // if (!validator.isEmail(email)) {
  //     //     showMessageErroEmail(true)
  //     //     return;
  //     // }

  //     // if (name === '' && email === '' && phone === '' && password === '' && confirmPassword === "") {

  //     // }
  // }

  const [showModalAlert, setShowModalAlert] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPerfil, setSelectedPerfil] = useState("");

  function createParticipant(participantBody: Participant) {
    return fetch(`${routeBackGen}participants`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participantBody),
    });
  }

  const handleSubmit = (values: any, { resetForm }: any) => {
    // Perform submission logic here
    console.log("Form submitted:", values);
    console.log(selectedPerfil);

    const body: Participant = {
      // id: 0,
      // name: values.name,
      email: values.email,
      phone: values.phone,
      perfil: values.perfil,
      password: values.password,
      created_at: new Date(),
      id: undefined,
      fullname: `${values.name} ${values.surname}`,
      firstname: values.name,
      surname: values.surname,
    };
    if (values.password === values.confirmPassword) {
      setModalTitle("Excelente!");
      setModalMessage("Te has registrado exitosamente.");
      createParticipant(body);
      setShowModalAlert(true);
      //   console.log("ENTRO");

      resetForm(); // Reset the form after submission
    } else {
      setModalTitle("Upss!");
      setModalMessage("Las contraseñas no coinciden.");
      setShowModalAlert(true);
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#071226" }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Image style={styles.logo} source={myImage} />

          <Text style={styles.title}>Crear Participante</Text>

          <Formik
            initialValues={{
              email: "",
              name: "",
              surname: "",
              password: "",
              phone: "",
              perfil: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              errors,
              values,
            }) => (
              <>
                {/* EMAIL */}
                <Text style={styles.label}>Correo</Text>
                <TextInput
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                {/* NOMBRE */}
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />

                {/* APELLIDO */}
                <Text style={styles.label}>Apellido</Text>
                <TextInput
                  style={styles.input}
                  value={values.surname}
                  onChangeText={handleChange("surname")}
                  onBlur={handleBlur("surname")}
                />

                {/* TELEFONO */}
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                />
                <Text style={styles.label}>Selecciona el perfil</Text>
                <Picker
                  style={styles.input}
                  selectedValue={selectedPerfil}
                  testID="basic-picker"
                  onValueChange={(itemValue, itemIndex) => {
                    console.log("perfil", itemValue);
                    values.perfil = itemValue;
                    setSelectedPerfil(itemValue);
                  }}
                >
                  <Picker.Item label="Administrador" value="ADM" />
                  <Picker.Item label="Participante" value="USER" />
                </Picker>

                {/* PASSWORD */}
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Entypo
                      name={showPassword ? "eye" : "eye-with-line"}
                      size={22}
                      color="#555"
                    />
                  </TouchableOpacity>
                </View>

                {/* CONFIRM PASSWORD */}
                <Text style={styles.label}>Confirmar contraseña</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!showConfirmPassword}
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Entypo
                      name={showConfirmPassword ? "eye" : "eye-with-line"}
                      size={22}
                      color="#555"
                    />
                  </TouchableOpacity>
                </View>

                {/* BOTÓN */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>

      {/* MODAL */}
      <AlertModal
        visible={showModalAlert}
        title={modalTitle}
        messages={modalMessage}
        onClose={() => setShowModalAlert(false)}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#071226",
    alignItems: "center",
    // justifyContent: "center",
  },

  viewInput: {
    width: "80%",
  },

  // modalContent: {
  //     width: "85%",
  //     padding: 20,
  //     backgroundColor: "#fff",
  //     borderRadius: 12,
  //     elevation: 5,
  // },
  //   input: {
  //     borderWidth: 4,
  //     borderColor: "#ccc",
  //     marginBottom: 12,
  //     padding: 15,
  //     borderRadius: 15,
  //     backgroundColor: "#ffffff",
  //     // width:"80%"
  //   },
  inputPass: {
    borderWidth: 4,
    borderColor: "#ccc",
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    width: "80%",
  },
  btnCheckPass: {
    position: "absolute",
    alignSelf: "center",
    right: 10,
    top: 10,
  },
  newAccountBtn: {
    backgroundColor: "#475699ff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  newAccountText: {
    color: "#fff",
    fontWeight: "600",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },

  emailVal: {
    color: "red",
  },

  agreementContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#0f1c3a",
    borderRadius: 20,
    padding: 20,
  },

  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    color: "#ccc",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  passwordInput: {
    flex: 1,
    padding: 12,
  },

  button: {
    backgroundColor: "#4e6cff",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  error: {
    color: "#ff6b6b",
    fontSize: 12,
  },
});
