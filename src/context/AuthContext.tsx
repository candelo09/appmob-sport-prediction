import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';

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
    loginWithEmailPassword: (email: string, password: string) => void;
    logout: () => void;
}

interface User {
    firstname: string;
    surname:string;
    email: string;
    phone: string;
}

function showModalErrorMatchPasword() {

    return alert(`Upss!, Lo sentimos, Credenciales incorrectas`);
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



    const loginWithEmailPassword = (email: string, password: string) => {
        // console.log(password);

        if (email === 'crisannpc@gmail.com' && password === '1234') {
            setUser({
                firstname: 'Cristhian',
                email: email,
                phone: '3188618159',
                surname: 'Candelo'
            });
            setStatus(AuthStatus.authenticated);
        } else {
            showModalErrorMatchPasword();
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