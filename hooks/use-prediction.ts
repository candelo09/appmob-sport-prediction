import { useAuthContext } from "@/src/context/AuthContext";
import { Match } from "@/src/interfaces/matchs";
import { Participant } from "@/src/interfaces/participants";
import { Prediction } from "@/src/interfaces/prediction";
import {
  createPrediction,
  getAllPredictionByMatch,
  getAllPredictionByParticipant,
  getAllPredictionByParticipantAndMatch,
  updatePrediction,
} from "@/src/services/prediction-service";
import { useQuery } from "@tanstack/react-query";

export const usePrediction = (id: number) => {
  const predictionByIdQuery = useQuery({
    queryKey: ["getPredictionById"],
    queryFn: () => getAllPredictionByParticipant(id),
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    predictionByIdQuery,
  };
};

export const usePredictionByMatch = (id: number) => {
  const predictionByIdQuery = useQuery({
    queryKey: ["getPredictionByMatch"],
    queryFn: () => getAllPredictionByMatch(id),
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    predictionByIdQuery,
  };
};

export const usePredictionByParticipantAndMatch = (
  user_id: number,
  match_id: number,
) => {
  const predictionByIdQuery = useQuery({
    queryKey: ["prediction", user_id, match_id],
    queryFn: () => getAllPredictionByParticipantAndMatch(user_id, match_id),
    enabled: !!user_id && !!match_id,
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    predictionByIdQuery,
  };
};

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

  const { user } = useAuthContext();

  function toBet(
    matchBet: Match,
    valueHomeTeam: number,
    valueAwayTeam: number,
  ) {
    const participantId: Participant = {
      fullname: `${user?.firstname} ${user?.surname}`,
      email: `${user?.email}`,
      phone: `${user?.phone}`,
      perfil: `${user?.perfil}`,
      password: ".",
      created_at: user?.created_at,
      id: user?.id,
      firstname: `${user?.firstname}`,
      surname: `${user?.surname}`,
    };

    const prediction: Prediction = {
      id: 0,
      predicted_home_score: valueHomeTeam,
      predicted_away_score: valueAwayTeam,
      created_at: new Date(),
      participantId: participantId,
      matchId: matchBet,
    };

    createPrediction(prediction);
    alert("Apuesta realizada con éxito");
  }

  function updateBet(
    prediction_id: number,
    matchBet: Match,
    valueHomeTeam: number,
    valueAwayTeam: number,
  ) {
    const participantId: Participant = {
      fullname: `${user?.firstname} ${user?.surname}`,
      email: `${user?.email}`,
      phone: `${user?.phone}`,
      perfil: `${user?.perfil}`,
      password: ".",
      created_at: user?.created_at,
      id: user?.id,
      firstname: `${user?.firstname}`,
      surname: `${user?.surname}`,
    };

    const prediction: Prediction = {
      id: prediction_id,
      predicted_home_score: valueHomeTeam,
      predicted_away_score: valueAwayTeam,
      created_at: new Date(),
      participantId: participantId,
      matchId: matchBet,
    };

    updatePrediction(prediction.id, prediction);
    alert("Apuesta realizada con éxito");
  }

  return { toBet, updateBet };
}
