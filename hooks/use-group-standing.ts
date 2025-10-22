import { getByGroupStanding } from "@/src/services/group-standing-service";
import { useQuery } from "@tanstack/react-query";


export const useGroupstandingByGroup = (groupId:number) => {
    const allGroupStandingByGroup = useQuery({
        queryKey: ['groupId',groupId],
        queryFn: () => getByGroupStanding(groupId),
        staleTime: 1000 * 60 * 60 * 24 //24horas
    })

    return {
        allGroupStandingByGroup
    }
}

// export const useMatchsByDate = (matchDateStart: Date, matchDateEnd:Date) => {

//     const formatDateStart = moment(matchDateStart).format('YYYY-MM-DD 00:00:00');
//     const formatDateEnd = moment(matchDateEnd).format('YYYY-MM-DD 24:00:00');


//     const matchsByDateQuery = useQuery({
//         queryKey: ['matchByDate'],
//         queryFn: () => getMatchesByDate(formatDateStart,formatDateEnd),
//         staleTime: 1000 * 60 * 60 * 24 //24horas
//     })

//     // console.log(matchsByDateQuery);


//     return {
//         matchsByDateQuery
//     }
// }

// export const useMatchsById = (matchId:number) => {

//     const matchsByIdQuery = useQuery({
//         queryKey: ['matchs', matchId],
//         queryFn:  () => getMatchesById(matchId),
//         staleTime: 1000 * 60 * 60 //1hora
//     })

//     // console.log(matchsByIdQuery);


//     return {matchsByIdQuery}
        
// }