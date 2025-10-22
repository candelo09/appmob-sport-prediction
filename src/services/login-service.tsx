import { AuthUser } from "../interfaces/auth-user";
import { Participant } from "../interfaces/participants";
import { sportPredictionApi } from "./api/sport-prediction-api";

export default async function login(authLogin: AuthUser) {

    try {
        const { data } = await sportPredictionApi.post<Participant>('auth/login', authLogin)

        const authUser = data;

        // console.log(`authUser`, authUser);

        return authUser;


    } catch (error) {
        console.error(error);
    }

    // console.log(authLogin.email);
    // console.log(authLogin.password);

    // if (authLogin.email !== 'crisannpc@gmail.com' && authLogin.password !== '1234') {

    //     throw new Error("Credenciales Incorrectas");

    // } else {
    //     return {
    //         "email": "crisannpc@gmail.com",
    //         "name": "Cristhian Candelo",
    //     };
    // }





}