import { jwtDecode } from "jwt-decode";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthUser } from "../interfaces/auth-user";
import { Login, Token } from "../interfaces/participants";
import login from "../services/login-service";

enum AuthStatus {
  "checking" = "checking",
  "authenticated" = "authenticated",
  "unauthenticated" = "unauthenticated",
}

interface AuthState {
  status: AuthStatus;
  token?: string;

  user?: Login;
  isChecking: boolean;
  isAuthenticated: boolean;

  // Methods
  loginWithEmailPassword: (authLogin: AuthUser) => void;
  logout: () => void;
}

// interface User {
//     firstname: string;
//     surname: string;
//     email: string;
//     phone: string;
// }

type JwtPayload = {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
};

function showModalErrorMatchPasword(message: string) {
  return alert(`${message}`);
}

export const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState(AuthStatus.checking);
  const [user, setUser] = useState<Login>();

  useEffect(() => {
    setTimeout(() => {
      setStatus(AuthStatus.unauthenticated);
    }, 1500);
  }, []);

  const loginWithEmailPassword = async (authLogin: AuthUser) => {
    // console.log(password);

    const readToken = (token: string) => {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        // console.log("User Payload:", decoded);

        // Example: Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.warn("Token has expired");
          setUser(undefined);
          setStatus(AuthStatus.unauthenticated);
        }

        return decoded;
      } catch (error) {
        console.error("Invalid token format", error);
      }
    };

    try {
      const data: Token = (await login(authLogin)) || { access_token: "" };

      const user = readToken(data.access_token);

      // console.log('data ', data);

      if (data !== undefined) {
        setUser({
          created_at: user?.created_at,
          email: user?.email,
          firstname: user?.firstname,
          fullname: user?.fullname,
          id: user?.id,
          perfil: user?.perfil,
          // // password: data.password,
          phone: user?.phone,
          surname: user?.surname,
        });
        setStatus(AuthStatus.authenticated);
      } else {
        showModalErrorMatchPasword(
          "Upss!, Lo sentimos, Credenciales incorrectas",
        );
      }
    } catch (error: any) {
      console.error(error);

      showModalErrorMatchPasword(
        "Upss!, Lo sentimos, Credenciales incorrectas",
      );
    }
  };

  const logout = () => {
    setUser(undefined);
    setStatus(AuthStatus.unauthenticated);
  };

  return (
    <AuthContext.Provider
      value={{
        status: status,
        user: user,

        // Getter
        isChecking: status === AuthStatus.checking,
        isAuthenticated: status === AuthStatus.authenticated,

        // Method
        loginWithEmailPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
