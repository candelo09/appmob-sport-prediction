// import { Participant } from "@/src/interfaces/participants";
import useCreateParticipant from "@/hooks/use-participant";
import AlertModal from "@/src/components/alert-modal/alertModal";
import { Participant } from "@/src/interfaces/participants";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { useState } from "react";
// import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

type Props = {
  visible: boolean;
  participant: Participant;
  titleModalParticipant: string;
  nameBtnModalParticipant: string;
  onClose: () => void;
  // scoringRules: ScoringRules[];
};
export default function AccountScreen({
  visible,
  participant,
  titleModalParticipant,
  nameBtnModalParticipant,
  onClose,
}: Props) {
  // console.log("participant ", participant);

  const { toCreateParticipant, toUpdateParticipant } = useCreateParticipant();

  const validationSchema = Yup.object({
    // O usa tu propia validación
    email: Yup.string()
      .email("Email inválido")
      .required("El email es requerido"),
    name: Yup.string().required("El nombre es requerido"),
    surname: Yup.string().required("El apellido es requerido"),
    password: Yup.string().required("La contraseña es obligatoria"),
    phone: Yup.string().required("El telefono es obligatorio"),
    perfil: Yup.string().required("El perfil es obligatorio"),
    confirmPassword: Yup.string().required("Debe confirmar la contraseña"),
    position_part: Yup.number()
      .typeError("La posición debe ser numérica")
      .required("La posición es obligatoria"),
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

  // function createParticipant(participantBody: Participant) {
  //   return fetch(`${routeBackGen}participants`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(participantBody),
  //   });
  // }

  const handleSubmit = (values: any, { resetForm }: any) => {
    // Perform submission logic here
    // console.log("Form submitted:", values);
    // console.log(selectedPerfil);
    resetForm();
    const body: Participant = {
      email: values.email,
      phone: values.phone,
      perfil: values.perfil,
      password: values.password,
      created_at: new Date(),
      id: participant?.id || undefined,
      fullname: `${values.name} ${values.surname}`,
      firstname: values.name,
      surname: values.surname,
      position_part: Number(values.position_part),
    };
    if (values.password === values.confirmPassword) {
      // createParticipant(body);
      if (Object.keys(participant).length !== 0) {
        toUpdateParticipant(body);
        setModalTitle("Excelente!");
        setModalMessage("El Participante se modifico exitosamente.");
      } else {
        toCreateParticipant(body);
        setModalTitle("Excelente!");
        setModalMessage("Te has registrado exitosamente.");
      }

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
    // <SafeAreaProvider style={{ backgroundColor: "#071226" }}>
    <Modal
      animationType="slide" // or "fade", "none"
      transparent={true} // renders over a transparent background
      visible={visible}
      onRequestClose={onClose}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          {/* <Image style={styles.logo} source={myImage} /> */}

          <Text style={styles.title}>
            {titleModalParticipant}{" "}
            <Entypo size={28} name="user" color="white" />
          </Text>

          <Formik
            initialValues={{
              email: participant?.email || "",
              name: participant?.firstname || "",
              surname: participant?.surname || "",
              phone: participant?.phone || "",
              password: participant?.password || "",
              confirmPassword: "",
              perfil: participant?.perfil || "",
              position_part: participant?.position_part?.toString() || "",
            }}
            enableReinitialize={true}
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
                {/* <Text style={styles.label}>Correo</Text> */}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                {/* NOMBRE */}
                {/* <View style={styles.buttonContainer}> */}
                {/* <Text style={styles.label}>Nombre</Text> */}
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                {touched.name && errors.name && (
                  <Text style={styles.error}>{errors.name}</Text>
                )}
                {/* APELLIDO */}
                {/* <Text style={styles.label}>Apellido</Text> */}
                <TextInput
                  style={styles.input}
                  placeholder="Apellido"
                  value={values.surname}
                  onChangeText={handleChange("surname")}
                  onBlur={handleBlur("surname")}
                />
                {touched.surname && errors.surname && (
                  <Text style={styles.error}>{errors.surname}</Text>
                )}
                {/* </View> */}
                {/* TELEFONO */}
                {/* <Text style={styles.label}>Teléfono</Text> */}
                <TextInput
                  style={styles.input}
                  placeholder="Nro. Contacto"
                  value={values.phone}
                  keyboardType="number-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}
                {/* <Text style={styles.label}>Selecciona el perfil</Text> */}

                <TextInput
                  style={styles.input}
                  placeholder="Posición de inscripción"
                  value={values.position_part}
                  keyboardType="numeric"
                  onChangeText={handleChange("position_part")}
                />
                <Picker
                  accessibilityLabel="Selecciona el perfil"
                  style={styles.inputPerfil}
                  selectedValue={selectedPerfil}
                  testID="basic-picker"
                  onValueChange={(itemValue, itemIndex) => {
                    // console.log("perfil", itemValue);
                    // values.perfil = itemValue;
                    handleChange("perfil")(itemValue);
                    setSelectedPerfil(itemValue);
                  }}
                >
                  <Picker.Item
                    enabled={false}
                    label="Seleccione un perfil"
                    value=""
                  />
                  <Picker.Item label="Participante" value="USER" />
                  <Picker.Item label="Administrador" value="ADM" />
                </Picker>
                {touched.perfil && errors.perfil && (
                  <Text style={styles.error}>{errors.perfil}</Text>
                )}

                {/* PASSWORD */}

                {/* <View style={styles.buttonContainer}> */}
                {/* <Text style={styles.label}>Contraseña</Text> */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Contraseña"
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
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                {/* CONFIRM PASSWORD */}
                {/* <Text style={styles.label}>Confirmar contraseña</Text> */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirmar Contraseña"
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
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
                {/* </View> */}
                {/* BOTÓN */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {nameBtnModalParticipant}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={onClose}
                  >
                    <Text style={styles.buttonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
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
    </Modal>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#9ca7ba",
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
    // maxWidth: 400,
    backgroundColor: "#37425c",
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
    marginBottom: 5,
    marginTop: 10,
  },

  inputPerfil: {
    backgroundColor: "#fff",
    // borderRadius: 12,
    // padding: 8,
    marginBottom: 5,
    marginTop: 10,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 10,
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

  buttonClose: {
    backgroundColor: "#ff4e4e",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 10,
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
