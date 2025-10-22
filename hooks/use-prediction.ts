import { Match } from "@/src/interfaces/matchs"
import { Participant } from "@/src/interfaces/participants"
import { Prediction } from "@/src/interfaces/prediction"
import { createPrediction, getAllPredictionByParticipant } from "@/src/services/prediction-service"
import { useQuery } from "@tanstack/react-query"


export const usePrediction = (id: number) => {

    const predictionByIdQuery = useQuery({
        queryKey: ['getPredictionById'],
        queryFn: () => getAllPredictionByParticipant(id),
        // staleTime: 1000 * 60 * 60 * 24 //24horas
    })

    return {
        predictionByIdQuery
    }

}

// export const useCreatePrediction = (prediction: Prediction) => {
//     const predictionQuery = useQuery({
//         queryKey: ['createPrediction'],
//         queryFn: () => createPrediction(prediction),
//         // staleTime: 1000 * 60 * 60 * 24 //24horas
//     })

//     return {
//         predictionQuery
//     }
// }

export default function useBet() {
    //   const { createPrediction } = useCreatePrediction();

    function toBet(matchBet: Match, valueHomeTeam: number, valueAwayTeam: number) {
        const participantId: Participant = {
            name: "Cristhian Candelo",
            email: "crisannpc@gmail.com",
            phone: "3188618159",
            password: ".",
            created_at: new Date(),
            id: 1
        };

        const prediction: Prediction = {
            id: 0,
            predicted_home_score: valueHomeTeam,
            predicted_away_score: valueAwayTeam,
            created_at: new Date(),
            participantId: participantId,
            matchId: matchBet
        };

        createPrediction(prediction);
        alert('Apuesta realizada con éxito')
    }

    return { toBet };
}
