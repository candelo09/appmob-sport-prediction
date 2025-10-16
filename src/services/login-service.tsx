import { AuthUser } from "../interfaces/auth-user";

export default function loginService(authLogin: AuthUser) {

    console.log(authLogin.email);
    console.log(authLogin.password);

    if (authLogin.email !== 'crisannpc@gmail.com' && authLogin.password !== '1234') {

        throw new Error("Credenciales Incorrectas");

    } else {
        return {
            "email": "crisannpc@gmail.com",
            "name": "Cristhian Candelo",
        };
    }





}