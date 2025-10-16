
// import { LoginContext } from "@/app/_layout";
// import { AuthUser } from "@/src/interfaces/auth-user";
// import loginService from "@/src/services/login-service";
// import { useCallback, useContext, useState } from "react";


// export default function useUser() {
//     // Creamos el contexto de nuestra aplicación
//     const context = useContext(LoginContext);
//     if (!context) {
//         throw new Error("useUser debe usarse dentro de un LoginProvider");
//     }
//     const { setUser } = context;
//     //Utilizamos el estado para poder saber si está o no cargando
//     const [state, setState] = useState({
//         loading: true,
//         error: false,
//         logged: true,
//     });

//     const login = useCallback( );

//     return {
//         isLogged: state.logged,
//         isLoginLoading: state.loading,
//         hasLoginError: state.error,
//         login,
//     };
// }