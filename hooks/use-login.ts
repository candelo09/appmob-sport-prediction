import { AuthUser } from "@/src/interfaces/auth-user";
import login from "@/src/services/login-service";



// export const useLogin = (authLoign:AuthUser) => {
//     const participantLoginQuery = useQuery({
//         queryKey: ['signIn'],
//         queryFn: () => login(authLoign),
//         // staleTime: 1000 * 60 * 60 * 24 //24horas
//     })

//     return {
//         participantLoginQuery
//     }
// }

export default function useLogin() {

    async function signIn(authLogin:AuthUser){

        

        try {
            await login(authLogin);
            
        } catch (error) {
            console.error(error)
        }

    }

    console.log(signIn);
    

    return { signIn }
    
}