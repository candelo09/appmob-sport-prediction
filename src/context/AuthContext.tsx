import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { AuthUser } from '../interfaces/auth-user';
import login from '../services/login-service';

enum AuthStatus {
    'checking' = 'checking',
    'authenticated' = 'authenticated',
    'unauthenticated' = 'unauthenticated',
}

interface AuthState {
    status: AuthStatus;
    token?: string;

    user?: User;
    isChecking: boolean;
    isAuthenticated: boolean;

    // Methods
    loginWithEmailPassword: (authLogin: AuthUser) => void;
    logout: () => void;
}

interface User {
    firstname: string;
    surname: string;
    email: string;
    phone: string;
}

function showModalErrorMatchPasword(message: string) {

    return alert(`${message}`);
}

export const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [status, setStatus] = useState(AuthStatus.checking);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        setTimeout(() => {
            setStatus(AuthStatus.unauthenticated);
        }, 1500);
    }, []);



    const loginWithEmailPassword = async (authLogin: AuthUser) => {
        // console.log(password);

        try {
            const data = await login(authLogin);

            console.log('data ', data);


            if (data !== undefined) {
                setUser({
                    firstname: "Cristhian",
                    email: authLogin.email,
                    phone: '3188618159',
                    surname: 'Candelo'
                });
                setStatus(AuthStatus.authenticated);
            } else {
                showModalErrorMatchPasword('Upss!, Lo sentimos, Credenciales incorrectas');
            }
        } catch (error: any) {
            console.error(error);


            showModalErrorMatchPasword('Upss!, Lo sentimos, Credenciales incorrectas');
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